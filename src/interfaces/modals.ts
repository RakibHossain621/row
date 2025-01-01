export interface IModals {
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  isPasswordResetModalOpen: boolean;
  isForgotPasswordModalOpen: boolean;
  isDeleteAccountModalOpen: boolean;
  isDonateRubiesModalOpen: boolean;
  isBuyRubiesModalOpen: boolean;
  isPurchaseRubiesCompleteModalOpen: boolean;
  isGoLiveModalOpen: boolean;
  isAddCommentModalOpen: boolean;
  isBuyRubiesWithDiamondsModalOpen: boolean;
  isPayoutRequestModalOpen: boolean;
  isLinkPaypalAccountModalOpen: boolean;
  isChangePaypalAccountModalOpen: boolean;
  isPaypalSuccessfulModalOpen: boolean;
  isPaypalUnsuccessfulModal: boolean;
  isNotEnoughRubysLiveModal: boolean;
  confirmPrivateVideoModal: {
    isOpen: boolean;
    performerInfos: any | null;
    performerTotalFollowers: number
  },
  isWaitingForModelModal: boolean;
  // photo & video
  isPhotoCameraModal: boolean;
  uploadPhotoModal: {
    isOpen: boolean;
    imageInfos: {
      fileIds: [],
      fileList: []
    }
  },
  isVideoCameraModal: boolean;
  uploadVideoModal: {
    isOpen: boolean;
    videoPreviewUrl: string | null;
    imageInfos: {
      fileIds: [],
      fileList: File[]
    }
  },
  isEndLiveStreamModal: boolean;
  isReportLiveStreamModal: boolean;
  isStreamMutedListModalOpen: boolean
  streamMutedList: [],

  crossPromotionPurchaseModal: {
    isOpen: boolean,
    performerId: string
  },
  crossPromotionPurchaseSuccessModal: {
    isOpen: boolean,
    performerId: string
  }
}
