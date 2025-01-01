import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { AppButton } from '@components/ui/shared/AppButton';
import { connect, useDispatch } from 'react-redux';
import { updateModals } from '@redux/modals/actions';
import useClickOutside from 'src/hooks/useClickOutside';
import useDisableScroll from 'src/hooks/useDisabledScroll';
import { RecordIcon, UploadIcon } from './icons';
import { feedService } from '@services/feed.service';
import { message, Spin } from 'antd';
import { getResponseError } from '@lib/utils';
import { IPerformer } from '@interfaces/performer';
import { CreateThumbnailVideoPreview } from '@components/create-feed/create-thumbnail-video-preview';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalProps: {
    isOpen: boolean,
    videoPreviewUrl: string | null;
    imageInfos: {
      fileList: File[],
      fileIds: string[]
    };
  }
  currentUser?: IPerformer
}

const CreateNewVideoModal: React.FC<ModalProps> = ({ modalProps, isOpen, onClose, currentUser }) => {
  const router = useRouter()
  const [, updateState] = React.useState() as any;
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const dispatch = useDispatch()
  const [isUploading, setUploading] = useState(false)

  const [hashtag1, setHashtag1] = useState('')
  const [hashtag2, setHashtag2] = useState('')
  const [hashtag3, setHashtag3] = useState('')

  const [selectedThumbnailFile, setSelectedThumbnailFile] = useState<File | null>(null)
  const [isPublic, setIsPublic] = useState(true)

  const onsubmit = async () => {
      setUploading(true);
      const description = `#${hashtag1.split(' ').join('')} ${hashtag2 ? `#${hashtag2.split(' ').join('')}` : ''
      } ${hashtag3 ? `#${hashtag3.split(' ').join('')}` : ''
      } `;
      
   
    try {
      const sendAndGetThumbnailId = await feedService.uploadFile(selectedThumbnailFile, {}, onUploading.bind(this, selectedThumbnailFile));

      const ObjectToSend = {
        thumbnailId:  sendAndGetThumbnailId.data.fileId,
        type: 'video',
        teaserId: modalProps.imageInfos.fileIds[0] || null,
        status: isPublic ? 'active' : 'inactive',
        // 
        fileIds: modalProps.imageInfos.fileIds,
        fromSourceId: currentUser._id,
        hashtag1: hashtag1,
        hashtag2: hashtag2,
        hashtag3: hashtag3,
        text: description.trim(),
      }

      const createFeed = await feedService.create(ObjectToSend)

      message.success('Posted successfully!');
      setUploading(false);
      dispatch(updateModals({
        uploadPhotoModal: {
          isOpen: false,
          imageInfos: {
            fileIds: [],
            fileList: []
          }
        }
      }))
      onClose()
      router.push(
        `model/profile?username=${currentUser.username}&tab=${createFeed.data?.type}`
      );
    } catch (err) {
      const error = await Promise.resolve(err);
      message.error(
        getResponseError(error) || 'Something went wrong, please try again'
      );
      setUploading(false);
    }
  }

  const onUploading = (file, resp: any) => {
    // eslint-disable-next-line no-param-reassign
    file.percent = resp.percentage;
    // eslint-disable-next-line no-param-reassign
    if (file.percent === 100) file.status = 'done';
    forceUpdate();
  };

  const onFinishFileCapture = async (file) => {
    try {
      setUploading(true);
      const resp = await feedService.uploadFile(file, {}, onUploading.bind(this, file));

      dispatch(updateModals({
        uploadVideoModal: {
          ...modalProps,
          videoPreviewUrl: resp.data.url,
          imageInfos: {
            fileList: [file],
            fileIds: modalProps.imageInfos.fileIds.length ? [...modalProps.imageInfos.fileIds, resp.data.fileId] : [resp.data.fileId],
          }
        }
      }));
      setUploading(false);
      return true;
    } catch (error) {
      message.error('Error uploading! Please try again');
      console.error(error);
      setUploading(false);
      return false;
    }
  };

  const onHandleThumbnailFile = (file: File) => {
    setSelectedThumbnailFile(file)
  }

  useDisableScroll(isOpen);
  const ref = useClickOutside(onClose);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div tabIndex={-1} aria-hidden="true" className={`overflow-y-auto px-5 overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isOpen ? 'block' : 'hidden'}`}>
        <div ref={ref} role='dialog' className="w-full max-w-[580px] max-h-full m-auto">
          <div className="bg-white rounded-lg shadow">
            <div className="flex justify-between px-5 py-5 border-b rounded-t border-base-400">
              <h2 className="inline-flex items-center gap-x-2">
                <span className='text-xl text-black'>
                  Post new video
                </span>
              </h2>

              <button onClick={onClose} type="button" className="inline-flex items-center justify-center w-6 h-6 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className='p-4 pb-6 flex items-center justify-center md:justify-between gap-8 md:gap-4 md:flex-nowrap flex-wrap'>
              <article>
                <h3 className='text-black font-semibold text-lg text-center'>Step 1</h3>
                <h4 className='text-black text-lg'>Videos must be 3-60/sec long. Once uploaded select a frame from the video to use as the thumbnail.</h4>
              </article>
              <div className='text-black text-center font-semibold whitespace-nowrap relative'>
                <input className='absolute inset-0 opacity-0' onChange={(e) => onFinishFileCapture(e.target.files[0])} type='file' multiple={false} />
                <span className='text-black h-20 w-20 rounded-full bg-purple-800 mb-2 flex items-center justify-center'>
                  <UploadIcon />
                </span>
                Upload Video
              </div>
              <button 
                className='text-black text-center font-semibold whitespace-nowrap'
                onClick={() => dispatch(updateModals({
                  isVideoCameraModal: true,
                  uploadVideoModal: {
                    ...modalProps,
                    isOpen: false,
                  }
                }))}
              >
                <span className='text-black h-20 w-20 rounded-full bg-black mb-2 flex items-center justify-center'>
                  <RecordIcon />
                </span>
                Take video
              </button>
            </div>
            {isUploading && <Spin className='m-auto py-2' />}

            { modalProps.videoPreviewUrl && modalProps.imageInfos.fileList.length > 0 &&
              <CreateThumbnailVideoPreview handleThumbnail={onHandleThumbnailFile} videoFile={modalProps.imageInfos.fileList[0]} videoPreviewUrl={modalProps.videoPreviewUrl} />
            }
            {/* mock crop video */}
            {/* <div className='w-full pb-4'>
              <div className='w-2/3 h-96 bg-black m-auto'>

              </div>
              <div>
                
              </div>
            </div>
            <div className='p-4 m-auto'>
              <h4 className='text-black pb-2'>Select a thumbnail by moving the slider</h4>
              <div className='flex items-center justify-start w-full'>
                <div className='h-32 w-full bg-black'></div>
                <div className='h-32 w-full bg-black border-2 border-blue-800 rounded'></div>
                <div className='h-32 w-full bg-black'></div>
                <div className='h-32 w-full bg-black'></div>
                <div className='h-32 w-full bg-black'></div>
                <div className='h-32 w-full bg-black'></div>
                <div className='h-32 w-full bg-black'></div>
              </div>
            </div> */}

            <div className='p-4'>
              <article className='pb-4' style={{ maxWidth: '350px'}}>
                <h3 className='text-black font-semibold text-lg text-center'>Step 2</h3>
                <h4 className='text-black text-lg'>Accurate hashtags increase viewership</h4>
              </article>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                <div className='relative w-full border border-gray-200 rounded-lg'>
                  <span className='font-bold absolute left-2 top-0 bottom-0 m-auto rounded flex items-center justify-center'>#</span>
                  <input value={hashtag1} onChange={(e) => setHashtag1(e.target.value)} type="text" className='w-full rounded-lg border-0 pl-4' />
                </div>
                <div className='relative w-full border border-gray-200 rounded-lg'>
                  <span className='font-bold absolute left-2 top-0 bottom-0 m-auto rounded flex items-center justify-center'>#</span>
                  <input value={hashtag2} onChange={(e) => setHashtag2(e.target.value)} type="text" className='w-full rounded-lg border-0 pl-4' />
                </div>
                <div className='relative w-full border border-gray-200 rounded-lg'>
                  <span className='font-bold absolute left-2 top-0 bottom-0 m-auto rounded flex items-center justify-center'>#</span>
                  <input value={hashtag3} onChange={(e) => setHashtag3(e.target.value)} type="text" className='w-full rounded-lg border-0 pl-4' />
                </div>
              </div>
            </div>

            <div className='p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6'>
              <article>
                <h3 className='text-black font-semibold text-lg text-center'>Step 3</h3>
                <h4 className='text-black text-lg'>Select photo visibility</h4>
              </article>
              <select value={isPublic ? 'public' : 'private'} onChange={(e) => setIsPublic(e.target.value === 'public' ? true : false)} className='border-gray-200 rounded-lg w-full flex-1' name="visibility" id="">
                <option style={{backgroundColor: '#F3E6F1', color: '#121212'}}  value="public">Public</option>
                <option style={{backgroundColor: '#F3E6F1', color: '#121212'}}  value="private">Private</option>
              </select>
            </div>

            <div className='flex-grow px-6 py-5 md:self-end'>
              <div className='flex items-center gap-3 sm:flex-row justify-end'>
                <button onClick={onClose} className="text-sm font-medium text-black hover:opacity-80 hover:underline">
                  Cancel
                </button>

                <AppButton size='base' onClick={onsubmit} disabled={!selectedThumbnailFile || !hashtag1 && !hashtag2 && !hashtag3 || isUploading}>
                  Next
                </AppButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-30 ${isOpen ? 'block' : 'hidden'}`} />
    </>
  );
};

const mapState = (state) => ({
  modals: { ...state.modals },
  currentUser: state.user.current
});

const mapDispatch = {
  updateModals,
};

export default connect(mapState, mapDispatch)(CreateNewVideoModal);
