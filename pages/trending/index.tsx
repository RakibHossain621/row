import { Alert, Layout, message } from 'antd';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import {
  getTrendingFeeds, getFeeds, moreFeeds, moreTrendingFeeds, resetFeeds
} from '@redux/feed/actions';
import { feedService } from '@services/index';
import {
  IFeed, IUIConfig, ISettings
} from 'src/interfaces';
import { capitalizeFirstLetter } from 'src/lib/string';
import './index.less';
import ScrollListPerformer from '@components/post/scroll-list-performer';
import HomePageHeader from '@layouts/home-page-header';
import {
  VideoCameraFilled,
  CameraFilled
} from '@ant-design/icons';
import Link from 'next/link';
import { DiscoverTopHeader } from '@components/discover/discover-top-header';
import { TrendingHeaderTabs } from '@components/trending/TrendingHeaderTabs';

interface IProps {
  ui: IUIConfig;
  settings:ISettings;
  getTrendingFeeds: Function;
  moreTrendingFeeds: Function;
  query: any;
  feedTrendingState: any;
  removeFeedSuccess: Function;
  resetFeeds: Function;
  metaDataThumbnail :string;
}

class TrendingPage extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  state = {
    itemPerPage: 12,
    feedPage: 0,
    loading: false,
    keyword: '',
    headerHeight: 0,
    currentTab: 'trending-videos',
    firstPost: null,
    scrollContentHeight: 0 as any
  };

  static async getInitialProps({ ctx }) {
    const { query } = ctx;
    return {
      query
    };
  }

  componentDidMount = async () => {
    const { query } = this.props;
    if (query?.id || query?.tab) {
      query?.tab === 'photo' ? this.setState({ currentTab: 'trending-photos' }) : this.setState({ currentTab: 'trending-videos' });
      if (query.id) {
        try {
          this.setState({ loading: true });
          const resp = await feedService.findOne(query.id);
          this.setState({ firstPost: resp.data, loading: false });
        } catch (error) {
          message.error('Something went wrong');
        }
      }
    }
    window.addEventListener('resize', this.handleResize);
    if (typeof window !== 'undefined') {
      this.setState({
        headerHeight: document.getElementById('tab-header')?.clientHeight,
        scrollContentHeight: document.getElementById('scroll-content')?.clientHeight
      });
    }
    this.getTrendingFeeds();
  };

  componentDidUpdate(_, prevState) {
    const { currentTab } = this.state;
    if (currentTab !== prevState.currentTab) {
      this.getTrendingFeeds();
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

  handleTabChange(val: string) {
   this.setState({ currentTab: val, feedPage: 0, firstPost: null });
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

  async getTrendingFeeds() {
    const { getTrendingFeeds: handlegetTrendingFeeds } = this.props;
    const {
      itemPerPage, feedPage, keyword, currentTab, firstPost
    } = this.state;
    handlegetTrendingFeeds({
      q: keyword,
      limit: itemPerPage,
      offset: itemPerPage * feedPage,
      type: currentTab === 'trending-videos' ? 'video' : 'photo',
      sortBy: 'mostViewInCurrentDay',
      sort: 'desc',
      excludeIds: firstPost?._id || ''
    });
  }

  async loadmoreFeeds() {
    const { feedTrendingState, moreTrendingFeeds: handleMoreTrendingFeed } = this.props;
    const { items: tredingFeeds } = feedTrendingState;
    const { feedPage, itemPerPage, currentTab } = this.state;
    try {
      tredingFeeds && this.setState({ feedPage: feedPage + 1 }, () => {
        handleMoreTrendingFeed({
          limit: itemPerPage,
          offset: feedPage * itemPerPage,
          type: currentTab === 'trending-videos' ? 'video' : 'photo',
          sortBy: 'mostViewInCurrentDay',
          sort: 'desc',
          excludeIds: tredingFeeds.map((item) => item._id).join(',')
        });
      });
    } catch (e) {
      message.error('Something went wrong, please try again later');
    }
  }

  // async resetloadFeeds() {
  //   const { moreTrendingFeeds: handleMoreTrendingFeed } = this.props;
  //   const { itemPerPage, currentTab } = this.state;
  //   this.setState({ feedPage: 1 }, () => {
  //     handleMoreTrendingFeed({
  //       limit: itemPerPage,
  //       offset: 0,
  //       type: currentTab === 'trending-videos' ? 'video' : 'photo',
  //       sortBy: 'mostViewInCurrentDay',
  //       sort: 'desc'
  //     });
  //   });
  // }

  render() {
    const {
      ui, feedTrendingState, settings, metaDataThumbnail
    } = this.props;
    const { items: feedTrending = [], requesting: loadingTrendingFeed } = feedTrendingState;
    const {
      loading, currentTab, headerHeight, firstPost, scrollContentHeight
    } = this.state;

    return (
      <section className='sticky' style={{height: '80dvh'}}>
        <Head>
          <title>
            Trending
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
        <TrendingHeaderTabs 
          activeTab={currentTab}
          updateTab={(val) => this.handleTabChange(val)}
        />
        { (feedTrending.length > 0 || firstPost) && (
          <ScrollListPerformer
            currentPage={currentTab}
            items={[firstPost, ...feedTrending]}
            canLoadmore
            loading={loadingTrendingFeed || loading}
            loadMore={this.loadmoreFeeds.bind(this)}
            scrollHeight={scrollContentHeight - (headerHeight || 0)}
          />
        )}
        {!feedTrending.length && !loading && !loadingTrendingFeed && !firstPost && (
          <div className="main-container custom">
            <Alert className="text-center" message="No post was found" type="info" />
          </div>
        )}
      </section>
    );
  }
}

const mapStates = (state: any) => ({
  settings: { ...state.settings },
  ui: { ...state.ui },
  user: { ...state.user.current },
  feedState: { ...state.feed.feeds },
  feedTrendingState: { ...state.feed.trendingFeeds },
  metaDataThumbnail: state.feed.metaDataThumbnail,
  loggedIn: state.auth.loggedIn
});

const mapDispatch = {
  getTrendingFeeds,
  getFeeds,
  moreFeeds,
  moreTrendingFeeds,
  resetFeeds
};
export default connect(mapStates, mapDispatch)(TrendingPage);
