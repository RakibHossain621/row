/* eslint-disable react/destructuring-assignment */
import { Layout } from 'antd';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { getFeeds, moreFeeds, resetFeeds } from '@redux/feed/actions';
import { IUser } from 'src/interfaces';
import ScrollListPerformer from '@components/post/scroll-list-performer';
import './index.less';
import { feedService } from '@services/feed.service';
import Link from 'next/link';

interface IProps {
  user: IUser;
  getFeeds: Function;
  moreFeeds: Function;
  resetFeeds:Function;
  feedState: any;
  query: { [key: string]: any };
}

class SearchPage extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  state = {
    itemPerPage: 12,
    feedPage: 0,
    loading: false,
    orientation: '',
    keyword: '',
    currentTab: 'video',
    firstPost: {} as any,
    scrollContentHeight: 0 as any,
    headerHeight: 0
  };

  static async getInitialProps({ ctx }) {
    const { query } = ctx;
    return {
      query
    };
  }

  componentDidMount =async () => {
    const { query } = this.props;
    if (query?.hashtag) {
      await this.setState({ keyword: query.hashtag });
    }
    if (query?.id && query?.tab) {
      await this.setState({ loading: true, currentTab: query.tab });
      const resp = await feedService.findOne(query.id);
      this.setState({ firstPost: resp.data, loading: false });
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

  componentDidUpdate(_, prevState) {
    const { currentTab } = this.state;
    if (currentTab !== prevState.currentTab) {
      this.getFeeds();
    }
  }

  async componentWillUnmount() {
    const { resetFeeds: handleResetFeed } = this.props;
    handleResetFeed();
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
    await this.setState({ currentTab: val, firstPost: {} });
  }

  async getFeeds() {
    const { getFeeds: handleGetFeeds, user } = this.props;

    const {
      itemPerPage, feedPage, keyword, orientation, currentTab, firstPost
    } = this.state;

    handleGetFeeds({
      q: keyword,
      orientation,
      limit: itemPerPage,
      offset: itemPerPage * feedPage,
      isHome: !!user.verifiedEmail,
      type: currentTab,
      sortBy: 'mostViewInCurrentDay',
      sort: 'desc',
      excludeIds: firstPost?._id || ''
    });
  }

  async loadmoreFeeds() {
    const { feedState, moreFeeds: handleGetMore, user } = this.props;
    const { items: posts, total: totalFeeds } = feedState;
    const {
      feedPage, itemPerPage, currentTab, keyword, firstPost
    } = this.state;
    if (posts?.length >= totalFeeds) return;
    this.setState({ feedPage: feedPage + 1 }, () => {
      handleGetMore({
        q: keyword,
        limit: itemPerPage,
        offset: (feedPage + 1) * itemPerPage,
        isHome: !!user.verifiedEmail,
        type: currentTab,
        sortBy: 'mostViewInCurrentDay',
        sort: 'desc',
        excludeIds: firstPost?._id || ''
      });
    });
  }

  render() {
    const { feedState } = this.props;
    const { items: feeds, total: totalFeeds, requesting: loadingFeed } = feedState;
    const {
      loading, currentTab, firstPost, keyword, scrollContentHeight, headerHeight
    } = this.state;
    return (
      <Layout className="ant-home-layout" style={{ height: '100%' }} id="scroll-content">
        <Head>
          <title>
            {`#${keyword}`}
            {' '}
            | Caster
          </title>
        </Head>
        <Link href={{
          pathname: '/hashtag',
          query: {
            keyword,
            type: currentTab
          }
        }}
        >
          <a id="tab-header" href={`/hashtag?keyword=${keyword}&type=${currentTab}`}>
            <h2 className="text-center">{`#${keyword}`}</h2>
          </a>
        </Link>
        <div id="scrollableDiv" style={{ height: scrollContentHeight - (headerHeight || 60) }}>
          {!loading && feeds && (
            <ScrollListPerformer
              currentPage={currentTab}
              items={[firstPost, ...feeds]}
              canLoadmore={feeds && feeds?.length < totalFeeds}
              loading={loadingFeed}
              loadMore={this.loadmoreFeeds.bind(this)}
              scrollHeight={scrollContentHeight - (headerHeight || 60)}
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
  feedState: { ...state.feed.feeds }
});

const mapDispatch = {
  getFeeds,
  moreFeeds,
  resetFeeds
};
export default connect(mapStates, mapDispatch)(SearchPage);
