import {
  Alert, Layout, message, Select, Spin
} from 'antd';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { getFeeds, moreFeeds } from '@redux/feed/actions';
import { feedService } from '@services/index';
import {
  IFeed, IUser, IUIConfig, IStream
} from 'src/interfaces';
import Router from 'next/router';
import { debounce } from 'lodash';
import './index.less';
import ScrollListPerformer from '@components/post/scroll-list-performer';
import HomePageHeader from '@layouts/home-page-header';
import {
  VideoCameraFilled,
  CameraFilled
} from '@ant-design/icons';
import { capitalizeFirstLetter } from '@lib/string';

interface IProps {
  ui: IUIConfig;
  user: IUser;
  moreFeeds: Function;
  getFeeds: Function;
  feedState: {
    items: IFeed[];
    total: number;
    requesting: boolean;
  };
  removeFeedSuccess: Function;
  query : any;
}

class MostViewPage extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  state = {
    itemPerPage: 12,
    feedPage: 0,
    loading: false,
    isFreeSubscription: '',
    headerHeight: 0,
    currentTab: 'video',
    filter: {
      sortBy: 'currentMonthViews'
    },
    firstPost: {} as any,
    scrollContentHeight: 0 as any

  };

  static async getInitialProps({ ctx }) {
    const { query } = ctx;
    return {
      query
    };
  }

  componentDidMount= async () => {
    const { query } = this.props;
    if (query?.id && query?.tab) {
      await this.setState({ loading: true, currentTab: query.tab });
      const resp = await feedService.findOne(query.id);
      this.setState({ firstPost: resp.data, loading: false });
    }
    window.addEventListener('resize', this.handleResize);
    if (typeof window !== 'undefined') {
      this.setState({
        headerHeight: document.getElementById('main-header')?.clientHeight,
        scrollContentHeight: document.getElementById('scroll-content')?.clientHeight

      });
    }
    this.getFeeds();
  }

  componentDidUpdate(_, prevState) {
    const { currentTab } = this.state;
    if (currentTab !== prevState.currentTab) {
      this.getFeeds();
    }
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
    if (user.isPerformer) return;
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
    await this.setState({ currentTab: val, feedPage: 0, firstPost: {} });
  }

  async onGetFreePerformers() {
    const { isFreeSubscription } = this.state;
    await this.setState({ isFreeSubscription: isFreeSubscription ? '' : true });
  }

  async onDeleteFeed(feed: IFeed) {
    const { removeFeedSuccess: handleRemoveFeed } = this.props;
    if (!window.confirm('All earnings related to this post will be refunded. Are you sure to remove it?')) return;
    try {
      await feedService.delete(feed?._id);
      message.success('Post deleted successfully');
      handleRemoveFeed({ feed });
    } catch (e) {
      message.error('Something went wrong, please try again later');
    }
  }

  async onFilterFeed() {
    await this.setState({ feedPage: 0 });
    this.getFeeds();
  }

  onSearchFeed = debounce(async () => {
    await this.setState({ feedPage: 0 });
    this.getFeeds();
  }, 600);

  onSearch = debounce(async (val) => {
    const {
      filter
    } = this.state;
    this.setState({ filter: { ...filter, sortBy: val }, firstPost: {} }, () => this.getFeeds());
  }, 500);

  async getFeeds() {
    const { getFeeds: handlegetFeeds } = this.props;
    const {
      itemPerPage, feedPage, currentTab, filter, firstPost
    } = this.state;
    handlegetFeeds({
      limit: itemPerPage,
      offset: itemPerPage * feedPage,
      type: currentTab,
      excludeIds: firstPost?._id || '',
      ...filter
    });
  }

  async loadmoreFeeds() {
    const { moreFeeds: handleGetMore, feedState } = this.props;

    const { total: totalFeeds, items: feeds } = feedState;

    const {
      feedPage, itemPerPage, currentTab, firstPost
    } = this.state;
    try {
      if (feedPage * itemPerPage >= totalFeeds) {
        this.resetloadFeeds();
      } else {
        feeds
          && this.setState({ feedPage: feedPage + 1 }, () => {
            handleGetMore({
              limit: itemPerPage,
              offset: feedPage * itemPerPage,
              type: currentTab,
              sortBy: 'mostViewInCurrentDay',
              excludeIds: firstPost?._id || ''
            });
          });
      }
    } catch (e) {
      message.error('Something went wrong, please try again later');
    }
  }

  async resetloadFeeds() {
    const { moreFeeds: handleGetMore, user } = this.props;
    const { itemPerPage, currentTab } = this.state;

    this.setState({ feedPage: 1 }, () => {
      handleGetMore({
        limit: itemPerPage,
        offset: 0,
        isHome: !!user.verifiedEmail,
        type: currentTab,
        sortBy: 'mostViewInCurrentDay'
      });
    });
  }

  render() {
    const { ui, feedState } = this.props;
    const { items: feeds = [], requesting: loadingFeed } = feedState;
    const {
      loading, currentTab, headerHeight, firstPost, scrollContentHeight
    } = this.state;
    return (
      <Layout className="ant-home-layout" style={{ height: '100%' }} id="scroll-content">
        <Head>
          <title>
            Most Viewed
            {' '}
            |
            {' '}
            {ui && capitalizeFirstLetter(ui.siteName)}
          </title>
        </Head>
        <HomePageHeader
          tabs={[
            { key: 'video', tab: <VideoCameraFilled /> },
            { key: 'most-view', tab: 'Most Viewed', disabled: true },
            { key: 'photo', tab: <CameraFilled /> }
          ]}
          handleTabChange={(val) => this.handleTabChange(val)}
          defaultTab={currentTab}
        />
        {!loading && (
        <Select
          placeholder=""
          defaultValue="This Month"
          onChange={(val) => this.onSearch(val)}
          style={{ width: '120px' }}
        >
          <Select.Option value="currentMonthViews" label="This Month" key="thismonth">
            This Month
          </Select.Option>
          <Select.Option value="lastMonthViews" label="Last Month" key="lastmonth">
            Last Month
          </Select.Option>
          <Select.Option value="views" label="All Time" key="alltime">
            All Time
          </Select.Option>
        </Select>
        )}
        <div id="scrollableDiv" style={{ height: scrollContentHeight - (headerHeight || 60) }}>
          {!loading && !loadingFeed && feeds && (
            <ScrollListPerformer
              currentPage={currentTab}
              items={[firstPost, ...feeds]}
              canLoadmore
              loading={loadingFeed && loading}
              loadMore={this.loadmoreFeeds.bind(this)}
            />
          )}
          {loadingFeed && <div className="text-center"><Spin /></div>}
          {!feeds.length && !loading && !loadingFeed && (
            <div className="main-container custom">
              <Alert className="text-center" message="No post was found" type="info" />
            </div>
          )}
        </div>
      </Layout>
    );
  }
}

const mapStates = (state: any) => ({
  ui: { ...state.ui },
  user: { ...state.user.current },
  feedState: { ...state.feed.feeds },
  feedTrendingState: { ...state.feed.trendingFeeds },
  settings: { ...state.settings }
});

const mapDispatch = {
  getFeeds,
  moreFeeds
};
export default connect(mapStates, mapDispatch)(MostViewPage);
