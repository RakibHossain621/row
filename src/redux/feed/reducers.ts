/* eslint-disable no-param-reassign */
import { merge } from 'lodash';
import { createReducers } from '@lib/redux';
import { onFollow } from '@redux/performer/actions';
import {
  getFeeds,
  getFeedsSuccess,
  getFeedsFail,
  moreFeeds,
  moreFeedsFail,
  moreFeedsSuccess,
  removeFeedSuccess,
  getVideoFeeds,
  getVideoFeedsSuccess,
  getVideoFeedsFail,
  moreVideoFeeds,
  moreVideoFeedsSuccess,
  moreVideoFeedsFail,
  getPhotoFeeds,
  getPhotoFeedsFail,
  morePhotoFeeds,
  morePhotoFeedsFail,
  morePhotoFeedsSuccess,
  getPhotoFeedsSuccess,
  getFollowingFeeds,
  getFollowingFeedsSuccess,
  getFollowingFeedsFail,
  moreFollowingFeeds,
  moreFollowingFeedsSuccess,
  moreFollowingFeedsFail,

  getTrendingFeeds,
  getTrendingFeedsSuccess,
  getTrendingFeedsFail,
  moreTrendingFeeds,
  moreTrendingFeedsSuccess,
  moreTrendingFeedsFail,
  removeTrendingFeedSuccess,

  getHashTagFeeds,
  getHashTagFeedsSuccess,
  getHashTagFeedsFail,
  moreHashTagFeeds,
  moreHashTagFeedsSuccess,
  moreHashTagFeedsFail,

  getRecommendFeeds,
  getRecommendFeedsSuccess,
  getRecommendFeedsFail,
  moreRecommendFeeds,
  moreRecommendFeedsSuccess,
  moreRecommendFeedsFail,
  resetFeeds,

  getRelatedFeedsSuccess,
  setMetaThumbnail
} from './actions';

const initialState = {
  feeds: {
    requesting: false,
    error: null,
    data: null,
    success: false
  },
  recommendFeeds: {
    requesting: false,
    error: null,
    data: null,
    success: false
  },
  followingFeeds: {
    requesting: false,
    error: null,
    data: null,
    success: false
  },
  trendingFeeds: {
    requesting: false,
    error: null,
    data: null,
    success: false
  },

  hashtagFeeds: {
    requesting: false,
    error: null,
    data: null,
    success: false
  },
  videoFeeds: {
    requesting: false,
    error: null,
    data: null,
    success: false
  },
  photoFeeds: {
    requesting: false,
    error: null,
    data: null,
    success: false
  },
  metaDataThumbnail: null

};

