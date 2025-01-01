/* eslint-disable react/no-danger */
/* eslint-disable react/no-unused-prop-types */
import { PureComponent } from "react";
import {
  Layout,
  Badge,
  Drawer,
  Divider,
  Dropdown,
  message,
  Button,
  Col,
  Row,
  Modal,
} from "antd";
import { connect } from "react-redux";
import { LuMessageCircle } from "react-icons/lu";
import Link from "next/link";
import {
  IUser,
  IUIConfig,
  StreamSettings,
  ISettings,
  IPerformer,
} from "src/interfaces";
import { logout, logoutSuccess } from "@redux/auth/actions";
import {
  CrownOutlined,
  BookOutlined,
  RiseOutlined,
  UsergroupAddOutlined,
  SearchOutlined,
  UserOutlined,
  HomeFilled,
  LogoutOutlined,
  QuestionOutlined,
  BellOutlined,
  PlusOutlined,
  LoginOutlined,
  DashboardOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Router, { withRouter, Router as RouterEvent } from "next/router";
import { ROLE_PERMISSIONS } from "src/constants";
import {
  messageService,
  authService,
  streamService,
  earningService,
  cookieService,
} from "src/services";
import { Event, SocketContext } from "src/socket";
import {
  addPrivateRequest,
  accessPrivateRequest,
  cancelPrivateRequest,
  addMuted,
} from "@redux/streaming/actions";
import { setUnreadCount } from "@redux/notification/actions";
import { updateTabValue, updateUIValue } from "src/redux/ui/actions";
import { updateCurrentUser, updateBalance } from "@redux/user/actions";
// import './header.less';
import dynamic from "next/dynamic";
import { getResponseError } from "@lib/utils";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import { AppButton, buttonVariants } from "@components/ui/shared/AppButton";
import { IModals } from "@interfaces/modals";
import { updateModals } from "@redux/modals/actions";
import { DiamondIcon, RubyIcon, RubySvg } from "src/icons";
import { TogglePhotoAndVideoCreatePost } from "@components/create-feed/toggle-photo-and-video-create-post";
import "./sidebar.less";
const NotificationHeaderMenu = dynamic(
  () => import("@components/notification/NotificationHeaderMenu"),
  { ssr: false }
);

interface IProps {
  isMenuOpen: boolean;
  updateBalance: Function;
  updateUIValue: Function;
  updateCurrentUser: Function;
  user: IPerformer;
  logout: Function;
  logoutSuccess: Function;
  router: any;
  ui: IUIConfig;
  privateRequests: any;
  addPrivateRequest: Function;
  accessPrivateRequest: Function;
  setStatusNotification: Function;
  addMuted: Function;
  settings: StreamSettings;
  loggedIn: boolean;
  isUnreadsNotification: boolean;
  cancelPrivateRequest: Function;
  setUnreadCount: Function;
  config: ISettings;
  notificationCount: number;
  statusNotification: boolean;
  fetchNotificationSuccess: boolean;
  modals: IModals;
  updateModals: Function;
  updateTabValue: Function;
}

class Sidebar extends PureComponent<IProps> {
  state = {
    isMenuOpen: false,
    totalNotReadMessage: 0,
    openProfile: false,
    openStripeAlert: false,
    loading: false,
    isViewNotification: true,
    totalEarning: 0,
    isSelectVideoOrPhoto: false,
  };

  async componentDidMount() {
    const { loggedIn } = this.props;
    const cookieViewNotification = await cookieService.getCookie(
      "isViewNotification"
    );
    this.setState({ isViewNotification: cookieViewNotification === "true" });
    RouterEvent.events.on("routeChangeStart", this.handleChangeRoute);
    loggedIn && this.getEarning();
  }

  async componentDidUpdate(prevProps: any) {
    const { user, router } = this.props;
    const { openStripeAlert } = this.state;
    const cookieViewNotification = await cookieService.getCookie(
      "isViewNotification"
    );
    this.setState({ isViewNotification: cookieViewNotification === "true" });
    if (user._id && prevProps.user._id !== user._id) {
      this.getEarning();

      // const resp = await payoutRequestService.search({});
      // if (resp.data) {
      //   this.setState({ showPayoutResquest: resp.data.total > 0 });
      // }
      this.handleCountNotificationMessage();
      if (
        (router.pathname !== "/model/banking" &&
          user.isPerformer &&
          !user?.stripeAccount?.payoutsEnabled) ||
        (router.pathname !== "/model/banking" &&
          user.isPerformer &&
          !user?.stripeAccount?.detailsSubmitted)
      ) {
        // eslint-disable-next-line react/no-did-update-set-state
        // this.setState({ openStripeAlert: true });
      }
    }
    // eslint-disable-next-line react/no-did-update-set-state
    if (openStripeAlert && router.pathname === "/model/banking") {
      this.setState({ openStripeAlert: false });
    }
  }

  componentWillUnmount() {
    RouterEvent.events.off("routeChangeStart", this.handleChangeRoute);
    const token = authService.getToken();
    const socket = this.context;
    token && socket && socket.emit("auth/logout", { token });
  }

  handleChangeRoute = () => {
    this.setState({
      openProfile: false,
    });
  };

  handleMessage = async (event) => {
    if (event) {
      this.setState({ totalNotReadMessage: event.total });
    }
  };

  async handleCountNotificationMessage() {
    const data = await (await messageService.countTotalNotRead()).data;
    if (data) {
      this.setState({ totalNotReadMessage: data.total });
    }
  }

  async handlePrivateChat(data: { conversationId: string; user: IUser }) {
    const { addPrivateRequest: _addPrivateRequest } = this.props;
    await _addPrivateRequest(data);
    message.success({
      key: "private-request",
      content: (
        <>
          <span>
            {data?.user?.name || data?.user?.username} sent you a Private Call
            request!{" "}
          </span>
          <span>
            <RouterContext.Provider value={Router}>
              <Link
                prefetch={false}
                href="/model/private-waiting-room"
                as="/model/private-waiting-room"
              >
                <a aria-hidden> Click here </a>
              </Link>
            </RouterContext.Provider>
          </span>
          <span>to view</span>
        </>
      ),
      onClick: () => message.destroy("private-request"),
    });
  }

  handleCancelPrivateChat(data: { conversationId: string; user: IUser }) {
    const { cancelPrivateRequest: handleCancel } = this.props;
    message.success(
      `${
        data?.user?.name || data?.user?.username
      }'ve cancelled private call request`,
      10
    );
    handleCancel(data.conversationId);
  }

  handleMuteComment(data) {
    const { addMuted: _addMuted } = this.props;
    _addMuted(data);
  }

  async handleTimeOutPrivateChat(data: {
    conversationId: string;
    user: IUser;
  }) {
    const { cancelPrivateRequest: handleCancel } = this.props;
    Router.push(
      {
        pathname: "/live-now",
        query: {
          tab: "private",
        },
      },
      "/live-now"
    );

    await message.success(
      `${
        data?.user?.name || data?.user?.username
      }'seems busy. Please select another model for a private video chat`,
      15
    );
    handleCancel(data.conversationId);
  }

  async handleDeclineCall(conversationId: string) {
    const { accessPrivateRequest: handleRemoveRequest } = this.props;
    try {
      // await streamService.declinePrivateChat(conversationId);
      handleRemoveRequest(conversationId);
    } catch (e) {
      const err = await e;
      message.error(err?.message || "Error occured, please try again later");
    }
  }

  async handleUpdateBalance(event) {
    const { updateBalance: handleUpdateBalance } = this.props;
    handleUpdateBalance({
      token: event.token,
      type: "diamond-balance",
    });
  }

  async handlePaymentStatusCallback({ redirectUrl }) {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }

  getEarning = async () => {
    try {
      this.setState({ loading: true });
      const earning = await earningService.performerSearch({
        limit: 10,
        offset: 0,
        isToken: true,
      });
      this.setState({ totalEarning: earning.data.total, loading: false });
    } catch (error) {
      message.error(getResponseError(await error));
      this.setState({ loading: false });
    }
  };

  async togglePrivateChatStatus() {
    const { user, updateCurrentUser: handleUpdateUser } = this.props;
    const data = await streamService.togglePrivateChatStatus();
    if (data) {
      handleUpdateUser({ ...user, privateChat: data.privateChat });
    }
  }

  handleNavigate(route: string, index: number) {
    Router.push(route);
    this.props.updateTabValue(index);
  }

  async beforeLogout() {
    const { logout: handleLogout, user, logoutSuccess } = this.props;
    try {
      const socket = this.context;
      const token = authService.getToken();

      handleLogout();

      if (user.privateChat) {
        this.togglePrivateChatStatus();
      }
      if (token && socket) {
        await socket.emit("auth/logout", { token });
      }

      cookieService.setCookie("isViewNotification", false, 24 * 60);

      setTimeout(() => {
        logoutSuccess();
      }, 3000);
    } catch (e) {
      const error = await Promise.resolve(e);
      message.error(
        error.message || "Something went wrong, please try again later"
      );
    }
  }

  renderMenuAllUserType() {
    const { notificationCount, router, user } = this.props;
    const { totalNotReadMessage, isViewNotification } = this.state;
    return [
      <Dropdown
        key={user?._id}
        overlay={
          <NotificationHeaderMenu
            onReceiveMessage={() => {
              this.setState({ isViewNotification: false });
              cookieService.setCookie("isViewNotification", false, 24 * 60);
            }}
            totalNotReadMessage={totalNotReadMessage}
            notificationCount={notificationCount}
          />
        }
        forceRender
      >
        <span aria-label="notifications">
          <Badge
            className="cart-total"
            dot={!isViewNotification && notificationCount > 0}
          >
            <BellOutlined
              onMouseEnter={() => {
                this.setState({ isViewNotification: true });
                cookieService.setCookie("isViewNotification", true, 24 * 60);
              }}
              className={
                router.pathname === "/notifications"
                  ? "anticon-bell active"
                  : "anticon-bell"
              }
            />
          </Badge>
        </span>
      </Dropdown>,
    ];
  }

  render() {
    const {
      user,
      router,
      ui,
      loggedIn,
      modals,
      updateModals,
      isUnreadsNotification,
    } = this.props;

    const { openProfile, openStripeAlert, loading, totalEarning } = this.state;

    return (
      <div
        className={`main-header custom-sidebar ${
          ui.sidebarCollapse ? "collapsed" : ""
        }`}
        id="main-header"
      >
        <Event
          event="nofify_read_messages_in_conversation"
          handler={this.handleMessage.bind(this)}
        />
        <Event
          event="private-chat-request"
          handler={this.handlePrivateChat.bind(this)}
        />
        <Event
          event="update_balance"
          handler={this.handleUpdateBalance.bind(this)}
        />
        <Event
          event="payment_status_callback"
          handler={this.handlePaymentStatusCallback.bind(this)}
        />
        <Event
          event="private-chat-cancel"
          handler={this.handleCancelPrivateChat.bind(this)}
        />
        <Event
          event="private-chat-timeOut"
          handler={this.handleTimeOutPrivateChat.bind(this)}
        />
        <Event
          event="mute-comment"
          handler={this.handleMuteComment.bind(this)}
        />

        <>
          {loggedIn && (
            <>
              <div className="mb-5">
                <div className="flex gap-2">
                  <Link
                    href={{
                      pathname: "/model/profile",
                      query: { username: user?.username || user?._id },
                    }}
                    passHref
                  >
                    <a className={``}>
                      <img
                        className="w-10 h-10 rounded-full"
                        src={user?.avatar || "/static/no-avatar.png"}
                        alt="avatar"
                      />
                    </a>
                  </Link>

                  <div>
                    <Link
                      href={{
                        pathname: "/model/profile",
                        query: { username: user?.username || user?._id },
                      }}
                      passHref
                    >
                      <a className="block text-base leading-5 text-black capitalize hover:text-purple-900">
                        {user?.name}
                      </a>
                    </Link>
                    <span className="text-xs font-light text-black">
                      {" "}
                      {user?.username
                        ? `@${user?.username?.substring(0, 24)}`
                        : "n/a"}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end ">
                <LuMessageCircle size={20} />
                </div>
              </div>

              <div className="flex flex-col gap-4 px-2 py-4 mb-3 border-t border-b border-base-400">
                
                <div className="flex  items-center  border-b border-base-400 pb-4">
                 
                  <div className="w-1/2 border-r-1 border-base-400">
                    <button
                      onClick={() => this.handleNavigate("/wallet?ruby", 0)}
                    >
                      <a className="mb-1 text-base font-semibold leading-4 text-black">
                        Rubys
                        <div className="flex items-center gap-1">
                         <div className='ml-2'>
                           <RubyIcon className="w-5 h-5" />
                          <span className="text-sm font-light">
                            {Number.isInteger(user?.rubyBalance)
                              ? user?.rubyBalance
                              : Math.floor(user?.rubyBalance * 10) / 10}
                          </span>
                         </div>
                        </div>
                      </a>
                    </button>
                  </div>

                 
                   {user?.balance > 0 && (
                    <div className="w-1/2">
                      <button
                        onClick={() =>
                          this.handleNavigate("/wallet?diamond", 1)
                          
                        }
                        className='pl-4'
                      >
                        <a className="mb-1 text-base font-semibold leading-4 text-black">
                          Diamonds
                          <div className="flex items-center gap-1">
                            <DiamondIcon className="w-5 h-5" />
                            <span className="text-sm font-light">
                              {Number.isInteger(user?.balance)
                                ? user?.balance
                                : Math.floor(user?.balance * 10) / 10}
                            </span>
                          </div>
                        </a>
                      </button>
                    </div>
                  )}
                </div>

               
                <div className="flex  items-center ">
                 
                  {!user?.roles?.includes(
                    ROLE_PERMISSIONS.ROLE_HOST_PRIVATE
                  ) && (
                    <div className="w-1/2 border-r-1 border-base-400">
                     <div className="ml-12px">
                     <h4 className="mb-1 text-sm font-semibold leading-4 text-black">
                        Fans
                      </h4>
                      <span className="text-sm font-light">
                        {user?.stats?.totalFollower}
                      </span>
                     </div>
                    </div>
                  )}

                 
                  <div className="w-1/2 pl-4">
                    <div className="">
                      <h4 className="mb-1 text-sm font-semibold leading-4 text-black">
                      Following
                    </h4>
                    <span className="text-sm font-light">
                      {user?.stats?.totalFollowing}
                    </span>
                    </div>
                  </div>
                </div>
              </div>
            
              <nav>

              

                <ul className="">
                <TogglePhotoAndVideoCreatePost modals={modals} />
                  <li>
                    <Link href="/model/account" passHref>
                      <a
                        className={`menu-link ${
                          (router.pathname.startsWith("/model/profile") ||
                            router.pathname.startsWith("/model/account")) &&
                          "font-semibold"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <mask
                            id="a"
                            width="24"
                            height="24"
                            x="0"
                            y="0"
                            maskUnits="userSpaceOnUse"
                          >
                            <path fill="#D9D9D9" d="M0 0h24v24H0z" />
                          </mask>
                          <g mask="url(#a)">
                            <path
                              fill="#121212"
                              d="M6.523 17.792c.85-.63 1.776-1.129 2.778-1.494a9.264 9.264 0 0 1 3.199-.548c1.13 0 2.197.183 3.199.548 1.002.366 1.928.864 2.778 1.494a7.882 7.882 0 0 0 1.478-2.373A7.714 7.714 0 0 0 20.5 12.5c0-2.217-.78-4.104-2.337-5.663C16.604 5.28 14.717 4.5 12.5 4.5s-4.104.78-5.663 2.337C5.28 8.396 4.5 10.283 4.5 12.5c0 1.047.182 2.02.545 2.92a7.888 7.888 0 0 0 1.478 2.372ZM12.5 13.25c-.913 0-1.683-.313-2.31-.94s-.94-1.397-.94-2.31.313-1.683.94-2.31 1.397-.94 2.31-.94 1.683.313 2.31.94.94 1.397.94 2.31-.313 1.683-.94 2.31-1.397.94-2.31.94Zm0 8.75a9.31 9.31 0 0 1-3.713-.744 9.54 9.54 0 0 1-3.016-2.027 9.54 9.54 0 0 1-2.027-3.017A9.31 9.31 0 0 1 3 12.5c0-1.32.248-2.557.744-3.713a9.54 9.54 0 0 1 2.027-3.016 9.54 9.54 0 0 1 3.016-2.027A9.31 9.31 0 0 1 12.5 3a9.31 9.31 0 0 1 3.712.744 9.54 9.54 0 0 1 3.017 2.027 9.54 9.54 0 0 1 2.027 3.016A9.31 9.31 0 0 1 22 12.5a9.31 9.31 0 0 1-.744 3.712 9.54 9.54 0 0 1-2.027 3.017 9.54 9.54 0 0 1-3.017 2.027A9.31 9.31 0 0 1 12.5 22Zm0-1.5c.902 0 1.773-.145 2.61-.436a7.405 7.405 0 0 0 2.232-1.218 7.607 7.607 0 0 0-2.203-1.175 8.081 8.081 0 0 0-2.639-.421 8.21 8.21 0 0 0-2.644.416 7.251 7.251 0 0 0-2.198 1.18c.65.522 1.394.928 2.231 1.218.838.29 1.708.436 2.611.436Zm0-8.75c.497 0 .913-.167 1.248-.502.335-.335.502-.75.502-1.248 0-.497-.167-.913-.502-1.248-.335-.335-.75-.502-1.248-.502s-.914.167-1.248.502c-.335.335-.502.75-.502 1.248 0 .497.167.913.502 1.248.334.335.75.502 1.248.502Z"
                            />
                          </g>
                        </svg>

                        <span> Manage Profile</span>
                      </a>
                    </Link>
                  </li>

                  {/* <li>
                    <Link href="/wallet" passHref>
                      <a className={`menu-link ${router.pathname.includes('/wallet') && 'font-semibold'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <mask id="a" width="24" height="24" x="0" y="0" maskUnits="userSpaceOnUse">
                            <path fill="#D9D9D9" d="M0 0h24v24H0z" />
                          </mask>
                          <g mask="url(#a)">
                            <path fill="#121212" d="M5.308 20.5c-.499 0-.925-.177-1.278-.53a1.741 1.741 0 0 1-.53-1.278V5.308c0-.499.177-.925.53-1.278.353-.353.779-.53 1.278-.53h13.384c.499 0 .925.177 1.278.53.353.353.53.779.53 1.278v2.72H19v-2.72a.3.3 0 0 0-.087-.221.3.3 0 0 0-.22-.087H5.307a.3.3 0 0 0-.221.087.3.3 0 0 0-.087.22v13.385a.3.3 0 0 0 .087.221.3.3 0 0 0 .22.087h13.385a.3.3 0 0 0 .221-.087.3.3 0 0 0 .087-.22V15.97h1.5v2.721c0 .499-.177.925-.53 1.278-.353.353-.779.53-1.278.53H5.308Zm8-4c-.499 0-.925-.177-1.278-.53a1.741 1.741 0 0 1-.53-1.278V9.308c0-.499.177-.925.53-1.278.353-.353.779-.53 1.278-.53h6.384c.499 0 .925.177 1.278.53.353.353.53.779.53 1.278v5.384c0 .499-.177.925-.53 1.278-.353.353-.779.53-1.278.53h-6.384Zm6.384-1.5a.3.3 0 0 0 .221-.087.3.3 0 0 0 .087-.22V9.307a.3.3 0 0 0-.087-.221.3.3 0 0 0-.22-.087h-6.385a.3.3 0 0 0-.222.087.3.3 0 0 0-.086.22v5.385a.3.3 0 0 0 .086.221.3.3 0 0 0 .222.087h6.384ZM16 13.5c.417 0 .77-.146 1.063-.438.291-.291.437-.645.437-1.062 0-.417-.146-.77-.438-1.063A1.447 1.447 0 0 0 16 10.5c-.417 0-.77.146-1.063.438A1.446 1.446 0 0 0 14.5 12c0 .417.146.77.438 1.063.291.291.645.437 1.062.437Z" />
                          </g>
                        </svg>

                        <span>My wallet</span>
                      </a>
                    </Link>
                  </li> */}

                  <li className="border-b border-base-400">
                    <Link href="/model/bookmarks" passHref>
                      <a
                        className={`menu-link ${
                          router.pathname === "/model/bookmarks" &&
                          "font-semibold"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <mask
                            id="a"
                            width="24"
                            height="24"
                            x="0"
                            y="0"
                            maskUnits="userSpaceOnUse"
                          >
                            <path fill="#D9D9D9" d="M0 0h24v24H0z" />
                          </mask>
                          <g mask="url(#a)">
                            <path
                              fill="#121212"
                              d="M5.5 20.25V5.308c0-.505.175-.933.525-1.283.35-.35.778-.525 1.283-.525h9.384c.505 0 .933.175 1.283.525.35.35.525.778.525 1.283V20.25L12 17.462 5.5 20.25Zm1.5-2.3 5-2.15 5 2.15V5.308a.294.294 0 0 0-.096-.212.294.294 0 0 0-.212-.096H7.308a.294.294 0 0 0-.212.096.294.294 0 0 0-.096.212V17.95Z"
                            />
                          </g>
                        </svg>

                        <span> Bookmarks</span>
                      </a>
                    </Link>
                  </li>

                  {/* <li className="relative">
                    <Link href="/notifications" passHref>
                      <a
                        className={`menu-link ${
                          router.pathname === "/notifications" &&
                          "font-semibold"
                        }`}
                      >
                        <svg
                          className="w-6 h-6"
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#121212"
                            d="M4 19v-2h2v-7q0-2.075 1.25-3.687T10.5 4.2v-.7q0-.625.438-1.062T12 2t1.063.438T13.5 3.5v.7q2 .5 3.25 2.113T18 10v7h2v2zm8 3q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22m-4-5h8v-7q0-1.65-1.175-2.825T12 6T9.175 7.175T8 10z"
                          />
                        </svg>

                        <span> Notifications</span>
                      </a>
                    </Link>
                    {isUnreadsNotification && (
                      <div
                        className="bg-red-500 rounded-full absolute top-4"
                        style={{ width: 6, height: 6, left: 14 }}
                      />
                    )}
                  </li>

                  <li>
                    <Link href="/messages" passHref>
                      <a
                        className={`menu-link ${
                          router.pathname === "/messages" && "font-semibold"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <mask
                            id="a"
                            width="24"
                            height="24"
                            x="0"
                            y="0"
                            maskUnits="userSpaceOnUse"
                          >
                            <path fill="#D9D9D9" d="M0 0h24v24H0z" />
                          </mask>
                          <g mask="url(#a)">
                            <path
                              fill="#121212"
                              d="M8 10.885a.852.852 0 0 0 .626-.26.853.853 0 0 0 .259-.625.853.853 0 0 0-.26-.626A.853.853 0 0 0 8 9.115a.853.853 0 0 0-.626.259.853.853 0 0 0-.259.626c0 .245.087.454.259.626a.852.852 0 0 0 .626.259Zm4 0a.852.852 0 0 0 .626-.26.852.852 0 0 0 .259-.625.852.852 0 0 0-.26-.626.853.853 0 0 0-.625-.259.853.853 0 0 0-.626.259.853.853 0 0 0-.259.626c0 .245.087.454.259.626a.853.853 0 0 0 .626.259Zm4 0a.852.852 0 0 0 .626-.26.852.852 0 0 0 .259-.625.852.852 0 0 0-.26-.626.853.853 0 0 0-.625-.259.853.853 0 0 0-.626.259.853.853 0 0 0-.259.626c0 .245.087.454.259.626a.853.853 0 0 0 .626.259ZM2.5 21.038V4.308c0-.505.175-.933.525-1.283.35-.35.778-.525 1.283-.525h15.384c.505 0 .933.175 1.283.525.35.35.525.778.525 1.283v11.384c0 .505-.175.933-.525 1.283-.35.35-.778.525-1.283.525H6.038L2.5 21.038ZM5.4 16h14.292a.294.294 0 0 0 .212-.096.294.294 0 0 0 .096-.212V4.308a.294.294 0 0 0-.096-.212.294.294 0 0 0-.212-.096H4.308a.294.294 0 0 0-.212.096.294.294 0 0 0-.096.212v13.077L5.4 16Z"
                            />
                          </g>
                        </svg>

                        <span> Messages</span>
                      </a>
                    </Link>
                  </li> */}

                  <li className="border-b border-base-400 py-2 ">
                    <Link href="/broadcaster-dashboard" passHref>
                      <a
                        className={`menu-link ${
                          router.pathname === "/broadcaster-dashboard" &&
                          "font-semibold"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <mask
                            id="a"
                            width="24"
                            height="24"
                            x="0"
                            y="0"
                            maskUnits="userSpaceOnUse"
                          >
                            <path fill="#D9D9D9" d="M0 0h24v24H0z" />
                          </mask>
                          <g mask="url(#a)">
                            <path
                              fill="#121212"
                              d="M11.998 19.711a3.298 3.298 0 0 1-2.421-1.002 3.299 3.299 0 0 1-1.002-2.42 3.3 3.3 0 0 1 1.002-2.422 3.298 3.298 0 0 1 2.421-1.002c.946 0 1.753.334 2.421 1.002a3.298 3.298 0 0 1 1.002 2.421c0 .946-.334 1.753-1.002 2.421a3.298 3.298 0 0 1-2.421 1.002Zm.002-1.5c.53 0 .982-.188 1.358-.565a1.86 1.86 0 0 0 .563-1.36c0-.53-.188-.982-.565-1.357a1.857 1.857 0 0 0-1.36-.564c-.53 0-.982.189-1.358.566a1.86 1.86 0 0 0-.563 1.36c0 .529.188.981.565 1.357.377.375.83.563 1.36.563ZM4 8.62 2.9 7.581a13.299 13.299 0 0 1 4.08-2.72c1.543-.664 3.215-.996 5.018-.996s3.475.332 5.018.995a13.298 13.298 0 0 1 4.08 2.72l-1.1 1.039a11.874 11.874 0 0 0-3.627-2.387 11.085 11.085 0 0 0-4.371-.867c-1.551 0-3.008.289-4.371.867A11.874 11.874 0 0 0 4 8.619Zm12.75 3.108a7.024 7.024 0 0 0-2.165-1.382 6.861 6.861 0 0 0-2.587-.48c-.93 0-1.79.16-2.575.48-.786.32-1.511.78-2.177 1.382l-1.1-1.039A8.988 8.988 0 0 1 8.84 8.97a8.27 8.27 0 0 1 3.159-.604 8.2 8.2 0 0 1 3.15.604 9.009 9.009 0 0 1 2.686 1.72l-1.084 1.038Z"
                            />
                          </g>
                        </svg>

                        <span>
                          {" "}
                          Broadcaster <br /> dashboard
                        </span>
                      </a>
                    </Link>
                  </li>

                  {/* <li>
                    <Link href={{ pathname: '/model/my-post/create', query: { post: 'video' } }} passHref>
                      <a className="flex items-center justify-center w-full h-10 gap-2 px-4 my-5 text-sm text-white transition bg-purple-800 border hover:bg-purple-700 rounded-3xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:z-10 focus:ring-purple-800">
                        <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                          <g clipPath="url(#a)">
                            <path fill="#fff" d="M11 5H9v4H5v2h4v4h2v-4h4V9h-4V5Z" />
                          </g>
                          <defs>
                            <clipPath id="a">
                              <path fill="#fff" d="M0 0h20v20H0z" />
                            </clipPath>
                          </defs>
                        </svg>

                        <span> Add video/photo</span>
                      </a>
                    </Link>
                  </li> */}
                  

                  <li className="border-b border-base-400">
                    <Link href="/help" passHref>
                      <a className="menu-link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#121212"
                            d="m13.375 22-.25-2.75h-1c-2.383 0-4.417-.842-6.1-2.525-1.683-1.683-2.525-3.717-2.525-6.1 0-2.383.846-4.417 2.537-6.1C7.73 2.842 9.775 2 12.175 2c1.183 0 2.28.212 3.287.638A7.99 7.99 0 0 1 18.1 4.425a8.336 8.336 0 0 1 1.762 2.713c.426 1.041.638 2.179.638 3.412 0 1.1-.163 2.2-.488 3.3A12.98 12.98 0 0 1 18.6 17c-.617 1-1.367 1.925-2.25 2.775A15.223 15.223 0 0 1 13.375 22Zm1.25-2.7a12.598 12.598 0 0 0 3.212-4.063C18.613 13.68 19 12.117 19 10.55c0-2.067-.646-3.758-1.938-5.075-1.291-1.317-2.92-1.975-4.887-1.975-2 0-3.696.696-5.088 2.088C5.697 6.979 5 8.658 5 10.625s.696 3.646 2.088 5.037c1.391 1.392 3.07 2.088 5.037 2.088h2.5v1.55Zm-2.45-2.875a.918.918 0 0 0 .675-.275.918.918 0 0 0 .275-.675.918.918 0 0 0-.275-.675.918.918 0 0 0-.675-.275.918.918 0 0 0-.675.275.918.918 0 0 0-.275.675c0 .267.092.492.275.675a.918.918 0 0 0 .675.275Zm-.675-3.4h1.25c0-.417.07-.763.213-1.037.141-.275.437-.638.887-1.088.45-.45.767-.863.95-1.238.183-.375.275-.779.275-1.212 0-.75-.254-1.367-.762-1.85-.509-.483-1.188-.725-2.038-.725a3.3 3.3 0 0 0-1.875.55 3.3 3.3 0 0 0-1.225 1.5l1.15.475c.183-.433.438-.754.763-.963a2.016 2.016 0 0 1 1.112-.312c.5 0 .892.12 1.175.362.283.242.425.563.425.963 0 .317-.092.638-.275.963-.183.325-.508.729-.975 1.212-.45.467-.738.842-.863 1.125-.124.283-.187.708-.187 1.275Z"
                          />
                        </svg>

                        <span> Help Center</span>
                      </a>
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={() => this.beforeLogout()}
                      className="menu-link"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <mask
                          id="a"
                          width="24"
                          height="24"
                          x="0"
                          y="0"
                          maskUnits="userSpaceOnUse"
                        >
                          <path fill="#D9D9D9" d="M0 0h24v24H0z" />
                        </mask>
                        <g mask="url(#a)">
                          <path
                            fill="#121212"
                            d="M5.308 20.5c-.505 0-.933-.175-1.283-.525a1.745 1.745 0 0 1-.525-1.283V5.308c0-.505.175-.933.525-1.283.35-.35.778-.525 1.283-.525h6.702V5H5.308a.294.294 0 0 0-.212.096.294.294 0 0 0-.096.212v13.384c0 .077.032.148.096.212a.294.294 0 0 0 .212.096h6.702v1.5H5.308Zm10.923-4.23-1.039-1.085 2.435-2.435h-8.53v-1.5h8.53l-2.435-2.435 1.039-1.084L20.5 12l-4.27 4.27Z"
                          />
                        </g>
                      </svg>

                      <span> Logout</span>
                    </button>
                  </li>

                  <li>
                    <p className="flex items-center h-12 gap-3 px-3 mt-2 text-xs text-black">
                      &copy; 2024 <br />
                      Caster Widenet LLC
                    </p>
                  </li>
                </ul>
              </nav>
            </>
          )}

          {!loggedIn && (
            <>
              <h2 className="mb-3 text-xl text-black">Welcome to Caster!</h2>
              <ul className="mb-1 text-sm text-black px-6 sidebar_features">
                <li className="text-black text-[14px] font-[500]">
                  Live Streaming
                </li>
                <li className="text-black text-[14px] font-[500]">
                  Short Videos
                </li>
                <li className="text-black text-[14px] font-[500]">Photos</li>
              </ul>

              <p className="text-black px-6">
                of <b>Appealing Creators</b>
              </p>
              <p className="text-black px-6">
                for their <b>Supportive Fans</b>
              </p>

              <button
                type="button"
                onClick={() => updateModals({ isRegisterModalOpen: true })}
                className={`${buttonVariants()} w-full mt-6 mb-6`}
              >
                Sign up
              </button>

              <Link href="/help" passHref>
                <a href="#" className="menu-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#121212"
                      d="m13.375 22-.25-2.75h-1c-2.383 0-4.417-.842-6.1-2.525-1.683-1.683-2.525-3.717-2.525-6.1 0-2.383.846-4.417 2.537-6.1C7.73 2.842 9.775 2 12.175 2c1.183 0 2.28.212 3.287.638A7.99 7.99 0 0 1 18.1 4.425a8.336 8.336 0 0 1 1.762 2.713c.426 1.041.638 2.179.638 3.412 0 1.1-.163 2.2-.488 3.3A12.98 12.98 0 0 1 18.6 17c-.617 1-1.367 1.925-2.25 2.775A15.223 15.223 0 0 1 13.375 22Zm1.25-2.7a12.598 12.598 0 0 0 3.212-4.063C18.613 13.68 19 12.117 19 10.55c0-2.067-.646-3.758-1.938-5.075-1.291-1.317-2.92-1.975-4.887-1.975-2 0-3.696.696-5.088 2.088C5.697 6.979 5 8.658 5 10.625s.696 3.646 2.088 5.037c1.391 1.392 3.07 2.088 5.037 2.088h2.5v1.55Zm-2.45-2.875a.918.918 0 0 0 .675-.275.918.918 0 0 0 .275-.675.918.918 0 0 0-.275-.675.918.918 0 0 0-.675-.275.918.918 0 0 0-.675.275.918.918 0 0 0-.275.675c0 .267.092.492.275.675a.918.918 0 0 0 .675.275Zm-.675-3.4h1.25c0-.417.07-.763.213-1.037.141-.275.437-.638.887-1.088.45-.45.767-.863.95-1.238.183-.375.275-.779.275-1.212 0-.75-.254-1.367-.762-1.85-.509-.483-1.188-.725-2.038-.725a3.3 3.3 0 0 0-1.875.55 3.3 3.3 0 0 0-1.225 1.5l1.15.475c.183-.433.438-.754.763-.963a2.016 2.016 0 0 1 1.112-.312c.5 0 .892.12 1.175.362.283.242.425.563.425.963 0 .317-.092.638-.275.963-.183.325-.508.729-.975 1.212-.45.467-.738.842-.863 1.125-.124.283-.187.708-.187 1.275Z"
                    />
                  </svg>

                  <span> Help Center</span>
                </a>
              </Link>

              <p className="flex items-center h-12 gap-3 px-3 mt-2 text-xs text-black">
                &copy; 2024 <br />
                Caster Widenet Inc.
              </p>
            </>
          )}
        </>
      </div>
    );
  }
}

Sidebar.contextType = SocketContext;

const mapState = (state: any) => ({
  user: { ...state.user.current },
  ui: { ...state.ui },
  config: { ...state.settings },
  ...state.streaming,
  notificationCount: state.notification.total,
  isUnreadsNotification: state.notification.isUnreadsNotification,
  fetchNotificationSuccess: state.notification.success,
  loggedIn: state.auth.loggedIn,
  modals: { ...state.modals },
});

const mapDispatch = {
  logout,
  logoutSuccess,
  addPrivateRequest,
  accessPrivateRequest,
  setUnreadCount,
  updateUIValue,
  updateBalance,
  cancelPrivateRequest,
  updateCurrentUser,
  addMuted,
  updateModals,
  updateTabValue,
};

export default withRouter(connect(mapState, mapDispatch)(Sidebar)) as any;
