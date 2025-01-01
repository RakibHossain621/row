import React, { useState, useEffect } from 'react';
import { AppButton } from '@components/ui/shared/AppButton';

import { connect, useDispatch } from 'react-redux';
import { updateModals } from '@redux/modals/actions';
import useDisableScroll from 'src/hooks/useDisabledScroll';
import useClickOutside from 'src/hooks/useClickOutside';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalMutedList: []
}

type MutedListStateType = {
  name: string,
  id: string
} 

const StreamMudetListModal: React.FC<ModalProps> = ({ isOpen, onClose, modalMutedList }) => {
  const [mutedList, setMutedList] = useState<MutedListStateType[]>([])
  const [isAddUserToggle, setIsAddUserToggle] = useState(false)

  const dispatch = useDispatch()

  const onSaveMutedList = (data) => {
    dispatch(
      updateModals({
        isStreamMutedListModalOpen: false
      })
    )
    return
  }

  useDisableScroll(isOpen);
  const ref = useClickOutside(onClose);

  useEffect(() => {
    // handle mutedList fetch and setMutedList
  }, [])

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
                <span className='text-xl text-black'>
                  Muted list
                </span>
              </h2>

              <button onClick={onClose} type="button" className="inline-flex items-center justify-center w-6 h-6 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </header>
            <div className='p-4'>
              <p className='text-lg text-black pb-3'>The following fans can not comment during your live broadcast. </p>
             <label>Add users</label>
             <div className='relative pb-4'>
              <div onClick={() => setIsAddUserToggle(!isAddUserToggle)} className={`p-2 border rounded-lg flex items-center justify-start gap-2 flex-wrap ${isAddUserToggle && 'border-purple-700'}`}>
                <button className='py-1 rounded-full px-2 bg-purple-100 text-black'>
                  Matheus
                  <span className='text-gray-500 text-lg px-1'>×</span>
                </button>
              </div>
              {isAddUserToggle && 
                <div className='bg-white shadow-lg rounded-lg absolute top-[102%] left-0 right-0 m-auto'>
                  <fieldset className='p-2 hover:bg-purple-100'>
                    {/* handle the checkbox with onclick, idk which is better, if it's better to just handle the check box or if just click anywhere inside the fieldset */}
                    <input className='rounded text-black' type="checkbox" />
                    <label className='pl-2 text-black'>Matheus</label>
                  </fieldset>
                  <div className='mx-2 pb-2 pt-3 border-t'>
                    <button className='p-1 rounded-lg hover:bg-gray-100 text-black'>Clear all</button>
                  </div>
                </div>
              }
             </div>

              <table className='w-full'>
                <thead>
                  <th className='p-1 border-b border-gray-500 text-left'>User</th>
                  <th className='p-1 border-b border-gray-500 text-left'>Date added</th>
                  <th className='p-1 border-b border-gray-500 text-center'>Remove</th>
                </thead>
                <tbody>
                  <tr>
                    <td className='px-1 py-2'>
                      <p className='text-black font-semibold'>Matheus Alves</p>
                      <p className='text-sm text-black'>@mathalves_fullstack</p>
                    </td>
                    <td className='text-black'>10/10/2024</td>
                    <td>
                      <button className='bg-red-700 text-white rounded-full w-8 h-8 text-xl flex items-center justify-center m-auto'>×</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <footer className="w-full p-4 text-right">
              <AppButton 
                variant="tertiary" 
                className="mx-1 border-0"
                onClick={onClose}
              >
                Cancel
              </AppButton>
              <AppButton 
                variant="default" 
                className="px-2" 
                disabled={false}
                onClick={onSaveMutedList}
              >
                  Save
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

export default connect(mapState, mapDispatch)(StreamMudetListModal);
