import React, { useState, useRef, useCallback, useEffect } from 'react';
import { generateUuid } from '@lib/string';
import Webcam from 'react-webcam';
import { AppButton } from '@components/ui/shared/AppButton';
import { connect, useDispatch } from 'react-redux';
import { updateModals } from '@redux/modals/actions';
import useClickOutside from 'src/hooks/useClickOutside';
import useDisableScroll from 'src/hooks/useDisabledScroll';
import { message, Spin } from 'antd';
import { feedService } from '@services/feed.service';
import { getGlobalConfig } from '@services/config';

const VideoCameraModal = ({ isOpen, onClose, modalProps }) => {
  const dispatch = useDispatch();
  const [capturing, setCapturing] = useState(false);  
  const [recordedChunks, setRecordedChunks] = useState([]);

  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false)

  const onUploading = (file, resp) => {
    file.percent = resp.percentage;
    if (file.percent === 100) file.status = 'done';
  };

  const onSendUploadVideoToFeed = async (file) => {
    setIsUploading(true)
    try {
      if (!file?.size || file.size === 0) {
        message.error('O vídeo está vazio, tente gravar novamente.');
        return false;
      }
  
      const resp = await feedService.uploadFile(file, {}, onUploading.bind(this, file));
  
      dispatch(updateModals({
        uploadVideoModal: {
          isOpen: true,
          videoPreviewUrl: resp.data.url,
          imageInfos: {
            fileList: [file],
            fileIds: modalProps.imageInfos.fileIds.length ? [...modalProps.imageInfos.fileIds, resp.data.fileId] : [resp.data.fileId],
          }
        },
        isVideoCameraModal: false
      }));
  
        setIsUploading(false)
      return true;
    } catch (error) {
      setIsUploading(false)
      console.error('Erro ao fazer o upload do vídeo:', error);
      message.error('Erro ao fazer o upload do vídeo. Tente novamente.');
      return false;
    }
  };
  
  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.video.srcObject, {
      mimeType: 'video/mp4',
    });
    mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
    mediaRecorderRef.current.start();
  }, [webcamRef]);

  const handleDataAvailable = useCallback(({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  }, []);

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
    
  }, [mediaRecorderRef]);

  const handlePreview = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/mp4',
      });
      const url = URL.createObjectURL(blob);
      setVideoPreviewUrl(url);
  
      const file = new File([blob], 'recorded-video.mp4', {
        type: 'video/mp4',
      });
  
      setVideoFile(file);
    }
  }, [recordedChunks]);
  

  useEffect(() => {
    handlePreview()
  }, [recordedChunks])

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
                  Record new video
                </span>
              </h2>

              <button onClick={onClose} type="button" className="inline-flex items-center justify-center w-6 h-6 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className='px-6 pt-6 text-center space-y-2'>
              {videoPreviewUrl ? (
                <video src={videoPreviewUrl} controls autoPlay />
              ) : (
                <Webcam ref={webcamRef} audio={true} />
              )}
              {capturing ? (
                <button  className="h-12 w-12 rounded-full hover:bg-red-700 bg-red-600 transition-all"  onClick={handleStopCaptureClick}></button>
              ) : (
                <button className="h-12 w-12 rounded-full bg-red-700 hover:bg-red-600 transition-all"  onClick={handleStartCaptureClick}></button>
              )}
            </div>

            <div className='flex-grow px-6 py-5 md:self-end'>
              <div className='flex items-center gap-3 sm:flex-row justify-end'>
                <button onClick={onClose} className="text-sm font-medium text-black hover:opacity-80 hover:underline">
                  Cancel
                </button>

                <AppButton onClick={() => onSendUploadVideoToFeed(videoFile)} disabled={!recordedChunks.length || isUploading}>
                  Next
                  {isUploading && 
                    <Spin className='m-auto px-1' /> 
                  }
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
});

const mapDispatch = {
  updateModals,
};

export default connect(mapState, mapDispatch)(VideoCameraModal);
