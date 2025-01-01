import {
  Layout,
  Button,
  message,
  Modal,
  Image,
  Popover,
  Badge,
  Tooltip
} from 'antd';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getVideos, moreVideo } from '@redux/video/actions';
import { capitalizeFirstLetter } from 'src/lib/string';
import {
  getFeeds,
  moreFeeds,
  removeFeedSuccess,
  resetFeeds
} from '@redux/feed/actions';
import { listProducts, moreProduct } from '@redux/product/actions';
import { moreGalleries, getGalleries } from '@redux/gallery/actions';
import { updateBalance } from '@redux/user/actions';
import {
  performerService,
  tokenTransctionService,
  feedService,
  utilsService,
  messageService
} from 'src/services';
import Head from 'next/head';
import {
  EditOutlined,
  VideoCameraOutlined,
  MessageOutlined,
  PictureOutlined,
  DollarOutlined,
  AuditOutlined,
  MailOutlined
} from '@ant-design/icons';
import {
  TickIcon, ShareIcon, MessageIcon, ShakeHandIcon
} from 'src/icons';
import ScrollListFeed from '@components/post/scroll-list';
import { PerformerInfo } from '@components/performer/table-info';
import ShareButtons from '@components/performer/share-profile';
import SearchPostBar from '@components/post/search-bar';
import Loader from '@components/common/base/loader';
import {
  IPerformer, IFeed, ICountry, IUIConfig
} from 'src/interfaces';
import Link from 'next/link';
import Router from 'next/router';
import Error from 'next/error';
import '@components/performer/performer.less';
import ButtonFollow from 'src/components/common/buttonFollow';
import { ROLE_PERMISSIONS } from 'src/constants';
import dynamic from 'next/dynamic';
import { getGlobalConfig } from '@services/config';

import { AppIcon, iconVariants } from '@components/ui/shared/AppIcon';
import { AppButton, buttonVariants } from '@components/ui/shared/AppButton';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import AppVideoCard from '@components/ui/shared/AppVideoCard';
import AppPhotoCard from '@components/ui/shared/AppPhotoCard';
import { updateModals } from '@redux/modals/actions';

const TipPerformerForm = dynamic(() => import('@components/performer/tip-form'), { ssr: false });

interface IProps {
  ui: IUIConfig;
  error: any;
  currentUser: IPerformer;
  performer: IPerformer;
  feedState: any;
  getFeeds: Function;
  moreFeeds: Function;
  removeFeedSuccess: Function;
  updateBalance: Function;
  countries: ICountry[];
  query: { [key: string]: any };
  resetFeeds: Function;
  updateModals: Function;
}

const initialFilter = {
  q: '',
  fromDate: '',
  toDate: '',
  sortBy: '',
  sort: ''
};

