import { flatten } from 'lodash';
import { put } from 'redux-saga/effects';
import { createSagas } from '@lib/redux';
import { feedService } from '@services/index';
import { IReduxAction } from 'src/interfaces';
import {
  getFeeds, getFeedsSuccess, getFeedsFail, getFollowingFeeds, getRecommendFeeds, getVideoFeeds,
  moreFeeds, moreFeedsSuccess, moreFeedsFail, moreFollowingFeeds, moreRecommendFeeds,
  getVideoFeedsFail, getVideoFeedsSuccess, getFollowingFeedsSuccess, getTrendingFeedsSuccess, getRecommendFeedsSuccess,
  getPhotoFeeds, getPhotoFeedsFail, getPhotoFeedsSuccess, moreVideoFeeds, morePhotoFeeds, morePhotoFeedsSuccess, morePhotoFeedsFail, moreFollowingFeedsFail, moreFollowingFeedsSuccess, getTrendingFeeds, moreTrendingFeeds, moreTrendingFeedsFail, moreTrendingFeedsSuccess, moreRecommendFeedsFail, getRecommendFeedsFail, moreRecommendFeedsSuccess,
  getHashTagFeeds, getHashTagFeedsFail, getHashTagFeedsSuccess, moreHashTagFeeds, moreHashTagFeedsFail, moreHashTagFeedsSuccess
} from './actions';

const performerSagas = [
  {
    on: getFeeds,
    * worker(data: IReduxAction<any>) {
      try {
        const resp = data.payload.isHome ? yield feedService.userHomeFeeds(data.payload) : yield feedService.userSearch(data.payload);
        yield put(getFeedsSuccess(resp.data));
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield put(getFeedsFail(error));
      }
    }
  },
  {
    on: moreFeeds,
    * worker(data: IReduxAction<any>) {
      try {
        const resp = data.payload.isHome ? yield feedService.userHomeFeeds(data.payload) : yield feedService.userSearch(data.payload);
        yield put(moreFeedsSuccess(resp.data));
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield put(moreFeedsFail(error));
      }
    }
  },

  {
    on: getTrendingFeeds,
    * worker(data: IReduxAction<any>) {
      try {
        const resp = yield feedService.trendingSearch(data.payload);
        yield put(getTrendingFeedsSuccess(resp.data));
        // yield put(getFeedsSuccess(resp.data));
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield put(moreTrendingFeedsFail(error));
      }
    }
  },

  {
    on: moreTrendingFeeds,
    * worker(data: IReduxAction<any>) {
      try {
        const resp = yield feedService.userSearch(data.payload);
        yield put(moreTrendingFeedsSuccess(resp.data));
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield put(moreTrendingFeedsFail(error));
      }
    }
  },
  {
    on: getFollowingFeeds,
    * worker(data: IReduxAction<any>) {
      try {
        const resp = yield feedService.followingSearch(data.payload);
        yield put(getFollowingFeedsSuccess(resp.data));
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield put(moreFollowingFeedsFail(error));
      }
    }
  },
  {
    on: moreFollowingFeeds,
    * worker(data: IReduxAction<any>) {
      try {
        const resp = yield feedService.followingSearch(data.payload);
        yield put(moreFollowingFeedsSuccess(resp.data));
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield put(moreFollowingFeedsFail(error));
      }
    }
  },

  {
    on: getHashTagFeeds,
    * worker(data: IReduxAction<any>) {
      try {
        const resp = yield feedService.userSearch(data.payload);
        yield put(getHashTagFeedsSuccess(resp.data));
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield put(getHashTagFeedsFail(error));
      }
    }
  },

  {
    on: moreHashTagFeeds,
    * worker(data: IReduxAction<any>) {
      try {
        const resp = yield feedService.userSearch(data.payload);
        yield put(moreHashTagFeedsSuccess(resp.data));
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield put(moreHashTagFeedsFail(error));
      }
    }
  },

  {
    on: getRecommendFeeds,
    * worker(data: IReduxAction<any>) {
      try {
        const resp = yield feedService.userRecommendSearch(data.payload);
        yield put(getRecommendFeedsSuccess(resp.data));
        yield put(getFeedsSuccess(resp.data));
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield put(getRecommendFeedsFail(error));
        yield put(getFeedsFail(error));
      }
    }
  },
  {
    on: moreRecommendFeeds,
    * worker(data: IReduxAction<any>) {
      try {
        const resp = yield feedService.userRecommendSearch(data.payload);
        yield put(moreRecommendFeedsSuccess(resp.data));
        yield put(moreFeedsSuccess(resp.data));
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield put(moreRecommendFeedsFail(error));
      }
    }
  },

  {
    on: getVideoFeeds,
    * worker(data: IReduxAction<any>) {
      try {
        const resp = yield feedService.userSearch({ ...data.payload, postType: 'video' });
        yield put(getVideoFeedsSuccess(resp.data));
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield put(getVideoFeedsFail(error));
      }
    }
  },
  {
    on: moreVideoFeeds,
    * worker(data: IReduxAction<any>) {
      try {
        const resp = yield feedService.userSearch({ ...data.payload, postType: 'video' });
        yield put(moreFeedsSuccess(resp.data));
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield put(moreFeedsFail(error));
      }
    }
  },

  {
    on: getPhotoFeeds,
    * worker(data: IReduxAction<any>) {
      try {
        const resp = yield feedService.userSearch({ ...data.payload, postType: 'photo' });
        yield put(getPhotoFeedsSuccess(resp.data));
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield put(getPhotoFeedsFail(error));
      }
    }
  },
  {
    on: morePhotoFeeds,
    * worker(data: IReduxAction<any>) {
      try {
        const resp = yield feedService.userSearch({ ...data.payload, postType: 'photo' });
        yield put(morePhotoFeedsSuccess(resp.data));
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield put(morePhotoFeedsFail(error));
      }
    }
  }

];

export default flatten([createSagas(performerSagas)]);
