export const SETTING_CHANNEL = 'SETTINGS';

export const SETTING_KEYS = {
  SITE_NAME: 'siteName',
  LOGO_URL: 'logoUrl',
  FAVICON: 'favicon',
  LOGIN_PLACEHOLDER_IMAGE: 'loginPlaceholderImage',
  REQUIRE_EMAIL_VERIFICATION: 'requireEmailVerification',
  ADMIN_EMAIL: 'adminEmail',
  SENDER_EMAIL: 'senderEmail',
  META_KEYWORDS: 'metaKeywords',
  META_DESCRIPTION: 'metaDescription',
  HEADER_SCRIPT: 'headerScript',
  AFTER_BODY_SCRIPT: 'afterBodyScript',
  MONTHLY_SUBSCRIPTION_COMMISSION: 'monthlySubscriptionCommission',
  YEARLY_SUBSCRIPTION_COMMISSION: 'yearlySubscriptionCommission',
  VIDEO_SALE_COMMISSION: 'videoSaleCommission',
  GALLERY_SALE_COMMISSION: 'gallerySaleCommission',
  PRODUCT_SALE_COMMISSION: 'productSaleCommission',
  FEED_SALE_COMMISSION: 'feedSaleCommission',
  TIP_COMMISSION: 'tipCommission',
  STREAM_COMMISSION: 'streamCommission',
  MESSAGE_COMMISSION: 'messageCommission',
  CCBILL_CLIENT_ACCOUNT_NUMBER: 'ccbillClientAccountNumber',
  CCBILL_DATALINK_USERNAME: 'ccbillDatalinkUsername',
  CCBILL_DATALINK_PASSWORD: 'ccbillDatalinkPassword',
  CCBILL_SUB_ACCOUNT_NUMBER: 'ccbillSubAccountNumber',
  CCBILL_FLEXFORM_ID: 'ccbillFlexformId',
  CCBILL_SALT: 'ccbillSalt',
  CCBILL_CURRENCY_CODE: 'ccbilCurrencyCode',
  CCBILL_ENABLE: 'ccbillEnable',
  USE_SENDGRID_TRANSPORTER: 'useSengridTransporter',
  SMTP_TRANSPORTER: 'smtpTransporter',
  GOOGLE_ANALYTICS_CODE: 'gaCode',
  MAINTENANCE_MODE: 'maintenanceMode',
  PERFORMER_VERIFY_NUMBER: 'performerVerifyNumber',
  TWITTER_CLIENT_ID: 'twitterClientId',
  TWITTER_CLIENT_SECRET: 'twitterClientSecret',
  GOOGLE_CLIENT_ID: 'googleClientId',
  GOOGLE_CLIENT_SECRET: 'googleClientSecret',
  VIEWER_URL: 'viewerURL',
  PUBLISHER_URL: 'publisherURL',
  SUBSCRIBER_URL: 'subscriberUrl',
  OPTION_FOR_BROADCAST: 'optionForBroadcast',
  OPTION_FOR_PRIVATE: 'optionForPrivate',
  OPTION_FOR_GROUP: 'optionForGroup',
  SECURE_OPTION: 'secureOption',
  ANT_MEDIA_API_ENDPOINT: 'AntMediaApiEndpoint',
  ANT_MEDIA_APPNAME: 'AntMediaAppname',
  ANT_MEDIA_ENTERPRISE: 'AntMediaEnterprise',
  FOOTER_CONTENT: 'footerContent',
  USER_BENEFIT: 'userBenefit',
  MODEL_BENEFIT: 'modelBenefit',
  GOOGLE_RECAPTCHA_SITE_KEY: 'googleReCaptchaSiteKey',
  GOOGLE_RECAPTCHA_SECRET_KEY: 'googleReCaptchaSecretKey',
  ENABLE_GOOGLE_RECAPTCHA: 'enableGoogleReCaptcha',
  BITPAY_PRODUCTION_MODE: 'bitpayProductionMode',
  BITPAY_API_TOKEN: 'bitpayApiToken',
  TOKEN_CONVERSION_RATE: 'tokenConversionRate',
  STRIPE_PUBLISHABLE_KEY: 'stripePublishableKey',
  STRIPE_SECRET_KEY: 'stripeSecretKey',
  STRIPE_ENABLE: 'stripeEnable',
  AGORA_APPID: 'agoraAppId',
  AGORA_ENABLE: 'agoraEnable',
  PAYPAL_CLIENT_ID: 'paypalClientId',
  PAYPAL_CLIENT_SECRET: 'paypalClientSecret',
  PAYPAL_ENABLE: 'paypalEnable',
  PAYPAL_LIVE_MODE: 'paypalLiveMode',
  TOTAL_FOLLOWER_FOR_LIVE: 'totalFollowerForLive',
  TOTAL_FOLLOWER_FOR_PRIVATE_CHAT: 'totalFollowerForPrivateChat',
  CROSS_PROMOTION_DESCRIPTIONS: 'crossPromotionDescription',
  EXCHANGE_RATE_WEB_VALUE: 'exchangeRateWebValue',
  SALES_RUBY_HEADER_PAGE: 'salesRubyHeaderPage'
};