const feedReducers = [
  {
    on: getFeeds,
    reducer(prevState: any) {
      return {
        ...prevState,
        feeds: {
          ...initialState.feeds,
          requesting: true
        }
      };
    }
  },

  {
    on: getFeedsSuccess,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        feeds: {
          ...prevState.feeds,
          requesting: false,
          items: data.payload.data,
          total: data.payload.total,
          success: true
        }
      };
    }
  },
  {
    on: getFeedsFail,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        feeds: {
          ...prevState.feeds,
          requesting: false,
          error: data.payload
        }
      };
    }
  },
  {
    on: moreFeeds,
    reducer(prevState: any) {
      return {
        ...prevState,
        feeds: {
          ...prevState.feeds,
          requesting: true,
          error: null,
          success: false
        }
      };
    }
  },
  {
    on: moreFeedsSuccess,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        feeds: {
          ...prevState.feeds,
          requesting: false,
          total: data.payload.total,
          items: [...prevState.feeds.items, ...data.payload.data],
          success: true
        }
      };
    }
  },
  {
    on: moreFeedsFail,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        feeds: {
          ...prevState.feeds,
          requesting: false,
          error: data.payload,
          success: false
        }
      };
    }
  },
  {
    on: getFollowingFeeds,
    reducer(prevState: any) {
      return {
        ...prevState,
        followingFeeds: {
          ...initialState.followingFeeds,
          requesting: true
        }
      };
    }
  },
  {
    on: getFollowingFeedsSuccess,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        followingFeeds: {
          ...prevState.followingFeeds,
          requesting: false,
          items: data.payload.data,
          total: data.payload.total,
          success: true
        }
      };
    }
  },
  {
    on: getFollowingFeedsFail,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        followingFeeds: {
          ...prevState.followingFeeds,
          requesting: false,
          error: data.payload
        }
      };
    }
  },
  {
    on: moreFollowingFeeds,
    reducer(prevState: any) {
      return {
        ...prevState,
        followingFeeds: {
          ...prevState.followingFeeds,
          requesting: true,
          error: null,
          success: false
        }
      };
    }
  },
  {
    on: moreFollowingFeedsSuccess,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        followingFeeds: {
          ...prevState.followingFeeds,
          requesting: false,
          total: data.payload.total,
          items: [...prevState.followingFeeds.items, ...data.payload.data],
          success: true
        }
      };
    }
  },
  {
    on: moreFollowingFeedsFail,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        followingFeeds: {
          ...prevState.followingFeeds,
          requesting: false,
          error: data.payload,
          success: false
        }
      };
    }
  },

  {
    on: getRecommendFeeds,
    reducer(prevState: any) {
      return {
        ...prevState,
        recommendFeeds: {
          ...initialState.recommendFeeds,
          requesting: true
        }
      };
    }
  },
  {
    on: getRecommendFeedsSuccess,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        recommendFeeds: {
          ...prevState.recommendFeeds,
          requesting: false,
          items: data.payload.data,
          total: data.payload.total,
          success: true
        }
      };
    }
  },
  {
    on: getRecommendFeedsFail,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        recommendFeeds: {
          ...prevState.recommendFeeds,
          requesting: false,
          error: data.payload
        }
      };
    }
  },
  {
    on: moreRecommendFeeds,
    reducer(prevState: any) {
      return {
        ...prevState,
        recommendFeeds: {
          ...prevState.recommendFeeds,
          requesting: true,
          error: null,
          success: false
        }
      };
    }
  },
  {
    on: moreRecommendFeedsSuccess,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        recommendFeeds: {
          ...prevState.recommendFeeds,
          requesting: false,
          total: data.payload.total,
          items: [...prevState.recommendFeeds.items, ...data.payload.data],
          success: true
        }
      };
    }
  },
  {
    on: moreRecommendFeedsFail,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        recommendFeeds: {
          ...prevState.recommendFeeds,
          requesting: false,
          error: data.payload,
          success: false
        }
      };
    }
  },
  {
    on: getTrendingFeeds,
    reducer(prevState: any) {
      return {
        ...prevState,
        trendingFeeds: {
          ...initialState.trendingFeeds,
          requesting: true
        }
      };
    }
  },
  {
    on: getTrendingFeedsSuccess,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        trendingFeeds: {
          ...prevState.trendingFeeds,
          requesting: false,
          items: data.payload.data,
          total: data.payload.total,
          success: true
        }
      };
    }
  },
  {
    on: getTrendingFeedsFail,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        trendingFeeds: {
          ...prevState.trendingFeeds,
          requesting: false,
          error: data.payload
        }
      };
    }
  },
  {
    on: moreTrendingFeeds,
    reducer(prevState: any) {
      return {
        ...prevState,
        trendingFeeds: {
          ...prevState.trendingFeeds,
          requesting: true,
          error: null,
          success: false
        }
      };
    }
  },
  {
    on: moreTrendingFeedsSuccess,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        trendingFeeds: {
          ...prevState.trendingFeeds,
          requesting: false,
          total: data.payload.total,
          items: [...prevState.trendingFeeds.items, ...data.payload.data],
          success: true
        }
      };
    }
  },
  {
    on: moreTrendingFeedsFail,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        trendingFeeds: {
          ...prevState.trendingFeeds,
          requesting: false,
          error: data.payload,
          success: false
        }
      };
    }
  },

  {
    on: getHashTagFeeds,
    reducer(prevState: any) {
      return {
        ...prevState,
        hashtagFeeds: {
          ...initialState.hashtagFeeds,
          requesting: true
        }
      };
    }
  },
  {
    on: getHashTagFeedsSuccess,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        hashtagFeeds: {
          ...prevState.hashtagFeeds,
          requesting: false,
          items: data.payload.data,
          total: data.payload.total,
          success: true
        }
      };
    }
  },
  {
    on: getHashTagFeedsFail,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        hashtagFeeds: {
          ...prevState.hashtagFeeds,
          requesting: false,
          error: data.payload
        }
      };
    }
  },
  {
    on: moreHashTagFeeds,
    reducer(prevState: any) {
      return {
        ...prevState,
        hashtagFeeds: {
          ...prevState.hashtagFeeds,
          requesting: true,
          error: null,
          success: false
        }
      };
    }
  },
  {
    on: moreHashTagFeedsSuccess,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        hashtagFeeds: {
          ...prevState.hashtagFeeds,
          requesting: false,
          total: data.payload.total,
          items: [...prevState.hashtagFeeds.items, ...data.payload.data],
          success: true
        }
      };
    }
  },
  {
    on: moreHashTagFeedsFail,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        hashtagFeeds: {
          ...prevState.hashtagFeeds,
          requesting: false,
          error: data.payload,
          success: false
        }
      };
    }
  },
  {
    on: getVideoFeeds,
    reducer(prevState: any) {
      return {
        ...prevState,
        videoFeeds: {
          ...initialState.videoFeeds,
          requesting: true
        }
      };
    }
  },
  {
    on: getVideoFeedsSuccess,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        videoFeeds: {
          ...prevState.videoFeeds,
          requesting: false,
          items: data.payload.data,
          total: data.payload.total,
          success: true
        }
      };
    }
  },
  {
    on: getVideoFeedsFail,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        videoFeeds: {
          ...prevState.videoFeeds,
          requesting: false,
          error: data.payload
        }
      };
    }
  },
  {
    on: moreVideoFeeds,
    reducer(prevState: any) {
      return {
        ...prevState,
        videoFeeds: {
          ...prevState.videoFeeds,
          requesting: true,
          error: null,
          success: false
        }
      };
    }
  },
  {
    on: moreVideoFeedsSuccess,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        videoFeeds: {
          ...prevState.videoFeed,
          requesting: false,
          total: data.payload.total,
          items: [...prevState.videoFeeds.items, ...data.payload.data],
          success: true
        }
      };
    }
  },
  {
    on: moreVideoFeedsFail,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        videoFeeds: {
          ...prevState.videoFeeds,
          requesting: false,
          error: data.payload,
          success: false
        }
      };
    }
  },
  {
    on: getPhotoFeeds,
    reducer(prevState: any) {
      return {
        ...prevState,
        photoFeeds: {
          ...initialState.photoFeeds,
          requesting: true
        }
      };
    }
  },
  {
    on: getPhotoFeedsSuccess,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        photoFeeds: {
          ...prevState.photoFeeds,
          requesting: false,
          items: data.payload.data,
          total: data.payload.total,
          success: true
        }
      };
    }
  },
  {
    on: getPhotoFeedsFail,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        photoFeeds: {
          ...prevState.photoFeeds,
          requesting: false,
          error: data.payload
        }
      };
    }
  },
  {
    on: morePhotoFeeds,
    reducer(prevState: any) {
      return {
        ...prevState,
        photoFeeds: {
          ...prevState.photoFeeds,
          requesting: true,
          error: null,
          success: false
        }
      };
    }
  },
  {
    on: morePhotoFeedsSuccess,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        photoFeeds: {
          ...prevState.photoFeeds,
          requesting: false,
          total: data.payload.total,
          items: [...prevState.photoFeeds.items, ...data.payload.data],
          success: true
        }
      };
    }
  },
  {
    on: morePhotoFeedsFail,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        photoFeeds: {
          ...prevState.photoFeeds,
          requesting: false,
          error: data.payload,
          success: false
        }
      };
    }
  },
  {
    on: getRelatedFeedsSuccess,
    reducer(prevState: any, data: any) {
      const { items } = prevState.feeds || [];
      return {
        ...prevState,
        feeds: {
          ...prevState.feeds,
          requesting: false,
          items: [data.payload].concat(items),
          total: prevState.total + 1,
          success: true
        }
      };
    }
  },
  {
    on: removeFeedSuccess,
    reducer(prevState: any, data: any) {
      const { feed } = data.payload;
      const { items } = prevState.feeds || [];
      items && items.length && items.splice(
        items.findIndex((f) => f._id === feed._id),
        1
      );
      return {
        ...prevState,
        feeds: {
          total: prevState.total - 1,
          items
        }
      };
    }
  },
  {
    on: removeTrendingFeedSuccess,
    reducer(prevState: any, data: any) {
      const { feed } = data.payload;
      const { items } = prevState.trendingFeeds || [];
      items && items.length && items.splice(
        items.findIndex((f) => f._id === feed._id),
        1
      );
      return {
        ...prevState,
        trendingFeeds: {
          total: prevState.total - 1,
          items
        }
      };
    }
  },
  {
    on: onFollow,
    reducer(prevState: any, data: any) {
      const { action, performerId } = data.payload;
      const { items } = prevState.feeds || [];
      return {
        ...prevState,
        feeds: {
          total: prevState.total - 1,
          items:
            items && items.length > 0
              ? items.map((item) => {
                if (item.fromSourceId === performerId) {
                  // eslint-disable-next-line no-return-assign
                  return {
                    ...item,
                    performer: {
                      ...item.performer,
                      isFollowed: action === 'create',
                      stats: {
                        ...item.performer.stats,
                        totalFollower:
                            action === 'create'
                              ? (item.performer.stats.totalFollower += 1)
                              : (item.performer.stats.totalFollower -= 1)
                      }
                    }
                  };
                }
                return item;
              })
              : []
        }
      };
    }
  },
  {
    on: resetFeeds,
    reducer() {
      return {
        feeds: {
          ...initialState.feeds
        },
        trendingFeeds: {
          ...initialState.feeds
        },

        hashtagFeeds: {
          ...initialState.feeds
        }
      };
    }
  },
  {
    on: setMetaThumbnail,
    reducer(prevState: any, data: any) {
      return {
        ...prevState,
        metaDataThumbnail: data.payload
      };
    }
  }

];

export default merge({}, createReducers('feed', [feedReducers], initialState));
