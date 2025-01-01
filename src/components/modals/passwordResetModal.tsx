import Link from 'next/link';
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
  tokenId?: string
}

const schema = yup.object({
  password: yup.string().required('Please enter your password')
    .matches(/^(?=.{8,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[^\w\d]).*$/,
      'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character.'
    ),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const PasswordResetModal: React.FC<ModalProps> = ({ isOpen, onClose, tokenId }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const { register, handleSubmit, formState: { isValid, errors } } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const onSubmit = async (data: {password: string}) => {
    try {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setSuccess(true);
      }, 3000)

      await authService.updateForgotPassword({
        password: data.password,
      }, tokenId);
      message.success('Password Changed!');
    } catch (error) {
      message.error(error?.message || 'Error occured, please try again later');
    } finally {
      setIsLoading(false);
    }
  }

  const handleClose = () => {
    onClose();
    setSuccess(false);
  };

  const handleBackToLogin = () => {
    dispatch(updateModals({
      isLoginModalOpen: true,
      isPasswordResetModalOpen: false,
    }))
  }

  useDisableScroll(isOpen);
  const ref = useClickOutside(onClose);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div tabIndex={-1} aria-hidden="true" className={`overflow-y-auto overflow-x-hidden px-6 fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isOpen ? 'block' : 'hidden'}`}>
        <div ref={ref} role='dialog' className="relative w-full max-w-[485px] max-h-full m-auto">
          <div className={`relative px-6 pt-6 bg-white rounded-lg shadow pb-8`} >
            <div className="flex items-center justify-end rounded-t">
              <button onClick={handleClose} type="button" className="absolute inline-flex items-center justify-center w-6 h-6 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 top-4 right-4">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {
              !isSuccess &&
              <div className='mt-6'>
                <h3 className="mb-6 text-xl text-center text-black">
                  Enter new password
                </h3>

                <form className='space-y-3' noValidate onSubmit={handleSubmit(onSubmit)}>
                  <AppInput {...register("password")} type="password" id="forgot-password-email" placeholder="Password" errorMessage={errors?.password?.message} />
                  <AppInput {...register("confirmPassword")} type="password" id="confirm-password" placeholder="Confirm Password" errorMessage={errors?.confirmPassword?.message} />

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
                        Change Password
                      </span>
                    }
                  </button>
                </form>
              </div>
            }

            {
              isSuccess &&
              <div className='mt-6'>
                <h3 className="mb-6 text-xl text-center text-black">
                  Password Changed!
                </h3>

                <button type="button" onClick={handleBackToLogin} className={`w-full h-12 ${buttonVariants()}`}>
                  Back to login
                </button>
              </div>
            }

            <div className='max-w-xs mx-auto mt-6'>
              <p className='text-xs text-center text-base-600'>
                By continuing, you agree to our
                <Link href="#" passHref>
                  <a className="px-1 font-medium text-center text-purple-800 hover:underline">Terms of Service</a>
                </Link>
                and acknowledge that you have read our privacy policy to learn how we collect and share data.
              </p>
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

export default connect(mapState, mapDispatch)(PasswordResetModal);
