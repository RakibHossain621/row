/* eslint-disable react/jsx-indent */
import { PureComponent } from 'react';
import {
  Col, Layout, message, Input, Checkbox
} from 'antd';
import { connect } from 'react-redux';
import PerformerGridCard from '@components/performer/grid-card';
import PageHeading from '@components/common/page-heading';
import HomePageHeader from '@layouts/home-page-header';
import './index.less';

import Head from 'next/head';
import {
  followService
} from '@services/index';
import {
  IPerformer,
  IUIConfig
} from 'src/interfaces';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';

interface IProps {
  ui: IUIConfig;
  currentUser: IPerformer;
  query: { [key: string]: any };
}

class FollowingPage extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  static async getInitialProps({ ctx }) {
    const { query } = ctx;
    return { query };
  }

  state = {
    offset: 0,
    limit: 12,
    filter: {
      sortBy: 'createdAt'
    } as any,
    performers: [],
    total: 0,
    fetching: true,
    tab: 'following',
    sourceId: '',
    targetId: '',
    isChecked: false,
    key: ''

  };

  async componentDidMount() {
    const { currentUser, query } = this.props;
    if (query?.tab) { this.setState({ tab: query?.tab }); }
    query?.tab === 'follower' ? await this.setState({ targetId: currentUser._id }) : await this.setState({ sourceId: currentUser._id });
    this.getFollow();
  }

  async handleTabChange(currentTab) {
    const { currentUser } = this.props;
    await this.setState({
      isChecked: false, fetching: true, performers: [], offset: 0
    });
    this.setState({ tab: currentTab });
    currentTab === 'following' ? await this.setState({ sourceId: currentUser._id, targetId: '' }) : await this.setState({ targetId: currentUser._id, sourceId: '' });
    this.setState({ key: '' });
    this.handleFilter();
    this.getFollow();
  }

  async handleFilter() {
    const { filter, key } = this.state;
    await this.setState({ offset: 0, filter: { ...filter, q: key } });
    this.getFollow();
  }

  async handleFilterByFollower(FilterId: any, type: string) {
    const {
      limit, offset, filter, isChecked
    } = this.state;
    try {
      this.setState({ fetching: true });
      if (isChecked) {
        const resp = await followService.search(type, {
          limit,
          offset: limit * offset,
          ...filter,
          ...FilterId
        });
        const listFollow = resp.data.data.filter((el) => el.sourceInfo.isFollowed === false);
        this.setState({ performers: listFollow, total: resp.data.total, fetching: false });
      } else {
        const resp = await followService.search(type, {
          limit,
          offset: limit * offset,
          ...filter,
          ...FilterId
        });
        this.setState({ performers: resp.data.data, total: resp.data.total, fetching: false });
      }
    } catch {
      message.error('Error occured, please try again later');
      this.setState({ fetching: false });
    }
  }

  getFollow = async () => {
    const {
      limit, offset, filter, sourceId, targetId
    } = this.state;

    try {
      this.setState({ fetching: true });
      if (sourceId === '') {
        const resp = await followService.search('follower', {
          limit,
          offset: limit * offset,
          ...filter,
          targetId
        });
        this.setState({ performers: resp.data.data, total: resp.data.total, fetching: false });
      } else {
        const resp = await followService.search('following', {
          limit,
          offset: limit * offset,
          ...filter,
          sourceId
        });
        this.setState({ performers: resp.data.data, total: resp.data.total, fetching: false });
      }
    } catch {
      message.error('Error occured, please try again later');
      this.setState({ fetching: false });
    }
  }

  loadMoreFolow = async () => {
    const {
      limit, offset, filter, sourceId, targetId, performers
    } = this.state;

    if (sourceId === '') {
      const resp = await followService.search('follower', {
        limit,
        offset: limit * (offset + 1),
        ...filter,
        targetId
      });
      this.setState({
        performers: performers.concat(resp.data.data), total: resp.data.total, offset: offset + 1, fetching: false
      });
    } else {
      const resp = await followService.search('following', {
        limit,
        offset: limit * (offset + 1),
        ...filter,
        sourceId
      });
      this.setState({
        performers: performers.concat(resp.data.data), total: resp.data.total, offset: offset + 1, fetching: false
      });
    }
    return null;
  };

  pageChanged = async (page: number) => {
    await this.setState({ offset: page - 1 });
    this.getFollow();
  }

  render() {
    const {
      ui, currentUser
    } = this.props;
    const {
      performers, fetching, total, tab, isChecked, targetId, key
    } = this.state;

    return (
      <Layout>
        <Head>
          <title>
            {ui && ui.siteName}
            {' '}
            | List Follow
          </title>
        </Head>
        <div className="main-container">
          <PageHeading title="" />
          <HomePageHeader
            tabs={[
              {
                key: 'following',
                tab:
                <Link href={{ pathname: '/my-follow', query: { tab: 'following' } }}>
                 <a href="/my-follow?tab=following">
                  <div className="tab-follow">
                    <span>Following</span>
                    <span>{currentUser.stats.totalFollowing}</span>
                  </div>
                 </a>
                </Link>
              },
              {
                key: 'follower',
                tab:
                <Link href={{ pathname: '/my-follow', query: { tab: 'follower' } }}>
                  <a href="/my-follow?tab=follower">
                    <div className="tab-follow">
                      <span>Fans</span>
                      <span>{currentUser.stats.totalFollower}</span>
                    </div>
                  </a>
                </Link>
              }
            ]}
            handleTabChange={(val) => this.handleTabChange(val)}
            defaultTab={tab}
          />
          <div className="filter-item-follow">
            <div className="avatar-follow">
              <PerformerGridCard
                modelNumber={0}
                performer={currentUser}
                pathname="/model/profile"
                as={`/${currentUser?.username || currentUser?._id}`}
                showButtonFollow={false}
                showModelNumber={false}
                getPerformerList={() => { }}
              />
            </div>
          </div>
          <div className="filter-item-follow input">
            <Input
              style={{ width: '300px' }}
              placeholder="Enter keyword"
              value={key}
              onChange={(evt) => this.setState({ key: evt.target.value })}
              onPressEnter={() => this.setState({ offset: 0 }, () => this.handleFilter())}
            />
          </div>
          {tab === 'follower' && (
            <div className="checkBox-follow">
              <Checkbox
                className="checkBox-confirm"
                value={isChecked}
                style={{ borderWidth: 2, borderColor: 'black' }}
                onClick={() => this.setState({ isChecked: !isChecked, offset: 0 }, () => this.handleFilterByFollower({ targetId }, 'follower'))}
              >
                {' '}
                Show only those I am not following
              </Checkbox>
            </div>
          )}
        <div id="scrollableContent" className="main-container custom">
          <InfiniteScroll
            dataLength={performers.length}
            hasMore
            loader={null}
            next={this.loadMoreFolow.bind(this)}
            endMessage={null}
            scrollThreshold={0.8}
            scrollableTarget="scrollableExplore"
          >
            <div className="grid-view">
              {performers && performers.length > 0 && performers.map((p) => (
                (tab === 'following' && p._id !== currentUser._id) ? (
                  (p.targetInfo?._id && p.targetInfo?._id !== currentUser._id) && (
                    <Col className="perform-gird-10" key={p._id}>
                      <PerformerGridCard
                        modelNumber={0}
                        performer={p.targetInfo}
                        pathname="/model/profile"
                        as={`/${p.targetInfo?.username || p.targetInfo?._id}`}
                        showButtonFollow
                        getPerformerList={() => { }}
                        showModelNumber={false}
                      />
                    </Col>
                  )
                )
                  : (p.sourceInfo?._id && (p.sourceInfo?._id !== currentUser._id) && (
                    <Col className="perform-gird-10" key={p._id}>
                      <PerformerGridCard
                        modelNumber={0}
                        performer={p.sourceInfo}
                        pathname="/model/profile"
                        as={`/${p.sourceInfo?.username || p.sourceInfo?._id}`}
                        showButtonFollow
                        getPerformerList={() => this.handleFilterByFollower({ targetId }, 'follower')}
                        showModelNumber={false}
                      />
                    </Col>
                  )
                  )
              ))}
            </div>
          </InfiniteScroll>
        </div>
          {!total && !fetching && <p className="text-center" style={{ margin: 20 }}>No model was found</p>}
        </div>
      </Layout>
    );
  }
}

const mapStates = (state: any) => ({
  ui: { ...state.ui },
  currentUser: { ...state.user.current }

});

const mapDispatch = {};
export default connect(mapStates, mapDispatch)(FollowingPage);
