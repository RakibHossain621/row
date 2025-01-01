import { IModals } from '@interfaces/modals';
import LoginModal from '@components/modals/loginModal';
import RegisterModal from '@components/modals/registerModal';
import ForgotPasswordModal from '@components/modals/forgotPasswordModal';
import DeleteAccountModal from '@components/modals/deleteAccountModal';
import DonateRubiesModal from '@components/modals/donateRubiesModal';
import PasswordResetModal from '@components/modals/passwordResetModal';
import AddCommentModal from '@components/modals/addCommentModal';
import BuyRubiesModal from '@components/modals/buyRubiesModal';
import PurchaseRubiesCompleteModal from '@components/modals/purchaseRubiesCompleteModal';
import BuyRubiesWithDiamonds from '@components/modals/buyRubiesWithDiamonds';
import PayoutRequestModal from '@components/modals/payoutRequestModal';
import LinkPaypalAccountModal from '@components/modals/linkPaypalAccountModal';
import ChangePaypalAccountModal from '@components/modals/changePaypalAccountModal';
import PaypalSuccessfulModal from '@components/modals/paypalSuccessfulModal';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { userService } from '@services/user.service';
import NotEnoughRubysLiveModal from '@components/modals/notEnoughRubysLiveModal';
import ConfirmPrivateVideoModal from '@components/modals/confirmPrivateVideoModal';
import WaitingForModelModal from '@components/modals/waitingForModelModal';
import GoLiveModal from '@components/modals/goLiveModal';
import CreateNewPhotoModal from '@components/modals/photo-video-upload/createNewPhotoModal';
import PhotoCameraModal from '@components/modals/photo-video-upload/photoCameraModal';
import CreateNewVideoModal from '@components/modals/photo-video-upload/createNewVideoModal';
import VideoCameraModal from '@components/modals/photo-video-upload/videoCameraModal';
import EndLiveStreamModal from '@components/modals/endLiveStreamModal';
import ReportLiveStreamModal from '@components/modals/reportLiveStreamModal';
import StreamMutedListModal from '@components/modals/streamMutedListModal';
import CrossPromotionPurchaseModal from '@components/modals/crossPromotionPurchaseModal';
import CrossPromotionPurchaseSuccessModal from '@components/modals/crossPromotionPurchaseSuccessModal';

type QueryStrings = {
  resetPassword?: string,
  paymentSuccess?: string,
  token?: string
  payerID?: string
}

