import { CameraIcon, DiamondIcon, RubySmallIcon } from "src/icons"
import { DiamondOutlineIcon, GiftMobileIcon, MicIcon, MicWhiteIcon, MutedMicIcon, NextIcon, PersonOutlineSmallIcon, PersonSmallIcon, PersonSmallWhiteIcon, ReportIcon, RPMIcon, StatsIcon, TopGiftersIcon } from "./icons"
import { useState } from "react"
import { AppIcon } from "@components/ui/shared/AppIcon"
import { IconMap } from "antd/lib/result"
import { useDispatch } from "react-redux"
import { updateModals } from "@redux/modals/actions"

type LiveMobileModals = 'top-gifters' | 'gifts' | 'details' | ''

export const MobileStreamLayoutPage = ({
  isMe,
  isPrivate
}: {
  isMe: boolean,
  isPrivate?: boolean
}) => {
  const dispatch = useDispatch()
  const [chatModal, setChatModal] = useState<LiveMobileModals>('')
  const [isMoreOptionsToggle, setIsMoreOptionsToggle] = useState(false)

  return (
    // <section className='relative'>
    <section className='fixed top-20 left-0 right-0'>
      <video src='' className='w-full bg-black' style={{height: '93dvh'}} />
      {/* HEADER */}
      <div className="w-full absolute top-0 left-0">
        <div className='flex items-center justify-center gap-3 p-2 bg-white/10'>
          <p className='text-white flex items-center gap-1 '> 
            Most Supported #100: Need 1000 <RubySmallIcon /> to rank
          </p>
        </div>

        <div className="flex items-center justify-start p-4">
          <div className="relative flex flex-col items-start justify-start gap-2">
            <button onClick={() => setIsMoreOptionsToggle(!isMoreOptionsToggle)} className='text-white text-xl font-semibold' style={{ transform: 'rotate(90deg)'}}>
              ...
            </button>
            {isMoreOptionsToggle && 
              <div className="bg-white absolute top-[110%] left-0 right-0 m-auto flex flex-col items-start justify-start rounded-lg border z-50 w-32">
                <button 
                  className="flex items-start justify-start gap-2 p-3 hover:bg-purple-200 w-full rounded-t-lg"
                  onClick={() => dispatch(updateModals({
                    isReportLiveStreamModal: true
                  }))}>
                    <ReportIcon />
                    Report
                </button>
                <button 
                  className="flex items-start justify-start gap-2 p-3 hover:bg-purple-200 w-full rounded-t-lg"
                  onClick={() => setChatModal('details')}>
                    <StatsIcon />
                    Stats
                </button>
                <button 
                  className="flex items-start justify-start gap-2 p-3 hover:bg-purple-200 w-full rounded-t-lg"
                  onClick={() => dispatch(updateModals({
                    isBuyRubiesModalOpen: true
                  }))}>
                    <DiamondOutlineIcon />
                    Buy Rubys
                </button>
                {isMe && 
                  <button 
                    className="flex items-start justify-start gap-2 p-3 hover:bg-purple-200 w-full rounded-t-lg"
                    onClick={() => dispatch(updateModals({
                      isStreamMutedListModalOpen: true
                    }))}>
                      <MutedMicIcon />
                      Muted List
                  </button>
                }
              </div>
            }
          </div>
          {!isMe ?
           <>
            <div className="flex items-center mr-auto">
              <img className='w-8 h-8 rounded-full object-fill' src="/images/default-avatar.png" alt="" />
              <div>
                <p className="text-white"><strong>Performer Name</strong></p>
                <p className="text-white"><PersonSmallWhiteIcon /> 1500 fans</p>
              </div>
            </div>
            <button className="border border-white rounded-full p-1 px-4 text-white">Follow</button>
          </> 
          : 
            <div className="flex items-center justify-between gap-4 flex-1">
              <div>
                <p className="text-white">Jon Davidson</p>
                <div className="flex items-center justify-start gap-1">
                  <PersonSmallWhiteIcon />
                  <TopGiftersIcon />
                  <span className="text-white">x 3</span>
                </div>
              </div>
              <div>
                <p className="text-white">Jon Davidson</p>
                <div className="flex items-center justify-start gap-1">
                  <PersonSmallWhiteIcon />
                  <TopGiftersIcon />
                  <span className="text-white">x 3</span>
                </div>
              </div>
              <div>
                <p className="text-white">Jon Davidson</p>
                <div className="flex items-center justify-start gap-1">
                  <PersonSmallWhiteIcon />
                  <TopGiftersIcon />
                  <span className="text-white">x 3</span>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      {/* SIDEBAR */}
      <nav className="absolute top-10 right-3 flex flex-col items-center justify-center gap-6 pt-20 max-w-[5rem]">
        {isPrivate || isMe ? 
          <button>
            <MicWhiteIcon />
          </button>
        : 
          <div>
            <button>

            </button>
          </div>
        }
        {isMe 
        ? <button onClick={() => dispatch(updateModals({
          isEndLiveStreamModal: true
        }))} className='text-white bg-red-800 p-1 px-3 rounded'>End Stream</button> 
        : <span className='text-white bg-red-800 p-1 px-3 rounded'>Live</span>
        }
        {!isMe ?
          <>
            <button onClick={() => setChatModal('top-gifters')} className="flex items-center justify-center flex-col gap-2">
              <TopGiftersIcon />
              <input className='rounded border-gray-300 w-4 h-4' type="checkbox" name="confirm-gift" id="confirm-gift" />
            </button>
            <button onClick={() => setChatModal('gifts')} className="text-center">
              <GiftMobileIcon />
              <p className="text-white pt-1">Gifts</p>
            </button>
          </> 
        : 
          <>

          </>
        }

        <button onClick={() => setChatModal('details')} className='bg-white p-2 gap-1 flex flex-col items-center justify-center rounded'>
          <RPMIcon />
          RPM
        </button>
      </nav>

      <div className="w-full absolute bottom-0 left-0">
        <div className="w-full relative">
          {/* Chat Modals */}
          {chatModal === 'top-gifters' && 
            <div className="bg-white rounded-t-2xl absolute bottom-0 left-0 right-0 m-auto">
              <header className='p-4 bg-pink-900 flex items-center justify-between rounded-t-lg'>
                <h4 className='text-white text-lg font-semibold'>
                  Top Gifters
                </h4>
                <button onClick={() => setChatModal('')} className="text-2xl px-2 text-white">
                  ×
                </button>
              </header>
              <div className='grid grid-cols-3'>
                <div className='border'>
                  <p className='p-2 text-center border-b'>
                    <span className='text-lg block m-auto bg-pink-900 text-white w-8 rounded-full p-1 font-semibold'>
                      1
                    </span>
                  </p>
                  <p className='text-center text-black pt-2 font-semibold'>@fan1</p>
                  <p className='text-black text-center pb-2'>1000 <RubySmallIcon /></p>
                </div>
                <div className='border'>
                  <p className='p-2 text-center border-b'>
                    <span className='text-lg block m-auto bg-pink-900 text-white w-8 rounded-full p-1 font-semibold'>
                      2
                    </span>
                  </p>
                  <p className='text-center text-black pt-2 font-semibold'>@fan1</p>
                  <p className='text-black text-center pb-2'>1000 <RubySmallIcon /></p>
                </div>
                <div className='border'>
                  <p className='p-2 text-center border-b'>
                    <span className='text-lg block m-auto bg-pink-900 text-white w-8 rounded-full p-1 font-semibold'>
                      3
                    </span>
                  </p>
                  <p className='text-center text-black pt-2 font-semibold'>@fan1</p>
                  <p className='text-black text-center pb-2'>1000 <RubySmallIcon /></p>
                </div>
              </div>
            </div>
          }
          {chatModal === 'details' &&
            <div className="bg-white p-4 rounded-t-2xl absolute bottom-0 left-0 right-0 m-auto">
              <div className="pb-4 border-b flex items-center justify-between">
                <h2 className='text-lg font-semibold text-black/90'>Stream details</h2>
                <button onClick={() => setChatModal('')} className="text-2xl px-2">
                  ×
                </button>
              </div>
              <div className='grid grid-cols-2 gap-6 w-48 pt-4'>
                <strong className='text-black'>Call time</strong>
                <span>6 minutes</span>
              </div>
              <div className='grid grid-cols-2 gap-6 w-48 pt-3'>
                <strong className='text-black'>Status</strong>
                <span>Live</span>
              </div>
              <div className='grid grid-cols-2 gap-6 w-48 pt-3'>
                <strong className='text-black'>Available</strong>
                <span><span>1000</span> Rubys</span>
              </div>
            </div>
          }
          {chatModal === 'gifts' &&
            <div className="bg-white rounded-t-2xl absolute bottom-0 left-0 right-0 m-auto">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className='text-lg font-semibold text-black/90'>Gifts</h2>
                <button onClick={() => setChatModal('')} className="text-2xl px-2">
                  ×
                </button>
              </div>
              <div className='grid grid-cols-5 gap-4 p-4'>
                <button className='border-0 flex flex-col items-center justify-center gap-1 p-2 px-4 rounded hover:bg-pink-100 cursor-pointer'>
                  <img className='max-w-7' src="/images/gift-image.png" alt="" />
                  <RubySmallIcon />
                  <strong className='text-black'>1</strong>
                </button>
                <button className='border-0 flex flex-col items-center justify-center gap-1 p-2 px-4 rounded hover:bg-pink-100 cursor-pointer'>
                  <img className='max-w-7' src="/images/gift-image.png" alt="" />
                  <RubySmallIcon />
                  <strong className='text-black'>1</strong>
                </button>
                <button className='border-0 flex flex-col items-center justify-center gap-1 p-2 px-4 rounded hover:bg-pink-100 cursor-pointer'>
                  <img className='max-w-7' src="/images/gift-image.png" alt="" />
                  <RubySmallIcon />
                  <strong className='text-black'>1</strong>
                </button>
                <button className='border-0 flex flex-col items-center justify-center gap-1 p-2 px-4 rounded hover:bg-pink-100 cursor-pointer'>
                  <img className='max-w-7' src="/images/gift-image.png" alt="" />
                  <RubySmallIcon />
                  <strong className='text-black'>1</strong>
                </button>
              </div>

              <div className='flex items-center justify-between p-4 bg-gray-100 border-b'>
                <fieldset className='flex items-center'>
                  <input className='rounded border-gray-300 w-5 h-5' type="checkbox" name="confirm-gift" id="confirm-gift" />
                  <label className='px-2 text-black' htmlFor="confirm-gift">Confirm Purchase</label>
                </fieldset>
                <button className='bg-transparent border border-gray-400 text-gray-400 p-1 px-4 rounded-full text-lg'>Send gift</button>
              </div>
              
              <div className="flex items-center justify-between gap-4 p-4">
                <strong>Ruby balance</strong>
                <p className="text-black text-lg flex items-center gap-1 mr-auto">
                  15743 <RubySmallIcon />
                </p>
                <button onClick={() => { 
                  dispatch(updateModals({
                    isBuyRubiesModalOpen: true
                  }))
                  setChatModal('')
                 }} className="font-semibold text-purple-800 text-lg">Add more Rubys</button>
              </div>
            </div>
          }

          {/* Chat */}
          <div className="max-h-40 overflow-auto p-4">
            <div className='flex items-start justify-start gap-3 py-2'>
              <div className='flex items-center gap-2' style={{ minWidth: '6rem' }}>
                <img className='w-6 h-6 rounded-full object-fill' src="/images/default-avatar.png" alt="" />
                <p><strong className='text-white'>Alex Mills</strong></p>
              </div>
              <p className='text-white'>Doing well, trying to get more Rubys. What about you?</p>
            </div>
            <div className='flex items-start justify-start gap-3 py-2'>
              <div className='flex items-center gap-2' style={{ minWidth: '6rem' }}>
                <img className='w-6 h-6 rounded-full object-fill' src="/images/default-avatar.png" alt="" />
                <p><strong className='text-white'>Alex Mills</strong></p>
              </div>
              <p className='text-white'>Doing well, trying to get more Rubys. What about you?</p>
            </div>
          </div>
        </div>
        
        <div className='p-4 pb-5 flex items-center justify-between gap-3 bg-white/10 w-full'>
          <input placeholder='Say something nice' className='rounded-lg border-gray-300 text-gray-400 p-2 px-4 flex-1' type="text" />
          <button className='border-0 text-white text-lg p-2'>Send</button>
        </div>
      </div>
    </section>
  )
}