/* eslint-disable jsx-a11y/control-has-associated-label */
import { Alert, Layout, message } from 'antd';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { getFollowingFeeds, moreFollowingFeeds } from '@redux/feed/actions';
import { feedService } from '@services/index';
import {
  IFeed, IUser, IUIConfig, IStream, ISettings
} from 'src/interfaces';
import Router from 'next/router';
import { debounce } from 'lodash';
import './index.less';
import HomePageHeader from '@layouts/home-page-header';
import ScrollListPerformer from '@components/post/scroll-list-performer';
import { capitalizeFirstLetter } from 'src/lib/string';

import {
  VideoCameraFilled,
  CameraFilled
} from '@ant-design/icons';
import Link from 'next/link';
import { FollowingTrendingHeaderTabs } from '@components/following/FollowingTrendingHeaderTabs';

interface IProps {
  ui: IUIConfig;
  settings:ISettings;
  user: IUser;
  getFollowingFeeds: Function;
  moreFollowingFeeds: Function;
  followingfeedState: any;
  removeFeedSuccess: Function;
  query: { [key: string]: any };
  metaDataThumbnail : string

}

class FollowingPostPage extends PureComponent<IProps> {
  static authenticate = true;

  state = {
    itemPerPage: 12,
    feedPage: 0,
    isFreeSubscription: '',
    orientation: '',
    headerHeight: 0,
    keyword: '',
    currentTab: 'following-videos',
    scrollContentHeight: 0 as any

  };

  static async getInitialProps({ ctx }) {
    const { query } = ctx;
    return {
      query
    };
  }

  componentDidMount() {
    const { user, query } = this.props;
    if (!user?._id) {
      message.error('Please log in or register!', 5);
      Router.push('/trending');
    } else {
      if (query?.tab) {
        query.tab === 'video' ? this.setState({ currentTab: 'following-videos' }) : this.setState({ currentTab: 'following-photos' });
      }
      window.addEventListener('resize', this.handleResize);

      if (typeof window !== 'undefined') {
        this.setState({
          headerHeight: document.getElementById('tab-header')?.clientHeight,
          scrollContentHeight: document.getElementById('scroll-content')?.clientHeight
        });
      }
      this.getFeeds();
    }
  }

