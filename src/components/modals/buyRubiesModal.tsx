import React, { useState, useEffect } from 'react';
import { AppButton, buttonVariants } from '@components/ui/shared/AppButton';

import { connect, useDispatch } from 'react-redux';
import { updateModals } from '@redux/modals/actions';
import useDisableScroll from 'src/hooks/useDisabledScroll';
import useClickOutside from 'src/hooks/useClickOutside';
import { IPackageToken } from '@interfaces/token-package';
import { tokenPackageService } from '@services/token-package.service';
import { paymentService } from '@services/payment.service';
import { useRouter } from 'next/router';
import Link from 'next/link';

const MockRubiesPackage: IPackageToken[] = [
  {
   _id: "1",
   description: "",
   isActive: true,
   name: "a",
   ordering: 1,
   price: 99,
   tokens: 200
  },
  {
   _id: "2",
   description: "",
   isActive: true,
   name: "aa",
   ordering: 2,
   price: 120,
   tokens: 400
  },
  {
   _id: "3",
   description: "",
   isActive: true,
   name: "a",
   ordering: 1,
   price: 200,
   tokens: 1400
  },
  {
   _id: "4",
   description: "",
   isActive: true,
   name: "a",
   ordering: 1,
   price: 250,
   tokens: 3000
  },
  {
   _id: "5",
   description: "",
   isActive: true,
   name: "a",
   ordering: 1,
   price: 250,
   tokens: 3000
  },
  {
   _id: "6",
   description: "",
   isActive: true,
   name: "a",
   ordering: 1,
   price: 250,
   tokens: 3000
  }
 ]

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  performer: any
}

const BuyRubiesModal: React.FC<ModalProps> = ({ isOpen, onClose, performer }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [rubyPackages, setRubyPackages] = useState([])
  const [selectedPackage, setSelectedPackage] = useState<IPackageToken>()
  const [paypalSettings, setPaypalSettings] = useState<{email: string} | null>({email: ''})
  const [isAgree, setIsAgree] = useState(false)

  const onCompletePurchase = async () => {
    const purchaseTokenResponse = await paymentService.purchaseTokenPackage(selectedPackage._id)
    if (purchaseTokenResponse) {
      router.push(purchaseTokenResponse.data.paypalApproveUrl)
    }
    return
  }

  const onLinkPaypalAccount = () => {
    dispatch(
      updateModals({
        isBuyRubiesModalOpen: false,
        isLinkPaypalAccountModalOpen: true
      })
    )
    return
  }
  
  useDisableScroll(isOpen);
  const ref = useClickOutside(onClose);

  const getRubyPackages = async () => {
    const rubyPackagesResponse = await tokenPackageService.search({})
    
    if (rubyPackagesResponse.data) {
      setRubyPackages(rubyPackagesResponse.data.data)
    }

    return
  }

  useEffect(() => {
    getRubyPackages()
  }, [isOpen]);

  useEffect(() => {
    setPaypalSettings({
      email: performer.paypalSetting?.value
    })
  }, [performer])

  if (!isOpen) {
    return null;
  }


  return (
    <>
      <div tabIndex={-1} aria-hidden="true" className={`overflow-y-auto px-5 overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isOpen ? 'block' : 'hidden'}`}>
        <div ref={ref} role='dialog' className="w-full max-w-3xl max-h-full m-auto">
          <div className="bg-white rounded-lg shadow pb-11">
            <header className="flex justify-between px-5 py-5 mb-10 border-b rounded-t border-base-400">
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
                  Purchase Rubys
                </span>
              </h2>

              <button onClick={onClose} type="button" className="inline-flex items-center justify-center w-6 h-6 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </header>
            <h4 className='text-center text-xl pb-5'>Sale! Get 30% off mobile prices.</h4>
            <div className='px-6 pb-8 grid grid-cols-2 gap-5 md:gap-6 md:grid-cols-4'>
              {rubyPackages.length && rubyPackages.map((rubyPackage) => (
                <button 
                  key={rubyPackage._id} 
                  className={
                    `flex flex-col w-full max-w-[471px] pb-4 border border-base-400 rounded-lg overflow-hidden ${rubyPackage === selectedPackage ? 'outline-purple outline-4' : ''}`
                  }
                  onClick={() => setSelectedPackage(rubyPackage)}
                >
                  <div className='w-full flex items-center justify-center bg-purple-200 h-14'>
                    <img className="bg-white rounded-full w-13 p-1 m-auto" alt="token" src="/static/gem.png"/>
                  </div>

                  <div className='w-full px-4 py-5 my-auto text-center'>
                    <h2 className='text-3xl text-black'>{rubyPackage.tokens}</h2>
                    <span className='text-sm text-black'>+{rubyPackage.bonusTokens} free</span>
                  </div>

                  <div className='w-full px-5 mt-auto'>
                  <span className={`w-full ${buttonVariants()}`}>${rubyPackage.price.toFixed(2)}</span>
                  </div>
                </button>
              ))}
            </div>

            <footer className="flex flex-col px-6 items-center justify-between md:items-start md:flex-row">
              <div className="w-full flex justify-start items-center gap-2 py-4 border-b md:py-0 md:border-b-0">
                <img className="w-12 p-1 rounded-full border" src="/static/paypal-simple-logo.png" alt="PayPal Logo" />
                <div>
                  <p className="font-inter text-md">Receiving PayPal Account</p>
                  {paypalSettings?.email 
                  ? <p className="text-black">{paypalSettings.email}</p> 
                  : <p className="text-black">No account linked</p>
                  }
                </div>
                <button className="p-1 rounded-full transition hover:bg-black/10" onClick={onLinkPaypalAccount}>
                  <img src='/static/editpen-icon.png' />
                </button>
              </div>
              <div className="w-full py-4 md:py-0 text-center">
                <AppButton 
                  variant="tertiary" 
                  className="mx-1 border-0"
                  onClick={onClose}
                >
                  Cancel
                </AppButton>
                <AppButton 
                  variant="secondary" 
                  className="px-2" 
                  disabled={!isAgree || !paypalSettings.email || !selectedPackage}
                  onClick={onCompletePurchase}
                >
                    Complete Purchase
                </AppButton>
                <fieldset className="px-5 py-3 flex items-center justify-center gap-2">
                  <input 
                    className="w-4 h-4 text-black cursor-pointer"
                    value={String(isAgree)} 
                    onChange={(e) => setIsAgree(e.target.checked)} 
                    type="checkbox" 
                    name="termsagree" 
                    style={{
                      accentColor: '#212121'
                    }}
                    id="termsagree" 
                  />
                  <label htmlFor="termsagree">I agree to the <Link href="/page/terms-of-service" passHref>
                    <a target='_blank' className="font-medium text-center text-purple-800 hover:underline">Terms of Service</a>
                  </Link> of this purchase</label>
                </fieldset>
              </div>
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

export default connect(mapState, mapDispatch)(BuyRubiesModal);
