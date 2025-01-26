exports.ids = [1];
exports.modules = {

/***/ "./src/components/messages/ConversationList.less":
/*!*******************************************************!*\
  !*** ./src/components/messages/ConversationList.less ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/components/messages/ConversationList.tsx":
/*!******************************************************!*\
  !*** ./src/components/messages/ConversationList.tsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _redux_message_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @redux/message/actions */ "./src/redux/message/actions.ts");
/* harmony import */ var src_socket__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/socket */ "./src/socket/index.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ConversationListItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ConversationListItem */ "./src/components/messages/ConversationListItem.tsx");
/* harmony import */ var _ConversationList_less__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ConversationList.less */ "./src/components/messages/ConversationList.less");
/* harmony import */ var _ConversationList_less__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ConversationList_less__WEBPACK_IMPORTED_MODULE_7__);
var _jsxFileName = "C:\\Users\\roman\\Pictures\\Case\\row\\src\\components\\messages\\ConversationList.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






// import ConversationSearch from './ConversationSearch';


class ConversationList extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "conversationsRef", void 0);
    _defineProperty(this, "state", {
      conversationPage: 0,
      keyword: ''
    });
    _defineProperty(this, "onMessage", message => {
      if (!message) {
        return;
      }
      const {
        conversation,
        getConversations: getConversationsHandler,
        getConversationDetail: getConversationDetailHandler,
        receiveMessageSuccess: receiveMessageSuccessHandler,
        setActiveConversation: setActiveConversationHandler,
        user
      } = this.props;
      const {
        conversationPage,
        keyword
      } = this.state;
      const {
        mapping
      } = conversation;
      if (!mapping[message.conversationId]) {
        getConversationDetailHandler({
          id: message.conversationId
        });
      }
      const {
        conversationId
      } = message;
      setActiveConversationHandler({
        conversationId,
        recipientId: user._id
      });
      getConversationsHandler({
        limit: 25,
        offset: conversationPage * 25,
        type: 'private',
        keyword
      });
      receiveMessageSuccessHandler(message);
    });
    _defineProperty(this, "onSearchConversation", Object(lodash__WEBPACK_IMPORTED_MODULE_5__["debounce"])(async e => {
      const {
        value
      } = e.target;
      const {
        searchConversations: getConversationsHandler
      } = this.props;
      await this.setState({
        keyword: value,
        conversationPage: 0
      });
      if (value) {
        return getConversationsHandler({
          keyword: value,
          limit: 25,
          offset: 0,
          type: 'private'
        });
      }
      return getConversationsHandler({
        limit: 25,
        offset: 0,
        type: 'private'
      });
    }, 500));
    _defineProperty(this, "handleScroll", async event => {
      const {
        conversation,
        getConversations: getConversationsHandler
      } = this.props;
      const {
        requesting,
        data,
        total
      } = conversation.list;
      const {
        conversationPage,
        keyword
      } = this.state;
      const canloadmore = total > data.length;
      const ele = event.target;
      if (!canloadmore) return;
      if (ele.scrollHeight - ele.scrollTop === ele.clientHeight && !requesting && canloadmore) {
        this.setState({
          conversationPage: conversationPage + 1
        }, () => {
          const {
            conversationPage: newPage
          } = this.state;
          getConversationsHandler({
            keyword,
            limit: 25,
            offset: newPage * 25,
            type: 'private'
          });
        });
      }
    });
    _defineProperty(this, "setActive", conversationId => {
      const {
        setActiveConversation: setActiveConversationHandler,
        user
      } = this.props;
      setActiveConversationHandler({
        conversationId,
        recipientId: user._id
      });
    });
  }
  async componentDidMount() {
    if (!this.conversationsRef) this.conversationsRef = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createRef"])();
    const {
      getConversations: getConversationsHandler,
      setActiveConversation: setActiveConversationHandler,
      toSource,
      toId,
      user
    } = this.props;
    const {
      conversationPage,
      keyword
    } = this.state;
    getConversationsHandler({
      limit: 25,
      offset: conversationPage * 25,
      type: 'private',
      keyword
    });
    if (toSource && toId) {
      setTimeout(() => {
        setActiveConversationHandler({
          source: toSource,
          sourceId: toId,
          recipientId: user._id
        });
      }, 1000);
    }
  }
  render() {
    const {
      conversation,
      user
    } = this.props;
    const {
      data: conversations,
      requesting
    } = conversation.list;
    const {
      mapping,
      activeConversation = {}
    } = conversation;
    if (!this.conversationsRef) this.conversationsRef = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createRef"])();
    return __jsx("div", {
      className: "conversation-list",
      ref: this.conversationsRef,
      onScroll: this.handleScroll.bind(this),
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 139,
        columnNumber: 7
      }
    }, __jsx(src_socket__WEBPACK_IMPORTED_MODULE_4__["Event"], {
      event: "message_created",
      handler: this.onMessage,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 140,
        columnNumber: 9
      }
    }), conversations.length > 0 && conversations.map(conversationId => __jsx(_ConversationListItem__WEBPACK_IMPORTED_MODULE_6__["default"], {
      key: conversationId,
      data: mapping[conversationId],
      setActive: this.setActive,
      selected: activeConversation._id === conversationId,
      user: user,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 149,
        columnNumber: 13
      }
    })), requesting && __jsx("div", {
      className: "text-center",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 158,
        columnNumber: 9
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Spin"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 158,
        columnNumber: 38
      }
    })), !requesting && !conversations.length && __jsx("p", {
      style: {
        margin: '20px 0'
      },
      className: "text-center",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 161,
        columnNumber: 11
      }
    }, "No conversation found."));
  }
}
const mapStates = state => ({
  conversation: _objectSpread({}, state.conversation),
  message: _objectSpread({}, state.message),
  user: _objectSpread({}, state.user.current),
  sendMessageStatus: state.message.sendMessage
});
const mapDispatch = {
  searchConversations: _redux_message_actions__WEBPACK_IMPORTED_MODULE_3__["searchConversations"],
  getConversations: _redux_message_actions__WEBPACK_IMPORTED_MODULE_3__["getConversations"],
  setActiveConversation: _redux_message_actions__WEBPACK_IMPORTED_MODULE_3__["setActiveConversation"],
  getConversationDetail: _redux_message_actions__WEBPACK_IMPORTED_MODULE_3__["getConversationDetail"],
  receiveMessageSuccess: _redux_message_actions__WEBPACK_IMPORTED_MODULE_3__["receiveMessageSuccess"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStates, mapDispatch)(ConversationList));

/***/ }),

/***/ "./src/components/messages/ConversationListItem.less":
/*!***********************************************************!*\
  !*** ./src/components/messages/ConversationListItem.less ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/components/messages/ConversationListItem.tsx":
/*!**********************************************************!*\
  !*** ./src/components/messages/ConversationListItem.tsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ConversationListItem; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/icons */ "./src/icons/index.tsx");
/* harmony import */ var _lib_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lib/index */ "./src/lib/index.ts");
/* harmony import */ var _ConversationListItem_less__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ConversationListItem.less */ "./src/components/messages/ConversationListItem.less");
/* harmony import */ var _ConversationListItem_less__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ConversationListItem_less__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "C:\\Users\\roman\\Pictures\\Case\\row\\src\\components\\messages\\ConversationListItem.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





function ConversationListItem(props) {
  const {
    data,
    setActive,
    selected,
    user
  } = props;
  const {
    recipientInfo,
    lastMessage,
    _id,
    totalNotSeenMessages = 0,
    lastMessageCreatedAt,
    updatedAt,
    diamondsArePending
  } = data;
  const className = selected ? 'conversation-list-item active' : 'conversation-list-item';
  if (!lastMessage) {
    return null;
  }
  return __jsx("div", {
    "aria-hidden": true,
    className: className,
    onClick: () => {
      setActive(_id);
      next_router__WEBPACK_IMPORTED_MODULE_5___default.a.push('/messages');
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "conversation-left-corner",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 7
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Avatar"], {
    className: "conversation-photo",
    src: (recipientInfo === null || recipientInfo === void 0 ? void 0 : recipientInfo.avatar) || '/static/no-avatar.png',
    alt: "avatar",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 9
    }
  }), __jsx("span", {
    className: (recipientInfo === null || recipientInfo === void 0 ? void 0 : recipientInfo.isOnline) > 0 ? 'online-status active' : 'online-status',
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 9
    }
  })), __jsx("div", {
    className: "conversation-info",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 7
    }
  }, __jsx("h1", {
    className: "conversation-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 9
    }
  }, __jsx("span", {
    className: "re-name",
    title: (recipientInfo === null || recipientInfo === void 0 ? void 0 : recipientInfo.name) || (recipientInfo === null || recipientInfo === void 0 ? void 0 : recipientInfo.username) || 'N/A',
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 11
    }
  }, (recipientInfo === null || recipientInfo === void 0 ? void 0 : recipientInfo.name) || (recipientInfo === null || recipientInfo === void 0 ? void 0 : recipientInfo.username) || 'N/A', (recipientInfo === null || recipientInfo === void 0 ? void 0 : recipientInfo.verifiedAccount) && __jsx(src_icons__WEBPACK_IMPORTED_MODULE_2__["TickIcon"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 48
    }
  })), user.roles.indexOf('role-host-dmefee') !== -1 && diamondsArePending ? __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], {
    title: "You must respond within 24 hours in order to collect this fee",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 11
    }
  }, __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 11
    }
  }, __jsx("small", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 13
    }
  }, diamondsArePending), ' ', __jsx("img", {
    src: "./static/diamond.png",
    width: "20px",
    alt: "ruby",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 15
    }
  }))) : null), __jsx("p", {
    className: "conversation-snippet",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "short-content",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 11
    }
  }, lastMessage), __jsx("div", {
    className: "right-content",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 11
    }
  }, __jsx("span", {
    className: "conversation-time",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 13
    }
  }, Object(_lib_index__WEBPACK_IMPORTED_MODULE_3__["formatDateFromnow"])(lastMessageCreatedAt || updatedAt)), ' ', __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Badge"], {
    className: "notification-badge",
    count: totalNotSeenMessages,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 13
    }
  })))));
}

/***/ }),

