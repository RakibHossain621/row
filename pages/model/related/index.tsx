/* eslint-disable react/jsx-indent */
import {
  Layout, message
} from 'antd';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  moreFeeds, removeFeedSuccess, getRelatedFeedsSuccess
} from '@redux/feed/actions';
import {
  performerService,
  feedService,
  reactionService
} from 'src/services';
import Head from 'next/head';
import {
  IPerformer, IUser, IUIConfig, IFeed, ISettings
} from 'src/interfaces';
import Router from 'next/router';
import ScrollListPerformer from '@components/post/scroll-list-performer';
import HomePageHeader from '@layouts/home-page-header';
import './index.less';
import {
  VideoCameraFilled,
  CameraFilled
} from '@ant-design/icons';
import Link from 'next/link';
import PhotoIcon from "src/icons/PhotoIcon";
import VideoIcon from "src/icons/VideoIcon";

interface IProps {
  ui: IUIConfig;
  currentUser: IUser;
  performer: IPerformer;
  feedState: any;
  moreFeeds: Function;
  getRelatedFeedsSuccess: Function;
  removeFeedSuccess: Function;
  query: { [key: string]: any };
  tabQuery: string;
  postId : string;
  metaDataThumbnail :string;
  settings:ISettings

}

const initialFilter = {
  q: '',
  fromDate: '',
  toDate: ''
};

