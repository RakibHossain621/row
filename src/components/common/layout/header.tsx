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
  Collapse,
} from "antd";
import { IoIosNotificationsOutline } from "react-icons/io";
import { connect } from "react-redux";
import Link from "next/link";
import {
  IUser,
  IUIConfig,
  StreamSettings,
  ISettings,
  IPerformer,
} from "src/interfaces";
import { logout } from "@redux/auth/actions";
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
import {
  updateSidebarCollapseValue,
  updateUIValue,
} from "src/redux/ui/actions";
import { updateCurrentUser, updateBalance } from "@redux/user/actions";
// import './header.less';
import dynamic from "next/dynamic";
import { getResponseError } from "@lib/utils";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import { buttonVariants } from "@components/ui/shared/AppButton";
import { updateModals } from "@redux/modals/actions";
import { IModals } from "@interfaces/modals";
import CasterLogo from "src/icons/Logo";
import { RxHamburgerMenu } from "react-icons/rx";

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
  updateSidebarCollapseValue: Function;
  router: any;
  ui: IUIConfig;
  privateRequests: any;
  addPrivateRequest: Function;
  accessPrivateRequest: Function;
  setStatusNotification: Function;
  addMuted: Function;
  settings: StreamSettings;
  loggedIn: boolean;
  cancelPrivateRequest: Function;
  setUnreadCount: Function;
  config: ISettings;
  notificationCount: number;
  statusNotification: boolean;
  fetchNotificationSuccess: boolean;
  modals: IModals;
  updateModals: Function;
}

class Header extends PureComponent<IProps> {
  state = {
    isMenuOpen: false,
    totalNotReadMessage: 0,
    openProfile: false,
    openStripeAlert: false,
    loading: false,
    isViewNotification: true,
    totalEarning: 0,
    isSticky: false,
  };

