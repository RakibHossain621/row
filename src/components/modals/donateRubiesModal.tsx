import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { AppInput } from '@components/ui/shared/AppInput';
import { AppButton, buttonVariants } from '@components/ui/shared/AppButton';

import { connect, useDispatch } from 'react-redux';
import { updateModals } from '@redux/modals/actions';
import { RubySvg } from 'src/icons';
import useDisableScroll from 'src/hooks/useDisabledScroll';
import useClickOutside from 'src/hooks/useClickOutside';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const schema = yup.object({
  amount: yup
    .number()
    .typeError("Must be a number")
    .positive("Must be a positive value")
    .required("Please enter an amount")
    .min(1, "Must be at least 1"),
})

const DonateRubiesModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { isLoading, isValid, errors } } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const onSubmit = (data) => {
    try {

    } catch (error) {
      console.error(error)
    }
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
          <div className="bg-white rounded-lg shadow pb-11">
            <div className="flex justify-between px-5 py-5 mb-10 border-b rounded-t border-base-400">
              <h2 className="inline-flex items-center gap-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <mask id="mask0_4200_27292" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_4200_27292)">
                    <path d="M12 20.6057L2.2981 8.9615L5.15385 3.25H18.8461L21.7019 8.9615L12 20.6057ZM9.22112 8.25H14.7789L13.0288 4.74995H10.9711L9.22112 8.25ZM11.25 17.3673V9.74995H4.92112L11.25 17.3673ZM12.75 17.3673L19.0789 9.74995H12.75V17.3673ZM16.4461 8.25H19.6539L17.9038 4.74995H14.6961L16.4461 8.25ZM4.34612 8.25H7.55385L9.30387 4.74995H6.09615L4.34612 8.25Z" fill="#121212" />
                  </g>
                </svg>

                <span className='text-xl text-black'>
                  Donate Rubys
                </span>
              </h2>

              <button onClick={onClose} type="button" className="inline-flex items-center justify-center w-6 h-6 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className='flex flex-col gap-6 px-6 mb-6 md:flex-row'>
              <div className='md:max-w-[200px]'>
                <div style={{ backgroundImage: `url(${'/images/default-avatar.png'})` }} className='relative w-[200px] md:w-auto h-[277px] mx-auto mb-6 bg-center bg-cover rounded-lg'>
                  <div className='absolute left-3 bottom-16'>
                    <div className='flex items-center gap-1'>
                      <h4 className='font-semibold text-white'>
                        Business Time
                      </h4>

                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <g clipPath="url(#clip0_3975_31167)">
                          <mask id="mask0_3975_31167" maskUnits="userSpaceOnUse" x="0" y="0" width="13" height="13">
                            <rect width="13" height="13" fill="#D9D9D9" />
                          </mask>
                          <g mask="url(#mask0_3975_31167)">
                            <path d="M4.69886 12.0251L3.68324 10.3459L1.77386 9.9126L1.9499 7.9626L0.649902 6.5001L1.9499 5.0376L1.77386 3.0876L3.68324 2.65426L4.69886 0.975098L6.4999 1.74697L8.30094 0.975098L9.31657 2.65426L11.2259 3.0876L11.0499 5.0376L12.3499 6.5001L11.0499 7.9626L11.2259 9.9126L9.31657 10.3459L8.30094 12.0251L6.4999 11.2532L4.69886 12.0251ZM5.80928 8.4501L9.03219 5.24072L8.34157 4.5501L5.80928 7.06885L4.65824 5.93135L3.96761 6.62197L5.80928 8.4501Z" fill="white" />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_3975_31167">
                            <rect width="13" height="13" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  <div className='absolute left-3 bottom-11'>
                    <div className='inline-flex items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <mask id="mask0_4200_12005" maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
                          <rect width="14" height="14" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_4200_12005)">
                          <path d="M7.00005 7.00005C6.41672 7.00005 5.92088 6.79588 5.51255 6.38755C5.10422 5.97922 4.90005 5.48338 4.90005 4.90005C4.90005 4.31672 5.10422 3.82088 5.51255 3.41255C5.92088 3.00422 6.41672 2.80005 7.00005 2.80005C7.58338 2.80005 8.07922 3.00422 8.48755 3.41255C8.89588 3.82088 9.10005 4.31672 9.10005 4.90005C9.10005 5.48338 8.89588 5.97922 8.48755 6.38755C8.07922 6.79588 7.58338 7.00005 7.00005 7.00005ZM2.80005 11.2V9.80005C2.80005 9.57644 2.86081 9.36498 2.98234 9.16567C3.10387 8.96637 3.27158 8.79866 3.48547 8.66255C4.02019 8.35144 4.58651 8.11324 5.18442 7.94797C5.78234 7.78269 6.38755 7.70005 7.00005 7.70005C7.61255 7.70005 8.21776 7.78269 8.81567 7.94797C9.41359 8.11324 9.97991 8.35144 10.5146 8.66255C10.7285 8.78894 10.8962 8.95422 11.0178 9.15838C11.1393 9.36255 11.2 9.57644 11.2 9.80005V11.2H2.80005Z" fill="white" />
                        </g>
                      </svg>

                      <span className='text-[10px] text-white'>
                        1500 fans
                      </span>
                    </div>
                  </div>

                  <div className='absolute bottom-0 left-0 right-0'>
                    <button type="button" className={`w-full rounded-b-lg rounded-t-none ${buttonVariants()}`}>Follow</button>
                  </div>
                </div>

                <h4 className='mb-3 font-semibold text-black'>
                  Help me get to the top!
                </h4>

                <p className='text-black-600'>
                  All donations contribute to
                  <Link href="#" passHref>
                    <a className="px-1 font-medium text-center text-purple-800 hover:underline">Most Supported</a>
                  </Link>
                  ranking.
                </p>
              </div>

              <div className='flex-grow'>
                <div className='grid grid-cols-2 gap-5 md:gap-6 md:grid-cols-3'>

                  <div className='flex flex-col w-full max-w-[471px] pb-4 border border-base-400 rounded-lg overflow-hidden'>
                    <div className='flex items-center justify-center bg-purple-200 h-14'>
                      <div className='w-10 h-10 bg-white rounded-full'>
                        <img src="/images/Ruby.png" alt="Ruby" />
                      </div>
                    </div>

                    <div className='px-4 py-5 my-auto text-center'>
                      <h2 className='text-3xl text-black'>1</h2>
                      <span className='text-sm text-black'>Ruby</span>
                    </div>

                    <div className='px-5 mt-auto'>
                      <button type="button" className={`w-full ${buttonVariants()}`}>Select</button>
                    </div>
                  </div>

                  <div className='flex flex-col w-full max-w-[471px] pb-4 border border-base-400 rounded-lg overflow-hidden'>
                    <div className='flex items-center justify-center bg-purple-200 h-14'>
                      <div className='w-10 h-10 bg-white rounded-full'>
                        <img src="/images/Ruby.png" alt="Ruby" />
                      </div>
                    </div>

                    <div className='px-4 py-5 my-auto text-center'>
                      <h2 className='text-3xl text-black'>10</h2>
                      <span className='text-sm text-black'>Rubys</span>
                    </div>

                    <div className='px-5 mt-auto'>
                      <button type="button" className={`w-full ${buttonVariants()}`}>Select</button>
                    </div>
                  </div>

                  <div className='flex flex-col w-full max-w-[471px] pb-4 border border-base-400 rounded-lg overflow-hidden'>
                    <div className='flex items-center justify-center bg-purple-200 h-14'>
                      <div className='w-10 h-10 bg-white rounded-full'>
                        <img src="/images/Ruby.png" alt="Ruby" />
                      </div>
                    </div>

                    <div className='px-4 py-5 my-auto text-center'>
                      <h2 className='text-3xl text-black'>100</h2>
                      <span className='text-sm text-black'>Rubys</span>
                    </div>

                    <div className='px-5 mt-auto'>
                      <button type="button" className={`w-full ${buttonVariants()}`}>Select</button>
                    </div>
                  </div>

                  <div className='flex flex-col w-full max-w-[471px] pb-4 border border-base-400 rounded-lg overflow-hidden'>
                    <div className='flex items-center justify-center bg-purple-200 h-14'>
                      <div className='w-10 h-10 bg-white rounded-full'>
                        <img src="/images/Ruby.png" alt="Ruby" />
                      </div>
                    </div>

                    <div className='px-4 py-5 my-auto text-center'>
                      <h2 className='text-3xl text-black'>1.000</h2>
                      <span className='text-sm text-black'>Rubys</span>
                    </div>

                    <div className='px-5 mt-auto'>
                      <button type="button" className={`w-full ${buttonVariants()}`}>Select</button>
                    </div>
                  </div>

                  <div className='flex flex-col w-full max-w-[471px] pb-4 border border-base-400 rounded-lg overflow-hidden'>
                    <div className='flex items-center justify-center bg-purple-200 h-14'>
                      <div className='w-10 h-10 bg-white rounded-full'>
                        <img src="/images/Ruby.png" alt="Ruby" />
                      </div>
                    </div>

                    <div className='px-4 py-5 my-auto text-center'>
                      <h2 className='text-3xl text-black'>10.000</h2>
                      <span className='text-sm text-black'>Ruby</span>
                    </div>

                    <div className='px-5 mt-auto'>
                      <button type="button" className={`w-full ${buttonVariants()}`}>Select</button>
                    </div>
                  </div>

                  <div className='flex flex-col w-full max-w-[471px] pb-4 border border-base-400 rounded-lg overflow-hidden'>
                    <div className='flex items-center justify-center bg-purple-200 h-14'>
                      <div className='w-10 h-10 bg-white rounded-full'>
                        <img src="/images/Ruby.png" alt="Ruby" />
                      </div>
                    </div>

                    <div className='px-4 py-5 text-center'>
                      <AppInput {...register("amount")} type="number" id="custom-rubies-amount" placeholder="5000" errorMessage={errors?.amount?.message} />
                      <span className='block mt-1 text-sm text-black'>Custom amount</span>
                    </div>

                    <div className='px-5 mt-auto'>
                      <button type="button" className={`w-full ${buttonVariants()}`}>Select</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='px-6'>
              <div className='flex flex-col gap-6 md:flex-row'>
                <div className='flex-grow md:max-w-[200px] px-5 py-3 rounded-lg bg-base-200'>
                  <span className='block mb-1 font-semibold text-center text-base-600 md:text-left'>Ruby Balance</span>

                  <h2 className="flex items-center justify-center md:justify-start">
                    <img src="/images/Ruby.png" alt="Ruby" />

                    <span className='text-3xl text-black'>
                      15.000
                    </span>
                  </h2>
                </div>

                <div className='flex-grow md:self-end'>
                  <div className='flex flex-col items-center gap-3 md:flex-row md:justify-between'>
                    <label className='inline-flex items-center gap-2 text-sm text-black'>
                      <input type="checkbox" className='w-4 h-4 mr-auto text-base bg-gray-100 rounded border-base-400 text-base-900 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500' />
                      I agree to the terms of this purchase
                    </label>

                    <div className='inline-flex gap-6'>
                      <button onClick={onClose} className="text-sm font-medium text-black hover:opacity-80 hover:underline">
                        Cancel
                      </button>

                      <AppButton variant='secondary'>Send</AppButton>
                    </div>
                  </div>
                </div>
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

export default connect(mapState, mapDispatch)(DonateRubiesModal);