class RelatedPost extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  subscriptionType = 'monthly';

  state = {
    itemPerPage: 12,
    videoPage: 0,
    feedPage: 0,
    isBookMarked: false,
    requesting: false,
    headerHeight: 0,
    filter: initialFilter,
    loading: false,
    currentTab: 'related-videos',
    scrollContentHeight: 0 as any,
    firstPost: {} as any

  };

  static async getInitialProps({ ctx }) {
    const { query } = ctx;
    try {
      const [performer] = await Promise.all([
        performerService.findOne(query?.username, {
          Authorization: ctx.token || ''
        })
      ]);
      return {
        performer: performer?.data,
        query,
        postId: query?.postId,
        tabQuery: query?.tab
      };
    } catch (e) {
      const error = await Promise.resolve(e);
      return { error };
    }
  }

  async componentDidMount() {
    const {
      performer, query, postId, tabQuery,
      getRelatedFeedsSuccess: handleRelatedFeedsSuccess
    } = this.props;
    const { currentTab } = this.state;
    window.addEventListener('resize', this.handleResize);

    if (typeof window !== 'undefined') {
      this.setState({
        headerHeight: document.getElementById('tab-header')?.clientHeight,
        scrollContentHeight: document.getElementById('scroll-content')?.clientHeight

      });
    }
    if (performer?._id) {
      this.setState({ isBookMarked: performer.isBookMarked });
    }
    if (query && query.tab) {
      try {
        await this.setState({ currentTab: query.tab });
        const resp = await feedService.findOne(postId);
        if (resp.data) {
          await this.setState({ firstPost: resp.data });
          if (tabQuery === currentTab) {
            handleRelatedFeedsSuccess(resp.data);
          }
        }
        this.loadItems();
      } catch (error) {
        message.error('Post not found');
        Router.push('/home');
      }
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

  async handleDeleteFeed(feed: IFeed) {
    const { currentUser, removeFeedSuccess: handleRemoveFeed } = this.props;
    if (currentUser?._id !== feed.fromSourceId) {
      message.error('Permission denied');
      return;
    }
    if (!window.confirm('All earnings are related to this post will be refunded. Are you sure to remove?')) {
      return;
    }
    try {
      await feedService.delete(feed?._id);
      handleRemoveFeed({ feed });

      message.success('Deleted post success');
      Router.push(
        {
          pathname: '/model/profile',
          query: {
            username: feed?.performer?.username || feed?.performer?._id,
            tab: feed?.type
          }
        },
        `/model/profile/${feed?.performer?.username || feed?.performer?._id}`
      );
    } catch {
      message.error('Something went wrong, please try again later');
    }
  }

  async handleBookmark() {
    const { performer, currentUser } = this.props;
    const { isBookMarked, requesting } = this.state;
    if (requesting || currentUser.isPerformer) return;
    try {
      await this.setState({ requesting: true });
      if (!isBookMarked) {
        await reactionService.create({
          objectId: performer?._id,
          action: 'book_mark',
          objectType: 'performer'
        });
        this.setState({ isBookMarked: true, requesting: false });
      } else {
        await reactionService.delete({
          objectId: performer?._id,
          action: 'book_mark',
          objectType: 'performer'
        });
        this.setState({ isBookMarked: false, requesting: false });
      }
    } catch (e) {
      const error = await e;
      message.error(error.message || 'Error occured, please try again later');
      this.setState({ requesting: false });
    }
  }

  async handleFilterSearch(values) {
    const { filter } = this.state;
    await this.setState({ filter: { ...filter, ...values } });
    this.loadItems();
  }

  handleJoinStream = () => {
    const { currentUser, performer } = this.props;
    if (!currentUser?._id) {
      message.error('Please log in or register!');
      return;
    }
    // if (currentUser.isPerformer) return;
    if (!performer?.isSubscribed) {
      message.error('Please subscribe to this model!');
      return;
    }
    Router.push(
      {
        pathname: '/streaming/details',
        query: {
          performer: JSON.stringify(performer),
          username: performer?.username || performer?._id
        }
      },
      `/stream/${performer?.username || performer?._id}`
    );
  };

  handleJoinChat = () => {
    const { currentUser, performer } = this.props;
    if (!currentUser?._id) {
      message.error('Please log in or register!');
      return;
    }
    Router.push(
      {
        pathname: '/private-waiting-room',
        query: {
          performer: JSON.stringify(performer),
          username: performer?.username || performer?._id
        }
      },
      `/private-waiting-room/${performer?.username || performer?._id}`
    );
  };

  async handleTabChange(val) {
    await this.setState({ currentTab: val, feedPage: 0 });
    this.loadItems();
  }

  async loadItems() {
    const {
      performer,
      moreFeeds: getMoreFeed
    } = this.props;

    const {
      itemPerPage, filter, currentTab, firstPost
    } = this.state;
    const query = {
      limit: itemPerPage,
      offset: 0,
      performerId: performer?._id,
      q: filter.q || '',
      fromDate: filter.fromDate || '',
      toDate: filter.toDate || ''
    };

    switch (currentTab) {
      case 'related-photos':
        this.setState({ feedPage: 0 }, () => getMoreFeed({
          ...query,
          type: 'photo',
          excludeIds: firstPost?._id || ''
        }));
        break;

      case 'related-videos':
        this.setState({ videoPage: 0 }, () => getMoreFeed({
          ...query,
          type: 'video',
          excludeIds: firstPost?._id || ''
        }));
        break;
      default:
        break;
    }
  }

  async loadMoreItem() {
    const {
      feedPage, videoPage, itemPerPage, filter, currentTab
    } = this.state;

    const {
      feedState,
      moreFeeds: getMoreFeed,
      performer
    } = this.props;
    const { items: feeds = [] } = feedState;

    const query = {
      limit: itemPerPage,
      performerId: performer?._id,
      q: filter.q || '',
      fromDate: filter.fromDate || '',
      toDate: filter.toDate || ''
    };

    switch (currentTab) {
      case 'related-videos':
        this.setState(
          {
            videoPage: videoPage + 1
          },
          () => getMoreFeed({
            ...query,
            type: 'video',
            offset: (videoPage + 1) * itemPerPage,
            excludeIds: feeds[0]?._id || ''
          })
        );
        break;
      case 'related-photos':
        this.setState(
          {
            feedPage: feedPage + 1
          },
          () => getMoreFeed({
            ...query,
            type: 'photo',
            offset: (feedPage + 1) * itemPerPage,
            excludeIds: feeds[0]?._id || ''
          })
        );
        break;
      default:
        break;
    }
  }

  render() {
    const {
      ui, feedState, performer, metaDataThumbnail, settings, postId
    } = this.props;

    const { items: feeds = [], requesting: loadingFeed } = feedState;
    const {
      loading, currentTab, headerHeight,
      scrollContentHeight
    } = this.state;
    return (
      <Layout className="ant-home-layout" style={{ height: '100%' }} id="scroll-content">
        <Head>
          <title>
            {ui && ui.siteName}
            {' '}
            | Library
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
              className='related_home_header'
              tabs={[
                {
                  key: 'related-videos',
                  label:"Videos",
                  icon: <VideoIcon color={currentTab === 'related-videos' ? '#212121' : '#ADADAD'} />,
                  tab: <Link href={{ pathname: '/model/related', query: { username: performer?.username || performer?._id, tab: 'related-videos', postId } }}>
                    <a href={`/model/related?tab=related-videos&username=${performer?.username || performer?._id}&postId=${postId}`}>
                      <VideoCameraFilled className={currentTab === 'related-videos' ? 'anticon-tab active' : 'anticon-tab'} />
                    </a>
                       </Link>
                },
                {
                  key: 'related',
                  label:"Related",
                  icon: <img className="img-tab" src={performer?.avatar || '/static/no-avatar.png'} alt="avatar" />,
                  tab: <Link href={{
                    pathname: '/model/profile',
                    query: { username: performer?.username || performer?._id }
                  }}
                  >
                    <a aria-hidden href="/model/profile">
                    <img className="img-tab" src={performer?.avatar || '/static/no-avatar.png'} alt="avatar" />
                    </a>
                       </Link>
                },
                {
                  key: 'related-photos',
                  label:"Photos",
                  icon: <PhotoIcon color={currentTab === 'related-photos' ? '#212121' : '#ADADAD'} />,
                  tab: <Link href={{ pathname: '/model/related', query: { username: performer?.username || performer?._id, tab: 'related-photos', postId } }}>
                    <a href={`/model/related?tab=related-photos&username=${performer?.username || performer?._id}&postId=${postId}`}>
                      <CameraFilled className={currentTab === 'related-photos' ? 'anticon-tab active' : 'anticon-tab'} />
                    </a>
                       </Link>
                }
              ]}
              handleTabChange={(val) => this.handleTabChange(val)}
              defaultTab={currentTab}
            />
        <div id="scrollableDiv" style={{ height: scrollContentHeight - (headerHeight || 60) }}>
            {!loading && (
            <ScrollListPerformer
              currentPage={currentTab}
              items={[...feeds]}
              canLoadmore
              loading={loadingFeed}
              loadMore={this.loadMoreItem.bind(this)}
            />
            )}
        </div>
      </Layout>
    );
  }
}

const mapStates = (state: any) => ({
  ui: { ...state.ui },
  feedState: { ...state.feed.feeds },
  currentUser: { ...state.user.current },
  ...state.streaming,
  settings: { ...state.settings },
  metaDataThumbnail: state.feed.metaDataThumbnail
});

const mapDispatch = {
  moreFeeds,
  removeFeedSuccess,
  getRelatedFeedsSuccess,
};
export default connect(mapStates, mapDispatch)(RelatedPost);
