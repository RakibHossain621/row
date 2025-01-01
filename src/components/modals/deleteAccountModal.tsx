import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { AppInput } from '@components/ui/shared/AppInput';
import { buttonVariants } from '@components/ui/shared/AppButton';

import { cookieService } from '@services/cookies.service';

import { connect, useDispatch } from 'react-redux';
import { updateModals } from '@redux/modals/actions';

import useDisableScroll from 'src/hooks/useDisabledScroll';
import useClickOutside from 'src/hooks/useClickOutside';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const schema = yup
  .object({
    text: yup.string()
      .oneOf(['caster.com'], 'The text must be exactly "caster.com"')
      .required('Text is required'),
  })

const DeleteAccountModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ resolver: yupResolver(schema), mode: 'onBlur' });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);

    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => {
    onClose();
  };

  useDisableScroll(isOpen);
  const ref = useClickOutside(onClose);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div tabIndex={-1} aria-hidden="true" className={`overflow-y-auto overflow-x-hidden px-6 fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isOpen ? 'block' : 'hidden'}`}>
        <div ref={ref} role='dialog' className="relative w-full max-w-[396px] max-h-full m-auto">
          <div className="relative px-8 pt-4 pb-10 bg-white rounded-lg shadow">
            <div className="flex items-center justify-end rounded-t">
              <button onClick={handleClose} type="button" className="absolute inline-flex items-center justify-center w-6 h-6 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 top-4 right-4">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className='mt-6'>
              <h3 className="mb-4 text-xl text-black">
                <div className='flex items-center gap-2'>
                  <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <mask id="mask0_3438_56979" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_3438_56979)">
                      <path d="M4.46758 20.5009C3.31199 20.5009 2.59041 19.2492 3.16953 18.2492L10.702 5.24242C11.2798 4.24471 12.7203 4.24472 13.2981 5.24242L20.8306 18.2492C21.4097 19.2492 20.6881 20.5009 19.5326 20.5009H4.46758ZM12.0001 17.8086C12.2289 17.8086 12.4207 17.7312 12.5755 17.5764C12.7303 17.4216 12.8077 17.2298 12.8077 17.0009C12.8077 16.7721 12.7303 16.5803 12.5755 16.4255C12.4207 16.2707 12.2289 16.1933 12.0001 16.1933C11.7712 16.1933 11.5794 16.2707 11.4246 16.4255C11.2698 16.5803 11.1924 16.7721 11.1924 17.0009C11.1924 17.2298 11.2698 17.4216 11.4246 17.5764C11.5794 17.7312 11.7712 17.8086 12.0001 17.8086ZM11.2501 15.1933H12.75V10.1933H11.2501V15.1933Z" fill="#DC1C1C" />
                    </g>
                  </svg>

                  <span>
                    Delete account
                  </span>
                </div>
              </h3>

              <p className='mt-3 mb-6 text-black'>
                Your account will be deactivated immediately, and all data will be automatically deleted and can not be restored.
              </p>

              <p className='mb-2 text-black'>
                Type <span className='font-bold'>caster.com</span> in the box below to confirm your account deletion.
              </p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <AppInput className='bg-base-200' {...register("text")} type="text" id="delete-account-text" placeholder="Type caster.com" errorMessage={errors?.text?.message} />

                <p className='mt-2 mb-8 text-xs text-base-500'>
                  After you submit your request, we will disable your account. It may take up to 30 days to fully delete and remove all your data.
                </p>

                <button type="submit" className={`mb-3 w-full ${buttonVariants({ variant: 'error', disabled: !isValid || isLoading })}`}>
                  {isLoading &&
                    <div className='inline-flex items-center gap-2'>
                      <svg aria-hidden="true" role="status" className="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB" />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor" />
                      </svg>

                      <span>
                        Loading...
                      </span>
                    </div>
                  }

                  {!isLoading &&
                    <span>
                      Confirm account deletion
                    </span>
                  }
                </button>

                <button type="button" onClick={handleClose} className={`w-full ${buttonVariants({ variant: 'secondary' })}`}>
                  Cancel
                </button>
              </form>
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
  updateModals
};

export default connect(mapState, mapDispatch)(DeleteAccountModal);
