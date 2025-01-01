import { merge } from 'lodash';
import { createReducers } from '@lib/redux';
import { updateSettings } from './actions';

// TODO -
const initialState = {
  requireEmailVerification: false,
  googleReCaptchaSiteKey: '',
  enableGoogleReCaptcha: false,
  googleClientId: '131651031881-pljcapjv7kuamrtbicm77lurk75fvoe6.apps.googleusercontent.com',
  twitterClientId: '',
  tokenConversionRate: 1,
  stripePublishableKey: '',
  stripeEnable: false,
  ccbillEnable: false,
  bitpayEnable: false,
  paypalEnable: false,
  totalFollowerForPrivateChat: 0,
  totalFollowerForLive: 0,
  crossPromotionDescription: {},
  salesRubyHeaderPage: '',
  exchangeRateWebValue: 0.01
};

const settingReducers = [
  {
    on: updateSettings,
    reducer(state: any, data: any) {
      return {
        ...data.payload
      };
    }
  }
];

export default merge({}, createReducers('settings', [settingReducers], initialState));
