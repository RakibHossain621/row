import { generateVideoThumbnails } from '@rajesh896/video-thumbnails-generator'
import { Spin } from 'antd'
import { useEffect, useState } from 'react'

interface ThumbnailImagesCollectionType {
  imgUrl: string
  imgFile: File
}

export const CreateThumbnailVideoPreview = ({
  videoPreviewUrl,
  videoFile,
  handleThumbnail
}: {
  videoPreviewUrl: string,
  videoFile: File,
  handleThumbnail: (thumbFile: File) => void
}) => {
  const [thumbnailImages, setThumbnailImages] = useState<ThumbnailImagesCollectionType[]>([])
  const [selectedThumbnail, setSelectedThumbnail] = useState<ThumbnailImagesCollectionType | null>(null)

  const [selectedIndexProgress, setSeletedIndexProgress] = useState(0)

  const handleGenerateThumbnailsFromVideoFile = () => {
    generateVideoThumbnails(videoFile, 30, videoFile.type)
      .then((thumbnailArray) => {
        // Process each base64 thumbnail to convert it into a File object
        const thumbnails = thumbnailArray.map((thumbBase64: string, index: number) => {
          const byteString = atob(thumbBase64.split(',')[1])
          const mimeString = thumbBase64.split(',')[0].split(':')[1].split(';')[0]

          const ab = new ArrayBuffer(byteString.length)
          const ia = new Uint8Array(ab)

          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
          }

          const blob = new Blob([ab], { type: mimeString })
          const file = new File([blob], `thumbnail_${index}.png`, { type: mimeString })

          return {
            imgUrl: thumbBase64,
            imgFile: file
          }
        })

        setThumbnailImages(thumbnails)
        setSelectedThumbnail(thumbnails[0])
      })
      .catch((err) => {
        console.error('Error generating thumbnails:', err)
      })
  }

  useEffect(() => {
    handleGenerateThumbnailsFromVideoFile()
  }, [videoPreviewUrl, videoFile])

  useEffect(() => {
    selectedThumbnail && handleThumbnail(selectedThumbnail.imgFile)
  }, [selectedThumbnail])

  useEffect(() => {
    setSelectedThumbnail(thumbnailImages[selectedIndexProgress])
  }, [selectedIndexProgress])

  return (
    <>
      <div className='w-full bg-gray-200 relative'>
        {selectedThumbnail 
          ? <>
            <img 
              src={selectedThumbnail.imgUrl}
              alt={'Thumbnail Selected'}
              className='w-full max-w-[260px] m-auto rounded'
              style={{aspectRatio: '4 / 6', objectFit: 'cover'}} 
            />
            <input className='w-full max-w-[380px] m-auto absolute left-0 right-0 bottom-4 progressBarThumbnail' type="range" max={thumbnailImages.length - 1} onChange={(e) => setSeletedIndexProgress(Number(e.target.value))} value={selectedIndexProgress} />
          </>
          : <video style={{ aspectRatio: '4 / 6', objectFit: 'cover' }} className='w-full max-w-[260px] m-auto rounded' src={videoPreviewUrl} controls autoPlay />
        }
      </div>
      <div className='w-full pl-2'>  
        <h4 className='text-black pb-2 pt-4 bg-white'>Select a thumbnail by moving the slider</h4>
        <div className='flex items-center justify-start w-full bg-white overflow-x-scroll pb-4'>
          {!thumbnailImages.length && <Spin className='m-auto pt-2' />}
          {thumbnailImages.map((thumbImg, index) => (
            <div
              key={index}
              onClick={() => setSelectedThumbnail(thumbImg)}
              className={`h-32 w-32 flex-none bg-black rounded cursor-pointer ${thumbImg === selectedThumbnail ? 'border-2 border-blue-800' : ''}`}
              style={{ backgroundImage: `url(${thumbImg.imgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
          ))}
        </div>
      </div>
    </>
  )
}