  componentDidUpdate(_, prevState) {
    const { currentTab } = this.state;
    if (currentTab !== prevState.currentTab) {
      this.getFeeds();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = async () => {
    if (typeof window !== 'undefined') {
      this.setState({
        headerHeight: document.getElementById('tab-header')?.clientHeight,
        scrollContentHeight: document.getElementById('scroll-content')?.clientHeight
      });
    }
  };

  handleClick = (stream: IStream) => {
    const { user } = this.props;
    if (!user._id) {
      message.error('Please log in or register!', 5);
      Router.push('/');
      return;
    }
    if (!stream?.isSubscribed) {
      message.error('Please subscribe to join live chat!', 5);
      Router.push(
        {
          pathname: '/model/profile',
          query: {
            username: stream?.performerInfo?.username || stream?.performerInfo?._id
          }
        },
        `/streaming/${stream?.performerInfo?.username || stream?.performerInfo?._id}`
      );
      return;
    }
    Router.push(
      {
        pathname: '/streaming/details',
        query: {
          username: stream?.performerInfo?.username || stream?.performerInfo?._id
        }
      },
      `/streaming/${stream?.performerInfo?.username || stream?.performerInfo?._id}`
    );
  };

  async handleTabChange(val) {
    await this.setState({ currentTab: val, feedPage: 0 });
  }

  async onGetFreePerformers() {
    const { isFreeSubscription } = this.state;
    await this.setState({ isFreeSubscription: isFreeSubscription ? '' : true });
  }

  async onDeleteFeed(feed: IFeed) {
    const { removeFeedSuccess: handleRemoveFeed } = this.props;
    if (!window.confirm('All earnings related to this post will be refunded. Are you sure to remove it?')) return;
    try {
      await feedService.delete(feed._id);
      message.success('Post deleted successfully');
      handleRemoveFeed({ feed });
    } catch (e) {
      message.error('Something went wrong, please try again later');
    }
  }

  async onFilterFeed(value: string) {
    await this.setState({ orientation: value, feedPage: 0 });
    this.getFeeds();
  }

  onSearchFeed = debounce(async (e) => {
    await this.setState({ keyword: e, feedPage: 0 });
    this.getFeeds();
  }, 600);

  async getFeeds() {
    const { getFollowingFeeds: handleGetFollowingFeeds, user } = this.props;
    const {
      itemPerPage, feedPage, keyword, orientation, currentTab
    } = this.state;
    try {
      handleGetFollowingFeeds({
        q: keyword,
        orientation,
        limit: itemPerPage,
        offset: itemPerPage * feedPage,
        isHome: !!user.verifiedEmail,
        type: currentTab === 'following-videos' ? 'video' : 'photo',
        sortBy: 'mostViewInCurrentDay'
      });
    } catch (e) {
      message.error('Something went wrong, please try again later');
    }
  }

  async loadmoreFeeds() {
    const { moreFollowingFeeds: handleGetMore, user } = this.props;
    const { feedPage, itemPerPage, currentTab } = this.state;
    try {
      this.setState({ feedPage: feedPage + 1 }, () => {
        handleGetMore({
          limit: itemPerPage,
          offset: (feedPage + 1) * itemPerPage,
          isHome: !!user.verifiedEmail,
          type: currentTab === 'following-videos' ? 'video' : 'photo',
          sortBy: 'mostViewInCurrentDay'
        });
      });
    } catch (e) {
      message.error('Something went wrong, please try again later');
    }
  }

  // async resetloadFeeds() {
  //   const { moreFollowingFeeds: handleGetMore, user } = this.props;
  //   const { feedPage, itemPerPage, currentTab } = this.state;

  //   this.setState({ feedPage: feedPage + 1 }, () => {
  //     handleGetMore({
  //       limit: itemPerPage,
  //       offset: (feedPage + 1) * itemPerPage,
  //       isHome: !!user.verifiedEmail,
  //       type: currentTab === 'following-videos' ? 'video' : 'photo',
  //       sortBy: 'mostViewInCurrentDay'
  //     });
  //   });
  // }

  render() {
    const {
      ui, followingfeedState, settings, metaDataThumbnail
    } = this.props;
    const { items: feeds = [], requesting: loadingFeed } = followingfeedState;
    const {
      currentTab, headerHeight, scrollContentHeight
    } = this.state;
    return (
      <>
        <Head>
          <title>
            {currentTab === 'following-videos' ? 'Following Videos' : 'Following Photos'}
            {' '}
            |
            {' '}
            {ui && capitalizeFirstLetter(ui.siteName)}
          </title>
          <meta name="keywords" content={settings && settings.metaKeywords} />
          <meta name="description" content={settings && settings.metaDescription} />
          {/* OG tags */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={ui && ui.siteName} />
          <meta property="og:image" content={metaDataThumbnail} />
          <meta property="og:description" content={settings && settings.metaDescription} />
          {/* Twitter tags */}
          <meta property="twitter:card" content="summary" />
          <meta property="twitter:title" content={ui && ui.siteName} />
          <meta property="twitter:image" content={metaDataThumbnail} />
          <meta property="twitter:description" content={settings && settings.metaDescription} />
        </Head>
        <FollowingTrendingHeaderTabs 
          activeTab={currentTab}
          updateTab={(val) => this.handleTabChange(val)}
        />
        <div id="scrollableDiv" style={{ height: scrollContentHeight - (headerHeight || 60) }}>
          {feeds.length > 0 && (
            <ScrollListPerformer
              currentPage={currentTab}
              items={feeds}
              canLoadmore
              loading={loadingFeed}
              loadMore={this.loadmoreFeeds.bind(this)}
              scrollHeight={scrollContentHeight - (headerHeight || 0)}
            />
          )}
          {!feeds.length && !loadingFeed && (
            <div className="main-container custom">
              <Alert
                className="text-center"
                message={(
                  <span>
                    <a href="/model">Click Here</a>
                    {' '}
                    to view the most popular Casters you may want to follow.
                  </span>
                )}
                type="info"
              />
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStates = (state: any) => ({
  ui: { ...state.ui },
  user: { ...state.user.current },
  followingfeedState: { ...state.feed.followingFeeds },
  metaDataThumbnail: state.feed.metaDataThumbnail,
  settings: { ...state.settings }
});

const mapDispatch = {
  getFollowingFeeds,
  moreFollowingFeeds
};
export default connect(mapStates, mapDispatch)(FollowingPostPage);
