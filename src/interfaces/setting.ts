export interface IError {
  statusCode: number;
  message: string;
}

export interface IContact {
  email: string;
  message: any;
  name: string;
}

export interface ISettings {
  requireEmailVerification: boolean;
  googleReCaptchaSiteKey: string;
  enableGoogleReCaptcha: boolean;
  googleClientId: string;
  twitterClientId: string;
  tokenConversionRate: number;
  stripePublishableKey: string;
  stripeEnable: boolean;
  ccbillEnable: boolean;
  bitpayEnable: boolean;
  paypalEnable: boolean;
  metaKeywords: string;
  metaDescription: string;
  agoraEnable: boolean;
  totalFollowerForLive:boolean;
  totalFollowerForPrivateChat:boolean;
  crossPromotionDescription:any
  salesRubyHeaderPage:any;
  exchangeRateWebValue: number;

}
