/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  message, Spin, Divider, Row, Col
} from 'antd';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IUIConfig, IUser } from 'src/interfaces';
import { getResponseError } from '@lib/utils';
import {
  getTrendingFeeds,
  getFeeds,
  moreFeeds,
  moreTrendingFeeds,
  resetFeeds
} from '@redux/feed/actions';
import './index.less';
import Link from 'next/link';
import { feedService } from '@services/feed.service';
import * as linkify from 'linkifyjs';
import hashtag from 'linkifyjs/plugins/hashtag';
import { capitalizeFirstLetter, checkHeadTitle } from '@lib/index';
import { VideoCameraFilled, CameraFilled } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { SearchOutlined } from '@ant-design/icons';

import DiscoverCarousel from '@components/discover/discover-carousel';
import { DiscoverTopHeader } from '@components/discover/discover-top-header';
import { DiscoverHashtagFilter } from '@components/discover/discover-hashtag-filter';

hashtag(linkify);

interface IProps {
  ui: IUIConfig;
  getTrendingFeeds: Function;
  getFeeds: Function;
  moreTrendingFeeds: Function;
  resetFeeds: Function;
  feedTrendingState: any;
  user: IUser;
}

function getWindowDimensions() {
  if (typeof window !== 'undefined') {
    const { body } = document;
    return body.offsetHeight;
  }
  return 0;
}

