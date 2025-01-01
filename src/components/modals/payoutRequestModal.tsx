import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { AppInput } from '@components/ui/shared/AppInput';
import { AppButton } from '@components/ui/shared/AppButton';

import { connect, useDispatch } from 'react-redux';
import { updateModals } from '@redux/modals/actions';

import useClickOutside from 'src/hooks/useClickOutside';
import useDisableScroll from 'src/hooks/useDisabledScroll';
import { payoutRequestService } from '@services/payout-request.service';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  performer: any;
}

const schema = yup.object({
  amount: yup
    .number()
    .min(100, "The amount must be at least 100")
    .typeError("Must be a number")
    .positive("Must be a positive number")
    .required("Please enter an amount"),
  tandc: yup.bool()
    .oneOf([true], "You must accept the terms and conditions")
    .default(false)
    .required()
})

const tokenConversionRate = 0.01

const PayoutRequestModal: React.FC<ModalProps> = ({ isOpen, onClose, performer }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  
  const { register, handleSubmit, formState: { isLoading, isValid, errors }, watch } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });
  
  const amountToWithdraw = watch('amount')
  const termsAndConditions = watch('tandc')

  const [paypalSettings, setPaypalSettings] = useState<{ email: string } | null>(null)
  const [payoutRules, setPayoutRules] = useState({
    earningMinimum: false,
    accountVerified: false
  })
  const [payoutAvailable, setPayoutAvailable] = useState(0)


  const calculateAmountAvailable = () => {
    const amountAvailableInMoney = performer.balance * tokenConversionRate

    setPayoutAvailable(amountAvailableInMoney)
    return amountAvailableInMoney
  }
  const calculateAmountTokensToSend = () => {
    const amountToWithdrawInTokens = amountToWithdraw / tokenConversionRate

    if (amountToWithdrawInTokens > performer.balance) return 0 

    return amountToWithdrawInTokens
  }

  const onSubmit = async (data) => {
    const tokensToPayout = calculateAmountTokensToSend()
    console.log("will send payout", {
      source: 'performer',
      requestTokens: tokensToPayout,
      paymentAccountType: 'paypal'
    })
    try {
      const sendPayout = await payoutRequestService.create({
        source: 'performer',
        requestTokens: tokensToPayout,
        paymentAccountType: 'paypal'
      })

      if (sendPayout) {
        router.reload()
        dispatch(updateModals({
          isPayoutRequestModalOpen: false,
        }))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onLinkPaypalAccount = () => {
    dispatch(updateModals({
      isPayoutRequestModalOpen: false,
      isLinkPaypalAccountModalOpen: true
    }))
    return
  }

  useDisableScroll(isOpen);
  const ref = useClickOutside(onClose);

  useEffect(() => {
    setPaypalSettings({
      email: performer.paypalSetting?.value
    })
    calculateAmountAvailable()
  }, [performer])

  useEffect(() => {
    if (!paypalSettings?.email) {
      setPayoutRules({
        ...payoutRules,
        accountVerified: false
      })
    } else {
      setPayoutRules({
        ...payoutRules,
        accountVerified: true
      })
    }
  }, [paypalSettings])

  useEffect(() => {
    if (performer.balance * tokenConversionRate > 100) {
      setPayoutRules({
        ...payoutRules,
        earningMinimum: true
      })
    } else {
      setPayoutRules({
        ...payoutRules,
        earningMinimum: false
      })
    }
  }, [amountToWithdraw, termsAndConditions, performer])

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div tabIndex={-1} aria-hidden="true" className={`overflow-y-auto px-5 overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isOpen ? 'block' : 'hidden'}`}>
        <div ref={ref} role='dialog' className="w-full max-w-[434px] max-h-full m-auto">
          <div className="bg-white rounded-lg shadow">
            <div className="flex justify-between px-5 py-5 mb-3 border-b rounded-t border-base-400">
              <h2 className="inline-flex items-center gap-x-2">
                <span className='text-xl text-black'>
                  New payout request
                </span>
              </h2>

              <button onClick={onClose} type="button" className="inline-flex items-center justify-center w-6 h-6 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form className='px-5 pb-8' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-6'>
                <AppInput prefixIcon='$' id='payout-request-amount' label='Withdrawal amount' type="text" errorMessage={errors?.amount?.message} {...register("amount")}  />
              </div>

              <div className='mb-6'>
                <h4 className='mb-2 text-xs font-semibold text-black'>Minimal withdrawal requirements</h4>


                <div className='space-y-3'>
                  {payoutAvailable < amountToWithdraw ? 
                    <p className='flex items-center gap-2'>
                        <ErrorIcon />

                        <span className='text-xs text-black'>
                         The amount you are requesting exceeds your balance”
                        </span>
                    </p>
                  : null}

                  <p className='flex items-center gap-2'>
                      {amountToWithdraw >= 100 
                      ? <CheckIcon />
                      : <WarningIcon />
                      }

                      <span className='text-xs text-black'>
                        Your withdraw must be more than $100
                      </span>
                  </p>

                  <p className='flex items-center gap-2'>
                    {payoutRules.earningMinimum 
                    ? <CheckIcon />
                    : <WarningIcon />
                    }


                    <span className='text-xs text-black'>
                      Your earnings must be more than $100 to withdraw funds
                    </span>
                  </p>

                  <p className='flex items-center gap-2'>
                    {payoutRules.accountVerified 
                    ? <CheckIcon />
                    : <WarningIcon />
                    }

                    <span className='text-xs text-black'>
                      Your account must be <span className='text-purple-800 cursor-pointer hover:underline'>verified</span>
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center w-full gap-2 pb-8 mb-8 border-b border-base-400">
                <img className="w-12 p-1 border rounded-full" src="/static/paypal-simple-logo.png" alt="PayPal Logo" />
                <div>
                  <p className="font-inter text-md">Receiving PayPal Account</p>
                  {paypalSettings
                    ? <p className="text-black">{paypalSettings.email}</p>
                    : <p className="text-black">No account linked</p>
                  }
                </div>
                <button type='button' className="p-1 transition rounded-full hover:bg-black/10" onClick={onLinkPaypalAccount}>
                  <img src='/static/editpen-icon.png' />
                </button>
              </div>

              <div className='flex justify-between gap-3'>
                <div>
                  <label className='inline-flex gap-2 text-xs text-black max-w-[140px]'>
                    <input {...register("tandc")} type="checkbox" className='w-4 h-4 mr-auto text-black bg-gray-100 rounded checked:bg-black border-base-400 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500' />
                    I agree to the terms of this purchase
                  </label>
                </div>

                <div className='flex items-center justify-end gap-2 md:gap-4 lg:gap-6'>
                  <button onClick={onClose} className="text-sm font-medium text-black hover:opacity-80 hover:underline">
                    Cancel
                  </button>

                  <AppButton type="submit" disabled={!isValid || amountToWithdraw < 100 }>Submit</AppButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-30 ${isOpen ? 'block' : 'hidden'}`} />
    </>
  );
};

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M7.75508 12.7314L13.6525 6.83397L12.7281 5.90956L7.75508 10.8826L5.25508 8.38257L4.33067 9.30698L7.75508 12.7314ZM9.00149 17.3333C7.84891 17.3333 6.76555 17.1146 5.75139 16.6771C4.73722 16.2397 3.85504 15.6461 3.10485 14.8962C2.35464 14.1464 1.76073 13.2646 1.32311 12.2508C0.885496 11.2371 0.666687 10.154 0.666687 9.00143C0.666687 7.84885 0.885401 6.76549 1.32283 5.75133C1.76026 4.73716 2.3539 3.85498 3.10375 3.10479C3.85363 2.35458 4.73542 1.76067 5.74913 1.32305C6.76284 0.885436 7.84597 0.666626 8.99855 0.666626C10.1511 0.666626 11.2345 0.885341 12.2486 1.32277C13.2628 1.7602 14.145 2.35384 14.8952 3.10369C15.6454 3.85356 16.2393 4.73536 16.6769 5.74907C17.1145 6.76278 17.3334 7.84591 17.3334 8.99849C17.3334 10.1511 17.1146 11.2344 16.6772 12.2486C16.2398 13.2628 15.6461 14.1449 14.8963 14.8951C14.1464 15.6453 13.2646 16.2392 12.2509 16.6769C11.2372 17.1145 10.1541 17.3333 9.00149 17.3333Z" fill="#24A148" />
  </svg>
)

const WarningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
    <path d="M9.15785 4.83338H7.84211V9.87724H9.15785L9.15785 4.83338ZM8.49998 11.3786C8.29923 11.3786 8.13097 11.4465 7.99518 11.5823C7.85939 11.7181 7.79149 11.8863 7.79149 12.0871C7.79149 12.2878 7.85939 12.4561 7.99518 12.5919C8.13097 12.7277 8.29923 12.7956 8.49998 12.7956C8.70073 12.7956 8.86899 12.7277 9.00478 12.5919C9.14057 12.4561 9.20847 12.2878 9.20847 12.0871C9.20847 11.8863 9.14057 11.7181 9.00478 11.5823C8.86899 11.4465 8.70073 11.3786 8.49998 11.3786ZM8.49851 0.666707C9.65109 0.666707 10.7345 0.885422 11.7486 1.32285C12.7628 1.76028 13.645 2.35392 14.3951 3.10377C15.1454 3.85365 15.7393 4.73544 16.1769 5.74916C16.6145 6.76286 16.8333 7.846 16.8333 8.99857C16.8333 10.1511 16.6146 11.2345 16.1772 12.2487C15.7397 13.2628 15.1461 14.145 14.3962 14.8952C13.6464 15.6454 12.7646 16.2393 11.7509 16.6769C10.7372 17.1146 9.65403 17.3334 8.50145 17.3334C7.34887 17.3334 6.26551 17.1147 5.25135 16.6772C4.23718 16.2398 3.355 15.6462 2.60481 14.8963C1.8546 14.1464 1.26069 13.2646 0.823074 12.2509C0.385456 11.2372 0.166646 10.1541 0.166646 9.00151C0.166646 7.84893 0.385361 6.76557 0.822789 5.75141C1.26022 4.73725 1.85386 3.85506 2.60371 3.10487C3.35358 2.35467 4.23538 1.76075 5.24909 1.32313C6.2628 0.885517 7.34594 0.666707 8.49851 0.666707Z" fill="#DFA102" />
  </svg>
)

const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
    <path d="M7.44012 14.1666L10.5 11.1067L13.5599 14.1666L14.6667 13.0599L11.6068 9.99996L14.6667 6.94006L13.5599 5.83329L10.5 8.89319L7.44012 5.83329L6.33335 6.94006L9.39325 9.99996L6.33335 13.0599L7.44012 14.1666ZM10.5 18.3333C9.35708 18.3333 8.27924 18.1163 7.26651 17.6823C6.25378 17.2482 5.36764 16.6514 4.60809 15.8919C3.84854 15.1323 3.25176 14.2462 2.81773 13.2335C2.3837 12.2207 2.16669 11.1429 2.16669 9.99996C2.16669 8.84255 2.3837 7.7611 2.81773 6.7556C3.25176 5.7501 3.84854 4.86758 4.60809 4.10803C5.36764 3.34848 6.25378 2.7517 7.26651 2.31767C8.27924 1.88364 9.35708 1.66663 10.5 1.66663C11.6574 1.66663 12.7389 1.88364 13.7444 2.31767C14.7499 2.7517 15.6324 3.34848 16.3919 4.10803C17.1515 4.86758 17.7483 5.7501 18.1823 6.7556C18.6163 7.7611 18.8334 8.84255 18.8334 9.99996C18.8334 11.1429 18.6163 12.2207 18.1823 13.2335C17.7483 14.2462 17.1515 15.1323 16.3919 15.8919C15.6324 16.6514 14.7499 17.2482 13.7444 17.6823C12.7389 18.1163 11.6574 18.3333 10.5 18.3333Z" fill="#DC1C1C" />
  </svg>
)

const mapState = (state) => ({
  modals: { ...state.modals },
});

const mapDispatch = {
  updateModals,
};

export default connect(mapState, mapDispatch)(PayoutRequestModal);
