import React, { useState, useEffect } from 'react';
import { AppButton } from '@components/ui/shared/AppButton';

import { connect, useDispatch } from 'react-redux';
import { updateModals } from '@redux/modals/actions';
import useDisableScroll from 'src/hooks/useDisabledScroll';
import useClickOutside from 'src/hooks/useClickOutside';
import { AppInput } from '@components/ui/shared/AppInput';
import { CautionIcon, WarningIcon } from 'src/icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportLiveStreamModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()

  const onLiveStreamEnd = (data) => {
    dispatch(
      updateModals({
        isReportLiveStreamModalOpen: false
      })
    )
    return
  }

  useDisableScroll(isOpen);
  const ref = useClickOutside(onClose);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div tabIndex={-1} aria-hidden="true" className={`overflow-y-auto px-5 overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isOpen ? 'block' : 'hidden'}`}>
        <div ref={ref} role='dialog' className="w-full max-w-4xl max-h-full m-auto">
          <div className="bg-white rounded-lg shadow m-auto w-11/12 md:w-1/2">
            <header className="flex justify-between px-5 pt-4 rounded-t border-base-400">
              <h2 className="inline-flex items-center gap-x-2">
                <CautionIcon />
                <span className='text-xl text-black'>
                  Report violation
                </span>
              </h2>

              <button onClick={onClose} type="button" className="inline-flex items-center justify-center w-6 h-6 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </header>
            <div className='p-4 pt-6'>
              <div className='grid grid-cols-3 p-4 gap-2'>
                <img className='w-full min-h-20 bg-black' src="/images/logo.png" alt="" />
                <img className='w-full min-h-20 bg-black' src="/images/logo.png" alt="" />
                <img className='w-full min-h-20 bg-black' src="/images/logo.png" alt="" />
              </div>
              <p className='text-sm md:text-md'>Please provide details about this report.</p>
              <textarea placeholder='Tell us why you reported the user' className='min-h-10 w-full rounded-lg p-4' name="report-message" id="report-message" maxLength={400}></textarea>
              <legend className='w-full text-right text-sm'>0/400</legend>
            </div>
            
            <footer className="w-full p-4 border-t text-right">
              <AppButton 
                variant="tertiary" 
                className="mx-1 border-0"
                onClick={onClose}
              >
                Cancel
              </AppButton>
              <AppButton 
                variant="default" 
                className="px-2 bg-red-700" 
                disabled={false}
                onClick={onLiveStreamEnd}
              >
                  Submit
              </AppButton>
            </footer>
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

export default connect(mapState, mapDispatch)(ReportLiveStreamModal);
