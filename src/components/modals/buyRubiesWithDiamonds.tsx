import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { AppInput } from '@components/ui/shared/AppInput';
import { AppButton, buttonVariants } from '@components/ui/shared/AppButton';

import { connect } from 'react-redux';
import { updateModals } from '@redux/modals/actions';
import { DiamondIcon, RubyIcon } from 'src/icons';

import useClickOutside from 'src/hooks/useClickOutside';
import useDisableScroll from 'src/hooks/useDisabledScroll';
import { message } from 'antd';
import { getResponseError } from '@lib/utils';
import { paymentService } from '@services/payment.service';
import { userService } from '@services/user.service';
import { updateCurrentUser } from '@redux/user/actions';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  updateCurrentUser: Function
}

const schema = yup.object({
  amount: yup
    .number()
    .typeError("Must be a number")
    .positive("Must be a positive number")
    .required("Please enter an amount"),
  tandc: yup.bool()
    .oneOf([true], "You must accept the terms and conditions")
    .default(false)
    .required()
})

const DonateRubiesWithDiamondsModal: React.FC<ModalProps> = ({ isOpen, onClose, updateCurrentUser }) => {  useDisableScroll(isOpen);
  const ref = useClickOutside(onClose);

  const { register, handleSubmit, formState: { isLoading, isValid, errors }, watch } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });
  const amountToSend = watch('amount')

  const [diamonds, setDiamonds] = useState(0)
  const [realTimeDiamonds, setRealTimeDiamonds] = useState(0)

  const onSubmit = async (data: {
    tandc: boolean,
    amount: number
  }) => {
    try {
      if (!data.tandc) return message.error('You need to agree the terms')
      await paymentService.tradeDiamond(data.amount)
      Router.reload()
    } catch (error) {
      console.error(error)
      message.error(getResponseError(await error))
    }
  }

  useEffect(() => {
    const getEarningData = async () => {
      try {
        const earning = await userService.me();
        setDiamonds(earning.data.balance)
        updateCurrentUser(earning.data)
      } catch (error) {
        // message.error(getResponseError(await error));
      }
    }

    getEarningData()
  }, [])

  useEffect(() => {
    setRealTimeDiamonds(Number(diamonds) - Number(amountToSend ?? 0))
  }, [diamonds, amountToSend])

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div tabIndex={-1} aria-hidden="true" className={`overflow-y-auto px-5 overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isOpen ? 'block' : 'hidden'}`}>
        <div ref={ref} role='dialog' className="w-full max-w-sm max-h-full m-auto">
          <div className="bg-white rounded-lg shadow">
            <div className="flex justify-between px-5 py-5 mb-3 border-b rounded-t border-base-400">
              <h2 className="inline-flex items-center gap-x-2">
                <span className='text-xl text-black'>
                  Buy Rubys w/ diamonds
                </span>
              </h2>

              <button onClick={onClose} type="button" className="inline-flex items-center justify-center w-6 h-6 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form className='px-6 pb-8' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-6 rounded-lg py-7 bg-base-200'>
                <h2 className="flex items-center justify-center">
                  <DiamondIcon className='w-10 h-10' />

                  <span className='text-3xl text-black'>
                    {realTimeDiamonds}
                  </span>
                </h2>
              </div>

              <div className='mb-3'>
                <AppInput id='buy-rubies-diamond-amount' {...register("amount")} type="text" placeholder="Enter amount of rubies" errorMessage={errors?.amount?.message} suffixIcon={<><RubyIcon className='w-4 h-4 ' /> / min</>} />
              </div>

              <div className='mb-6'>
                <label className='inline-flex items-center gap-2 text-sm text-black'>
                  <input {...register("tandc")} type="checkbox" className='w-4 h-4 mr-auto text-base text-black bg-gray-100 rounded checked:bg-black border-base-400 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500' />
                  I agree to the terms of this purchase
                </label>
              </div>

              <div className='flex justify-end gap-6'>
                <button onClick={onClose} className="text-sm font-medium text-black hover:opacity-80 hover:underline">
                  Cancel
                </button>

                <AppButton type="submit" disabled={!isValid}>Buy</AppButton>
              </div>
            </form>
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
  updateCurrentUser
};

export default connect(mapState, mapDispatch)(DonateRubiesWithDiamondsModal);
