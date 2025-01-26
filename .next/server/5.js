exports.ids = [5];
exports.modules = {

/***/ "./src/components/comment/comment-form.tsx":
/*!*************************************************!*\
  !*** ./src/components/comment/comment-form.tsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CommentForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _comment_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./comment.less */ "./src/components/comment/comment.less");
/* harmony import */ var _comment_less__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_comment_less__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_ui_shared_AppButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @components/ui/shared/AppButton */ "./src/components/ui/shared/AppButton.tsx");
var _jsxFileName = "C:\\Users\\roman\\Pictures\\Case\\row\\src\\components\\comment\\comment-form.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* eslint-disable react/require-default-props */





class CommentForm extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "formRef", void 0);
    _defineProperty(this, "state", {
      text: ''
    });
  }
  onFinish(values) {
    const {
      onSubmit: handleComment,
      objectId,
      objectType,
      creator
    } = this.props;
    const data = values;
    if (!creator || !creator._id) {
      antd__WEBPACK_IMPORTED_MODULE_1__["message"].error('Please login!');
      return next_router__WEBPACK_IMPORTED_MODULE_2___default.a.push('/');
    }
    if (!data.content) {
      return antd__WEBPACK_IMPORTED_MODULE_1__["message"].error('Please add a comment!');
    }
    if (data.content.length > 150) {
      return antd__WEBPACK_IMPORTED_MODULE_1__["message"].error('Comment is over 150 characters');
    }
    data.objectId = objectId;
    data.objectType = objectType || 'video';
    this.formRef.resetFields(['content']);
    return handleComment(data);
  }
  async onEmojiClick(emoji) {
    const {
      creator
    } = this.props;
    if (!creator || !creator._id) return;
    const {
      text
    } = this.state;
    const instance = this.formRef;
    instance.setFieldsValue({
      content: `${instance.getFieldValue('content')} ${emoji} `
    });
    this.setState({
      text: `${text} ${emoji} `
    });
  }
  render() {
    const {
      creator,
      isReply,
      siteName,
      objectId
    } = this.props;
    return __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Form"], {
      ref: ref => {
        this.formRef = ref;
      },
      name: "comment-form",
      onFinish: this.onFinish.bind(this),
      initialValues: {
        content: ''
      },
      style: {
        width: '100%',
        margin: 'auto'
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 72,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: "flex flex-col items-stretch",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 83,
        columnNumber: 9
      }
    }, __jsx("div", {
      className: "relative pb-4",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 84,
        columnNumber: 11
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, {
      className: "m-0",
      name: "content",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 85,
        columnNumber: 13
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Input"], {
      className: "rounded-full p-2",
      onPressEnter: e => {
        if (e.target.value.length < 2) return;
        this.formRef.submit();
      },
      disabled: !creator || !creator._id,
      maxLength: 150,
      minLength: 2,
      placeholder: !isReply ? 'Add a comment here' : 'Add a reply here',
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 86,
        columnNumber: 15
      }
    }))), __jsx(_components_ui_shared_AppButton__WEBPACK_IMPORTED_MODULE_4__["AppButton"], {
      style: {
        fontSize: '12px'
      },
      className: '',
      type: "submit",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 117,
        columnNumber: 11
      }
    }, !isReply ? 'Post' : 'Reply')));
  }
}

/***/ }),

/***/ "./src/components/comment/comment-item.tsx":
/*!*************************************************!*\
  !*** ./src/components/comment/comment-item.tsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ant-design/icons */ "@ant-design/icons");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @services/index */ "./src/services/index.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_comment_comment_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @components/comment/comment-form */ "./src/components/comment/comment-form.tsx");
/* harmony import */ var _components_comment_list_comments__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @components/comment/list-comments */ "./src/components/comment/list-comments.tsx");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _redux_comment_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @redux/comment/actions */ "./src/redux/comment/actions.ts");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/dynamic */ "next/dynamic");
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_10__);
var _jsxFileName = "C:\\Users\\roman\\Pictures\\Case\\row\\src\\components\\comment\\comment-item.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* eslint-disable react/require-default-props */
/* eslint-disable no-prototype-builtins */











const VerifiedEmailForm = next_dynamic__WEBPACK_IMPORTED_MODULE_10___default()(() => __webpack_require__.e(/*! import() */ 3).then(__webpack_require__.bind(null, /*! @components/performer/verified-email-form */ "./src/components/performer/verified-email-form.tsx")), {
  ssr: false,
  loadableGenerated: {
    webpack: () => [/*require.resolve*/(/*! @components/performer/verified-email-form */ "./src/components/performer/verified-email-form.tsx")],
    modules: ['@components/performer/verified-email-form']
  }
});
class CommentItem extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "state", {
      isLiked: false,
      isOpenComment: false,
      isFirstLoadComment: true,
      openVerifiedEmailModal: false,
      itemPerPage: 12,
      commentPage: 0,
      isReply: false,
      totalReply: 0,
      totalLike: 0
    });
  }
  componentDidMount() {
    const {
      item
    } = this.props;
    if (item) {
      this.setState({
        isLiked: !!item.isLiked,
        totalLike: item.totalLike || 0,
        totalReply: item.totalReply ? item.totalReply : 0
      });
    }
  }
  async handleComment(values) {
    const {
      createComment: handleCreate,
      user
    } = this.props;
    if (!user.verifiedEmail) {
      return this.setState({
        openVerifiedEmailModal: true
      });
    }
    const {
      totalReply
    } = this.state;
    handleCreate(values);
    await this.setState({
      totalReply: totalReply + 1
    });
    this.onOpenComment();
    return true;
  }
  async onOpenComment() {
    const {
      item,
      getComments: handleGetComment
    } = this.props;
    const {
      isOpenComment,
      isFirstLoadComment,
      itemPerPage,
      commentPage
    } = this.state;
    this.setState({
      isOpenComment: !isOpenComment
    });
    if (isFirstLoadComment) {
      await this.setState({
        isFirstLoadComment: false
      });
      handleGetComment({
        objectId: item._id,
        objectType: 'comment',
        limit: itemPerPage,
        offset: commentPage
      });
    }
  }
  async likeComment(comment) {
    const {
      isLiked,
      totalLike
    } = this.state;
    try {
      if (!isLiked) {
        await _services_index__WEBPACK_IMPORTED_MODULE_3__["reactionService"].create({
          objectId: comment._id,
          action: 'like',
          objectType: 'comment'
        });
        this.setState({
          isLiked: true,
          totalLike: totalLike + 1
        });
      }
    } catch (e) {
      const error = await e;
      antd__WEBPACK_IMPORTED_MODULE_1__["message"].error(error.message || 'Error occured, please try again later');
    }
  }
  async unLikeComment(comment) {
    const {
      isLiked,
      totalLike
    } = this.state;
    try {
      if (isLiked) {
        await _services_index__WEBPACK_IMPORTED_MODULE_3__["reactionService"].delete({
          objectId: comment._id,
          action: 'like',
          objectType: 'comment'
        });
        this.setState({
          isLiked: false,
          totalLike: totalLike - 1
        });
      }
    } catch (e) {
      const error = await e;
      antd__WEBPACK_IMPORTED_MODULE_1__["message"].error(error.message || 'Error occured, please try again later');
    }
  }
  async moreComment() {
    const {
      item,
      moreComment: handleLoadMore
    } = this.props;
    const {
      commentPage,
      itemPerPage
    } = this.state;
    await this.setState({
      commentPage: commentPage + 1
    });
    handleLoadMore({
      limit: itemPerPage,
      objectType: 'comment',
      offset: (commentPage + 1) * itemPerPage,
      objectId: item._id
    });
  }
  async deleteComment(item) {
    const {
      deleteComment: handleDelete
    } = this.props;
    if (!window.confirm('Are you sure to remove this comment?')) return;
    handleDelete(item._id);
  }
  render() {
    var _item$creator, _item$creator2, _item$creator3, _item$creator4, _item$creator5, _item$creator6;
    const {
      item,
      user,
      canReply,
      onDelete,
      commentMapping,
      siteName,
      feedOwnerId
    } = this.props;
    const fetchingComment = commentMapping.hasOwnProperty(item._id) ? commentMapping[item._id].requesting : false;
    const comments = commentMapping.hasOwnProperty(item._id) ? commentMapping[item._id].items : [];
    const totalComments = commentMapping.hasOwnProperty(item._id) ? commentMapping[item._id].total : 0;
    const {
      isLiked,
      isOpenComment,
      isReply,
      totalReply,
      totalLike,
      openVerifiedEmailModal
    } = this.state;
    return __jsx("div", {
      className: "pb-4",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 157,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: "cmt-item",
      key: item._id,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 158,
        columnNumber: 9
      }
    }, __jsx("div", {
      className: "flex flex-col items-center justify-center gap-2",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 159,
        columnNumber: 11
      }
    }, __jsx("button", {
      onClick: this.likeComment.bind(this, item),
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 160,
        columnNumber: 13
      }
    }, __jsx("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 161,
        columnNumber: 13
      }
    }, __jsx("mask", {
      id: "mask0_3047_82820",
      maskUnits: "userSpaceOnUse",
      x: "0",
      y: "0",
      width: "20",
      height: "20",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 162,
        columnNumber: 17
      }
    }, __jsx("rect", {
      width: "20",
      height: "20",
      fill: "#D9D9D9",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 163,
        columnNumber: 19
      }
    })), __jsx("g", {
      mask: "url(#mask0_3047_82820)",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 165,
        columnNumber: 17
      }
    }, __jsx("path", {
      d: "M7 17V11.2083H3L10 2L17 11.2083H13V17H7ZM8.5 15.5H11.5V9.70833H13.9375L10 4.4375L6.0625 9.70833H8.5V15.5Z",
      fill: "#121212",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 166,
        columnNumber: 19
      }
    })))), __jsx("span", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 170,
        columnNumber: 13
      }
    }, totalLike), __jsx("button", {
      onClick: this.unLikeComment.bind(this, item),
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 173,
        columnNumber: 13
      }
    }, __jsx("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 174,
        columnNumber: 13
      }
    }, __jsx("g", {
      clipPath: "url(#clip0_3047_82822)",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 175,
        columnNumber: 15
      }
    }, __jsx("mask", {
      id: "mask0_3047_82822",
      maskUnits: "userSpaceOnUse",
      x: "0",
      y: "0",
      width: "20",
      height: "20",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 176,
        columnNumber: 17
      }
    }, __jsx("rect", {
      width: "20",
      height: "20",
      fill: "#D9D9D9",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 177,
        columnNumber: 19
      }
    })), __jsx("g", {
      mask: "url(#mask0_3047_82822)",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 179,
        columnNumber: 17
      }
    }, __jsx("path", {
      d: "M13 3.16211L13 8.95378L17 8.95378L10 18.1621L3 8.95377L7 8.95377L7 3.16211L13 3.16211ZM11.5 4.66211L8.5 4.66211L8.5 10.4538L6.0625 10.4538L10 15.7246L13.9375 10.4538L11.5 10.4538L11.5 4.66211Z",
      fill: "#121212",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 180,
        columnNumber: 19
      }
    }))), __jsx("defs", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 183,
        columnNumber: 15
      }
    }, __jsx("clipPath", {
      id: "clip0_3047_82822",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 184,
        columnNumber: 17
      }
    }, __jsx("rect", {
      width: "20",
      height: "20",
      fill: "white",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 185,
        columnNumber: 19
      }
    })))))), __jsx("img", {
      alt: "creator-avt",
      src: (item === null || item === void 0 ? void 0 : (_item$creator = item.creator) === null || _item$creator === void 0 ? void 0 : _item$creator.avatar) || '/static/no-avatar.png',
      className: "avatar",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 191,
        columnNumber: 11
      }
    }), __jsx("div", {
      className: "cmt-content",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 192,
        columnNumber: 11
      }
    }, __jsx("div", {
      className: "cmt-text",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 193,
        columnNumber: 13
      }
    }, item !== null && item !== void 0 && (_item$creator2 = item.creator) !== null && _item$creator2 !== void 0 && _item$creator2._id ? __jsx(next_link__WEBPACK_IMPORTED_MODULE_9___default.a, {
      href: {
        pathname: '/model/profile',
        query: {
          username: (item === null || item === void 0 ? void 0 : (_item$creator3 = item.creator) === null || _item$creator3 === void 0 ? void 0 : _item$creator3.username) || (item === null || item === void 0 ? void 0 : (_item$creator4 = item.creator) === null || _item$creator4 === void 0 ? void 0 : _item$creator4._id) || 'N/A'
        }
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 195,
        columnNumber: 17
      }
    }, __jsx("a", {
      "aria-hidden": true,
      href: "/model/profile",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 203,
        columnNumber: 19
      }
    }, (item === null || item === void 0 ? void 0 : (_item$creator5 = item.creator) === null || _item$creator5 === void 0 ? void 0 : _item$creator5.name) || (item === null || item === void 0 ? void 0 : (_item$creator6 = item.creator) === null || _item$creator6 === void 0 ? void 0 : _item$creator6.username) || 'N/A')) : __jsx("p", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 207,
        columnNumber: 19
      }
    }, "N/A"), __jsx("div", {
      className: "cmt-user",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 208,
        columnNumber: 15
      }
    }, __jsx("span", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 209,
        columnNumber: 17
      }
    }, __jsx("span", {
      className: "cmt-time",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 210,
        columnNumber: 19
      }
    }, moment__WEBPACK_IMPORTED_MODULE_7___default()(item.createdAt).fromNow())), (user._id === item.createdBy || user._id === feedOwnerId) && __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Dropdown"], {
      overlay: __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Menu"], {
        key: `menu_cmt_${item._id}`,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 215,
          columnNumber: 23
        }
      }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Menu"].Item, {
        key: `delete_cmt_${item._id}`,
        onClick: () => onDelete(item),
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 216,
          columnNumber: 25
        }
      }, __jsx("a", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 217,
          columnNumber: 27
        }
      }, "Report")), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Menu"].Item, {
        key: `delete_cmt_${item._id}`,
        onClick: () => onDelete(item),
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 219,
          columnNumber: 25
        }
      }, __jsx("a", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 220,
          columnNumber: 27
        }
      }, "Delete"))),
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 213,
        columnNumber: 19
      }
    }, __jsx("a", {
      "aria-hidden": true,
      className: "ant-dropdown-link",
      onClick: e => e.preventDefault(),
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 225,
        columnNumber: 21
      }
    }, __jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__["MoreOutlined"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 226,
        columnNumber: 23
      }
    }))))), __jsx("div", {
      className: "cmt-text",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 232,
        columnNumber: 13
      }
    }, item.content), __jsx("div", {
      className: "cmt-action",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 235,
        columnNumber: 13
      }
    }, canReply && __jsx("a", {
      "aria-hidden": true,
      className: !isReply ? 'cmt-reply' : 'cmt-reply active',
      onClick: () => {
        this.setState({
          isReply: !isReply
        }, () => this.onOpenComment());
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 237,
        columnNumber: 17
      }
    }, `${totalReply || ''} Reply`)))), isOpenComment && __jsx("div", {
      className: "reply-bl-list",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 249,
        columnNumber: 11
      }
    }, __jsx("div", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 250,
        columnNumber: 13
      }
    }, __jsx(_components_comment_list_comments__WEBPACK_IMPORTED_MODULE_6__["default"], {
      key: `list_comments_${item._id}_${comments.length}`,
      requesting: fetchingComment,
      comments: comments,
      onDelete: this.deleteComment.bind(this),
      user: user,
      canReply: false,
      isReply: isReply,
      feedOwnerId: feedOwnerId,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 251,
        columnNumber: 15
      }
    }), comments.length < totalComments && __jsx("p", {
      className: "text-center",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 262,
        columnNumber: 17
      }
    }, __jsx("a", {
      "aria-hidden": true,
      onClick: this.moreComment.bind(this),
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 263,
        columnNumber: 19
      }
    }, "more...")))), isReply ? __jsx(_components_comment_comment_form__WEBPACK_IMPORTED_MODULE_5__["default"], {
      creator: user,
      onSubmit: this.handleComment.bind(this),
      objectId: item._id,
      objectType: "comment",
      isReply: true,
      siteName: siteName,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 272,
        columnNumber: 13
      }
    }) : null, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
      key: "verified_email",
      className: "subscription-modal",
      title: "Please verify your email address",
      visible: openVerifiedEmailModal,
      footer: null,
      destroyOnClose: true,
      onCancel: () => this.setState({
        openVerifiedEmailModal: false
      }),
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 281,
        columnNumber: 9
      }
    }, __jsx(VerifiedEmailForm, {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 290,
        columnNumber: 11
      }
    })));
  }
}
const mapStates = state => {
  const {
    commentMapping,
    comment
  } = state.comment;
  return {
    commentMapping,
    comment,
    siteName: state.ui.siteName
  };
};
const mapDispatch = {
  getComments: _redux_comment_actions__WEBPACK_IMPORTED_MODULE_8__["getComments"],
  moreComment: _redux_comment_actions__WEBPACK_IMPORTED_MODULE_8__["moreComment"],
  createComment: _redux_comment_actions__WEBPACK_IMPORTED_MODULE_8__["createComment"],
  deleteComment: _redux_comment_actions__WEBPACK_IMPORTED_MODULE_8__["deleteComment"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStates, mapDispatch)(CommentItem));

