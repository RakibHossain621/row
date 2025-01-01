import React, { useState, useEffect } from 'react';
import { AppButton } from '@components/ui/shared/AppButton';

import { connect, useDispatch } from 'react-redux';
import { updateModals } from '@redux/modals/actions';
import useDisableScroll from 'src/hooks/useDisabledScroll';
import useClickOutside from 'src/hooks/useClickOutside';
import { ProfileIcon, RubyIcon, TickIcon } from 'src/icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  performerInfos: any | null,
  performerTotalFollowers: number
}

const WaitingForModelModal: React.FC<ModalProps> = ({ isOpen, onClose, performerInfos, performerTotalFollowers }) => {
  const dispatch = useDispatch()

  const openPurchaseRubysModal = () => {
    dispatch(
      updateModals({
        isNotEnoughRubysLiveModal: true,
        // confirmPrivateVideoModal: {
        //   isOpen: false,
        //   performerInfos: null,
        //   performerTotalFollowers: 0
        // }
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
              <h2 className="inline-flex items-center gap-x-4">
                <span className='text-xl text-black'>
                  Waiting for model
                </span>
              </h2>

              <button onClick={onClose} type="button" className="inline-flex items-center justify-center w-6 h-6 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </header>
            
            <div className='py-6 px-6 mx-6 border-b'>
              <div 
                className="bg-center bg-cover relative performer-profile-image-ratio max-w-[150px] mx-auto rounded" 
                style={{ 
                  backgroundImage: `url(${performerInfos?.avatar || '/static/no-avatar.png'})` 
                }}
              >
                <header className='absolute top-0 right-0 left-0 z-30 p-2 py-3'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-1'>
                        <span className='block w-5 h-5 rounded-full bg-green-500'></span>
                        <span className='text-white'>Active</span>
                      </div>
                    </div>
                </header>

                <div className='absolute top-0 left-0 right-0 bottom-0 m-auto bg-black/30 z-10' />
                <div className="absolute top-0 left-0 right-0 bottom-0 m-auto flex flex-col items-baseline justify-end z-20 px-3 py-2">
                  <p className="text-white font-semibold flex items-center">
                    {performerInfos?.name?.split(' ')[0].substring(0, 10) || performerInfos?.username?.split(' ')[0].substring(0, 15) || 'N/A'}
                    {performerInfos?.verifiedAccount && <TickIcon className='ml-2' />}
                  </p>
                  <div className='flex items-center justify-between w-full'>
                    <p className="text-white flex items-center ml-[-3px]">
                      <ProfileIcon />
                      {performerTotalFollowers || 0}
                      {' '}
                      Fans
                    </p>
                  </div>
                </div>
              </div>
              <AppButton
                className={`rounded-t-none w-full rounded-b-lg ${ performerInfos.gender === 'male' ? 'bg-blue-900' : ''} w-[150px] mx-auto block`}
                variant='noFlex'
              >
                <span>Follow</span>
              </AppButton>
            </div>
            <div className='py-6 px-0 mx-6 border-b flex items-center justify-center flex-col'>
              <h2 className='text-3xl font-semibold text-black'>Business time</h2>
              <h3 className='text-xl pb-4 text-black'>will be joining you within the next</h3>
              <div className='bg-gray-200 rounded-full px-3 py-4 font-semibold text-black text-center -space-y-2'>
                <p className='text-2xl'>120</p>
                <p>seconds</p>
              </div>
            </div>

            <div className='py-6 px-0 mx-6 border-b'>
                <div className='flex items-center justify-between pb-3'>
                  <h2 className='font-semibold text-lg text-black/90'>Private room fee  </h2>
                  <a className='text-purple-800 text-lg' href='#'>Need help?</a>
                </div>
                <table className='w-full'>
                  <thead className='border-b'>
                    <th className='text-left text-black/90 py-2'>
                      # of Rubys
                    </th>
                    <th className='text-left text-black/90 py-2'>
                      Details
                    </th>
                  </thead>
                  <tbody>
                    <tr className='border-b'>
                      <td className='flex items-center text-2xl py-2 text-black/90'>
                        5 <img src='/static/gem.png' />
                      </td>
                      <td className='py-2'>
                        for the first minute
                      </td>
                    </tr>
                    <tr className='border-b'>
                      <td className='flex items-center text-2xl py-2 text-black/90'>
                        1 <img src='/static/gem.png' />
                      </td>
                      <td className='py-2'>
                        Each additional minute
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className='pt-5'>Note: Private room fee will be automatically deducted from your account at the beginning of each minute.</p>
            </div>

            <footer className="w-full p-4 pb-6 text-right flex items-center flex-col md:flex-row gap-2 md:gap-0">
              <fieldset className="py-3 px-2 flex items-center justify-start gap-2 w-full order-1">
               
                <a className='text-purple-800 font-semibold' href="#">Terms and Conditions</a>
              </fieldset>
              <AppButton 
                variant="tertiary" 
                className="mx-1 border-0 ml-auto w-full md:w-auto order-3 md:order-2 bg-black/90 text-white"
                onClick={onClose}
              >
                Cancel
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

export default connect(mapState, mapDispatch)(WaitingForModelModal);
