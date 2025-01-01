import React, { useState, useEffect } from 'react';

import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { AppInput } from '@components/ui/shared/AppInput';
import { buttonVariants } from '@components/ui/shared/AppButton';

import { authService } from '@services/auth.service';

import { connect, useDispatch } from 'react-redux';
import { updateModals } from '@redux/modals/actions';

import useClickOutside from 'src/hooks/useClickOutside';
import useDisableScroll from 'src/hooks/useDisabledScroll';
import { message } from 'antd';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const schema = yup
  .object({ email: yup.string().email('Please enter a valid email').required('Please enter your email') })
  .required()

const ForgotPasswordModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const ref = useClickOutside(onClose);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCheckEmail, setCheckEmail] = useState<boolean>(false);
  const { register, handleSubmit, formState: { isValid, errors } } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  useDisableScroll(isOpen);

  const onSubmit = async (data: { email: string }) => {
    try {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setCheckEmail(true);
      }, 3000)

      await authService.resetPassword({ ...data, type: 'performer' });
    } catch (error) {
      message.error(error?.message || 'Error occured, please try again later');
    } finally {
      setIsLoading(false);
    }
  }

  const handleClose = () => {
    onClose();
    setCheckEmail(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div tabIndex={-1} aria-hidden="true" className={`overflow-y-auto overflow-x-hidden px-6 fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isOpen ? 'block' : 'hidden'}`}>
        <div ref={ref} role='dialog' className="relative w-full max-w-[485px] max-h-full m-auto">
          <div className={`relative px-6 pt-6 bg-white rounded-lg shadow ${isCheckEmail ? 'pb-6' : 'pb-12'}`} >
            <div className="flex items-center justify-end rounded-t">
              <button onClick={handleClose} type="button" className="absolute inline-flex items-center justify-center w-6 h-6 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 top-4 right-4">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {
              !isCheckEmail &&
              <div className='mt-6'>
                <h3 className="text-xl text-center text-black">
                  Forgot your password?
                </h3>

                <p className='max-w-xs mx-auto mt-3 mb-6 text-sm text-center text-base-600'>
                  Enter your email address and we will send you instructions to reset your password.
                </p>

                <div className='space-y-6'>
                  <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <AppInput 
                      {...register("email")} 
                      type="email" 
                      id="forgot-password-email" 
                      placeholder="Email" 
                      errorMessage={errors?.email?.message} 
                    />

                    <button type="submit" className={`mt-6 w-full h-12 ${buttonVariants({ disabled: !isValid || isLoading })}`}>
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
                          Reset password
                        </span>
                      }
                    </button>
                  </form>
                </div>
              </div>
            }

            {
              isCheckEmail &&
              <div className='mt-6'>
                <h3 className="text-xl text-center text-black">
                  Check your email
                </h3>

                <p className='max-w-xs mx-auto mt-3 mb-6 text-sm text-center text-base-600'>
                  We’ve sent an email with a link to reset your password.
                  Please click on the link within 10 minutes before the link expires.
                  If you did not receive the email check your spam folder.
                </p>
              </div>
            }
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

export default connect(mapState, mapDispatch)(ForgotPasswordModal);
