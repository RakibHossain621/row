/* eslint-disable no-param-reassign */
import {
  Layout,
  message
} from 'antd';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  getFeeds, resetFeeds
} from '@redux/feed/actions';
import {
  feedService
} from 'src/services';
import Head from 'next/head';
import {
  IPerformer, IFeed
} from 'src/interfaces';
import Error from 'next/error';
import '@components/performer/performer.less';
import FeedVideo from '@components/performer/feed-video';
import Router from 'next/router';
import Linkify from 'linkifyjs/react';
import * as linkify from 'linkifyjs';
import hashtag from 'linkifyjs/plugins/hashtag';
import {
  updateStatsView
} from '@redux/user/actions';

hashtag(linkify);

interface IProps {
  error: any;
  currentUser: IPerformer;
  query: { [key: string]: any };
  updateStatsView : Function;
}

class Recast extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  state = {
    feedOriginal: {} as IFeed,
    scrollContentHeight: 0 as any
  };

  static async getInitialProps({ ctx }) {
    const { query } = ctx;
    try {
      return {
        query
      };
    } catch (e) {
      const error = await Promise.resolve(e);
      return { error };
    }
  }

  async componentDidMount() {
    const { query } = this.props;
    if (query && query.id) {
      const resp = await feedService.findById(query.id);
      this.setState({ feedOriginal: resp.data });
    }
    window.addEventListener('resize', this.handleResize);
    if (typeof window !== 'undefined') {
      this.setState({
        scrollContentHeight: document.getElementById('primaryLayout')?.clientHeight
      });
    }
  }

  handleResize = async () => {
    if (typeof window !== 'undefined') {
      this.setState({
        scrollContentHeight: document.getElementById('primaryLayout')?.clientHeight
      });
    }
  };

  async deleteVideo(feed: IFeed) {
    const { currentUser, updateStatsView: handleUpdateStatsView } = this.props;

    if (currentUser._id !== feed.fromSourceId) {
      message.error('Permission denied');
      return;
    }
    if (!window.confirm('Are you sure to delete this post?')) return;
    try {
      await feedService.delete(feed._id);
      handleUpdateStatsView({ views: -feed.stats.views });
      message.success('Deleted the post successfully');
      Router.push(
        { pathname: '/model/profile', query: { username: currentUser.username || currentUser._id, tab: feed?.type } },
        `/${currentUser.username || currentUser._id}`
      );
    } catch {
      message.error('Something went wrong, please try again later');
    }
  }

  render() {
    const {
      error
    } = this.props;
    if (error) {
      return (
        <Error
          statusCode={error?.statusCode || 404}
          title={error?.message || "Sorry, we can't find this page"}
        />
      );
    }
    const {
      feedOriginal,
      scrollContentHeight
    } = this.state;
    const linkifyOptions = {
      formatHref(href, category) {
        if (category === 'hashtag') {
          href = `/search?hashtag=${href.substring(1)}&tab=${feedOriginal.type}&id=${feedOriginal._id}`;
        }
        return href;
      }
    };

    return (
      <Layout>
        <Head>
          <title>
            {feedOriginal?.text && `${feedOriginal.text}-${feedOriginal.performer.username}`}
            {' '}
            | Caster
          </title>
        </Head>
        <div className="main-container">
          <div style={{ height: scrollContentHeight - 100 }}>
            {feedOriginal?._id && <FeedVideo onDelete={this.deleteVideo.bind(this)} feed={feedOriginal} currentPage="recast" key={`${feedOriginal?._id}`} />}
          </div>
          <div className="main-container">
            {feedOriginal?.text && (
              <div className="recast-hashtag">
                <Linkify options={linkifyOptions}>{`${feedOriginal.text} `}</Linkify>
              </div>
            )}
            {/* <Divider className="divider" />
            {feedOriginal?._id && (
              <div className="recast-title">
                <h2 style={{ fontSize: '35px' }}>Recast Me</h2>
                <Button href="/recast/create" className="primary add-recast" type="default" htmlType="submit">
                  {' '}
                  <PlusOutlined />
                  {' '}
                  Add your own
                </Button>
              </div>
            )}
            <ScrollListFeed
              items={feeds}
              loading={loading}
              canLoadmore
              loadMore={this.loadMoreItem.bind(this)}
              isGrid={isGrid}
              performer={performer}
              tab={tab}
            /> */}
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStates = (state: any) => ({
  ui: { ...state.ui },
  currentUser: { ...state.user.current }
});

const mapDispatch = {
  getFeeds,
  resetFeeds,
  updateStatsView
};
export default connect(mapStates, mapDispatch)(Recast);
