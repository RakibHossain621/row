import { PureComponent } from 'react';
import {
  Row, Col, Pagination, Spin, message, Radio
} from 'antd';
import { connect } from 'react-redux';
import PerformerGridCard from '@components/performer/grid-card';
import PrivateChatCard from '@components/performer/private-chat-card';
import Head from 'next/head';
import { getList } from '@redux/performer/actions';
import { IUIConfig, IUser } from 'src/interfaces/';
import { streamService, performerService, utilsService } from 'src/services';
import './index.less';
import Router from 'next/router';
import { redirect404 } from '@lib/utils';
import { LiveNowHeaderTabs } from '@components/live-now/LiveNowHeaderTabs';
import { SearchFilterLiveNow } from '@components/live-now/SearchFilterLiveNow';

interface IProps {
  ui: IUIConfig;
  getList: Function;
  performers: any;
  query: { [key: string]: any };
  currentUser: IUser;
  loggedIn: boolean;

  countries: any;
  bodyInfo: any;
  languages: any;
}

class PerformerLiveNow extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  state = {
    offset: 0,
    limit: 12,
    filter: {
      sortBy: 'live'
    } as any,
    fetching: false,
    tab: 'public',
    status: null,
    performers: {data: [], total: 0}
  };

  static async getInitialProps({ ctx }) {
    try {
      const { query } = ctx;
      const [countries, bodyInfo] = await Promise.all([utilsService.countriesList(), utilsService.bodyInfo()]);
      return {
        countries: countries?.data || [],
        bodyInfo: bodyInfo?.data,
        query
      };
    } catch (error) {
      return redirect404(ctx);
    }
  }

  async componentDidMount() {
    const { query } = this.props;
    if (query && query.tab) {
      await this.setState({ tab: query.tab });
    }
    this.loadItems();
  }

  async handleFilter(values: any) {
    const { filter } = this.state;
    await this.setState({ offset: 0, filter: { ...filter, ...values } });
    this.loadItems();
  }

  async handleTabChange(currentTab) {
    await this.setState({ tab: currentTab });
    await this.loadItems();
  }

  handleRedirect = async () => {
    const { loggedIn } = this.props;
    if (!loggedIn) {
      await message.error('Please login !');
      Router.push('/');
    }
  };

  pageChanged = async (page: number) => {
    await this.setState({ offset: page - 1 });
    this.loadItems();
  };

  async loadItems() {
    const {
      tab, limit, offset, status
    } = this.state;
    const { getList: handleGetLists } = this.props;

    // remove the commented filter when will test streamers
    const resp = await streamService.getPublicStreams(true);
    this.setState({ 
      fetching: false,
      performers: {
        data: resp.data,
        total: 1
      }
    });
  }

  render() {
    const {
      ui, currentUser, loggedIn, languages, countries, bodyInfo
    } = this.props;
    const {
      limit, offset, fetching, tab, status, performers, filter
    } = this.state;

    return (
        <>
          <Head>
            <title>
              {ui && ui.siteName}
              {' '}
              | Live Now
            </title>
          </Head>
          <div className="pb-10">
            <LiveNowHeaderTabs 
              activeTab={tab}
              updateTab={(val) => this.handleTabChange(val)}
            >
              <SearchFilterLiveNow
                defaultFilterValue={filter.sortBy}
                onSubmit={this.handleFilter.bind(this)}
                languages={languages}
                countries={countries}
                bodyInfo={bodyInfo}
                activeTab={tab}
                handleSubmitOrdering={this.handleFilter}
              /> 
            </LiveNowHeaderTabs>
            {performers.data && performers.data.length > 0 && (
              <section className='py-8 w-full grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6'>
                {performers.data.map((p) => (
                  (p._id !== currentUser._id) && (
                    <div key={p._id} className="" onClick={() => this.handleRedirect()}> 
                      <PerformerGridCard
                        modelNumber={null}
                        performer={p}
                        pathname={loggedIn ? '/streaming/details' : '/'}
                        as={loggedIn ? `/stream/${p?.username || p?._id}` : '/'}
                        showButtonFollow={false}
                        getPerformerList={() => {}}
                        showModelNumber={false}
                        isForLive
                        isLivePrivate={tab === 'public' ? false : true}
                      />
                    </div>
                  )
                ))}
              </section>
            )}
            {!performers.total && !fetching && (
              <p className="text-center" style={{ margin: 20 }}>
                No model is available now
              </p>
            )}
            {fetching && (
              <div className="text-center" style={{ margin: 30 }}>
                <Spin />
              </div>
            )}
            {performers.total && performers.total > limit ? (
              <Pagination
                showQuickJumper
                defaultCurrent={offset + 1}
                total={performers.total}
                pageSize={limit}
                onChange={this.pageChanged}
              />
            ) : null}
          </div>
        </>
    );
  }
}

const mapStates = (state: any) => ({
  ui: { ...state.ui },
  performers: { ...state.performer.performerListing },
  currentUser: { ...state.user.current },
  settings: { ...state.settings },
  loggedIn: state.auth.loggedIn

});

const mapDispatch = {
  getList
};
export default connect(mapStates, mapDispatch)(PerformerLiveNow);
