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
  PictureOutlined,
  DollarOutlined,
  AuditOutlined,
  MailOutlined
} from '@ant-design/icons';
import {
  TickIcon, ShareIcon, MessageIcon, ShakeHandIcon,
  GiftIcon
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
import GoLiveModal from '@components/modals/goLiveModal';
import { IModals } from '@interfaces/modals';
import FollowButton from '@components/common/ProfileFollowButton';
import { onFollow } from '@redux/performer/actions';
import { GiftMobileIcon } from '@components/stream/icons';
import DonateRubiesModal from '@components/modals/donateRubiesModal';

const TipPerformerForm = dynamic(() => import('@components/performer/tip-form'), { ssr: false });

interface IProps {
  ui: IUIConfig;
  modals: IModals;
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
  onFollow:(data: {
    action: "create" | "delete";
    performerId: string;
  }) => void;
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
    isVisiblePromote: false,
    dropdownValue:"updatedAt"
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
    const el = document.querySelector('.main-container');
    const queryParams = new URLSearchParams(window.location.search);
    const value = queryParams.get('tab')
    if (value) {
      this.handleTabChange(value);
      if(value === 'video')
      window.scrollBy(0, 300); 
    }

    const { performer, query } = this.props;
    if (query && query.tab) {
      this.setState({ tab: query.tab });
    }

    if (performer) {
      this.loadItems();
      // this.getBrackets();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { tab } = this.state;
    if (tab !== prevState.tab) {
      this.loadItems();
    }
    const { currentUser, performer } = this.props;
    if (currentUser !== prevProps.currentUser) {
      if ((currentUser?._id !== performer?._id) && currentUser?.roles.includes(ROLE_PERMISSIONS.ROLE_HOST_PRIVATE) && currentUser?.roles.includes(ROLE_PERMISSIONS.ROLE_ALL_RISING_MODEL) && performer?.roles.includes(ROLE_PERMISSIONS.ROLE_HOST_CROSSPROMOTE)) {
        this.setState({ isVisiblePromote: true });
      } else {
        this.setState({ isVisiblePromote: false });
      }
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

  handleDropDown = async (value:string) => {
   await this.loadItems()
    this.setState({ 
      dropdownValue: value,
    });
  };

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

  async sendTip(price: number, isConfirm :boolean) {
    const {
      performer,
      currentUser,
      updateBalance: handleUpdateBalance
    } = this.props;

    if (!isConfirm) {
      message.error({ key: 'send-tip', content: 'Please confirm before send gift !! ' });
      return;
    }
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
      message.success({ key: 'send-tip-succes', content: 'Thank you for the tip' });
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
      error, performer, ui, currentUser, feedState, countries, modals, updateModals, onFollow
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
      isGrid,
      loading,
      isVisiblePromote,
      tab
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
            | Model Profile
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

              {/* <button type="button" className={`md:self-end md:ml-16 xl:ml-36 h-10 z-10 ${buttonVariants()}`}>
                <span> Follow</span>
              </button> */}
              <FollowButton performer={performer} currentUser={currentUser} onFollow={onFollow} />
            </div>
          </div>

          <div className='gap-5 pl-5 mb-4 -mt-8 md:-mt-12 xl:mb-8 xl:-mt-16'>
            <div className='flex gap-4'>
              <div className='flex-shrink-0 w-16 h-16 overflow-hidden border-4 border-white rounded-full md:w-32 md:h-32 xl:w-44 xl:h-44'>
                <img className='object-cover w-full h-full' src={performer.avatar || '/static/no-avatar.png'} alt="User avatar photo" />
              </div>

              <div className='flex-shrink-0 hidden pt-16 mr-auto xl:pt-20 md:block'>
                <div className='flex items-center gap-2'>
                  <h2 className='text-2xl text-gray-900 xl:text-3xl'>
                  {performer.firstName} {performer.lastName}
                  </h2>

                  {performer.roles?.includes(ROLE_PERMISSIONS.ROLE_FAN_VERIFIED) && <svg className='block w-8 h-8' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
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
                  </svg>}

                  <Link href="/model/account">
                    <AppIcon className="hidden sm:block">
                      <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M4.99997 19H6.2615L16.4981 8.7634L15.2366 7.50188L4.99997 17.7385V19ZM3.5 20.5V17.1154L16.6904 3.93078C16.8416 3.79343 17.0086 3.68729 17.1913 3.61237C17.374 3.53746 17.5656 3.5 17.7661 3.5C17.9666 3.5 18.1608 3.53558 18.3488 3.60675C18.5368 3.6779 18.7032 3.79103 18.848 3.94615L20.0692 5.18268C20.2243 5.32754 20.3349 5.49424 20.4009 5.68278C20.4669 5.87129 20.5 6.05981 20.5 6.24833C20.5 6.44941 20.4656 6.64131 20.3969 6.82403C20.3283 7.00676 20.219 7.17373 20.0692 7.32495L6.88458 20.5H3.5ZM15.8563 8.1437L15.2366 7.50188L16.4981 8.7634L15.8563 8.1437Z" fill="#121212" />
                      </svg>
                    </AppIcon>
                  </Link>
                </div>

                <div className='flex items-end gap-2 mb-4 md:mb-7'>
                  <span className='text-base text-black '>@{performer.username} </span>

                  <CopyToClipboard onCopy={() => this.onCopy()} text={`@${performer.username}`}>
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

                {/* <span className='text-base font-semibold text-black'>100 fans</span> */}
              </div>

              <div className='hidden pt-16 xl:pt-20 md:block'>
                <div className='flex flex-wrap justify-end gap-3'>
                  <div className='inline-flex gap-3'>
                   {performer.roles?.includes(ROLE_PERMISSIONS.ROLE_HOST_LIVE) &&  <AppButton onClick={() => updateModals({ isGoLiveModalOpen: true })} className='px-6' variant='error'>
                      Go Live
                    </AppButton>}

                    {performer.roles?.includes(ROLE_PERMISSIONS.ROLE_HOST_PRIVATE) && <AppButton onClick={() => updateModals({ isGoLiveModalOpen: true })} className='px-6' variant='error'>
                      Go Private
                    </AppButton>}
                  </div>
                  <DonateRubiesModal isOpen={modals.isDonateRubiesModalOpen} onClose={() => updateModals({ isDonateRubiesModalOpen: false })} />

                  <div className='flex gap-x-3'>
                   {
                    performer.roles?.includes(ROLE_PERMISSIONS.ROLE_ADMIN) &&  <AppIcon style={{
                      border:"1px solid #d897eb"
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <mask id="mask0_2923_60017" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_2923_60017)">
                        <path d="M17 17.0001C17.4167 17.0001 17.7708 16.8542 18.0625 16.5626C18.3542 16.2709 18.5 15.9167 18.5 15.5001C18.5 15.0834 18.3542 14.7292 18.0625 14.4376C17.7708 14.1459 17.4167 14.0001 17 14.0001C16.5833 14.0001 16.2292 14.1459 15.9375 14.4376C15.6458 14.7292 15.5 15.0834 15.5 15.5001C15.5 15.9167 15.6458 16.2709 15.9375 16.5626C16.2292 16.8542 16.5833 17.0001 17 17.0001ZM17 20.0001C17.523 20.0001 17.9996 19.8808 18.4298 19.6423C18.8599 19.4038 19.2115 19.0846 19.4845 18.6846C19.1115 18.4616 18.7167 18.2917 18.3 18.1751C17.8833 18.0584 17.45 18.0001 17 18.0001C16.55 18.0001 16.1167 18.0584 15.7 18.1751C15.2833 18.2917 14.8885 18.4616 14.5155 18.6846C14.7885 19.0846 15.1401 19.4038 15.5703 19.6423C16.0004 19.8808 16.477 20.0001 17 20.0001ZM12 21.4808C9.83717 20.891 8.0465 19.6179 6.628 17.6616C5.20933 15.7052 4.5 13.5181 4.5 11.1001V5.34632L12 2.53857L19.5 5.34632V11.0116C19.2667 10.9167 19.0218 10.8312 18.7653 10.7548C18.5089 10.6787 18.2538 10.6187 18 10.5751V6.39057L12 4.15007L6 6.39057V11.1001C6 11.9859 6.125 12.851 6.375 13.6953C6.625 14.5395 6.96958 15.3286 7.40875 16.0626C7.84775 16.7966 8.37242 17.4556 8.98275 18.0396C9.59292 18.6236 10.2551 19.0899 10.9692 19.4386L10.9983 19.4288C11.1302 19.7955 11.3013 20.1468 11.5115 20.4828C11.7218 20.8187 11.9609 21.1237 12.2287 21.3981C12.1866 21.4109 12.1485 21.4247 12.1145 21.4396C12.0805 21.4542 12.0423 21.468 12 21.4808ZM17 21.5001C15.7513 21.5001 14.6892 21.0622 13.8135 20.1866C12.9378 19.3109 12.5 18.2487 12.5 17.0001C12.5 15.7514 12.9378 14.6892 13.8135 13.8136C14.6892 12.9379 15.7513 12.5001 17 12.5001C18.2487 12.5001 19.3108 12.9379 20.1865 13.8136C21.0622 14.6892 21.5 15.7514 21.5 17.0001C21.5 18.2487 21.0622 19.3109 20.1865 20.1866C19.3108 21.0622 18.2487 21.5001 17 21.5001Z" fill="#1C1B1F" />
                      </g>
                    </svg>
                  </AppIcon>
                   }

                    <AppIcon onClick={() => updateModals({ isDonateRubiesModalOpen: true })}>
                    <GiftIcon />
                    </AppIcon>

                   {
                    performer.roles?.includes(ROLE_PERMISSIONS.ROLE_HOST_CROSSPROMOTE) && currentUser.roles?.includes(ROLE_PERMISSIONS.ROLE_ALL_RISING_MODEL) && currentUser.roles?.includes(ROLE_PERMISSIONS.ROLE_HOST_PRIVATE) &&   <AppIcon onClick={() => updateModals({
                      crossPromotionPurchaseModal: {
                        isOpen: true,
                        performerId: performer._id
                      },
                    })}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <mask id="mask0_2844_37404" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                          <rect width="24" height="24" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_2844_37404)">
                          <path d="M23.566 10.3558L19.6546 4.50725C19.5492 4.34972 19.3463 4.30216 19.1863 4.39728C18.5638 4.76852 17.8095 4.79051 17.1682 4.45553L15.1739 3.41434C14.2152 2.91382 13.0946 2.86447 12.0988 3.27881L10.2321 4.05576C9.97244 4.16366 9.73676 4.31614 9.53182 4.50637C9.41028 4.4927 9.28703 4.48556 9.16434 4.48556C8.6517 4.48556 8.13675 4.60921 7.67563 4.84283C7.27341 5.04673 6.79094 5.01463 6.41634 4.75931L5.28542 3.98801C5.20628 3.93421 5.11007 3.91519 5.01784 3.9354C4.9256 3.95561 4.84449 4.01327 4.79297 4.0959L1.05789 10.0692C0.950576 10.241 0.996691 10.4714 1.16122 10.5834L2.52867 11.5158C2.66075 11.6059 2.77347 11.7209 2.86285 11.8573C2.95223 11.9941 3.014 12.1453 3.04645 12.307C3.11164 12.6316 3.25539 12.9351 3.45919 13.1871L3.23659 13.5429C2.78599 14.2634 2.9807 15.2323 3.67068 15.7028C3.91433 15.869 4.19644 15.9567 4.48677 15.9567C4.63308 15.9567 4.77597 15.9341 4.91234 15.8922C4.91746 15.9338 4.92372 15.9754 4.93198 16.0167C5.01396 16.4248 5.24311 16.775 5.57727 17.0026C5.82092 17.1688 6.10302 17.2568 6.39363 17.2568C6.54022 17.2568 6.68312 17.2342 6.81946 17.192C6.87269 17.6307 7.10239 18.0429 7.48384 18.303C7.72749 18.4692 8.00959 18.5571 8.29993 18.5571C8.44624 18.5571 8.58913 18.5346 8.72549 18.4923C8.73062 18.534 8.73688 18.5756 8.74514 18.6172C8.82711 19.025 9.05627 19.3751 9.39042 19.6031C9.63408 19.7692 9.91618 19.8569 10.2068 19.8569C10.714 19.8569 11.182 19.5924 11.4587 19.1498L11.6334 18.8707L13.0558 19.8308C13.3075 20.0023 13.5904 20.0843 13.8708 20.0843C14.359 20.0843 14.838 19.8352 15.1244 19.3775C15.29 19.1124 15.3683 18.814 15.3669 18.5188C15.5334 18.5824 15.7065 18.6136 15.8787 18.6136C16.3669 18.6136 16.8459 18.3646 17.1323 17.9068C17.3088 17.6245 17.3859 17.3041 17.3734 16.9902C17.5185 17.0312 17.6683 17.0523 17.8194 17.0523C17.9381 17.0523 18.0577 17.0395 18.1766 17.0134C18.627 16.9147 19.0132 16.6389 19.2649 16.2367C19.4795 15.8934 19.5737 15.4931 19.5378 15.0909C19.7129 15.1512 19.8942 15.1807 20.0744 15.1807C20.6386 15.1807 21.1931 14.8932 21.5218 14.368C21.7052 14.075 21.8019 13.7353 21.8019 13.386C21.8019 13.1351 21.751 12.8858 21.6542 12.6569C21.7541 12.2907 21.9705 11.9727 22.2722 11.7524L23.4782 10.8729C23.639 10.7558 23.6784 10.524 23.566 10.3558ZM4.05989 15.0805C3.69838 14.8341 3.59648 14.3264 3.83245 13.9489L4.4288 12.9957C4.57397 12.7636 4.81933 12.6251 5.08492 12.6251C5.23664 12.6251 5.38408 12.6712 5.51218 12.7586C5.8734 13.005 5.97558 13.5123 5.73961 13.8898L5.14327 14.843C4.99839 15.0749 4.75303 15.2134 4.48688 15.2134C4.33516 15.2137 4.1877 15.1676 4.05989 15.0805ZM5.96646 16.3806C5.7914 16.2611 5.67129 16.0777 5.62829 15.864C5.58531 15.6503 5.62459 15.4321 5.73902 15.2493L6.33537 14.2961C6.48025 14.0643 6.72561 13.9258 6.99149 13.9258C7.14321 13.9258 7.29094 13.9718 7.41875 14.0589C7.59381 14.1784 7.71392 14.3618 7.75692 14.5755C7.79991 14.7892 7.76062 15.0074 7.64619 15.1901L7.04984 16.1434C6.90496 16.3752 6.6596 16.5137 6.39372 16.5137C6.242 16.5137 6.09427 16.4676 5.96646 16.3806ZM7.87303 17.6809C7.51152 17.4345 7.40963 16.9269 7.6456 16.5494L8.24194 15.5962C8.38711 15.3641 8.63248 15.2256 8.89806 15.2256C9.04978 15.2256 9.19722 15.2716 9.32532 15.359C9.68654 15.6054 9.78873 16.1128 9.55276 16.4903L8.95642 17.4435C8.81153 17.6753 8.56617 17.8138 8.30003 17.8138C8.14831 17.8141 8.00085 17.768 7.87303 17.6809ZM10.2069 19.1142C10.0551 19.1142 9.90742 19.0681 9.7799 18.9813C9.60484 18.8618 9.48472 18.6784 9.44173 18.4647C9.39875 18.251 9.43803 18.0329 9.55217 17.8504L9.83311 17.4015L10.1485 16.8971C10.2934 16.6653 10.5387 16.5268 10.8046 16.5268C10.9563 16.5268 11.1041 16.5729 11.2319 16.66C11.4069 16.7794 11.5271 16.9628 11.57 17.1765C11.613 17.3902 11.5737 17.6084 11.4593 17.7912L10.863 18.7444C10.7181 18.9756 10.4727 19.1142 10.2069 19.1142ZM20.9256 13.9621C20.6253 14.4424 20.0033 14.5836 19.5396 14.2769C19.5373 14.2754 19.5356 14.2742 19.5331 14.2727L15.3326 11.4079L14.9435 12.03L18.3751 14.3704C18.6012 14.5246 18.756 14.7612 18.8115 15.037C18.867 15.3129 18.8164 15.5946 18.6686 15.8306C18.5212 16.0666 18.2943 16.2283 18.0302 16.2863C17.766 16.3442 17.4962 16.291 17.2702 16.1371L13.8382 13.7967L13.4491 14.4188L16.309 16.3692C16.6705 16.6156 16.7724 17.1232 16.5364 17.5005C16.3005 17.8779 15.8143 17.9843 15.453 17.7379L14.6905 17.2181L12.5929 15.7878L12.2038 16.4099L14.3013 17.8402C14.6625 18.0866 14.7644 18.5939 14.5285 18.9714C14.414 19.1542 14.2384 19.2796 14.0338 19.3245C13.8291 19.3694 13.6202 19.3284 13.4434 19.208L12.0224 18.2489L12.0549 18.1969C12.2732 17.8479 12.3483 17.4312 12.2664 17.0231C12.1844 16.615 11.9552 16.2649 11.6211 16.0372C11.3774 15.8711 11.0953 15.7834 10.8047 15.7834C10.6581 15.7834 10.5152 15.806 10.3789 15.8482C10.3254 15.4098 10.096 14.9972 9.7145 14.7375C9.47056 14.571 9.18848 14.483 8.89814 14.483C8.75183 14.483 8.60921 14.5056 8.47287 14.5475C8.46774 14.5059 8.46148 14.4643 8.45323 14.423C8.37125 14.0149 8.1421 13.6648 7.80794 13.4371C7.56429 13.2709 7.28218 13.183 6.99158 13.183C6.84498 13.183 6.70209 13.2055 6.56575 13.2477C6.51223 12.8093 6.28282 12.3968 5.90137 12.137C5.65742 11.9706 5.37534 11.8826 5.085 11.8826C4.60452 11.8826 4.15904 12.1204 3.87808 12.5225C3.81517 12.4087 3.76906 12.2844 3.74287 12.1548C3.69135 11.8975 3.59286 11.6564 3.45025 11.4382C3.30764 11.2207 3.12831 11.0373 2.91767 10.8937L1.84852 10.1643L5.19495 4.81364L6.02813 5.38193C6.61053 5.77902 7.36114 5.82866 7.98707 5.51182C8.29533 5.35548 8.63435 5.26156 8.9765 5.2363L7.17126 8.12265C7.06822 8.28731 7.03292 8.48377 7.07163 8.67638C7.11035 8.86869 7.21851 9.03396 7.37621 9.14155L7.51341 9.23517C7.94694 9.53091 8.43482 9.67211 8.91759 9.67211C9.75902 9.67211 10.5848 9.24291 11.0781 8.45408L12 6.97984C12.0883 6.83866 12.2699 6.79912 12.4048 6.89126L20.6326 12.5016C20.7735 12.5976 20.8853 12.724 20.9653 12.8767C21.047 13.0322 21.0903 13.2087 21.0903 13.3862C21.0903 13.5907 21.0332 13.79 20.9256 13.9621ZM21.8643 11.1435C21.5637 11.3625 21.3218 11.6488 21.1527 11.9787C21.1106 11.9436 21.0664 11.9103 21.0212 11.8794L12.7939 6.26878C12.6248 6.15346 12.4347 6.09847 12.2463 6.09847C11.9183 6.09847 11.5964 6.26582 11.404 6.57346L10.482 8.0477C9.9201 8.94622 8.76272 9.19976 7.90215 8.61303L7.77064 8.52326L9.71593 5.4132C9.90494 5.11092 10.1748 4.88057 10.4959 4.74683L12.3626 3.96988C13.1699 3.63371 14.0785 3.67384 14.8557 4.07955L16.85 5.12075C17.606 5.51545 18.4805 5.53805 19.2464 5.19535L22.7787 10.477L21.8643 11.1435Z" fill="black" stroke="black" strokeWidth="0.6" />
                        </g>
                      </svg>
                    </AppIcon>
                   }

                    <AppIcon>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <mask id="mask0_4096_52896" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                          <rect width="24" height="24" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_4096_52896)">
                          <path d="M4.3077 19.5C3.80257 19.5 3.375 19.325 3.025 18.975C2.675 18.625 2.5 18.1974 2.5 17.6923V6.3077C2.5 5.80257 2.675 5.375 3.025 5.025C3.375 4.675 3.80257 4.5 4.3077 4.5H19.6923C20.1974 4.5 20.625 4.675 20.975 5.025C21.325 5.375 21.5 5.80257 21.5 6.3077V17.6923C21.5 18.1974 21.325 18.625 20.975 18.975C20.625 19.325 20.1974 19.5 19.6923 19.5H4.3077ZM12 12.5576L3.99998 7.44225V17.6923C3.99998 17.782 4.02883 17.8557 4.08653 17.9134C4.14423 17.9711 4.21795 18 4.3077 18H19.6923C19.782 18 19.8557 17.9711 19.9134 17.9134C19.9711 17.8557 20 17.782 20 17.6923V7.44225L12 12.5576ZM12 11L19.8461 5.99998H4.15383L12 11ZM3.99998 7.44225V5.99998V17.6923C3.99998 17.782 4.02883 17.8557 4.08653 17.9134C4.14423 17.9711 4.21795 18 4.3077 18H3.99998V7.44225Z" fill="#121212" />
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

          <div className='w-full mt-3 mb-6 md:hidden'>
            <div className=''>
              <div className='flex items-center gap-2'>
                <h2 className='text-2xl text-gray-900 xl:text-3xl'>
                  {performer.firstName} {performer.lastName}
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

              <div className='flex flex-wrap items-center gap-5'>
                <span className='flex-shrink-0 mr-auto text-base font-semibold text-black'>100 fans</span>

                <div className='flex gap-3'>
                  <AppIcon>
                    <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M4.99997 19H6.2615L16.4981 8.7634L15.2366 7.50188L4.99997 17.7385V19ZM3.5 20.5V17.1154L16.6904 3.93078C16.8416 3.79343 17.0086 3.68729 17.1913 3.61237C17.374 3.53746 17.5656 3.5 17.7661 3.5C17.9666 3.5 18.1608 3.53558 18.3488 3.60675C18.5368 3.6779 18.7032 3.79103 18.848 3.94615L20.0692 5.18268C20.2243 5.32754 20.3349 5.49424 20.4009 5.68278C20.4669 5.87129 20.5 6.05981 20.5 6.24833C20.5 6.44941 20.4656 6.64131 20.3969 6.82403C20.3283 7.00676 20.219 7.17373 20.0692 7.32495L6.88458 20.5H3.5ZM15.8563 8.1437L15.2366 7.50188L16.4981 8.7634L15.8563 8.1437Z" fill="#121212" />
                    </svg>
                  </AppIcon>

                  <AppIcon onClick={() => updateModals({ isDonateRubiesModalOpen: true })}>
                  <GiftIcon />
                    </AppIcon>

                  <AppIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <mask id="mask0_2923_60017" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_2923_60017)">
                        <path d="M17 17.0001C17.4167 17.0001 17.7708 16.8542 18.0625 16.5626C18.3542 16.2709 18.5 15.9167 18.5 15.5001C18.5 15.0834 18.3542 14.7292 18.0625 14.4376C17.7708 14.1459 17.4167 14.0001 17 14.0001C16.5833 14.0001 16.2292 14.1459 15.9375 14.4376C15.6458 14.7292 15.5 15.0834 15.5 15.5001C15.5 15.9167 15.6458 16.2709 15.9375 16.5626C16.2292 16.8542 16.5833 17.0001 17 17.0001ZM17 20.0001C17.523 20.0001 17.9996 19.8808 18.4298 19.6423C18.8599 19.4038 19.2115 19.0846 19.4845 18.6846C19.1115 18.4616 18.7167 18.2917 18.3 18.1751C17.8833 18.0584 17.45 18.0001 17 18.0001C16.55 18.0001 16.1167 18.0584 15.7 18.1751C15.2833 18.2917 14.8885 18.4616 14.5155 18.6846C14.7885 19.0846 15.1401 19.4038 15.5703 19.6423C16.0004 19.8808 16.477 20.0001 17 20.0001ZM12 21.4808C9.83717 20.891 8.0465 19.6179 6.628 17.6616C5.20933 15.7052 4.5 13.5181 4.5 11.1001V5.34632L12 2.53857L19.5 5.34632V11.0116C19.2667 10.9167 19.0218 10.8312 18.7653 10.7548C18.5089 10.6787 18.2538 10.6187 18 10.5751V6.39057L12 4.15007L6 6.39057V11.1001C6 11.9859 6.125 12.851 6.375 13.6953C6.625 14.5395 6.96958 15.3286 7.40875 16.0626C7.84775 16.7966 8.37242 17.4556 8.98275 18.0396C9.59292 18.6236 10.2551 19.0899 10.9692 19.4386L10.9983 19.4288C11.1302 19.7955 11.3013 20.1468 11.5115 20.4828C11.7218 20.8187 11.9609 21.1237 12.2287 21.3981C12.1866 21.4109 12.1485 21.4247 12.1145 21.4396C12.0805 21.4542 12.0423 21.468 12 21.4808ZM17 21.5001C15.7513 21.5001 14.6892 21.0622 13.8135 20.1866C12.9378 19.3109 12.5 18.2487 12.5 17.0001C12.5 15.7514 12.9378 14.6892 13.8135 13.8136C14.6892 12.9379 15.7513 12.5001 17 12.5001C18.2487 12.5001 19.3108 12.9379 20.1865 13.8136C21.0622 14.6892 21.5 15.7514 21.5 17.0001C21.5 18.2487 21.0622 19.3109 20.1865 20.1866C19.3108 21.0622 18.2487 21.5001 17 21.5001Z" fill="#1C1B1F" />
                      </g>
                    </svg>
                  </AppIcon>

                  <AppIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <mask id="mask0_2844_37404" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_2844_37404)">
                        <path d="M23.566 10.3558L19.6546 4.50725C19.5492 4.34972 19.3463 4.30216 19.1863 4.39728C18.5638 4.76852 17.8095 4.79051 17.1682 4.45553L15.1739 3.41434C14.2152 2.91382 13.0946 2.86447 12.0988 3.27881L10.2321 4.05576C9.97244 4.16366 9.73676 4.31614 9.53182 4.50637C9.41028 4.4927 9.28703 4.48556 9.16434 4.48556C8.6517 4.48556 8.13675 4.60921 7.67563 4.84283C7.27341 5.04673 6.79094 5.01463 6.41634 4.75931L5.28542 3.98801C5.20628 3.93421 5.11007 3.91519 5.01784 3.9354C4.9256 3.95561 4.84449 4.01327 4.79297 4.0959L1.05789 10.0692C0.950576 10.241 0.996691 10.4714 1.16122 10.5834L2.52867 11.5158C2.66075 11.6059 2.77347 11.7209 2.86285 11.8573C2.95223 11.9941 3.014 12.1453 3.04645 12.307C3.11164 12.6316 3.25539 12.9351 3.45919 13.1871L3.23659 13.5429C2.78599 14.2634 2.9807 15.2323 3.67068 15.7028C3.91433 15.869 4.19644 15.9567 4.48677 15.9567C4.63308 15.9567 4.77597 15.9341 4.91234 15.8922C4.91746 15.9338 4.92372 15.9754 4.93198 16.0167C5.01396 16.4248 5.24311 16.775 5.57727 17.0026C5.82092 17.1688 6.10302 17.2568 6.39363 17.2568C6.54022 17.2568 6.68312 17.2342 6.81946 17.192C6.87269 17.6307 7.10239 18.0429 7.48384 18.303C7.72749 18.4692 8.00959 18.5571 8.29993 18.5571C8.44624 18.5571 8.58913 18.5346 8.72549 18.4923C8.73062 18.534 8.73688 18.5756 8.74514 18.6172C8.82711 19.025 9.05627 19.3751 9.39042 19.6031C9.63408 19.7692 9.91618 19.8569 10.2068 19.8569C10.714 19.8569 11.182 19.5924 11.4587 19.1498L11.6334 18.8707L13.0558 19.8308C13.3075 20.0023 13.5904 20.0843 13.8708 20.0843C14.359 20.0843 14.838 19.8352 15.1244 19.3775C15.29 19.1124 15.3683 18.814 15.3669 18.5188C15.5334 18.5824 15.7065 18.6136 15.8787 18.6136C16.3669 18.6136 16.8459 18.3646 17.1323 17.9068C17.3088 17.6245 17.3859 17.3041 17.3734 16.9902C17.5185 17.0312 17.6683 17.0523 17.8194 17.0523C17.9381 17.0523 18.0577 17.0395 18.1766 17.0134C18.627 16.9147 19.0132 16.6389 19.2649 16.2367C19.4795 15.8934 19.5737 15.4931 19.5378 15.0909C19.7129 15.1512 19.8942 15.1807 20.0744 15.1807C20.6386 15.1807 21.1931 14.8932 21.5218 14.368C21.7052 14.075 21.8019 13.7353 21.8019 13.386C21.8019 13.1351 21.751 12.8858 21.6542 12.6569C21.7541 12.2907 21.9705 11.9727 22.2722 11.7524L23.4782 10.8729C23.639 10.7558 23.6784 10.524 23.566 10.3558ZM4.05989 15.0805C3.69838 14.8341 3.59648 14.3264 3.83245 13.9489L4.4288 12.9957C4.57397 12.7636 4.81933 12.6251 5.08492 12.6251C5.23664 12.6251 5.38408 12.6712 5.51218 12.7586C5.8734 13.005 5.97558 13.5123 5.73961 13.8898L5.14327 14.843C4.99839 15.0749 4.75303 15.2134 4.48688 15.2134C4.33516 15.2137 4.1877 15.1676 4.05989 15.0805ZM5.96646 16.3806C5.7914 16.2611 5.67129 16.0777 5.62829 15.864C5.58531 15.6503 5.62459 15.4321 5.73902 15.2493L6.33537 14.2961C6.48025 14.0643 6.72561 13.9258 6.99149 13.9258C7.14321 13.9258 7.29094 13.9718 7.41875 14.0589C7.59381 14.1784 7.71392 14.3618 7.75692 14.5755C7.79991 14.7892 7.76062 15.0074 7.64619 15.1901L7.04984 16.1434C6.90496 16.3752 6.6596 16.5137 6.39372 16.5137C6.242 16.5137 6.09427 16.4676 5.96646 16.3806ZM7.87303 17.6809C7.51152 17.4345 7.40963 16.9269 7.6456 16.5494L8.24194 15.5962C8.38711 15.3641 8.63248 15.2256 8.89806 15.2256C9.04978 15.2256 9.19722 15.2716 9.32532 15.359C9.68654 15.6054 9.78873 16.1128 9.55276 16.4903L8.95642 17.4435C8.81153 17.6753 8.56617 17.8138 8.30003 17.8138C8.14831 17.8141 8.00085 17.768 7.87303 17.6809ZM10.2069 19.1142C10.0551 19.1142 9.90742 19.0681 9.7799 18.9813C9.60484 18.8618 9.48472 18.6784 9.44173 18.4647C9.39875 18.251 9.43803 18.0329 9.55217 17.8504L9.83311 17.4015L10.1485 16.8971C10.2934 16.6653 10.5387 16.5268 10.8046 16.5268C10.9563 16.5268 11.1041 16.5729 11.2319 16.66C11.4069 16.7794 11.5271 16.9628 11.57 17.1765C11.613 17.3902 11.5737 17.6084 11.4593 17.7912L10.863 18.7444C10.7181 18.9756 10.4727 19.1142 10.2069 19.1142ZM20.9256 13.9621C20.6253 14.4424 20.0033 14.5836 19.5396 14.2769C19.5373 14.2754 19.5356 14.2742 19.5331 14.2727L15.3326 11.4079L14.9435 12.03L18.3751 14.3704C18.6012 14.5246 18.756 14.7612 18.8115 15.037C18.867 15.3129 18.8164 15.5946 18.6686 15.8306C18.5212 16.0666 18.2943 16.2283 18.0302 16.2863C17.766 16.3442 17.4962 16.291 17.2702 16.1371L13.8382 13.7967L13.4491 14.4188L16.309 16.3692C16.6705 16.6156 16.7724 17.1232 16.5364 17.5005C16.3005 17.8779 15.8143 17.9843 15.453 17.7379L14.6905 17.2181L12.5929 15.7878L12.2038 16.4099L14.3013 17.8402C14.6625 18.0866 14.7644 18.5939 14.5285 18.9714C14.414 19.1542 14.2384 19.2796 14.0338 19.3245C13.8291 19.3694 13.6202 19.3284 13.4434 19.208L12.0224 18.2489L12.0549 18.1969C12.2732 17.8479 12.3483 17.4312 12.2664 17.0231C12.1844 16.615 11.9552 16.2649 11.6211 16.0372C11.3774 15.8711 11.0953 15.7834 10.8047 15.7834C10.6581 15.7834 10.5152 15.806 10.3789 15.8482C10.3254 15.4098 10.096 14.9972 9.7145 14.7375C9.47056 14.571 9.18848 14.483 8.89814 14.483C8.75183 14.483 8.60921 14.5056 8.47287 14.5475C8.46774 14.5059 8.46148 14.4643 8.45323 14.423C8.37125 14.0149 8.1421 13.6648 7.80794 13.4371C7.56429 13.2709 7.28218 13.183 6.99158 13.183C6.84498 13.183 6.70209 13.2055 6.56575 13.2477C6.51223 12.8093 6.28282 12.3968 5.90137 12.137C5.65742 11.9706 5.37534 11.8826 5.085 11.8826C4.60452 11.8826 4.15904 12.1204 3.87808 12.5225C3.81517 12.4087 3.76906 12.2844 3.74287 12.1548C3.69135 11.8975 3.59286 11.6564 3.45025 11.4382C3.30764 11.2207 3.12831 11.0373 2.91767 10.8937L1.84852 10.1643L5.19495 4.81364L6.02813 5.38193C6.61053 5.77902 7.36114 5.82866 7.98707 5.51182C8.29533 5.35548 8.63435 5.26156 8.9765 5.2363L7.17126 8.12265C7.06822 8.28731 7.03292 8.48377 7.07163 8.67638C7.11035 8.86869 7.21851 9.03396 7.37621 9.14155L7.51341 9.23517C7.94694 9.53091 8.43482 9.67211 8.91759 9.67211C9.75902 9.67211 10.5848 9.24291 11.0781 8.45408L12 6.97984C12.0883 6.83866 12.2699 6.79912 12.4048 6.89126L20.6326 12.5016C20.7735 12.5976 20.8853 12.724 20.9653 12.8767C21.047 13.0322 21.0903 13.2087 21.0903 13.3862C21.0903 13.5907 21.0332 13.79 20.9256 13.9621ZM21.8643 11.1435C21.5637 11.3625 21.3218 11.6488 21.1527 11.9787C21.1106 11.9436 21.0664 11.9103 21.0212 11.8794L12.7939 6.26878C12.6248 6.15346 12.4347 6.09847 12.2463 6.09847C11.9183 6.09847 11.5964 6.26582 11.404 6.57346L10.482 8.0477C9.9201 8.94622 8.76272 9.19976 7.90215 8.61303L7.77064 8.52326L9.71593 5.4132C9.90494 5.11092 10.1748 4.88057 10.4959 4.74683L12.3626 3.96988C13.1699 3.63371 14.0785 3.67384 14.8557 4.07955L16.85 5.12075C17.606 5.51545 18.4805 5.53805 19.2464 5.19535L22.7787 10.477L21.8643 11.1435Z" fill="black" stroke="black" strokeWidth="0.6" />
                      </g>
                    </svg>
                  </AppIcon>

                  <AppIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <mask id="mask0_4096_52896" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_4096_52896)">
                        <path d="M4.3077 19.5C3.80257 19.5 3.375 19.325 3.025 18.975C2.675 18.625 2.5 18.1974 2.5 17.6923V6.3077C2.5 5.80257 2.675 5.375 3.025 5.025C3.375 4.675 3.80257 4.5 4.3077 4.5H19.6923C20.1974 4.5 20.625 4.675 20.975 5.025C21.325 5.375 21.5 5.80257 21.5 6.3077V17.6923C21.5 18.1974 21.325 18.625 20.975 18.975C20.625 19.325 20.1974 19.5 19.6923 19.5H4.3077ZM12 12.5576L3.99998 7.44225V17.6923C3.99998 17.782 4.02883 17.8557 4.08653 17.9134C4.14423 17.9711 4.21795 18 4.3077 18H19.6923C19.782 18 19.8557 17.9711 19.9134 17.9134C19.9711 17.8557 20 17.782 20 17.6923V7.44225L12 12.5576ZM12 11L19.8461 5.99998H4.15383L12 11ZM3.99998 7.44225V5.99998V17.6923C3.99998 17.782 4.02883 17.8557 4.08653 17.9134C4.14423 17.9711 4.21795 18 4.3077 18H3.99998V7.44225Z" fill="#121212" />
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

                <div className='flex flex-grow gap-3'>
                  <AppButton onClick={() => updateModals({ isGoLiveModalOpen: true })} className='flex-grow px-6' variant='error'>
                    Go Live
                  </AppButton>

                  <AppButton className='flex-grow px-6' variant='error'>
                    Go Private
                  </AppButton>
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
                  {performer.bio}
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
                        {performer.gender}
                      </span>
                    </div>

                    <div>
                      <h4 className='mb-2 font-semibold'>State</h4>
                      <span>
                        {performer.state}
                      </span>
                    </div>

                    <div>
                      <h4 className='mb-2 font-semibold'>City</h4>
                      <span>
                        {performer.city}
                      </span>
                    </div>
                  </div>

                  <div className='space-y-6'>
                    <div className=''>
                      <h4 className='mb-2 font-semibold'>Ethnicity:</h4>
                      <span>
                        {performer.ethnicity}
                      </span>
                    </div>

                    <div className=''>
                      <h4 className='mb-2 font-semibold'>Height</h4>
                      <span>
                      {performer.height}
                      </span>
                    </div>

                    <div className=''>
                      <h4 className='mb-2 font-semibold'>Dob</h4>
                      <span>
                      {performer.dateOfBirth ? `${new Date(performer.dateOfBirth).getMonth() + 1}/${new Date(performer.dateOfBirth).getDate()}/${new Date(performer.dateOfBirth).getFullYear()}` : ''}
                      </span>
                    </div>
                  </div>

                  <div className='space-y-6'>
                    <div className=''>
                      <h4 className='mb-2 font-semibold'>Relationship status:</h4>
                      <span>
                        {performer.relationship}
                      </span>
                    </div>

                    <div className=''>
                      <h4 className='mb-2 font-semibold'>Joined:</h4>
                      <span>
                      {performer.dateOfBirth ? `${new Date(performer.createdAt).getMonth() + 1}/${new Date(performer.createdAt).getDate()}/${new Date(performer.createdAt).getFullYear()}` : ''}
                      </span>
                    </div>

                    <div className='md:hidden'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="98" height="35" fill="none" viewBox="0 0 98 35">
                        <g clipPath="url(#a)">
                          <path fill="#F3E6F1" d="M8 35a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8h82a8 8 0 0 1 8 8v19a8 8 0 0 1-8 8H8Z" />
                          <mask id="b" fill="#fff">
                            <path d="M27 0h70v35H27V0Z" />
                          </mask>
                          <path fill="#F7F7F7" d="M27 0h70v35H27V0Z" />
                          <path fill="#C182BB" d="M28 35V0h-2v35h2Z" mask="url(#b)" />
                          <g clipPath="url(#c)">
                            <rect width="18" height="18" x="5" y="9" fill="#850079" rx="9" />
                            <g clipPath="url(#d)">
                              <mask id="e" width="21" height="20" x="3" y="5" maskUnits="userSpaceOnUse">
                                <path fill="#D9D9D9" d="M3.926 5.346h19.149v19.149H3.926z" />
                              </mask>
                              <g mask="url(#e)">
                                <path fill="#FFE6A4" stroke="#FFE6A4" stroke-width=".191" d="m14.462 17.054.02.068h1.598l-1.2.88-.053.039.017.063.41 1.558-1.218-.894-.057-.041-.057.041-1.218.893.41-1.557.017-.063-.053-.039-1.2-.88h1.597l.021-.068.483-1.61.483 1.61Z" />
                                <path fill="#FFE6A4" stroke="#FFE6A4" stroke-width=".191" d="m17.434 14.114-.027.06.047.048c.94.94 1.504 2.162 1.504 3.57 0 2.724-2.255 4.98-4.979 4.98S9 20.515 9 17.791c0-1.408.563-2.63 1.504-3.57l.047-.047-.027-.06-3.098-6.759h5.055l1.41 3.104.088.191.087-.191 1.41-3.104h5.056l-3.098 6.758Zm-1.061-5.513h-.06l-.026.054-1.628 3.35-.02.043.02.043.383.766.021.041.046.01c.465.093.837.278 1.22.47l.09.044.04-.09 2.107-4.595.062-.136h-2.255Zm-6.894 0h-.15l.063.136 2.106 4.595.042.09.088-.044a6.258 6.258 0 0 1 1.886-.565l.129-.019-.056-.117-1.915-4.021-.026-.055H9.479Zm.862 9.191c0 1.968 1.67 3.639 3.638 3.639s3.638-1.67 3.638-3.639c0-1.967-1.67-3.638-3.638-3.638s-3.638 1.67-3.638 3.638Z" />
                              </g>
                            </g>
                          </g>
                          <rect width="18" height="18" x="5" y="9" stroke="#850079" stroke-width=".367" rx="9" />
                          <path fill="#850079" d="m35.082 17 1.432-8.727h1.193L36.276 17h-1.194Zm-3.933-2.25.2-1.193h6.716l-.2 1.193H31.15Zm.865 2.25 1.432-8.727h1.193L33.207 17h-1.193Zm-.358-5.284.196-1.193h6.716l-.196 1.193h-6.716Zm11.392-3.443V17h-1.581V9.811h-.051l-2.041 1.304V9.666l2.169-1.393h1.504Zm5.442 8.893c-.702 0-1.304-.177-1.807-.532-.5-.358-.885-.874-1.155-1.547-.267-.676-.4-1.49-.4-2.442.002-.952.137-1.761.404-2.43.27-.67.655-1.18 1.155-1.533.503-.352 1.104-.529 1.803-.529.699 0 1.3.177 1.802.529.503.352.888.863 1.155 1.534.27.67.405 1.48.405 2.429 0 .954-.135 1.77-.405 2.446-.267.673-.652 1.187-1.155 1.543-.5.355-1.1.532-1.802.532Zm0-1.334c.545 0 .976-.268 1.29-.805.32-.54.478-1.334.478-2.382 0-.693-.072-1.276-.217-1.747-.145-.472-.35-.827-.614-1.066a1.343 1.343 0 0 0-.937-.362c-.543 0-.972.27-1.287.81-.316.537-.475 1.325-.478 2.365-.002.696.067 1.281.21 1.756.144.474.349.832.613 1.073.264.24.578.358.942.358Zm8.004 1.334c-.702 0-1.304-.177-1.807-.532-.5-.358-.885-.874-1.155-1.547-.267-.676-.4-1.49-.4-2.442.002-.952.137-1.761.404-2.43.27-.67.655-1.18 1.155-1.533.503-.352 1.104-.529 1.803-.529.699 0 1.3.177 1.802.529.503.352.888.863 1.155 1.534.27.67.405 1.48.405 2.429 0 .954-.135 1.77-.405 2.446-.267.673-.652 1.187-1.155 1.543-.5.355-1.1.532-1.802.532Zm0-1.334c.545 0 .975-.268 1.29-.805.319-.54.478-1.334.478-2.382 0-.693-.072-1.276-.217-1.747-.145-.472-.35-.827-.614-1.066a1.343 1.343 0 0 0-.937-.362c-.543 0-.972.27-1.287.81-.316.537-.475 1.325-.478 2.365-.002.696.067 1.281.21 1.756.144.474.349.832.613 1.073.264.24.578.358.942.358Zm-24.676 5.35h.84l1.978 4.83h.068l1.977-4.83h.841V27h-.659v-4.42h-.056L34.987 27h-.636l-1.818-4.42h-.057V27h-.66v-5.818Zm8.799 5.909c-.394 0-.74-.094-1.037-.281a1.911 1.911 0 0 1-.693-.787c-.165-.337-.247-.731-.247-1.182 0-.455.082-.851.247-1.19a1.89 1.89 0 0 1 .693-.79 1.902 1.902 0 0 1 1.037-.282c.394 0 .739.094 1.034.282.297.187.528.45.693.79.167.339.25.735.25 1.19 0 .45-.083.845-.25 1.182-.165.337-.396.6-.693.787-.296.187-.64.28-1.034.28Zm0-.602c.3 0 .545-.077.739-.23.193-.154.336-.356.428-.606.093-.25.14-.52.14-.812a2.34 2.34 0 0 0-.14-.815 1.374 1.374 0 0 0-.428-.611c-.194-.155-.44-.233-.74-.233-.298 0-.545.078-.738.233a1.374 1.374 0 0 0-.429.61 2.34 2.34 0 0 0-.139.816c0 .292.046.562.14.812.092.25.235.452.428.606.193.153.44.23.739.23Zm6.092-2.875-.603.17a1.12 1.12 0 0 0-.167-.293.814.814 0 0 0-.296-.238 1.073 1.073 0 0 0-.48-.094c-.267 0-.49.062-.668.185-.176.121-.264.275-.264.463 0 .167.06.298.182.395.121.096.31.177.568.241l.648.16c.39.094.68.239.872.434.191.193.287.442.287.747 0 .25-.072.474-.216.67a1.42 1.42 0 0 1-.597.466 2.18 2.18 0 0 1-.892.17c-.445 0-.813-.096-1.105-.289-.291-.193-.476-.475-.554-.846l.637-.16c.06.235.175.411.343.529.17.117.393.176.668.176.313 0 .56-.066.744-.199.186-.134.279-.295.279-.483a.507.507 0 0 0-.16-.38c-.105-.105-.268-.182-.488-.233l-.727-.17c-.4-.096-.693-.242-.88-.441a1.067 1.067 0 0 1-.28-.753c0-.246.07-.464.208-.654.14-.189.33-.338.571-.446.243-.107.517-.162.824-.162.432 0 .77.095 1.017.285.248.189.424.439.529.75Zm2.986-.978v.569h-2.261v-.569h2.261Zm-1.602-1.045h.67v4.159c0 .19.028.331.083.426a.427.427 0 0 0 .215.188c.09.03.183.045.282.045.073 0 .134-.004.181-.011l.114-.023.137.602a1.405 1.405 0 0 1-.5.08c-.19 0-.375-.04-.557-.122a1.107 1.107 0 0 1-.45-.372c-.117-.167-.175-.377-.175-.631V21.59ZM53.044 27v-5.818h3.489v.625h-2.784v1.966h2.523v.625h-2.523V27h-.705Zm6.057.09c-.394 0-.74-.093-1.037-.28a1.911 1.911 0 0 1-.693-.787c-.165-.337-.247-.731-.247-1.182 0-.455.082-.851.247-1.19.167-.34.398-.603.693-.79a1.902 1.902 0 0 1 1.037-.282c.394 0 .739.094 1.034.282.298.187.529.45.694.79.166.339.25.735.25 1.19 0 .45-.084.845-.25 1.182-.165.337-.396.6-.694.787a1.89 1.89 0 0 1-1.034.28Zm0-.601c.3 0 .546-.077.739-.23.193-.154.336-.356.429-.606.093-.25.139-.52.139-.812a2.34 2.34 0 0 0-.14-.815 1.374 1.374 0 0 0-.428-.611c-.193-.155-.44-.233-.739-.233s-.545.078-.738.233a1.374 1.374 0 0 0-.43.61 2.34 2.34 0 0 0-.139.816c0 .292.047.562.14.812.092.25.235.452.429.606.193.153.439.23.738.23Zm3.671-5.307V27h-.67v-5.818h.67Zm1.899 0V27H64v-5.818h.67Zm3 5.909c-.393 0-.74-.094-1.036-.281a1.911 1.911 0 0 1-.694-.787c-.164-.337-.247-.731-.247-1.182 0-.455.083-.851.247-1.19.167-.34.398-.603.694-.79a1.902 1.902 0 0 1 1.036-.282c.394 0 .74.094 1.035.282.297.187.528.45.693.79.166.339.25.735.25 1.19 0 .45-.084.845-.25 1.182-.165.337-.396.6-.693.787-.296.187-.64.28-1.035.28Zm0-.602c.3 0 .546-.077.74-.23.192-.154.335-.356.428-.606.093-.25.14-.52.14-.812a2.34 2.34 0 0 0-.14-.815 1.375 1.375 0 0 0-.429-.611c-.193-.155-.44-.233-.739-.233s-.545.078-.738.233a1.374 1.374 0 0 0-.43.61 2.34 2.34 0 0 0-.138.816c0 .292.046.562.139.812.093.25.236.452.429.606.193.153.44.23.738.23Zm3.841.511-1.33-4.364h.705l.944 3.341h.045l.932-3.34h.716l.92 3.329h.046l.943-3.33h.704L74.807 27h-.658l-.955-3.352h-.068L72.171 27h-.659Zm7.193.09c-.42 0-.783-.092-1.088-.277a1.87 1.87 0 0 1-.702-.785c-.163-.337-.244-.729-.244-1.176 0-.447.081-.84.244-1.181.165-.343.394-.61.688-.802.295-.193.64-.29 1.034-.29.227 0 .451.038.673.114.222.076.423.199.605.37.182.168.327.392.435.67.108.278.162.621.162 1.028v.285h-3.364v-.58h2.682c0-.246-.05-.466-.148-.66a1.114 1.114 0 0 0-1.045-.624c-.267 0-.498.066-.694.199a1.31 1.31 0 0 0-.445.511c-.105.21-.157.436-.157.676v.386c0 .33.057.61.17.839.116.227.276.4.48.52.205.117.443.176.714.176.176 0 .335-.025.477-.074.144-.051.268-.127.372-.227.105-.103.185-.23.242-.381l.647.182a1.44 1.44 0 0 1-.343.58c-.161.164-.36.293-.597.386a2.21 2.21 0 0 1-.798.136Zm4.474 0a1.7 1.7 0 0 1-.963-.275 1.86 1.86 0 0 1-.653-.784c-.157-.339-.236-.74-.236-1.201 0-.459.079-.856.236-1.194.157-.337.376-.597.656-.78.28-.185.604-.277.972-.277.284 0 .508.048.673.143.167.092.294.198.38.318.09.117.159.214.208.29h.057v-2.148h.67V27h-.647v-.67h-.08c-.05.08-.12.18-.21.3-.091.12-.22.227-.39.322-.168.092-.392.139-.673.139Zm.091-.601c.27 0 .496-.07.682-.21.186-.143.327-.339.423-.589.097-.252.145-.542.145-.872 0-.326-.047-.61-.142-.855a1.245 1.245 0 0 0-.42-.574 1.118 1.118 0 0 0-.688-.207c-.284 0-.52.073-.71.219a1.31 1.31 0 0 0-.423.588 2.33 2.33 0 0 0-.14.83c0 .31.048.592.143.846.096.252.238.452.426.602.19.148.424.222.704.222Z" />
                        </g>
                        <path stroke="#850079" d="M8 34.5A7.5 7.5 0 0 1 .5 27V8A7.5 7.5 0 0 1 8 .5h82A7.5 7.5 0 0 1 97.5 8v19a7.5 7.5 0 0 1-7.5 7.5H8Z" />
                        <defs>
                          <clipPath id="a">
                            <path fill="#fff" d="M8 35a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8h82a8 8 0 0 1 8 8v19a8 8 0 0 1-8 8H8Z" />
                          </clipPath>
                          <clipPath id="c">
                            <rect width="18" height="18" x="5" y="9" fill="#fff" rx="9" />
                          </clipPath>
                          <clipPath id="d">
                            <path fill="#fff" d="M3.926 5.346h19.149v19.149H3.926z" />
                          </clipPath>
                        </defs>
                      </svg>

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
                     {
                      performer.ranking.mostFansPosition <=100 && <div className='flex flex-col items-center p-2 bg-base-200'>
                       <span className='text-xs font-semibold text-purple-900'>#{performer.ranking.mostFansPosition}</span>
                       <span className='text-[10px] text-purple-900'>Most Followed</span>
                     </div>
                     }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="model-content">
      {/* Tabs container with switch effect */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 p-2 bg-gray-300 rounded-full" style={{ width: '30%' }}>
          <button
            onClick={() => {
              this.handleTabChange('video')
              this.setState({ dropdownValue: "updatedAt"})

            }}
            style={{ width: '45%' }}
            className={`px-6 py-2 rounded-full flex items-center gap-2 transition-colors
              ${tab === 'video' ? 'bg-white text-black shadow' : 'bg-transparent text-gray-700'}`}
              
          >
            <VideoCameraOutlined />
            Video {performer._id === currentUser._id ? performer.stats.totalVideos : performer.stats.totalActiveVideos}
          </button>

          <button
            onClick={() => {
              this.handleTabChange('photo')
              this.setState({ dropdownValue: "updatedAt"})
            }}
            style={{ width: '50%' }}
            className={`px-6 py-2 rounded-full flex items-center gap-2 transition-colors
              ${tab === 'photo' ? 'bg-white text-black shadow' : 'bg-transparent text-gray-700'}`}
          >
            <PictureOutlined />
            Photo {performer._id === currentUser._id ? performer.stats.totalPhotos : performer.stats.totalActivePhotos}
          </button>
          </div>

          <div className="heading-tab mb-4 flex justify-start">
            <SearchPostBar
              searching={loadingFeed}
              tab={tab}
              handleSearch={this.handleFilterSearch.bind(this)}
              dropdownValue={this.state.dropdownValue}
              handleDropDown={this.handleDropDown}
              handleViewGrid={(isGrid) => console.log(isGrid)}
            />
          </div>
        </div>

        {/* Tab content */}
        

        <div className="main-container p-4 bg-white">
              <div  className="">
                {/* Renderiza contenido dinámico basado en el tab */}
                <div className="w-full">
                  {tab === 'video' ? (
                    <ScrollListFeed
                      items={feeds}
                      loading={loadingFeed}
                      canLoadmore
                      loadMore={this.loadMoreItem.bind(this)}
                      isGrid={isGrid}
                      performer={performer}
                      tab={tab}
                    />
                  ) : (
                    <div className="main-container">
                     <ScrollListFeed
                       items={feeds}
                       loading={loadingFeed}
                       canLoadmore
                       loadMore={this.loadMoreItem.bind(this)}
                       isGrid={isGrid}
                       performer={performer}
                       tab={tab}
                     />
                   </div>
                  )}
                </div>
          </div>
        </div>
      </div>
    </div>


          <GoLiveModal isOpen={modals.isGoLiveModalOpen} onClose={() => updateModals({ isGoLiveModalOpen: false })} />
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
  updateModals,
  onFollow
};
export default connect(mapStates, mapDispatch)(PerformerProfile);
