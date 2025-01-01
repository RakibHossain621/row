/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  Layout, message
} from 'antd';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import {
  getRecommendFeeds, moreRecommendFeeds, getTrendingFeeds,
  moreFeeds, resetFeeds
} from '@redux/feed/actions';
import { feedService } from '@services/index';
import {
  IFeed, IUser, IUIConfig, ISettings
} from 'src/interfaces';
import Router from 'next/router';
import { debounce } from 'lodash';
import { capitalizeFirstLetter } from 'src/lib/string';
import './index.less';
import HomePageHeader from '@layouts/home-page-header';
import ScrollListPerformer from '@components/post/scroll-list-performer';
import {
  VideoCameraFilled,
  CameraFilled
} from '@ant-design/icons';
import Link from 'next/link';
import PhotoIcon from "src/icons/PhotoIcon";
import VideoIcon from "src/icons/VideoIcon";

interface IProps {
  ui: IUIConfig;
  user: IUser;
  settings:ISettings
  getRecommendFeeds: Function;
  moreRecommendFeeds: Function;
  resetFeeds: Function;
  moreFeeds: Function;
  feedRecommendState: any;
  feedState: any;
  removeFeedSuccess: Function;
  loggedIn:boolean;
  query : {[key: string]:any};
  metaDataThumbnail :string;
}

