import React, { useState } from 'react';

import * as yup from "yup"

import { AppButton } from '@components/ui/shared/AppButton';
import { generateUuid } from '@lib/string';

import { connect, useDispatch } from 'react-redux';
import { updateModals } from '@redux/modals/actions';
import useClickOutside from 'src/hooks/useClickOutside';
import useDisableScroll from 'src/hooks/useDisabledScroll';
import dynamic from 'next/dynamic';
import { message } from 'antd';
import { feedService } from '@services/feed.service';

interface ModalProps {
  isOpen: boolean;
  modalProps: {
    isOpen: boolean,
    imageInfos: {
      fileList: [],
      fileIds: string[]
    };
  };
  onClose: () => void;
}

const CapturePhoto = dynamic(() => import('@components/photo/capture-photo'), { ssr: false });

const PhotoCameraModal: React.FC<ModalProps> = ({ isOpen, onClose, modalProps }) => {
  const dispatch = useDispatch()
  const [uploading, setUploading] = useState(false);
  // I don't know why this is required, I just replicated this from legacy code.
  const [, updateState] = React.useState() as any;
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useDisableScroll(isOpen);
  const ref = useClickOutside(onClose);

  if (!isOpen) {
    return null;
  }

  const onUploading = (file, resp: any) => {
    // eslint-disable-next-line no-param-reassign
    file.percent = resp.percentage;
    // eslint-disable-next-line no-param-reassign
    if (file.percent === 100) file.status = 'done';
    forceUpdate();
  };

  const onFinishPhotoCapture = async (fileUrl) => {
    try {
      const fileName = 'thumbnails.png';
      let file = null;
      const blobBin = atob(fileUrl.split(',')[1]);
      const array = [];
      for (let i = 0; i < blobBin.length; i += 1) {
        array.push(blobBin.charCodeAt(i));
      }
      file = new File(
        [new Blob([new Uint8Array(array)], { type: 'image/*' })],
        fileName,
        {
          type: 'image/png'
        }
      );
      
      setUploading(true);
      const resp = (await feedService.uploadFile(
        file,
        {},
        onUploading.bind(this, file)
      )) as any;
      dispatch(updateModals({
        isPhotoCameraModal: false,
        uploadPhotoModal: {
          isOpen: true,
          imageInfos: {
            fileList: modalProps.imageInfos.fileList.length ? [
              ...modalProps.imageInfos.fileList, 
              {
              thumnail: fileUrl,
              percent: 100,
              status: 'done',
              url: fileUrl,
              uid: generateUuid(),
              type: 'image/png'
            }] : [{
              thumnail: fileUrl,
              percent: 100,
              status: 'done',
              url: fileUrl,
              uid: generateUuid(),
              type: 'image/png'
            }],
            fileIds: modalProps.imageInfos.fileIds.length ? [...modalProps.imageInfos.fileIds, resp.data.fileId] : [resp.data.fileId]
          }
        }
      }))
      setUploading(false);
     
      return true;
    } catch (error) {
      message.error('Error uploading ! Please try again');
      console.error(error)
      setUploading(false);
      return false;
    }
  };
  
  return (
    <>
      <div tabIndex={-1} aria-hidden="true" className={`overflow-y-auto px-5 overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isOpen ? 'block' : 'hidden'}`}>
        <div ref={ref} role='dialog' className="w-full max-w-[580px] max-h-full m-auto">
          <div className="bg-white rounded-lg shadow">
            <div className="flex justify-between px-5 py-5 border-b rounded-t border-base-400">
              <h2 className="inline-flex items-center gap-x-2">
                <span className='text-xl text-black'>
                  Take photo
                </span>
              </h2>

              <button onClick={onClose} type="button" className="inline-flex items-center justify-center w-6 h-6 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className='px-6 pt-6'>
              <CapturePhoto 
                onFinish={onFinishPhotoCapture} 
                onCancel={() => null} 
                capturing={uploading}
              />

            </div>

            <div className='flex-grow px-6 py-5 md:self-end'>
              <div className='flex items-center gap-3 sm:flex-row justify-end'>
                <button onClick={onClose} className="text-sm font-medium text-black hover:opacity-80 hover:underline">
                  Cancel
                </button>

                <AppButton type='submit' form='goLiveForm' disabled={false}>Next</AppButton>
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

export default connect(mapState, mapDispatch)(PhotoCameraModal);
