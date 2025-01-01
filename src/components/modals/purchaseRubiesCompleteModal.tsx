import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { updateModals } from '@redux/modals/actions';
import useDisableScroll from 'src/hooks/useDisabledScroll';
import useClickOutside from 'src/hooks/useClickOutside';
import { AppButton } from '@components/ui/shared/AppButton';
import { useRouter } from 'next/router';
import { paymentService } from '@services/payment.service';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  isTransactionSuccess?: string;
  orderId?: string;
  payerId?: string
}

const PurchaseRubiesCompleteModal: React.FC<ModalProps> = ({ isOpen, onClose, isTransactionSuccess, orderId, payerId }) => {
  const router = useRouter()

  useDisableScroll(isOpen);
  const ref = useClickOutside(onClose);

  const [tokensPurchased, setTokensPurchased] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const handleRequestTransaction = async () => {
    if (isTransactionSuccess === 'true') {
      setIsLoading(true)
      const sendTransactionSuccess = await paymentService.paypalCallhook({
        eventType: "PAYMENT.CAPTURE.COMPLETED",
        orderId
      })

      if (sendTransactionSuccess) {
        const checkIfTransactionIsOkay = await paymentService.paypalCallback(orderId)
        if (checkIfTransactionIsOkay.data.products[0].tokens) setTokensPurchased(checkIfTransactionIsOkay.data.products[0].tokens)
      }
    } else if (isTransactionSuccess === 'false' && orderId) {
      await paymentService.paypalCallhook({
        eventType: "PAYMENT.CAPTURE.DENIED",
        orderId
      })
    }

    setIsLoading(false)
  }

  useEffect(() => {
    handleRequestTransaction()
  }, [])

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div tabIndex={-1} aria-hidden="true" className={`overflow-y-auto px-5 overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isOpen ? 'block' : 'hidden'}`}>
        <div ref={ref} role='dialog' className="w-full max-w-3xl max-h-full m-auto">
          <div className="bg-white rounded-lg shadow">
            <header className="flex justify-between px-5 py-5 mb-10 border-b rounded-t border-base-400">
              <h2 className="inline-flex items-center gap-x-2">
                <span className='text-xl text-black'>
                  {isTransactionSuccess === 'true'
                  ? 'Thank you for your purchase' 
                  : 'Something went wrong, purchase failed'
                  }
                  
                </span>
              </h2>

              {!isLoading ? 
                <button onClick={() => {
                  router.replace('wallet')
                  onClose()
                }} type="button" className="inline-flex items-center justify-center w-6 h-6 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              : null}
            </header>
            
            <div className='px-6 md:px-8 pb-10'>
              <div className='pt-4 bg-gray-100 rounded-md'>
                <p className='text-center flex items-center justify-center text-4xl p-4 text-black'>
                  {isLoading 
                  ? <img className='animate-pulse' src='/static/gem.png' />
                  : <>{tokensPurchased} <img src='/static/gem.png' /></>
                  }
                </p>
                <p className='text-center bg-gray-200 p-2 rounded-b-md font-semibold text-gray-500 text-md'>
                  {isLoading ? 'checking your transaction' : 'Rubys have been added to your wallet'}
                </p>
              </div>
            </div>
            <footer className="flex flex-col items-end justify-end border-t p-8 py-6">
              {!isLoading ? 
                <AppButton variant='secondary' onClick={() => {
                  onClose()
                  const currentUrl = window.location.origin + window.location.pathname;
                  window.history.replaceState({}, '', currentUrl);
                  window.location.reload();
                }}>
                  Done
                </AppButton>
              : null}
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

export default connect(mapState, mapDispatch)(PurchaseRubiesCompleteModal);
