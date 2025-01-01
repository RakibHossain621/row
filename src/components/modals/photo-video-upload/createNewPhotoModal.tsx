import React, { useState, useCallback } from 'react';

import * as yup from "yup"

import { AppButton } from '@components/ui/shared/AppButton';
import { connect, useDispatch } from 'react-redux';
import { updateModals } from '@redux/modals/actions';
import useClickOutside from 'src/hooks/useClickOutside';
import useDisableScroll from 'src/hooks/useDisabledScroll';
import { RecordIcon, UploadIcon } from './icons';
import { feedService } from '@services/feed.service';
import { message } from 'antd';
import { getResponseError } from '@lib/utils';
import UploadList from '@components/file/list-media';
import { IPerformer } from '@interfaces/performer';
import { useRouter } from 'next/router';
import { getGlobalConfig } from '@services/config';
import { generateUuid } from '@lib/string';

interface ModalProps {
  modalProps: {
    isOpen: boolean,
    imageInfos: {
      fileList: [],
      fileIds: string[]
    };
  }
  onClose: () => void;
  currentUser?: IPerformer
}

const getDuration = (file) => new Promise((resolve, reject) => {
  try {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = function onLoadMetaData() {
      resolve(this);
    };
    video.onerror = function error() {
      Promise.reject(
        new Error('Invalid video. Please select a video file.')
      );
    };
    video.src = window.URL.createObjectURL(file);
  } catch (e) {
    reject(e);
  }
});

const CreateNewPhotoModal = ({ modalProps, onClose, currentUser }: ModalProps) => {
  const router = useRouter()
  const [, updateState] = React.useState() as any;
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const dispatch = useDispatch()
  const [isUploading, setUploading] = useState(false)

  const [hashtag1, setHashtag1] = useState('')
  const [hashtag2, setHashtag2] = useState('')
  const [hashtag3, setHashtag3] = useState('')

  const [isPublic, setIsPublic] = useState(true)

  const onsubmit = async () => {
    const description = `#${hashtag1.split(' ').join('')} ${hashtag2 ? `#${hashtag2.split(' ').join('')}` : ''
      } ${hashtag3 ? `#${hashtag3.split(' ').join('')}` : ''
      } `;
      
    const ObjectToSend = {
      thumbnailId: modalProps.imageInfos.fileIds[0] || null,
      type: 'photo',
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

    try {
      setUploading(true);

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

  const remove = useCallback((file) => {
    dispatch(updateModals({
      uploadPhotoModal: {
        isOpen: true,
        imageInfos: {
          // @ts-expect-error
          fileList: modalProps.imageInfos.fileList.filter((f) => f?._id !== file?._id || f?.uid !== file?.uid) || modalProps.imageInfos.fileList,
          fileIds: modalProps.imageInfos.fileIds.filter((id) => id !== file?._id) || modalProps.imageInfos.fileIds
        }
      }
    }))
  }, []);

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
        isPhotoCameraModal: false,
        uploadPhotoModal: {
          isOpen: true,
          imageInfos: {
            fileList: modalProps.imageInfos.fileList.length
              ? [...modalProps.imageInfos.fileList, {
                  thumnail: URL.createObjectURL(file),
                  percent: 100,
                  status: 'done',
                  url: URL.createObjectURL(file),
                  uid: generateUuid(),
                  type: file.type || 'image/png'
                }]
              : [{
                  thumnail: URL.createObjectURL(file),
                  percent: 100,
                  status: 'done',
                  url: URL.createObjectURL(file),
                  uid: generateUuid(),
                  type: file.type || 'image/png'
                }],
            fileIds: modalProps.imageInfos.fileIds.length
              ? [...modalProps.imageInfos.fileIds, resp.data.fileId]
              : [resp.data.fileId]
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


  useDisableScroll(modalProps?.isOpen);
  const ref = useClickOutside(onClose);

  if (!modalProps?.isOpen) {
    return null;
  }

  return (
    <>
      <div tabIndex={-1} aria-hidden="true" className={`overflow-y-auto px-5 overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${modalProps?.isOpen ? 'block' : 'hidden'}`}>
        <div ref={ref} role='dialog' className="w-full max-w-[580px] max-h-full m-auto">
          <div className="bg-white rounded-lg shadow text-leftt">
            <div className="flex justify-between px-5 py-5 border-b rounded-t border-base-400">
              <h2 className="inline-flex items-center gap-x-2">
                <span className='text-xl text-black'>
                  Post new photo
                </span>
              </h2>

              <button onClick={onClose} type="button" className="inline-flex items-center justify-center w-6 h-6 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className='p-4 flex items-center justify-center md:justify-between gap-8 md:gap-4 md:flex-nowrap flex-wrap'>
              <article>
                <h3 className='text-black font-semibold text-lg text-center'>Step 1</h3>
                <h4 className='text-black text-lg'>Take a photo with your webcam or upload a photo from your computer</h4>
              </article>

              <div className='text-black text-center font-semibold whitespace-nowrap relative'>
                <input className='absolute inset-0 opacity-0' onChange={(e) => onFinishFileCapture(e.target.files[0])} type='file' multiple={false} />
                <span className='text-black h-20 w-20 rounded-full bg-purple-800 mb-2 flex items-center justify-center'>
                  <UploadIcon />
                </span>
                Upload photo
              </div>
              <button 
                className='text-black text-center font-semibold whitespace-nowrap'
                onClick={() => dispatch(updateModals({
                  isPhotoCameraModal: true,
                  uploadPhotoModal: {
                    isOpen: false,
                    ...modalProps
                  }
                }))}
              >
                <span className='text-black h-20 w-20 rounded-full bg-black mb-2 flex items-center justify-center'>
                  <RecordIcon />
                </span>
                Take Photo
              </button>
            </div>

            <UploadList
              type={'photo'}
              files={modalProps.imageInfos.fileList || []}
              remove={remove}
              onAddMore={() => {}}
              uploading={isUploading}
            />

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

                <AppButton onClick={onsubmit} size='base' type='submit' disabled={false}>Next</AppButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-30 ${modalProps?.isOpen ? 'block' : 'hidden'}`} />
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

export default connect(mapState, mapDispatch)(CreateNewPhotoModal);
