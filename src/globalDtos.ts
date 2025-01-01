type SourceType = 'performer' | 'admin' | 'user' 
type PaymentStatusType = 'created' | 'complete' 

export interface TokenPackageType {
  description: string;

  name: string;
  price: number;
  productId: string;
  productType: string;
  quantity: number;
  tokens: number;
}

export interface TokenTransactionsType {
  _id: string;

  couponInfo: string | null;
  performerId: string | null;
  liveMode: boolean;
  source: SourceType;
  sourceId: string;
  status: PaymentStatusType;
  type: string;
  target: string;
  targetId: string;
  originalPrice: number;
  paymentGateway: string
  paypalApproveUrl: string
  totalPrice: number;
  transactionFee: number;

  products: TokenPackageType[]

  createdAt: string;
  updatedAt: string;
}

export interface EarningsType {
  cashValue: number;
  totalGrossPrice: number;
  totalNetPrice: number;
  totalSiteCommission: number;
}