export const LayoutModals = ({
  modals,
  updateModals
}: {
  modals: IModals,
  updateModals: Function
}) => {
  const router = useRouter()
  const queryString = router.query as QueryStrings

  const [user, setUser] = useState({} as any)

  const dispatch = useDispatch()

  const handleQueryStrings = () => {
    const resetPasswordRedirectModal = () => {
      if (queryString.resetPassword) {
        dispatch(
          updateModals({
            isPasswordResetModalOpen: true
          })
        )
      }
    }

    const paypalRedirectModal = () => {
      if (!queryString.paymentSuccess) {
        return
      }
      dispatch(
        updateModals({
          isPurchaseRubiesCompleteModalOpen: true
        })
      )
    }

    paypalRedirectModal()
    resetPasswordRedirectModal()
  }


  const getPerformerData = async () => {
    try {
      const userResponse = await userService.me();
      setUser(userResponse.data)
    } catch (error) {
      console.log(`getPerformerData error`, error)
    }
  }

  useEffect(() => {
    getPerformerData()
    handleQueryStrings()
  }, [])


  return (
    <>
      <LoginModal isOpen={modals.isLoginModalOpen} onClose={() => updateModals({ isLoginModalOpen: false })} />
      <RegisterModal isOpen={modals.isRegisterModalOpen} onClose={() => updateModals({ isRegisterModalOpen: false })} />
      <PasswordResetModal tokenId={queryString.resetPassword} isOpen={modals.isPasswordResetModalOpen} onClose={() => updateModals({ isPasswordResetModalOpen: false })} />
      <ForgotPasswordModal isOpen={modals.isForgotPasswordModalOpen} onClose={() => updateModals({ isForgotPasswordModalOpen: false })} />
      <DeleteAccountModal isOpen={modals.isDeleteAccountModalOpen} onClose={() => updateModals({ isDeleteAccountModalOpen: false })} />
      <DonateRubiesModal isOpen={modals.isDonateRubiesModalOpen} onClose={() => updateModals({ isDonateRubiesModalOpen: false })} />
      <AddCommentModal isOpen={modals.isAddCommentModalOpen} onClose={() => updateModals({ isAddCommentModalOpen: false })} />
      <BuyRubiesModal performer={user} isOpen={modals.isBuyRubiesModalOpen} onClose={() => updateModals({ isBuyRubiesModalOpen: false })} />
      <PurchaseRubiesCompleteModal orderId={queryString.token} isTransactionSuccess={queryString.paymentSuccess ? queryString.paymentSuccess : ''} isOpen={modals.isPurchaseRubiesCompleteModalOpen} onClose={() => updateModals({ isPurchaseRubiesCompleteModalOpen: false })} />
      <BuyRubiesWithDiamonds isOpen={modals.isBuyRubiesWithDiamondsModalOpen} onClose={() => updateModals({ isBuyRubiesWithDiamondsModalOpen: false })}></BuyRubiesWithDiamonds>
      <PayoutRequestModal performer={user} isOpen={modals.isPayoutRequestModalOpen} onClose={() => updateModals({ isPayoutRequestModalOpen: false })}></PayoutRequestModal>
      <LinkPaypalAccountModal updatePerformer={getPerformerData} performer={user} isOpen={modals.isLinkPaypalAccountModalOpen} onClose={() => updateModals({ isLinkPaypalAccountModalOpen: false })} />
      <ChangePaypalAccountModal isOpen={modals.isChangePaypalAccountModalOpen} onClose={() => updateModals({ isChangePaypalAccountModalOpen: false })} />
      <PaypalSuccessfulModal performer={user} isOpen={modals.isPaypalSuccessfulModalOpen} onClose={() => updateModals({ isPaypalSuccessfulModalOpen: false })} />
      <NotEnoughRubysLiveModal isOpen={modals.isNotEnoughRubysLiveModal} onClose={() => updateModals({ isNotEnoughRubysLiveModal: false })} />
      <ConfirmPrivateVideoModal 
        isOpen={modals.confirmPrivateVideoModal.isOpen} 
        performerInfos={modals.confirmPrivateVideoModal.performerInfos} 
        onClose={() => updateModals({
          confirmPrivateVideoModal: {
            isOpen: false,
            performerInfos: null
          }
        })} 
        performerTotalFollowers={modals.confirmPrivateVideoModal.performerTotalFollowers}
      />
      <WaitingForModelModal 
        isOpen={modals.isWaitingForModelModal} 
        performerInfos={modals.confirmPrivateVideoModal.performerInfos} 
        onClose={() => updateModals({
          isWaitingForModelModal: false
        })} 
        performerTotalFollowers={modals.confirmPrivateVideoModal.performerTotalFollowers}
      />
      <GoLiveModal isOpen={modals.isGoLiveModalOpen} onClose={() => updateModals({
          isGoLiveModalOpen: false
      })} />
      <CreateNewPhotoModal modalProps={modals.uploadPhotoModal} onClose={() => updateModals({
        uploadPhotoModal: {
          ...modals.uploadPhotoModal,
          isOpen: false
        }
      })} />
      <PhotoCameraModal modalProps={modals.uploadPhotoModal} isOpen={modals.isPhotoCameraModal} onClose={() => updateModals({
        isPhotoCameraModal: false
      })} />
      <CreateNewVideoModal modalProps={modals.uploadVideoModal} isOpen={modals.uploadVideoModal.isOpen} onClose={() => updateModals({
        uploadVideoModal: {
          ...modals.uploadVideoModal,
          isOpen: false
        }
      })} />
      <VideoCameraModal modalProps={modals.uploadVideoModal} isOpen={modals.isVideoCameraModal} onClose={() => updateModals({
        isVideoCameraModal: false
      })} />
      <EndLiveStreamModal isOpen={modals.isEndLiveStreamModal} onClose={() => updateModals({
        isEndLiveStreamModal: false
      })} />
      <ReportLiveStreamModal isOpen={modals.isReportLiveStreamModal} onClose={() => updateModals({
        isReportLiveStreamModal: false
      })} />

      <StreamMutedListModal modalMutedList={modals.streamMutedList} isOpen={modals.isStreamMutedListModalOpen} onClose={() => updateModals({
        isStreamMutedListModalOpen: false
      })} />
      <CrossPromotionPurchaseModal performerId={modals.crossPromotionPurchaseModal.performerId} isOpen={modals.crossPromotionPurchaseModal.isOpen} onClose={() => updateModals({
        crossPromotionPurchaseModal: {
          ...modals.crossPromotionPurchaseModal,
          isOpen: false
        }
      })} />

      <CrossPromotionPurchaseSuccessModal performerId={modals.crossPromotionPurchaseSuccessModal.performerId} isOpen={modals.crossPromotionPurchaseSuccessModal.isOpen} onClose={() => updateModals({
              crossPromotionPurchaseSuccessModal: {
                ...modals.crossPromotionPurchaseSuccessModal,
                isOpen: false
              }
      })} />
    </>
  )
}