/***/ }),

/***/ "./src/components/comment/comment.less":
/*!*********************************************!*\
  !*** ./src/components/comment/comment.less ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/components/comment/list-comments.tsx":
/*!**************************************************!*\
  !*** ./src/components/comment/list-comments.tsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ListComments; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_comment_comment_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/comment/comment-item */ "./src/components/comment/comment-item.tsx");
/* harmony import */ var react_infinite_scroll_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-infinite-scroll-component */ "react-infinite-scroll-component");
/* harmony import */ var react_infinite_scroll_component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_infinite_scroll_component__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "C:\\Users\\roman\\Pictures\\Case\\row\\src\\components\\comment\\list-comments.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
/* eslint-disable react/require-default-props */




class ListComments extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  render() {
    const {
      comments,
      requesting,
      user,
      onDelete,
      canReply,
      canLoadmore,
      loadMore,
      isReply,
      feedOwnerId
    } = this.props;
    return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, !requesting && !comments.length ? __jsx("div", {
      className: "text-center",
      style: {
        padding: '5px'
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28,
        columnNumber: 46
      }
    }) : __jsx("div", {
      id: "scrollableModal",
      className: isReply ? 'cmt-list' : 'cmt-list reply',
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 13
      }
    }, __jsx(react_infinite_scroll_component__WEBPACK_IMPORTED_MODULE_3___default.a, {
      dataLength: comments.length,
      hasMore: canLoadmore,
      loader: null,
      next: loadMore,
      endMessage: null,
      scrollThreshold: 0.7,
      scrollableTarget: "scrollableModal",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 31,
        columnNumber: 15
      }
    }, comments.map(comment => __jsx(_components_comment_comment_item__WEBPACK_IMPORTED_MODULE_2__["default"], {
      feedOwnerId: feedOwnerId,
      canReply: canReply,
      key: comment._id,
      item: comment,
      user: user,
      onDelete: onDelete,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 54
      }
    })), requesting && __jsx("div", {
      className: "text-center",
      style: {
        margin: 20
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41,
        columnNumber: 32
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Spin"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41,
        columnNumber: 84
      }
    })))));
  }
}

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jb21tZW50L2NvbW1lbnQtZm9ybS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY29tbWVudC9jb21tZW50LWl0ZW0udHN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQvbGlzdC1jb21tZW50cy50c3giXSwibmFtZXMiOlsiQ29tbWVudEZvcm0iLCJQdXJlQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJhcmdzIiwiX2RlZmluZVByb3BlcnR5IiwidGV4dCIsIm9uRmluaXNoIiwidmFsdWVzIiwib25TdWJtaXQiLCJoYW5kbGVDb21tZW50Iiwib2JqZWN0SWQiLCJvYmplY3RUeXBlIiwiY3JlYXRvciIsInByb3BzIiwiZGF0YSIsIl9pZCIsIm1lc3NhZ2UiLCJlcnJvciIsIlJvdXRlciIsInB1c2giLCJjb250ZW50IiwibGVuZ3RoIiwiZm9ybVJlZiIsInJlc2V0RmllbGRzIiwib25FbW9qaUNsaWNrIiwiZW1vamkiLCJzdGF0ZSIsImluc3RhbmNlIiwic2V0RmllbGRzVmFsdWUiLCJnZXRGaWVsZFZhbHVlIiwic2V0U3RhdGUiLCJyZW5kZXIiLCJpc1JlcGx5Iiwic2l0ZU5hbWUiLCJfX2pzeCIsIkZvcm0iLCJyZWYiLCJuYW1lIiwiYmluZCIsImluaXRpYWxWYWx1ZXMiLCJzdHlsZSIsIndpZHRoIiwibWFyZ2luIiwiX19zZWxmIiwiX19zb3VyY2UiLCJmaWxlTmFtZSIsIl9qc3hGaWxlTmFtZSIsImxpbmVOdW1iZXIiLCJjb2x1bW5OdW1iZXIiLCJjbGFzc05hbWUiLCJJdGVtIiwiSW5wdXQiLCJvblByZXNzRW50ZXIiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJzdWJtaXQiLCJkaXNhYmxlZCIsIm1heExlbmd0aCIsIm1pbkxlbmd0aCIsInBsYWNlaG9sZGVyIiwiQXBwQnV0dG9uIiwiZm9udFNpemUiLCJ0eXBlIiwiVmVyaWZpZWRFbWFpbEZvcm0iLCJkeW5hbWljIiwic3NyIiwibG9hZGFibGVHZW5lcmF0ZWQiLCJ3ZWJwYWNrIiwicmVxdWlyZSIsIm1vZHVsZXMiLCJDb21tZW50SXRlbSIsImlzTGlrZWQiLCJpc09wZW5Db21tZW50IiwiaXNGaXJzdExvYWRDb21tZW50Iiwib3BlblZlcmlmaWVkRW1haWxNb2RhbCIsIml0ZW1QZXJQYWdlIiwiY29tbWVudFBhZ2UiLCJ0b3RhbFJlcGx5IiwidG90YWxMaWtlIiwiY29tcG9uZW50RGlkTW91bnQiLCJpdGVtIiwiY3JlYXRlQ29tbWVudCIsImhhbmRsZUNyZWF0ZSIsInVzZXIiLCJ2ZXJpZmllZEVtYWlsIiwib25PcGVuQ29tbWVudCIsImdldENvbW1lbnRzIiwiaGFuZGxlR2V0Q29tbWVudCIsImxpbWl0Iiwib2Zmc2V0IiwibGlrZUNvbW1lbnQiLCJjb21tZW50IiwicmVhY3Rpb25TZXJ2aWNlIiwiY3JlYXRlIiwiYWN0aW9uIiwidW5MaWtlQ29tbWVudCIsImRlbGV0ZSIsIm1vcmVDb21tZW50IiwiaGFuZGxlTG9hZE1vcmUiLCJkZWxldGVDb21tZW50IiwiaGFuZGxlRGVsZXRlIiwid2luZG93IiwiY29uZmlybSIsIl9pdGVtJGNyZWF0b3IiLCJfaXRlbSRjcmVhdG9yMiIsIl9pdGVtJGNyZWF0b3IzIiwiX2l0ZW0kY3JlYXRvcjQiLCJfaXRlbSRjcmVhdG9yNSIsIl9pdGVtJGNyZWF0b3I2IiwiY2FuUmVwbHkiLCJvbkRlbGV0ZSIsImNvbW1lbnRNYXBwaW5nIiwiZmVlZE93bmVySWQiLCJmZXRjaGluZ0NvbW1lbnQiLCJoYXNPd25Qcm9wZXJ0eSIsInJlcXVlc3RpbmciLCJjb21tZW50cyIsIml0ZW1zIiwidG90YWxDb21tZW50cyIsInRvdGFsIiwia2V5Iiwib25DbGljayIsInhtbG5zIiwiaGVpZ2h0Iiwidmlld0JveCIsImZpbGwiLCJpZCIsIm1hc2tVbml0cyIsIngiLCJ5IiwibWFzayIsImQiLCJjbGlwUGF0aCIsImFsdCIsInNyYyIsImF2YXRhciIsIkxpbmsiLCJocmVmIiwicGF0aG5hbWUiLCJxdWVyeSIsInVzZXJuYW1lIiwibW9tZW50IiwiY3JlYXRlZEF0IiwiZnJvbU5vdyIsImNyZWF0ZWRCeSIsIkRyb3Bkb3duIiwib3ZlcmxheSIsIk1lbnUiLCJwcmV2ZW50RGVmYXVsdCIsIk1vcmVPdXRsaW5lZCIsIkxpc3RDb21tZW50cyIsIk1vZGFsIiwidGl0bGUiLCJ2aXNpYmxlIiwiZm9vdGVyIiwiZGVzdHJveU9uQ2xvc2UiLCJvbkNhbmNlbCIsIm1hcFN0YXRlcyIsInVpIiwibWFwRGlzcGF0Y2giLCJjb25uZWN0IiwiY2FuTG9hZG1vcmUiLCJsb2FkTW9yZSIsIlJlYWN0IiwiRnJhZ21lbnQiLCJwYWRkaW5nIiwiSW5maW5pdGVTY3JvbGwiLCJkYXRhTGVuZ3RoIiwiaGFzTW9yZSIsImxvYWRlciIsIm5leHQiLCJlbmRNZXNzYWdlIiwic2Nyb2xsVGhyZXNob2xkIiwic2Nyb2xsYWJsZVRhcmdldCIsIm1hcCIsIlNwaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNzQztBQUd4QjtBQU1tQjtBQUNUO0FBQ29DO0FBVzdDLE1BQU1BLFdBQVcsU0FBU0MsbURBQWEsQ0FBUztFQUFBQyxZQUFBLEdBQUFDLElBQUE7SUFBQSxTQUFBQSxJQUFBO0lBQUFDLGVBQUE7SUFBQUEsZUFBQSxnQkFHckQ7TUFDTkMsSUFBSSxFQUFFO0lBQ1IsQ0FBQztFQUFBO0VBRURDLFFBQVFBLENBQUNDLE1BQXNCLEVBQUU7SUFDL0IsTUFBTTtNQUNKQyxRQUFRLEVBQUVDLGFBQWE7TUFDdkJDLFFBQVE7TUFDUkMsVUFBVTtNQUNWQztJQUNGLENBQUMsR0FBRyxJQUFJLENBQUNDLEtBQUs7SUFDZCxNQUFNQyxJQUFJLEdBQUdQLE1BQU07SUFFbkIsSUFBSSxDQUFDSyxPQUFPLElBQUksQ0FBQ0EsT0FBTyxDQUFDRyxHQUFHLEVBQUU7TUFDNUJDLDRDQUFPLENBQUNDLEtBQUssQ0FBQyxlQUFlLENBQUM7TUFDOUIsT0FBT0Msa0RBQU0sQ0FBQ0MsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUN6QjtJQUNBLElBQUksQ0FBQ0wsSUFBSSxDQUFDTSxPQUFPLEVBQUU7TUFDakIsT0FBT0osNENBQU8sQ0FBQ0MsS0FBSyxDQUFDLHVCQUF1QixDQUFDO0lBQy9DO0lBQ0EsSUFBSUgsSUFBSSxDQUFDTSxPQUFPLENBQUNDLE1BQU0sR0FBRyxHQUFHLEVBQUU7TUFDN0IsT0FBT0wsNENBQU8sQ0FBQ0MsS0FBSyxDQUFDLGdDQUFnQyxDQUFDO0lBQ3hEO0lBQ0FILElBQUksQ0FBQ0osUUFBUSxHQUFHQSxRQUFRO0lBQ3hCSSxJQUFJLENBQUNILFVBQVUsR0FBR0EsVUFBVSxJQUFJLE9BQU87SUFDdkMsSUFBSSxDQUFDVyxPQUFPLENBQUNDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JDLE9BQU9kLGFBQWEsQ0FBQ0ssSUFBSSxDQUFDO0VBQzVCO0VBRUEsTUFBTVUsWUFBWUEsQ0FBQ0MsS0FBSyxFQUFFO0lBQ3hCLE1BQU07TUFBRWI7SUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDQyxLQUFLO0lBQzlCLElBQUksQ0FBQ0QsT0FBTyxJQUFJLENBQUNBLE9BQU8sQ0FBQ0csR0FBRyxFQUFFO0lBQzlCLE1BQU07TUFBRVY7SUFBSyxDQUFDLEdBQUcsSUFBSSxDQUFDcUIsS0FBSztJQUMzQixNQUFNQyxRQUFRLEdBQUcsSUFBSSxDQUFDTCxPQUF1QjtJQUM3Q0ssUUFBUSxDQUFDQyxjQUFjLENBQUM7TUFDdEJSLE9BQU8sRUFBRSxHQUFHTyxRQUFRLENBQUNFLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSUosS0FBSztJQUN4RCxDQUFDLENBQUM7SUFDRixJQUFJLENBQUNLLFFBQVEsQ0FBQztNQUFFekIsSUFBSSxFQUFFLEdBQUdBLElBQUksSUFBSW9CLEtBQUs7SUFBSSxDQUFDLENBQUM7RUFDOUM7RUFFQU0sTUFBTUEsQ0FBQSxFQUFHO0lBQ1AsTUFBTTtNQUNKbkIsT0FBTztNQUFFb0IsT0FBTztNQUFFQyxRQUFRO01BQUV2QjtJQUM5QixDQUFDLEdBQUcsSUFBSSxDQUFDRyxLQUFLO0lBQ2QsT0FDRXFCLEtBQUEsQ0FBQ0MseUNBQUk7TUFDSEMsR0FBRyxFQUFHQSxHQUFHLElBQUs7UUFDWixJQUFJLENBQUNkLE9BQU8sR0FBR2MsR0FBRztNQUNwQixDQUFFO01BQ0ZDLElBQUksRUFBQyxjQUFjO01BQ25CL0IsUUFBUSxFQUFFLElBQUksQ0FBQ0EsUUFBUSxDQUFDZ0MsSUFBSSxDQUFDLElBQUksQ0FBRTtNQUNuQ0MsYUFBYSxFQUFFO1FBQ2JuQixPQUFPLEVBQUU7TUFDWCxDQUFFO01BQ0ZvQixLQUFLLEVBQUU7UUFBRUMsS0FBSyxFQUFFLE1BQU07UUFBRUMsTUFBTSxFQUFFO01BQU0sQ0FBRTtNQUFBQyxNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsR0FFeENkLEtBQUE7TUFBS2UsU0FBUyxFQUFDLDZCQUE2QjtNQUFBTixNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsR0FDMUNkLEtBQUE7TUFBS2UsU0FBUyxFQUFDLGVBQWU7TUFBQU4sTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLEdBQzVCZCxLQUFBLENBQUNDLHlDQUFJLENBQUNlLElBQUk7TUFBQ0QsU0FBUyxFQUFDLEtBQUs7TUFBQ1osSUFBSSxFQUFDLFNBQVM7TUFBQU0sTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLEdBQ3ZDZCxLQUFBLENBQUNpQiwwQ0FBSztNQUNORixTQUFTLEVBQUMsa0JBQWtCO01BQzFCRyxZQUFZLEVBQUdDLENBQU0sSUFBSztRQUN4QixJQUFJQSxDQUFDLENBQUNDLE1BQU0sQ0FBQ0MsS0FBSyxDQUFDbEMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUMvQixJQUFJLENBQUNDLE9BQU8sQ0FBQ2tDLE1BQU0sQ0FBQyxDQUFDO01BQ3ZCLENBQUU7TUFDRkMsUUFBUSxFQUFFLENBQUM3QyxPQUFPLElBQUksQ0FBQ0EsT0FBTyxDQUFDRyxHQUFJO01BQ25DMkMsU0FBUyxFQUFFLEdBQUk7TUFDZkMsU0FBUyxFQUFFLENBQUU7TUFDYkMsV0FBVyxFQUNULENBQUM1QixPQUFPLEdBQUcsb0JBQW9CLEdBQUcsa0JBQ25DO01BQUFXLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxDQUNGLENBQ1EsQ0FpQlIsQ0FBQyxFQUNOZCxLQUFBLENBQUMyQix5RUFBUztNQUNSckIsS0FBSyxFQUFFO1FBQUVzQixRQUFRLEVBQUU7TUFBTyxDQUFFO01BQzVCYixTQUFTLEVBQUUsRUFBRztNQUNkYyxJQUFJLEVBQUMsUUFBUTtNQUFBcEIsTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLEdBR1osQ0FBQ2hCLE9BQU8sR0FBRyxNQUFNLEdBQUcsT0FDWixDQUNSLENBQ0QsQ0FBQztFQUVYO0FBQ0YsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hJQTtBQUNBO0FBQ3NDO0FBR3hCO0FBR2E7QUFDdUI7QUFDWjtBQUNxQjtBQUNFO0FBQ2pDO0FBSUk7QUFFSDtBQUNNO0FBRW5DLE1BQU1nQyxpQkFBaUIsR0FBR0Msb0RBQU8sQ0FBQyxNQUFNLG9MQUFtRCxFQUFFO0VBQUVDLEdBQUcsRUFBRSxLQUFLO0VBQUFDLGlCQUFBO0lBQUFDLE9BQUEsRUFBQUEsQ0FBQSxNQUFBQyxtQkFBQSxDQUExRCxxR0FBMkM7SUFBQUMsT0FBQSxHQUEzQywyQ0FBMkM7RUFBQTtBQUFnQixDQUFDLENBQUM7QUFnQjVHLE1BQU1DLFdBQVcsU0FBU3RFLG1EQUFhLENBQVM7RUFBQUMsWUFBQSxHQUFBQyxJQUFBO0lBQUEsU0FBQUEsSUFBQTtJQUFBQyxlQUFBLGdCQUN0QztNQUNOb0UsT0FBTyxFQUFFLEtBQUs7TUFDZEMsYUFBYSxFQUFFLEtBQUs7TUFDcEJDLGtCQUFrQixFQUFFLElBQUk7TUFDeEJDLHNCQUFzQixFQUFFLEtBQUs7TUFDN0JDLFdBQVcsRUFBRSxFQUFFO01BQ2ZDLFdBQVcsRUFBRSxDQUFDO01BQ2Q3QyxPQUFPLEVBQUUsS0FBSztNQUNkOEMsVUFBVSxFQUFFLENBQUM7TUFDYkMsU0FBUyxFQUFFO0lBQ2IsQ0FBQztFQUFBO0VBRURDLGlCQUFpQkEsQ0FBQSxFQUFHO0lBQ2xCLE1BQU07TUFBRUM7SUFBSyxDQUFDLEdBQUcsSUFBSSxDQUFDcEUsS0FBSztJQUMzQixJQUFJb0UsSUFBSSxFQUFFO01BQ1IsSUFBSSxDQUFDbkQsUUFBUSxDQUFDO1FBQ1owQyxPQUFPLEVBQUUsQ0FBQyxDQUFDUyxJQUFJLENBQUNULE9BQU87UUFDdkJPLFNBQVMsRUFBRUUsSUFBSSxDQUFDRixTQUFTLElBQUksQ0FBQztRQUM5QkQsVUFBVSxFQUFFRyxJQUFJLENBQUNILFVBQVUsR0FBR0csSUFBSSxDQUFDSCxVQUFVLEdBQUc7TUFDbEQsQ0FBQyxDQUFDO0lBQ0o7RUFDRjtFQUVBLE1BQU1yRSxhQUFhQSxDQUFDRixNQUFNLEVBQUU7SUFDMUIsTUFBTTtNQUFFMkUsYUFBYSxFQUFFQyxZQUFZO01BQUVDO0lBQUssQ0FBQyxHQUFHLElBQUksQ0FBQ3ZFLEtBQUs7SUFDeEQsSUFBSSxDQUFDdUUsSUFBSSxDQUFDQyxhQUFhLEVBQUU7TUFDdkIsT0FBTyxJQUFJLENBQUN2RCxRQUFRLENBQUM7UUFBRTZDLHNCQUFzQixFQUFFO01BQUssQ0FBQyxDQUFDO0lBQ3hEO0lBQ0EsTUFBTTtNQUFFRztJQUFXLENBQUMsR0FBRyxJQUFJLENBQUNwRCxLQUFLO0lBQ2pDeUQsWUFBWSxDQUFDNUUsTUFBTSxDQUFDO0lBQ3BCLE1BQU0sSUFBSSxDQUFDdUIsUUFBUSxDQUFDO01BQUVnRCxVQUFVLEVBQUVBLFVBQVUsR0FBRztJQUFFLENBQUMsQ0FBQztJQUNuRCxJQUFJLENBQUNRLGFBQWEsQ0FBQyxDQUFDO0lBQ3BCLE9BQU8sSUFBSTtFQUNiO0VBRUEsTUFBTUEsYUFBYUEsQ0FBQSxFQUFHO0lBQ3BCLE1BQU07TUFBRUwsSUFBSTtNQUFFTSxXQUFXLEVBQUVDO0lBQWlCLENBQUMsR0FBRyxJQUFJLENBQUMzRSxLQUFLO0lBQzFELE1BQU07TUFDSjRELGFBQWE7TUFBRUMsa0JBQWtCO01BQUVFLFdBQVc7TUFBRUM7SUFDbEQsQ0FBQyxHQUFHLElBQUksQ0FBQ25ELEtBQUs7SUFDZCxJQUFJLENBQUNJLFFBQVEsQ0FBQztNQUFFMkMsYUFBYSxFQUFFLENBQUNBO0lBQWMsQ0FBQyxDQUFDO0lBQ2hELElBQUlDLGtCQUFrQixFQUFFO01BQ3RCLE1BQU0sSUFBSSxDQUFDNUMsUUFBUSxDQUFDO1FBQUU0QyxrQkFBa0IsRUFBRTtNQUFNLENBQUMsQ0FBQztNQUNsRGMsZ0JBQWdCLENBQUM7UUFDZjlFLFFBQVEsRUFBRXVFLElBQUksQ0FBQ2xFLEdBQUc7UUFDbEJKLFVBQVUsRUFBRSxTQUFTO1FBQ3JCOEUsS0FBSyxFQUFFYixXQUFXO1FBQ2xCYyxNQUFNLEVBQUViO01BQ1YsQ0FBQyxDQUFDO0lBQ0o7RUFDRjtFQUVBLE1BQU1jLFdBQVdBLENBQUNDLE9BQU8sRUFBRTtJQUN6QixNQUFNO01BQUVwQixPQUFPO01BQUVPO0lBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQ3JELEtBQUs7SUFDekMsSUFBSTtNQUNGLElBQUksQ0FBQzhDLE9BQU8sRUFBRTtRQUNaLE1BQU1xQiwrREFBZSxDQUFDQyxNQUFNLENBQUM7VUFDM0JwRixRQUFRLEVBQUVrRixPQUFPLENBQUM3RSxHQUFHO1VBQ3JCZ0YsTUFBTSxFQUFFLE1BQU07VUFDZHBGLFVBQVUsRUFBRTtRQUNkLENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQ21CLFFBQVEsQ0FBQztVQUFFMEMsT0FBTyxFQUFFLElBQUk7VUFBRU8sU0FBUyxFQUFFQSxTQUFTLEdBQUc7UUFBRSxDQUFDLENBQUM7TUFDNUQ7SUFDRixDQUFDLENBQUMsT0FBTzFCLENBQUMsRUFBRTtNQUNWLE1BQU1wQyxLQUFLLEdBQUcsTUFBTW9DLENBQUM7TUFDckJyQyw0Q0FBTyxDQUFDQyxLQUFLLENBQUNBLEtBQUssQ0FBQ0QsT0FBTyxJQUFJLHVDQUF1QyxDQUFDO0lBQ3pFO0VBQ0Y7RUFFQSxNQUFNZ0YsYUFBYUEsQ0FBQ0osT0FBTyxFQUFFO0lBQzNCLE1BQU07TUFBRXBCLE9BQU87TUFBRU87SUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDckQsS0FBSztJQUN6QyxJQUFJO01BQ0YsSUFBSThDLE9BQU8sRUFBRTtRQUNYLE1BQU1xQiwrREFBZSxDQUFDSSxNQUFNLENBQUM7VUFDM0J2RixRQUFRLEVBQUVrRixPQUFPLENBQUM3RSxHQUFHO1VBQ3JCZ0YsTUFBTSxFQUFFLE1BQU07VUFDZHBGLFVBQVUsRUFBRTtRQUNkLENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQ21CLFFBQVEsQ0FBQztVQUFFMEMsT0FBTyxFQUFFLEtBQUs7VUFBRU8sU0FBUyxFQUFFQSxTQUFTLEdBQUc7UUFBRSxDQUFDLENBQUM7TUFDN0Q7SUFDRixDQUFDLENBQUMsT0FBTzFCLENBQUMsRUFBRTtNQUNWLE1BQU1wQyxLQUFLLEdBQUcsTUFBTW9DLENBQUM7TUFDckJyQyw0Q0FBTyxDQUFDQyxLQUFLLENBQUNBLEtBQUssQ0FBQ0QsT0FBTyxJQUFJLHVDQUF1QyxDQUFDO0lBQ3pFO0VBQ0Y7RUFFQSxNQUFNa0YsV0FBV0EsQ0FBQSxFQUFHO0lBQ2xCLE1BQU07TUFBRWpCLElBQUk7TUFBRWlCLFdBQVcsRUFBRUM7SUFBZSxDQUFDLEdBQUcsSUFBSSxDQUFDdEYsS0FBSztJQUN4RCxNQUFNO01BQUVnRSxXQUFXO01BQUVEO0lBQVksQ0FBQyxHQUFHLElBQUksQ0FBQ2xELEtBQUs7SUFDL0MsTUFBTSxJQUFJLENBQUNJLFFBQVEsQ0FBQztNQUNsQitDLFdBQVcsRUFBRUEsV0FBVyxHQUFHO0lBQzdCLENBQUMsQ0FBQztJQUNGc0IsY0FBYyxDQUFDO01BQ2JWLEtBQUssRUFBRWIsV0FBVztNQUNsQmpFLFVBQVUsRUFBRSxTQUFTO01BQ3JCK0UsTUFBTSxFQUFFLENBQUNiLFdBQVcsR0FBRyxDQUFDLElBQUlELFdBQVc7TUFDdkNsRSxRQUFRLEVBQUV1RSxJQUFJLENBQUNsRTtJQUNqQixDQUFDLENBQUM7RUFDSjtFQUVBLE1BQU1xRixhQUFhQSxDQUFDbkIsSUFBSSxFQUFFO0lBQ3hCLE1BQU07TUFBRW1CLGFBQWEsRUFBRUM7SUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDeEYsS0FBSztJQUNsRCxJQUFJLENBQUN5RixNQUFNLENBQUNDLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxFQUFFO0lBQzdERixZQUFZLENBQUNwQixJQUFJLENBQUNsRSxHQUFHLENBQUM7RUFDeEI7RUFFQWdCLE1BQU1BLENBQUEsRUFBRztJQUFBLElBQUF5RSxhQUFBLEVBQUFDLGNBQUEsRUFBQUMsY0FBQSxFQUFBQyxjQUFBLEVBQUFDLGNBQUEsRUFBQUMsY0FBQTtJQUNQLE1BQU07TUFDSjVCLElBQUk7TUFBRUcsSUFBSTtNQUFFMEIsUUFBUTtNQUFFQyxRQUFRO01BQUVDLGNBQWM7TUFBRS9FLFFBQVE7TUFBRWdGO0lBQzVELENBQUMsR0FBRyxJQUFJLENBQUNwRyxLQUFLO0lBQ2QsTUFBTXFHLGVBQWUsR0FBR0YsY0FBYyxDQUFDRyxjQUFjLENBQUNsQyxJQUFJLENBQUNsRSxHQUFHLENBQUMsR0FBR2lHLGNBQWMsQ0FBQy9CLElBQUksQ0FBQ2xFLEdBQUcsQ0FBQyxDQUFDcUcsVUFBVSxHQUFHLEtBQUs7SUFDN0csTUFBTUMsUUFBUSxHQUFHTCxjQUFjLENBQUNHLGNBQWMsQ0FBQ2xDLElBQUksQ0FBQ2xFLEdBQUcsQ0FBQyxHQUFHaUcsY0FBYyxDQUFDL0IsSUFBSSxDQUFDbEUsR0FBRyxDQUFDLENBQUN1RyxLQUFLLEdBQUcsRUFBRTtJQUM5RixNQUFNQyxhQUFhLEdBQUdQLGNBQWMsQ0FBQ0csY0FBYyxDQUFDbEMsSUFBSSxDQUFDbEUsR0FBRyxDQUFDLEdBQUdpRyxjQUFjLENBQUMvQixJQUFJLENBQUNsRSxHQUFHLENBQUMsQ0FBQ3lHLEtBQUssR0FBRyxDQUFDO0lBQ2xHLE1BQU07TUFDSmhELE9BQU87TUFBRUMsYUFBYTtNQUFFekMsT0FBTztNQUFFOEMsVUFBVTtNQUFFQyxTQUFTO01BQUVKO0lBQzFELENBQUMsR0FBRyxJQUFJLENBQUNqRCxLQUFLO0lBQ2QsT0FDRVEsS0FBQTtNQUFLZSxTQUFTLEVBQUMsTUFBTTtNQUFBTixNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsR0FDbkJkLEtBQUE7TUFBS2UsU0FBUyxFQUFDLFVBQVU7TUFBQ3dFLEdBQUcsRUFBRXhDLElBQUksQ0FBQ2xFLEdBQUk7TUFBQTRCLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxHQUN0Q2QsS0FBQTtNQUFLZSxTQUFTLEVBQUMsaURBQWlEO01BQUFOLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxHQUM5RGQsS0FBQTtNQUFRd0YsT0FBTyxFQUFFLElBQUksQ0FBQy9CLFdBQVcsQ0FBQ3JELElBQUksQ0FBQyxJQUFJLEVBQUUyQyxJQUFJLENBQUU7TUFBQXRDLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxHQUNuRGQsS0FBQTtNQUFLeUYsS0FBSyxFQUFDLDRCQUE0QjtNQUFDbEYsS0FBSyxFQUFDLElBQUk7TUFBQ21GLE1BQU0sRUFBQyxJQUFJO01BQUNDLE9BQU8sRUFBQyxXQUFXO01BQUNDLElBQUksRUFBQyxNQUFNO01BQUFuRixNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsR0FDMUZkLEtBQUE7TUFBTTZGLEVBQUUsRUFBQyxrQkFBa0I7TUFBR0MsU0FBUyxFQUFDLGdCQUFnQjtNQUFDQyxDQUFDLEVBQUMsR0FBRztNQUFDQyxDQUFDLEVBQUMsR0FBRztNQUFDekYsS0FBSyxFQUFDLElBQUk7TUFBQ21GLE1BQU0sRUFBQyxJQUFJO01BQUFqRixNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsR0FDekZkLEtBQUE7TUFBTU8sS0FBSyxFQUFDLElBQUk7TUFBQ21GLE1BQU0sRUFBQyxJQUFJO01BQUNFLElBQUksRUFBQyxTQUFTO01BQUFuRixNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsQ0FBQyxDQUN4QyxDQUFDLEVBQ1BkLEtBQUE7TUFBR2lHLElBQUksRUFBQyx3QkFBd0I7TUFBQXhGLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxHQUM5QmQsS0FBQTtNQUFNa0csQ0FBQyxFQUFDLDJHQUEyRztNQUFDTixJQUFJLEVBQUMsU0FBUztNQUFBbkYsTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLENBQUMsQ0FDbEksQ0FDRixDQUNHLENBQUMsRUFDVGQsS0FBQTtNQUFBUyxNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsR0FDRytCLFNBQ0csQ0FBQyxFQUNQN0MsS0FBQTtNQUFRd0YsT0FBTyxFQUFFLElBQUksQ0FBQzFCLGFBQWEsQ0FBQzFELElBQUksQ0FBQyxJQUFJLEVBQUUyQyxJQUFJLENBQUU7TUFBQXRDLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxHQUNyRGQsS0FBQTtNQUFLeUYsS0FBSyxFQUFDLDRCQUE0QjtNQUFDbEYsS0FBSyxFQUFDLElBQUk7TUFBQ21GLE1BQU0sRUFBQyxJQUFJO01BQUNDLE9BQU8sRUFBQyxXQUFXO01BQUNDLElBQUksRUFBQyxNQUFNO01BQUFuRixNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsR0FDNUZkLEtBQUE7TUFBR21HLFFBQVEsRUFBQyx3QkFBd0I7TUFBQTFGLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxHQUNsQ2QsS0FBQTtNQUFNNkYsRUFBRSxFQUFDLGtCQUFrQjtNQUFDQyxTQUFTLEVBQUMsZ0JBQWdCO01BQUNDLENBQUMsRUFBQyxHQUFHO01BQUNDLENBQUMsRUFBQyxHQUFHO01BQUN6RixLQUFLLEVBQUMsSUFBSTtNQUFDbUYsTUFBTSxFQUFDLElBQUk7TUFBQWpGLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxHQUN2RmQsS0FBQTtNQUFNTyxLQUFLLEVBQUMsSUFBSTtNQUFDbUYsTUFBTSxFQUFDLElBQUk7TUFBQ0UsSUFBSSxFQUFDLFNBQVM7TUFBQW5GLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxDQUFDLENBQ3hDLENBQUMsRUFDUGQsS0FBQTtNQUFHaUcsSUFBSSxFQUFDLHdCQUF3QjtNQUFBeEYsTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLEdBQzlCZCxLQUFBO01BQU1rRyxDQUFDLEVBQUMsa01BQWtNO01BQUNOLElBQUksRUFBQyxTQUFTO01BQUFuRixNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsQ0FBQyxDQUN6TixDQUNGLENBQUMsRUFDSmQsS0FBQTtNQUFBUyxNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsR0FDRWQsS0FBQTtNQUFVNkYsRUFBRSxFQUFDLGtCQUFrQjtNQUFBcEYsTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLEdBQzdCZCxLQUFBO01BQU1PLEtBQUssRUFBQyxJQUFJO01BQUNtRixNQUFNLEVBQUMsSUFBSTtNQUFDRSxJQUFJLEVBQUMsT0FBTztNQUFBbkYsTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLENBQUMsQ0FDbEMsQ0FDTixDQUNILENBQ0csQ0FDTCxDQUFDLEVBQ05kLEtBQUE7TUFBS29HLEdBQUcsRUFBQyxhQUFhO01BQUNDLEdBQUcsRUFBRSxDQUFBdEQsSUFBSSxhQUFKQSxJQUFJLHdCQUFBdUIsYUFBQSxHQUFKdkIsSUFBSSxDQUFFckUsT0FBTyxjQUFBNEYsYUFBQSx1QkFBYkEsYUFBQSxDQUFlZ0MsTUFBTSxLQUFJLHVCQUF3QjtNQUFDdkYsU0FBUyxFQUFDLFFBQVE7TUFBQU4sTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLENBQUUsQ0FBQyxFQUNuR2QsS0FBQTtNQUFLZSxTQUFTLEVBQUMsYUFBYTtNQUFBTixNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsR0FDMUJkLEtBQUE7TUFBS2UsU0FBUyxFQUFDLFVBQVU7TUFBQU4sTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLEdBQ3RCaUMsSUFBSSxhQUFKQSxJQUFJLGdCQUFBd0IsY0FBQSxHQUFKeEIsSUFBSSxDQUFFckUsT0FBTyxjQUFBNkYsY0FBQSxlQUFiQSxjQUFBLENBQWUxRixHQUFHLEdBQ2pCbUIsS0FBQSxDQUFDdUcsZ0RBQUk7TUFDSEMsSUFBSSxFQUFFO1FBQ0pDLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUJDLEtBQUssRUFBRTtVQUNMQyxRQUFRLEVBQUUsQ0FBQTVELElBQUksYUFBSkEsSUFBSSx3QkFBQXlCLGNBQUEsR0FBSnpCLElBQUksQ0FBRXJFLE9BQU8sY0FBQThGLGNBQUEsdUJBQWJBLGNBQUEsQ0FBZW1DLFFBQVEsTUFBSTVELElBQUksYUFBSkEsSUFBSSx3QkFBQTBCLGNBQUEsR0FBSjFCLElBQUksQ0FBRXJFLE9BQU8sY0FBQStGLGNBQUEsdUJBQWJBLGNBQUEsQ0FBZTVGLEdBQUcsS0FBSTtRQUM3RDtNQUNGLENBQUU7TUFBQTRCLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxHQUVGZCxLQUFBO01BQUcsbUJBQVc7TUFBQ3dHLElBQUksRUFBQyxnQkFBZ0I7TUFBQS9GLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxHQUNqQyxDQUFBaUMsSUFBSSxhQUFKQSxJQUFJLHdCQUFBMkIsY0FBQSxHQUFKM0IsSUFBSSxDQUFFckUsT0FBTyxjQUFBZ0csY0FBQSx1QkFBYkEsY0FBQSxDQUFldkUsSUFBSSxNQUFJNEMsSUFBSSxhQUFKQSxJQUFJLHdCQUFBNEIsY0FBQSxHQUFKNUIsSUFBSSxDQUFFckUsT0FBTyxjQUFBaUcsY0FBQSx1QkFBYkEsY0FBQSxDQUFlZ0MsUUFBUSxLQUFJLEtBQ2xELENBQ0MsQ0FBQyxHQUNMM0csS0FBQTtNQUFBUyxNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsR0FBRyxLQUFNLENBQUMsRUFDZGQsS0FBQTtNQUFLZSxTQUFTLEVBQUMsVUFBVTtNQUFBTixNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsR0FDdkJkLEtBQUE7TUFBQVMsTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLEdBQ0VkLEtBQUE7TUFBTWUsU0FBUyxFQUFDLFVBQVU7TUFBQU4sTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLEdBQUU4Riw2Q0FBTSxDQUFDN0QsSUFBSSxDQUFDOEQsU0FBUyxDQUFDLENBQUNDLE9BQU8sQ0FBQyxDQUFRLENBQy9ELENBQUMsRUFDTixDQUFDNUQsSUFBSSxDQUFDckUsR0FBRyxLQUFLa0UsSUFBSSxDQUFDZ0UsU0FBUyxJQUFJN0QsSUFBSSxDQUFDckUsR0FBRyxLQUFLa0csV0FBVyxLQUN2RC9FLEtBQUEsQ0FBQ2dILDZDQUFRO01BQ1BDLE9BQU8sRUFDTGpILEtBQUEsQ0FBQ2tILHlDQUFJO1FBQUMzQixHQUFHLEVBQUUsWUFBWXhDLElBQUksQ0FBQ2xFLEdBQUcsRUFBRztRQUFBNEIsTUFBQTtRQUFBQyxRQUFBO1VBQUFDLFFBQUEsRUFBQUMsWUFBQTtVQUFBQyxVQUFBO1VBQUFDLFlBQUE7UUFBQTtNQUFBLEdBQ2hDZCxLQUFBLENBQUNrSCx5Q0FBSSxDQUFDbEcsSUFBSTtRQUFDdUUsR0FBRyxFQUFFLGNBQWN4QyxJQUFJLENBQUNsRSxHQUFHLEVBQUc7UUFBQzJHLE9BQU8sRUFBRUEsQ0FBQSxLQUFNWCxRQUFRLENBQUM5QixJQUFJLENBQUU7UUFBQXRDLE1BQUE7UUFBQUMsUUFBQTtVQUFBQyxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUE7TUFBQSxHQUN0RWQsS0FBQTtRQUFBUyxNQUFBO1FBQUFDLFFBQUE7VUFBQUMsUUFBQSxFQUFBQyxZQUFBO1VBQUFDLFVBQUE7VUFBQUMsWUFBQTtRQUFBO01BQUEsR0FBRyxRQUFTLENBQ0gsQ0FBQyxFQUNaZCxLQUFBLENBQUNrSCx5Q0FBSSxDQUFDbEcsSUFBSTtRQUFDdUUsR0FBRyxFQUFFLGNBQWN4QyxJQUFJLENBQUNsRSxHQUFHLEVBQUc7UUFBQzJHLE9BQU8sRUFBRUEsQ0FBQSxLQUFNWCxRQUFRLENBQUM5QixJQUFJLENBQUU7UUFBQXRDLE1BQUE7UUFBQUMsUUFBQTtVQUFBQyxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUE7TUFBQSxHQUN0RWQsS0FBQTtRQUFBUyxNQUFBO1FBQUFDLFFBQUE7VUFBQUMsUUFBQSxFQUFBQyxZQUFBO1VBQUFDLFVBQUE7VUFBQUMsWUFBQTtRQUFBO01BQUEsR0FBRyxRQUFTLENBQ0gsQ0FDUCxDQUNOO01BQUFMLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxHQUVGZCxLQUFBO01BQUcsbUJBQVc7TUFBQ2UsU0FBUyxFQUFDLG1CQUFtQjtNQUFDeUUsT0FBTyxFQUFHckUsQ0FBQyxJQUFLQSxDQUFDLENBQUNnRyxjQUFjLENBQUMsQ0FBRTtNQUFBMUcsTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLEdBQzlFZCxLQUFBLENBQUNvSCw4REFBWTtNQUFBM0csTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLENBQUUsQ0FDZCxDQUNLLENBRVQsQ0FDRixDQUFDLEVBQ05kLEtBQUE7TUFBS2UsU0FBUyxFQUFDLFVBQVU7TUFBQU4sTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLEdBQ3RCaUMsSUFBSSxDQUFDN0QsT0FDSCxDQUFDLEVBQ05jLEtBQUE7TUFBS2UsU0FBUyxFQUFDLFlBQVk7TUFBQU4sTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLEdBQ3hCOEQsUUFBUSxJQUNQNUUsS0FBQTtNQUNFLG1CQUFXO01BQ1hlLFNBQVMsRUFBRSxDQUFDakIsT0FBTyxHQUFHLFdBQVcsR0FBRyxrQkFBbUI7TUFDdkQwRixPQUFPLEVBQUVBLENBQUEsS0FBTTtRQUFFLElBQUksQ0FBQzVGLFFBQVEsQ0FBQztVQUFFRSxPQUFPLEVBQUUsQ0FBQ0E7UUFBUSxDQUFDLEVBQUUsTUFBTSxJQUFJLENBQUNzRCxhQUFhLENBQUMsQ0FBQyxDQUFDO01BQUUsQ0FBRTtNQUFBM0MsTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLEdBRXBGLEdBQUc4QixVQUFVLElBQUksRUFBRSxRQUNuQixDQUVGLENBQ0YsQ0FDRixDQUFDLEVBQ0xMLGFBQWEsSUFDWnZDLEtBQUE7TUFBS2UsU0FBUyxFQUFDLGVBQWU7TUFBQU4sTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLEdBQzVCZCxLQUFBO01BQUFTLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxHQUNFZCxLQUFBLENBQUNxSCx5RUFBWTtNQUNYOUIsR0FBRyxFQUFFLGlCQUFpQnhDLElBQUksQ0FBQ2xFLEdBQUcsSUFBSXNHLFFBQVEsQ0FBQ2hHLE1BQU0sRUFBRztNQUNwRCtGLFVBQVUsRUFBRUYsZUFBZ0I7TUFDNUJHLFFBQVEsRUFBRUEsUUFBUztNQUNuQk4sUUFBUSxFQUFFLElBQUksQ0FBQ1gsYUFBYSxDQUFDOUQsSUFBSSxDQUFDLElBQUksQ0FBRTtNQUN4QzhDLElBQUksRUFBRUEsSUFBSztNQUNYMEIsUUFBUSxFQUFFLEtBQU07TUFDaEI5RSxPQUFPLEVBQUVBLE9BQVE7TUFDakJpRixXQUFXLEVBQUVBLFdBQVk7TUFBQXRFLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxDQUMxQixDQUFDLEVBQ0RxRSxRQUFRLENBQUNoRyxNQUFNLEdBQUdrRyxhQUFhLElBQzlCckYsS0FBQTtNQUFHZSxTQUFTLEVBQUMsYUFBYTtNQUFBTixNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsR0FDeEJkLEtBQUE7TUFBRyxtQkFBVztNQUFDd0YsT0FBTyxFQUFFLElBQUksQ0FBQ3hCLFdBQVcsQ0FBQzVELElBQUksQ0FBQyxJQUFJLENBQUU7TUFBQUssTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLEdBQUMsU0FFbEQsQ0FDRixDQUVGLENBQ0YsQ0FDTixFQUNDaEIsT0FBTyxHQUNMRSxLQUFBLENBQUNsQyx3RUFBVztNQUNWWSxPQUFPLEVBQUV3RSxJQUFLO01BQ2Q1RSxRQUFRLEVBQUUsSUFBSSxDQUFDQyxhQUFhLENBQUM2QixJQUFJLENBQUMsSUFBSSxDQUFFO01BQ3hDNUIsUUFBUSxFQUFFdUUsSUFBSSxDQUFDbEUsR0FBSTtNQUNuQkosVUFBVSxFQUFDLFNBQVM7TUFDcEJxQixPQUFPO01BQ1BDLFFBQVEsRUFBRUEsUUFBUztNQUFBVSxNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsQ0FDcEIsQ0FBQyxHQUNGLElBQUksRUFDUmQsS0FBQSxDQUFDc0gsMENBQUs7TUFDSi9CLEdBQUcsRUFBQyxnQkFBZ0I7TUFDcEJ4RSxTQUFTLEVBQUMsb0JBQW9CO01BQzlCd0csS0FBSyxFQUFDLGtDQUFrQztNQUN4Q0MsT0FBTyxFQUFFL0Usc0JBQXVCO01BQ2hDZ0YsTUFBTSxFQUFFLElBQUs7TUFDYkMsY0FBYztNQUNkQyxRQUFRLEVBQUVBLENBQUEsS0FBTSxJQUFJLENBQUMvSCxRQUFRLENBQUM7UUFBRTZDLHNCQUFzQixFQUFFO01BQU0sQ0FBQyxDQUFFO01BQUFoQyxNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsR0FFakVkLEtBQUEsQ0FBQzhCLGlCQUFpQjtNQUFBckIsTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLENBQUUsQ0FDZixDQUNKLENBQUM7RUFFVjtBQUNGO0FBRUEsTUFBTThHLFNBQVMsR0FBSXBJLEtBQVUsSUFBSztFQUNoQyxNQUFNO0lBQUVzRixjQUFjO0lBQUVwQjtFQUFRLENBQUMsR0FBR2xFLEtBQUssQ0FBQ2tFLE9BQU87RUFFakQsT0FBTztJQUNMb0IsY0FBYztJQUNkcEIsT0FBTztJQUNQM0QsUUFBUSxFQUFFUCxLQUFLLENBQUNxSSxFQUFFLENBQUM5SDtFQUNyQixDQUFDO0FBQ0gsQ0FBQztBQUVELE1BQU0rSCxXQUFXLEdBQUc7RUFDbEJ6RSwrRUFBVztFQUNYVywrRUFBVztFQUNYaEIsbUZBQWE7RUFDYmtCLG1GQUFhQTtBQUNmLENBQUM7QUFDYzZELDBIQUFPLENBQUNILFNBQVMsRUFBRUUsV0FBVyxDQUFDLENBQUN6RixXQUFXLENBQUMsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4VDNEO0FBQ3NDO0FBQ1Y7QUFDK0I7QUFFRTtBQWM5QyxNQUFNZ0YsWUFBWSxTQUFTdEosbURBQWEsQ0FBUztFQUM5RDhCLE1BQU1BLENBQUEsRUFBRztJQUNQLE1BQU07TUFDSnNGLFFBQVE7TUFBRUQsVUFBVTtNQUFFaEMsSUFBSTtNQUFFMkIsUUFBUTtNQUFFRCxRQUFRO01BQUVvRCxXQUFXO01BQUVDLFFBQVE7TUFBRW5JLE9BQU87TUFBRWlGO0lBQ2xGLENBQUMsR0FBRyxJQUFJLENBQUNwRyxLQUFLO0lBRWQsT0FDRXFCLEtBQUEsQ0FBQWtJLDRDQUFBLENBQUFDLFFBQUEsUUFDSSxDQUFDakQsVUFBVSxJQUFJLENBQUNDLFFBQVEsQ0FBQ2hHLE1BQU0sR0FBSWEsS0FBQTtNQUFLZSxTQUFTLEVBQUMsYUFBYTtNQUFDVCxLQUFLLEVBQUU7UUFBRThILE9BQU8sRUFBRTtNQUFNLENBQUU7TUFBQTNILE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxDQUFFLENBQUMsR0FFM0ZkLEtBQUE7TUFBSzZGLEVBQUUsRUFBQyxpQkFBaUI7TUFBQzlFLFNBQVMsRUFBRWpCLE9BQU8sR0FBRyxVQUFVLEdBQUcsZ0JBQWlCO01BQUFXLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxHQUMzRWQsS0FBQSxDQUFDcUksc0VBQWM7TUFDYkMsVUFBVSxFQUFFbkQsUUFBUSxDQUFDaEcsTUFBTztNQUM1Qm9KLE9BQU8sRUFBRVAsV0FBWTtNQUNyQlEsTUFBTSxFQUFFLElBQUs7TUFDYkMsSUFBSSxFQUFFUixRQUFTO01BQ2ZTLFVBQVUsRUFBRSxJQUFLO01BQ2pCQyxlQUFlLEVBQUUsR0FBSTtNQUNyQkMsZ0JBQWdCLEVBQUMsaUJBQWlCO01BQUFuSSxNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsR0FFakNxRSxRQUFRLENBQUMwRCxHQUFHLENBQUVuRixPQUFpQixJQUFLMUQsS0FBQSxDQUFDcUMsd0VBQVc7TUFBQzBDLFdBQVcsRUFBRUEsV0FBWTtNQUFDSCxRQUFRLEVBQUVBLFFBQVM7TUFBQ1csR0FBRyxFQUFFN0IsT0FBTyxDQUFDN0UsR0FBSTtNQUFDa0UsSUFBSSxFQUFFVyxPQUFRO01BQUNSLElBQUksRUFBRUEsSUFBSztNQUFDMkIsUUFBUSxFQUFFQSxRQUFTO01BQUFwRSxNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsQ0FBRSxDQUFDLENBQUMsRUFDbktvRSxVQUFVLElBQUlsRixLQUFBO01BQUtlLFNBQVMsRUFBQyxhQUFhO01BQUNULEtBQUssRUFBRTtRQUFFRSxNQUFNLEVBQUU7TUFBRyxDQUFFO01BQUFDLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxHQUFDZCxLQUFBLENBQUM4SSx5Q0FBSTtNQUFBckksTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLENBQUUsQ0FBTSxDQUNsRSxDQUNiLENBRVQsQ0FBQztFQUdQO0FBQ0YsQyIsImZpbGUiOiI1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcmVxdWlyZS1kZWZhdWx0LXByb3BzICovXHJcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7XHJcbiAgRm9ybSwgSW5wdXQsIEJ1dHRvbiwgbWVzc2FnZSwgUG9wb3ZlciwgSW1hZ2VcclxufSBmcm9tICdhbnRkJztcclxuaW1wb3J0IHsgU2VuZE91dGxpbmVkLCBTbWlsZU91dGxpbmVkIH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMnO1xyXG5pbXBvcnQgeyBJUGVyZm9ybWVyIH0gZnJvbSAnc3JjL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBFbW90aW9ucyB9IGZyb20gJ0Bjb21wb25lbnRzL21lc3NhZ2VzL2Vtb3Rpb25zJztcclxuaW1wb3J0IHsgRm9ybUluc3RhbmNlIH0gZnJvbSAnYW50ZC9saWIvZm9ybSc7XHJcbmltcG9ydCB7IElDcmVhdGVDb21tZW50IH0gZnJvbSAnc3JjL2ludGVyZmFjZXMvY29tbWVudCc7XHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnbmV4dC9yb3V0ZXInO1xyXG5pbXBvcnQgJy4vY29tbWVudC5sZXNzJztcclxuaW1wb3J0IHsgQXBwQnV0dG9uIH0gZnJvbSAnQGNvbXBvbmVudHMvdWkvc2hhcmVkL0FwcEJ1dHRvbic7XHJcblxyXG5pbnRlcmZhY2UgSVByb3BzIHtcclxuICBvYmplY3RJZDogc3RyaW5nO1xyXG4gIG9uU3VibWl0OiBGdW5jdGlvbjtcclxuICBjcmVhdG9yOiBJUGVyZm9ybWVyO1xyXG4gIG9iamVjdFR5cGU/OiBzdHJpbmc7XHJcbiAgaXNSZXBseT86IGJvb2xlYW47XHJcbiAgc2l0ZU5hbWU/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1lbnRGb3JtIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxJUHJvcHM+IHtcclxuICBmb3JtUmVmOiBGb3JtSW5zdGFuY2U7XHJcblxyXG4gIHN0YXRlID0ge1xyXG4gICAgdGV4dDogJydcclxuICB9O1xyXG5cclxuICBvbkZpbmlzaCh2YWx1ZXM6IElDcmVhdGVDb21tZW50KSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIG9uU3VibWl0OiBoYW5kbGVDb21tZW50LFxyXG4gICAgICBvYmplY3RJZCxcclxuICAgICAgb2JqZWN0VHlwZSxcclxuICAgICAgY3JlYXRvclxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCBkYXRhID0gdmFsdWVzO1xyXG5cclxuICAgIGlmICghY3JlYXRvciB8fCAhY3JlYXRvci5faWQpIHtcclxuICAgICAgbWVzc2FnZS5lcnJvcignUGxlYXNlIGxvZ2luIScpO1xyXG4gICAgICByZXR1cm4gUm91dGVyLnB1c2goJy8nKTtcclxuICAgIH1cclxuICAgIGlmICghZGF0YS5jb250ZW50KSB7XHJcbiAgICAgIHJldHVybiBtZXNzYWdlLmVycm9yKCdQbGVhc2UgYWRkIGEgY29tbWVudCEnKTtcclxuICAgIH1cclxuICAgIGlmIChkYXRhLmNvbnRlbnQubGVuZ3RoID4gMTUwKSB7XHJcbiAgICAgIHJldHVybiBtZXNzYWdlLmVycm9yKCdDb21tZW50IGlzIG92ZXIgMTUwIGNoYXJhY3RlcnMnKTtcclxuICAgIH1cclxuICAgIGRhdGEub2JqZWN0SWQgPSBvYmplY3RJZDtcclxuICAgIGRhdGEub2JqZWN0VHlwZSA9IG9iamVjdFR5cGUgfHwgJ3ZpZGVvJztcclxuICAgIHRoaXMuZm9ybVJlZi5yZXNldEZpZWxkcyhbJ2NvbnRlbnQnXSk7XHJcbiAgICByZXR1cm4gaGFuZGxlQ29tbWVudChkYXRhKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG9uRW1vamlDbGljayhlbW9qaSkge1xyXG4gICAgY29uc3QgeyBjcmVhdG9yIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgaWYgKCFjcmVhdG9yIHx8ICFjcmVhdG9yLl9pZCkgcmV0dXJuO1xyXG4gICAgY29uc3QgeyB0ZXh0IH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmZvcm1SZWYgYXMgRm9ybUluc3RhbmNlO1xyXG4gICAgaW5zdGFuY2Uuc2V0RmllbGRzVmFsdWUoe1xyXG4gICAgICBjb250ZW50OiBgJHtpbnN0YW5jZS5nZXRGaWVsZFZhbHVlKCdjb250ZW50Jyl9ICR7ZW1vaml9IGBcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHRleHQ6IGAke3RleHR9ICR7ZW1vaml9IGAgfSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNyZWF0b3IsIGlzUmVwbHksIHNpdGVOYW1lLCBvYmplY3RJZFxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Rm9ybVxyXG4gICAgICAgIHJlZj17KHJlZikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5mb3JtUmVmID0gcmVmO1xyXG4gICAgICAgIH19XHJcbiAgICAgICAgbmFtZT1cImNvbW1lbnQtZm9ybVwiXHJcbiAgICAgICAgb25GaW5pc2g9e3RoaXMub25GaW5pc2guYmluZCh0aGlzKX1cclxuICAgICAgICBpbml0aWFsVmFsdWVzPXt7XHJcbiAgICAgICAgICBjb250ZW50OiAnJ1xyXG4gICAgICAgIH19XHJcbiAgICAgICAgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgbWFyZ2luOiAnYXV0byd9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLXN0cmV0Y2hcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgcGItNFwiPlxyXG4gICAgICAgICAgICA8Rm9ybS5JdGVtIGNsYXNzTmFtZT0nbS0wJyBuYW1lPVwiY29udGVudFwiPlxyXG4gICAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT0ncm91bmRlZC1mdWxsIHAtMidcclxuICAgICAgICAgICAgICAgIG9uUHJlc3NFbnRlcj17KGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQudmFsdWUubGVuZ3RoIDwgMikgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmZvcm1SZWYuc3VibWl0KCk7XHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFjcmVhdG9yIHx8ICFjcmVhdG9yLl9pZH1cclxuICAgICAgICAgICAgICAgIG1heExlbmd0aD17MTUwfVxyXG4gICAgICAgICAgICAgICAgbWluTGVuZ3RoPXsyfVxyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e1xyXG4gICAgICAgICAgICAgICAgICAhaXNSZXBseSA/ICdBZGQgYSBjb21tZW50IGhlcmUnIDogJ0FkZCBhIHJlcGx5IGhlcmUnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9Gb3JtLkl0ZW0+XHJcbiAgICAgICAgICAgIHsvKiA8UG9wb3ZlclxyXG4gICAgICAgICAgICAgIGtleT17b2JqZWN0SWR9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcmlnaHQtNCBtLWF1dG8gdG9wLTAgYm90dG9tLTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgei0xMFwiXHJcbiAgICAgICAgICAgICAgdGl0bGU9e251bGx9XHJcbiAgICAgICAgICAgICAgdHJpZ2dlcj1cImNsaWNrXCJcclxuICAgICAgICAgICAgICBjb250ZW50PXsoXHJcbiAgICAgICAgICAgICAgICA8RW1vdGlvbnNcclxuICAgICAgICAgICAgICAgICAgb25FbW9qaUNsaWNrPXt0aGlzLm9uRW1vamlDbGljay5iaW5kKHRoaXMpfVxyXG4gICAgICAgICAgICAgICAgICBzaXRlTmFtZT17c2l0ZU5hbWV9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdycC1lbW90aW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgPFNtaWxlT3V0bGluZWQgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9Qb3BvdmVyPiAqL31cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPEFwcEJ1dHRvblxyXG4gICAgICAgICAgICBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnIH19XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Jyd9XHJcbiAgICAgICAgICAgIHR5cGU9J3N1Ym1pdCdcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHshaXNSZXBseSA/ICdQb3N0JyA6ICdSZXBseSd9XHJcbiAgICAgICAgICA8L0FwcEJ1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9Gb3JtPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcmVxdWlyZS1kZWZhdWx0LXByb3BzICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvdHlwZS1idWlsdGlucyAqL1xyXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1xyXG4gIE1lbnUsIERyb3Bkb3duLCBtZXNzYWdlLCBJbWFnZSwgTW9kYWxcclxufSBmcm9tICdhbnRkJztcclxuaW1wb3J0IHtcclxuICBNb3JlT3V0bGluZWQsIExpa2VPdXRsaW5lZCwgRGlzbGlrZU91dGxpbmVkLCBIZWFydEZpbGxlZFxyXG59IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zJztcclxuaW1wb3J0IHsgcmVhY3Rpb25TZXJ2aWNlIH0gZnJvbSAnQHNlcnZpY2VzL2luZGV4JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IENvbW1lbnRGb3JtIGZyb20gJ0Bjb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC1mb3JtJztcclxuaW1wb3J0IExpc3RDb21tZW50cyBmcm9tICdAY29tcG9uZW50cy9jb21tZW50L2xpc3QtY29tbWVudHMnO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5pbXBvcnQge1xyXG4gIGdldENvbW1lbnRzLCBtb3JlQ29tbWVudCwgY3JlYXRlQ29tbWVudCwgZGVsZXRlQ29tbWVudFxyXG59IGZyb20gJ0ByZWR1eC9jb21tZW50L2FjdGlvbnMnO1xyXG5pbXBvcnQgeyBJQ29tbWVudCwgSVBlcmZvcm1lciB9IGZyb20gJ3NyYy9pbnRlcmZhY2VzL2luZGV4JztcclxuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcclxuaW1wb3J0IGR5bmFtaWMgZnJvbSAnbmV4dC9keW5hbWljJztcclxuXHJcbmNvbnN0IFZlcmlmaWVkRW1haWxGb3JtID0gZHluYW1pYygoKSA9PiBpbXBvcnQoJ0Bjb21wb25lbnRzL3BlcmZvcm1lci92ZXJpZmllZC1lbWFpbC1mb3JtJyksIHsgc3NyOiBmYWxzZSB9KTtcclxuXHJcbmludGVyZmFjZSBJUHJvcHMge1xyXG4gIGl0ZW06IElDb21tZW50O1xyXG4gIG9uRGVsZXRlPzogRnVuY3Rpb247XHJcbiAgdXNlcj86IElQZXJmb3JtZXI7XHJcbiAgY2FuUmVwbHk/OiBib29sZWFuO1xyXG4gIGdldENvbW1lbnRzOiBGdW5jdGlvbjtcclxuICBtb3JlQ29tbWVudDogRnVuY3Rpb247XHJcbiAgY3JlYXRlQ29tbWVudDogRnVuY3Rpb247XHJcbiAgZGVsZXRlQ29tbWVudDogRnVuY3Rpb247XHJcbiAgY29tbWVudE1hcHBpbmc6IGFueTtcclxuICBzaXRlTmFtZTogc3RyaW5nO1xyXG4gIGZlZWRPd25lcklkPzogc3RyaW5nO1xyXG59XHJcblxyXG5jbGFzcyBDb21tZW50SXRlbSBleHRlbmRzIFB1cmVDb21wb25lbnQ8SVByb3BzPiB7XHJcbiAgc3RhdGUgPSB7XHJcbiAgICBpc0xpa2VkOiBmYWxzZSxcclxuICAgIGlzT3BlbkNvbW1lbnQ6IGZhbHNlLFxyXG4gICAgaXNGaXJzdExvYWRDb21tZW50OiB0cnVlLFxyXG4gICAgb3BlblZlcmlmaWVkRW1haWxNb2RhbDogZmFsc2UsXHJcbiAgICBpdGVtUGVyUGFnZTogMTIsXHJcbiAgICBjb21tZW50UGFnZTogMCxcclxuICAgIGlzUmVwbHk6IGZhbHNlLFxyXG4gICAgdG90YWxSZXBseTogMCxcclxuICAgIHRvdGFsTGlrZTogMFxyXG4gIH07XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgY29uc3QgeyBpdGVtIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgaWYgKGl0ZW0pIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgaXNMaWtlZDogISFpdGVtLmlzTGlrZWQsXHJcbiAgICAgICAgdG90YWxMaWtlOiBpdGVtLnRvdGFsTGlrZSB8fCAwLFxyXG4gICAgICAgIHRvdGFsUmVwbHk6IGl0ZW0udG90YWxSZXBseSA/IGl0ZW0udG90YWxSZXBseSA6IDBcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBoYW5kbGVDb21tZW50KHZhbHVlcykge1xyXG4gICAgY29uc3QgeyBjcmVhdGVDb21tZW50OiBoYW5kbGVDcmVhdGUsIHVzZXIgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBpZiAoIXVzZXIudmVyaWZpZWRFbWFpbCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7IG9wZW5WZXJpZmllZEVtYWlsTW9kYWw6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB7IHRvdGFsUmVwbHkgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBoYW5kbGVDcmVhdGUodmFsdWVzKTtcclxuICAgIGF3YWl0IHRoaXMuc2V0U3RhdGUoeyB0b3RhbFJlcGx5OiB0b3RhbFJlcGx5ICsgMSB9KTtcclxuICAgIHRoaXMub25PcGVuQ29tbWVudCgpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBhc3luYyBvbk9wZW5Db21tZW50KCkge1xyXG4gICAgY29uc3QgeyBpdGVtLCBnZXRDb21tZW50czogaGFuZGxlR2V0Q29tbWVudCB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHtcclxuICAgICAgaXNPcGVuQ29tbWVudCwgaXNGaXJzdExvYWRDb21tZW50LCBpdGVtUGVyUGFnZSwgY29tbWVudFBhZ2VcclxuICAgIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzT3BlbkNvbW1lbnQ6ICFpc09wZW5Db21tZW50IH0pO1xyXG4gICAgaWYgKGlzRmlyc3RMb2FkQ29tbWVudCkge1xyXG4gICAgICBhd2FpdCB0aGlzLnNldFN0YXRlKHsgaXNGaXJzdExvYWRDb21tZW50OiBmYWxzZSB9KTtcclxuICAgICAgaGFuZGxlR2V0Q29tbWVudCh7XHJcbiAgICAgICAgb2JqZWN0SWQ6IGl0ZW0uX2lkLFxyXG4gICAgICAgIG9iamVjdFR5cGU6ICdjb21tZW50JyxcclxuICAgICAgICBsaW1pdDogaXRlbVBlclBhZ2UsXHJcbiAgICAgICAgb2Zmc2V0OiBjb21tZW50UGFnZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGxpa2VDb21tZW50KGNvbW1lbnQpIHtcclxuICAgIGNvbnN0IHsgaXNMaWtlZCwgdG90YWxMaWtlIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKCFpc0xpa2VkKSB7XHJcbiAgICAgICAgYXdhaXQgcmVhY3Rpb25TZXJ2aWNlLmNyZWF0ZSh7XHJcbiAgICAgICAgICBvYmplY3RJZDogY29tbWVudC5faWQsXHJcbiAgICAgICAgICBhY3Rpb246ICdsaWtlJyxcclxuICAgICAgICAgIG9iamVjdFR5cGU6ICdjb21tZW50J1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0xpa2VkOiB0cnVlLCB0b3RhbExpa2U6IHRvdGFsTGlrZSArIDEgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc3QgZXJyb3IgPSBhd2FpdCBlO1xyXG4gICAgICBtZXNzYWdlLmVycm9yKGVycm9yLm1lc3NhZ2UgfHwgJ0Vycm9yIG9jY3VyZWQsIHBsZWFzZSB0cnkgYWdhaW4gbGF0ZXInKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHVuTGlrZUNvbW1lbnQoY29tbWVudCkge1xyXG4gICAgY29uc3QgeyBpc0xpa2VkLCB0b3RhbExpa2UgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAoaXNMaWtlZCkge1xyXG4gICAgICAgIGF3YWl0IHJlYWN0aW9uU2VydmljZS5kZWxldGUoe1xyXG4gICAgICAgICAgb2JqZWN0SWQ6IGNvbW1lbnQuX2lkLFxyXG4gICAgICAgICAgYWN0aW9uOiAnbGlrZScsXHJcbiAgICAgICAgICBvYmplY3RUeXBlOiAnY29tbWVudCdcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNMaWtlZDogZmFsc2UsIHRvdGFsTGlrZTogdG90YWxMaWtlIC0gMSB9KTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zdCBlcnJvciA9IGF3YWl0IGU7XHJcbiAgICAgIG1lc3NhZ2UuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCAnRXJyb3Igb2NjdXJlZCwgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlcicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgbW9yZUNvbW1lbnQoKSB7XHJcbiAgICBjb25zdCB7IGl0ZW0sIG1vcmVDb21tZW50OiBoYW5kbGVMb2FkTW9yZSB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHsgY29tbWVudFBhZ2UsIGl0ZW1QZXJQYWdlIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgYXdhaXQgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGNvbW1lbnRQYWdlOiBjb21tZW50UGFnZSArIDFcclxuICAgIH0pO1xyXG4gICAgaGFuZGxlTG9hZE1vcmUoe1xyXG4gICAgICBsaW1pdDogaXRlbVBlclBhZ2UsXHJcbiAgICAgIG9iamVjdFR5cGU6ICdjb21tZW50JyxcclxuICAgICAgb2Zmc2V0OiAoY29tbWVudFBhZ2UgKyAxKSAqIGl0ZW1QZXJQYWdlLFxyXG4gICAgICBvYmplY3RJZDogaXRlbS5faWRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZGVsZXRlQ29tbWVudChpdGVtKSB7XHJcbiAgICBjb25zdCB7IGRlbGV0ZUNvbW1lbnQ6IGhhbmRsZURlbGV0ZSB9ID0gdGhpcy5wcm9wcztcclxuICAgIGlmICghd2luZG93LmNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB0byByZW1vdmUgdGhpcyBjb21tZW50PycpKSByZXR1cm47XHJcbiAgICBoYW5kbGVEZWxldGUoaXRlbS5faWQpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpdGVtLCB1c2VyLCBjYW5SZXBseSwgb25EZWxldGUsIGNvbW1lbnRNYXBwaW5nLCBzaXRlTmFtZSwgZmVlZE93bmVySWRcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgZmV0Y2hpbmdDb21tZW50ID0gY29tbWVudE1hcHBpbmcuaGFzT3duUHJvcGVydHkoaXRlbS5faWQpID8gY29tbWVudE1hcHBpbmdbaXRlbS5faWRdLnJlcXVlc3RpbmcgOiBmYWxzZTtcclxuICAgIGNvbnN0IGNvbW1lbnRzID0gY29tbWVudE1hcHBpbmcuaGFzT3duUHJvcGVydHkoaXRlbS5faWQpID8gY29tbWVudE1hcHBpbmdbaXRlbS5faWRdLml0ZW1zIDogW107XHJcbiAgICBjb25zdCB0b3RhbENvbW1lbnRzID0gY29tbWVudE1hcHBpbmcuaGFzT3duUHJvcGVydHkoaXRlbS5faWQpID8gY29tbWVudE1hcHBpbmdbaXRlbS5faWRdLnRvdGFsIDogMDtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaXNMaWtlZCwgaXNPcGVuQ29tbWVudCwgaXNSZXBseSwgdG90YWxSZXBseSwgdG90YWxMaWtlLCBvcGVuVmVyaWZpZWRFbWFpbE1vZGFsXHJcbiAgICB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYi00Jz5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNtdC1pdGVtXCIga2V5PXtpdGVtLl9pZH0+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5saWtlQ29tbWVudC5iaW5kKHRoaXMsIGl0ZW0pfT5cclxuICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCI+XHJcbiAgICAgICAgICAgICAgICA8bWFzayBpZD1cIm1hc2swXzMwNDdfODI4MjBcIiAgIG1hc2tVbml0cz1cInVzZXJTcGFjZU9uVXNlXCIgeD1cIjBcIiB5PVwiMFwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiPlxyXG4gICAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiBmaWxsPVwiI0Q5RDlEOVwiLz5cclxuICAgICAgICAgICAgICAgIDwvbWFzaz5cclxuICAgICAgICAgICAgICAgIDxnIG1hc2s9XCJ1cmwoI21hc2swXzMwNDdfODI4MjApXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNyAxN1YxMS4yMDgzSDNMMTAgMkwxNyAxMS4yMDgzSDEzVjE3SDdaTTguNSAxNS41SDExLjVWOS43MDgzM0gxMy45Mzc1TDEwIDQuNDM3NUw2LjA2MjUgOS43MDgzM0g4LjVWMTUuNVpcIiBmaWxsPVwiIzEyMTIxMlwiLz5cclxuICAgICAgICAgICAgICAgIDwvZz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICB7dG90YWxMaWtlfVxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy51bkxpa2VDb21tZW50LmJpbmQodGhpcywgaXRlbSl9PlxyXG4gICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgZmlsbD1cIm5vbmVcIj5cclxuICAgICAgICAgICAgICA8ZyBjbGlwUGF0aD1cInVybCgjY2xpcDBfMzA0N184MjgyMilcIj5cclxuICAgICAgICAgICAgICAgIDxtYXNrIGlkPVwibWFzazBfMzA0N184MjgyMlwiIG1hc2tVbml0cz1cInVzZXJTcGFjZU9uVXNlXCIgeD1cIjBcIiB5PVwiMFwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiPlxyXG4gICAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiBmaWxsPVwiI0Q5RDlEOVwiLz5cclxuICAgICAgICAgICAgICAgIDwvbWFzaz5cclxuICAgICAgICAgICAgICAgIDxnIG1hc2s9XCJ1cmwoI21hc2swXzMwNDdfODI4MjIpXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTMgMy4xNjIxMUwxMyA4Ljk1Mzc4TDE3IDguOTUzNzhMMTAgMTguMTYyMUwzIDguOTUzNzdMNyA4Ljk1Mzc3TDcgMy4xNjIxMUwxMyAzLjE2MjExWk0xMS41IDQuNjYyMTFMOC41IDQuNjYyMTFMOC41IDEwLjQ1MzhMNi4wNjI1IDEwLjQ1MzhMMTAgMTUuNzI0NkwxMy45Mzc1IDEwLjQ1MzhMMTEuNSAxMC40NTM4TDExLjUgNC42NjIxMVpcIiBmaWxsPVwiIzEyMTIxMlwiLz5cclxuICAgICAgICAgICAgICAgIDwvZz5cclxuICAgICAgICAgICAgICA8L2c+XHJcbiAgICAgICAgICAgICAgPGRlZnM+XHJcbiAgICAgICAgICAgICAgICA8Y2xpcFBhdGggaWQ9XCJjbGlwMF8zMDQ3XzgyODIyXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxyZWN0IHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIGZpbGw9XCJ3aGl0ZVwiLz5cclxuICAgICAgICAgICAgICAgIDwvY2xpcFBhdGg+XHJcbiAgICAgICAgICAgICAgPC9kZWZzPlxyXG4gICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxpbWcgYWx0PVwiY3JlYXRvci1hdnRcIiBzcmM9e2l0ZW0/LmNyZWF0b3I/LmF2YXRhciB8fCAnL3N0YXRpYy9uby1hdmF0YXIucG5nJ30gY2xhc3NOYW1lPVwiYXZhdGFyXCIgLz5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY210LWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbXQtdGV4dFwiPlxyXG4gICAgICAgICAgICAgIHtpdGVtPy5jcmVhdG9yPy5faWQgPyAoXHJcbiAgICAgICAgICAgICAgICA8TGlua1xyXG4gICAgICAgICAgICAgICAgICBocmVmPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWU6ICcvbW9kZWwvcHJvZmlsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiBpdGVtPy5jcmVhdG9yPy51c2VybmFtZSB8fCBpdGVtPy5jcmVhdG9yPy5faWQgfHwgJ04vQSdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDxhIGFyaWEtaGlkZGVuIGhyZWY9XCIvbW9kZWwvcHJvZmlsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHtpdGVtPy5jcmVhdG9yPy5uYW1lIHx8IGl0ZW0/LmNyZWF0b3I/LnVzZXJuYW1lIHx8ICdOL0EnfVxyXG4gICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgICAgKSA6IDxwPk4vQTwvcD4gfVxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY210LXVzZXJcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbXQtdGltZVwiPnttb21lbnQoaXRlbS5jcmVhdGVkQXQpLmZyb21Ob3coKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICB7KHVzZXIuX2lkID09PSBpdGVtLmNyZWF0ZWRCeSB8fCB1c2VyLl9pZCA9PT0gZmVlZE93bmVySWQpICYmIChcclxuICAgICAgICAgICAgICAgICAgPERyb3Bkb3duXHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheT17KFxyXG4gICAgICAgICAgICAgICAgICAgICAgPE1lbnUga2V5PXtgbWVudV9jbXRfJHtpdGVtLl9pZH1gfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnUuSXRlbSBrZXk9e2BkZWxldGVfY210XyR7aXRlbS5faWR9YH0gb25DbGljaz17KCkgPT4gb25EZWxldGUoaXRlbSl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxhPlJlcG9ydDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9NZW51Lkl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZW51Lkl0ZW0ga2V5PXtgZGVsZXRlX2NtdF8ke2l0ZW0uX2lkfWB9IG9uQ2xpY2s9eygpID0+IG9uRGVsZXRlKGl0ZW0pfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YT5EZWxldGU8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVudS5JdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9NZW51PlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICA8YSBhcmlhLWhpZGRlbiBjbGFzc05hbWU9XCJhbnQtZHJvcGRvd24tbGlua1wiIG9uQ2xpY2s9eyhlKSA9PiBlLnByZXZlbnREZWZhdWx0KCl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPE1vcmVPdXRsaW5lZCAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bj5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNtdC10ZXh0XCI+XHJcbiAgICAgICAgICAgICAge2l0ZW0uY29udGVudH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY210LWFjdGlvblwiPlxyXG4gICAgICAgICAgICAgIHtjYW5SZXBseSAmJiAoXHJcbiAgICAgICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgICAgICBhcmlhLWhpZGRlblxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyFpc1JlcGx5ID8gJ2NtdC1yZXBseScgOiAnY210LXJlcGx5IGFjdGl2ZSd9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdGhpcy5zZXRTdGF0ZSh7IGlzUmVwbHk6ICFpc1JlcGx5IH0sICgpID0+IHRoaXMub25PcGVuQ29tbWVudCgpKTsgfX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAge2Ake3RvdGFsUmVwbHkgfHwgJyd9IFJlcGx5YH1cclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIHtpc09wZW5Db21tZW50ICYmIChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVwbHktYmwtbGlzdFwiPlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxMaXN0Q29tbWVudHNcclxuICAgICAgICAgICAgICAgIGtleT17YGxpc3RfY29tbWVudHNfJHtpdGVtLl9pZH1fJHtjb21tZW50cy5sZW5ndGh9YH1cclxuICAgICAgICAgICAgICAgIHJlcXVlc3Rpbmc9e2ZldGNoaW5nQ29tbWVudH1cclxuICAgICAgICAgICAgICAgIGNvbW1lbnRzPXtjb21tZW50c31cclxuICAgICAgICAgICAgICAgIG9uRGVsZXRlPXt0aGlzLmRlbGV0ZUNvbW1lbnQuYmluZCh0aGlzKX1cclxuICAgICAgICAgICAgICAgIHVzZXI9e3VzZXJ9XHJcbiAgICAgICAgICAgICAgICBjYW5SZXBseT17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICBpc1JlcGx5PXtpc1JlcGx5fVxyXG4gICAgICAgICAgICAgICAgZmVlZE93bmVySWQ9e2ZlZWRPd25lcklkfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAge2NvbW1lbnRzLmxlbmd0aCA8IHRvdGFsQ29tbWVudHMgJiYgKFxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgPGEgYXJpYS1oaWRkZW4gb25DbGljaz17dGhpcy5tb3JlQ29tbWVudC5iaW5kKHRoaXMpfT5cclxuICAgICAgICAgICAgICAgICAgICBtb3JlLi4uXHJcbiAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgICAgIHtpc1JlcGx5IFxyXG4gICAgICAgICA/ICA8Q29tbWVudEZvcm1cclxuICAgICAgICAgICAgICBjcmVhdG9yPXt1c2VyfVxyXG4gICAgICAgICAgICAgIG9uU3VibWl0PXt0aGlzLmhhbmRsZUNvbW1lbnQuYmluZCh0aGlzKX1cclxuICAgICAgICAgICAgICBvYmplY3RJZD17aXRlbS5faWR9XHJcbiAgICAgICAgICAgICAgb2JqZWN0VHlwZT1cImNvbW1lbnRcIlxyXG4gICAgICAgICAgICAgIGlzUmVwbHlcclxuICAgICAgICAgICAgICBzaXRlTmFtZT17c2l0ZU5hbWV9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA6IG51bGx9XHJcbiAgICAgICAgPE1vZGFsXHJcbiAgICAgICAgICBrZXk9XCJ2ZXJpZmllZF9lbWFpbFwiXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJzdWJzY3JpcHRpb24tbW9kYWxcIlxyXG4gICAgICAgICAgdGl0bGU9XCJQbGVhc2UgdmVyaWZ5IHlvdXIgZW1haWwgYWRkcmVzc1wiXHJcbiAgICAgICAgICB2aXNpYmxlPXtvcGVuVmVyaWZpZWRFbWFpbE1vZGFsfVxyXG4gICAgICAgICAgZm9vdGVyPXtudWxsfVxyXG4gICAgICAgICAgZGVzdHJveU9uQ2xvc2VcclxuICAgICAgICAgIG9uQ2FuY2VsPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgb3BlblZlcmlmaWVkRW1haWxNb2RhbDogZmFsc2UgfSl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPFZlcmlmaWVkRW1haWxGb3JtIC8+XHJcbiAgICAgICAgPC9Nb2RhbD5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVzID0gKHN0YXRlOiBhbnkpID0+IHtcclxuICBjb25zdCB7IGNvbW1lbnRNYXBwaW5nLCBjb21tZW50IH0gPSBzdGF0ZS5jb21tZW50O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY29tbWVudE1hcHBpbmcsXHJcbiAgICBjb21tZW50LFxyXG4gICAgc2l0ZU5hbWU6IHN0YXRlLnVpLnNpdGVOYW1lXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoID0ge1xyXG4gIGdldENvbW1lbnRzLFxyXG4gIG1vcmVDb21tZW50LFxyXG4gIGNyZWF0ZUNvbW1lbnQsXHJcbiAgZGVsZXRlQ29tbWVudFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlcywgbWFwRGlzcGF0Y2gpKENvbW1lbnRJdGVtKTtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcmVxdWlyZS1kZWZhdWx0LXByb3BzICovXHJcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFNwaW4gfSBmcm9tICdhbnRkJztcclxuaW1wb3J0IENvbW1lbnRJdGVtIGZyb20gJ0Bjb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC1pdGVtJztcclxuaW1wb3J0IHsgSUNvbW1lbnQsIElQZXJmb3JtZXIgfSBmcm9tICdzcmMvaW50ZXJmYWNlcy9pbmRleCc7XHJcbmltcG9ydCBJbmZpbml0ZVNjcm9sbCBmcm9tICdyZWFjdC1pbmZpbml0ZS1zY3JvbGwtY29tcG9uZW50JztcclxuXHJcbmludGVyZmFjZSBJUHJvcHMge1xyXG4gIGNvbW1lbnRzOiBJQ29tbWVudFtdO1xyXG4gIHJlcXVlc3Rpbmc6IGJvb2xlYW47XHJcbiAgb25EZWxldGU/OiBGdW5jdGlvbjtcclxuICB1c2VyPzogSVBlcmZvcm1lcjtcclxuICBjYW5SZXBseT86IGJvb2xlYW47XHJcbiAgY2FuTG9hZG1vcmU/IDpib29sZWFuO1xyXG4gIGxvYWRNb3JlPygpIDpGdW5jdGlvbjtcclxuICBpc1JlcGx5PyA6Ym9vbGVhbjtcclxuICBmZWVkT3duZXJJZD86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdENvbW1lbnRzIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxJUHJvcHM+IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNvbW1lbnRzLCByZXF1ZXN0aW5nLCB1c2VyLCBvbkRlbGV0ZSwgY2FuUmVwbHksIGNhbkxvYWRtb3JlLCBsb2FkTW9yZSwgaXNSZXBseSwgZmVlZE93bmVySWRcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDw+XHJcbiAgICAgICAgeyghcmVxdWVzdGluZyAmJiAhY29tbWVudHMubGVuZ3RoKSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIiBzdHlsZT17eyBwYWRkaW5nOiAnNXB4JyB9fSAvPlxyXG4gICAgICAgICAgOiAoXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJzY3JvbGxhYmxlTW9kYWxcIiBjbGFzc05hbWU9e2lzUmVwbHkgPyAnY210LWxpc3QnIDogJ2NtdC1saXN0IHJlcGx5J30+XHJcbiAgICAgICAgICAgICAgPEluZmluaXRlU2Nyb2xsXHJcbiAgICAgICAgICAgICAgICBkYXRhTGVuZ3RoPXtjb21tZW50cy5sZW5ndGh9XHJcbiAgICAgICAgICAgICAgICBoYXNNb3JlPXtjYW5Mb2FkbW9yZX1cclxuICAgICAgICAgICAgICAgIGxvYWRlcj17bnVsbH1cclxuICAgICAgICAgICAgICAgIG5leHQ9e2xvYWRNb3JlfVxyXG4gICAgICAgICAgICAgICAgZW5kTWVzc2FnZT17bnVsbH1cclxuICAgICAgICAgICAgICAgIHNjcm9sbFRocmVzaG9sZD17MC43fVxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsYWJsZVRhcmdldD1cInNjcm9sbGFibGVNb2RhbFwiXHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2NvbW1lbnRzLm1hcCgoY29tbWVudDogSUNvbW1lbnQpID0+IDxDb21tZW50SXRlbSBmZWVkT3duZXJJZD17ZmVlZE93bmVySWR9IGNhblJlcGx5PXtjYW5SZXBseX0ga2V5PXtjb21tZW50Ll9pZH0gaXRlbT17Y29tbWVudH0gdXNlcj17dXNlcn0gb25EZWxldGU9e29uRGVsZXRlfSAvPil9XHJcbiAgICAgICAgICAgICAgICB7cmVxdWVzdGluZyAmJiA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCIgc3R5bGU9e3sgbWFyZ2luOiAyMCB9fT48U3BpbiAvPjwvZGl2Pn1cclxuICAgICAgICAgICAgICA8L0luZmluaXRlU2Nyb2xsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICl9XHJcbiAgICAgIDwvPlxyXG5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=