/***/ "./src/components/notification/NotificationHeaderMenu.less":
/*!*****************************************************************!*\
  !*** ./src/components/notification/NotificationHeaderMenu.less ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/components/notification/NotificationHeaderMenu.tsx":
/*!****************************************************************!*\
  !*** ./src/components/notification/NotificationHeaderMenu.tsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reselect */ "reselect");
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(reselect__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _redux_message_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @redux/message/actions */ "./src/redux/message/actions.ts");
/* harmony import */ var _NotificationHeaderMenu_less__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NotificationHeaderMenu.less */ "./src/components/notification/NotificationHeaderMenu.less");
/* harmony import */ var _NotificationHeaderMenu_less__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_NotificationHeaderMenu_less__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _redux_notification_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @redux/notification/actions */ "./src/redux/notification/actions.ts");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var src_socket__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/socket */ "./src/socket/index.ts");
/* harmony import */ var _lib_string__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @lib/string */ "./src/lib/string.ts");
/* harmony import */ var _services_notification_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @services/notification.service */ "./src/services/notification.service.ts");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ant-design/icons */ "@ant-design/icons");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _components_messages_ConversationList__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @components/messages/ConversationList */ "./src/components/messages/ConversationList.tsx");
var _jsxFileName = "C:\\Users\\roman\\Pictures\\Case\\row\\src\\components\\notification\\NotificationHeaderMenu.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
/* eslint-disable react/require-default-props */













// import ButtonFollowBack from '@components/common/buttonFollowBack';
// import { IPerformer } from '@interfaces/performer';


const SEND_NOTIFICATION = 'send_notification';
const NotificationHeaderMenu = ({
  totalNotReadMessage,
  notificationCount,
  toId,
  toSource,
  deactiveConversation: handleDeactive,
  onReceiveMessage
}) => {
  const {
    0: read,
    1: setRead
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: tab,
    1: setTab
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('message');
  const socket = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(src_socket__WEBPACK_IMPORTED_MODULE_9__["SocketContext"]);
  const notifications = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(Object(reselect__WEBPACK_IMPORTED_MODULE_3__["createSelector"])(state => state.notification.success, state => state.notification.error, state => state.notification.dataSource, (success, error, data) => {
    if (success && !error) return data;
    return [];
  }));
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();
  const fetchData = () => {
    dispatch(Object(_redux_notification_actions__WEBPACK_IMPORTED_MODULE_6__["fetchNotificaion"])());
  };
  const onReceiveNotification = data => {
    fetchData();
    onReceiveMessage();
    antd__WEBPACK_IMPORTED_MODULE_1__["message"].success((data === null || data === void 0 ? void 0 : data.title) || (data === null || data === void 0 ? void 0 : data.message) || 'You received a new notification');
  };
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    fetchData();
  }, [read]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (!toSource && !toId) {
      handleDeactive();
    }
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (socket) {
      socket.on(SEND_NOTIFICATION, onReceiveNotification);
    }
    return () => {
      socket === null || socket === void 0 ? void 0 : socket.off(SEND_NOTIFICATION, onReceiveNotification);
    };
  }, [socket]);
  const redirect = notification => {
    switch (notification.type) {
      case 'live':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push({
          pathname: '/stream',
          query: {
            username: notification.createdBy
          }
        }, `/stream/${notification.createdBy}`);
      case 'privatechatRequest':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push('/model/private-waiting-room');
      case 'follow':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push({
          pathname: `/${notification.createdBy}`
        });
      case 'subscription':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push('/wallet');
      case 'comment':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push(`/post/${notification.refId}`);
      case 'feed':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push(`/post/${notification.refId}`);
      case 'adminDirectMessage':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push('/messages');
      case 'crossPromotion':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push({
          pathname: '/wallet',
          query: {
            tab: 'diamond-history'
          }
        });
      case 'directTip':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push('/wallet');
      case 'mileStone':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push('/broadcaster-dashboard');
      case 'available-private-chat':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push({
          pathname: '/user/private-waiting-room',
          query: {
            username: notification.createdBy
          }
        });
      case 'directMessage':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push('/messages');
      default:
        return null;
    }
  };
  const onClickItem = notification => {
    setRead(true);
    if (!notification.read) {
      // goi api PUT read
      _services_notification_service__WEBPACK_IMPORTED_MODULE_11__["notificationService"].read(notification._id);
      dispatch(Object(_redux_notification_actions__WEBPACK_IMPORTED_MODULE_6__["setReadItem"])(notification._id));
    }
    redirect(notification);
  };
  const handleChangeTab = val => {
    if (val === tab) {
      tab === 'notification' && next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push('/notifications');
      tab === 'message' && next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push('/messages');
    }
    setTab(val);
  };
  return __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Menu"], {
    title: "Notifications",
    className: "notification-menu",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 155,
      columnNumber: 5
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Menu"].ItemGroup, {
    title: __jsx("div", {
      className: "title-notification",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 158,
        columnNumber: 11
      }
    }, __jsx("div", {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 159,
        columnNumber: 13
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      className: "btn-dismiss-read-all",
      onClick: () => handleChangeTab('message'),
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 160,
        columnNumber: 15
      }
    }, __jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_12__["MailOutlined"], {
      style: {
        marginRight: '5px'
      },
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 161,
        columnNumber: 17
      }
    }), "Inbox", ' ', totalNotReadMessage)), __jsx("div", {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 167,
        columnNumber: 13
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      className: "btn-dismiss-read-all",
      onClick: () => handleChangeTab('notification'),
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 168,
        columnNumber: 15
      }
    }, __jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_12__["BellOutlined"], {
      style: {
        marginRight: '5px'
      },
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 169,
        columnNumber: 17
      }
    }), "Notifications", ' ', notificationCount))),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 156,
      columnNumber: 7
    }
  }, tab === 'message' ? __jsx(_components_messages_ConversationList__WEBPACK_IMPORTED_MODULE_13__["default"], {
    toSource: toSource,
    toId: toId,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 178,
      columnNumber: 30
    }
  }) : __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, notifications.length > 0 ? notifications.map(notification => __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Menu"].Item, {
    style: {
      padding: 0
    },
    key: notification._id,
    className: notification.read === false ? 'notification-unread' : 'notification-read',
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 183,
      columnNumber: 19
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    gutter: 24,
    className: "notification-item",
    style: {
      padding: '0 3px 0 3px'
    },
    onClick: () => onClickItem(notification),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 188,
      columnNumber: 21
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    md: 3,
    style: {
      padding: 0
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 189,
      columnNumber: 23
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Avatar"], {
    src: notification.thumbnail || '/no-image.jpg',
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 190,
      columnNumber: 25
    }
  })), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    md: 15,
    style: {
      padding: 0
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 192,
      columnNumber: 23
    }
  }, __jsx("div", {
    className: "notification-item-list",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 193,
      columnNumber: 25
    }
  }, __jsx("div", {
    className: "message",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 194,
      columnNumber: 27
    }
  }, Object(_lib_string__WEBPACK_IMPORTED_MODULE_10__["capitalizeFirstLetter"])(notification.title)), __jsx("span", {
    className: "time",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 195,
      columnNumber: 27
    }
  }, __jsx("small", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 195,
      columnNumber: 50
    }
  }, moment__WEBPACK_IMPORTED_MODULE_8___default()(notification.updatedAt).fromNow())))), __jsx("span", {
    className: notification.read === false ? 'notification-docw' : '',
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 208,
      columnNumber: 23
    }
  })))) : __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Menu"].Item, {
    key: "no-notification",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 213,
      columnNumber: 17
    }
  }, "There are no notifications."))));
};
const mapStateToProps = state => ({
  fetchNotificationSuccess: state.notification.success
});
const mapDispatch = {
  deactiveConversation: _redux_message_actions__WEBPACK_IMPORTED_MODULE_4__["deactiveConversation"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatch)(NotificationHeaderMenu));

/***/ }),

/***/ "./src/lib/date.ts":
/*!*************************!*\
  !*** ./src/lib/date.ts ***!
  \*************************/
/*! exports provided: formatDate, formatDateFromnow, dobToAge, formatLocaleDate, formatDateNew, formatDateToMMMDDYYYY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDate", function() { return formatDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDateFromnow", function() { return formatDateFromnow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dobToAge", function() { return dobToAge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatLocaleDate", function() { return formatLocaleDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDateNew", function() { return formatDateNew; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDateToMMMDDYYYY", function() { return formatDateToMMMDDYYYY; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

function formatDate(date, format = 'MMM/DD/YYYY') {
  return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format(format);
}
function formatDateFromnow(date, format = 'MMM-DD-YYYY') {
  if (moment__WEBPACK_IMPORTED_MODULE_0___default()().diff(moment__WEBPACK_IMPORTED_MODULE_0___default()(date), 'years') > 0) {
    return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format(format);
  }
  return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).fromNow();
}
function dobToAge(date) {
  return moment__WEBPACK_IMPORTED_MODULE_0___default()().diff(moment__WEBPACK_IMPORTED_MODULE_0___default()(date), 'years') > 0 && `${moment__WEBPACK_IMPORTED_MODULE_0___default()().diff(moment__WEBPACK_IMPORTED_MODULE_0___default()(date), 'years')}+`;
}
function formatLocaleDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}
function formatDateNew(date) {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
}
function formatDateToMMMDDYYYY(dateInput) {
  if (!dateInput) {
    throw new Error("Invalid date input. Please provide a valid Date object or a valid date string.");
  }
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input. Unable to parse the date.");
  }
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

/***/ }),

/***/ "./src/lib/duration.ts":
/*!*****************************!*\
  !*** ./src/lib/duration.ts ***!
  \*****************************/
/*! exports provided: videoDuration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "videoDuration", function() { return videoDuration; });
function videoDuration(s) {
  if (!s) {
    return '00:00';
  }
  const secNum = parseInt(s, 10); // don't forget the second param
  let hours = Math.floor(secNum / 3600);
  let minutes = Math.floor((secNum - hours * 3600) / 60);
  let seconds = secNum - hours * 3600 - minutes * 60;
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;
  return `${(hours !== '00' ? `${hours}:` : '') + minutes}:${seconds}`;
}

/***/ }),

/***/ "./src/lib/index.ts":
/*!**************************!*\
  !*** ./src/lib/index.ts ***!
  \**************************/
/*! exports provided: isHasInternetConnection, createSagas, createAction, createAsyncAction, createAsyncActions, createSelectorsA, handleActions, createReducers, createSelectors, createSelector, createJSSelectors, isUrl, capitalizeFirstLetter, isEmail, generateUuid, checkHeadTitle, formatDate, formatDateFromnow, dobToAge, formatLocaleDate, formatDateNew, formatDateToMMMDDYYYY, validateMessages, videoDuration, arrayToTree, pathMatchRegexp, queryAncestors, getResponseError, delay, redirect404, shortenLargeNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internet */ "./src/lib/internet.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isHasInternetConnection", function() { return _internet__WEBPACK_IMPORTED_MODULE_0__["isHasInternetConnection"]; });

