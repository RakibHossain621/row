import { ChangeEvent, PureComponent } from 'react';
import {
  Row,
  Col,
  Spin,
  message,
  Button,
  RadioChangeEvent
} from 'antd';
import { connect } from 'react-redux';
import PerformerGridCard from '@components/performer/grid-card';
import PerformerNameCard from '@components/performer/name-card';
import Head from 'next/head';
import { IUIConfig } from 'src/interfaces/';
import { performerService, utilsService } from 'src/services';
import { IPerformer } from 'src/interfaces';
import './index.less';

import ScrollListFeed from '@components/post/scroll-list';
import { getFeeds, moreFeeds } from '@redux/feed/actions';
import Router from 'next/router';
import { ModelTopHeader } from '@components/model/model-top-header';
import { TopModelsSearchFilter } from '@components/model/model-filters';

interface IProps {
  ui: IUIConfig;
  countries: any;
  bodyInfo: any;
  currentUser: IPerformer;
  languages: any;
  getFeeds: Function;
  moreFeeds: Function;
  feedState: any;
  query: any;
}

const initialState = {
  offset: 0,
  limit: 10,
  filter: {
    sortBy: 'mostFollowed'
  } as any,
  performers: [],
  performersTop10: [],
  performersTop25: [],
  performersTop100: [],
  total: 0,
  fetching: false,
  tab: 'model',
  itemPerPage: 12,
  feedPage: 0,
  radioModelFilter: ['mostFollowed', 'earningCurrentMonth', 'mostView'],
  radioPostFilter: ['currentMonthViews', 'lastMonthViews', 'views'],
  hasMore: false,
  showRank: true

};

class Performers extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  static async getInitialProps({ ctx }) {
    const [countries, bodyInfo, languages] = await Promise.all([
      utilsService.countriesList(),
      utilsService.bodyInfo(),
      utilsService.languagesList()
    ]);
    const { query } = ctx;

