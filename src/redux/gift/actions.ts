import { createAsyncAction } from '@lib/redux';

export const {
  getGift,
  getGiftSuccess,
  getGiftFail
} = createAsyncAction('getGift', 'GET_GIFT');

export const {
  moreGift, moreGiftSuccess, moreGiftFail
} = createAsyncAction('moreGift', 'MORE_GIFT');