const DiscoverPage = ({
  ui,
  getTrendingFeeds: handleGetTrendingFeeds,
  getFeeds: handleGetFeed,
  feedTrendingState,
  moreTrendingFeeds: handleMoreTrendingFeed,
  resetFeeds: handleResetFeeds,
  user
}: IProps) => {
  const [tab, setTab] = useState('video');
  const [loading, setLoading] = useState(false);
  const limit = 10;
  const hashtagLimit = 5;
  const [offset, setOffset] = useState(0);
  const [trendingPage, setTrendingPage] = useState(0);
  const [totalSlideTrending, setTotalSlideTrending] = useState(5);
  const [trendingViewIndex, setTrendingViewIndex] = useState(0);
  const [hashTagIndex, setHashTagIndex] = useState({} as any);
  const [hashTagTrendingPost, setHashTagTrendingPost] = useState([] as any);
  const [orientation] = useState('');
  const [keyword] = useState('');
  const [feedFilter] = useState({
    sortBy: 'currentMonthViews'
  });
  const [bodyHeight, setBodyHeight] = useState(getWindowDimensions());
  const [headerHeight, setHeaderHeight] = useState(0);
  const [tabHeight, setTabHeight] = useState(0);
  const [hashtags, setHashtags] = useState([]);
  const [options, setOptions] = useState([]);
  const [type, setType] = useState('video');
  const router = useRouter() as any;
  const [q, setQ] = useState('');
  

  const handleResize = async () => {
    const height = await getWindowDimensions();
    setBodyHeight(height);
  };

  const loadFeed = async () => {
    try {
      handleGetFeed({
        limit: limit,
        type: tab,
        ...feedFilter,
        offset: offset * limit
      });
    } catch (error) {
      message.error('Error occured, please try again later');
    }
  };

  const getTrendingData = async () => {
    try {
      handleGetTrendingFeeds({
        q: keyword,
        orientation,
        limit: limit,
        offset: limit * trendingPage,
        type: tab,
        sortBy: 'mostViewInCurrentDay',
        sort: 'desc'
      });
    } catch (error) {
      message.error(getResponseError(await error));
    }
  };

  const getMoreTrendingData = async () => {
    const { items: tredingFeeds } = feedTrendingState;
    try {
      setTrendingPage(trendingPage + 1);
      handleMoreTrendingFeed({
        limit: limit,
        offset: trendingPage * limit,
        type: tab,
        sortBy: 'mostViewInCurrentDay',
        sort: 'desc',
        excludeIds: tredingFeeds.map((item) => item._id).join(',')
      });
    } catch (error) {
      message.error(getResponseError(await error));
    }
  };

  const fetchTrendingHashtags = async () => {
    return await feedService.getTrendingHashtag(tab, {
      limit: hashtagLimit,
      offset: offset * hashtagLimit
    });
  };
  
  const fetchPostsForHashtag = async (hashTag) => {
    return await feedService.userSearch({
      q: hashTag,
      orientation,
      type: tab,
      sortBy: 'mostViewInCurrentDay',
      sort: 'desc'
    });
  };
  
  const processHashtags = async (data) => {
    return await Promise.all(data.map(async (item) => {
      const respPost = await fetchPostsForHashtag(item.hashTag);
      return { hashtag: item.hashTag, data: respPost.data.data };
    }));
  };
  
  const loadHashtag = async () => {
    try {
      setLoading(true);
      const resp = await fetchTrendingHashtags();

      if (resp.data.length) {
        const hashTag = await processHashtags(resp.data);
        await setHashTagTrendingPost(hashTag);
      }

      setOffset((prevOffset) => prevOffset + 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Error occurred, please try again later');
    }
  };
  
  const loadMoreHashtag = async () => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const resp = await fetchTrendingHashtags();
  
      if (resp.data.length) {
        const hashTag = await processHashtags(resp.data);
        await setHashTagTrendingPost((prevHashtag) => prevHashtag.concat(hashTag));
      }
      setOffset((prevOffset) => prevOffset + 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Error occurred, please try again later');
    }
  };
  

  const handleFeedChange = async (index, type) => {
    const { items: feedTrending = [], requesting: loadingTrendingFeed } = feedTrendingState;
    // maybe new type in future , should use switch
    switch (type) {
      case 'Trending': {
        setTrendingViewIndex(index);
        if (
          totalSlideTrending + index >= feedTrending.length
          && !loadingTrendingFeed
        ) {
          getMoreTrendingData();
          setTotalSlideTrending(totalSlideTrending + index);
        }
        break;
      }
      case 'Hashtag':
        setHashTagIndex({ ...hashTagIndex, [type]: index });
        break;
      default:
        break;
    }
  };

  const getHashtagAlphabet = async () => {
    try {
      const resp = await feedService.getHashtagAlphabet({
        q,
        type,
        limit: 5,
        offset: 0
      });
      console.log("getHashtagAlphabet", resp)
      const hashtags = resp.data.map(tag => ({ value: `#${tag.hashTag}` }));
      console.log("hashtags", hashtags)

      setOptions(hashtags);
      setHashtags(resp.data);
    } catch (e) {
      message.error(e);
    }
  }

  useEffect(() => {
    router?.query?.tab && setTab(router?.query?.tab);
    router?.query?.type && setType(router?.query?.type);

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      setHeaderHeight(document.getElementById('main-header')?.clientHeight);
      document.getElementById('tab-header')?.clientHeight
        ? setTabHeight(document.getElementById('tab-header')?.clientHeight)
        : setTabHeight(document.getElementById('ant-tabs-nav')?.clientHeight);
      return () => window.removeEventListener('resize', handleResize);
    }
    return () => {
      handleResetFeeds();
    };
  }, []);

  useEffect(() => {
    if (tab === 'hashtag') {
      getHashtagAlphabet();
    } else {
      const fetchData = async () => {
        setTotalSlideTrending(5);
        setTrendingViewIndex(0);
        setOffset(0);
        setTrendingPage(0);
        loadFeed();
        getTrendingData();
        await loadHashtag();
      };
      fetchData();
    }
  }, [tab, q, type]);

  const onSearch = (value) => {
    const searchValue = value.toLowerCase().replace('#', '');
    setQ(searchValue);
  };

  const { items: feedTrending = [] } = feedTrendingState;
  
  return (
    <>
      <Head>
        <title>
          {checkHeadTitle(tab)}
          {' '}
          |
          {' '}
          {ui && capitalizeFirstLetter(ui.siteName)}
        </title>
      </Head>
      <DiscoverTopHeader 
        updateTab={setTab} 
        activeTab={tab} 
      >
        {tab === 'hashtag' && 
          <DiscoverHashtagFilter 
            activeTab={tab}
            handleChangeType={setType}
            typeForHashtag={type}
          />
        }
      </DiscoverTopHeader>
      {tab !== 'hashtag' ? (
        <div
          style={{ height: bodyHeight - (headerHeight + tabHeight) }}
          className="hashtag-scroll"
        >
            {feedTrending?.length > 0 && (
              <div className="w-full pt-8">
                <h4 className='text-lg font-semibold pb-4'>Trending</h4>
                <DiscoverCarousel
                  tab={tab}
                  feeds={feedTrending}
                  title="Trending"
                  onHandleFeedChange={handleFeedChange}
                  index={trendingViewIndex}
                  onGetFeeds={getTrendingFeeds}
                  onMoreFeeds={getMoreTrendingData}
                  className="tutututututu"
                />
              </div>
            )}
          {hashTagTrendingPost?.length > 0 && hashTagTrendingPost.map((item) => (
            <div className="w-full pt-8">
              <Link
                href={{
                  pathname: '/hashtag',
                  query: {
                    keyword: item?.hashtag,
                    type: tab
                  }
                }}
              >
              <h4 className='text-lg font-semibold pb-4'>{`#${item?.hashtag}`}</h4>
              </Link>
              <DiscoverCarousel
                title={item?.hashtag}
                tab={tab}
                feeds={item.data}
                onHandleFeedChange={handleFeedChange}
                index={trendingViewIndex}
                onGetFeeds={getTrendingFeeds}
                onMoreFeeds={getMoreTrendingData}
                className={tab}
              />
            </div>
          ))}
          {loading && (
            <div className="text-center">
              <Spin />
            </div>
          )}
        </div>
      ) : (
        <section className="">
          {hashtags?.length > 0 && (
            <h4 className='text-lg text-center text-black font-semibold pb-5'>
              0-10
            </h4>
          )}
          <div className="border-b pb-6 grid grid-cols-2 md:grid-cols-5">
            {hashtags?.length > 0 && hashtags.map((h) => (
                <div>
                  <Link
                    href={{
                      pathname: '/hashtag',
                      query: {
                        keyword: h.hashtag,
                        type: type
                      }
                    }}
                  >
                    <span className='text-lg text-black'>
                      {`#${h.hashtag}`}
                      ({h.count})
                    </span>
                  </Link>
                </div>
            ))}
          </div>
          {hashtags?.length > 0 && hashtags.map((h) => (
            <div>
              <div className="border-b py-6">
                <h4 className='text-lg text-center text-black font-semibold pb-5'>
                  #{h.hashtag}
                </h4>
                {h.data.map((item) => (
                  <div className="grid grid-cols-2 md:grid-cols-5">
                    {hashtags.map((l) => {
                      if (l.hashtag === item) {
                        return (
                          <Link
                            href={{
                              pathname: '/hashtag',
                              query: {
                                keyword: item,
                                type: type
                              }
                            }}
                          >
                            <span className='text-lg text-black'>
                              {`#${item}`}
                              ({l.count})
                            </span>
                          </Link>
                        );
                      }
                      return null;
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  );
};

DiscoverPage.authenticate = true;
DiscoverPage.noredirect = true;

const mapStates = (state) => ({
  ui: { ...state.ui },
  user: { ...state.user.current },
  feedState: { ...state.feed.feeds },
  feedTrendingState: { ...state.feed.trendingFeeds },
  settings: { ...state.settings }
});

const mapDispatch = {
  moreTrendingFeeds,
  getTrendingFeeds,
  getFeeds,
  moreFeeds,
  resetFeeds
};
export default connect(mapStates, mapDispatch)(DiscoverPage);
