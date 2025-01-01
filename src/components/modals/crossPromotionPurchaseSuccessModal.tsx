import React, { useState, useEffect } from 'react';
import { AppButton } from '@components/ui/shared/AppButton';

import { connect, useDispatch } from 'react-redux';
import { updateModals } from '@redux/modals/actions';
import useDisableScroll from 'src/hooks/useDisabledScroll';
import useClickOutside from 'src/hooks/useClickOutside';
import { RubySmallIcon } from 'src/icons';
import { PersonSmallWhiteIcon } from '@components/stream/icons';
import { performerService } from '@services/performer.service';
import { IPerformer } from '@interfaces/performer';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  performerId: string
}

const SuccessCrossPromotionIcon = () => {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="30" fill="#212121"/>
      <mask id="mask0_6896_176912" maskUnits="userSpaceOnUse" x="14" y="15" width="31" height="30">
      <rect x="14.5" y="15" width="30" height="30" fill="#D9D9D9"/>
      </mask>
      <g mask="url(#mask0_6896_176912)">
      <path d="M43.9575 27.9447L39.0682 20.6341C38.9366 20.4372 38.6829 20.3777 38.4829 20.4966C37.7047 20.9607 36.7618 20.9881 35.9602 20.5694L33.4674 19.2679C32.269 18.6423 30.8682 18.5806 29.6235 19.0985L27.2901 20.0697C26.9656 20.2046 26.6709 20.3952 26.4148 20.633C26.2628 20.6159 26.1088 20.607 25.9554 20.607C25.3146 20.607 24.6709 20.7615 24.0945 21.0535C23.5918 21.3084 22.9887 21.2683 22.5204 20.9491L21.1068 19.985C21.0079 19.9178 20.8876 19.894 20.7723 19.9193C20.657 19.9445 20.5556 20.0166 20.4912 20.1199L15.8224 27.5865C15.6882 27.8013 15.7459 28.0892 15.9515 28.2293L17.6608 29.3948C17.8259 29.5074 17.9668 29.6511 18.0786 29.8217C18.1903 29.9926 18.2675 30.1817 18.3081 30.3838C18.3895 30.7895 18.5692 31.1689 18.824 31.4839L18.5457 31.9286C17.9825 32.8292 18.2259 34.0404 19.0883 34.6285C19.3929 34.8362 19.7455 34.9458 20.1085 34.9458C20.2914 34.9458 20.47 34.9176 20.6404 34.8652C20.6468 34.9172 20.6547 34.9692 20.665 35.0209C20.7674 35.531 21.0539 35.9687 21.4716 36.2533C21.7761 36.461 22.1288 36.5709 22.492 36.5709C22.6753 36.5709 22.8539 36.5427 23.0243 36.49C23.0909 37.0383 23.378 37.5537 23.8548 37.8788C24.1594 38.0864 24.512 38.1964 24.8749 38.1964C25.0578 38.1964 25.2364 38.1682 25.4069 38.1154C25.4133 38.1675 25.4211 38.2195 25.4314 38.2715C25.5339 38.7812 25.8203 39.2189 26.238 39.5039C26.5426 39.7115 26.8952 39.8212 27.2585 39.8212C27.8925 39.8212 28.4775 39.4905 28.8233 38.9373L29.0418 38.5884L30.8198 39.7885C31.1343 40.0028 31.488 40.1054 31.8385 40.1054C32.4487 40.1054 33.0475 39.794 33.4055 39.2219C33.6126 38.8905 33.7104 38.5174 33.7086 38.1485C33.9168 38.228 34.1331 38.2671 34.3484 38.2671C34.9586 38.2671 35.5574 37.9557 35.9153 37.3836C36.1359 37.0306 36.2324 36.6301 36.2167 36.2377C36.3982 36.289 36.5854 36.3154 36.7743 36.3154C36.9226 36.3154 37.0721 36.2994 37.2208 36.2667C37.7837 36.1434 38.2665 35.7986 38.5811 35.2959C38.8494 34.8668 38.9671 34.3663 38.9223 33.8636C39.1411 33.939 39.3678 33.9758 39.593 33.9758C40.2982 33.9758 40.9913 33.6166 41.4023 32.9601C41.6314 32.5937 41.7524 32.1691 41.7524 31.7325C41.7524 31.4189 41.6887 31.1072 41.5677 30.8211C41.6926 30.3634 41.9631 29.9658 42.3402 29.6906L43.8478 28.5912C44.0488 28.4448 44.098 28.155 43.9575 27.9447ZM19.5749 33.8506C19.123 33.5426 18.9956 32.908 19.2906 32.4362L20.036 31.2447C20.2175 30.9545 20.5242 30.7814 20.8561 30.7814C21.0458 30.7814 21.2301 30.839 21.3902 30.9482C21.8417 31.2562 21.9695 31.8904 21.6745 32.3623L20.9291 33.5538C20.748 33.8436 20.4413 34.0167 20.1086 34.0167C19.919 34.0171 19.7346 33.9595 19.5749 33.8506ZM21.9581 35.4757C21.7393 35.3263 21.5891 35.0971 21.5354 34.83C21.4816 34.5628 21.5307 34.2901 21.6738 34.0617L22.4192 32.8701C22.6003 32.5803 22.907 32.4072 23.2394 32.4072C23.429 32.4072 23.6137 32.4648 23.7734 32.5736C23.9923 32.723 24.1424 32.9522 24.1961 33.2194C24.2499 33.4865 24.2008 33.7592 24.0577 33.9877L23.3123 35.1792C23.1312 35.469 22.8245 35.6421 22.4922 35.6421C22.3025 35.6421 22.1178 35.5846 21.9581 35.4757ZM24.3413 37.1012C23.8894 36.7932 23.762 36.1586 24.057 35.6867L24.8024 34.4952C24.9839 34.2051 25.2906 34.0319 25.6226 34.0319C25.8122 34.0319 25.9965 34.0895 26.1567 34.1988C26.6082 34.5068 26.7359 35.141 26.4409 35.6128L25.6955 36.8043C25.5144 37.0941 25.2077 37.2673 24.875 37.2673C24.6854 37.2677 24.5011 37.21 24.3413 37.1012ZM27.2586 38.8927C27.0689 38.8927 26.8843 38.8351 26.7249 38.7266C26.506 38.5773 26.3559 38.3481 26.3022 38.0809C26.2484 37.8138 26.2975 37.5411 26.4402 37.3129L26.7914 36.7519L27.1856 36.1214C27.3667 35.8316 27.6734 35.6585 28.0058 35.6585C28.1954 35.6585 28.3801 35.7161 28.5398 35.8249C28.7587 35.9743 28.9088 36.2035 28.9626 36.4707C29.0163 36.7378 28.9672 37.0105 28.8241 37.239L28.0787 38.4305C27.8976 38.7195 27.5909 38.8927 27.2586 38.8927ZM40.657 32.4526C40.2816 33.053 39.5041 33.2295 38.9245 32.8461C38.9217 32.8442 38.9195 32.8427 38.9163 32.8409L33.6657 29.2599L33.1793 30.0375L37.4689 32.9629C37.7514 33.1558 37.945 33.4515 38.0144 33.7963C38.0838 34.1411 38.0204 34.4933 37.8358 34.7883C37.6515 35.0833 37.3679 35.2854 37.0377 35.3578C36.7075 35.4303 36.3702 35.3638 36.0877 35.1713L31.7978 32.2459L31.3114 33.0235L34.8862 35.4615C35.3381 35.7695 35.4655 36.4041 35.1705 36.8756C34.8756 37.3474 34.2679 37.4804 33.8163 37.1724L32.8631 36.5226L30.2411 34.7348L29.7547 35.5124L32.3766 37.3002C32.8282 37.6082 32.9555 38.2424 32.6606 38.7143C32.5175 38.9428 32.298 39.0996 32.0422 39.1557C31.7864 39.2118 31.5252 39.1605 31.3042 39.01L29.528 37.8111L29.5686 37.7461C29.8415 37.3099 29.9354 36.789 29.833 36.2789C29.7305 35.7688 29.444 35.3311 29.0263 35.0465C28.7218 34.8389 28.3691 34.7292 28.0059 34.7292C27.8226 34.7292 27.644 34.7575 27.4736 34.8102C27.4067 34.2622 27.1199 33.7465 26.6431 33.4218C26.3382 33.2138 25.9856 33.1038 25.6227 33.1038C25.4398 33.1038 25.2615 33.132 25.0911 33.1844C25.0847 33.1324 25.0769 33.0804 25.0665 33.0287C24.9641 32.5186 24.6776 32.0809 24.2599 31.7964C23.9554 31.5887 23.6027 31.4787 23.2395 31.4787C23.0562 31.4787 22.8776 31.5069 22.7072 31.5597C22.6403 31.0117 22.3535 30.496 21.8767 30.1713C21.5718 29.9632 21.2192 29.8532 20.8563 29.8532C20.2557 29.8532 19.6988 30.1505 19.3476 30.6531C19.269 30.5108 19.2113 30.3555 19.1786 30.1935C19.1142 29.8718 18.9911 29.5705 18.8128 29.2978C18.6346 29.0258 18.4104 28.7966 18.1471 28.6171L16.8106 27.7054L20.9937 21.0171L22.0352 21.7274C22.7632 22.2238 23.7014 22.2858 24.4838 21.8898C24.8692 21.6943 25.2929 21.5769 25.7206 21.5454L23.4641 25.1533C23.3353 25.3591 23.2912 25.6047 23.3395 25.8455C23.3879 26.0859 23.5231 26.2924 23.7203 26.4269L23.8918 26.544C24.4337 26.9136 25.0435 27.0901 25.647 27.0901C26.6988 27.0901 27.731 26.5536 28.3476 25.5676L29.5001 23.7248C29.6104 23.5483 29.8373 23.4989 30.006 23.6141L40.2907 30.6271C40.4668 30.7471 40.6067 30.905 40.7066 31.0959C40.8088 31.2902 40.8628 31.5109 40.8628 31.7327C40.8628 31.9883 40.7914 32.2375 40.657 32.4526ZM41.8304 28.9293C41.4547 29.2032 41.1522 29.561 40.9409 29.9734C40.8882 29.9295 40.8331 29.8879 40.7765 29.8493L30.4924 22.836C30.281 22.6918 30.0434 22.6231 29.8078 22.6231C29.3979 22.6231 28.9955 22.8323 28.755 23.2168L27.6025 25.0596C26.9001 26.1828 25.4534 26.4997 24.3777 25.7663L24.2133 25.6541L26.6449 21.7665C26.8812 21.3887 27.2185 21.1007 27.6198 20.9335L29.9532 19.9623C30.9623 19.5421 32.0981 19.5923 33.0697 20.0994L35.5625 21.4009C36.5075 21.8943 37.6006 21.9226 38.558 21.4942L42.9734 28.0963L41.8304 28.9293Z" fill="white" stroke="white" strokeWidth="0.75"/>
      </g>
    </svg>

  )
}

const CrossPromotionPurchaseSuccessModal: React.FC<ModalProps> = ({ isOpen, onClose, performerId }) => {
  const dispatch = useDispatch()

  const [performer, setPerformer] = useState<IPerformer | null>(null)

  const openPurchaseRubysModal = () => {
    dispatch(
      updateModals({
        crossPromotionPurchaseSuccessModal: {
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
              <h2 className='py-6 px-6 mx-6 text-4xl text-center text-black pb-4'>Cross promotion confirmed</h2>
              <p className='text-center text-black text-lg'>Next available promo period starts in</p>
              <p className='text-center text-black font-semibold pb-4'>hh:mm:ss</p>

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

              <div className='py-6 px-6 bg-gray-200 flex items-center justify-center flex-col gap-4 rounded-b-lg'>
                <p className='text-center text-black text-lg max-w-[260px]'>You can also pre-purchase the next period here</p>
                <SuccessCrossPromotionIcon />
                <p className='m-auto font-semibold flex flex-col items-center justify-center'>
                  <span>Cross</span> <span>Promotion</span>
                </p>
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

export default connect(mapState, mapDispatch)(CrossPromotionPurchaseSuccessModal);
