/* global JSX */
export interface IPerformer {
  map(arg0: (performer: any) => JSX.Element): import('react').ReactNode;
  length: number;
  _id: string;
  performerId: string;
  isFollowed: boolean;
  canLive;
  canPrivateChat;
  paying;
  name: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  phoneCode: string;
  avatarPath: string;
  avatar: any;
  analytics: {
    mostFansPosition: number;
    mostFansPositionLastMonth: number;
    mostSupportedPosition: number;
    mostSupportedPositionLastMonth: number;
    feedViewsPosition: number;
    feedViewsPositionLastMonth: number;
    totalFollowerThisMonth: number;
    totalFollowerLastMonth: number;
    videoViewsThisMonth: number;
    videoViewsLastMonth: number;
    photoViewsLastMonth: number;
    photoViewsThisMonth: number;
    diamondsEarned : number;
  };
  coverPath: string;
  cover: any;
  gender: string;
  country: string;
  city: string;
  state: string;
  zipcode: string;
  address: string;
  languages: string[];
  studioId: string;
  categoryIds: string[];
  timezone: string;
  noteForUser: string;
  height: string;
  weight: string;
  bio: string;
  eyes: string;
  sexualOrientation: string;
  isFreeSubscription: boolean;
  durationFreeSubscriptionDays: number;
  monthlyPrice: number;
  yearlyPrice: number;
  stats: {
    likes: number;
    subscribers: number;
    views: number;
    totalVideos: number;
    totalPhotos: number;
    totalGalleries: number;
    totalProducts: number;
    totalFeeds: number;
    totalStories: number;
    totalBlogs: number;
    totalRating: number;
    avgRating: number;
    totalFollower: number;
    totalFollowing: number;
    totalActiveVideos: number;
    totalActivePhotos: number;
  };
  score: number;
  bankingInformation: IBanking;
  stripeAccount: any;
  paypalSetting: any;
  blockCountries: IBlockCountries;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  isOnline: number;
  verifiedAccount: boolean;
  verifiedEmail: boolean;
  verifiedDocument: boolean;
  twitterConnected: boolean;
  googleConnected: boolean;
  welcomeVideoId: string;
  welcomeVideoPath: string;
  welcomeVideoName: string;
  activateWelcomeVideo: boolean;
  isBookMarked: boolean;
  isSubscribed: boolean;
  live: number;
  privateChat: number;
  streamingStatus: string;
  ethnicity: string;
  butt: string;
  hair: string;
  pubicHair: string;
  idVerification: any;
  documentVerification: any;
  bodyType: string;
  relationship: string;
  dateOfBirth: Date;
  publicChatPrice: number;
  groupChatPrice: number;
  privateChatPrice: number;
  messagePrice: number;
  rubyBalance: number;
  balance: number;
  socialsLink: {
    facebook: string;
    google: string;
    instagram: string;
    twitter: string;
    linkedIn: string;
  };
  isPerformer: boolean;
  notificationSetting: any;
  roles: string[];
  ranking: {
    feedViewsPosition: number;
    mostFansPosition: number;
    mostSupportedPosition: number;
  };
  isUpdateProfile: boolean;
  showYearProfile: boolean;
  stripeCardIds:any
  hasBracketPromotion: boolean
  costPerMessage: number;
}

export interface IBanking {
  firstName: string;
  lastName: string;
  SSN: string;
  bankName: string;
  bankAccount: string;
  bankRouting: string;
  bankSwiftCode: string;
  address: string;
  city: string;
  state: string;
  country: string;
  performerId: string;
}

export interface IPerformerStats {
  totalGrossPrice: number;
  totalSiteCommission: number;
  totalNetPrice: number;
  items: any[];
}

export interface IBlockCountries {
  countryCodes: string[];
}

export interface IBlockedByPerformer {
  userId: string;
  description: string;
}
