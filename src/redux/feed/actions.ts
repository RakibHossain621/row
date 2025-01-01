import { createAction, createAsyncAction } from '@lib/redux';

export const {
  getFeeds,
  getFeedsSuccess,
  getFeedsFail
} = createAsyncAction('getFeeds', 'GET_FEEDS');

export const {
  moreFeeds,
  moreFeedsSuccess,
  moreFeedsFail
} = createAsyncAction('moreFeeds', 'GET_MODE_FEEDS');

export const {
  getFollowingFeeds,
  getFollowingFeedsSuccess,
  getFollowingFeedsFail
} = createAsyncAction('getFollowingFeeds', 'GET_FOLLOWING_FEEDS');

export const {
  moreFollowingFeeds,
  moreFollowingFeedsSuccess,
  moreFollowingFeedsFail
} = createAsyncAction('moreFollowingFeeds', 'GET_MODE_FOLLOWING_FEEDS');

export const {
  getRecommendFeeds,
  getRecommendFeedsSuccess,
  getRecommendFeedsFail
} = createAsyncAction('getRecommendFeeds', 'GET_RECOMMEND_FEEDS');

export const {
  moreRecommendFeeds,
  moreRecommendFeedsSuccess,
  moreRecommendFeedsFail
} = createAsyncAction('moreRecommendFeeds', 'GET_MODE_RECOMMEND_FEEDS');

export const {
  getTrendingFeeds,
  getTrendingFeedsSuccess,
  getTrendingFeedsFail
} = createAsyncAction('getTrendingFeeds', 'GET_TRENDING_FEEDS');

export const {
  moreTrendingFeeds,
  moreTrendingFeedsSuccess,
  moreTrendingFeedsFail
} = createAsyncAction('moreTrendingFeeds', 'GET_MODE_TRENDING_FEEDS');

export const {
  getHashTagFeeds,
  getHashTagFeedsSuccess,
  getHashTagFeedsFail
} = createAsyncAction('getHashTagFeeds', 'GET_HASHTAG_FEEDS');
export const {
  moreHashTagFeeds,
  moreHashTagFeedsSuccess,
  moreHashTagFeedsFail
} = createAsyncAction('moreHashTagFeeds', 'GET_MORE_HASHTAG_FEEDS');

export const {
  getVideoFeeds,
  getVideoFeedsSuccess,
  getVideoFeedsFail
} = createAsyncAction('getVideoFeeds', 'GET_VIDEO_FEEDS');

export const {
  moreVideoFeeds,
  moreVideoFeedsSuccess,
  moreVideoFeedsFail
} = createAsyncAction('moreVideoFeeds', 'GET_MODE_VIDEO_FEEDS');

export const {
  getPhotoFeeds,
  getPhotoFeedsSuccess,
  getPhotoFeedsFail
} = createAsyncAction('getPhotoFeeds', 'GET_PHOTO_FEEDS');

export const {
  morePhotoFeeds,
  morePhotoFeedsSuccess,
  morePhotoFeedsFail
} = createAsyncAction('morePhotoFeeds', 'GET_MODE_PHOTO_FEEDS');

export const {
  getRelatedFeedsSuccess
} = createAsyncAction('getRelatedFeeds', 'GET_RELATED_FEEDS');

export const removeFeedSuccess = createAction('removeFeedSuccess');
export const removeTrendingFeedSuccess = createAction('removeTrendingFeedSuccess');

export const resetFeeds = createAction('resetFeeds');

export const setMetaThumbnail = createAction('setMetaThumbnail');
