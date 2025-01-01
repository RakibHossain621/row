import React, { useState, useEffect } from 'react';
import { AppButton } from '@components/ui/shared/AppButton';

import { connect, useDispatch } from 'react-redux';
import { updateModals } from '@redux/modals/actions';
import useDisableScroll from 'src/hooks/useDisabledScroll';
import useClickOutside from 'src/hooks/useClickOutside';
import { ProfileIcon, RubyIcon, RubySmallIcon, TickIcon } from 'src/icons';
import { PersonSmallWhiteIcon } from '@components/stream/icons';
import { performerService } from '@services/performer.service';
import { IPerformer } from '@interfaces/performer';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  performerId: string
}

const CrossPromotionPurchaseModal: React.FC<ModalProps> = ({ isOpen, onClose, performerId }) => {
  const dispatch = useDispatch()

  const [performer, setPerformer] = useState<IPerformer | null>(null)

  const openPurchaseRubysModal = () => {
    dispatch(
      updateModals({
        crossPromotionPurchaseModal: {
          isOpen: false,
          performerId: ''
        }
      })
    )
    return
  }

  useDisableScroll(isOpen);
  const ref = useClickOutside(onClose);

  const getPerformer = async () => {
    const respPerformerProfile = await performerService.search({
      performerIds: performerId
    })

    if (respPerformerProfile.data.total) {
      setPerformer(respPerformerProfile.data.data[0])
    }
  }

  useEffect(() => {
    performerId && getPerformer()
  }, [performerId])

  useEffect(() => {
    console.log('performer', performer)
  }, [performer])

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
                  
                </span>
              </h2>

              <button onClick={onClose} type="button" className="inline-flex items-center justify-center w-6 h-6 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </header>
            
            <div className='border-b'>
              <h2 className='py-6 px-6 mx-6 text-4xl text-center text-black pb-4'>Boost your fans with cross promotion!</h2>
              <p className='text-lg text-center text-black pb-4'>My content will promote you!</p>

              <div className='bg-gray-100 flex items-center justify-center w-full py-6 px-6'>
                <div className='overflow-hidden rounded-lg max-w-[12rem] relative'>
                  <div className='bg-purple-700 py-2 px-6 text-white flex gap-1 items-center justify-center font-semibold'><PersonSmallWhiteIcon /> {performer?.stats.totalFollower || 0} fans</div>
                  <img className='w-full rounded-b-lg' src={performer?.avatar ? performer.avatar : "/images/default-avatar.png"} alt="" />
                  <div className='absolute bottom-1 right-0 left-0 flex items-start justify-center flex-col p-2 px-3'>
                    <p className='font-semibold text-white'>{performer?.name}</p>
                    <p className='text-white text-sm'>@{performer?.username}</p>
                  </div>
                </div>
              </div>

              <div className='py-6 px-6 bg-gray-200'>
                <table className='table-fixed border-collapse w-full'>
                  <thead>
                    <th className='bg-white border text-center p-2 font-normal'>Videos</th>
                    <th className='bg-white border text-center p-2 font-normal'>Photos</th>
                    <th className='bg-white border text-center p-2 font-normal'>Total views</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='bg-white border text-center p-2 font-semibold'>{performer?.stats.totalActiveVideos}</td>
                      <td className='bg-white border text-center p-2 font-semibold'>{performer?.stats.totalActivePhotos}</td>
                      <td className='bg-white border text-center p-2 font-semibold'>{performer?.stats.views}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className='bg-gray-100 flex items-center justify-center flex-col w-full py-6 px-6'>
                <div className='bg-white w-[200px] h-[200px] rounded-full flex flex-col items-center justify-center'>
                  <h5 className='text-4xl text-center text-black'>10 days</h5>
                  <h6 className='text-center'>1000 <RubySmallIcon /></h6>
                </div>
                <p className='text-lg text-black py-6 text-center'>During this time a link to your profile will appear on every video and photo in my library</p>
              </div>
            </div>

            <footer className="w-full pt-4 text-right flex items-center flex-col gap-2">
              <p className='text-center text-black'>Next available promo period starts in</p>
              <p className='text-center text-black font-semibold'>hh:mm:ss</p>
              <div className="mt-3 p-4 pt-6 flex items-center justify-between gap-2 w-full border-t border-gray-300">
                <div className='flex-1 flex items-center justify-start gap-2'>
                  <input color='#000000' className='text-black rounded' type="checkbox" />
                  <label className='text-black'>Confirm purchase</label>
                </div>  
                <AppButton 
                  variant="default" 
                  className="mx-1 border-0 ml-auto md:w-auto order-3 md:order-2 text-white"
                  onClick={onClose}
                >
                  Submit Order
                </AppButton>
              </div>
              <div className="p-4 flex items-center justify-between gap-2 w-full bg-gray-100">
                <span className='font-semibold'>Ruby balance</span>
                <span className='mr-auto text-lg text-black'>15403 <RubySmallIcon /></span>
                <a className='font-semibold text-purple-700' href="">Need help?</a>
              </div>
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

export default connect(mapState, mapDispatch)(CrossPromotionPurchaseModal);