    return {
      countries: countries?.data || [],
      languages: languages?.data || [],
      bodyInfo: bodyInfo?.data,
      query
    };
  }

  state =initialState

  async componentDidMount() {
    this.handlePageQueries()
    const { filter } = this.state;
    const { filter:ordering } = Router.query;
    await this.setState(
      { filter: { ...filter, sortBy: ordering }, feedPage: 0 },
      () => this.loadFeed()
    );
    this.handleSubmitOrdering('mostFollowed')
  }

  async componentDidUpdate(prevProps) {
    const { query } = this.props;
    if (prevProps.query.tab !== query.tab) {
      this.loadFeed()
    }
  }

  handlePageQueries() {
    const { query } = this.props;
    if (query.filter && query.tab) {
      console.log('query.filter && query.tab', query.filter, query.tab)
      this.setState({
        filter: {
          sortBy: query.filter
        },
        tab: query.tab
      })
      
      return
    } else {
      this.setState({
        filter: {
          sortBy: 'mostFollowed'
        },
        tab: 'model'
      })
    }
    this.loadFeed()
  }

  async handleFilter(values: any) {
    const { filter, tab } = this.state;
    this.setState({ showRank: true });

    // eslint-disable-next-line no-restricted-syntax
    for (const field in values) {
      if (field !== 'sortBy') { values[field] !== '' && this.setState({ showRank: false }); }
    }

    await this.setState({
      performers: [],
      performersTop10: [],
      performersTop25: [],
      performersTop100: [],
      offset: 0,
      limit: 10,
      filter: { ...filter, ...values }
    });
    if (values.sortBy && values.sortBy !== filter.sortBy) {
      Router.push({
        pathname: '/model',
        query: {
          tab,
          filter: values.sortBy
        }
      });
    }
    await this.setState({
      filter: { ...filter, ...values }
    });
    this.handleGetPerformers();
  }

  async handleGetPerformers() {
    await this.setState({
      performers: [],
      performersTop10: [],
      performersTop25: [],
      performersTop100: [],
      offset: 0,
      limit: 10
    });
    this.getTop10Performers();
    this.getTop25Performers();
    await this.getTop100Performers();
  }

  async getTop10Performers() {
    const { limit, offset, filter } = this.state;
    try {
      this.setState({ fetching: true });
      const resp = await performerService.search({
        limit,
        offset: limit * offset,
        ...filter
      });
      this.setState({
        performersTop10: resp.data.data,
        total: resp.data.total,
        fetching: false
      });
    } catch {
      message.error('Error occured, please try again later');
      this.setState({ fetching: false });
    }
  }

  async getTop25Performers() {
    const { filter } = this.state;
    try {
      await this.setState({ fetching: true });
      const resp = await performerService.search({
        limit: 15,
        offset: 10,
        ...filter
      });
      this.setState({
        performersTop25: resp.data.data,
        total: resp.data.total,
        fetching: false
      });
    } catch {
      message.error('Error occured, please try again later');
      this.setState({ fetching: false });
    }
  }

  async getTop100Performers() {
    const { filter } = this.state;
    try {
      await this.setState({ fetching: true });
      const resp = await performerService.search({
        limit: 75,
        offset: 25,
        ...filter
      });
      await this.setState({
        performersTop100: resp.data.data,
        total: resp.data.total,
        fetching: false,
        limit: 100,
        offset: 100
      });
    } catch {
      message.error('Error occured, please try again later');
      this.setState({ fetching: false });
    }
  }

  loadmorePerformers = async () => {
    const {
      limit, offset, filter, performers
    } = this.state;
    try {
      await this.setState({ fetching: true });
      const resp = await performerService.search({
        limit,
        offset,
        ...filter
      });
      this.setState({
        hasMore: true,
        performers: performers.concat(resp.data.data),
        total: resp.data.total,
        fetching: false,
        offset: offset + 100
      });
    } catch {
      message.error('Error occured, please try again later');
      this.setState({ fetching: false });
    }
  };

  loadFeed = async () => {
    const {
      feedPage, itemPerPage, filter, tab
    } = this.state;
    const { getFeeds: handleGetFeeds } = this.props;
    const query = {
      limit: itemPerPage
    };
    switch (tab) {
      case 'video':
        handleGetFeeds({
          ...query,
          type: 'video',
          ...filter,
          offset: feedPage * itemPerPage
        });
        break;
      case 'photo':
        handleGetFeeds({
          ...query,
          type: 'photo',
          ...filter,
          offset: feedPage * itemPerPage
        });
        break;
      case 'model':
        this.handleGetPerformers();
        break;
      default:
        break;
    }
    return null;
  };

  loadMoreFeed = async () => {
    const {
      feedPage, itemPerPage, filter, tab
    } = this.state;
    const { moreFeeds: handleGetMoreFeeds } = this.props;
    const query = {
      limit: 100
    };
    switch (tab) {
      case 'video':
        this.setState({ feedPage: feedPage + 1 }, () => handleGetMoreFeeds({
          ...query,
          type: 'video',
          ...filter,
          offset: (feedPage + 1) * itemPerPage
        }));
        break;
      case 'photo':
        this.setState({ feedPage: feedPage + 1 }, () => handleGetMoreFeeds({
          ...query,
          type: 'photo',
          ...filter,
          offset: (feedPage + 1) * itemPerPage
        }));
        break;

      case 'model':
        this.handleGetPerformers();
        break;
      default:
        break;
    }
    return null;
  };

  handleSubmitOrdering = async (ordering: string) => {
    const { filter, tab } = this.state;
    await this.setState(
      { filter: { ...filter, sortBy: ordering }, feedPage: 0 },
      () => this.loadFeed()
    );
    Router.push({
      pathname: '/model',
      query: {
        tab,
        filter: ordering
      }
    });
  };

  handleTabChange= async (tab) => {
    const { radioModelFilter, radioPostFilter } = this.state;
    if (tab === 'model') {
      this.setState({
        filter: {
          sortBy: 'mostFollowed'
        },
        tab: tab
      })
      Router.push({
        pathname: '/model',
        query: {
          tab,
          filter: radioModelFilter[0]
        }
      });
    } else {
      this.setState({
        filter: {
          sortBy: 'currentMonthViews'
        },
        tab: tab
      })
      Router.push({
        pathname: '/model',
        query: {
          tab,
          filter: radioPostFilter[0]
        }
      });
    }
  }

  render() {
    const {
      ui, countries, bodyInfo, currentUser, languages, feedState
    } = this.props;
    const {
      fetching,
      total,
      limit,
      performersTop10,
      performersTop25,
      performersTop100,
      performers,
      filter,
      tab,
      hasMore,
      showRank
    } = this.state;
    
    const { items: feeds = [], requesting: loadingFeed } = feedState;
    return (
      <>
        <Head>
          <title>
            {ui && ui.siteName}
            {' '}
            | Models
          </title>
        </Head>
        <section className='pb-10'>
          <ModelTopHeader activeTab={tab} handleTabChange={this.handleTabChange}>
            <TopModelsSearchFilter
              defaultFilterValue={filter.sortBy}
              onSubmit={this.handleFilter.bind(this)}
              languages={languages}
              countries={countries}
              bodyInfo={bodyInfo}
              activeTab={tab}
              handleSubmitOrdering={this.handleSubmitOrdering}
            /> 
          </ModelTopHeader>
          {tab === 'model' 
            ?  <div className='flex items-center justify-center gap-4 py-6'>
              <span className='text-lg text-black'>Most</span>
              <div className='flex flex-col items-start justify-start gap-3'>
                <button className='cursor-pointer' onClick={() => this.handleSubmitOrdering('mostFollowed')}>
                  <input onClick={() => this.handleSubmitOrdering('mostFollowed')} className='text-black' color='#000000' checked={filter.sortBy === 'mostFollowed'} type="radio" /> 
                  <span className='text-black ml-2'>Fans</span>
                </button>
                <button className='cursor-pointer' onClick={() => this.handleSubmitOrdering('earningCurrentMonth')}>
                  <input onClick={() => this.handleSubmitOrdering('earningCurrentMonth')} className='text-black' color='#000000' checked={filter.sortBy === 'earningCurrentMonth'} type="radio" />
                  <span className='text-black ml-2'>
                    Supported this month
                  </span>
                </button>
                <button className='cursor-pointer' onClick={() => this.handleSubmitOrdering('mostViews')}>
                  <input onClick={() => this.handleSubmitOrdering('mostViews')} className='text-black' color='#000000' checked={filter.sortBy === 'mostViews'} type="radio" />
                  <span className='text-black ml-2'>
                    Total library views
                  </span> 
                </button>
              </div>
            </div>
            :  <div className='flex items-center justify-center gap-4 py-6'>
                  <span className='text-lg text-black'>Most Viewed</span>
                  <div className='flex flex-col items-start justify-start gap-3'>
                    <button onClick={() => this.handleSubmitOrdering('currentMonthViews')}>
                      <input id='currentMonthViews' className='text-black' color='#000000' checked={filter.sortBy === 'currentMonthViews'} type="radio" /> 
                      <label htmlFor='currentMonthViews' className='text-black ml-2'>This Month</label>
                    </button>
                    <button onClick={() => this.handleSubmitOrdering('lastMonthViews')}>
                      <input id='lastMonthViews'  className='text-black' color='#000000' checked={filter.sortBy === 'lastMonthViews'} type="radio"  />
                      <label htmlFor='lastMonthViews' className='text-black ml-2'>
                        Last Month
                      </label>
                    </button>
                    <button onClick={() => this.handleSubmitOrdering('views')}>
                      <input id='views'  className='text-black' color='#000000' checked={filter.sortBy === 'views'} type="radio"  />
                      <label htmlFor='views' className='text-black ml-2'>
                        All time
                      </label> 
                    </button>
                  </div>
                </div>
            }
          {tab === 'model' ? (
            <>
              {performersTop10 && performersTop10.length > 0 && (
                <section className='w-full'>
                  {showRank && (
                  <h3 className="text-gray-900 font-semibold text-center text-lg py-6 ">
                    1-10
                  </h3>
                  ) }
                  <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6'>
                    {performersTop10.map((p, index) => (
                      <div key={p._id} className="">
                        <PerformerGridCard
                          performer={p}
                          pathname="/model/profile"
                          as={`/${p?.username || p?._id}`}
                          showButtonFollow={
                            !p?.isFollowed && p._id !== currentUser._id
                          }
                          modelNumber={index + 1}
                          filter={filter}
                          getPerformerList={() => { }}
                          showModelNumber
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {performersTop25 && performersTop25.length > 0 && (
                <section className='w-full md:px-20'>
                  {showRank && (
                    <h3 className="text-gray-900 font-semibold text-center text-lg py-6">
                      11-25
                    </h3>
                  ) }
                  <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6'>
                    {performersTop25.map((p, index) => (
                      <div key={p._id} className="">
                        <PerformerGridCard
                          performer={p}
                          pathname="/model/profile"
                          as={`/${p?.username || p?._id}`}
                          showButtonFollow={
                            !p?.isFollowed && p._id !== currentUser._id
                          }
                          modelNumber={index + 11}
                          filter={filter}
                          getPerformerList={() => { }}
                          showModelNumber
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {performersTop100 && performersTop100.length > 0 && (
                <section className='thrid_rank_padding'>
                  {showRank && (
                  <h3 className="text-gray-900 font-semibold text-center text-lg py-6 ">
                    26-100
                  </h3>
                  ) }
                  <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6'>
                    {performersTop100.map((p, index) => (
                      <div key={p._id} className="">
                        <PerformerGridCard
                          performer={p}
                          pathname="/model/profile"
                          as={`/${p?.username || p?._id}`}
                          showButtonFollow={
                            !p?.isFollowed && p._id !== currentUser._id
                          }
                          filter={filter}
                          modelNumber={index + 26}
                          showModelNumber
                          getPerformerList={() => { }}
                          hideFollower
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {performersTop100 && performersTop100.length > 0 && (
                <section className="thrid_rank_padding rank_margin">
                  {/* {showRank && (
                    <h3 className="text-gray-900 font-semibold">
                      <span>101+</span>
                    </h3>
                  )} */}
                  <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6'>
                    {performers.map((p, index) => (
                      <div key={p._id} className="">
                        <PerformerNameCard
                          performer={p}
                          pathname="/model/profile"
                          as={`/${p?.username || p?._id}`}
                          filter={filter}
                          modelNumber={index + 101}
                          hideFollower
                        />
                      </div>
                    ))}
                  </div>
                </section >
              )}
              {!total && !fetching && (
                <p className="text-center" style={{ margin: 20 }}>
                  No profile was found
                </p>
              )}
              {fetching && (
                <div className="text-center" style={{ margin: 30 }}>
                  <Spin />
                </div>
              )}
              {total && total > limit ? (
                <div className="loadmore">
                  <Button
                    className="btn-loadmore"
                    onClick={() => this.loadmorePerformers()}
                  >
                    Load More
                  </Button>
                </div>
              ) : null}
            </>
          ) : (
            <div id="scrollableContent" className="main-container custom">
              <ScrollListFeed
                items={feeds}
                loading={loadingFeed}
                canLoadmore
                loadMore={this.loadMoreFeed.bind(this)}
                isGrid
                performer={null}
                tab={tab}
              />
            </div>
          )}
        </section>
      </>
    );
  }
}

const mapStates = (state: any) => ({
  ui: { ...state.ui },
  currentUser: state.user.current,
  feedState: { ...state.feed.feeds }
});

const mapDispatch = {
  getFeeds,
  moreFeeds
};
export default connect(mapStates, mapDispatch)(Performers);