/* harmony import */ var _redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./redux */ "./src/lib/redux.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createSagas", function() { return _redux__WEBPACK_IMPORTED_MODULE_1__["createSagas"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createAction", function() { return _redux__WEBPACK_IMPORTED_MODULE_1__["createAction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createAsyncAction", function() { return _redux__WEBPACK_IMPORTED_MODULE_1__["createAsyncAction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createAsyncActions", function() { return _redux__WEBPACK_IMPORTED_MODULE_1__["createAsyncActions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createSelectorsA", function() { return _redux__WEBPACK_IMPORTED_MODULE_1__["createSelectorsA"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "handleActions", function() { return _redux__WEBPACK_IMPORTED_MODULE_1__["handleActions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createReducers", function() { return _redux__WEBPACK_IMPORTED_MODULE_1__["createReducers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createSelectors", function() { return _redux__WEBPACK_IMPORTED_MODULE_1__["createSelectors"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createSelector", function() { return _redux__WEBPACK_IMPORTED_MODULE_1__["createSelector"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createJSSelectors", function() { return _redux__WEBPACK_IMPORTED_MODULE_1__["createJSSelectors"]; });

/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./string */ "./src/lib/string.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isUrl", function() { return _string__WEBPACK_IMPORTED_MODULE_2__["isUrl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "capitalizeFirstLetter", function() { return _string__WEBPACK_IMPORTED_MODULE_2__["capitalizeFirstLetter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isEmail", function() { return _string__WEBPACK_IMPORTED_MODULE_2__["isEmail"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generateUuid", function() { return _string__WEBPACK_IMPORTED_MODULE_2__["generateUuid"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "checkHeadTitle", function() { return _string__WEBPACK_IMPORTED_MODULE_2__["checkHeadTitle"]; });

/* harmony import */ var _date__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./date */ "./src/lib/date.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatDate", function() { return _date__WEBPACK_IMPORTED_MODULE_3__["formatDate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatDateFromnow", function() { return _date__WEBPACK_IMPORTED_MODULE_3__["formatDateFromnow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dobToAge", function() { return _date__WEBPACK_IMPORTED_MODULE_3__["dobToAge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatLocaleDate", function() { return _date__WEBPACK_IMPORTED_MODULE_3__["formatLocaleDate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatDateNew", function() { return _date__WEBPACK_IMPORTED_MODULE_3__["formatDateNew"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatDateToMMMDDYYYY", function() { return _date__WEBPACK_IMPORTED_MODULE_3__["formatDateToMMMDDYYYY"]; });

/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./message */ "./src/lib/message.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validateMessages", function() { return _message__WEBPACK_IMPORTED_MODULE_4__["validateMessages"]; });

/* harmony import */ var _duration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./duration */ "./src/lib/duration.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "videoDuration", function() { return _duration__WEBPACK_IMPORTED_MODULE_5__["videoDuration"]; });

/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "arrayToTree", function() { return _utils__WEBPACK_IMPORTED_MODULE_6__["arrayToTree"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pathMatchRegexp", function() { return _utils__WEBPACK_IMPORTED_MODULE_6__["pathMatchRegexp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryAncestors", function() { return _utils__WEBPACK_IMPORTED_MODULE_6__["queryAncestors"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getResponseError", function() { return _utils__WEBPACK_IMPORTED_MODULE_6__["getResponseError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "delay", function() { return _utils__WEBPACK_IMPORTED_MODULE_6__["delay"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "redirect404", function() { return _utils__WEBPACK_IMPORTED_MODULE_6__["redirect404"]; });

/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./number */ "./src/lib/number.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shortenLargeNumber", function() { return _number__WEBPACK_IMPORTED_MODULE_7__["shortenLargeNumber"]; });










/***/ }),

/***/ "./src/lib/internet.ts":
/*!*****************************!*\
  !*** ./src/lib/internet.ts ***!
  \*****************************/
/*! exports provided: isHasInternetConnection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHasInternetConnection", function() { return isHasInternetConnection; });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);

const INTERNET_CHECK_URL = 'https://google.com';
const isHasInternetConnection = async () => {
  try {
    const res = await fetch(INTERNET_CHECK_URL, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0
      }
    });
    if (res.status === 404 || res.status === 401 || res.status === 403 || res.status === 500 || res.status >= 200 && res.status <= 300) {
      return true;
    }
  } catch (exception) {
    antd__WEBPACK_IMPORTED_MODULE_0__["message"].error(exception);
  }
  return false;
};

/***/ }),

/***/ "./src/lib/message.ts":
/*!****************************!*\
  !*** ./src/lib/message.ts ***!
  \****************************/
/*! exports provided: validateMessages */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateMessages", function() { return validateMessages; });
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: 'This field is required!',
  types: {
    email: 'Not a validate email!',
    number: 'Not a validate number!'
  },
  number: {
    range: 'Must be between ${min} and ${max}'
  }
};

/***/ }),

/***/ "./src/lib/number.ts":
/*!***************************!*\
  !*** ./src/lib/number.ts ***!
  \***************************/
/*! exports provided: shortenLargeNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shortenLargeNumber", function() { return shortenLargeNumber; });
function shortenLargeNumber(num) {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1).replace(/\.0$/, '')}B`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return num;
}

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9tZXNzYWdlcy9Db252ZXJzYXRpb25MaXN0LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9tZXNzYWdlcy9Db252ZXJzYXRpb25MaXN0SXRlbS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uL05vdGlmaWNhdGlvbkhlYWRlck1lbnUudHN4Iiwid2VicGFjazovLy8uL3NyYy9saWIvZGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2R1cmF0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9pbnRlcm5ldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL21lc3NhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9udW1iZXIudHMiXSwibmFtZXMiOlsiQ29udmVyc2F0aW9uTGlzdCIsIlB1cmVDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsImFyZ3MiLCJfZGVmaW5lUHJvcGVydHkiLCJjb252ZXJzYXRpb25QYWdlIiwia2V5d29yZCIsIm1lc3NhZ2UiLCJjb252ZXJzYXRpb24iLCJnZXRDb252ZXJzYXRpb25zIiwiZ2V0Q29udmVyc2F0aW9uc0hhbmRsZXIiLCJnZXRDb252ZXJzYXRpb25EZXRhaWwiLCJnZXRDb252ZXJzYXRpb25EZXRhaWxIYW5kbGVyIiwicmVjZWl2ZU1lc3NhZ2VTdWNjZXNzIiwicmVjZWl2ZU1lc3NhZ2VTdWNjZXNzSGFuZGxlciIsInNldEFjdGl2ZUNvbnZlcnNhdGlvbiIsInNldEFjdGl2ZUNvbnZlcnNhdGlvbkhhbmRsZXIiLCJ1c2VyIiwicHJvcHMiLCJzdGF0ZSIsIm1hcHBpbmciLCJjb252ZXJzYXRpb25JZCIsImlkIiwicmVjaXBpZW50SWQiLCJfaWQiLCJsaW1pdCIsIm9mZnNldCIsInR5cGUiLCJkZWJvdW5jZSIsImUiLCJ2YWx1ZSIsInRhcmdldCIsInNlYXJjaENvbnZlcnNhdGlvbnMiLCJzZXRTdGF0ZSIsImV2ZW50IiwicmVxdWVzdGluZyIsImRhdGEiLCJ0b3RhbCIsImxpc3QiLCJjYW5sb2FkbW9yZSIsImxlbmd0aCIsImVsZSIsInNjcm9sbEhlaWdodCIsInNjcm9sbFRvcCIsImNsaWVudEhlaWdodCIsIm5ld1BhZ2UiLCJjb21wb25lbnREaWRNb3VudCIsImNvbnZlcnNhdGlvbnNSZWYiLCJjcmVhdGVSZWYiLCJ0b1NvdXJjZSIsInRvSWQiLCJzZXRUaW1lb3V0Iiwic291cmNlIiwic291cmNlSWQiLCJyZW5kZXIiLCJjb252ZXJzYXRpb25zIiwiYWN0aXZlQ29udmVyc2F0aW9uIiwiX19qc3giLCJjbGFzc05hbWUiLCJyZWYiLCJvblNjcm9sbCIsImhhbmRsZVNjcm9sbCIsImJpbmQiLCJfX3NlbGYiLCJfX3NvdXJjZSIsImZpbGVOYW1lIiwiX2pzeEZpbGVOYW1lIiwibGluZU51bWJlciIsImNvbHVtbk51bWJlciIsIkV2ZW50IiwiaGFuZGxlciIsIm9uTWVzc2FnZSIsIm1hcCIsIkNvbnZlcnNhdGlvbkxpc3RJdGVtIiwia2V5Iiwic2V0QWN0aXZlIiwic2VsZWN0ZWQiLCJTcGluIiwic3R5bGUiLCJtYXJnaW4iLCJtYXBTdGF0ZXMiLCJfb2JqZWN0U3ByZWFkIiwiY3VycmVudCIsInNlbmRNZXNzYWdlU3RhdHVzIiwic2VuZE1lc3NhZ2UiLCJtYXBEaXNwYXRjaCIsImNvbm5lY3QiLCJyZWNpcGllbnRJbmZvIiwibGFzdE1lc3NhZ2UiLCJ0b3RhbE5vdFNlZW5NZXNzYWdlcyIsImxhc3RNZXNzYWdlQ3JlYXRlZEF0IiwidXBkYXRlZEF0IiwiZGlhbW9uZHNBcmVQZW5kaW5nIiwib25DbGljayIsIlJvdXRlciIsInB1c2giLCJBdmF0YXIiLCJzcmMiLCJhdmF0YXIiLCJhbHQiLCJpc09ubGluZSIsInRpdGxlIiwibmFtZSIsInVzZXJuYW1lIiwidmVyaWZpZWRBY2NvdW50IiwiVGlja0ljb24iLCJyb2xlcyIsImluZGV4T2YiLCJUb29sdGlwIiwid2lkdGgiLCJmb3JtYXREYXRlRnJvbW5vdyIsIkJhZGdlIiwiY291bnQiLCJTRU5EX05PVElGSUNBVElPTiIsIk5vdGlmaWNhdGlvbkhlYWRlck1lbnUiLCJ0b3RhbE5vdFJlYWRNZXNzYWdlIiwibm90aWZpY2F0aW9uQ291bnQiLCJkZWFjdGl2ZUNvbnZlcnNhdGlvbiIsImhhbmRsZURlYWN0aXZlIiwib25SZWNlaXZlTWVzc2FnZSIsInJlYWQiLCJzZXRSZWFkIiwidXNlU3RhdGUiLCJ0YWIiLCJzZXRUYWIiLCJzb2NrZXQiLCJ1c2VDb250ZXh0IiwiU29ja2V0Q29udGV4dCIsIm5vdGlmaWNhdGlvbnMiLCJ1c2VTZWxlY3RvciIsImNyZWF0ZVNlbGVjdG9yIiwibm90aWZpY2F0aW9uIiwic3VjY2VzcyIsImVycm9yIiwiZGF0YVNvdXJjZSIsImRpc3BhdGNoIiwidXNlRGlzcGF0Y2giLCJmZXRjaERhdGEiLCJmZXRjaE5vdGlmaWNhaW9uIiwib25SZWNlaXZlTm90aWZpY2F0aW9uIiwidXNlRWZmZWN0Iiwib24iLCJvZmYiLCJyZWRpcmVjdCIsInBhdGhuYW1lIiwicXVlcnkiLCJjcmVhdGVkQnkiLCJyZWZJZCIsIm9uQ2xpY2tJdGVtIiwibm90aWZpY2F0aW9uU2VydmljZSIsInNldFJlYWRJdGVtIiwiaGFuZGxlQ2hhbmdlVGFiIiwidmFsIiwiTWVudSIsIkl0ZW1Hcm91cCIsIkJ1dHRvbiIsIk1haWxPdXRsaW5lZCIsIm1hcmdpblJpZ2h0IiwiQmVsbE91dGxpbmVkIiwiUmVhY3QiLCJGcmFnbWVudCIsIkl0ZW0iLCJwYWRkaW5nIiwiUm93IiwiZ3V0dGVyIiwiQ29sIiwibWQiLCJ0aHVtYm5haWwiLCJjYXBpdGFsaXplRmlyc3RMZXR0ZXIiLCJtb21lbnQiLCJmcm9tTm93IiwibWFwU3RhdGVUb1Byb3BzIiwiZmV0Y2hOb3RpZmljYXRpb25TdWNjZXNzIiwiZm9ybWF0RGF0ZSIsImRhdGUiLCJmb3JtYXQiLCJkaWZmIiwiZG9iVG9BZ2UiLCJmb3JtYXRMb2NhbGVEYXRlIiwiZGF0ZVN0cmluZyIsIkRhdGUiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJkYXkiLCJtb250aCIsInllYXIiLCJmb3JtYXREYXRlTmV3IiwiZCIsIlN0cmluZyIsImdldE1vbnRoIiwicGFkU3RhcnQiLCJnZXREYXRlIiwiZ2V0RnVsbFllYXIiLCJmb3JtYXREYXRlVG9NTU1ERFlZWVkiLCJkYXRlSW5wdXQiLCJFcnJvciIsImlzTmFOIiwiZ2V0VGltZSIsIm1vbnRocyIsInZpZGVvRHVyYXRpb24iLCJzIiwic2VjTnVtIiwicGFyc2VJbnQiLCJob3VycyIsIk1hdGgiLCJmbG9vciIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwiSU5URVJORVRfQ0hFQ0tfVVJMIiwiaXNIYXNJbnRlcm5ldENvbm5lY3Rpb24iLCJyZXMiLCJmZXRjaCIsImhlYWRlcnMiLCJQcmFnbWEiLCJFeHBpcmVzIiwic3RhdHVzIiwiZXhjZXB0aW9uIiwidmFsaWRhdGVNZXNzYWdlcyIsInJlcXVpcmVkIiwidHlwZXMiLCJlbWFpbCIsIm51bWJlciIsInJhbmdlIiwic2hvcnRlbkxhcmdlTnVtYmVyIiwibnVtIiwidG9GaXhlZCIsInJlcGxhY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWlEO0FBQ3JCO0FBQ1U7QUFJTjtBQUNHO0FBQ0Q7QUFFbEM7QUFDMEQ7QUFDekI7QUF1QmpDLE1BQU1BLGdCQUFnQixTQUFTQyxtREFBYSxDQUFTO0VBQUFDLFlBQUEsR0FBQUMsSUFBQTtJQUFBLFNBQUFBLElBQUE7SUFBQUMsZUFBQTtJQUFBQSxlQUFBLGdCQUczQztNQUNOQyxnQkFBZ0IsRUFBRSxDQUFDO01BQ25CQyxPQUFPLEVBQUU7SUFDWCxDQUFDO0lBQUFGLGVBQUEsb0JBMEJZRyxPQUE2QyxJQUFLO01BQzdELElBQUksQ0FBQ0EsT0FBTyxFQUFFO1FBQ1o7TUFDRjtNQUNBLE1BQU07UUFDSkMsWUFBWTtRQUNaQyxnQkFBZ0IsRUFBRUMsdUJBQXVCO1FBQ3pDQyxxQkFBcUIsRUFBRUMs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LEdBQUcsSUFBSSxPQUFPLEVBQUU7SUFDbEIsT0FBTyxHQUFHLENBQUNBLEdBQUcsR0FBRyxPQUFPLEVBQUVDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsR0FBRztFQUM3RDtFQUNBLElBQUlGLEdBQUcsSUFBSSxJQUFJLEVBQUU7SUFDZixPQUFPLEdBQUcsQ0FBQ0EsR0FBRyxHQUFHLElBQUksRUFBRUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxHQUFHO0VBQzFEO0VBQ0EsT0FBT0YsR0FBRztBQUNaLEMiLCJmaWxlIjoiMS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFB1cmVDb21wb25lbnQsIGNyZWF0ZVJlZiB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgU3BpbiB9IGZyb20gJ2FudGQnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQge1xyXG4gIHNlYXJjaENvbnZlcnNhdGlvbnMsIGdldENvbnZlcnNhdGlvbnMsIHNldEFjdGl2ZUNvbnZlcnNhdGlvbixcclxuICBnZXRDb252ZXJzYXRpb25EZXRhaWwsIHJlY2VpdmVNZXNzYWdlU3VjY2Vzc1xyXG59IGZyb20gJ0ByZWR1eC9tZXNzYWdlL2FjdGlvbnMnO1xyXG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJ3NyYy9zb2NrZXQnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IElQZXJmb3JtZXIgfSBmcm9tICdzcmMvaW50ZXJmYWNlcyc7XHJcbi8vIGltcG9ydCBDb252ZXJzYXRpb25TZWFyY2ggZnJvbSAnLi9Db252ZXJzYXRpb25TZWFyY2gnO1xyXG5pbXBvcnQgQ29udmVyc2F0aW9uTGlzdEl0ZW0gZnJvbSAnLi9Db252ZXJzYXRpb25MaXN0SXRlbSc7XHJcbmltcG9ydCAnLi9Db252ZXJzYXRpb25MaXN0Lmxlc3MnO1xyXG5cclxuaW50ZXJmYWNlIElQcm9wcyB7XHJcbiAgc2VhcmNoQ29udmVyc2F0aW9uczogRnVuY3Rpb247XHJcbiAgZ2V0Q29udmVyc2F0aW9uczogRnVuY3Rpb247XHJcbiAgc2V0QWN0aXZlQ29udmVyc2F0aW9uOiBGdW5jdGlvbjtcclxuICBnZXRDb252ZXJzYXRpb25EZXRhaWw6IEZ1bmN0aW9uO1xyXG4gIHJlY2VpdmVNZXNzYWdlU3VjY2VzczogRnVuY3Rpb247XHJcbiAgY29udmVyc2F0aW9uOiB7XHJcbiAgICBsaXN0OiB7XHJcbiAgICAgIHJlcXVlc3Rpbmc6IGJvb2xlYW47XHJcbiAgICAgIGVycm9yOiBhbnk7XHJcbiAgICAgIGRhdGE6IGFueVtdO1xyXG4gICAgICB0b3RhbDogbnVtYmVyO1xyXG4gICAgICBzdWNjZXNzOiBib29sZWFuO1xyXG4gICAgfTtcclxuICAgIG1hcHBpbmc6IFJlY29yZDxzdHJpbmcsIGFueT47XHJcbiAgICBhY3RpdmVDb252ZXJzYXRpb246IFJlY29yZDxzdHJpbmcsIGFueT47XHJcbiAgfTtcclxuICB0b1NvdXJjZTogc3RyaW5nO1xyXG4gIHRvSWQ6IHN0cmluZztcclxuICB1c2VyOiBJUGVyZm9ybWVyO1xyXG59XHJcbmNsYXNzIENvbnZlcnNhdGlvbkxpc3QgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PElQcm9wcz4ge1xyXG4gIGNvbnZlcnNhdGlvbnNSZWY6IGFueTtcclxuXHJcbiAgc3RhdGUgPSB7XHJcbiAgICBjb252ZXJzYXRpb25QYWdlOiAwLFxyXG4gICAga2V5d29yZDogJydcclxuICB9XHJcblxyXG4gIGFzeW5jIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgaWYgKCF0aGlzLmNvbnZlcnNhdGlvbnNSZWYpIHRoaXMuY29udmVyc2F0aW9uc1JlZiA9IGNyZWF0ZVJlZigpO1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBnZXRDb252ZXJzYXRpb25zOiBnZXRDb252ZXJzYXRpb25zSGFuZGxlcixcclxuICAgICAgc2V0QWN0aXZlQ29udmVyc2F0aW9uOiBzZXRBY3RpdmVDb252ZXJzYXRpb25IYW5kbGVyLFxyXG4gICAgICB0b1NvdXJjZSxcclxuICAgICAgdG9JZCxcclxuICAgICAgdXNlclxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCB7IGNvbnZlcnNhdGlvblBhZ2UsIGtleXdvcmQgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBnZXRDb252ZXJzYXRpb25zSGFuZGxlcih7XHJcbiAgICAgIGxpbWl0OiAyNSwgb2Zmc2V0OiBjb252ZXJzYXRpb25QYWdlICogMjUsIHR5cGU6ICdwcml2YXRlJywga2V5d29yZFxyXG4gICAgfSk7XHJcbiAgICBpZiAodG9Tb3VyY2UgJiYgdG9JZCkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBzZXRBY3RpdmVDb252ZXJzYXRpb25IYW5kbGVyKHtcclxuICAgICAgICAgIHNvdXJjZTogdG9Tb3VyY2UsXHJcbiAgICAgICAgICBzb3VyY2VJZDogdG9JZCxcclxuICAgICAgICAgIHJlY2lwaWVudElkOiB1c2VyLl9pZFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uTWVzc2FnZSA9IChtZXNzYWdlOiB7IGNvbnZlcnNhdGlvbklkOiBzdHJpbmcgfCBudW1iZXI7IH0pID0+IHtcclxuICAgIGlmICghbWVzc2FnZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNvbnZlcnNhdGlvbixcclxuICAgICAgZ2V0Q29udmVyc2F0aW9uczogZ2V0Q29udmVyc2F0aW9uc0hhbmRsZXIsXHJcbiAgICAgIGdldENvbnZlcnNhdGlvbkRldGFpbDogZ2V0Q29udmVyc2F0aW9uRGV0YWlsSGFuZGxlcixcclxuICAgICAgcmVjZWl2ZU1lc3NhZ2VTdWNjZXNzOiByZWNlaXZlTWVzc2FnZVN1Y2Nlc3NIYW5kbGVyLFxyXG4gICAgICBzZXRBY3RpdmVDb252ZXJzYXRpb246IHNldEFjdGl2ZUNvbnZlcnNhdGlvbkhhbmRsZXIsXHJcbiAgICAgIHVzZXJcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgeyBjb252ZXJzYXRpb25QYWdlLCBrZXl3b3JkIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgeyBtYXBwaW5nIH0gPSBjb252ZXJzYXRpb247XHJcbiAgICBpZiAoIW1hcHBpbmdbbWVzc2FnZS5jb252ZXJzYXRpb25JZF0pIHtcclxuICAgICAgZ2V0Q29udmVyc2F0aW9uRGV0YWlsSGFuZGxlcih7XHJcbiAgICAgICAgaWQ6IG1lc3NhZ2UuY29udmVyc2F0aW9uSWRcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB7IGNvbnZlcnNhdGlvbklkIH0gPSBtZXNzYWdlO1xyXG4gICAgc2V0QWN0aXZlQ29udmVyc2F0aW9uSGFuZGxlcih7IGNvbnZlcnNhdGlvbklkLCByZWNpcGllbnRJZDogdXNlci5faWQgfSk7XHJcbiAgICBnZXRDb252ZXJzYXRpb25zSGFuZGxlcih7XHJcbiAgICAgIGxpbWl0OiAyNSwgb2Zmc2V0OiBjb252ZXJzYXRpb25QYWdlICogMjUsIHR5cGU6ICdwcml2YXRlJywga2V5d29yZFxyXG4gICAgfSk7XHJcbiAgICByZWNlaXZlTWVzc2FnZVN1Y2Nlc3NIYW5kbGVyKG1lc3NhZ2UpO1xyXG4gIH07XHJcblxyXG4gIG9uU2VhcmNoQ29udmVyc2F0aW9uID0gZGVib3VuY2UoYXN5bmMgKGUpID0+IHtcclxuICAgIGNvbnN0IHsgdmFsdWUgfSA9IGUudGFyZ2V0O1xyXG4gICAgY29uc3QgeyBzZWFyY2hDb252ZXJzYXRpb25zOiBnZXRDb252ZXJzYXRpb25zSGFuZGxlciB9ID0gdGhpcy5wcm9wcztcclxuICAgIGF3YWl0IHRoaXMuc2V0U3RhdGUoeyBrZXl3b3JkOiB2YWx1ZSwgY29udmVyc2F0aW9uUGFnZTogMCB9KTtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICByZXR1cm4gZ2V0Q29udmVyc2F0aW9uc0hhbmRsZXIoe1xyXG4gICAgICAgIGtleXdvcmQ6IHZhbHVlLCBsaW1pdDogMjUsIG9mZnNldDogMCwgdHlwZTogJ3ByaXZhdGUnXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdldENvbnZlcnNhdGlvbnNIYW5kbGVyKHsgbGltaXQ6IDI1LCBvZmZzZXQ6IDAsIHR5cGU6ICdwcml2YXRlJyB9KTtcclxuICB9LCA1MDApO1xyXG5cclxuICBoYW5kbGVTY3JvbGwgPSBhc3luYyAoZXZlbnQ6IHsgdGFyZ2V0OiBhbnk7IH0pID0+IHtcclxuICAgIGNvbnN0IHsgY29udmVyc2F0aW9uLCBnZXRDb252ZXJzYXRpb25zOiBnZXRDb252ZXJzYXRpb25zSGFuZGxlciB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHsgcmVxdWVzdGluZywgZGF0YSwgdG90YWwgfSA9IGNvbnZlcnNhdGlvbi5saXN0O1xyXG4gICAgY29uc3QgeyBjb252ZXJzYXRpb25QYWdlLCBrZXl3b3JkIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgY2FubG9hZG1vcmUgPSB0b3RhbCA+IGRhdGEubGVuZ3RoO1xyXG4gICAgY29uc3QgZWxlID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgaWYgKCFjYW5sb2FkbW9yZSkgcmV0dXJuO1xyXG4gICAgaWYgKGVsZS5zY3JvbGxIZWlnaHQgLSBlbGUuc2Nyb2xsVG9wID09PSBlbGUuY2xpZW50SGVpZ2h0ICYmICFyZXF1ZXN0aW5nICYmIGNhbmxvYWRtb3JlKSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb252ZXJzYXRpb25QYWdlOiBjb252ZXJzYXRpb25QYWdlICsgMSB9LCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBjb252ZXJzYXRpb25QYWdlOiBuZXdQYWdlIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGdldENvbnZlcnNhdGlvbnNIYW5kbGVyKHtcclxuICAgICAgICAgIGtleXdvcmQsIGxpbWl0OiAyNSwgb2Zmc2V0OiBuZXdQYWdlICogMjUsIHR5cGU6ICdwcml2YXRlJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEFjdGl2ZSA9IChjb252ZXJzYXRpb25JZDogYW55KSA9PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHNldEFjdGl2ZUNvbnZlcnNhdGlvbjogc2V0QWN0aXZlQ29udmVyc2F0aW9uSGFuZGxlcixcclxuICAgICAgdXNlclxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBzZXRBY3RpdmVDb252ZXJzYXRpb25IYW5kbGVyKHsgY29udmVyc2F0aW9uSWQsIHJlY2lwaWVudElkOiB1c2VyLl9pZCB9KTtcclxuICB9O1xyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGNvbnZlcnNhdGlvbiwgdXNlciB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHsgZGF0YTogY29udmVyc2F0aW9ucywgcmVxdWVzdGluZyB9ID0gY29udmVyc2F0aW9uLmxpc3Q7XHJcbiAgICBjb25zdCB7IG1hcHBpbmcsIGFjdGl2ZUNvbnZlcnNhdGlvbiA9IHt9IH0gPSBjb252ZXJzYXRpb247XHJcbiAgICBpZiAoIXRoaXMuY29udmVyc2F0aW9uc1JlZikgdGhpcy5jb252ZXJzYXRpb25zUmVmID0gY3JlYXRlUmVmKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb252ZXJzYXRpb24tbGlzdFwiIHJlZj17dGhpcy5jb252ZXJzYXRpb25zUmVmfSBvblNjcm9sbD17dGhpcy5oYW5kbGVTY3JvbGwuYmluZCh0aGlzKX0+XHJcbiAgICAgICAgPEV2ZW50IGV2ZW50PVwibWVzc2FnZV9jcmVhdGVkXCIgaGFuZGxlcj17dGhpcy5vbk1lc3NhZ2V9IC8+XHJcbiAgICAgICAgey8qIDxDb252ZXJzYXRpb25TZWFyY2hcclxuICAgICAgICAgIG9uU2VhcmNoPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnBlcnNpc3QoKTtcclxuICAgICAgICAgICAgdGhpcy5vblNlYXJjaENvbnZlcnNhdGlvbihlKTtcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgLz4gKi99XHJcbiAgICAgICAge2NvbnZlcnNhdGlvbnMubGVuZ3RoID4gMFxyXG4gICAgICAgICAgJiYgY29udmVyc2F0aW9ucy5tYXAoKGNvbnZlcnNhdGlvbklkKSA9PiAoXHJcbiAgICAgICAgICAgIDxDb252ZXJzYXRpb25MaXN0SXRlbVxyXG4gICAgICAgICAgICAgIGtleT17Y29udmVyc2F0aW9uSWR9XHJcbiAgICAgICAgICAgICAgZGF0YT17bWFwcGluZ1tjb252ZXJzYXRpb25JZF19XHJcbiAgICAgICAgICAgICAgc2V0QWN0aXZlPXt0aGlzLnNldEFjdGl2ZX1cclxuICAgICAgICAgICAgICBzZWxlY3RlZD17YWN0aXZlQ29udmVyc2F0aW9uLl9pZCA9PT0gY29udmVyc2F0aW9uSWR9XHJcbiAgICAgICAgICAgICAgdXNlcj17dXNlcn1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIHtyZXF1ZXN0aW5nICYmIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+PFNwaW4gLz48L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICAgIHshcmVxdWVzdGluZyAmJiAhY29udmVyc2F0aW9ucy5sZW5ndGggJiYgKFxyXG4gICAgICAgICAgPHAgc3R5bGU9e3sgbWFyZ2luOiAnMjBweCAwJyB9fSBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPk5vIGNvbnZlcnNhdGlvbiBmb3VuZC48L3A+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVzID0gKHN0YXRlOiBhbnkpID0+ICh7XHJcbiAgY29udmVyc2F0aW9uOiB7IC4uLnN0YXRlLmNvbnZlcnNhdGlvbiB9LFxyXG4gIG1lc3NhZ2U6IHsgLi4uc3RhdGUubWVzc2FnZSB9LFxyXG4gIHVzZXI6IHsgLi4uc3RhdGUudXNlci5jdXJyZW50IH0sXHJcbiAgc2VuZE1lc3NhZ2VTdGF0dXM6IHN0YXRlLm1lc3NhZ2Uuc2VuZE1lc3NhZ2VcclxufSk7XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaCA9IHtcclxuICBzZWFyY2hDb252ZXJzYXRpb25zLFxyXG4gIGdldENvbnZlcnNhdGlvbnMsXHJcbiAgc2V0QWN0aXZlQ29udmVyc2F0aW9uLFxyXG4gIGdldENvbnZlcnNhdGlvbkRldGFpbCxcclxuICByZWNlaXZlTWVzc2FnZVN1Y2Nlc3NcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZXMsIG1hcERpc3BhdGNoKShDb252ZXJzYXRpb25MaXN0KTtcclxuIiwiaW1wb3J0IHsgQmFkZ2UsIEF2YXRhciwgVG9vbHRpcCB9IGZyb20gJ2FudGQnO1xyXG5pbXBvcnQgeyBUaWNrSWNvbiB9IGZyb20gJ3NyYy9pY29ucyc7XHJcbmltcG9ydCB7IGZvcm1hdERhdGVGcm9tbm93IH0gZnJvbSAnQGxpYi9pbmRleCc7XHJcbmltcG9ydCB7IElDb252ZXJzYXRpb24gfSBmcm9tICdAaW50ZXJmYWNlcy9tZXNzYWdlJztcclxuaW1wb3J0ICcuL0NvbnZlcnNhdGlvbkxpc3RJdGVtLmxlc3MnO1xyXG5pbXBvcnQgUm91dGVyIGZyb20gJ25leHQvcm91dGVyJztcclxuaW1wb3J0IHsgSVBlcmZvcm1lciB9IGZyb20gJ0BpbnRlcmZhY2VzL3BlcmZvcm1lcic7XHJcblxyXG5pbnRlcmZhY2UgSVByb3BzIHtcclxuICBkYXRhOiBJQ29udmVyc2F0aW9uO1xyXG4gIHNldEFjdGl2ZTogRnVuY3Rpb247XHJcbiAgc2VsZWN0ZWQ6IGJvb2xlYW47XHJcbiAgdXNlcjogSVBlcmZvcm1lcjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29udmVyc2F0aW9uTGlzdEl0ZW0ocHJvcHM6IElQcm9wcykge1xyXG4gIGNvbnN0IHsgZGF0YSwgc2V0QWN0aXZlLCBzZWxlY3RlZCwgdXNlciB9ID0gcHJvcHM7XHJcblxyXG4gIGNvbnN0IHtcclxuICAgIHJlY2lwaWVudEluZm8sIGxhc3RNZXNzYWdlLCBfaWQsIHRvdGFsTm90U2Vlbk1lc3NhZ2VzID0gMCwgbGFzdE1lc3NhZ2VDcmVhdGVkQXQsIHVwZGF0ZWRBdCwgZGlhbW9uZHNBcmVQZW5kaW5nXHJcbiAgfSA9IGRhdGE7XHJcbiAgXHJcbiAgY29uc3QgY2xhc3NOYW1lID0gc2VsZWN0ZWQgPyAnY29udmVyc2F0aW9uLWxpc3QtaXRlbSBhY3RpdmUnIDogJ2NvbnZlcnNhdGlvbi1saXN0LWl0ZW0nO1xyXG4gIFxyXG4gIGlmICghbGFzdE1lc3NhZ2UpIHsgcmV0dXJuIG51bGw7IH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgYXJpYS1oaWRkZW4gY2xhc3NOYW1lPXtjbGFzc05hbWV9IG9uQ2xpY2s9eygpID0+IHsgc2V0QWN0aXZlKF9pZCk7IFJvdXRlci5wdXNoKCcvbWVzc2FnZXMnKTsgfX0+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udmVyc2F0aW9uLWxlZnQtY29ybmVyXCI+XHJcbiAgICAgICAgPEF2YXRhciBjbGFzc05hbWU9XCJjb252ZXJzYXRpb24tcGhvdG9cIiBzcmM9e3JlY2lwaWVudEluZm8/LmF2YXRhciB8fCAnL3N0YXRpYy9uby1hdmF0YXIucG5nJ30gYWx0PVwiYXZhdGFyXCIgLz5cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3JlY2lwaWVudEluZm8/LmlzT25saW5lID4gMCA/ICdvbmxpbmUtc3RhdHVzIGFjdGl2ZScgOiAnb25saW5lLXN0YXR1cyd9IC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnZlcnNhdGlvbi1pbmZvXCI+XHJcbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cImNvbnZlcnNhdGlvbi10aXRsZVwiPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmUtbmFtZVwiIHRpdGxlPXtyZWNpcGllbnRJbmZvPy5uYW1lIHx8IHJlY2lwaWVudEluZm8/LnVzZXJuYW1lIHx8ICdOL0EnfT5cclxuICAgICAgICAgICAge3JlY2lwaWVudEluZm8/Lm5hbWUgfHwgcmVjaXBpZW50SW5mbz8udXNlcm5hbWUgfHwgJ04vQSd9XHJcbiAgICAgICAgICAgIHtyZWNpcGllbnRJbmZvPy52ZXJpZmllZEFjY291bnQgJiYgPFRpY2tJY29uIC8+fVxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAge3VzZXIucm9sZXMuaW5kZXhPZigncm9sZS1ob3N0LWRtZWZlZScpICE9PSAtMSAmJiBkaWFtb25kc0FyZVBlbmRpbmcgPyAoXHJcbiAgICAgICAgICA8VG9vbHRpcCB0aXRsZT1cIllvdSBtdXN0IHJlc3BvbmQgd2l0aGluIDI0IGhvdXJzIGluIG9yZGVyIHRvIGNvbGxlY3QgdGhpcyBmZWVcIj5cclxuICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICA8c21hbGw+e2RpYW1vbmRzQXJlUGVuZGluZ308L3NtYWxsPlxyXG4gICAgICAgICAgICAgIHsnICd9XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL3N0YXRpYy9kaWFtb25kLnBuZ1wiIHdpZHRoPVwiMjBweFwiIGFsdD1cInJ1YnlcIiAvPlxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgPC9Ub29sdGlwPlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgPC9oMT5cclxuICAgICAgICA8cCBjbGFzc05hbWU9XCJjb252ZXJzYXRpb24tc25pcHBldFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaG9ydC1jb250ZW50XCI+e2xhc3RNZXNzYWdlfTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyaWdodC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNvbnZlcnNhdGlvbi10aW1lXCI+e2Zvcm1hdERhdGVGcm9tbm93KGxhc3RNZXNzYWdlQ3JlYXRlZEF0IHx8IHVwZGF0ZWRBdCl9PC9zcGFuPlxyXG4gICAgICAgICAgICB7JyAnfVxyXG4gICAgICAgICAgICA8QmFkZ2VcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJub3RpZmljYXRpb24tYmFkZ2VcIlxyXG4gICAgICAgICAgICAgIGNvdW50PXt0b3RhbE5vdFNlZW5NZXNzYWdlc31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvcD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3JlcXVpcmUtZGVmYXVsdC1wcm9wcyAqL1xyXG5pbXBvcnQgeyBJTm90aWZpY2F0aW9uIH0gZnJvbSAnQGludGVyZmFjZXMvbm90aWZpY2F0aW9uJztcclxuaW1wb3J0IHtcclxuICBNZW51LCBBdmF0YXIsIG1lc3NhZ2UsIFJvdywgQ29sLCBCdXR0b25cclxufSBmcm9tICdhbnRkJztcclxuaW1wb3J0IHsgdXNlRGlzcGF0Y2gsIHVzZVNlbGVjdG9yLCBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyBjcmVhdGVTZWxlY3RvciB9IGZyb20gJ3Jlc2VsZWN0JztcclxuaW1wb3J0IHsgZGVhY3RpdmVDb252ZXJzYXRpb24gfSBmcm9tICdAcmVkdXgvbWVzc2FnZS9hY3Rpb25zJztcclxuaW1wb3J0ICcuL05vdGlmaWNhdGlvbkhlYWRlck1lbnUubGVzcyc7XHJcbmltcG9ydCB7IGZldGNoTm90aWZpY2Fpb24sIHNldFJlYWRJdGVtIH0gZnJvbSAnQHJlZHV4L25vdGlmaWNhdGlvbi9hY3Rpb25zJztcclxuaW1wb3J0IHsgdXNlQ29udGV4dCwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJvdXRlciBmcm9tICduZXh0L3JvdXRlcic7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IHsgU29ja2V0Q29udGV4dCB9IGZyb20gJ3NyYy9zb2NrZXQnO1xyXG5pbXBvcnQgeyBjYXBpdGFsaXplRmlyc3RMZXR0ZXIgfSBmcm9tICdAbGliL3N0cmluZyc7XHJcbmltcG9ydCB7IG5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICdAc2VydmljZXMvbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xyXG4vLyBpbXBvcnQgQnV0dG9uRm9sbG93QmFjayBmcm9tICdAY29tcG9uZW50cy9jb21tb24vYnV0dG9uRm9sbG93QmFjayc7XHJcbi8vIGltcG9ydCB7IElQZXJmb3JtZXIgfSBmcm9tICdAaW50ZXJmYWNlcy9wZXJmb3JtZXInO1xyXG5pbXBvcnQgeyBCZWxsT3V0bGluZWQsIE1haWxPdXRsaW5lZCB9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zJztcclxuaW1wb3J0IENvbnZlcnNhdGlvbkxpc3QgZnJvbSAnQGNvbXBvbmVudHMvbWVzc2FnZXMvQ29udmVyc2F0aW9uTGlzdCc7XHJcblxyXG5jb25zdCBTRU5EX05PVElGSUNBVElPTiA9ICdzZW5kX25vdGlmaWNhdGlvbic7XHJcblxyXG5pbnRlcmZhY2UgSVByb3BzIHtcclxuXHJcbiAgLy8gY3VycmVudFVzZXI6IElQZXJmb3JtZXI7XHJcbiAgdG90YWxOb3RSZWFkTWVzc2FnZTogbnVtYmVyO1xyXG4gIG5vdGlmaWNhdGlvbkNvdW50OiBudW1iZXI7XHJcbiAgdG9Tb3VyY2U/OiBzdHJpbmc7XHJcbiAgdG9JZD86IHN0cmluZztcclxuICBkZWFjdGl2ZUNvbnZlcnNhdGlvbjogRnVuY3Rpb247XHJcbiAgb25SZWNlaXZlTWVzc2FnZT86RnVuY3Rpb247XHJcblxyXG59XHJcblxyXG5jb25zdCBOb3RpZmljYXRpb25IZWFkZXJNZW51ID0gKHtcclxuICB0b3RhbE5vdFJlYWRNZXNzYWdlLCBub3RpZmljYXRpb25Db3VudCwgdG9JZCwgdG9Tb3VyY2UsIGRlYWN0aXZlQ29udmVyc2F0aW9uOiBoYW5kbGVEZWFjdGl2ZSwgb25SZWNlaXZlTWVzc2FnZVxyXG59OiBJUHJvcHMpID0+IHtcclxuICBjb25zdCBbcmVhZCwgc2V0UmVhZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3RhYiwgc2V0VGFiXSA9IHVzZVN0YXRlKCdtZXNzYWdlJyk7XHJcblxyXG4gIGNvbnN0IHNvY2tldCA9IHVzZUNvbnRleHQoU29ja2V0Q29udGV4dCk7XHJcblxyXG4gIGNvbnN0IG5vdGlmaWNhdGlvbnMgPSB1c2VTZWxlY3RvcihcclxuICAgIGNyZWF0ZVNlbGVjdG9yKFxyXG4gICAgICAoc3RhdGU6IGFueSkgPT4gc3RhdGUubm90aWZpY2F0aW9uLnN1Y2Nlc3MsXHJcbiAgICAgIChzdGF0ZTogYW55KSA9PiBzdGF0ZS5ub3RpZmljYXRpb24uZXJyb3IsXHJcbiAgICAgIChzdGF0ZTogYW55KSA9PiBzdGF0ZS5ub3RpZmljYXRpb24uZGF0YVNvdXJjZSxcclxuICAgICAgKHN1Y2Nlc3MsIGVycm9yLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgaWYgKHN1Y2Nlc3MgJiYgIWVycm9yKSByZXR1cm4gZGF0YTtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICAgIH1cclxuICAgIClcclxuICApIGFzIElOb3RpZmljYXRpb25bXTtcclxuXHJcbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xyXG5cclxuICBjb25zdCBmZXRjaERhdGEgPSAoKSA9PiB7XHJcbiAgICBkaXNwYXRjaChmZXRjaE5vdGlmaWNhaW9uKCkpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG9uUmVjZWl2ZU5vdGlmaWNhdGlvbiA9IChkYXRhKSA9PiB7XHJcbiAgICBmZXRjaERhdGEoKTtcclxuICAgIG9uUmVjZWl2ZU1lc3NhZ2UoKTtcclxuICAgIG1lc3NhZ2Uuc3VjY2VzcyhkYXRhPy50aXRsZSB8fCBkYXRhPy5tZXNzYWdlIHx8ICdZb3UgcmVjZWl2ZWQgYSBuZXcgbm90aWZpY2F0aW9uJyk7XHJcbiAgfTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGZldGNoRGF0YSgpO1xyXG4gIH0sIFtyZWFkXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXRvU291cmNlICYmICF0b0lkKSB7XHJcbiAgICAgIGhhbmRsZURlYWN0aXZlKCk7XHJcbiAgICB9XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHNvY2tldCkge1xyXG4gICAgICBzb2NrZXQub24oU0VORF9OT1RJRklDQVRJT04sIG9uUmVjZWl2ZU5vdGlmaWNhdGlvbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBzb2NrZXQ/Lm9mZihTRU5EX05PVElGSUNBVElPTiwgb25SZWNlaXZlTm90aWZpY2F0aW9uKTtcclxuICAgIH07XHJcbiAgfSwgW3NvY2tldF0pO1xyXG5cclxuICBjb25zdCByZWRpcmVjdCA9IChub3RpZmljYXRpb24pID0+IHtcclxuICAgIHN3aXRjaCAobm90aWZpY2F0aW9uLnR5cGUpIHtcclxuICAgICAgY2FzZSAnbGl2ZSc6XHJcbiAgICAgICAgcmV0dXJuIFJvdXRlci5wdXNoKHtcclxuICAgICAgICAgIHBhdGhuYW1lOiAnL3N0cmVhbScsXHJcbiAgICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICB1c2VybmFtZTogbm90aWZpY2F0aW9uLmNyZWF0ZWRCeVxyXG5cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCBgL3N0cmVhbS8ke25vdGlmaWNhdGlvbi5jcmVhdGVkQnlcclxuICAgICAgICB9YCk7XHJcbiAgICAgIGNhc2UgJ3ByaXZhdGVjaGF0UmVxdWVzdCc6XHJcbiAgICAgICAgcmV0dXJuIFJvdXRlci5wdXNoKCcvbW9kZWwvcHJpdmF0ZS13YWl0aW5nLXJvb20nKTtcclxuICAgICAgY2FzZSAnZm9sbG93JzpcclxuICAgICAgICByZXR1cm4gUm91dGVyLnB1c2goe1xyXG4gICAgICAgICAgcGF0aG5hbWU6IGAvJHtub3RpZmljYXRpb24uY3JlYXRlZEJ5fWBcclxuICAgICAgICB9KTtcclxuICAgICAgY2FzZSAnc3Vic2NyaXB0aW9uJzpcclxuICAgICAgICByZXR1cm4gUm91dGVyLnB1c2goJy93YWxsZXQnKTtcclxuICAgICAgY2FzZSAnY29tbWVudCc6XHJcbiAgICAgICAgcmV0dXJuIFJvdXRlci5wdXNoKGAvcG9zdC8ke25vdGlmaWNhdGlvbi5yZWZJZH1gKTtcclxuICAgICAgY2FzZSAnZmVlZCc6XHJcbiAgICAgICAgcmV0dXJuIFJvdXRlci5wdXNoKGAvcG9zdC8ke25vdGlmaWNhdGlvbi5yZWZJZH1gKTtcclxuICAgICAgY2FzZSAnYWRtaW5EaXJlY3RNZXNzYWdlJzpcclxuICAgICAgICByZXR1cm4gUm91dGVyLnB1c2goJy9tZXNzYWdlcycpO1xyXG4gICAgICBjYXNlICdjcm9zc1Byb21vdGlvbic6XHJcbiAgICAgICAgcmV0dXJuIFJvdXRlci5wdXNoKHtcclxuICAgICAgICAgIHBhdGhuYW1lOiAnL3dhbGxldCcsXHJcbiAgICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICB0YWI6ICdkaWFtb25kLWhpc3RvcnknXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIGNhc2UgJ2RpcmVjdFRpcCc6XHJcbiAgICAgICAgcmV0dXJuIFJvdXRlci5wdXNoKCcvd2FsbGV0Jyk7XHJcbiAgICAgIGNhc2UgJ21pbGVTdG9uZSc6XHJcbiAgICAgICAgcmV0dXJuIFJvdXRlci5wdXNoKCcvYnJvYWRjYXN0ZXItZGFzaGJvYXJkJyk7XHJcbiAgICAgIGNhc2UgJ2F2YWlsYWJsZS1wcml2YXRlLWNoYXQnOlxyXG4gICAgICAgIHJldHVybiBSb3V0ZXIucHVzaCh7XHJcbiAgICAgICAgICBwYXRobmFtZTogJy91c2VyL3ByaXZhdGUtd2FpdGluZy1yb29tJyxcclxuICAgICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgIHVzZXJuYW1lOiBub3RpZmljYXRpb24uY3JlYXRlZEJ5XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIGNhc2UgJ2RpcmVjdE1lc3NhZ2UnOlxyXG4gICAgICAgIHJldHVybiBSb3V0ZXIucHVzaCgnL21lc3NhZ2VzJyk7XHJcbiAgICAgIGRlZmF1bHQ6IHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IG9uQ2xpY2tJdGVtID0gKG5vdGlmaWNhdGlvbikgPT4ge1xyXG4gICAgc2V0UmVhZCh0cnVlKTtcclxuICAgIGlmICghbm90aWZpY2F0aW9uLnJlYWQpIHtcclxuICAgICAgLy8gZ29pIGFwaSBQVVQgcmVhZFxyXG4gICAgICBub3RpZmljYXRpb25TZXJ2aWNlLnJlYWQobm90aWZpY2F0aW9uLl9pZCk7XHJcbiAgICAgIGRpc3BhdGNoKHNldFJlYWRJdGVtKG5vdGlmaWNhdGlvbi5faWQpKTtcclxuICAgIH1cclxuICAgIHJlZGlyZWN0KG5vdGlmaWNhdGlvbik7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2hhbmdlVGFiID0gKHZhbDogc3RyaW5nKSA9PiB7XHJcbiAgICBpZiAodmFsID09PSB0YWIpIHtcclxuICAgICAgdGFiID09PSAnbm90aWZpY2F0aW9uJyAmJiBSb3V0ZXIucHVzaCgnL25vdGlmaWNhdGlvbnMnKTtcclxuICAgICAgdGFiID09PSAnbWVzc2FnZScgJiYgUm91dGVyLnB1c2goJy9tZXNzYWdlcycpO1xyXG4gICAgfVxyXG4gICAgc2V0VGFiKHZhbCk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxNZW51IHRpdGxlPVwiTm90aWZpY2F0aW9uc1wiIGNsYXNzTmFtZT1cIm5vdGlmaWNhdGlvbi1tZW51XCI+XHJcbiAgICAgIDxNZW51Lkl0ZW1Hcm91cFxyXG4gICAgICAgIHRpdGxlPXsoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlLW5vdGlmaWNhdGlvblwiPlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxCdXR0b24gY2xhc3NOYW1lPVwiYnRuLWRpc21pc3MtcmVhZC1hbGxcIiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDaGFuZ2VUYWIoJ21lc3NhZ2UnKX0+XHJcbiAgICAgICAgICAgICAgICA8TWFpbE91dGxpbmVkIHN0eWxlPXt7IG1hcmdpblJpZ2h0OiAnNXB4JyB9fSAvPlxyXG4gICAgICAgICAgICAgICAgSW5ib3hcclxuICAgICAgICAgICAgICAgIHsnICd9XHJcbiAgICAgICAgICAgICAgICB7dG90YWxOb3RSZWFkTWVzc2FnZX1cclxuICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgPEJ1dHRvbiBjbGFzc05hbWU9XCJidG4tZGlzbWlzcy1yZWFkLWFsbFwiIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNoYW5nZVRhYignbm90aWZpY2F0aW9uJyl9PlxyXG4gICAgICAgICAgICAgICAgPEJlbGxPdXRsaW5lZCBzdHlsZT17eyBtYXJnaW5SaWdodDogJzVweCcgfX0gLz5cclxuICAgICAgICAgICAgICAgIE5vdGlmaWNhdGlvbnNcclxuICAgICAgICAgICAgICAgIHsnICd9XHJcbiAgICAgICAgICAgICAgICB7bm90aWZpY2F0aW9uQ291bnR9XHJcbiAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgPlxyXG4gICAgICAgIHt0YWIgPT09ICdtZXNzYWdlJyA/IDxDb252ZXJzYXRpb25MaXN0IHRvU291cmNlPXt0b1NvdXJjZX0gdG9JZD17dG9JZH0gLz5cclxuICAgICAgICAgIDogKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgIHtub3RpZmljYXRpb25zLmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb25zLm1hcCgobm90aWZpY2F0aW9uKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgIDxNZW51Lkl0ZW1cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBwYWRkaW5nOiAwIH19XHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtub3RpZmljYXRpb24uX2lkfVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17bm90aWZpY2F0aW9uLnJlYWQgPT09IGZhbHNlID8gJ25vdGlmaWNhdGlvbi11bnJlYWQnIDogJ25vdGlmaWNhdGlvbi1yZWFkJ31cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIDxSb3cgZ3V0dGVyPXsyNH0gY2xhc3NOYW1lPVwibm90aWZpY2F0aW9uLWl0ZW1cIiBzdHlsZT17eyBwYWRkaW5nOiAnMCAzcHggMCAzcHgnIH19IG9uQ2xpY2s9eygpID0+IG9uQ2xpY2tJdGVtKG5vdGlmaWNhdGlvbil9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPENvbCBtZD17M30gc3R5bGU9e3sgcGFkZGluZzogMCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEF2YXRhciBzcmM9e25vdGlmaWNhdGlvbi50aHVtYm5haWwgfHwgJy9uby1pbWFnZS5qcGcnfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8Q29sIG1kPXsxNX0gc3R5bGU9e3sgcGFkZGluZzogMCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub3RpZmljYXRpb24taXRlbS1saXN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZXNzYWdlXCI+e2NhcGl0YWxpemVGaXJzdExldHRlcihub3RpZmljYXRpb24udGl0bGUpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRpbWVcIj48c21hbGw+e21vbWVudChub3RpZmljYXRpb24udXBkYXRlZEF0KS5mcm9tTm93KCl9PC9zbWFsbD48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7LyogPENvbCBtZD17Nn0gY2xhc3NOYW1lPVwibm90aWZpY2F0aW9uLWZvbGxvdy1idXR0b25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbkZvbGxvd0JhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJmb3JtZXI9e251bGx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNIaWRlT25DbGlja1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldElkPXtub3RpZmljYXRpb24uY3JlYXRlZEJ5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZUlkPXtjdXJyZW50VXNlcj8uX2lkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlzRm9sbG93PXtub3RpZmljYXRpb24uaXNGb2xsb3dlZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRQZXJmb3JtZXJMaXN0PXsoKSA9PiB7fX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvQ29sPiAqL31cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17bm90aWZpY2F0aW9uLnJlYWQgPT09IGZhbHNlID8gJ25vdGlmaWNhdGlvbi1kb2N3JyA6ICcnfT57IH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Sb3c+XHJcbiAgICAgICAgICAgICAgICAgIDwvTWVudS5JdGVtPlxyXG4gICAgICAgICAgICAgICAgKSlcclxuICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgPE1lbnUuSXRlbSBrZXk9XCJuby1ub3RpZmljYXRpb25cIj5UaGVyZSBhcmUgbm8gbm90aWZpY2F0aW9ucy48L01lbnUuSXRlbT5cclxuICAgICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICApfVxyXG4gICAgICA8L01lbnUuSXRlbUdyb3VwPlxyXG4gICAgPC9NZW51PlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGU6YW55KSA9PiAoe1xyXG4gIGZldGNoTm90aWZpY2F0aW9uU3VjY2Vzczogc3RhdGUubm90aWZpY2F0aW9uLnN1Y2Nlc3NcclxufSk7XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaCA9IHsgZGVhY3RpdmVDb252ZXJzYXRpb24gfTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaCkoTm90aWZpY2F0aW9uSGVhZGVyTWVudSk7XHJcbiIsImltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlKGRhdGU6IERhdGUsIGZvcm1hdCA9ICdNTU0vREQvWVlZWScpIHtcclxuICByZXR1cm4gbW9tZW50KGRhdGUpLmZvcm1hdChmb3JtYXQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZUZyb21ub3coZGF0ZTogRGF0ZSwgZm9ybWF0ID0gJ01NTS1ERC1ZWVlZJykge1xyXG4gIGlmIChtb21lbnQoKS5kaWZmKG1vbWVudChkYXRlKSwgJ3llYXJzJykgPiAwKSB7IHJldHVybiBtb21lbnQoZGF0ZSkuZm9ybWF0KGZvcm1hdCk7IH1cclxuICByZXR1cm4gbW9tZW50KGRhdGUpLmZyb21Ob3coKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRvYlRvQWdlKGRhdGU6IERhdGUpIHtcclxuICByZXR1cm4gKFxyXG4gICAgbW9tZW50KCkuZGlmZihtb21lbnQoZGF0ZSksICd5ZWFycycpID4gMFxyXG4gICAgJiYgYCR7bW9tZW50KCkuZGlmZihtb21lbnQoZGF0ZSksICd5ZWFycycpfStgXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdExvY2FsZURhdGUoZGF0ZVN0cmluZzogc3RyaW5nKSB7XHJcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHJpbmcpO1xyXG4gIHJldHVybiBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygncHQtQlInLCB7XHJcbiAgICBkYXk6ICcyLWRpZ2l0JywgXHJcbiAgICBtb250aDogJzItZGlnaXQnLCBcclxuICAgIHllYXI6ICdudW1lcmljJ1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZU5ldyhkYXRlKSB7XHJcbiAgY29uc3QgZCA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gIGNvbnN0IG1vbnRoID0gU3RyaW5nKGQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsICcwJyk7IFxyXG4gIGNvbnN0IGRheSA9IFN0cmluZyhkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgJzAnKTsgXHJcbiAgY29uc3QgeWVhciA9IGQuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgcmV0dXJuIGAke21vbnRofS8ke2RheX0vJHt5ZWFyfWA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlVG9NTU1ERFlZWVkoZGF0ZUlucHV0OnN0cmluZykge1xyXG4gIGlmICghZGF0ZUlucHV0KSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRhdGUgaW5wdXQuIFBsZWFzZSBwcm92aWRlIGEgdmFsaWQgRGF0ZSBvYmplY3Qgb3IgYSB2YWxpZCBkYXRlIHN0cmluZy5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0ZUlucHV0KTtcclxuICBpZiAoaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRhdGUgaW5wdXQuIFVuYWJsZSB0byBwYXJzZSB0aGUgZGF0ZS5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBtb250aHMgPSBbXHJcbiAgICBcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLFxyXG4gICAgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIlxyXG4gIF07XHJcblxyXG4gIGNvbnN0IGRheSA9IFN0cmluZyhkYXRlLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gIGNvbnN0IG1vbnRoID0gbW9udGhzW2RhdGUuZ2V0TW9udGgoKV07XHJcbiAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgcmV0dXJuIGAke21vbnRofS8ke2RheX0vJHt5ZWFyfWA7XHJcbn0iLCJleHBvcnQgZnVuY3Rpb24gdmlkZW9EdXJhdGlvbihzKSB7XHJcbiAgaWYgKCFzKSB7XHJcbiAgICByZXR1cm4gJzAwOjAwJztcclxuICB9XHJcbiAgY29uc3Qgc2VjTnVtOiBhbnkgPSBwYXJzZUludChzLCAxMCk7IC8vIGRvbid0IGZvcmdldCB0aGUgc2Vjb25kIHBhcmFtXHJcbiAgbGV0IGhvdXJzOiBhbnkgPSBNYXRoLmZsb29yKHNlY051bSAvIDM2MDApO1xyXG4gIGxldCBtaW51dGVzOiBhbnkgPSBNYXRoLmZsb29yKChzZWNOdW0gLSAoaG91cnMgKiAzNjAwKSkgLyA2MCk7XHJcbiAgbGV0IHNlY29uZHM6IGFueSA9IHNlY051bSAtIChob3VycyAqIDM2MDApIC0gKG1pbnV0ZXMgKiA2MCk7XHJcblxyXG4gIGlmIChob3VycyA8IDEwKSBob3VycyA9IGAwJHtob3Vyc31gO1xyXG4gIGlmIChtaW51dGVzIDwgMTApIG1pbnV0ZXMgPSBgMCR7bWludXRlc31gO1xyXG4gIGlmIChzZWNvbmRzIDwgMTApIHNlY29uZHMgPSBgMCR7c2Vjb25kc31gO1xyXG4gIHJldHVybiBgJHsoaG91cnMgIT09ICcwMCcgPyBgJHtob3Vyc306YCA6ICcnKSArIG1pbnV0ZXN9OiR7c2Vjb25kc31gO1xyXG59XHJcbiIsImV4cG9ydCAqIGZyb20gJy4vaW50ZXJuZXQnO1xyXG5leHBvcnQgKiBmcm9tICcuL3JlZHV4JztcclxuZXhwb3J0ICogZnJvbSAnLi9zdHJpbmcnO1xyXG5leHBvcnQgKiBmcm9tICcuL2RhdGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL21lc3NhZ2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL2R1cmF0aW9uJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbnVtYmVyJztcclxuIiwiaW1wb3J0IHsgbWVzc2FnZSB9IGZyb20gJ2FudGQnO1xyXG5cclxuY29uc3QgSU5URVJORVRfQ0hFQ0tfVVJMID0gJ2h0dHBzOi8vZ29vZ2xlLmNvbSc7XHJcblxyXG5leHBvcnQgY29uc3QgaXNIYXNJbnRlcm5ldENvbm5lY3Rpb24gPSBhc3luYyAoKTogUHJvbWlzZTxib29sZWFuPiA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKElOVEVSTkVUX0NIRUNLX1VSTCwge1xyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgJ0NhY2hlLUNvbnRyb2wnOiAnbm8tY2FjaGUsIG5vLXN0b3JlLCBtdXN0LXJldmFsaWRhdGUnLFxyXG4gICAgICAgIFByYWdtYTogJ25vLWNhY2hlJyxcclxuICAgICAgICBFeHBpcmVzOiAwXHJcbiAgICAgIH0gYXMgYW55XHJcbiAgICB9KTtcclxuICAgIGlmIChcclxuICAgICAgcmVzLnN0YXR1cyA9PT0gNDA0XHJcbiAgICAgIHx8IHJlcy5zdGF0dXMgPT09IDQwMVxyXG4gICAgICB8fCByZXMuc3RhdHVzID09PSA0MDNcclxuICAgICAgfHwgcmVzLnN0YXR1cyA9PT0gNTAwXHJcbiAgICAgIHx8IChyZXMuc3RhdHVzID49IDIwMCAmJiByZXMuc3RhdHVzIDw9IDMwMClcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9IGNhdGNoIChleGNlcHRpb24pIHtcclxuICAgIG1lc3NhZ2UuZXJyb3IoZXhjZXB0aW9uKTtcclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby10ZW1wbGF0ZS1jdXJseS1pbi1zdHJpbmcgKi9cclxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlTWVzc2FnZXMgPSB7XHJcbiAgcmVxdWlyZWQ6ICdUaGlzIGZpZWxkIGlzIHJlcXVpcmVkIScsXHJcbiAgdHlwZXM6IHtcclxuICAgIGVtYWlsOiAnTm90IGEgdmFsaWRhdGUgZW1haWwhJyxcclxuICAgIG51bWJlcjogJ05vdCBhIHZhbGlkYXRlIG51bWJlciEnXHJcbiAgfSxcclxuICBudW1iZXI6IHtcclxuICAgIHJhbmdlOiAnTXVzdCBiZSBiZXR3ZWVuICR7bWlufSBhbmQgJHttYXh9J1xyXG4gIH1cclxufTtcclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHNob3J0ZW5MYXJnZU51bWJlcihudW0pIHtcclxuICBpZiAobnVtID49IDEwMDAwMDAwMDApIHtcclxuICAgIHJldHVybiBgJHsobnVtIC8gMTAwMDAwMDAwMCkudG9GaXhlZCgxKS5yZXBsYWNlKC9cXC4wJC8sICcnKX1CYDtcclxuICB9XHJcbiAgaWYgKG51bSA+PSAxMDAwMDAwKSB7XHJcbiAgICByZXR1cm4gYCR7KG51bSAvIDEwMDAwMDApLnRvRml4ZWQoMSkucmVwbGFjZSgvXFwuMCQvLCAnJyl9TWA7XHJcbiAgfVxyXG4gIGlmIChudW0gPj0gMTAwMCkge1xyXG4gICAgcmV0dXJuIGAkeyhudW0gLyAxMDAwKS50b0ZpeGVkKDEpLnJlcGxhY2UoL1xcLjAkLywgJycpfUtgO1xyXG4gIH1cclxuICByZXR1cm4gbnVtO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=