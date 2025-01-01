import { createReducers } from '@lib/redux';
import { merge } from 'lodash';
import {
  getGift, getGiftSuccess, getGiftFail,
  moreGift, moreGiftFail, moreGiftSuccess
} from './actions';

const initialState = {
  gifts: {
    requesting: false,
    items: [],
    total: 0,
    error: null,
    success: false
  }
};

const giftReducer = [
  {
    on: getGift,
    reducer(state: any) {
      return {
        ...state,
        Gift: {
          ...state.Gift,
          requesting: true
        }
      };
    }
  },
  {
    on: getGiftSuccess,
    reducer(state: any, data: any) {
      return {
        ...state,
        Gift: {
          requesting: false,
          items: data.payload.data,
          total: data.payload.total,
          success: true
        }
      };
    }
  },
  {
    on: getGiftFail,
    reducer(state: any, data: any) {
      return {
        ...state,
        Gift: {
          ...state.Gift,
          requesting: false,
          error: data.payload
        }
      };
    }
  },
  {
    on: moreGift,
    reducer(state: any) {
      return {
        ...state,
        Gift: {
          ...state.Gift,
          requesting: true,
          error: null,
          success: false
        }
      };
    }
  },
  {
    on: moreGiftSuccess,
    reducer(state: any, data: any) {
      return {
        ...state,
        Gift: {
          requesting: false,
          total: data.payload.total,
          items: [...state.Gift.items, ...data.payload.data],
          success: true
        }
      };
    }
  },
  {
    on: moreGiftFail,
    reducer(state: any, data: any) {
      return {
        ...state,
        Gift: {
          ...state.Gift,
          requesting: false,
          error: data.payload,
          success: false
        }
      };
    }
  }

];

export default merge({}, createReducers('gift', [giftReducer], initialState));
