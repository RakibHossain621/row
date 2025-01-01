import { merge } from 'lodash';
import { createReducers } from '@lib/redux';
import { updateModals } from './actions';
import { IModals } from '@interfaces/modals';

const initialState: IModals = {
  isGoLiveModalOpen: false,
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  isForgotPasswordModalOpen: false,
  isPasswordResetModalOpen: false,
  isDeleteAccountModalOpen: false,
  isDonateRubiesModalOpen: false,
  isBuyRubiesModalOpen: false,
  isAddCommentModalOpen: false,
  isPurchaseRubiesCompleteModalOpen: false,
  isBuyRubiesWithDiamondsModalOpen: false,
  isPayoutRequestModalOpen: false,
  isLinkPaypalAccountModalOpen: false,
  isChangePaypalAccountModalOpen: false,
  isPaypalSuccessfulModalOpen: false,
  isPaypalUnsuccessfulModal: false,
  isNotEnoughRubysLiveModal: false,
  confirmPrivateVideoModal: {
    isOpen: false,
    performerInfos: null,
    performerTotalFollowers: 0
  },
  isWaitingForModelModal: false,
  uploadPhotoModal: {
    isOpen: false,
    imageInfos: {
      fileList: [],
      fileIds: []
    }
  },
  isPhotoCameraModal: false,
  uploadVideoModal: {
    isOpen: false,
    videoPreviewUrl: null,
    imageInfos: {
      fileList: [],
      fileIds: []
    }
  },
  isVideoCameraModal: false,
  isEndLiveStreamModal: false,
  isReportLiveStreamModal: false,
  isStreamMutedListModalOpen: false,
  streamMutedList: [],
  crossPromotionPurchaseModal: {
    isOpen: false,
    performerId: ''
  },
  crossPromotionPurchaseSuccessModal: {
    isOpen: false,
    performerId: ''
  }
};

const updateModalsReducers = [
  {
    on: updateModals,
    reducer(state: IModals, data: any) {
      return {
        ...state,
        ...data.payload
      };
    }
  }
];

export default merge({}, createReducers('modals', [updateModalsReducers], initialState));