class PerformerProfile extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  subscriptionType = 'monthly';

  state = {
    itemPerPage: 12,
    page: 0,
    openTipModal: false,
    submiting: false,
    tab: 'video',
    filter: initialFilter,
    isGrid: true,
    totalNotReadMessage: 0,
    loading: false,
    copied: false,
  };

  static async getInitialProps({ ctx }) {
    const { query } = ctx;
    try {
      const [performer, countries] = await Promise.all([
        performerService.findOne(query.username, {
          Authorization: ctx.token || ''
        }),
        utilsService.countriesList()
      ]);
      return {
        performer: performer?.data,
        countries: countries?.data || [],
        query
      };
    } catch (e) {
      const error = await Promise.resolve(e);
      return { error };
    }
  }

  async componentDidMount() {
    const el = document.getElementsByClassName('main-container') as any;
    el.scrollTop = 0;
    const { performer, query } = this.props;
    if (query && query.tab) {
      await this.setState({ tab: query.tab });
    }
    if (performer) {
      this.loadItems();
      // this.getBrackets();
    }
  }

  componentDidUpdate(_, prevState) {
    const { tab } = this.state;
    if (tab !== prevState.tab) {
      this.loadItems();
    }
  }

  async componentWillUnmount() {
    const { resetFeeds: handleResetFeed } = this.props;
    handleResetFeed();
  }

  async handleCountNotificationMessage() {
    const data = await (await messageService.countTotalNotRead()).data;
    if (data) {
      this.setState({ totalNotReadMessage: data.total });
    }
  }

  handleViewWelcomeVideo() {
    const { performer } = this.props;
    const notShownWelcomeVideos = localStorage.getItem('notShownWelcomeVideos');
    if (!notShownWelcomeVideos?.includes(performer._id)) {
      const Ids = JSON.parse(notShownWelcomeVideos || '[]');
      const values = Array.isArray(Ids)
        ? Ids.concat([performer._id])
        : [performer._id];
      localStorage.setItem('notShownWelcomeVideos', JSON.stringify(values));
    }
  }

  async handleDeleteFeed(feed: IFeed) {
    const { currentUser, removeFeedSuccess: handleRemoveFeed } = this.props;
    if (currentUser?._id !== feed.fromSourceId) {
      message.error('Permission denied');
      return;
    }
    if (
      !window.confirm(
        'All earnings are related to this post will be refunded. Are you sure to remove?'
      )
    ) {
      return;
    }
    try {
      await feedService.delete(feed._id);
      message.success('Deleted post success');
      handleRemoveFeed({ feed });
    } catch {
      message.error('Something went wrong, please try again later');
    }
  }

  async handleFilterSearch(values) {
    const { filter } = this.state;
    await this.setState({ filter: { ...filter, ...values } });
    this.loadItems();
  }

  async handleTabChange(val) {
    await this.setState({ tab: val, page: 0, filter: initialFilter });
  }

  // async getBrackets() {
  //   try {
  //     const { performer } = this.props;
  //     this.setState({ loading: true });
  //     const resp = await crossPromotionService.getBrackets(performer._id);
  //     if (resp?.data) {
  //       this.setState({ bracketActive: resp.data, loading: false });
  //     }
  //   } catch (error) {
  //     this.setState({ loading: false });
  //     message.error(error.message);
  //   }
  // }

  handleJoinStream = () => {
    const { currentUser, performer } = this.props;
    if (!currentUser?._id) {
      message.error('Please log in or register!');
      return;
    }
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

  async loadItems() {
    const { performer, getFeeds: handleGetFeeds, currentUser } = this.props;
    const {
      itemPerPage, filter, tab, page
    } = this.state;
    const query = {
      offset: page,
      limit: itemPerPage,
      performerId: performer?._id,
      sortBy: filter.sortBy || '',
      sort: filter.sort || '',
      fromDate: filter.fromDate || '',
      toDate: filter.toDate || '',
      status: performer._id !== currentUser._id ? 'active' : ''
    };
    handleGetFeeds({
      ...query,
      type: tab
    });
  }

  async sendTip(price: number) {
    const {
      performer,
      currentUser,
      updateBalance: handleUpdateBalance
    } = this.props;
    if (currentUser?.rubyBalance < price) {
      message.error('You have an insufficient ruby balance. Please top up.');
      Router.push('/ruby-package');
      return;
    }
    try {
      await this.setState({ submiting: true });
      await tokenTransctionService.sendTip(performer?._id, {
        performerId: performer?._id,
        price
      });
      message.success('Thank you for the tip');
      handleUpdateBalance({ token: -price, type: 'ruby-balance' });
    } catch (e) {
      const err = await e;
      message.error(err.message || 'error occured, please try again later');
    } finally {
      this.setState({ submiting: false, openTipModal: false });
    }
  }

  async loadMoreItem() {
    const {
      page, itemPerPage, tab, filter
    } = this.state;
    const { moreFeeds: getMoreFeed, performer } = this.props;
    const query = {
      limit: itemPerPage,
      performerId: performer._id,
      sortBy: filter.sortBy || '',
      sort: filter.sort || '',
      fromDate: filter.fromDate || '',
      toDate: filter.toDate || ''
    };
    this.setState({ page: page + 1 }, () => getMoreFeed({
      offset: (page + 1) * itemPerPage,
      ...query,
      type: tab
    }));
  }

  onCopy() {
    this.setState({ copied: true });

    setTimeout(() => this.setState({ copied: false }), 2500);
  };

  render() {
    const {
      error, performer, ui, currentUser, feedState, countries, updateModals
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
      items: feeds = [],
      requesting: loadingFeed
    } = feedState;
    const {
      openTipModal,
      submiting,
      totalNotReadMessage,
      tab,
      isGrid,
      loading
    } = this.state;
    const config = getGlobalConfig();

    return (
      // <Layout>
      //   <Head>
      //     <title>
      //       {performer?.username}
      //       {' '}
      //       |
      //       {' '}
      //       {ui && capitalizeFirstLetter(ui.siteName)}
      //     </title>
      //     <meta
      //       name="keywords"
      //       content={`${performer?.username}, ${performer?.name}`}
      //     />
      //     <meta name="description" content={performer?.bio} />
      //     <meta property="og:type" content="website" />
      //     <meta
      //       property="og:title"
      //       content={`${ui?.siteName} | ${performer?.name || performer?.username
      //         }`}
      //     />
      //     <meta
      //       property="og:image"
      //       content={performer?.avatar || '/static/no-avatar.png'}
      //     />
      //     <meta property="og:description" content={performer?.bio} />
      //     <meta name="twitter:card" content="summary" />
      //     <meta
      //       name="twitter:title"
      //       content={`${ui?.siteName} | ${performer?.name || performer?.username
      //         }`}
      //     />
      //     <meta
      //       name="twitter:image"
      //       content={performer?.avatar || '/static/no-avatar.png'}
      //     />
      //     <meta name="twitter:description" content={performer?.bio} />
      //   </Head>
      //   <div className="main-container">
      //     <div
      //       className="top-profile"
      //       style={{
      //         backgroundImage: `url('${performer?.cover || '/static/banner-image.jpg'
      //           }')`
      //       }}
      //     >
      //       <div className="bg-2nd">
      //         <div className="top-banner" />
      //       </div>
      //     </div>
      //     <div className="main-profile">
      //       <div className="fl-col ">
      //         <Image
      //           alt="main-avt"
      //           src={performer?.avatar || '/static/no-avatar.png'}
      //           fallback="/static/no-avatar.png"
      //         />
      //         {currentUser?._id !== performer?._id && (
      //           <span
      //             className={
      //               performer?.isOnline > 0
      //                 ? 'online-status'
      //                 : 'online-status off'
      //             }
      //           />
      //         )}
      //         <div className="m-user-name">
      //           <h4 className="liveStatus">
      //             {performer?.name || 'N/A'}
      //             &nbsp;
      //             {performer?.verifiedAccount && <TickIcon style={{ color: 'green' }} />}
      //             &nbsp;
      //             {currentUser?._id === performer?._id && (
      //               <Link href="/model/account">
      //                 <a href="/model/account">
      //                   <EditOutlined className="primary-color" />
      //                 </a>
      //               </Link>
      //             )}
      //             {performer?.live > 0
      //               && currentUser?._id !== performer?._id && (
      //                 <a
      //                   aria-hidden
      //                   onClick={this.handleJoinStream}
      //                   className="live-status"
      //                 >
      //                   Live
      //                 </a>
      //               )}
      //             {performer?.privateChat > 0 && performer.isOnline > 0
      //               && currentUser?._id !== performer?._id
      //               && performer?.live === 0 && (
      //                 <a
      //                   aria-hidden
      //                   onClick={this.handleJoinChat}
      //                   className="live-status"
      //                 >
      //                   Private Chat
      //                 </a>
      //               )}
      //           </h4>
      //           <h6>
      //             @
      //             {performer?.username || 'N/A'}
      //           </h6>
      //         </div>
      //         <div className="m-user-name" />
      //         {currentUser?._id !== performer._id && (
      //           <ButtonFollow
      //             performer={performer}
      //             isHideOnClick={false}
      //             targetId={performer._id}
      //             sourceId={currentUser?._id}
      //             isFollow={performer.isFollowed}
      //             getPerformerList={() => { }}
      //           />
      //         )}
      //       </div>
      //       <div className="btn-grp">
      //         <div>
      //           {currentUser && currentUser?.roles && (
      //             <Tooltip title="Internal Profile">
      //               <Button
      //                 hidden={!currentUser?.roles.includes('admin')}
      //                 className="normal"
      //               >
      //                 <a
      //                   href={`${config.NEXT_PUBLIC_ADMIN_URL}/user/internal-profile?performerId=${performer._id}`}
      //                 >
      //                   <AuditOutlined />
      //                 </a>
      //               </Button>
      //             </Tooltip>
      //           )}
      //           {performer.live > 0 && (
      //             <Tooltip title="Go Live">
      //               <Button
      //                 hidden={currentUser?._id === performer._id}
      //                 className="normal"
      //                 href={`/stream/${performer.username}`}
      //                 onClick={() => {
      //                   Router.push(`/stream/${performer.username}`);
      //                 }}
      //               >
      //                 <VideoCameraOutlined />
      //               </Button>
      //             </Tooltip>
      //           )}
      //           {(performer.privateChat > 0 && performer.isOnline === 1) && (
      //             <Tooltip title="Private Chat">
      //               <Button
      //                 hidden={currentUser?._id === performer._id}
      //                 className="normal"
      //                 onClick={() => {
      //                   Router.push(
      //                     `/private-waiting-room/${performer.username}`
      //                   );
      //                 }}
      //               >
      //                 <MessageOutlined />
      //               </Button>
      //             </Tooltip>
      //           )}

      //           {currentUser?._id && (
      //             <Tooltip title="Send Message">
      //               <Button
      //                 hidden={currentUser?._id === performer._id}
      //                 className="normal"
      //                 onClick={() => Router.push({
      //                   pathname: '/messages',
      //                   query: {
      //                     toSource: 'performer',
      //                     toId: performer?._id || ''
      //                   }
      //                 })}
      //               >
      //                 <MessageIcon />
      //               </Button>
      //             </Tooltip>
      //           )}
      //           <Tooltip title="Direct Tip">
      //             <Button
      //               hidden={currentUser?._id === performer._id}
      //               className="normal"
      //               onClick={() => this.setState({ openTipModal: !openTipModal })}
      //             >
      //               <DollarOutlined />
      //             </Button>
      //           </Tooltip>
      //           <Tooltip title="Cross Promotion">
      //             <Button
      //               hidden={currentUser?.analytics?.diamondsEarned < 1000 || !currentUser?.roles?.includes(ROLE_PERMISSIONS.ROLE_HOST_PRIVATE) || !performer?.roles?.includes(ROLE_PERMISSIONS.ROLE_HOST_CROSSPROMOTE) || (currentUser?._id === performer._id) || loading}
      //               className="normal"
      //               onClick={() => Router.push({
      //                 pathname: '/cross-promotion',
      //                 query: { id: performer?._id }
      //               })}
      //             >
      //               <ShakeHandIcon />
      //             </Button>
      //           </Tooltip>
      //           <Tooltip title="Messages">
      //             <Button
      //               hidden={currentUser?._id !== performer._id}
      //               className="normal"
      //               onClick={() => Router.push({
      //                 pathname: '/messages'
      //               })}
      //             >
      //               <MailOutlined />
      //               <Badge className="cart-total" count={totalNotReadMessage} />
      //             </Button>
      //           </Tooltip>
      //           <Popover
      //             title="Share to social network"
      //             content={(
      //               <ShareButtons
      //                 siteName={ui.siteName}
      //                 performer={performer}
      //               />
      //             )}
      //           >
      //             <Button className="normal">
      //               <ShareIcon />
      //             </Button>
      //           </Popover>
      //         </div>
      //       </div>
      //       <div
      //         className={
      //           currentUser?.isPerformer ? 'mar-0 pro-desc' : 'pro-desc'
      //         }
      //       >
      //         {/* Fan Counter */}
      //         <PerformerInfo
      //           countries={countries}
      //           performer={performer}
      //           ranking={performer.ranking}
      //         />
      //       </div>
      //     </div>
      //     <div className="model-content">
      //       <Tabs
      //         defaultActiveKey="photo"
      //         activeKey={tab}
      //         size="large"
      //         onTabClick={(t: string) => {
      //           this.handleTabChange(t);
      //         }}
      //       >
      //         <TabPane
      //           tab={(
      //             <Link href={{ pathname: '/model/profile', query: { username: performer?.username || performer?._id, tab: 'video' } }}>
      //               <a href={`/model/profile?username=${performer?.username || performer?._id}&tab=video`}>
      //                 <VideoCameraOutlined />
      //                 {' '}
      //                 {performer._id === currentUser._id ? performer.stats.totalVideos : performer.stats.totalActiveVideos}
      //               </a>
      //             </Link>
      //           )}
      //           key="video"
      //         >
      //           <div className="heading-tab">
      //             <SearchPostBar
      //               searching={loadingFeed}
      //               tab={tab}
      //               handleSearch={this.handleFilterSearch.bind(this)}
      //               handleViewGrid={(val) => this.setState({ isGrid: val })}
      //             />
      //           </div>
      //           {tab === 'video' && (
      //             <div
      //               className="main-container"
      //             >
      //               <ScrollListFeed
      //                 items={feeds}
      //                 loading={loadingFeed}
      //                 canLoadmore
      //                 loadMore={this.loadMoreItem.bind(this)}
      //                 isGrid={isGrid}
      //                 performer={performer}
      //                 tab={tab}
      //               />
      //             </div>
      //           )}
      //         </TabPane>
      //         <TabPane
      //           tab={(
      //             <Link href={{ pathname: '/model/profile', query: { username: performer?.username || performer?._id, tab: 'photo' } }}>
      //               <a href={`/model/profile?username=${performer?.username || performer?._id}&tab=photo`}>
      //                 <PictureOutlined />
      //                 {' '}
      //                 {performer._id === currentUser._id ? performer.stats.totalPhotos : performer.stats.totalActivePhotos}
      //               </a>
      //             </Link>
      //           )}
      //           key="photo"
      //         >
      //           <div className="heading-tab">
      //             <SearchPostBar
      //               searching={loadingFeed}
      //               tab={tab}
      //               handleSearch={this.handleFilterSearch.bind(this)}
      //               handleViewGrid={(val) => this.setState({ isGrid: val })}
      //             />
      //           </div>
      //           {tab === 'photo' && (
      //             <div className="main-container">
      //               <ScrollListFeed
      //                 items={feeds}
      //                 loading={loadingFeed}
      //                 canLoadmore
      //                 loadMore={this.loadMoreItem.bind(this)}
      //                 isGrid={isGrid}
      //                 performer={performer}
      //                 tab={tab}
      //               />
      //             </div>
      //           )}
      //         </TabPane>
      //       </Tabs>
      //     </div>
      //   </div>
      //   <Modal
      //     key="tip_performer"
      //     className="subscription-modal"
      //     visible={openTipModal}
      //     centered
      //     onOk={() => this.setState({ openTipModal: false })}
      //     footer={null}
      //     width={380}
      //     title={null}
      //     onCancel={() => this.setState({ openTipModal: false })}
      //   >
      //     <TipPerformerForm
      //       performer={performer}
      //       submiting={submiting}
      //       onFinish={this.sendTip.bind(this)}
      //     />
      //   </Modal>
      //   {submiting && <Loader customText="We are processing your payment..." />}
      // </Layout>
      <>
        <Head>
          <title>
            {ui && ui.siteName}
            {' '}
            | Fan Profile
          </title>
        </Head>

        <div>
          {/* Cover photo */}
          <div className='p-5 bg-purple-900 md:h-36 xl:h-72 rounded-xl'>
            <div className='flex items-start justify-between h-full md:justify-start'>
              <div className='inline-flex items-center'>
                <span className="relative flex w-3 h-3 mr-2">
                  {/* <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-alertGreen animate-ping"></span> */}
                  <span className="relative inline-flex w-3 h-3 rounded-full bg-alertGreen"></span>
                </span>

                <span className='text-sm text-white'>Active</span>
              </div>

              <button type="button" className={`md:self-end md:ml-16 xl:ml-36 h-10 z-10 ${buttonVariants()}`}>
                <span> Follow</span>
              </button>
            </div>
          </div>

          <div className='gap-5 pl-5 mb-4 -mt-8 md:-mt-12 xl:mb-8 xl:-mt-16'>
            <div className='flex gap-4'>
              <div className='w-16 h-16 overflow-hidden border-4 border-white rounded-full md:w-32 md:h-32 xl:flex-shrink-0 xl:w-44 xl:h-44'>
                <img className='object-cover w-full h-full' src={'/images/default-avatar.png'} alt="User avatar photo" />
              </div>

              <div className='hidden pt-16 mr-auto xl:pt-20 md:block'>
                <div className='flex items-center gap-2'>
                  <h2 className='text-2xl text-gray-900 xl:text-3xl'>
                    Sarah Macy Jones
                  </h2>

                  <svg className='block w-8 h-8' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <g clipPath="url(#clip0_2241_45931)">
                      <mask id="mask0_2241_45931" maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30">
                        <rect width="30" height="30" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_2241_45931)">
                        <path d="M10.8438 27.75L8.5 23.875L4.09375 22.875L4.5 18.375L1.5 15L4.5 11.625L4.09375 7.125L8.5 6.125L10.8438 2.25L15 4.03125L19.1562 2.25L21.5 6.125L25.9062 7.125L25.5 11.625L28.5 15L25.5 18.375L25.9062 22.875L21.5 23.875L19.1562 27.75L15 25.9688L10.8438 27.75ZM13.4062 19.5L20.8438 12.0938L19.25 10.5L13.4062 16.3125L10.75 13.6875L9.15625 15.2812L13.4062 19.5Z" fill="#2CB1EC" />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_2241_45931">
                        <rect width="30" height="30" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <Link href="/model/account">
                    <AppIcon className="hidden sm:block">
                      <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M4.99997 19H6.2615L16.4981 8.7634L15.2366 7.50188L4.99997 17.7385V19ZM3.5 20.5V17.1154L16.6904 3.93078C16.8416 3.79343 17.0086 3.68729 17.1913 3.61237C17.374 3.53746 17.5656 3.5 17.7661 3.5C17.9666 3.5 18.1608 3.53558 18.3488 3.60675C18.5368 3.6779 18.7032 3.79103 18.848 3.94615L20.0692 5.18268C20.2243 5.32754 20.3349 5.49424 20.4009 5.68278C20.4669 5.87129 20.5 6.05981 20.5 6.24833C20.5 6.44941 20.4656 6.64131 20.3969 6.82403C20.3283 7.00676 20.219 7.17373 20.0692 7.32495L6.88458 20.5H3.5ZM15.8563 8.1437L15.2366 7.50188L16.4981 8.7634L15.8563 8.1437Z" fill="#121212" />
                      </svg>
                    </AppIcon>
                  </Link>
                </div>

                <div className='flex items-end gap-2 mb-4 md:mb-7'>
                  <span className='text-base text-black '>@thesarajones </span>

                  <CopyToClipboard onCopy={() => this.onCopy()} text={'@thesarajones'}>
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <g clipPath="url(#clip0_3328_61555)">
                          <mask id="mask0_3328_61555" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                            <rect width="20" height="20" fill="#D9D9D9" />
                          </mask>
                          <g mask="url(#mask0_3328_61555)">
                            <path d="M7.5 15C7.0875 15 6.73438 14.8531 6.44062 14.5594C6.14687 14.2656 6 13.9125 6 13.5V3.5C6 3.0875 6.14687 2.73438 6.44062 2.44063C6.73438 2.14688 7.0875 2 7.5 2H15.5C15.9125 2 16.2656 2.14688 16.5594 2.44063C16.8531 2.73438 17 3.0875 17 3.5V13.5C17 13.9125 16.8531 14.2656 16.5594 14.5594C16.2656 14.8531 15.9125 15 15.5 15H7.5ZM7.5 13.5H15.5V3.5H7.5V13.5ZM4.5 18C4.0875 18 3.73437 17.8531 3.44062 17.5594C3.14687 17.2656 3 16.9125 3 16.5V5H4.5V16.5H14V18H4.5Z" fill="#D9D9D9" />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_3328_61555">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </CopyToClipboard>

                  {this.state.copied ? <span className='text-xs text-gray-500'>Copied.</span> : null}
                </div>

                <span className='text-base font-semibold text-black'>100 fans</span>
              </div>

              <div className='hidden pt-16 xl:pt-20 md:block'>
                <div className='flex gap-x-3'>
                <AppIcon 
                  onClick={() => updateModals({
                    crossPromotionPurchaseModal: {
                      isOpen: true,
                      performerId: performer._id
                    },
                  })}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <mask id="mask0_2844_37404" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_2844_37404)">
                      <path d="M23.566 10.3558L19.6546 4.50725C19.5492 4.34972 19.3463 4.30216 19.1863 4.39728C18.5638 4.76852 17.8095 4.79051 17.1682 4.45553L15.1739 3.41434C14.2152 2.91382 13.0946 2.86447 12.0988 3.27881L10.2321 4.05576C9.97244 4.16366 9.73676 4.31614 9.53182 4.50637C9.41028 4.4927 9.28703 4.48556 9.16434 4.48556C8.6517 4.48556 8.13675 4.60921 7.67563 4.84283C7.27341 5.04673 6.79094 5.01463 6.41634 4.75931L5.28542 3.98801C5.20628 3.93421 5.11007 3.91519 5.01784 3.9354C4.9256 3.95561 4.84449 4.01327 4.79297 4.0959L1.05789 10.0692C0.950576 10.241 0.996691 10.4714 1.16122 10.5834L2.52867 11.5158C2.66075 11.6059 2.77347 11.7209 2.86285 11.8573C2.95223 11.9941 3.014 12.1453 3.04645 12.307C3.11164 12.6316 3.25539 12.9351 3.45919 13.1871L3.23659 13.5429C2.78599 14.2634 2.9807 15.2323 3.67068 15.7028C3.91433 15.869 4.19644 15.9567 4.48677 15.9567C4.63308 15.9567 4.77597 15.9341 4.91234 15.8922C4.91746 15.9338 4.92372 15.9754 4.93198 16.0167C5.01396 16.4248 5.24311 16.775 5.57727 17.0026C5.82092 17.1688 6.10302 17.2568 6.39363 17.2568C6.54022 17.2568 6.68312 17.2342 6.81946 17.192C6.87269 17.6307 7.10239 18.0429 7.48384 18.303C7.72749 18.4692 8.00959 18.5571 8.29993 18.5571C8.44624 18.5571 8.58913 18.5346 8.72549 18.4923C8.73062 18.534 8.73688 18.5756 8.74514 18.6172C8.82711 19.025 9.05627 19.3751 9.39042 19.6031C9.63408 19.7692 9.91618 19.8569 10.2068 19.8569C10.714 19.8569 11.182 19.5924 11.4587 19.1498L11.6334 18.8707L13.0558 19.8308C13.3075 20.0023 13.5904 20.0843 13.8708 20.0843C14.359 20.0843 14.838 19.8352 15.1244 19.3775C15.29 19.1124 15.3683 18.814 15.3669 18.5188C15.5334 18.5824 15.7065 18.6136 15.8787 18.6136C16.3669 18.6136 16.8459 18.3646 17.1323 17.9068C17.3088 17.6245 17.3859 17.3041 17.3734 16.9902C17.5185 17.0312 17.6683 17.0523 17.8194 17.0523C17.9381 17.0523 18.0577 17.0395 18.1766 17.0134C18.627 16.9147 19.0132 16.6389 19.2649 16.2367C19.4795 15.8934 19.5737 15.4931 19.5378 15.0909C19.7129 15.1512 19.8942 15.1807 20.0744 15.1807C20.6386 15.1807 21.1931 14.8932 21.5218 14.368C21.7052 14.075 21.8019 13.7353 21.8019 13.386C21.8019 13.1351 21.751 12.8858 21.6542 12.6569C21.7541 12.2907 21.9705 11.9727 22.2722 11.7524L23.4782 10.8729C23.639 10.7558 23.6784 10.524 23.566 10.3558ZM4.05989 15.0805C3.69838 14.8341 3.59648 14.3264 3.83245 13.9489L4.4288 12.9957C4.57397 12.7636 4.81933 12.6251 5.08492 12.6251C5.23664 12.6251 5.38408 12.6712 5.51218 12.7586C5.8734 13.005 5.97558 13.5123 5.73961 13.8898L5.14327 14.843C4.99839 15.0749 4.75303 15.2134 4.48688 15.2134C4.33516 15.2137 4.1877 15.1676 4.05989 15.0805ZM5.96646 16.3806C5.7914 16.2611 5.67129 16.0777 5.62829 15.864C5.58531 15.6503 5.62459 15.4321 5.73902 15.2493L6.33537 14.2961C6.48025 14.0643 6.72561 13.9258 6.99149 13.9258C7.14321 13.9258 7.29094 13.9718 7.41875 14.0589C7.59381 14.1784 7.71392 14.3618 7.75692 14.5755C7.79991 14.7892 7.76062 15.0074 7.64619 15.1901L7.04984 16.1434C6.90496 16.3752 6.6596 16.5137 6.39372 16.5137C6.242 16.5137 6.09427 16.4676 5.96646 16.3806ZM7.87303 17.6809C7.51152 17.4345 7.40963 16.9269 7.6456 16.5494L8.24194 15.5962C8.38711 15.3641 8.63248 15.2256 8.89806 15.2256C9.04978 15.2256 9.19722 15.2716 9.32532 15.359C9.68654 15.6054 9.78873 16.1128 9.55276 16.4903L8.95642 17.4435C8.81153 17.6753 8.56617 17.8138 8.30003 17.8138C8.14831 17.8141 8.00085 17.768 7.87303 17.6809ZM10.2069 19.1142C10.0551 19.1142 9.90742 19.0681 9.7799 18.9813C9.60484 18.8618 9.48472 18.6784 9.44173 18.4647C9.39875 18.251 9.43803 18.0329 9.55217 17.8504L9.83311 17.4015L10.1485 16.8971C10.2934 16.6653 10.5387 16.5268 10.8046 16.5268C10.9563 16.5268 11.1041 16.5729 11.2319 16.66C11.4069 16.7794 11.5271 16.9628 11.57 17.1765C11.613 17.3902 11.5737 17.6084 11.4593 17.7912L10.863 18.7444C10.7181 18.9756 10.4727 19.1142 10.2069 19.1142ZM20.9256 13.9621C20.6253 14.4424 20.0033 14.5836 19.5396 14.2769C19.5373 14.2754 19.5356 14.2742 19.5331 14.2727L15.3326 11.4079L14.9435 12.03L18.3751 14.3704C18.6012 14.5246 18.756 14.7612 18.8115 15.037C18.867 15.3129 18.8164 15.5946 18.6686 15.8306C18.5212 16.0666 18.2943 16.2283 18.0302 16.2863C17.766 16.3442 17.4962 16.291 17.2702 16.1371L13.8382 13.7967L13.4491 14.4188L16.309 16.3692C16.6705 16.6156 16.7724 17.1232 16.5364 17.5005C16.3005 17.8779 15.8143 17.9843 15.453 17.7379L14.6905 17.2181L12.5929 15.7878L12.2038 16.4099L14.3013 17.8402C14.6625 18.0866 14.7644 18.5939 14.5285 18.9714C14.414 19.1542 14.2384 19.2796 14.0338 19.3245C13.8291 19.3694 13.6202 19.3284 13.4434 19.208L12.0224 18.2489L12.0549 18.1969C12.2732 17.8479 12.3483 17.4312 12.2664 17.0231C12.1844 16.615 11.9552 16.2649 11.6211 16.0372C11.3774 15.8711 11.0953 15.7834 10.8047 15.7834C10.6581 15.7834 10.5152 15.806 10.3789 15.8482C10.3254 15.4098 10.096 14.9972 9.7145 14.7375C9.47056 14.571 9.18848 14.483 8.89814 14.483C8.75183 14.483 8.60921 14.5056 8.47287 14.5475C8.46774 14.5059 8.46148 14.4643 8.45323 14.423C8.37125 14.0149 8.1421 13.6648 7.80794 13.4371C7.56429 13.2709 7.28218 13.183 6.99158 13.183C6.84498 13.183 6.70209 13.2055 6.56575 13.2477C6.51223 12.8093 6.28282 12.3968 5.90137 12.137C5.65742 11.9706 5.37534 11.8826 5.085 11.8826C4.60452 11.8826 4.15904 12.1204 3.87808 12.5225C3.81517 12.4087 3.76906 12.2844 3.74287 12.1548C3.69135 11.8975 3.59286 11.6564 3.45025 11.4382C3.30764 11.2207 3.12831 11.0373 2.91767 10.8937L1.84852 10.1643L5.19495 4.81364L6.02813 5.38193C6.61053 5.77902 7.36114 5.82866 7.98707 5.51182C8.29533 5.35548 8.63435 5.26156 8.9765 5.2363L7.17126 8.12265C7.06822 8.28731 7.03292 8.48377 7.07163 8.67638C7.11035 8.86869 7.21851 9.03396 7.37621 9.14155L7.51341 9.23517C7.94694 9.53091 8.43482 9.67211 8.91759 9.67211C9.75902 9.67211 10.5848 9.24291 11.0781 8.45408L12 6.97984C12.0883 6.83866 12.2699 6.79912 12.4048 6.89126L20.6326 12.5016C20.7735 12.5976 20.8853 12.724 20.9653 12.8767C21.047 13.0322 21.0903 13.2087 21.0903 13.3862C21.0903 13.5907 21.0332 13.79 20.9256 13.9621ZM21.8643 11.1435C21.5637 11.3625 21.3218 11.6488 21.1527 11.9787C21.1106 11.9436 21.0664 11.9103 21.0212 11.8794L12.7939 6.26878C12.6248 6.15346 12.4347 6.09847 12.2463 6.09847C11.9183 6.09847 11.5964 6.26582 11.404 6.57346L10.482 8.0477C9.9201 8.94622 8.76272 9.19976 7.90215 8.61303L7.77064 8.52326L9.71593 5.4132C9.90494 5.11092 10.1748 4.88057 10.4959 4.74683L12.3626 3.96988C13.1699 3.63371 14.0785 3.67384 14.8557 4.07955L16.85 5.12075C17.606 5.51545 18.4805 5.53805 19.2464 5.19535L22.7787 10.477L21.8643 11.1435Z" fill="black" stroke="black" strokeWidth="0.6" />
                    </g>
                  </svg>
                </AppIcon>
                  <AppIcon onClick={() => updateModals({ isDonateRubiesModalOpen: true })}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                      <path d="M11.304 7.58281L12.3332 5.70741C11.6471 5.42153 10.961 5.25 10.2177 5.25C8.95977 5.25 7.75906 5.70741 6.84424 6.50789L7.35883 8.10883L11.304 7.58281Z" fill="url(#paint0_linear_2279_36286)" />
                      <path d="M23.4256 8.05166L23.9402 6.50789C22.9682 5.70741 21.8246 5.25 20.5667 5.25C19.8234 5.25 19.0516 5.42153 18.4226 5.70741L19.4804 7.59424L23.4256 8.05166Z" fill="url(#paint1_linear_2279_36286)" />
                      <path d="M12.848 5.93647C12.6764 5.82212 12.5621 5.78209 12.3334 5.70776L11.3042 7.58316L15.3637 8.85248C14.8492 7.59459 13.9343 6.62259 12.848 5.93647Z" fill="url(#paint2_linear_2279_36286)" />
                      <path d="M17.8795 5.93647C16.7932 6.56541 15.8784 7.59459 15.3638 8.85248L19.4805 7.59459L18.4227 5.70776C18.2512 5.82212 18.0739 5.8164 17.8795 5.93647Z" fill="url(#paint3_linear_2279_36286)" />
                      <path d="M8.90277 20.1161C9.24583 20.4592 9.70325 20.8023 10.0463 21.1453L8.38818 16.3997L8.90277 20.1161Z" fill="url(#paint4_linear_2279_36286)" />
                      <path d="M20.7383 21.1453C21.1385 20.8023 21.4816 20.402 21.8246 20.1161L22.3392 16.3997L20.7383 21.1453Z" fill="url(#paint5_linear_2279_36286)" />
                      <path d="M15.3637 19.3728L18.1082 17.143L19.4233 13.8267L17.5365 11.1394H13.191L11.3042 13.8267L12.6193 17.143L15.3637 19.3728Z" fill="url(#paint6_linear_2279_36286)" />
                      <path d="M11.3038 13.8265L13.1906 11.1392L11.3038 7.58276L7.35857 8.10879L5.98633 11.3107L11.3038 13.8265Z" fill="url(#paint7_linear_2279_36286)" />
                      <path d="M5.2433 11.1103L4.5 10.9102C4.5 11.1389 4.5 11.4247 4.5 11.7106C4.5 12.6255 4.72871 13.5975 5.07177 14.5695L5.52918 12.9113L5.2433 11.1103Z" fill="url(#paint8_linear_2279_36286)" />
                      <path d="M5.24341 11.1108L5.52929 12.9119L5.9867 11.311L5.24341 11.1108Z" fill="url(#paint9_linear_2279_36286)" />
                      <path d="M19.4232 13.8267L24.7978 11.311L23.4256 8.0519L19.4804 7.59448L17.5364 11.1394L19.4232 13.8267Z" fill="url(#paint10_linear_2279_36286)" />
                      <path d="M24.7976 11.3109L25.1978 12.9119L25.5409 11.1394L24.7976 11.3109Z" fill="url(#paint11_linear_2279_36286)" />
                      <path d="M25.1978 12.9113L25.7123 14.5695C26.0554 13.5975 26.2269 12.6255 26.2269 11.7106C26.2269 11.4247 26.2841 11.196 26.2269 10.9102L25.5408 11.1389L25.1978 12.9113Z" fill="url(#paint12_linear_2279_36286)" />
                      <path d="M5.98647 11.3108L5.52905 12.9117L8.38789 16.3995L11.3039 13.8266L5.98647 11.3108Z" fill="url(#paint13_linear_2279_36286)" />
                      <path d="M6.64404 17.486C7.04428 18.0578 7.4731 18.6295 7.93052 19.1441C8.2164 19.4872 8.55946 19.7731 8.90252 20.1161L8.38793 16.3997L6.64404 17.486Z" fill="url(#paint14_linear_2279_36286)" />
                      <path d="M5.52919 12.9119L5.07178 14.57C5.47201 15.542 5.95802 16.514 6.64414 17.486L8.38802 16.3996L5.52919 12.9119Z" fill="url(#paint15_linear_2279_36286)" />
                      <path d="M11.3042 13.8267L8.38818 16.3996L11.7616 18.5151L12.6193 17.1429L11.3042 13.8267Z" fill="url(#paint16_linear_2279_36286)" />
                      <path d="M11.7616 18.5152L8.38818 16.3997L10.0463 21.1453L11.7616 18.5152Z" fill="url(#paint17_linear_2279_36286)" />
                      <path d="M18.1079 17.1429L19.0227 18.5151L22.339 16.3996L19.423 13.8267L18.1079 17.1429Z" fill="url(#paint18_linear_2279_36286)" />
                      <path d="M19.0229 18.5152L20.7382 21.1453L22.3392 16.3997L19.0229 18.5152Z" fill="url(#paint19_linear_2279_36286)" />
                      <path d="M21.8247 20.1161C22.1678 19.7731 22.5108 19.4872 22.7967 19.1441C23.4257 18.4008 24.0546 17.6575 24.512 16.9142L22.3393 16.3997L21.8247 20.1161Z" fill="url(#paint20_linear_2279_36286)" />
                      <path d="M25.1982 12.9119L22.3394 16.3996L24.5121 16.9142C25.0267 16.1138 25.4269 15.3705 25.7128 14.57L25.1982 12.9119Z" fill="url(#paint21_linear_2279_36286)" />
                      <path d="M19.4231 13.8266L22.3391 16.3995L25.1979 12.9117L24.7977 11.3108L19.4231 13.8266Z" fill="url(#paint22_linear_2279_36286)" />
                      <path d="M17.5363 11.1391L15.3636 8.85205L13.1909 11.1391H17.5363Z" fill="url(#paint23_linear_2279_36286)" />
                      <path d="M15.3637 8.85209L11.3042 7.58276L13.191 11.1392L15.3637 8.85209Z" fill="url(#paint24_linear_2279_36286)" />
                      <path d="M19.4805 7.59448L15.3638 8.85237L17.5365 11.1394L19.4805 7.59448Z" fill="url(#paint25_linear_2279_36286)" />
                      <path d="M19.0231 18.5149L15.3638 19.3725L17.5937 23.6608C18.3941 23.0318 19.309 22.3457 20.1666 21.6024C20.3381 21.4309 20.5668 21.3165 20.7384 21.145L19.0231 18.5149Z" fill="url(#paint26_linear_2279_36286)" />
                      <path d="M15.3638 19.373L19.0231 18.5153L18.1082 17.1431L15.3638 19.373Z" fill="url(#paint27_linear_2279_36286)" />
                      <path d="M11.7617 18.5149L10.0464 21.145C10.2179 21.3165 10.3894 21.4309 10.561 21.6024C11.4758 22.4029 12.3906 23.1462 13.1911 23.7751L15.3638 19.3725L11.7617 18.5149Z" fill="url(#paint28_linear_2279_36286)" />
                      <path d="M12.6194 17.1431L11.7617 18.5153L15.3638 19.373L12.6194 17.1431Z" fill="url(#paint29_linear_2279_36286)" />
                      <path d="M15.3638 25.2618C15.3638 25.2618 17.5365 23.7181 17.5937 23.6609L15.3638 24.2898V25.2618Z" fill="url(#paint30_linear_2279_36286)" />
                      <path d="M15.3638 19.3726V24.2898L17.5937 23.6608L15.3638 19.3726Z" fill="url(#paint31_linear_2279_36286)" />
                      <path d="M15.3636 24.2898V19.3726L13.1909 23.7752L15.3636 24.2898Z" fill="url(#paint32_linear_2279_36286)" />
                      <path d="M15.3635 24.2897L13.1908 23.7751C13.1336 23.7751 13.248 23.7751 13.1908 23.7751C14.3915 24.69 15.3635 25.2617 15.3635 25.2617V24.2897Z" fill="url(#paint33_linear_2279_36286)" />
                      <path d="M26.2271 10.9106C26.2271 10.7391 26.17 10.5676 26.17 10.3389L25.541 11.1393L26.2271 10.9106Z" fill="url(#paint34_linear_2279_36286)" />
                      <path d="M23.9399 6.50757L23.4253 8.05134L24.7975 11.3104L25.5408 11.1389L26.1698 10.3384C25.8267 8.79463 25.0262 7.42239 23.9399 6.50757Z" fill="url(#paint35_linear_2279_36286)" />
                      <path d="M4.5 10.9106L5.2433 11.1107L4.61435 10.396C4.61435 10.5675 4.55718 10.7391 4.5 10.9106Z" fill="url(#paint36_linear_2279_36286)" />
                      <path d="M6.84415 6.50757C5.70061 7.42239 4.90014 8.79464 4.61426 10.3956L5.2432 11.1103L5.9865 11.3104L7.35874 8.10851L6.84415 6.50757Z" fill="url(#paint37_linear_2279_36286)" />
                      <path d="M13.1909 11.1394H17.5363L19.4232 13.8267L17.5363 11.1394H13.1909Z" fill="url(#paint38_linear_2279_36286)" />
                      <defs>
                        <linearGradient id="paint0_linear_2279_36286" x1="6.7236" y1="-6.37607" x2="11.1744" y2="13.0168" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.425" stopColor="#F59596" />
                          <stop offset="0.5961" stopColor="#F0575B" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_2279_36286" x1="21.5489" y1="-0.214488" x2="20.6565" y2="15.1376" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.425" stopColor="#F59596" />
                          <stop offset="0.5961" stopColor="#F0575B" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint2_linear_2279_36286" x1="17.6756" y1="-8.155" x2="12.3273" y2="12.0122" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.3685" stopColor="#F69D9D" />
                          <stop offset="0.4447" stopColor="#F27072" />
                          <stop offset="0.5179" stopColor="#F04C50" />
                          <stop offset="0.5865" stopColor="#EE3338" />
                          <stop offset="0.6485" stopColor="#EC2329" />
                          <stop offset="0.6983" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint3_linear_2279_36286" x1="16.0529" y1="-5.39709" x2="17.9669" y2="13.6428" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.425" stopColor="#F59596" />
                          <stop offset="0.5961" stopColor="#F0575B" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint4_linear_2279_36286" x1="-3.51662" y1="26.5924" x2="16.2278" y2="14.4673" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F6BE95" />
                          <stop offset="0.4173" stopColor="#F4A684" />
                          <stop offset="0.5734" stopColor="#F16858" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint5_linear_2279_36286" x1="25.2618" y1="25.0639" x2="18.9512" y2="14.3998" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.425" stopColor="#F59596" />
                          <stop offset="0.5961" stopColor="#F0575B" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint6_linear_2279_36286" x1="-8.9934" y1="2.38097" x2="22.5883" y2="18.3616" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.425" stopColor="#F59596" />
                          <stop offset="0.5961" stopColor="#F0575B" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#8E0329" />
                        </linearGradient>
                        <linearGradient id="paint7_linear_2279_36286" x1="-6.89689" y1="-4.70238" x2="20.1114" y2="19.8829" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.4015" stopColor="#F59596" />
                          <stop offset="0.5231" stopColor="#F0575B" />
                          <stop offset="0.6271" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint8_linear_2279_36286" x1="2.38549" y1="12.5009" x2="9.56282" y2="13.2153" gradientUnits="userSpaceOnUse">
                          <stop offset="0.2064" stopColor="#F9D19B" />
                          <stop offset="0.285" stopColor="#F7B98B" />
                          <stop offset="0.4516" stopColor="#F37B62" />
                          <stop offset="0.6764" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint9_linear_2279_36286" x1="-2.79294" y1="13.8044" x2="9.02999" y2="11.2126" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7BE80" />
                          <stop offset="0.4576" stopColor="#F4A669" />
                          <stop offset="0.6976" stopColor="#ED682F" />
                          <stop offset="0.7423" stopColor="#EC5C24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint10_linear_2279_36286" x1="24.7756" y1="5.20021" x2="14.0828" y2="22.4466" gradientUnits="userSpaceOnUse">
                          <stop offset="0.1104" stopColor="#F6A9A7" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.425" stopColor="#F59596" />
                          <stop offset="0.5961" stopColor="#F0575B" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint11_linear_2279_36286" x1="32.2879" y1="14.3894" x2="21.915" y2="10.8454" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.425" stopColor="#F59596" />
                          <stop offset="0.5961" stopColor="#F0575B" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint12_linear_2279_36286" x1="30.2434" y1="13.3788" x2="19.2861" y2="11.7405" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.0335" stopColor="#DA7079" />
                          <stop offset="0.1635" stopColor="#EA9195" />
                          <stop offset="0.2715" stopColor="#F3A6A7" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.425" stopColor="#F59596" />
                          <stop offset="0.5961" stopColor="#F0575B" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint13_linear_2279_36286" x1="-8.66431" y1="13.8552" x2="16.4716" y2="13.8552" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7BE80" />
                          <stop offset="0.4173" stopColor="#F5A672" />
                          <stop offset="0.5734" stopColor="#F1684E" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint14_linear_2279_36286" x1="-11.3108" y1="21.2609" x2="12.9946" y2="17.6034" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.4182" stopColor="#F59596" />
                          <stop offset="0.575" stopColor="#F0575B" />
                          <stop offset="0.709" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint15_linear_2279_36286" x1="-1.34813" y1="18.2641" x2="11.1657" y2="13.105" gradientUnits="userSpaceOnUse">
                          <stop offset="0.2064" stopColor="#F9A11B" />
                          <stop offset="0.3102" stopColor="#F7891D" />
                          <stop offset="0.5284" stopColor="#F04B21" />
                          <stop offset="0.6764" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint16_linear_2279_36286" x1="-7.09823" y1="21.6537" x2="17.7641" y2="14.3372" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.3818" stopColor="#F59596" />
                          <stop offset="0.4621" stopColor="#F0575B" />
                          <stop offset="0.5307" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint17_linear_2279_36286" x1="-7.69984" y1="29.8054" x2="14.927" y2="15.0487" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.425" stopColor="#F59596" />
                          <stop offset="0.5961" stopColor="#F0575B" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint18_linear_2279_36286" x1="-3.32391" y1="28.3702" x2="22.8036" y2="14.2335" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.425" stopColor="#F59596" />
                          <stop offset="0.5961" stopColor="#F0575B" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint19_linear_2279_36286" x1="34.1962" y1="31.3279" x2="16.0013" y2="13.2797" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.425" stopColor="#F59596" />
                          <stop offset="0.5961" stopColor="#F0575B" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint20_linear_2279_36286" x1="26.5849" y1="31.7211" x2="21.1927" y2="10.879" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.5299" stopColor="#F16366" />
                          <stop offset="0.6723" stopColor="#ED3136" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint21_linear_2279_36286" x1="27.3549" y1="24.6457" x2="22.286" y2="10.5252" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.3897" stopColor="#F59A95" />
                          <stop offset="0.4869" stopColor="#F16857" />
                          <stop offset="0.4961" stopColor="#F16351" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint22_linear_2279_36286" x1="20.0754" y1="1.75463" x2="24.1467" y2="22.911" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.425" stopColor="#F59596" />
                          <stop offset="0.5961" stopColor="#F0575B" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint23_linear_2279_36286" x1="15.3174" y1="-3.698" x2="15.372" y2="13.8211" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.425" stopColor="#F59596" />
                          <stop offset="0.5961" stopColor="#F0575B" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint24_linear_2279_36286" x1="15.9635" y1="-1.5611" x2="11.854" y2="13.719" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.2435" stopColor="#F7ADAD" />
                          <stop offset="0.3153" stopColor="#F59596" />
                          <stop offset="0.466" stopColor="#F0575B" />
                          <stop offset="0.5948" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint25_linear_2279_36286" x1="12.7051" y1="1.54542" x2="21.0147" y2="13.3096" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.425" stopColor="#F59596" />
                          <stop offset="0.5961" stopColor="#F0575B" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint26_linear_2279_36286" x1="20.2084" y1="33.8659" x2="17.3734" y2="15.9761" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.3978" stopColor="#F59697" />
                          <stop offset="0.5614" stopColor="#F05659" />
                          <stop offset="0.6807" stopColor="#ED2D33" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint27_linear_2279_36286" x1="16.6254" y1="5.13608" x2="17.3532" y2="22.7972" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.425" stopColor="#F59596" />
                          <stop offset="0.5961" stopColor="#F0575B" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint28_linear_2279_36286" x1="-18.4893" y1="24.1926" x2="20.5178" y2="20.3536" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7BE80" />
                          <stop offset="0.4227" stopColor="#F5A672" />
                          <stop offset="0.5903" stopColor="#F1684E" />
                          <stop offset="0.7717" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint29_linear_2279_36286" x1="1.33687" y1="26.5394" x2="18.5814" y2="15.2553" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.425" stopColor="#F59596" />
                          <stop offset="0.5961" stopColor="#F0575B" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint30_linear_2279_36286" x1="19.7952" y1="33.8956" x2="14.5692" y2="19.0295" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.425" stopColor="#F59596" />
                          <stop offset="0.5961" stopColor="#F0575B" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint31_linear_2279_36286" x1="32.5022" y1="25.2901" x2="12.1924" y2="21.1908" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.425" stopColor="#F59596" />
                          <stop offset="0.5961" stopColor="#F0575B" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint32_linear_2279_36286" x1="-1.0463" y1="19.4867" x2="19.1339" y2="22.3696" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.425" stopColor="#F59596" />
                          <stop offset="0.5961" stopColor="#F0575B" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint33_linear_2279_36286" x1="7.56235" y1="32.2133" x2="16.1326" y2="22.3801" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.4133" stopColor="#F59596" />
                          <stop offset="0.5598" stopColor="#F0575B" />
                          <stop offset="0.6849" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint34_linear_2279_36286" x1="32.0533" y1="10.9973" x2="20.5727" y2="10.519" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.425" stopColor="#F59596" />
                          <stop offset="0.5961" stopColor="#F0575B" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint35_linear_2279_36286" x1="30.1749" y1="3.17177" x2="18.0571" y2="15.7731" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.425" stopColor="#F59596" />
                          <stop offset="0.5961" stopColor="#F0575B" />
                          <stop offset="0.7423" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint36_linear_2279_36286" x1="1.9844" y1="10.3497" x2="7.55152" y2="11.1129" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#D56671" />
                          <stop offset="0.3436" stopColor="#F7BE80" />
                          <stop offset="0.4576" stopColor="#F4A669" />
                          <stop offset="0.6976" stopColor="#ED682F" />
                          <stop offset="0.7423" stopColor="#EC5C24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint37_linear_2279_36286" x1="3.66896" y1="7.46065" x2="10.0223" y2="11.0679" gradientUnits="userSpaceOnUse">
                          <stop offset="0.2388" stopColor="#F9DAC9" />
                          <stop offset="0.3198" stopColor="#F7C2B4" />
                          <stop offset="0.4914" stopColor="#F3847D" />
                          <stop offset="0.7382" stopColor="#EC2126" />
                          <stop offset="0.7446" stopColor="#EC1E24" />
                          <stop offset="1" stopColor="#7A0025" />
                        </linearGradient>
                        <linearGradient id="paint38_linear_2279_36286" x1="17.1463" y1="10.8762" x2="16.6706" y2="11.787" gradientUnits="userSpaceOnUse">
                          <stop offset="0.3436" stopColor="#F7ADAD" />
                          <stop offset="0.4777" stopColor="#F59596" />
                          <stop offset="0.7593" stopColor="#F0575B" />
                          <stop offset="1" stopColor="#EC1E24" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </AppIcon>

                  <AppIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <mask id="a" width="24" height="24" x="0" y="0" maskUnits="userSpaceOnUse">
                        <path fill="#D9D9D9" d="M0 0h24v24H0z" />
                      </mask>
                      <g mask="url(#a)">
                        <path fill="#121212" d="M4.308 19.5c-.505 0-.933-.175-1.283-.525a1.745 1.745 0 0 1-.525-1.283V6.308c0-.505.175-.933.525-1.283.35-.35.778-.525 1.283-.525h15.384c.505 0 .933.175 1.283.525.35.35.525.778.525 1.283v11.384c0 .505-.175.933-.525 1.283-.35.35-.778.525-1.283.525H4.308ZM12 12.558 4 7.442v10.25a.3.3 0 0 0 .087.221.3.3 0 0 0 .22.087h15.385a.3.3 0 0 0 .221-.087.3.3 0 0 0 .087-.22V7.442l-8 5.115ZM12 11l7.846-5H4.154L12 11ZM4 7.442V6v11.692a.3.3 0 0 0 .087.221.3.3 0 0 0 .22.087H4V7.442Z" />
                      </g>
                    </svg>
                  </AppIcon>

                  <AppIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <mask id="a" width="24" height="24" x="0" y="0" maskUnits="userSpaceOnUse">
                        <path fill="#D9D9D9" d="M0 0h24v24H0z" />
                      </mask>
                      <g mask="url(#a)">
                        <path fill="#1C1B1F" d="M7.75 14.394V8.702c0-.499.177-.925.53-1.278.353-.353.78-.53 1.278-.53h8.553L15.287 4.07 16.357 3 21 7.644l-4.644 4.654-1.07-1.054 2.825-2.85H9.558a.3.3 0 0 0-.222.087.3.3 0 0 0-.086.221v5.692h-1.5Zm-1.942 5.75c-.499 0-.925-.176-1.278-.53A1.742 1.742 0 0 1 4 18.337V3.952h1.5v14.385a.3.3 0 0 0 .087.22.3.3 0 0 0 .22.087h11.385a.3.3 0 0 0 .221-.086.3.3 0 0 0 .087-.221v-3.943H19v3.943c0 .498-.177.924-.53 1.277a1.74 1.74 0 0 1-1.278.53H5.808Z" />
                      </g>
                    </svg>

                  </AppIcon>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full mt-3 mb-6 md:hidden'>
            <div className=''>
              <div className=''>
                <div className='flex items-center gap-2'>
                  <h2 className='text-2xl text-gray-900 xl:text-3xl'>
                    Sarah Macy Jones
                  </h2>

                  <svg className='block w-8 h-8' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <g clipPath="url(#clip0_2241_45931)">
                      <mask id="mask0_2241_45931" maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30">
                        <rect width="30" height="30" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_2241_45931)">
                        <path d="M10.8438 27.75L8.5 23.875L4.09375 22.875L4.5 18.375L1.5 15L4.5 11.625L4.09375 7.125L8.5 6.125L10.8438 2.25L15 4.03125L19.1562 2.25L21.5 6.125L25.9062 7.125L25.5 11.625L28.5 15L25.5 18.375L25.9062 22.875L21.5 23.875L19.1562 27.75L15 25.9688L10.8438 27.75ZM13.4062 19.5L20.8438 12.0938L19.25 10.5L13.4062 16.3125L10.75 13.6875L9.15625 15.2812L13.4062 19.5Z" fill="#2CB1EC" />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_2241_45931">
                        <rect width="30" height="30" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>

                <div className='flex items-end gap-2 mb-4 md:mb-7'>
                  <span className='text-base text-black '>@thesarajones </span>

                  <CopyToClipboard onCopy={() => this.onCopy()} text={'@thesarajones'}>
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <g clipPath="url(#clip0_3328_61555)">
                          <mask id="mask0_3328_61555" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                            <rect width="20" height="20" fill="#D9D9D9" />
                          </mask>
                          <g mask="url(#mask0_3328_61555)">
                            <path d="M7.5 15C7.0875 15 6.73438 14.8531 6.44062 14.5594C6.14687 14.2656 6 13.9125 6 13.5V3.5C6 3.0875 6.14687 2.73438 6.44062 2.44063C6.73438 2.14688 7.0875 2 7.5 2H15.5C15.9125 2 16.2656 2.14688 16.5594 2.44063C16.8531 2.73438 17 3.0875 17 3.5V13.5C17 13.9125 16.8531 14.2656 16.5594 14.5594C16.2656 14.8531 15.9125 15 15.5 15H7.5ZM7.5 13.5H15.5V3.5H7.5V13.5ZM4.5 18C4.0875 18 3.73437 17.8531 3.44062 17.5594C3.14687 17.2656 3 16.9125 3 16.5V5H4.5V16.5H14V18H4.5Z" fill="#D9D9D9" />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_3328_61555">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </CopyToClipboard>

                  {this.state.copied ? <span className='text-xs text-gray-500'>Copied.</span> : null}
                </div>

                <div className='flex items-center'>
                  <span className='mr-auto text-base font-semibold text-black'>100 fans</span>

                  <div className='flex gap-x-3'>
                    <AppIcon>
                      <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M4.99997 19H6.2615L16.4981 8.7634L15.2366 7.50188L4.99997 17.7385V19ZM3.5 20.5V17.1154L16.6904 3.93078C16.8416 3.79343 17.0086 3.68729 17.1913 3.61237C17.374 3.53746 17.5656 3.5 17.7661 3.5C17.9666 3.5 18.1608 3.53558 18.3488 3.60675C18.5368 3.6779 18.7032 3.79103 18.848 3.94615L20.0692 5.18268C20.2243 5.32754 20.3349 5.49424 20.4009 5.68278C20.4669 5.87129 20.5 6.05981 20.5 6.24833C20.5 6.44941 20.4656 6.64131 20.3969 6.82403C20.3283 7.00676 20.219 7.17373 20.0692 7.32495L6.88458 20.5H3.5ZM15.8563 8.1437L15.2366 7.50188L16.4981 8.7634L15.8563 8.1437Z" fill="#121212" />
                      </svg>
                    </AppIcon>

                    <AppIcon onClick={() => updateModals({ isDonateRubiesModalOpen: true })}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                        <path d="M11.804 7.58281L12.8332 5.70741C12.1471 5.42153 11.461 5.25 10.7177 5.25C9.45977 5.25 8.25906 5.70741 7.34424 6.50789L7.85883 8.10883L11.804 7.58281Z" fill="url(#paint0_linear_2324_44469)" />
                        <path d="M23.9256 8.05166L24.4402 6.50789C23.4682 5.70741 22.3246 5.25 21.0667 5.25C20.3234 5.25 19.5516 5.42153 18.9226 5.70741L19.9804 7.59424L23.9256 8.05166Z" fill="url(#paint1_linear_2324_44469)" />
                        <path d="M13.348 5.93647C13.1764 5.82212 13.0621 5.78209 12.8334 5.70776L11.8042 7.58316L15.8637 8.85248C15.3492 7.59459 14.4343 6.62259 13.348 5.93647Z" fill="url(#paint2_linear_2324_44469)" />
                        <path d="M18.3795 5.93647C17.2932 6.56541 16.3784 7.59459 15.8638 8.85248L19.9805 7.59459L18.9227 5.70776C18.7512 5.82212 18.5739 5.8164 18.3795 5.93647Z" fill="url(#paint3_linear_2324_44469)" />
                        <path d="M9.40277 20.1161C9.74583 20.4592 10.2032 20.8023 10.5463 21.1453L8.88818 16.3997L9.40277 20.1161Z" fill="url(#paint4_linear_2324_44469)" />
                        <path d="M21.2383 21.1453C21.6385 20.8023 21.9816 20.402 22.3246 20.1161L22.8392 16.3997L21.2383 21.1453Z" fill="url(#paint5_linear_2324_44469)" />
                        <path d="M15.8637 19.3728L18.6082 17.143L19.9233 13.8267L18.0365 11.1394H13.691L11.8042 13.8267L13.1193 17.143L15.8637 19.3728Z" fill="url(#paint6_linear_2324_44469)" />
                        <path d="M11.8038 13.8265L13.6906 11.1392L11.8038 7.58276L7.85857 8.10879L6.48633 11.3107L11.8038 13.8265Z" fill="url(#paint7_linear_2324_44469)" />
                        <path d="M5.7433 11.1103L5 10.9102C5 11.1389 5 11.4247 5 11.7106C5 12.6255 5.22871 13.5975 5.57177 14.5695L6.02918 12.9113L5.7433 11.1103Z" fill="url(#paint8_linear_2324_44469)" />
                        <path d="M5.74341 11.1108L6.02929 12.9119L6.4867 11.311L5.74341 11.1108Z" fill="url(#paint9_linear_2324_44469)" />
                        <path d="M19.9232 13.8267L25.2978 11.311L23.9256 8.0519L19.9804 7.59448L18.0364 11.1394L19.9232 13.8267Z" fill="url(#paint10_linear_2324_44469)" />
                        <path d="M25.2976 11.3109L25.6978 12.9119L26.0409 11.1394L25.2976 11.3109Z" fill="url(#paint11_linear_2324_44469)" />
                        <path d="M25.6978 12.9113L26.2123 14.5695C26.5554 13.5975 26.7269 12.6255 26.7269 11.7106C26.7269 11.4247 26.7841 11.196 26.7269 10.9102L26.0408 11.1389L25.6978 12.9113Z" fill="url(#paint12_linear_2324_44469)" />
                        <path d="M6.48647 11.3108L6.02905 12.9117L8.88789 16.3995L11.8039 13.8266L6.48647 11.3108Z" fill="url(#paint13_linear_2324_44469)" />
                        <path d="M7.14404 17.486C7.54428 18.0578 7.9731 18.6295 8.43052 19.1441C8.7164 19.4872 9.05946 19.7731 9.40252 20.1161L8.88793 16.3997L7.14404 17.486Z" fill="url(#paint14_linear_2324_44469)" />
                        <path d="M6.02919 12.9119L5.57178 14.57C5.97201 15.542 6.45802 16.514 7.14414 17.486L8.88802 16.3996L6.02919 12.9119Z" fill="url(#paint15_linear_2324_44469)" />
                        <path d="M11.8042 13.8267L8.88818 16.3996L12.2616 18.5151L13.1193 17.1429L11.8042 13.8267Z" fill="url(#paint16_linear_2324_44469)" />
                        <path d="M12.2616 18.5152L8.88818 16.3997L10.5463 21.1453L12.2616 18.5152Z" fill="url(#paint17_linear_2324_44469)" />
                        <path d="M18.6079 17.1429L19.5227 18.5151L22.839 16.3996L19.923 13.8267L18.6079 17.1429Z" fill="url(#paint18_linear_2324_44469)" />
                        <path d="M19.5229 18.5152L21.2382 21.1453L22.8392 16.3997L19.5229 18.5152Z" fill="url(#paint19_linear_2324_44469)" />
                        <path d="M22.3247 20.1161C22.6678 19.7731 23.0108 19.4872 23.2967 19.1441C23.9257 18.4008 24.5546 17.6575 25.012 16.9142L22.8393 16.3997L22.3247 20.1161Z" fill="url(#paint20_linear_2324_44469)" />
                        <path d="M25.6982 12.9119L22.8394 16.3996L25.0121 16.9142C25.5267 16.1138 25.9269 15.3705 26.2128 14.57L25.6982 12.9119Z" fill="url(#paint21_linear_2324_44469)" />
                        <path d="M19.9231 13.8266L22.8391 16.3995L25.6979 12.9117L25.2977 11.3108L19.9231 13.8266Z" fill="url(#paint22_linear_2324_44469)" />
                        <path d="M18.0363 11.1391L15.8636 8.85205L13.6909 11.1391H18.0363Z" fill="url(#paint23_linear_2324_44469)" />
                        <path d="M15.8637 8.85209L11.8042 7.58276L13.691 11.1392L15.8637 8.85209Z" fill="url(#paint24_linear_2324_44469)" />
                        <path d="M19.9805 7.59448L15.8638 8.85237L18.0365 11.1394L19.9805 7.59448Z" fill="url(#paint25_linear_2324_44469)" />
                        <path d="M19.5231 18.5149L15.8638 19.3725L18.0937 23.6608C18.8941 23.0318 19.809 22.3457 20.6666 21.6024C20.8381 21.4309 21.0668 21.3165 21.2384 21.145L19.5231 18.5149Z" fill="url(#paint26_linear_2324_44469)" />
                        <path d="M15.8638 19.373L19.5231 18.5153L18.6082 17.1431L15.8638 19.373Z" fill="url(#paint27_linear_2324_44469)" />
                        <path d="M12.2617 18.5149L10.5464 21.145C10.7179 21.3165 10.8894 21.4309 11.061 21.6024C11.9758 22.4029 12.8906 23.1462 13.6911 23.7751L15.8638 19.3725L12.2617 18.5149Z" fill="url(#paint28_linear_2324_44469)" />
                        <path d="M13.1194 17.1431L12.2617 18.5153L15.8638 19.373L13.1194 17.1431Z" fill="url(#paint29_linear_2324_44469)" />
                        <path d="M15.8638 25.2618C15.8638 25.2618 18.0365 23.7181 18.0937 23.6609L15.8638 24.2898V25.2618Z" fill="url(#paint30_linear_2324_44469)" />
                        <path d="M15.8638 19.3726V24.2898L18.0937 23.6608L15.8638 19.3726Z" fill="url(#paint31_linear_2324_44469)" />
                        <path d="M15.8636 24.2898V19.3726L13.6909 23.7752L15.8636 24.2898Z" fill="url(#paint32_linear_2324_44469)" />
                        <path d="M15.8635 24.2897L13.6908 23.7751C13.6336 23.7751 13.748 23.7751 13.6908 23.7751C14.8915 24.69 15.8635 25.2617 15.8635 25.2617V24.2897Z" fill="url(#paint33_linear_2324_44469)" />
                        <path d="M26.7271 10.9106C26.7271 10.7391 26.67 10.5676 26.67 10.3389L26.041 11.1393L26.7271 10.9106Z" fill="url(#paint34_linear_2324_44469)" />
                        <path d="M24.4399 6.50757L23.9253 8.05134L25.2975 11.3104L26.0408 11.1389L26.6698 10.3384C26.3267 8.79463 25.5262 7.42239 24.4399 6.50757Z" fill="url(#paint35_linear_2324_44469)" />
                        <path d="M5 10.9106L5.7433 11.1107L5.11435 10.396C5.11435 10.5675 5.05718 10.7391 5 10.9106Z" fill="url(#paint36_linear_2324_44469)" />
                        <path d="M7.34415 6.50757C6.20061 7.42239 5.40014 8.79464 5.11426 10.3956L5.7432 11.1103L6.4865 11.3104L7.85874 8.10851L7.34415 6.50757Z" fill="url(#paint37_linear_2324_44469)" />
                        <path d="M13.6909 11.1394H18.0363L19.9232 13.8267L18.0363 11.1394H13.6909Z" fill="url(#paint38_linear_2324_44469)" />
                        <defs>
                          <linearGradient id="paint0_linear_2324_44469" x1="7.2236" y1="-6.37607" x2="11.6744" y2="13.0168" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.425" stop-color="#F59596" />
                            <stop offset="0.5961" stop-color="#F0575B" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint1_linear_2324_44469" x1="22.0489" y1="-0.214488" x2="21.1565" y2="15.1376" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.425" stop-color="#F59596" />
                            <stop offset="0.5961" stop-color="#F0575B" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint2_linear_2324_44469" x1="18.1756" y1="-8.155" x2="12.8273" y2="12.0122" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.3685" stop-color="#F69D9D" />
                            <stop offset="0.4447" stop-color="#F27072" />
                            <stop offset="0.5179" stop-color="#F04C50" />
                            <stop offset="0.5865" stop-color="#EE3338" />
                            <stop offset="0.6485" stop-color="#EC2329" />
                            <stop offset="0.6983" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint3_linear_2324_44469" x1="16.5529" y1="-5.39709" x2="18.4669" y2="13.6428" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.425" stop-color="#F59596" />
                            <stop offset="0.5961" stop-color="#F0575B" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint4_linear_2324_44469" x1="-3.01662" y1="26.5924" x2="16.7278" y2="14.4673" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F6BE95" />
                            <stop offset="0.4173" stop-color="#F4A684" />
                            <stop offset="0.5734" stop-color="#F16858" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint5_linear_2324_44469" x1="25.7618" y1="25.0639" x2="19.4512" y2="14.3998" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.425" stop-color="#F59596" />
                            <stop offset="0.5961" stop-color="#F0575B" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint6_linear_2324_44469" x1="-8.4934" y1="2.38097" x2="23.0883" y2="18.3616" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.425" stop-color="#F59596" />
                            <stop offset="0.5961" stop-color="#F0575B" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#8E0329" />
                          </linearGradient>
                          <linearGradient id="paint7_linear_2324_44469" x1="-6.39689" y1="-4.70238" x2="20.6114" y2="19.8829" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.4015" stop-color="#F59596" />
                            <stop offset="0.5231" stop-color="#F0575B" />
                            <stop offset="0.6271" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint8_linear_2324_44469" x1="2.88549" y1="12.5009" x2="10.0628" y2="13.2153" gradientUnits="userSpaceOnUse">
                            <stop offset="0.2064" stop-color="#F9D19B" />
                            <stop offset="0.285" stop-color="#F7B98B" />
                            <stop offset="0.4516" stop-color="#F37B62" />
                            <stop offset="0.6764" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint9_linear_2324_44469" x1="-2.29294" y1="13.8044" x2="9.52999" y2="11.2126" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7BE80" />
                            <stop offset="0.4576" stop-color="#F4A669" />
                            <stop offset="0.6976" stop-color="#ED682F" />
                            <stop offset="0.7423" stop-color="#EC5C24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint10_linear_2324_44469" x1="25.2756" y1="5.20021" x2="14.5828" y2="22.4466" gradientUnits="userSpaceOnUse">
                            <stop offset="0.1104" stop-color="#F6A9A7" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.425" stop-color="#F59596" />
                            <stop offset="0.5961" stop-color="#F0575B" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint11_linear_2324_44469" x1="32.7879" y1="14.3894" x2="22.415" y2="10.8454" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.425" stop-color="#F59596" />
                            <stop offset="0.5961" stop-color="#F0575B" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint12_linear_2324_44469" x1="30.7434" y1="13.3788" x2="19.7861" y2="11.7405" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.0335" stop-color="#DA7079" />
                            <stop offset="0.1635" stop-color="#EA9195" />
                            <stop offset="0.2715" stop-color="#F3A6A7" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.425" stop-color="#F59596" />
                            <stop offset="0.5961" stop-color="#F0575B" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint13_linear_2324_44469" x1="-8.16431" y1="13.8552" x2="16.9716" y2="13.8552" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7BE80" />
                            <stop offset="0.4173" stop-color="#F5A672" />
                            <stop offset="0.5734" stop-color="#F1684E" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint14_linear_2324_44469" x1="-10.8108" y1="21.2609" x2="13.4946" y2="17.6034" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.4182" stop-color="#F59596" />
                            <stop offset="0.575" stop-color="#F0575B" />
                            <stop offset="0.709" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint15_linear_2324_44469" x1="-0.848132" y1="18.2641" x2="11.6657" y2="13.105" gradientUnits="userSpaceOnUse">
                            <stop offset="0.2064" stop-color="#F9A11B" />
                            <stop offset="0.3102" stop-color="#F7891D" />
                            <stop offset="0.5284" stop-color="#F04B21" />
                            <stop offset="0.6764" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint16_linear_2324_44469" x1="-6.59823" y1="21.6537" x2="18.2641" y2="14.3372" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.3818" stop-color="#F59596" />
                            <stop offset="0.4621" stop-color="#F0575B" />
                            <stop offset="0.5307" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint17_linear_2324_44469" x1="-7.19984" y1="29.8054" x2="15.427" y2="15.0487" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.425" stop-color="#F59596" />
                            <stop offset="0.5961" stop-color="#F0575B" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint18_linear_2324_44469" x1="-2.82391" y1="28.3702" x2="23.3036" y2="14.2335" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.425" stop-color="#F59596" />
                            <stop offset="0.5961" stop-color="#F0575B" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint19_linear_2324_44469" x1="34.6962" y1="31.3279" x2="16.5013" y2="13.2797" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.425" stop-color="#F59596" />
                            <stop offset="0.5961" stop-color="#F0575B" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint20_linear_2324_44469" x1="27.0849" y1="31.7211" x2="21.6927" y2="10.879" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.5299" stop-color="#F16366" />
                            <stop offset="0.6723" stop-color="#ED3136" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint21_linear_2324_44469" x1="27.8549" y1="24.6457" x2="22.786" y2="10.5252" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.3897" stop-color="#F59A95" />
                            <stop offset="0.4869" stop-color="#F16857" />
                            <stop offset="0.4961" stop-color="#F16351" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint22_linear_2324_44469" x1="20.5754" y1="1.75463" x2="24.6467" y2="22.911" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.425" stop-color="#F59596" />
                            <stop offset="0.5961" stop-color="#F0575B" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint23_linear_2324_44469" x1="15.8174" y1="-3.698" x2="15.872" y2="13.8211" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.425" stop-color="#F59596" />
                            <stop offset="0.5961" stop-color="#F0575B" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint24_linear_2324_44469" x1="16.4635" y1="-1.5611" x2="12.354" y2="13.719" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.2435" stop-color="#F7ADAD" />
                            <stop offset="0.3153" stop-color="#F59596" />
                            <stop offset="0.466" stop-color="#F0575B" />
                            <stop offset="0.5948" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint25_linear_2324_44469" x1="13.2051" y1="1.54542" x2="21.5147" y2="13.3096" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.425" stop-color="#F59596" />
                            <stop offset="0.5961" stop-color="#F0575B" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint26_linear_2324_44469" x1="20.7084" y1="33.8659" x2="17.8734" y2="15.9761" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.3978" stop-color="#F59697" />
                            <stop offset="0.5614" stop-color="#F05659" />
                            <stop offset="0.6807" stop-color="#ED2D33" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint27_linear_2324_44469" x1="17.1254" y1="5.13608" x2="17.8532" y2="22.7972" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.425" stop-color="#F59596" />
                            <stop offset="0.5961" stop-color="#F0575B" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint28_linear_2324_44469" x1="-17.9893" y1="24.1926" x2="21.0178" y2="20.3536" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7BE80" />
                            <stop offset="0.4227" stop-color="#F5A672" />
                            <stop offset="0.5903" stop-color="#F1684E" />
                            <stop offset="0.7717" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint29_linear_2324_44469" x1="1.83687" y1="26.5394" x2="19.0814" y2="15.2553" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.425" stop-color="#F59596" />
                            <stop offset="0.5961" stop-color="#F0575B" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint30_linear_2324_44469" x1="20.2952" y1="33.8956" x2="15.0692" y2="19.0295" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.425" stop-color="#F59596" />
                            <stop offset="0.5961" stop-color="#F0575B" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint31_linear_2324_44469" x1="33.0022" y1="25.2901" x2="12.6924" y2="21.1908" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.425" stop-color="#F59596" />
                            <stop offset="0.5961" stop-color="#F0575B" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint32_linear_2324_44469" x1="-0.5463" y1="19.4867" x2="19.6339" y2="22.3696" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.425" stop-color="#F59596" />
                            <stop offset="0.5961" stop-color="#F0575B" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint33_linear_2324_44469" x1="8.06235" y1="32.2133" x2="16.6326" y2="22.3801" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.4133" stop-color="#F59596" />
                            <stop offset="0.5598" stop-color="#F0575B" />
                            <stop offset="0.6849" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint34_linear_2324_44469" x1="32.5533" y1="10.9973" x2="21.0727" y2="10.519" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.425" stop-color="#F59596" />
                            <stop offset="0.5961" stop-color="#F0575B" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint35_linear_2324_44469" x1="30.6749" y1="3.17177" x2="18.5571" y2="15.7731" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.425" stop-color="#F59596" />
                            <stop offset="0.5961" stop-color="#F0575B" />
                            <stop offset="0.7423" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint36_linear_2324_44469" x1="2.4844" y1="10.3497" x2="8.05152" y2="11.1129" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#D56671" />
                            <stop offset="0.3436" stop-color="#F7BE80" />
                            <stop offset="0.4576" stop-color="#F4A669" />
                            <stop offset="0.6976" stop-color="#ED682F" />
                            <stop offset="0.7423" stop-color="#EC5C24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint37_linear_2324_44469" x1="4.16896" y1="7.46065" x2="10.5223" y2="11.0679" gradientUnits="userSpaceOnUse">
                            <stop offset="0.2388" stop-color="#F9DAC9" />
                            <stop offset="0.3198" stop-color="#F7C2B4" />
                            <stop offset="0.4914" stop-color="#F3847D" />
                            <stop offset="0.7382" stop-color="#EC2126" />
                            <stop offset="0.7446" stop-color="#EC1E24" />
                            <stop offset="1" stop-color="#7A0025" />
                          </linearGradient>
                          <linearGradient id="paint38_linear_2324_44469" x1="17.6463" y1="10.8762" x2="17.1706" y2="11.787" gradientUnits="userSpaceOnUse">
                            <stop offset="0.3436" stop-color="#F7ADAD" />
                            <stop offset="0.4777" stop-color="#F59596" />
                            <stop offset="0.7593" stop-color="#F0575B" />
                            <stop offset="1" stop-color="#EC1E24" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </AppIcon>

                    <AppIcon>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <mask id="a" width="24" height="24" x="0" y="0" maskUnits="userSpaceOnUse">
                          <path fill="#D9D9D9" d="M0 0h24v24H0z" />
                        </mask>
                        <g mask="url(#a)">
                          <path fill="#121212" d="M4.308 19.5c-.505 0-.933-.175-1.283-.525a1.745 1.745 0 0 1-.525-1.283V6.308c0-.505.175-.933.525-1.283.35-.35.778-.525 1.283-.525h15.384c.505 0 .933.175 1.283.525.35.35.525.778.525 1.283v11.384c0 .505-.175.933-.525 1.283-.35.35-.778.525-1.283.525H4.308ZM12 12.558 4 7.442v10.25a.3.3 0 0 0 .087.221.3.3 0 0 0 .22.087h15.385a.3.3 0 0 0 .221-.087.3.3 0 0 0 .087-.22V7.442l-8 5.115ZM12 11l7.846-5H4.154L12 11ZM4 7.442V6v11.692a.3.3 0 0 0 .087.221.3.3 0 0 0 .22.087H4V7.442Z" />
                        </g>
                      </svg>
                    </AppIcon>

                    <AppIcon>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <mask id="a" width="24" height="24" x="0" y="0" maskUnits="userSpaceOnUse">
                          <path fill="#D9D9D9" d="M0 0h24v24H0z" />
                        </mask>
                        <g mask="url(#a)">
                          <path fill="#1C1B1F" d="M7.75 14.394V8.702c0-.499.177-.925.53-1.278.353-.353.78-.53 1.278-.53h8.553L15.287 4.07 16.357 3 21 7.644l-4.644 4.654-1.07-1.054 2.825-2.85H9.558a.3.3 0 0 0-.222.087.3.3 0 0 0-.086.221v5.692h-1.5Zm-1.942 5.75c-.499 0-.925-.176-1.278-.53A1.742 1.742 0 0 1 4 18.337V3.952h1.5v14.385a.3.3 0 0 0 .087.22.3.3 0 0 0 .22.087h11.385a.3.3 0 0 0 .221-.086.3.3 0 0 0 .087-.221v-3.943H19v3.943c0 .498-.177.924-.53 1.277a1.74 1.74 0 0 1-1.278.53H5.808Z" />
                        </g>
                      </svg>

                    </AppIcon>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='mb-9 sm:mb-11'>
            <div className='flex flex-col gap-6 text-black md:items-stretch md:flex-row'>
              <div className='mb:pb-6 md:border-b md:w-1/4 md:pb-11 md:border-base-400'>
                <h3 className='pb-3 mb-3 font-semibold text-black border-b border-base-400'>
                  Bio
                </h3>

                <p className='text-black'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt incididunt  ut labore et dolore magna aliqua.
                  Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat.
                  Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla pariatur.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod  tempor incididunt incididunt  ut labore et dolore magna aliqua. Ut enim ad minim  veniam
                </p>

              </div>

              <div className='pb-6 border-b md:w-3/4 md:pb-11 border-base-400'>
                <h3 className='pb-3 mb-3 font-semibold text-black border-b border-base-400'>
                  Personal details
                </h3>

                <div className='flex justify-between'>
                  <div className='space-y-6'>
                    <div>
                      <h4 className='mb-2 font-semibold'>Gender</h4>
                      <span>
                        Female
                      </span>
                    </div>

                    <div>
                      <h4 className='mb-2 font-semibold'>State</h4>
                      <span>
                        New York
                      </span>
                    </div>

                    <div>
                      <h4 className='mb-2 font-semibold'>City</h4>
                      <span>
                        Brooklyn
                      </span>
                    </div>
                  </div>

                  <div className='space-y-6'>
                    <div className=''>
                      <h4 className='mb-2 font-semibold'>Ethnicity:</h4>
                      <span>
                        Female
                      </span>
                    </div>

                    <div className=''>
                      <h4 className='mb-2 font-semibold'>Height</h4>
                      <span>
                        5’6”
                      </span>
                    </div>

                    <div className=''>
                      <h4 className='mb-2 font-semibold'>Dob</h4>
                      <span>
                        Aug/10/1990
                      </span>
                    </div>
                  </div>

                  <div className='space-y-6'>
                    <div className=''>
                      <h4 className='mb-2 font-semibold'>Relationship status:</h4>
                      <span>
                        Taken
                      </span>
                    </div>

                    <div className=''>
                      <h4 className='mb-2 font-semibold'>Joined:</h4>
                      <span>
                        Aug/6/2024
                      </span>
                    </div>
                  </div>

                  <div className='hidden md:block'>
                    <div className='flex flex-col items-center justify-center gap-4 pt-3 overflow-hidden border border-purple-900 rounded-lg bg-pink-50'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" fill="none" viewBox="0 0 51 51">
                        <g clipPath="url(#a)">
                          <rect width="49" height="49" x="1" y=".588" fill="#850079" rx="24.5" />
                          <g clipPath="url(#b)">
                            <mask id="c" width="53" height="53" x="-2" y="-10" maskUnits="userSpaceOnUse">
                              <path fill="#D9D9D9" d="M-1.926-9.359h52.128v52.128H-1.926z" />
                            </mask>
                            <g mask="url(#c)">
                              <path fill="#FFE6A4" stroke="#FFE6A4" strokeWidth=".521" d="m26.756 22.514.055.185h4.35l-3.267 2.396-.143.105.045.172 1.116 4.24-3.316-2.431-.154-.113-.155.113-3.316 2.431 1.116-4.24.045-.172-.143-.104-3.267-2.397h4.35l.055-.186 1.315-4.38 1.314 4.38Z" />
                              <path fill="#FFE6A4" stroke="#FFE6A4" strokeWidth=".521" d="m34.848 14.511-.075.165.128.128c2.561 2.561 4.094 5.885 4.094 9.72 0 7.415-6.139 13.553-13.553 13.553-7.415 0-13.554-6.138-13.554-13.553 0-3.835 1.533-7.159 4.094-9.72l.128-.128-.075-.165L7.603-3.886h13.761l3.84 8.448.238.523.237-.523 3.84-8.448H43.28l-8.432 18.397ZM31.958-.498h-.164l-.07.147-4.432 9.123-.056.115.058.115 1.042 2.085.057.114.125.025c1.265.253 2.278.758 3.323 1.281l.241.12.112-.245L37.93-.128l.169-.37h-6.14Zm-18.767 0h-.406l.17.37 5.734 12.51.112.245.241-.12c1.534-.767 3.331-1.281 5.133-1.539l.351-.05-.152-.32L19.16-.35l-.07-.149h-5.899Zm2.346 25.022c0 5.357 4.548 9.904 9.905 9.904 5.356 0 9.904-4.547 9.904-9.904s-4.548-9.904-9.904-9.904c-5.357 0-9.905 4.547-9.905 9.904Z" />
                            </g>
                          </g>
                        </g>
                        <rect width="49" height="49" x="1" y=".588" stroke="#850079" rx="24.5" />
                        <defs>
                          <clipPath id="a">
                            <rect width="49" height="49" x="1" y=".588" fill="#fff" rx="24.5" />
                          </clipPath>
                          <clipPath id="b">
                            <path fill="#fff" d="M-1.926-9.36h52.128v52.128H-1.926z" />
                          </clipPath>
                        </defs>
                      </svg>

                      <div className='flex flex-col items-center p-2 bg-base-200'>
                        <span className='text-xs font-semibold text-purple-900'>#100</span>
                        <span className='text-[10px] text-purple-900'>Most Followed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='mb-6'>
            <Tabs id='model-profile-tabs'>
              <div className='flex flex-wrap items-center justify-between gap-6 mb-6'>
                <TabList className='flex h-10 gap-1 px-[6px] py-1 bg-base-400 rounded-[20px] w-full sm:flex-auto sm:max-w-xs'>
                  <Tab className='inline-flex items-center justify-center flex-grow gap-2 px-6 text-sm font-medium cursor-pointer rounded-3xl' selectedClassName='bg-white text-black' >
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="currentColor">
                      <g clipPath="url(#clip0_3975_31092)">
                        <mask id="mask0_3975_31092" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">
                          <rect x="0.5" width="20" height="20" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_3975_31092)">
                          <path d="M6.5 13H12.5V12.5625C12.5 12.02 12.225 11.5823 11.675 11.2494C11.125 10.9165 10.4 10.75 9.5 10.75C8.61111 10.75 7.88889 10.9165 7.33333 11.2494C6.77778 11.5823 6.5 12.02 6.5 12.5625V13ZM9.51033 10C9.91999 10 10.2707 9.85069 10.5624 9.55208C10.8541 9.25347 11 8.89933 11 8.48967C11 8.08001 10.8541 7.72932 10.5624 7.43758C10.2707 7.14586 9.91999 7 9.51033 7C9.10067 7 8.74653 7.14586 8.44792 7.43758C8.14931 7.72932 8 8.08001 8 8.48967C8 8.89933 8.14931 9.25347 8.44792 9.55208C8.74653 9.85069 9.10067 10 9.51033 10ZM5 16C4.59722 16 4.24653 15.8507 3.94792 15.5521C3.64931 15.2535 3.5 14.9028 3.5 14.5V5.5C3.5 5.0875 3.64931 4.73438 3.94792 4.44063C4.24653 4.14688 4.59722 4 5 4H14C14.4125 4 14.7656 4.14688 15.0594 4.44063C15.3531 4.73438 15.5 5.0875 15.5 5.5V9L18.5 6V14L15.5 11V14.5C15.5 14.9028 15.3531 15.2535 15.0594 15.5521C14.7656 15.8507 14.4125 16 14 16H5ZM5 14.5H14V5.5H5V14.5Z" fill="currentColor" />
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_3975_31092">
                          <rect width="20" height="20" fill="white" transform="translate(0.5)" />
                        </clipPath>
                      </defs>
                    </svg>

                    <span>
                      Video (12)
                    </span>
                  </Tab>
                  <Tab className='inline-flex items-center justify-center flex-grow gap-2 px-6 text-sm font-medium cursor-pointer rounded-3xl' selectedClassName='bg-white text-black'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <g clipPath="url(#clip0_3975_31097)">
                        <mask id="mask0_3975_31097" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                          <rect width="20" height="20" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_3975_31097)">
                          <path d="M10 14.5C11 14.5 11.8333 14.1597 12.5 13.4792C13.1667 12.7986 13.5 11.9722 13.5 11C13.5 10.0417 13.1667 9.21875 12.5 8.53125C11.8333 7.84375 11 7.5 10 7.5C9 7.5 8.16667 7.84375 7.5 8.53125C6.83333 9.21875 6.5 10.0451 6.5 11.0104C6.5 11.9757 6.83333 12.7986 7.5 13.4792C8.16667 14.1597 9 14.5 10 14.5ZM10 13C9.41667 13 8.9375 12.8047 8.5625 12.414C8.1875 12.0233 8 11.545 8 10.9792C8 10.425 8.1875 9.9566 8.5625 9.57396C8.9375 9.19132 9.41667 9 10 9C10.5833 9 11.0625 9.19132 11.4375 9.57396C11.8125 9.9566 12 10.425 12 10.9792C12 11.545 11.8125 12.0233 11.4375 12.414C11.0625 12.8047 10.5833 13 10 13ZM3.5 17C3.09722 17 2.74653 16.8507 2.44792 16.5521C2.14931 16.2535 2 15.9028 2 15.5V6.5C2 6.09722 2.14931 5.74653 2.44792 5.44792C2.74653 5.14931 3.09722 5 3.5 5H6L7.5 3H12.5L14 5H16.5C16.9125 5 17.2656 5.14931 17.5594 5.44792C17.8531 5.74653 18 6.09722 18 6.5V15.5C18 15.9028 17.8531 16.2535 17.5594 16.5521C17.2656 16.8507 16.9125 17 16.5 17H3.5ZM3.5 15.5H16.5V6.5H13.25L11.7479 4.5H8.25L6.75 6.5H3.5V15.5Z" fill="currentColor" />
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_3975_31097">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <span>
                      Photo (20)
                    </span>
                  </Tab>
                </TabList>

                <div className='px-[1px] w-full sm:w-auto'>
                  {/* block w-full min-w-[204px] h-12 px-4 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-inset focus:ring-1 focus:border-purple-800 focus:ring-purple-80 */}
                  <select className="w-full min-w-[204px] h-10 px-4 text-sm border-r-[16px] border-transparent rounded-lg outline outline-gray">
                    <option value="newest" selected>Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="most-rated">Most Rated</option>
                  </select>
                </div>
              </div>

              <TabPanel>
                <div className='flex flex-wrap gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                  <div className='flex h-96 w-full max-w-[260px] rounded-lg bg-white border-2 border-dashed border-base-700 bg-center mx-auto'>
                    <div className='m-auto max-w-[64px]'>
                      <button className='flex flex-col items-center gap-2'>
                        <div className={iconVariants()}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <g clipPath="url(#clip0_2241_45919)">
                              <path d="M11 5H9V9H5V11H9V15H11V11H15V9H11V5Z" fill="#858585" />
                            </g>
                            <defs>
                              <clipPath id="clip0_2241_45919">
                                <rect width="20" height="20" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>

                        <span className='font-semibold text-center text-base-700'>Add New Video</span>
                      </button>
                    </div>
                  </div>

                  {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item, index) => (
                      <AppVideoCard key={index} />
                    ))
                  }
                </div>
              </TabPanel>

              <TabPanel>
                <div className='flex flex-wrap gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                  <div className='flex mx-auto bg-white bg-center border-2 border-dashed rounded-lg h-52 w-full max-w-[208px] border-base-700'>
                    <div className='m-auto max-w-[64px]'>
                      <button className='flex flex-col items-center gap-2'>
                        <div className={iconVariants()}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <g clipPath="url(#clip0_2241_45919)">
                              <path d="M11 5H9V9H5V11H9V15H11V11H15V9H11V5Z" fill="#858585" />
                            </g>
                            <defs>
                              <clipPath id="clip0_2241_45919">
                                <rect width="20" height="20" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>

                        <span className='font-semibold text-center text-base-700'>Add New Photo</span>
                      </button>
                    </div>
                  </div>

                  {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item, index) => (
                      <AppPhotoCard key={index} />
                    ))
                  }
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </>
    );
  }
}

const mapStates = (state: any) => ({
  ui: { ...state.ui },
  modals: { ...state.modals },
  videoState: { ...state.video.videos },
  feedState: { ...state.feed.feeds },
  productState: { ...state.product.products },
  galleryState: { ...state.gallery.galleries },
  currentUser: { ...state.user.current },
  ...state.streaming
});

const mapDispatch = {
  getFeeds,
  moreFeeds,
  getVideos,
  moreVideo,
  listProducts,
  moreProduct,
  getGalleries,
  moreGalleries,
  removeFeedSuccess,
  updateBalance,
  resetFeeds,
  updateModals
};
export default connect(mapStates, mapDispatch)(PerformerProfile);