  async componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
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
    window.removeEventListener("scroll", this.handleScroll);
    RouterEvent.events.off("routeChangeStart", this.handleChangeRoute);
    const token = authService.getToken();
    const socket = this.context;
    token && socket && socket.emit("auth/logout", { token });
  }

  handleChangeRoute = () => {
    this.setState({
      openProfile: false,
      isMenuOpen: false,
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
    const { token, type } = event;
    const { updateBalance: handleUpdateBalance } = this.props;
    handleUpdateBalance({
      token,
      type,
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

  async beforeLogout() {
    const { logout: handleLogout, user } = this.props;
    const { openProfile } = this.state;
    try {
      const token = authService.getToken();
      if (user.privateChat) {
        this.togglePrivateChatStatus();
      }
      this.setState({ openProfile: !openProfile });
      handleLogout();
      const socket = this.context;
      token &&
        socket &&
        (await socket.emit("auth/logout", {
          token,
        }));
      cookieService.setCookie("isViewNotification", false, 24 * 60);
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

  handleScroll = () => {
    const scrollPosition = window.scrollY;
    const isSticky = scrollPosition > 50;
    if (isSticky !== this.state.isSticky) {
      this.setState({ isSticky });
    }
  };

  render() {
    const {
      user,
      router,
      ui,
      loggedIn,
      modals,
      updateModals,
      updateSidebarCollapseValue,
    } = this.props;
    const { openProfile, openStripeAlert, loading, totalEarning, isMenuOpen } =
      this.state;
    const { Panel } = Collapse;

    return (
      <div className="main-header" id="main-header">
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

        <header
          className={`${
            this.state.isSticky
              ? "fixed w-full bg-white z-100 transition-all duration-300 ease-in-out translate-y-7"
              : ""
          }`}
        >
          <div className="py-3 px-3 mx-auto border-b border-base-400 max-w-screen-xxl ">
            <div className="flex items-center justify-between  gap-2 md:gap-4">
              <div className="md:flex md:items-center md:gap-12">
                <button
                  onClick={() => updateSidebarCollapseValue()}
                  className="hidden lg:block"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    style={{ width: "25px", height: "35px"}}
                  >
                    <path
                      d="M3 12h18M3 6h18M3 18h18"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
                <Link href={loggedIn ? "/trending" : "/home"} passHref>
                  <a className="block text-teal-600">
                    <span className="sr-only">Home</span>
                    <CasterLogo />
                  </a>
                </Link>
              </div>

              <div className="hidden md:block">
                <nav aria-label="main navigation">
                  <ul className="flex items-center gap-4 text-sm">
                    <Link href="/live-now" passHref>
                      <a className="hidden m-auto md:inline-flex text-xs px-2 items-center justify-center gap-2 font-medium transition duration-150 ease-in-out rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:z-10 text-white bg-error-500 hover:bg-error-600 h-[30px] md:px-4 md:h-10 md:text-sm">
                        Live now
                      </a>
                    </Link>
                    <li>
                      <Link href="/model" passHref>
                        <a
                          className={buttonVariants({
                            variant:
                              router.pathname === "/model"
                                ? "secondary"
                                : "tertiary",
                          })}
                        >
                          Top{" "}
                        </a>
                      </Link>
                    </li>

                    <li>
                      <Link href="/discover" passHref>
                        <a
                          className={buttonVariants({
                            variant:
                              router.pathname === "/discover"
                                ? "secondary"
                                : "tertiary",
                          })}
                        >
                          Discover
                        </a>
                      </Link>
                    </li>

                    <li>
                      <Link href="/trending" passHref>
                        <a
                          className={buttonVariants({
                            variant:
                              router.pathname === "/trending"
                                ? "secondary"
                                : "tertiary",
                          })}
                        >
                          Trending
                        </a>
                      </Link>
                    </li>

                    {loggedIn && (
                      <li>
                        <Link href="/following-post" passHref>
                          <a
                            className={buttonVariants({
                              variant:
                                router.pathname === "/following-post"
                                  ? "secondary"
                                  : "tertiary",
                            })}
                          >
                            Following
                          </a>
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
              {!loggedIn ? (
                <button
                  onClick={() => updateModals({ isLoginModalOpen: true })}
                  className="inline-flex items-center gap-2 text-sm font-medium text-black hover:opacity-80 hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    fill="none"
                    viewBox="0 0 21 20"
                  >
                    <g clipPath="url(#a)">
                      <mask
                        id="b"
                        width="21"
                        height="20"
                        x="0"
                        y="0"
                        maskUnits="userSpaceOnUse"
                      >
                        <path fill="#D9D9D9" d="M.5 0h20v20H.5z" />
                      </mask>
                      <g mask="url(#b)">
                        <path
                          fill="#121212"
                          d="M5.438 14.063a8.33 8.33 0 0 1 2.406-1.178A9.172 9.172 0 0 1 10.5 12.5c.917 0 1.802.129 2.656.385a8.33 8.33 0 0 1 2.406 1.178 5.747 5.747 0 0 0 1.084-1.896A6.685 6.685 0 0 0 17 10c0-1.801-.634-3.335-1.9-4.6-1.268-1.267-2.802-1.9-4.605-1.9-1.802 0-3.335.633-4.6 1.9C4.633 6.664 4 8.198 4 10c0 .75.118 1.472.354 2.167a5.747 5.747 0 0 0 1.083 1.896ZM10.5 11.5a2.893 2.893 0 0 1-2.125-.875A2.893 2.893 0 0 1 7.5 8.5c0-.833.292-1.542.875-2.125A2.893 2.893 0 0 1 10.5 5.5c.833 0 1.542.292 2.125.875S13.5 7.667 13.5 8.5s-.292 1.542-.875 2.125a2.893 2.893 0 0 1-2.125.875Zm.006 6.5a7.81 7.81 0 0 1-3.11-.625 8.064 8.064 0 0 1-2.552-1.719 8.065 8.065 0 0 1-1.719-2.551A7.818 7.818 0 0 1 2.5 9.99c0-1.104.208-2.14.625-3.105a8.066 8.066 0 0 1 4.27-4.26A7.818 7.818 0 0 1 10.509 2a7.75 7.75 0 0 1 3.106.625 8.082 8.082 0 0 1 4.26 4.265 7.77 7.77 0 0 1 .625 3.104 7.81 7.81 0 0 1-.625 3.11 8.063 8.063 0 0 1-1.719 2.552 8.08 8.08 0 0 1-2.546 1.719 7.77 7.77 0 0 1-3.104.625Zm-.006-1.5c.722 0 1.417-.115 2.083-.344a6.64 6.64 0 0 0 1.875-1.01 7.495 7.495 0 0 0-1.896-.854A7.327 7.327 0 0 0 10.5 14c-.708 0-1.4.094-2.073.281a6.542 6.542 0 0 0-1.885.865 6.641 6.641 0 0 0 1.875 1.01c.666.23 1.36.344 2.083.344Zm0-6.5c.417 0 .77-.146 1.063-.438.291-.291.437-.645.437-1.062 0-.417-.146-.77-.438-1.063A1.447 1.447 0 0 0 10.5 7c-.417 0-.77.146-1.063.438A1.447 1.447 0 0 0 9 8.5c0 .417.146.77.438 1.063.291.291.645.437 1.062.437Z"
                        />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path fill="#fff" d="M.5 0h20v20H.5z" />
                      </clipPath>
                    </defs>
                  </svg>

                  <span>Login</span>
                </button>
              ) : (
                <button>
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
                    ></path>
                  </svg>
                </button>
              )}

              <div className="block md:hidden">
                <button
                  type="button"
                  onClick={() => this.setState({ isMenuOpen: !isMenuOpen })}
                  className="p-2 text-gray-600 transition bg-gray-100 rounded hover:text-gray-600/75"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                <div
                  className="absolute z-20 p-4 bg-white border border-gray-100 rounded-lg left-6 right-6 top-24 md:hidden"
                  style={{ display: isMenuOpen ? "block" : "none" }}
                >
                  {!loggedIn && (
                    <>
                      <h2 className="mb-3 text-xl text-black">
                        Welcome to Caster!
                      </h2>

                      <div className="mb-6 space-y-6 text-sm text-black">
                        <p>
                          Your space to connect, create, and share with a global
                          community.
                        </p>
                        <p>
                          Login to comment, follow and create your own content.
                        </p>
                      </div>

                      <div className="my-3 border-t border-base-400"></div>

                      <nav aria-label="mobile navigation">
                        <ul className="space-y-1">
                          <li>
                            <Link href="/model" passHref>
                              <a
                                className={`menu-link ${
                                  router.pathname === "/model" &&
                                  "bg-pink-50 font-semibold"
                                }`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <mask
                                    id="mask0_3067_41017"
                                    maskUnits="userSpaceOnUse"
                                    x="0"
                                    y="0"
                                    width="24"
                                    height="24"
                                  >
                                    <rect
                                      width="24"
                                      height="24"
                                      fill="#D9D9D9"
                                    />
                                  </mask>
                                  <g mask="url(#mask0_3067_41017)">
                                    <path
                                      d="M5.99997 14C5.99997 15.0077 6.24068 15.9455 6.7221 16.8135C7.20352 17.6814 7.86539 18.3814 8.70773 18.9135C8.63336 18.7725 8.58015 18.6317 8.5481 18.4913C8.51603 18.351 8.5 18.2038 8.5 18.05C8.5 17.5872 8.58878 17.1513 8.76635 16.7423C8.94392 16.3333 9.19872 15.9628 9.53077 15.6308L12 13.202L14.4788 15.6308C14.8109 15.9628 15.064 16.3333 15.2384 16.7423C15.4128 17.1513 15.5 17.5872 15.5 18.05C15.5 18.2038 15.4839 18.351 15.4518 18.4913C15.4198 18.6317 15.3666 18.7725 15.2922 18.9135C16.1346 18.3814 16.7964 17.6814 17.2779 16.8135C17.7593 15.9455 18 15.0077 18 14C18 13.1667 17.8458 12.3792 17.5375 11.6375C17.2291 10.8958 16.7833 10.2333 16.2 9.64999C15.8666 9.86665 15.5166 10.0292 15.15 10.1375C14.7833 10.2458 14.4083 10.3 14.025 10.3C12.9852 10.3 12.0862 9.95832 11.3278 9.27499C10.5695 8.59165 10.1352 7.74358 10.025 6.73076C9.37497 7.27435 8.79997 7.84197 8.29997 8.43364C7.79997 9.0253 7.37914 9.62851 7.03747 10.2433C6.69581 10.858 6.43747 11.482 6.26247 12.1154C6.08747 12.7487 5.99997 13.3769 5.99997 14ZM12 15.3L10.575 16.7C10.3916 16.8833 10.25 17.0917 10.15 17.325C10.05 17.5583 9.99997 17.8 9.99997 18.05C9.99997 18.5833 10.1958 19.0417 10.5875 19.425C10.9791 19.8083 11.45 20 12 20C12.55 20 13.0208 19.8083 13.4125 19.425C13.8041 19.0417 14 18.5833 14 18.05C14 17.7833 13.95 17.5375 13.85 17.3125C13.75 17.0875 13.6083 16.8833 13.425 16.7L12 15.3ZM11.4999 3.89429V6.29999C11.4999 7.00769 11.7439 7.60129 12.2317 8.08079C12.7195 8.56027 13.3173 8.80001 14.025 8.80001C14.3314 8.80001 14.6234 8.74232 14.901 8.62694C15.1785 8.51155 15.4333 8.34169 15.6654 8.11734L16.1058 7.67311C17.1596 8.34746 17.9887 9.24714 18.5932 10.3721C19.1977 11.4971 19.5 12.7064 19.5 14C19.5 16.0923 18.773 17.8654 17.3192 19.3192C15.8653 20.773 14.0923 21.5 12 21.5C9.90767 21.5 8.13461 20.773 6.68077 19.3192C5.22692 17.8654 4.5 16.0923 4.5 14C4.5 12.068 5.12948 10.209 6.38845 8.42311C7.64742 6.63721 9.35125 5.1276 11.4999 3.89429Z"
                                      fill="#121212"
                                    />
                                  </g>
                                </svg>

                                <span> Top </span>
                              </a>
                            </Link>
                          </li>

                          <li>
                            <Link href="/trending" passHref>
                              <a
                                className={`menu-link ${
                                  router.pathname === "/trending" &&
                                  "bg-pink-50 font-semibold"
                                }`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <mask
                                    id="mask0_3067_41021"
                                    maskUnits="userSpaceOnUse"
                                    x="0"
                                    y="0"
                                    width="24"
                                    height="24"
                                  >
                                    <rect
                                      width="24"
                                      height="24"
                                      fill="#D9D9D9"
                                    />
                                  </mask>
                                  <g mask="url(#mask0_3067_41021)">
                                    <path
                                      d="M7.39998 15.6442L10.45 12.6038L12.45 14.6038L16.25 10.8192V12.75H17.75V8.25H13.25V9.74995H15.1808L12.45 12.4808L10.45 10.4808L6.35577 14.6L7.39998 15.6442ZM5.3077 20.5C4.80257 20.5 4.375 20.325 4.025 19.975C3.675 19.625 3.5 19.1974 3.5 18.6923V5.3077C3.5 4.80257 3.675 4.375 4.025 4.025C4.375 3.675 4.80257 3.5 5.3077 3.5H18.6923C19.1974 3.5 19.625 3.675 19.975 4.025C20.325 4.375 20.5 4.80257 20.5 5.3077V18.6923C20.5 19.1974 20.325 19.625 19.975 19.975C19.625 20.325 19.1974 20.5 18.6923 20.5H5.3077ZM5.3077 19H18.6923C18.7692 19 18.8397 18.9679 18.9038 18.9038C18.9679 18.8397 19 18.7692 19 18.6923V5.3077C19 5.23077 18.9679 5.16024 18.9038 5.09613C18.8397 5.03203 18.7692 4.99998 18.6923 4.99998H5.3077C5.23077 4.99998 5.16024 5.03203 5.09612 5.09613C5.03202 5.16024 4.99997 5.23077 4.99997 5.3077V18.6923C4.99997 18.7692 5.03202 18.8397 5.09612 18.9038C5.16024 18.9679 5.23077 19 5.3077 19Z"
                                      fill="#121212"
                                    />
                                  </g>
                                </svg>

                                <span> Trending</span>
                              </a>
                            </Link>
                          </li>

                          <li>
                            <Link href="/discover" passHref>
                              <a
                                className={`menu-link ${
                                  router.pathname === "/discover" &&
                                  "bg-pink-50 font-semibold"
                                }`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
                                    fill="#121212"
                                  />
                                </svg>

                                <span> Discover </span>
                              </a>
                            </Link>
                          </li>

                          <li>
                            <button
                              type="button"
                              onClick={() =>
                                updateModals({ isRegisterModalOpen: true })
                              }
                              className={`my-5 w-44 ${buttonVariants()}`}
                            >
                              Sign up
                            </button>
                          </li>

                          <li>
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

                                <span> Need help?</span>
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </nav>

                      <p className="flex items-center h-12 gap-3 px-3 mt-2 text-xs text-black">
                        &copy; 2024 <br />
                        Caster Widenet LLC
                      </p>
                    </>
                  )}

                  {loggedIn && (
                    <>
                      <div className="mb-5">
                        <div className="flex gap-2">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={user?.avatar || "/static/no-avatar.png"}
                            alt="avatar"
                          />

                          <div>
                            <h4 className="text-base leading-5 text-black capitalize">
                              {user?.name
                                ? user?.name?.substring(0, 24)
                                : "N/A"}
                            </h4>
                            <span className="text-xs font-light text-black">
                              {" "}
                              {user?.username
                                ? `@${user?.username?.substring(0, 24)}`
                                : "n/a"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between gap-4 px-2 py-4 mb-3 border-b border-base-400">
                        <div>
                          <Link href="/wallet" passHref>
                            <a className="mb-1 text-base font-semibold leading-4 text-black">
                              Rubys
                              <div className="flex items-center gap-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="14"
                                  viewBox="0 0 15 14"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_3525_37921)">
                                    <path
                                      d="M4.52905 2.06037L5.21409 0.804462C4.79545 0.614173 4.3007 0.5 3.80595 0.5C2.96868 0.5 2.20753 0.804462 1.56055 1.33727L1.90307 2.36483L4.52905 2.06037Z"
                                      fill="url(#paint0_linear_3525_37921)"
                                    />
                                    <path
                                      d="M12.5972 2.36483L12.9397 1.33727C12.3308 0.804462 11.5315 0.5 10.6943 0.5C10.1995 0.5 9.70477 0.614173 9.28613 0.804462L9.97117 2.06037L12.5972 2.36483Z"
                                      fill="url(#paint1_linear_3525_37921)"
                                    />
                                    <path
                                      d="M5.59397 0.994976C5.47979 0.918861 5.36562 0.880803 5.25145 0.804688L4.56641 2.06059L7.23045 2.89786C6.88793 2.09865 6.31706 1.41361 5.59397 0.994976Z"
                                      fill="url(#paint2_linear_3525_37921)"
                                    />
                                    <path
                                      d="M8.94307 0.994948C8.18191 1.41358 7.61105 2.09862 7.23047 2.89784L9.93257 2.02251L9.24753 0.766602C9.13336 0.842717 9.05724 0.918833 8.94307 0.994948Z"
                                      fill="url(#paint3_linear_3525_37921)"
                                    />
                                    <path
                                      d="M2.96847 10.3951C3.19681 10.6235 3.46322 10.8518 3.69156 11.0802L2.58789 7.92139L2.96847 10.3951Z"
                                      fill="url(#paint4_linear_3525_37921)"
                                    />
                                    <path
                                      d="M10.8086 11.0802C11.075 10.8519 11.3033 10.6235 11.5317 10.4332L11.8742 7.95947L10.8086 11.0802Z"
                                      fill="url(#paint5_linear_3525_37921)"
                                    />
                                    <path
                                      d="M7.26945 9.90024L9.05817 8.41598L9.97155 6.20864L8.71565 4.41992H5.7852L4.5293 6.20864L5.44268 8.41598L7.26945 9.90024Z"
                                      fill="url(#paint6_linear_3525_37921)"
                                    />
                                    <path
                                      d="M4.52863 6.20884L5.78453 4.42013L4.52863 2.06055L1.90264 2.36501L0.989258 4.5343L4.52863 6.20884Z"
                                      fill="url(#paint7_linear_3525_37921)"
                                    />
                                    <path
                                      d="M0.494751 4.41981L0.0380577 4.26758C0 4.45787 0 4.6101 0 4.80039C0 5.40931 0.152231 6.05629 0.380577 6.70327L0.685039 5.5996L0.494751 4.41981Z"
                                      fill="url(#paint8_linear_3525_37921)"
                                    />
                                    <path
                                      d="M0.495117 4.41992L0.685406 5.59971L0.989868 4.5341L0.495117 4.41992Z"
                                      fill="url(#paint9_linear_3525_37921)"
                                    />
                                    <path
                                      d="M9.97075 6.20884L13.5101 4.5343L12.5967 2.36501L9.97075 2.06055L8.71484 4.42013L9.97075 6.20884Z"
                                      fill="url(#paint10_linear_3525_37921)"
                                    />
                                    <path
                                      d="M13.5107 4.5341L13.8152 5.59971L14.0055 4.41992L13.5107 4.5341Z"
                                      fill="url(#paint11_linear_3525_37921)"
                                    />
                                    <path
                                      d="M13.8145 5.5996L14.1189 6.70327C14.3473 6.05629 14.4995 5.40931 14.4995 4.80039C14.4995 4.6101 14.4995 4.45787 14.4614 4.26758L14.0047 4.41981L13.8145 5.5996Z"
                                      fill="url(#paint12_linear_3525_37921)"
                                    />
                                    <path
                                      d="M0.990009 4.53418L0.685547 5.5998L2.58843 7.92132L4.52938 6.20872L0.990009 4.53418Z"
                                      fill="url(#paint13_linear_3525_37921)"
                                    />
                                    <path
                                      d="M1.44629 8.64448C1.71269 9.02506 2.01716 9.40564 2.32162 9.74816C2.51191 9.97651 2.74025 10.1668 2.9686 10.3951L2.62608 7.92139L1.44629 8.64448Z"
                                      fill="url(#paint14_linear_3525_37921)"
                                    />
                                    <path
                                      d="M0.685321 5.59961L0.380859 6.70328C0.647264 7.35027 0.989783 7.99725 1.44648 8.64423L2.58821 7.92113L0.685321 5.59961Z"
                                      fill="url(#paint15_linear_3525_37921)"
                                    />
                                    <path
                                      d="M4.52884 6.2085L2.58789 7.92109L4.8333 9.32923L5.44222 8.41584L4.52884 6.2085Z"
                                      fill="url(#paint16_linear_3525_37921)"
                                    />
                                    <path
                                      d="M4.8333 9.32952L2.58789 7.92139L3.69157 11.0802L4.8333 9.32952Z"
                                      fill="url(#paint17_linear_3525_37921)"
                                    />
                                    <path
                                      d="M9.05762 8.41584L9.66654 9.36729L11.9119 7.92109L9.971 6.2085L9.05762 8.41584Z"
                                      fill="url(#paint18_linear_3525_37921)"
                                    />
                                    <path
                                      d="M9.66699 9.36758L10.8087 11.0802L11.9124 7.92139L9.66699 9.36758Z"
                                      fill="url(#paint19_linear_3525_37921)"
                                    />
                                    <path
                                      d="M11.5312 10.3951C11.7596 10.1668 11.9879 9.97651 12.1782 9.74816C12.5969 9.25341 13.0155 8.75866 13.32 8.26391L11.8738 7.92139L11.5312 10.3951Z"
                                      fill="url(#paint20_linear_3525_37921)"
                                    />
                                    <path
                                      d="M13.815 5.59961L11.9121 7.92113L13.3583 8.26365C13.7008 7.73084 13.9672 7.23609 14.1575 6.70328L13.815 5.59961Z"
                                      fill="url(#paint21_linear_3525_37921)"
                                    />
                                    <path
                                      d="M9.9707 6.20872L11.9116 7.92132L13.8145 5.5998L13.5101 4.53418L9.9707 6.20872Z"
                                      fill="url(#paint22_linear_3525_37921)"
                                    />
                                    <path
                                      d="M8.7156 4.41977L7.23135 2.89746L5.78516 4.41977H8.7156Z"
                                      fill="url(#paint23_linear_3525_37921)"
                                    />
                                    <path
                                      d="M7.2314 2.89782L4.5293 2.06055L5.7852 4.42013L7.2314 2.89782Z"
                                      fill="url(#paint24_linear_3525_37921)"
                                    />
                                    <path
                                      d="M9.97063 2.06055L7.23047 2.89782L8.71472 4.42013L9.97063 2.06055Z"
                                      fill="url(#paint25_linear_3525_37921)"
                                    />
                                    <path
                                      d="M9.66616 9.36768L7.23047 9.90048L8.71472 12.7548C9.24753 12.3362 9.85645 11.8795 10.4273 11.3847C10.5415 11.2706 10.6557 11.1944 10.7698 11.0803L9.66616 9.36768Z"
                                      fill="url(#paint26_linear_3525_37921)"
                                    />
                                    <path
                                      d="M7.26953 9.90027L9.66717 9.36746L9.05824 8.41602L7.26953 9.90027Z"
                                      fill="url(#paint27_linear_3525_37921)"
                                    />
                                    <path
                                      d="M4.83314 9.32959L3.69141 11.0802C3.80558 11.1944 3.91975 11.2705 4.03393 11.3847C4.64285 11.9175 5.28983 12.4123 5.82264 12.8309L7.26883 9.93851L4.83314 9.32959Z"
                                      fill="url(#paint28_linear_3525_37921)"
                                    />
                                    <path
                                      d="M5.44193 8.41602L4.83301 9.3294L7.2687 9.90027L5.44193 8.41602Z"
                                      fill="url(#paint29_linear_3525_37921)"
                                    />
                                    <path
                                      d="M7.26953 13.82C7.26953 13.82 7.8404 13.4394 8.60155 12.8305C8.63961 12.7924 8.71573 12.7544 8.75378 12.7163L7.26953 13.173V13.82Z"
                                      fill="url(#paint30_linear_3525_37921)"
                                    />
                                    <path
                                      d="M7.26953 9.90039V13.1734L8.75378 12.7547L7.26953 9.90039Z"
                                      fill="url(#paint31_linear_3525_37921)"
                                    />
                                    <path
                                      d="M7.26944 13.1734V9.90039L5.82324 12.7928L7.26944 13.1734Z"
                                      fill="url(#paint32_linear_3525_37921)"
                                    />
                                    <path
                                      d="M7.26944 13.1731L5.82324 12.7925C5.8613 12.7925 5.8613 12.8305 5.89936 12.8305C6.66051 13.4395 7.23138 13.82 7.26944 13.82V13.1731Z"
                                      fill="url(#paint33_linear_3525_37921)"
                                    />
                                    <path
                                      d="M14.4616 4.26778C14.4616 4.15361 14.4235 4.03944 14.4235 3.88721L14.0049 4.38196L14.4616 4.26778Z"
                                      fill="url(#paint34_linear_3525_37921)"
                                    />
                                    <path
                                      d="M12.9402 1.3374L12.5977 2.36496L13.511 4.53425L14.0058 4.38202L14.4244 3.92533C14.2341 2.85971 13.7013 1.94633 12.9402 1.3374Z"
                                      fill="url(#paint35_linear_3525_37921)"
                                    />
                                    <path
                                      d="M0.0380859 4.26781L0.494779 4.42004L0.0761437 3.92529C0.0761437 4.03947 0.0380859 4.15364 0.0380859 4.26781Z"
                                      fill="url(#paint36_linear_3525_37921)"
                                    />
                                    <path
                                      d="M1.56042 1.3374C0.799269 1.94633 0.266461 2.85971 0.0761719 3.92533L0.494807 4.42008L0.989558 4.57231L1.90294 2.36496L1.56042 1.3374Z"
                                      fill="url(#paint37_linear_3525_37921)"
                                    />
                                    <path
                                      d="M5.78516 4.41992H8.7156L9.97151 6.20864L8.7156 4.41992H5.78516Z"
                                      fill="url(#paint38_linear_3525_37921)"
                                    />
                                  </g>
                                  <defs>
                                    <linearGradient
                                      id="paint0_linear_3525_37921"
                                      x1="1.48451"
                                      y1="-7.27101"
                                      x2="4.46264"
                                      y2="5.7052"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.425"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5961"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint1_linear_3525_37921"
                                      x1="11.3504"
                                      y1="-3.13101"
                                      x2="10.7565"
                                      y2="7.08757"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.425"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5961"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint2_linear_3525_37921"
                                      x1="8.85727"
                                      y1="-8.68356"
                                      x2="5.21046"
                                      y2="5.06795"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.3685"
                                        stopColor="#F69D9D"
                                      />
                                      <stop
                                        offset="0.4447"
                                        stopColor="#F27072"
                                      />
                                      <stop
                                        offset="0.5179"
                                        stopColor="#F04C50"
                                      />
                                      <stop
                                        offset="0.5865"
                                        stopColor="#EE3338"
                                      />
                                      <stop
                                        offset="0.6485"
                                        stopColor="#EC2329"
                                      />
                                      <stop
                                        offset="0.6983"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint3_linear_3525_37921"
                                      x1="7.67179"
                                      y1="-6.77583"
                                      x2="8.97275"
                                      y2="6.16566"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.425"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5961"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint4_linear_3525_37921"
                                      x1="-5.32427"
                                      y1="14.7014"
                                      x2="7.8179"
                                      y2="6.6307"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F6BE95"
                                      />
                                      <stop
                                        offset="0.4173"
                                        stopColor="#F4A684"
                                      />
                                      <stop
                                        offset="0.5734"
                                        stopColor="#F16858"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint5_linear_3525_37921"
                                      x1="13.7945"
                                      y1="13.6176"
                                      x2="9.65727"
                                      y2="6.62619"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.425"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5961"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint6_linear_3525_37921"
                                      x1="-8.96103"
                                      y1="-1.40482"
                                      x2="12.0603"
                                      y2="9.23217"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.425"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5961"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#8E0329" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint7_linear_3525_37921"
                                      x1="-7.72581"
                                      y1="-6.24875"
                                      x2="10.4659"
                                      y2="10.311"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.4015"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5231"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.6271"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint8_linear_3525_37921"
                                      x1="-1.38842"
                                      y1="5.33354"
                                      x2="3.38889"
                                      y2="5.80911"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop
                                        offset="0.2064"
                                        stopColor="#F9D19B"
                                      />
                                      <stop
                                        offset="0.285"
                                        stopColor="#F7B98B"
                                      />
                                      <stop
                                        offset="0.4516"
                                        stopColor="#F37B62"
                                      />
                                      <stop
                                        offset="0.6764"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint9_linear_3525_37921"
                                      x1="-4.83536"
                                      y1="6.1992"
                                      x2="3.03414"
                                      y2="4.47404"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7BE80"
                                      />
                                      <stop
                                        offset="0.4576"
                                        stopColor="#F4A669"
                                      />
                                      <stop
                                        offset="0.6976"
                                        stopColor="#ED682F"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC5C24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint10_linear_3525_37921"
                                      x1="13.4955"
                                      y1="0.462338"
                                      x2="6.37814"
                                      y2="11.9419"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop
                                        offset="0.1104"
                                        stopColor="#F6A9A7"
                                      />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.425"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5961"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint11_linear_3525_37921"
                                      x1="18.5168"
                                      y1="6.58632"
                                      x2="11.6125"
                                      y2="4.22735"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.425"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5961"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint12_linear_3525_37921"
                                      x1="17.0894"
                                      y1="5.90688"
                                      x2="9.93763"
                                      y2="4.83761"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.0334705"
                                        stopColor="#DA7079"
                                      />
                                      <stop
                                        offset="0.1635"
                                        stopColor="#EA9195"
                                      />
                                      <stop
                                        offset="0.2715"
                                        stopColor="#F3A6A7"
                                      />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.425"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5961"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint13_linear_3525_37921"
                                      x1="-8.74276"
                                      y1="6.23959"
                                      x2="7.98811"
                                      y2="6.23959"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7BE80"
                                      />
                                      <stop
                                        offset="0.4173"
                                        stopColor="#F5A672"
                                      />
                                      <stop
                                        offset="0.5734"
                                        stopColor="#F1684E"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint14_linear_3525_37921"
                                      x1="-10.7044"
                                      y1="11.1922"
                                      x2="5.71614"
                                      y2="8.72125"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.4182"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.575"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.709"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint15_linear_3525_37921"
                                      x1="-3.87221"
                                      y1="9.17217"
                                      x2="4.45719"
                                      y2="5.73814"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop
                                        offset="0.2064"
                                        stopColor="#F9A11B"
                                      />
                                      <stop
                                        offset="0.3102"
                                        stopColor="#F7891D"
                                      />
                                      <stop
                                        offset="0.5284"
                                        stopColor="#F04B21"
                                      />
                                      <stop
                                        offset="0.6764"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint16_linear_3525_37921"
                                      x1="-7.70536"
                                      y1="11.411"
                                      x2="8.8434"
                                      y2="6.54104"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.3818"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.4621"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.5307"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint17_linear_3525_37921"
                                      x1="-8.10911"
                                      y1="16.8401"
                                      x2="6.9517"
                                      y2="7.01785"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.425"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5961"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint18_linear_3525_37921"
                                      x1="-5.18899"
                                      y1="15.8957"
                                      x2="12.2019"
                                      y2="6.48605"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.425"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5961"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint19_linear_3525_37921"
                                      x1="19.6667"
                                      y1="17.7396"
                                      x2="7.71467"
                                      y2="5.88392"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.425"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5961"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint20_linear_3525_37921"
                                      x1="14.7045"
                                      y1="18.1304"
                                      x2="11.1154"
                                      y2="4.25757"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.5299"
                                        stopColor="#F16366"
                                      />
                                      <stop
                                        offset="0.6723"
                                        stopColor="#ED3136"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint21_linear_3525_37921"
                                      x1="15.2381"
                                      y1="13.4147"
                                      x2="11.8641"
                                      y2="4.01584"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.3897"
                                        stopColor="#F59A95"
                                      />
                                      <stop
                                        offset="0.4869"
                                        stopColor="#F16857"
                                      />
                                      <stop
                                        offset="0.4961"
                                        stopColor="#F16351"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint22_linear_3525_37921"
                                      x1="10.3959"
                                      y1="-1.82131"
                                      x2="13.1058"
                                      y2="12.2607"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.425"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5961"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint23_linear_3525_37921"
                                      x1="7.21754"
                                      y1="-5.44887"
                                      x2="7.25384"
                                      y2="6.21214"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.425"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5961"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint24_linear_3525_37921"
                                      x1="7.63717"
                                      y1="-3.98759"
                                      x2="4.91459"
                                      y2="6.13543"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.2435"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.3153"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.466"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.5948"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint25_linear_3525_37921"
                                      x1="5.46973"
                                      y1="-1.9515"
                                      x2="11.0008"
                                      y2="5.87896"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.425"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5961"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint26_linear_3525_37921"
                                      x1="10.4727"
                                      y1="19.5549"
                                      x2="8.5857"
                                      y2="7.6472"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.3978"
                                        stopColor="#F59697"
                                      />
                                      <stop
                                        offset="0.5614"
                                        stopColor="#F05659"
                                      />
                                      <stop
                                        offset="0.6807"
                                        stopColor="#ED2D33"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint27_linear_3525_37921"
                                      x1="8.09044"
                                      y1="0.431461"
                                      x2="8.57491"
                                      y2="12.1865"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.425"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5961"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint28_linear_3525_37921"
                                      x1="-15.4578"
                                      y1="13.1018"
                                      x2="10.7399"
                                      y2="10.5235"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7BE80"
                                      />
                                      <stop
                                        offset="0.4227"
                                        stopColor="#F5A672"
                                      />
                                      <stop
                                        offset="0.5903"
                                        stopColor="#F1684E"
                                      />
                                      <stop
                                        offset="0.7717"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint29_linear_3525_37921"
                                      x1="-2.08452"
                                      y1="14.6705"
                                      x2="9.38601"
                                      y2="7.16471"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.425"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5961"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint30_linear_3525_37921"
                                      x1="10.2124"
                                      y1="19.5696"
                                      x2="6.7339"
                                      y2="9.67447"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.425"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5961"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint31_linear_3525_37921"
                                      x1="18.6222"
                                      y1="13.8323"
                                      x2="5.14511"
                                      y2="11.1121"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.425"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5961"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint32_linear_3525_37921"
                                      x1="-3.7122"
                                      y1="9.97281"
                                      x2="9.76899"
                                      y2="11.8987"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.425"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5961"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint33_linear_3525_37921"
                                      x1="2.30252"
                                      y1="18.1644"
                                      x2="7.71403"
                                      y2="11.9554"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.4133"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5598"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.6849"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint34_linear_3525_37921"
                                      x1="18.3723"
                                      y1="4.33043"
                                      x2="10.7037"
                                      y2="4.01097"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.425"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5961"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint35_linear_3525_37921"
                                      x1="17.0934"
                                      y1="-0.891107"
                                      x2="9.02754"
                                      y2="7.49656"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.425"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.5961"
                                        stopColor="#F0575B"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint36_linear_3525_37921"
                                      x1="-1.57575"
                                      y1="3.90725"
                                      x2="1.938"
                                      y2="4.38891"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#D56671" />
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7BE80"
                                      />
                                      <stop
                                        offset="0.4576"
                                        stopColor="#F4A669"
                                      />
                                      <stop
                                        offset="0.6976"
                                        stopColor="#ED682F"
                                      />
                                      <stop
                                        offset="0.7423"
                                        stopColor="#EC5C24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint37_linear_3525_37921"
                                      x1="-0.549954"
                                      y1="1.97209"
                                      x2="3.7374"
                                      y2="4.4063"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop
                                        offset="0.2388"
                                        stopColor="#F9DAC9"
                                      />
                                      <stop
                                        offset="0.3198"
                                        stopColor="#F7C2B4"
                                      />
                                      <stop
                                        offset="0.4914"
                                        stopColor="#F3847D"
                                      />
                                      <stop
                                        offset="0.7382"
                                        stopColor="#EC2126"
                                      />
                                      <stop
                                        offset="0.7446"
                                        stopColor="#EC1E24"
                                      />
                                      <stop offset="1" stopColor="#7A0025" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint38_linear_3525_37921"
                                      x1="8.43215"
                                      y1="4.24939"
                                      x2="8.11555"
                                      y2="4.85565"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop
                                        offset="0.3436"
                                        stopColor="#F7ADAD"
                                      />
                                      <stop
                                        offset="0.4777"
                                        stopColor="#F59596"
                                      />
                                      <stop
                                        offset="0.7593"
                                        stopColor="#F0575B"
                                      />
                                      <stop offset="1" stopColor="#EC1E24" />
                                    </linearGradient>
                                    <clipPath id="clip0_3525_37921">
                                      <rect
                                        width="14.5"
                                        height="13.3202"
                                        fill="white"
                                        transform="translate(0 0.5)"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>

                                <span className="text-sm font-light">
                                  {Number.isInteger(user?.rubyBalance)
                                    ? user?.rubyBalance
                                    : Math.floor(user?.rubyBalance * 10) / 10}
                                </span>
                              </div>
                            </a>
                          </Link>
                        </div>

                        <div>
                          <Link href="/wallet" passHref>
                            <a className="mb-1 text-base font-semibold leading-4 text-black">
                              Diamonds
                              <div className="flex items-center gap-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_3525_37975)">
                                    <path
                                      d="M4.79082 1.26729L0.831055 6.01416H4.00371L7.96348 0.867676L4.79082 1.26729Z"
                                      fill="url(#paint0_linear_3525_37975)"
                                    />
                                    <path
                                      d="M7.96367 0.867676L4.00391 6.01416H11.9234L7.96367 0.867676Z"
                                      fill="url(#paint1_linear_3525_37975)"
                                    />
                                    <path
                                      d="M11.1365 1.26729L15.0963 6.02627H11.9236L7.96387 0.867676L11.1365 1.26729Z"
                                      fill="url(#paint2_linear_3525_37975)"
                                    />
                                    <path
                                      d="M7.96348 15.1325L0.831055 6.01416H4.00371L7.96348 15.1325Z"
                                      fill="url(#paint3_linear_3525_37975)"
                                    />
                                    <path
                                      d="M11.9234 6.01416H4.00391L7.96367 15.1325L11.9234 6.01416Z"
                                      fill="url(#paint4_linear_3525_37975)"
                                    />
                                    <path
                                      d="M7.96387 15.1325L15.0963 6.01416H11.9236L7.96387 15.1325Z"
                                      fill="url(#paint5_linear_3525_37975)"
                                    />
                                    <path
                                      d="M4.79023 1.25508L0.818359 6.01406H3.99102L7.96289 0.855469L4.79023 1.25508Z"
                                      fill="#E1F5FE"
                                      fillOpacity="0.01"
                                    />
                                    <path
                                      d="M7.96309 0.855469L3.99121 6.01406H11.9229L7.96309 0.855469Z"
                                      fill="#E1F5FE"
                                      fillOpacity="0.01"
                                    />
                                    <path
                                      d="M11.1355 1.25508L15.1074 6.01406H11.9348L7.96289 0.855469L11.1355 1.25508Z"
                                      fill="#E1F5FE"
                                      fillOpacity="0.01"
                                    />
                                    <path
                                      d="M7.96289 15.1446L0.818359 6.01416H3.99102L7.96289 15.1446Z"
                                      fill="#E1F5FE"
                                      fillOpacity="0.01"
                                    />
                                    <path
                                      d="M11.935 6.01416H3.99121L7.96309 15.1446L11.935 6.01416Z"
                                      fill="#E1F5FE"
                                      fillOpacity="0.01"
                                    />
                                    <path
                                      d="M7.96289 15.1446L15.1074 6.01416H11.9348L7.96289 15.1446Z"
                                      fill="#E1F5FE"
                                      fillOpacity="0.01"
                                    />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M7.92773 15.1203L11.8875 6.00195L11.948 6.02617L8.00039 15.1445L7.92773 15.1203Z"
                                      fill="url(#paint6_linear_3525_37975)"
                                    />
                                  </g>
                                  <defs>
                                    <linearGradient
                                      id="paint0_linear_3525_37975"
                                      x1="8.05807"
                                      y1="0.996496"
                                      x2="0.925277"
                                      y2="6.14796"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#81D4FA" />
                                      <stop
                                        offset="0.6667"
                                        stopColor="#81D4FA"
                                      />
                                      <stop offset="1" stopColor="#64B5F6" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint1_linear_3525_37975"
                                      x1="7.96422"
                                      y1="0.866283"
                                      x2="7.96422"
                                      y2="6.01774"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#B2EBF2" />
                                      <stop
                                        offset="0.6667"
                                        stopColor="#B3E5FC"
                                      />
                                      <stop offset="1" stopColor="#81D4FA" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint2_linear_3525_37975"
                                      x1="7.87038"
                                      y1="0.996495"
                                      x2="15.0033"
                                      y2="6.14746"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#81D4FA" />
                                      <stop
                                        offset="0.6667"
                                        stopColor="#81D4FA"
                                      />
                                      <stop offset="1" stopColor="#64B5F6" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint3_linear_3525_37975"
                                      x1="1.84567"
                                      y1="5.25695"
                                      x2="8.97847"
                                      y2="14.7673"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#0288D1" />
                                      <stop
                                        offset="0.6667"
                                        stopColor="#0288D1"
                                      />
                                      <stop offset="1" stopColor="#1E88E5" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint4_linear_3525_37975"
                                      x1="7.96422"
                                      y1="6.01778"
                                      x2="7.00978"
                                      y2="15.4367"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#1E88E5" />
                                      <stop
                                        offset="0.6667"
                                        stopColor="#81D4FA"
                                      />
                                      <stop offset="1" stopColor="#64B5F6" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint5_linear_3525_37975"
                                      x1="14.0828"
                                      y1="5.25695"
                                      x2="6.94998"
                                      y2="14.7673"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#0288D1" />
                                      <stop
                                        offset="0.3333"
                                        stopColor="#1E88E5"
                                      />
                                      <stop offset="1" stopColor="#1E88E5" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint6_linear_3525_37975"
                                      x1="11.9289"
                                      y1="6.01834"
                                      x2="7.96297"
                                      y2="15.1311"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#1E88E5" />
                                      <stop offset="1" stopColor="#81D4FA" />
                                    </linearGradient>
                                    <clipPath id="clip0_3525_37975">
                                      <rect
                                        width="15.5"
                                        height="15.5"
                                        fill="white"
                                        transform="translate(0.25 0.25)"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>

                                <span className="text-sm font-light">
                                  {" "}
                                  {Number.isInteger(user?.balance)
                                    ? user?.balance
                                    : Math.floor(user?.balance * 10) / 10}
                                </span>
                              </div>
                            </a>
                          </Link>
                        </div>

                        <div>
                          <h4 className="mb-1 text-base font-semibold leading-4 text-black">
                            Fans
                          </h4>
                          <span className="text-sm font-light">
                            {" "}
                            {user?.stats?.totalFollowing}
                          </span>
                        </div>

                        <div>
                          <h4 className="mb-1 text-base font-semibold leading-4 text-black">
                            Followers
                          </h4>
                          <span className="text-sm font-light">
                            {user?.stats?.totalFollower}
                          </span>
                        </div>
                      </div>

                      <nav>
                        <ul className="space-y-1">
                          <li>
                            <Link href="/model" passHref>
                              <a
                                className={`menu-link ${
                                  router.pathname === "/model" &&
                                  "bg-pink-50 font-semibold"
                                }`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <mask
                                    id="mask0_3067_41017"
                                    maskUnits="userSpaceOnUse"
                                    x="0"
                                    y="0"
                                    width="24"
                                    height="24"
                                  >
                                    <rect
                                      width="24"
                                      height="24"
                                      fill="#D9D9D9"
                                    />
                                  </mask>
                                  <g mask="url(#mask0_3067_41017)">
                                    <path
                                      d="M5.99997 14C5.99997 15.0077 6.24068 15.9455 6.7221 16.8135C7.20352 17.6814 7.86539 18.3814 8.70773 18.9135C8.63336 18.7725 8.58015 18.6317 8.5481 18.4913C8.51603 18.351 8.5 18.2038 8.5 18.05C8.5 17.5872 8.58878 17.1513 8.76635 16.7423C8.94392 16.3333 9.19872 15.9628 9.53077 15.6308L12 13.202L14.4788 15.6308C14.8109 15.9628 15.064 16.3333 15.2384 16.7423C15.4128 17.1513 15.5 17.5872 15.5 18.05C15.5 18.2038 15.4839 18.351 15.4518 18.4913C15.4198 18.6317 15.3666 18.7725 15.2922 18.9135C16.1346 18.3814 16.7964 17.6814 17.2779 16.8135C17.7593 15.9455 18 15.0077 18 14C18 13.1667 17.8458 12.3792 17.5375 11.6375C17.2291 10.8958 16.7833 10.2333 16.2 9.64999C15.8666 9.86665 15.5166 10.0292 15.15 10.1375C14.7833 10.2458 14.4083 10.3 14.025 10.3C12.9852 10.3 12.0862 9.95832 11.3278 9.27499C10.5695 8.59165 10.1352 7.74358 10.025 6.73076C9.37497 7.27435 8.79997 7.84197 8.29997 8.43364C7.79997 9.0253 7.37914 9.62851 7.03747 10.2433C6.69581 10.858 6.43747 11.482 6.26247 12.1154C6.08747 12.7487 5.99997 13.3769 5.99997 14ZM12 15.3L10.575 16.7C10.3916 16.8833 10.25 17.0917 10.15 17.325C10.05 17.5583 9.99997 17.8 9.99997 18.05C9.99997 18.5833 10.1958 19.0417 10.5875 19.425C10.9791 19.8083 11.45 20 12 20C12.55 20 13.0208 19.8083 13.4125 19.425C13.8041 19.0417 14 18.5833 14 18.05C14 17.7833 13.95 17.5375 13.85 17.3125C13.75 17.0875 13.6083 16.8833 13.425 16.7L12 15.3ZM11.4999 3.89429V6.29999C11.4999 7.00769 11.7439 7.60129 12.2317 8.08079C12.7195 8.56027 13.3173 8.80001 14.025 8.80001C14.3314 8.80001 14.6234 8.74232 14.901 8.62694C15.1785 8.51155 15.4333 8.34169 15.6654 8.11734L16.1058 7.67311C17.1596 8.34746 17.9887 9.24714 18.5932 10.3721C19.1977 11.4971 19.5 12.7064 19.5 14C19.5 16.0923 18.773 17.8654 17.3192 19.3192C15.8653 20.773 14.0923 21.5 12 21.5C9.90767 21.5 8.13461 20.773 6.68077 19.3192C5.22692 17.8654 4.5 16.0923 4.5 14C4.5 12.068 5.12948 10.209 6.38845 8.42311C7.64742 6.63721 9.35125 5.1276 11.4999 3.89429Z"
                                      fill="#121212"
                                    />
                                  </g>
                                </svg>

                                <span> Top </span>
                              </a>
                            </Link>
                          </li>

                          <li>
                            <Link href="/trending" passHref>
                              <a
                                className={`menu-link ${
                                  router.pathname === "/trending" &&
                                  "bg-pink-50 font-semibold"
                                }`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <mask
                                    id="mask0_3067_41021"
                                    maskUnits="userSpaceOnUse"
                                    x="0"
                                    y="0"
                                    width="24"
                                    height="24"
                                  >
                                    <rect
                                      width="24"
                                      height="24"
                                      fill="#D9D9D9"
                                    />
                                  </mask>
                                  <g mask="url(#mask0_3067_41021)">
                                    <path
                                      d="M7.39998 15.6442L10.45 12.6038L12.45 14.6038L16.25 10.8192V12.75H17.75V8.25H13.25V9.74995H15.1808L12.45 12.4808L10.45 10.4808L6.35577 14.6L7.39998 15.6442ZM5.3077 20.5C4.80257 20.5 4.375 20.325 4.025 19.975C3.675 19.625 3.5 19.1974 3.5 18.6923V5.3077C3.5 4.80257 3.675 4.375 4.025 4.025C4.375 3.675 4.80257 3.5 5.3077 3.5H18.6923C19.1974 3.5 19.625 3.675 19.975 4.025C20.325 4.375 20.5 4.80257 20.5 5.3077V18.6923C20.5 19.1974 20.325 19.625 19.975 19.975C19.625 20.325 19.1974 20.5 18.6923 20.5H5.3077ZM5.3077 19H18.6923C18.7692 19 18.8397 18.9679 18.9038 18.9038C18.9679 18.8397 19 18.7692 19 18.6923V5.3077C19 5.23077 18.9679 5.16024 18.9038 5.09613C18.8397 5.03203 18.7692 4.99998 18.6923 4.99998H5.3077C5.23077 4.99998 5.16024 5.03203 5.09612 5.09613C5.03202 5.16024 4.99997 5.23077 4.99997 5.3077V18.6923C4.99997 18.7692 5.03202 18.8397 5.09612 18.9038C5.16024 18.9679 5.23077 19 5.3077 19Z"
                                      fill="#121212"
                                    />
                                  </g>
                                </svg>

                                <span> Trending</span>
                              </a>
                            </Link>
                          </li>

                          <li>
                            <Link href="/discover" passHref>
                              <a
                                className={`menu-link ${
                                  router.pathname === "/discover" &&
                                  "bg-pink-50 font-semibold"
                                }`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
                                    fill="#121212"
                                  />
                                </svg>

                                <span> Discover </span>
                              </a>
                            </Link>
                          </li>

                          <li>
                            <Link
                              href={{
                                pathname: "/my-follow",
                                query: { tab: "following" },
                              }}
                              passHref
                            >
                              <a
                                className={`menu-link ${
                                  router.pathname === "/my-follow" &&
                                  "bg-pink-50 font-semibold"
                                }`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <mask
                                    id="mask0_3505_44166"
                                    maskUnits="userSpaceOnUse"
                                    x="0"
                                    y="0"
                                    width="24"
                                    height="24"
                                  >
                                    <rect
                                      width="24"
                                      height="24"
                                      fill="#D9D9D9"
                                    />
                                  </mask>
                                  <g mask="url(#mask0_3505_44166)">
                                    <path
                                      d="M17.625 14.0576V11.0576H14.625V9.55768H17.625V6.55768H19.1249V9.55768H22.1249V11.0576H19.1249V14.0576H17.625ZM8.49995 11.9999C7.53747 11.9999 6.71352 11.6572 6.0281 10.9718C5.34268 10.2864 4.99998 9.46246 4.99998 8.49998C4.99998 7.53748 5.34268 6.71353 6.0281 6.02813C6.71352 5.34271 7.53747 5 8.49995 5C9.46243 5 10.2864 5.34271 10.9718 6.02813C11.6572 6.71353 11.9999 7.53748 11.9999 8.49998C11.9999 9.46246 11.6572 10.2864 10.9718 10.9718C10.2864 11.6572 9.46243 11.9999 8.49995 11.9999ZM1 19.6153V17.3923C1 16.9025 1.133 16.449 1.399 16.0317C1.66503 15.6144 2.02048 15.2936 2.46535 15.0692C3.45382 14.5846 4.45093 14.2211 5.4567 13.9788C6.46247 13.7365 7.47688 13.6154 8.49995 13.6154C9.52302 13.6154 10.5374 13.7365 11.5432 13.9788C12.549 14.2211 13.5461 14.5846 14.5346 15.0692C14.9794 15.2936 15.3349 15.6144 15.6009 16.0317C15.8669 16.449 15.9999 16.9025 15.9999 17.3923V19.6153H1ZM2.49995 18.1153H14.5V17.3923C14.5 17.1897 14.4413 17.0022 14.324 16.8298C14.2067 16.6573 14.0474 16.5166 13.8461 16.4076C12.9846 15.9833 12.1061 15.6618 11.2107 15.4432C10.3152 15.2246 9.41165 15.1153 8.49995 15.1153C7.58825 15.1153 6.68468 15.2246 5.78925 15.4432C4.89382 15.6618 4.01533 15.9833 3.1538 16.4076C2.95252 16.5166 2.79323 16.6573 2.67593 16.8298C2.55861 17.0022 2.49995 17.1897 2.49995 17.3923V18.1153ZM8.49995 10.5C9.04995 10.5 9.52078 10.3041 9.91245 9.91248C10.3041 9.52081 10.5 9.04998 10.5 8.49998C10.5 7.94998 10.3041 7.47914 9.91245 7.08748C9.52078 6.69581 9.04995 6.49998 8.49995 6.49998C7.94995 6.49998 7.47912 6.69581 7.08745 7.08748C6.69578 7.47914 6.49995 7.94998 6.49995 8.49998C6.49995 9.04998 6.69578 9.52081 7.08745 9.91248C7.47912 10.3041 7.94995 10.5 8.49995 10.5Z"
                                      fill="#121212"
                                    />
                                  </g>
                                </svg>

                                <span> Following </span>
                              </a>
                            </Link>
                          </li>

                          <li>
                            <Link href="/model/account" passHref>
                              <a
                                className={`menu-link ${
                                  router.pathname.startsWith(
                                    "/model/profile"
                                  ) && "font-semibold"
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

                          <li>
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

                          <li>
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
                          </li>

                          <li>
                            <Link href="/messages" passHref>
                              <a className="menu-link">
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
                          </li>

                          <li>
                            <Link href="/broadcaster-dashboard" passHref>
                              <a
                                className={`menu-link ${
                                  router.pathname ===
                                    "/broadcaster-dashboard" && "font-semibold"
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

                          <li>
                            <Link href="/model/my-post/create" passHref>
                              <a className="inline-flex items-center justify-center w-auto h-10 gap-2 px-6 my-5 text-sm text-white transition bg-purple-800 border hover:bg-purple-700 rounded-3xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:z-10 focus:ring-purple-800">
                                <svg
                                  className="w-5 h-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="none"
                                  viewBox="0 0 20 20"
                                >
                                  <g clipPath="url(#a)">
                                    <path
                                      fill="#fff"
                                      d="M11 5H9v4H5v2h4v4h2v-4h4V9h-4V5Z"
                                    />
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
                          </li>

                          <li>
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

                                <span> Need help?</span>
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
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 
          <Layout.Header className="header" >
            <div className="nav-bar">
              <Row gutter={24}>
                <Col md={14} sm={14} xs={18}>
                  <div className="left-menu">
                    {loggedIn && (
                      <MenuOutlined
                        onClick={() => this.setState({ openProfile: !openProfile })}
                        className="menu-header"
                      />
                    )}

                    <Drawer
                      title={(
                        <>
                          {loggedIn ? (
                            <>
                              <span className="header-logo">
                                <Link href={!loggedIn ? '/trending' : '/home'}>
                                  <a href={!loggedIn ? '/trending' : '/home'}>
                                    <img width="85%" height={50} src={ui?.logo} alt="" />
                                  </a>
                                </Link>
                              </span>
                            </>
                          ) : (
                            <>
                              <Link href="/login" as="/login">
                                <a href="/login">
                                  <div className="menu-item">
                                    <LoginOutlined />
                                    {' '}
                                    Log in
                                  </div>
                                </a>
                              </Link>
                              <Divider className="divider-login"> Or </Divider>
                              <Link href="auth/register" as="auth/register">
                                <Button
                                  className="login-form-button"
                                >
                                  Create a new account
                                </Button>
                              </Link>
                            </>
                          )}
                        </>
                      )}
                      closable
                      onClose={() => this.setState({ openProfile: false })}
                      visible={openProfile}
                      key="profile-drawer"
                      placement="left"
                      className={
                        ui.theme === 'light' ? 'profile-drawer' : 'profile-drawer dark'
                      }
                      width={280}
                    >
                      <div className="profile-menu-item">
                        {loggedIn
                          && (
                            <>
                              <div className="profile-user">
                                <Link
                                  href={{
                                    pathname: '/model/profile',
                                    query: { username: user?.username || user?._id }
                                  }}
                                >
                                  <a aria-hidden href="/model/profile">
                                    <img
                                      className="avatar"
                                      src={user?.avatar || '/static/no-avatar.png'}
                                      alt="avatar"
                                    />
                                  </a>
                                </Link>
                                <span className="profile-name">
                                  <Link
                                    href={{
                                      pathname: '/model/profile',
                                      query: { username: user?.username || user?._id }
                                    }}
                                  >
                                    <a aria-hidden href="/model/profile">
                                      {user?.name ? user?.name?.substring(0, 24) : 'N/A'}
                                    </a>
                                  </Link>
                                  <span className="sub-name">
                                    @
                                    {user?.username ? user?.username?.substring(0, 24) : 'n/a'}
                                  </span>
                                </span>
                              </div>
                              <div className="sub-info">
                                <a aria-hidden href="/wallet" className="user-balance">
                                  <img src="/static/gem.png" alt="rubyBalance" style={{ height: '18px' }} />
                                  <span style={{ fontSize: '12px', color: 'black' }}>
                                    {' '}
                                    {Number.isInteger(user?.rubyBalance) ? user?.rubyBalance : Math.floor(user?.rubyBalance * 10) / 10}
                                    {' '}
                                  </span>
                                </a>
                                {totalEarning > 0 && !loading && (
                                  <a aria-hidden href="/wallet" className="user-balance">
                                    <img src="/static/diamond.png" alt="balance" style={{ height: '18px' }} />
                                    <span style={{ fontSize: '12px', color: 'black' }}>
                                      {Number.isInteger(user?.balance) ? user?.balance : Math.floor(user?.balance * 10) / 10}
                                    </span>
                                  </a>
                                )}
                              </div>
                              <div className="ranking">
                                <Link
                                  href={{ pathname: '/my-follow', query: { tab: 'following' } }}
                                >
                                  <a className="sidebar-totalFollow" href="my-follow">
                                    Following
                                    <div>
                                      {user?.stats?.totalFollowing}
                                      {' '}
                                    </div>
                                  </a>
                                </Link>
                                {user?.roles?.includes(ROLE_PERMISSIONS.ROLE_HOST_PRIVATE) && (
                                  <Link
                                    href={{ pathname: '/my-follow', query: { tab: 'follower' } }}
                                  >
                                    <a className="sidebar-totalFollow right" href="my-follow">
                                      Fans
                                      <div>
                                        {user?.stats?.totalFollower}
                                        {' '}
                                      </div>
                                    </a>
                                  </Link>
                                )}
                              </div>
                              <Link href="/model/my-post/create" as="/model/my-post/create">
                                <div className={router.pathname === '/model/my-post/create' ? 'menu-item active' : 'menu-item'}>
                                  <a href="/model/my-post/create">
                                    <PlusOutlined />
                                    {' '}
                                    Add Video/Photo
                                  </a>
                                </div>
                              </Link>
                              <Divider />
                              <Link href="/model/account" as="/model/account">
                                <div className={router.pathname === '/model/account' ? 'menu-item active' : 'menu-item'}>
                                  <a href="/model/account">
                                    <UserOutlined />
                                    {' '}
                                    Manage Profile
                                  </a>
                                </div>
                              </Link>
                              <Link href="/model/bookmarks" as="/model/bookmarks">
                                <div className={router.pathname === '/model/bookmarks' ? 'menu-item active' : 'menu-item'}>
                                  <a href="/model/bookmarks">
                                    <BookOutlined />
                                    {' '}
                                    Bookmarks
                                  </a>
                                </div>
                              </Link>
                              <Divider />
                              <Link href="/model" as="/model">
                                <div className={router.pathname === '/model' ? 'mobile-menu-item active' : 'mobile-menu-item'}>
                                  <a href="/model">
                                    <CrownOutlined />
                                    {' '}
                                    Top
                                  </a>
                                </div>
                              </Link>
                              <Link href="/discover" as="/discover">
                                <div className={router.pathname === '/discover' ? 'mobile-menu-item active'
                                  : 'mobile-menu-item'}
                                >
                                  <a href="/discover">
                                    <SearchOutlined />
                                    {' '}
                                    Discover
                                  </a>
                                </div>
                              </Link>
                              <Link href="/trending" as="/trending">
                                <div className={router.pathname === '/trending' ? 'mobile-menu-item active' : 'mobile-menu-item'}>
                                  <a href="/trending">
                                    <RiseOutlined />
                                    {' '}
                                    Trending
                                  </a>
                                </div>
                              </Link>
                              <Link href="/following-post" as="/following-post">
                                <div
                                  className={router.pathname === '/following-post' ? 'mobile-menu-item active' : 'mobile-menu-item'}
                                >
                                  <a href="/following-post">
                                    <UsergroupAddOutlined />
                                    {' '}
                                    Following
                                  </a>
                                </div>
                              </Link>
                              <Divider className="mobile-menu-item" />
                              <Link href="/broadcaster-dashboard" as="/broadcaster-dashboard">
                                <div className={router.pathname === '/broadcaster-dashboard' ? 'menu-item active' : 'menu-item'}>
                                  <a href="/broadcaster-dashboard">
                                    <DashboardOutlined />
                                    {' '}
                                    Broadcaster Dashboard
                                  </a>
                                </div>
                              </Link>
                              <Divider />
                              <Link href="/help" as="/help">
                                <div className={router.pathname === '/help' ? 'menu-item active' : 'menu-item'}>
                                  <a href="/help">
                                    <QuestionOutlined />
                                    {' '}
                                    Help & Support
                                  </a>
                                </div>
                              </Link>
                              <div
                                aria-hidden
                                className="menu-item"
                                style={{ paddingTop: '40px' }}
                                onClick={() => this.beforeLogout()}
                              >
                                <LogoutOutlined />
                                {' '}
                                Sign Out
                              </div>
                            </>
                          )}
                        <div className="mobile_button_row">
                          <a
                            className="img_link"
                            href="#"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              className="iOS_app_button"
                              src="https://store.cloudflare.steamstatic.com/public/images/mobile/download_apple_button.png"
                              alt=""
                            />
                          </a>
                          <a
                            className="img_link"
                            href="#"
                            target="_blank"
                            rel="noopener"
                          >
                            <img
                              className="android_app_button"
                              src="https://store.cloudflare.steamstatic.com/public/images/mobile/download_google_button.png"
                              alt=""
                            />
                          </a>
                        </div>

                        {ui.footerContent ? (
                          <div
                            className="footer-content"
                            dangerouslySetInnerHTML={{ __html: ui.footerContent }}
                          />
                        ) : (
                          <div className="help-media-c" style={{ marginTop: '35px' }}>© 2023 Caster Media LLC</div>
                        )}
                      </div>
                    </Drawer>

                    <span className="header-logo">
                      <Link href={!loggedIn ? '/trending' : '/home'}>
                        <a href={!loggedIn ? '/trending' : '/home'}>
                          <img width="100%" height={50} src={ui?.logo} alt="" />
                        </a>
                      </Link>
                    </span>

                    <Link href="/live-now">
                      <div className="ant-btn btn-live">
                        <a href="/live-now">
                          <span>Live Now</span>
                        </a>
                      </div>
                    </Link>

                    <Link href="/model">
                      <div className={router.pathname === '/model' ? 'ant-btn active' : 'ant-btn'}>
                        <a href="/model">
                          <span>Top</span>
                        </a>
                      </div>
                    </Link>
                  </div>
                </Col>

                <Col md={10} sm={10} xs={6} className="col-right-menu">
                  <div className="right-menu">
                    <div className="group-btn">
                      <Link href="/discover">
                        <div className={router.pathname === '/discover' ? 'ant-btn active' : 'ant-btn'}>
                          <a href="/discover">
                            <span>Discover</span>
                          </a>
                        </div>
                      </Link>
                      <Link href="/trending">
                        <div className={router.pathname === '/trending' ? 'ant-btn active' : 'ant-btn'}>
                          <a href="/trending">
                            <span>Trending</span>
                          </a>
                        </div>
                      </Link>
                      {loggedIn && (
                        <>
                          <Link href="/following-post">
                            <div className={router.pathname === '/following-post' ? 'ant-btn active' : 'ant-btn'}>
                              <a href="/following-post">
                                <span>Following</span>
                              </a>
                            </div>
                          </Link>
                        </>
                      )}
                    </div>
                    <div className="group-icon">
                      <div className="icons">
                        {loggedIn && (
                          <div>
                            {this.renderMenuAllUserType()}
                            <Link href="/home">
                              <a href="/home">
                                <HomeFilled className={router.pathname === '/home' ? 'anticon-home active' : 'anticon-home'} />
                              </a>
                            </Link>
                          </div>
                        )}
                        {!loggedIn && (
                          <MenuOutlined
                            className="mobile-visible"
                            onClick={() => this.setState({ openProfile: !openProfile })}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Layout.Header> 
          */}

        {/* <Modal
            title={null}
            footer={null}
            width={500}
            maskClosable={false}
            visible={openStripeAlert}
          >
            <div className="confirm-subscription-form">
              <div className="text-center">
                <h2 className="secondary-color">
                  Hi
                  {' '}
                  {user?.name || user?.username || 'there'}
                </h2>
                <h3 className="secondary-color">
                  You have not connected with stripe. You cannot post any
                  content until it&apos;s configured. Please complete the
                  onboarding process & start earning money!
                </h3>
              </div>
              <div>
                <Button className="primary" href="/model/banking">
                  Okay, take me there
                </Button>
                &nbsp;
                <Button
                  className="secondary"
                  onClick={() => this.setState({ openStripeAlert: false })}
                >
                  No, i will connect later
                </Button>
              </div>
            </div>
          </Modal> */}
      </div>
    );
  }
}

Header.contextType = SocketContext;

const mapState = (state: any) => ({
  user: { ...state.user.current },
  ui: { ...state.ui },
  config: { ...state.settings },
  ...state.streaming,
  notificationCount: state.notification.total,
  fetchNotificationSuccess: state.notification.success,
  loggedIn: state.auth.loggedIn,
  modals: { ...state.modals },
});

const mapDispatch = {
  logout,
  addPrivateRequest,
  accessPrivateRequest,
  setUnreadCount,
  updateUIValue,
  updateBalance,
  cancelPrivateRequest,
  updateCurrentUser,
  addMuted,
  updateModals,
  updateSidebarCollapseValue,
};
export default withRouter(connect(mapState, mapDispatch)(Header)) as any;
