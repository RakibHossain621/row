import React, { useState, useEffect } from 'react';
import { AppButton } from '@components/ui/shared/AppButton';

import { connect, useDispatch } from 'react-redux';
import { updateModals } from '@redux/modals/actions';
import useDisableScroll from 'src/hooks/useDisabledScroll';
import useClickOutside from 'src/hooks/useClickOutside';
import { AppInput } from '@components/ui/shared/AppInput';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotEnoughRubysLiveModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()

  const openPurchaseRubysModal = () => {
    dispatch(
      updateModals({
        isBuyRubiesModalOpen: true,
        isNotEnoughRubysLiveModal: false
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
        <div ref={ref} role='dialog' className="w-full max-w-3xl max-h-full m-auto">
          <div className="bg-white rounded-lg shadow m-auto w-11/12 md:w-1/2">
            <header className="flex justify-between px-5 pt-4 rounded-t border-base-400">
              <h2 className="inline-flex items-center gap-x-4">
                <img src="/static/caution-icon.png" alt="Caution Icon" />
                <span className='text-xl text-black'>
                  Not enough Rubys
                </span>
              </h2>

              <button onClick={onClose} type="button" className="inline-flex items-center justify-center w-6 h-6 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </header>
            <p className='text-black/90 text-sm md:text-md p-6 pb-0'>To continue you will need to purchase additional Rubys. </p>
            <div className='py-6 px-0 mx-6 border-b'>
              
            </div>
            

            <footer className="w-full p-4 pb-6 text-right">
              <AppButton 
                variant="tertiary" 
                className="mx-1 border-0"
                onClick={onClose}
              >
                Cancel
              </AppButton>
              <AppButton 
                variant="default" 
                className="px-4" 
                disabled={false}
                onClick={openPurchaseRubysModal}
              >
                  Purchase Rubys
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

export default connect(mapState, mapDispatch)(NotEnoughRubysLiveModal);