class RecomendedPage extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  state = {
    itemPerPage: 12,
    feedPage: 0,
    isFreeSubscription: '',
    orientation: '',
    keyword: '',
    currentTab: 'recommended-videos',
    headerHeight: 0,
    isLoadTrendingFeed: false,
    scrollContentHeight: 0 as any
  };

  static async getInitialProps({ ctx }) {
    const { query } = ctx;
    return {
      query
    };
  }

  componentDidMount() {
    const { loggedIn, user, query } = this.props;
    if (query?.tab) {
      query.tab === 'video' ? this.setState({ currentTab: 'recommended-videos' }) : this.setState({ currentTab: 'recommended-photos' });
    }
    window.addEventListener('resize', this.handleResize);
    if (typeof window !== 'undefined') {
      this.setState({
        headerHeight: document.getElementById('tab-header')?.clientHeight,
        scrollContentHeight: document.getElementById('scroll-content')?.clientHeight
      });
    }
    this.getFeeds();
    if (loggedIn && !user.name) {
      message.success(
        'Adding your Display Name on Caster is a great way to help everyone recognize you',
        10
      );
      Router.push('/model/account');
    }
  }

  componentDidUpdate(_, prevState, prevProps) {
    const { feedRecommendState, feedState } = this.props;
    const { items: feeds = [], success } = feedRecommendState;
    const { total: totalFeeds } = feedState;
    const { feedPage, itemPerPage } = this.state;
    if ((!prevProps?.feedRecommendState?.success) && success && !feeds.length) {
      if (totalFeeds >= (feedPage) * itemPerPage) {
        this.loadmoreTrendingFeeds();
      }
    }
  }

  componentWillUnmount() {
    const { resetFeeds: handleResetFeeds } = this.props;
    handleResetFeeds();
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

  async handleTabChange(val) {
    await this.getFeeds();
    this.setState({ currentTab: val, feedPage: 0 });
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
    const { getRecommendFeeds: handleGetRecommendFeeds } = this.props;
    const {
      itemPerPage, keyword, orientation, currentTab
    } = this.state;
    handleGetRecommendFeeds({
      list: 3,
      q: keyword,
      orientation,
      limit: itemPerPage,
      offset: 0,
      type: currentTab === 'recommended-videos' ? 'video' : 'photo'
    });
  }

  async loadmoreFeeds() {
    const {
      feedState, feedRecommendState, moreRecommendFeeds: handleGetRecommendMore
    } = this.props;
    const { total: totalFeeds } = feedState;
    const { total: totalRecommendFeeds } = feedRecommendState;

    const {
      feedPage, itemPerPage, currentTab
    } = this.state;

    ((feedPage + 1) * itemPerPage >= totalFeeds) && await this.setState({ isLoadTrendingFeed: true, feedPage: 0 });
    const {
      isLoadTrendingFeed
    } = this.state;

    if (isLoadTrendingFeed) {
      this.loadmoreTrendingFeeds();
    } else if (totalRecommendFeeds >= (feedPage + 1) * itemPerPage) {
      this.setState({ feedPage: feedPage + 1 }, () => {
        handleGetRecommendMore({
          list: 3,
          limit: itemPerPage,
          offset: (feedPage + 1) * itemPerPage,
          type: currentTab === 'recommended-videos' ? 'video' : 'photo'
        });
      });
    }
  }

  async loadmoreTrendingFeeds() {
    const {
      feedRecommendState, moreFeeds: handleGetMore, feedState
    } = this.props;

    const { items: recommendFeeds } = feedRecommendState;
    const { total: totalFeeds } = feedState;
    const { feedPage, itemPerPage, currentTab } = this.state;
    if (totalFeeds >= (feedPage) * itemPerPage) {
      handleGetMore({
        limit: itemPerPage,
        offset: feedPage * itemPerPage,
        type: currentTab === 'recommended-videos' ? 'video' : 'photo',
        sortBy: 'mostViewInCurrentDay',
        excludeIds: recommendFeeds?.length ? recommendFeeds.map((item) => item._id).join(',') : []
      });
    }
    this.setState({ feedPage: feedPage + 1 });
  }

  render() {
    const {
      ui, feedState, settings, metaDataThumbnail
    } = this.props;
    const { items: feeds, requesting: loadingFeed } = feedState;
    const {
      currentTab, headerHeight, scrollContentHeight
    } = this.state;
    return (
      <Layout className="ant-home-layout" style={{ height: '100%', backgroundColor: 'transparent' }} id="scroll-content">
        <Head>
          <title>
            Recommended
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
        <HomePageHeader
          tabs={[
            { label:"Video", icon: <VideoIcon color={currentTab === 'recommended-videos' ? '#212121' : '#ADADAD'} />, key: 'recommended-videos', tab: <Link href={{ pathname: '/home', query: { tab: 'video' } }}><a href="/home?tab=video"><VideoCameraFilled className={currentTab === 'recommended-videos' ? 'anticon-tab active' : 'anticon-tab'} /></a></Link> },
            { label:"Photo", icon: <PhotoIcon color={currentTab === 'recommended-photos' ? '#212121' : '#ADADAD'} />, key: 'recommended-photos', tab: <Link href={{ pathname: '/home', query: { tab: 'photo' } }}><a href="/home?tab=photo"><CameraFilled className={currentTab === 'recommended-photos' ? 'anticon-tab active' : 'anticon-tab'} /></a></Link> }
          ]}
          handleTabChange={(val) => this.handleTabChange(val)}
          defaultTab={currentTab}
        />
        <div className='mt-4' id="scrollableDiv" style={{ height: scrollContentHeight - (headerHeight || 60) }}>
          {feeds?.length > 0 && (
          <ScrollListPerformer
            currentPage={currentTab}
            items={feeds}
            canLoadmore
            loading={loadingFeed}
            loadMore={this.loadmoreFeeds.bind(this)}
            scrollHeight={scrollContentHeight - (headerHeight || 0)}
          />
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
  feedRecommendState: { ...state.feed.recommendFeeds },
  metaDataThumbnail: state.feed.metaDataThumbnail,
  settings: { ...state.settings },
  loggedIn: state.auth.loggedIn
});
const mapDispatch = {
  getRecommendFeeds,
  moreRecommendFeeds,
  getTrendingFeeds,
  moreFeeds,
  resetFeeds
};
export default connect(mapStates, mapDispatch)(RecomendedPage);
