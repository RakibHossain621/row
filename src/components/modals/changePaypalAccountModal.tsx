import React, { useState, useEffect } from 'react';
import { AppButton } from '@components/ui/shared/AppButton';

import { connect } from 'react-redux';
import { updateModals } from '@redux/modals/actions';
import useDisableScroll from 'src/hooks/useDisabledScroll';
import useClickOutside from 'src/hooks/useClickOutside';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import { useForm } from 'react-hook-form';
import { AppInput } from '@components/ui/shared/AppInput';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const schema = yup.object({
  oldEmail: yup
    .string()
    .email("Please enter a valid Email")
    .required("Please enter a valid Email"),
  email: yup
    .string()
    .email("Please enter a valid Email")
    .required("Please enter a valid Email"),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref('email'), null], 'Emails must match')
    .required('Please confirm your Email')
})

const ChangePaypalAccountModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { isLoading, isValid, errors } } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const onLinkPaypalAccount = (data) => {
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
            <header className="flex justify-between px-5 pt-4 rounded-t">
              <h2 className="inline-flex items-center gap-x-4">
                <img className="w-12 p-1 rounded-full border" src="/static/paypal-simple-logo.png" alt="PayPal Logo" />
                <span className='text-xl text-black'>
                  Change email address
                </span>
              </h2>

              <button onClick={onClose} type="button" className="inline-flex items-center justify-center w-6 h-6 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </header>
            <form onSubmit={handleSubmit(onLinkPaypalAccount)} className='py-6 px-0 mx-6 border-b' action="">
              <legend className='text-black/90 text-sm md:text-md pb-4'>You may change the email address associated with your account by completing the form below.</legend>
              <fieldset className='space-y-4'>
                <AppInput 
                  placeholder='johndoe@gmail.com' 
                  id='paypal-oldEmail' 
                  label='Current email address' {...register("oldEmail")} type="text" errorMessage={errors?.oldEmail?.message} 
                />

                <AppInput 
                  placeholder='johndoe@gmail.com' 
                  id='paypal-email' 
                  label='New Email address' {...register("email")} type="text" errorMessage={errors?.email?.message} 
                />

                <AppInput 
                  placeholder='johndoe@gmail.com' 
                  id='paypal-newEmail' 
                  label='Confirm Email address' {...register("confirmEmail")} type="text" errorMessage={errors?.confirmEmail?.message} 
                />
              </fieldset>
            </form>
            

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
                className="px-2" 
                disabled={false}
                onClick={onLinkPaypalAccount}
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

export default connect(mapState, mapDispatch)(ChangePaypalAccountModal);
