/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/no-unused-state */
import { PureComponent } from 'react';
import {
  Col, Layout, Spin, message, Input, Checkbox
} from 'antd';
import { connect } from 'react-redux';
import PerformerGridCard from '@components/performer/grid-card';
import PageHeading from '@components/common/page-heading';
import HomePageHeader from '@layouts/home-page-header';
import './index.less';
import Head from 'next/head';
import {
  followService, performerService
} from '@services/index';
import {
  IPerformer,
  IUIConfig,
  IUser
} from 'src/interfaces';
import { redirect404 } from '@lib/utils';
import InfiniteScroll from 'react-infinite-scroll-component';
import TrendingHeaderTabs from '../../following-fans/index';

interface IProps {
  ui?: IUIConfig;
  query?: { [key: string]: any }
  performer?: IPerformer;
  currentUser?: IUser;
}

class FollowingPage extends PureComponent<IProps> {
  static authenticate = true;

  static async getInitialProps({ ctx }) {
    try {
      const { query } = ctx;
      if (query.id) {
        const [performer] = await Promise.all([
          performerService.findOne(query.id, {
            Authorization: ctx.token || ''
          })
        ]);
        return {
          performer: performer?.data,
          query
        };
      }
      return {
        query
      };
    } catch (error) {
      return redirect404(ctx);
    }
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
    tab: 'follower',
    sourceId: '',
    targetId: '',
    isChecked: false,
    key: ''
  };

  async componentDidMount() {
    const { query } = this.props;
    const { tab } = this.state;
    tab === 'follower' ?  await this.setState({ targetId: query.id }) : await this.setState({ sourceId: query.id });
    this.getFollow();
  }


  async handleTabChange(currentTab) {

    const { query } = this.props;
    await this.setState({
      isChecked: false, fetching: true, performers: [], offset: 0, tab: currentTab
    });
    this.setState({ tab: currentTab });
    currentTab === 'following' ? await this.setState({ sourceId: query.id, targetId: '' }) : await this.setState({ targetId: query.id, sourceId: '' });
    this.getFollow();

  }

  async handleFilter() {
    const { filter, key } = this.state;
    await this.setState({ offset: 0, filter: { ...filter, q: key } });
    this.getFollow();
  }
  async handleFilterByCheckbox(FilterId: any, type: string) {

    const {
      limit, offset, filter, isChecked, tab
    } = this.state;

   
    try {
      this.setState({ fetching: true });
      if (isChecked ) {
        const resp = await followService.search(type, {
          limit,
          offset: limit * offset,
          ...filter,
          ...FilterId
        });

        const listFollow = tab === 'follower' ? resp.data.data.filter((el) => el.sourceInfo?.isFollowed === false) : resp.data.data.filter((el) => el.targetInfo?.isFollowed === false);

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
    const { limit, offset, filter, sourceId, targetId, tab } = this.state;
    try {
      this.setState({ fetching: true });
      const type = tab === 'follower' ? 'follower' : 'following';
      const idKey = type === 'follower' ? { targetId } : { sourceId };
      const resp = await followService.search(type, {
        limit,
        offset: limit * offset,
        ...filter,
        ...idKey
      });
      this.setState({ performers: resp.data.data, total: resp.data.total, fetching: false });
    } catch {
      message.error('Error occurred, please try again later');
      this.setState({ fetching: false });
    }
  };

  loadMoreFolow = async () => {
    const {
      limit, offset, filter, sourceId, targetId, performers
    } = this.state;

    if (sourceId === '') {
      const resp = await followService?.search('follower', {
        limit,
        offset: limit * (offset + 1),
        ...filter,
        targetId
      });
    
      this.setState({
        performers: performers.concat(resp.data.data), total: resp.data.total, fetching: false
      });
    } else {
      const resp = await followService?.search('following', {
        limit,
        offset: limit * (offset + 1),
        ...filter,
        sourceId
      });
      this.setState({
        performers: performers.concat(resp.data.data), total: resp.data.total, fetching: false
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
      ui, performer, currentUser
    } = this.props;
    const {
      performers, fetching, total, tab, isChecked, sourceId, targetId
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
        <div className='flex justify-center mt-4'>
          <TrendingHeaderTabs handleTabChange={(val) => this.handleTabChange(val)} performer={performer} />
        </div>
        <div className="main-container">
          <PageHeading title="" />

          <HomePageHeader

            tabs={[
              {
                key: 'following',
                tab: <div className="tab-follow">
                  <span>Following</span>
                  <span>
                    {performer?.stats?.totalFollowing}
                  </span>
                </div>
              },
              {
                key: 'follower',
                tab: <div className="tab-follow">
                  <span>Fans</span>
                  <span>
                    {performer?.stats?.totalFollower}
                  </span>
                </div>
              }
            ]}
            handleTabChange={(val) => this.handleTabChange(val)}
            defaultTab={tab}
          />
          <div className="filter-item-follow">
            <div className="avatar-follow">
              <PerformerGridCard
                modelNumber={0}
                performer={performer}
                pathname="/model/profile"
                as={`/${performer?.username || performer?._id}`}
                showButtonFollow={currentUser?._id !== performer?._id}
                getPerformerList={() => { }}
                showModelNumber={false}
                title="Follow me"
              />
            </div>
          </div>
          <div className="filter-item-follow input">
            <Input
              style={{ width: '300px' }}
              placeholder="Enter keyword"
              onChange={(evt) => this.setState({ key: evt.target.value })}
              onPressEnter={() => this.handleFilter()}
            />
          </div>
          {(currentUser?._id !== performer?._id || tab === 'follower')
            && (
              <div className="checkBox-follow">
                {tab == 'follower' && (
                  <Checkbox
                    className="checkBox-confirm"
                    checked={isChecked}

                    onClick={() => this.setState({ isChecked: !isChecked }, () => this.handleFilterByCheckbox({ targetId, sourceId }, tab))}
                  >
                    {' '}
                    Show only those I am not following
                  </Checkbox>
                )}
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
     
                {performers && performers.length > 0 && performers.map((p, index) => (
                  (tab === 'following' && p?.targetInfo?._id) ? (
                    <Col className="perform-gird-10" key={p?.targetInfo?._id}>
                      <PerformerGridCard
                        modelNumber={index + 1}
                        performer={p?.targetInfo}
                        pathname="/model/profile"
                        as={`/${p?.targetInfo?.username || p?.targetInfo?._id}`}
                        showButtonFollow
                        getPerformerList={() => { }}
                        showModelNumber={false}
                      />
                    </Col>
                  ) : (
                    (tab === 'follower' && p?.sourceInfo?._id) && (
                      <div>
                        <Col className="perform-gird-10" key={p?.sourceInfo?._id}>
                          <PerformerGridCard
                            modelNumber={index + 1}
                            performer={p?.sourceInfo}
                            pathname="/model/profile"
                            as={`/${p?.sourceInfo?.username || p?.sourceInfo?._id}`}
                            showButtonFollow
                            getPerformerList={() => { }}
                            showModelNumber={false}
                          />

                        </Col>
                      </div>
                    )
                  )
                ))}
              </div>
            </InfiniteScroll>
          </div>
          {!total && !fetching && <p className="text-center" style={{ margin: 20 }}>No model was found</p>}
          {fetching && (
            <div className="text-center" style={{ margin: 30 }}>
              <Spin />
            </div>
          )}
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