export const MENU_SECTION = {
  MAIN: 'main',
  HEADER: 'header',
  FOOTER: 'footer'
};

export const RECEIVED_PAID_TOKEN_EVENT = 'RECEIVED_PAID_TOKEN_EVENT';

export const UPDATE_RUBY_MOST_SUPPORTED_EVENT = 'UPDATE_RUBY_MOST_SUPPORTED_EVENT';

export const UPDATE_TOP_GIFTED_EVENT = 'UPDATE_TOP_GIFTED_EVENT';

export const UPDATE_TOTAL_RUBY_IN_ROOM = 'UPDATE_TOTAL_RUBY_IN_ROOM';

export const ROLE_PERMISSIONS = {
  ROLE_ADMIN: 'admin',
  ROLE_PUBLIC: 'role-public',
  ROLE_FAN_FREE: 'role-fan-free',
  ROLE_FAN_PAYING: 'role-fan-paying',
  ROLE_FAN_VERIFIED: 'role-fan-verified',
  ROLE_HOST_PRIVATE: 'role-host-private',
  ROLE_HOST_LIVE: 'role-host-live',
  ROLE_HOST_VERIFIED: 'role-host-verified',
  ROLE_CHANGE_PAYMENT_SETTINGS: 'role-change-payment-settings',
  ROLE_MILESTONES: 'role-milestones',
  ROLE_ALL_RISING_MODEL: 'role-all-rising-models',
  ROLE_MANAGED_ACCOUNT: 'role-managed-account',
  ROLE_HOST_CROSSPROMOTE: 'role-host-crosspromote',
  ROLE_HOST_DMMEFEE: 'role-host-dmefee'
};

export const ROLE_UNLOCKED_FEATURE = {
  [ROLE_PERMISSIONS.ROLE_ALL_RISING_MODEL]: {
    url: '/broadcaster-dashboard',
    name: 'Broadcaster Analytics'
  },
  [ROLE_PERMISSIONS.ROLE_HOST_PRIVATE]: {
    url: '/model/private-waiting-room',
    name: 'Host Private Live'
  },
  [ROLE_PERMISSIONS.ROLE_HOST_LIVE]: {
    url: '/go-live',
    name: 'Host Public Live'
  },
  [ROLE_PERMISSIONS.ROLE_HOST_VERIFIED]: {
    url: '/broadcaster-dashboard?tab=verification',
    name: 'Get Verified to Proceed'
  },
  [ROLE_PERMISSIONS.ROLE_HOST_CROSSPROMOTE]: {
    url: '/help/models/cross-promotion',
    name: 'Cross Promotion'
  },
  [ROLE_PERMISSIONS.ROLE_HOST_DMMEFEE]: {
    url: '/help/models/dm-me-for-a-fee',
    name: 'DM ME Fee'
  }
};
