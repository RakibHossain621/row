import React, { useState, useEffect } from 'react';
import * as yup from "yup"
import Link from 'next/link';

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { AppInput } from '@components/ui/shared/AppInput';
import { buttonVariants } from '@components/ui/shared/AppButton';

import { cookieService } from '@services/cookies.service';

import { login, loginSocial } from '@redux/auth/actions';
import { connect, useDispatch } from 'react-redux';
import { updateModals } from '@redux/modals/actions';

import useClickOutside from 'src/hooks/useClickOutside';
import useDisableScroll from 'src/hooks/useDisabledScroll';
import { auth, provider, signInWithPopup } from '@lib/firebase';
import { authService } from '@services/auth.service';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  loginAuth: {
    requesting: boolean;
    error: any;
    data: any;
    success: boolean;
  }
}

const schema = yup.object({
  username: yup.string().email('Please enter a valid email').required('Please enter your email'),
  password: yup.string().required('Please enter your password').min(8, 'Password must be at least 8 characters')
})

const LoginModal: React.FC<ModalProps> = ({ isOpen, onClose, loginAuth }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const onSubmit = async (data) => {
    try {
      const resp = (await cookieService.getCookie('introducerId')) || null;
      dispatch(login({ ...data, introducerId: resp || null }));

    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => {
    onClose();
  };

  const handleForgotPassword = () => {
    dispatch(updateModals({ isLoginModalOpen: false, isForgotPasswordModalOpen: true }));
  }

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const payload = { tokenId: token, role: 'user' };

      const response = await (await authService.loginGoogle(payload)).data;
      response.token && loginSocial({ token: response.token });

    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  useDisableScroll(isOpen);
  const ref = useClickOutside(onClose);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div tabIndex={-1} aria-hidden="true" className={`overflow-y-auto overflow-x-hidden px-6 fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isOpen ? 'block' : 'hidden'}`}>
        <div ref={ref} role='dialog' className="relative w-full max-w-[485px] max-h-full m-auto">
          <div className="relative px-6 pt-6 bg-white rounded-lg shadow pb-9">
            <div className="flex items-center justify-end rounded-t">
              <button onClick={handleClose} type="button" className="absolute inline-flex items-center justify-center w-6 h-6 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 top-4 right-4">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className='mt-6'>
              <h3 className="mb-6 text-xl text-center text-black">
                Login
              </h3>

              <div className='space-y-6'>
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)} noValidate>
                  <AppInput {...register("username")} type="email" id="login-email" autoComplete='username' placeholder="Email" errorMessage={errors?.username?.message} />
                  <AppInput {...register("password")} type="password" id="login-password" autoComplete='current-password' placeholder="Password" errorMessage={errors?.password?.message} />

                  <button type='button' onClick={handleForgotPassword} className="text-sm font-medium text-purple-800 hover:underline">Forgot password?</button>

                  <button type="submit" className={`w-full h-12 ${buttonVariants({ disabled: loginAuth.requesting })}`}>
                    {loginAuth.requesting &&
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

                    {!loginAuth.requesting &&
                      <span>
                        Login
                      </span>
                    }
                  </button>
                </form>
              </div>

              <div className="inline-flex items-center justify-center w-full my-6">
                <hr className="w-full h-px bg-gray-200 border-0" />
                <span className="absolute px-3 bg-white text-base-700">Or login with</span>
              </div>

              <div className='mb-6 space-y-3'>
                <button type="submit" onClick={() => handleSignInWithGoogle()} className="flex items-center justify-center w-full h-12 gap-3 px-8 py-3 font-semibold text-black rounded-full bg-base-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.64 12.2061C20.64 11.568 20.5827 10.9543 20.4764 10.3652H12V13.8466H16.8436C16.635 14.9716 16.0009 15.9248 15.0477 16.563V18.8211H17.9564C19.6582 17.2543 20.64 14.9471 20.64 12.2061Z" fill="#4285F4" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.0001 21.0009C14.4301 21.0009 16.4674 20.195 17.9565 18.8205L15.0479 16.5623C14.2419 17.1023 13.211 17.4214 12.0001 17.4214C9.65603 17.4214 7.67194 15.8382 6.96422 13.7109H3.9574V16.0428C5.43831 18.9841 8.48194 21.0009 12.0001 21.0009Z" fill="#34A853" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.96409 13.7108C6.78409 13.1708 6.68182 12.594 6.68182 12.0008C6.68182 11.4076 6.78409 10.8308 6.96409 10.2908V7.95898H3.95727C3.34773 9.17398 3 10.5485 3 12.0008C3 13.4531 3.34773 14.8276 3.95727 16.0426L6.96409 13.7108Z" fill="#FBBC05" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.0001 6.57955C13.3215 6.57955 14.5079 7.03364 15.4406 7.92545L18.0219 5.34409C16.4633 3.89182 14.426 3 12.0001 3C8.48194 3 5.43831 5.01682 3.9574 7.95818L6.96422 10.29C7.67194 8.16273 9.65603 6.57955 12.0001 6.57955Z" fill="#EA4335" />
                  </svg>

                  <span>
                    Continue with Google
                  </span>
                </button>
              </div>

              <div className='max-w-xs mx-auto'>
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
      </div>

      <div className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-30 ${isOpen ? 'block' : 'hidden'}`} />
    </>
  );
};

const mapState = (state) => ({
  modals: { ...state.modals },
  loginAuth: { ...state.auth.loginAuth }
});

const mapDispatch = {
  login,
  updateModals
};

export default connect(mapState, mapDispatch)(LoginModal);
