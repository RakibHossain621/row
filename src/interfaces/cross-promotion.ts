export class IBracket {
  _id: string;

  isOriginal : boolean;

  minFans : number;

  maxFans : number;

  period : number;

  rubyFee : number;

  rubyFeeRealTime : number;

  markup : number;

  numDayFailed : number;

  reduction : number;

  status : string;

  createdAt: Date;

  updatedAt: Date;
}

export class IPromotionBooking {
  _id: string;

  performerId: string;

  sourceId: string;

  transactionId: string;

  bracketId: string;

  startedAt: Date;

  expiredAt: Date;

  checkLatestAt: Date;

  status: string;

  createdAt: Date;

  updatedAt: Date;
}
