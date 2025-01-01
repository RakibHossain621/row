import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AppButton } from '@components/ui/shared/AppButton';
import { connect, useDispatch } from 'react-redux';
import { streamService } from '@services/stream.service';
import { updateModals } from '@redux/modals/actions';
import useDisableScroll from 'src/hooks/useDisabledScroll';
import { message } from 'antd';
import { useRouter } from 'next/router';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any; 
  updateModals: Function
}

const schema = yup.object({
  checkbox: yup.boolean().oneOf([true], 'You must agree to the community guidelines'),
});

const GoLiveModal: React.FC<ModalProps> = ({ isOpen, onClose, currentUser, updateModals }) => {  // currentUser se pasa aquí
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const webrtcAdaptorRef = useRef<any>(null);
  const router = useRouter();

  const { register, handleSubmit, formState: { isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await streamService.goLive();

      router.push(`/stream/${currentUser?.username}`);
    } catch (error) {
      console.error('Error starting live stream:', error);
      message.error('Failed to go live. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useDisableScroll(isOpen);

  useEffect(() => {
    if (isOpen) {
      const startVideo = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error('Error accessing camera: ', err);
          message.error('Failed to access the camera.');
        }
      };
      startVideo();
    }
  }, [isOpen]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        tabIndex={-1}
        aria-hidden="true"
        className={`overflow-y-auto px-5 overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={handleOutsideClick}
      >
        <div role="dialog" className="w-full max-w-[432px] max-h-full m-auto">
          <div className="bg-white rounded-lg shadow">
            <div className="flex justify-between px-5 py-5 border-b rounded-t border-base-400">
              <h2 className="inline-flex items-center gap-x-2">
                <span className="text-xl text-black">Get ready to go live</span>
              </h2>

              <button
                onClick={onClose}
                type="button"
                className="inline-flex items-center justify-center w-6 h-6 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="flex h-56 py-3 bg-base-200">
              <video ref={videoRef} id="localVideo" className="m-auto w-[120px] h-full bg-black" autoPlay muted />
            </div>

            <div className="px-6 pt-5">
              <div className="pb-5 border-b border-base-400">
                <div className="flex justify-between mb-2">
                  <h4 className="font-semibold text-black">Model Guidelines</h4>

                  <Link href="/help" passHref>
                    <a className="font-medium text-center text-purple-800 hover:underline">Need Help?</a>
                  </Link>
                </div>

                <ol className="text-sm text-black list-decimal list-inside">
                  <li>No nudity is permitted.</li>
                  <li>Typing disabled. Speak to commenters.</li>
                  <li>Be friendly, outgoing and respectful.</li>
                </ol>

                <hr className="h-px my-4 border-0 bg-base-400" />

                <form id="goLiveForm">
                  <label className="inline-flex gap-2 text-sm text-black text-baseline">
                    <input
                      type="checkbox"
                      {...register('checkbox')}
                      className="w-4 h-4 mr-auto text-base bg-gray-100 rounded border-base-400 checked: text-base-900 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 checked:bg-black"
                      onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                    />

                    <div className="flex flex-col">
                      <span className="text-sm text-black">I have read the Community Guidelines.</span>
                      <span className="text-base-500 text-[10px]">Terms and conditions: updated on 10/10/2024</span>
                    </div>
                  </label>
                </form>
              </div>
            </div>

            <div className="flex-grow px-6 py-5 md:self-end">
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                <button className="font-medium text-center text-purple-800 hover:underline" onClick={() => updateModals({ isStreamMutedListModalOpen: true })}>
                Muted list
                </button>

                <div className="inline-flex gap-3 md:gap-6">
                  <button onClick={onClose} className="text-sm font-medium text-black hover:opacity-80 hover:underline">
                    Cancel
                  </button>

                  <AppButton
                    onClick={handleSubmit(onSubmit)}
                    type="submit"
                    form="goLiveForm"
                    disabled={!isCheckboxChecked || isLoading}
                    loading={isLoading}
                  >
                    Start streaming
                  </AppButton>
                </div>
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
  currentUser: state.user.current, // Asegurarse de pasar currentUser correctamente
});

const mapDispatch = {
  updateModals,
};

export default connect(mapState, mapDispatch)(GoLiveModal);
