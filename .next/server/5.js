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
var _jsxFileName = "C:\\Users\\Rokibul\\Documents\\case\\src\\components\\comment\\comment-form.tsx";

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
var _jsxFileName = "C:\\Users\\Rokibul\\Documents\\case\\src\\components\\comment\\comment-item.tsx";

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
var _jsxFileName = "C:\\Users\\Rokibul\\Documents\\case\\src\\components\\comment\\list-comments.tsx";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jb21tZW50L2NvbW1lbnQtZm9ybS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY29tbWVudC9jb21tZW50LWl0ZW0udHN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQvbGlzdC1jb21tZW50cy50c3giXSwibmFtZXMiOlsiQ29tbWVudEZvcm0iLCJQdXJlQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJhcmdzIiwiX2RlZmluZVByb3BlcnR5IiwidGV4dCIsIm9uRmluaXNoIiwidmFsdWVzIiwib25TdWJtaXQiLCJoYW5kbGVDb21tZW50Iiwib2JqZWN0SWQiLCJvYmplY3RUeXBlIiwiY3JlYXRvciIsInByb3BzIiwiZGF0YSIsIl9pZCIsIm1lc3NhZ2UiLCJlcnJvciIsIlJvdXRlciIsInB1c2giLCJjb250ZW50IiwibGVuZ3RoIiwiZm9ybVJlZiIsInJlc2V0RmllbGRzIiwib25FbW9qaUNsaWNrIiwiZW1vamkiLCJzdGF0ZSIsImluc3RhbmNlIiwic2V0RmllbGRzVmFsdWUiLCJnZXRGaWVsZFZhbHVlIiwic2V0U3RhdGUiLCJyZW5kZXIiLCJpc1JlcGx5Iiwic2l0ZU5hbWUiLCJfX2pzeCIsIkZvcm0iLCJyZWYiLCJuYW1lIiwiYmluZCIsImluaXRpYWxWYWx1ZXMiLCJzdHlsZSIsIndpZHRoIiwibWFyZ2luIiwiX19zZWxmIiwiX19zb3VyY2UiLCJmaWxlTmFtZSIsIl9qc3hGaWxlTmFtZSIsImxpbmVOdW1iZXIiLCJjb2x1bW5OdW1iZXIiLCJjbGFzc05hbWUiLCJJdGVtIiwiSW5wdXQiLCJvblByZXNzRW50ZXIiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJzdWJtaXQiLCJkaXNhYmxlZCIsIm1heExlbmd0aCIsIm1pbkxlbmd0aCIsInBsYWNlaG9sZGVyIiwiQXBwQnV0dG9uIiwiZm9udFNpemUiLCJ0eXBlIiwiVmVyaWZpZWRFbWFpbEZvcm0iLCJkeW5hbWljIiwic3NyIiwibG9hZGFibGVHZW5lcmF0ZWQiLCJ3ZWJwYWNrIiwicmVxdWlyZSIsIm1vZHVsZXMiLCJDb21tZW50SXRlbSIsImlzTGlrZWQiLCJpc09wZW5Db21tZW50IiwiaXNGaXJzdExvYWRDb21tZW50Iiwib3BlblZlcmlmaWVkRW1haWxNb2RhbCIsIml0ZW1QZXJQYWdlIiwiY29tbWVudFBhZ2UiLCJ0b3RhbFJlcGx5IiwidG90YWxMaWtlIiwiY29tcG9uZW50RGlkTW91bnQiLCJpdGVtIiwiY3JlYXRlQ29tbWVudCIsImhhbmRsZUNyZWF0ZSIsInVzZXIiLCJ2ZXJpZmllZEVtYWlsIiwib25PcGVuQ29tbWVudCIsImdldENvbW1lbnRzIiwiaGFuZGxlR2V0Q29tbWVudCIsImxpbWl0Iiwib2Zmc2V0IiwibGlrZUNvbW1lbnQiLCJjb21tZW50IiwicmVhY3Rpb25TZXJ2aWNlIiwiY3JlYXRlIiwiYWN0aW9uIiwidW5MaWtlQ29tbWVudCIsImRlbGV0ZSIsIm1vcmVDb21tZW50IiwiaGFuZGxlTG9hZE1vcmUiLCJkZWxldGVDb21tZW50IiwiaGFuZGxlRGVsZXRlIiwid2luZG93IiwiY29uZmlybSIsIl9pdGVtJGNyZWF0b3IiLCJfaXRlbSRjcmVhdG9yMiIsIl9pdGVtJGNyZWF0b3IzIiwiX2l0ZW0kY3JlYXRvcjQiLCJfaXRlbSRjcmVhdG9yNSIsIl9pdGVtJGNyZWF0b3I2IiwiY2FuUmVwbHkiLCJvbkRlbGV0ZSIsImNvbW1lbnRNYXBwaW5nIiwiZmVlZE93bmVySWQiLCJmZXRjaGluZ0NvbW1lbnQiLCJoYXNPd25Qcm9wZXJ0eSIsInJlcXVlc3RpbmciLCJjb21tZW50cyIsIml0ZW1zIiwidG90YWxDb21tZW50cyIsInRvdGFsIiwia2V5Iiwib25DbGljayIsInhtbG5zIiwiaGVpZ2h0Iiwidmlld0JveCIsImZpbGwiLCJpZCIsIm1hc2tVbml0cyIsIngiLCJ5IiwibWFzayIsImQiLCJjbGlwUGF0aCIsImFsdCIsInNyYyIsImF2YXRhciIsIkxpbmsiLCJocmVmIiwicGF0aG5hbWUiLCJxdWVyeSIsInVzZXJuYW1lIiwibW9tZW50IiwiY3JlYXRlZEF0IiwiZnJvbU5vdyIsImNyZWF0ZWRCeSIsIkRyb3Bkb3duIiwib3ZlcmxheSIsIk1lbnUiLCJwcmV2ZW50RGVmYXVsdCIsIk1vcmVPdXRsaW5lZCIsIkxpc3RDb21tZW50cyIsIk1vZGFsIiwidGl0bGUiLCJ2aXNpYmxlIiwiZm9vdGVyIiwiZGVzdHJveU9uQ2xvc2UiLCJvbkNhbmNlbCIsIm1hcFN0YXRlcyIsInVpIiwibWFwRGlzcGF0Y2giLCJjb25uZWN0IiwiY2FuTG9hZG1vcmUiLCJsb2FkTW9yZSIsIlJlYWN0IiwiRnJhZ21lbnQiLCJwYWRkaW5nIiwiSW5maW5pdGVTY3JvbGwiLCJkYXRhTGVuZ3RoIiwiaGFzTW9yZSIsImxvYWRlciIsIm5leHQiLCJlbmRNZXNzYWdlIiwic2Nyb2xsVGhyZXNob2xkIiwic2Nyb2xsYWJsZVRhcmdldCIsIm1hcCIsIlNwaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNzQztBQUd4QjtBQU1tQjtBQUNUO0FBQ29DO0FBVzdDLE1BQU1BLFdBQVcsU0FBU0MsbURBQWEsQ0FBUztFQUFBQyxZQUFBLEdBQUFDLElBQUE7SUFBQSxTQUFBQSxJQUFBO0lBQUFDLGVBQUE7SUFBQUEsZUFBQSxnQkFHckQ7TUFDTkMsSUFBSSxFQUFFO0lBQ1IsQ0FBQztFQUFBO0VBRURDLFFBQVFBLENBQUNDLE1BQXNCLEVBQUU7SUFDL0IsTUFBTTtNQUNKQyxRQUFRLEVBQUVDLGFBQWE7TUFDdkJDLFFBQVE7TUFDUkMsVUFBVTtNQUNWQztJQUNGLENBQUMsR0FBRyxJQUFJLENBQUNDLEtBQUs7SUFDZCxNQUFNQyxJQUFJLEdBQUdQLE1BQU07SUFFbkIsSUFBSSxDQUFDSyxPQUFPLElBQUksQ0FBQ0EsT0FBTyxDQUFDRyxHQUFHLEVBQUU7TUFDNUJDLDRDQUFPLENBQUNDLEtBQUssQ0FBQyxlQUFlLENBQUM7TUFDOUIsT0FBT0Msa0RBQU0sQ0FBQ0MsSUFBSSxDQUFDLEdBQUcs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LFdBQVcsRUFBRUEsV0FBWTtNQUFDSCxRQUFRLEVBQUVBLFFBQVM7TUFBQ1csR0FBRyxFQUFFN0IsT0FBTyxDQUFDN0UsR0FBSTtNQUFDa0UsSUFBSSxFQUFFVyxPQUFRO01BQUNSLElBQUksRUFBRUEsSUFBSztNQUFDMkIsUUFBUSxFQUFFQSxRQUFTO01BQUFwRSxNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsQ0FBRSxDQUFDLENBQUMsRUFDbktvRSxVQUFVLElBQUlsRixLQUFBO01BQUtlLFNBQVMsRUFBQyxhQUFhO01BQUNULEtBQUssRUFBRTtRQUFFRSxNQUFNLEVBQUU7TUFBRyxDQUFFO01BQUFDLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxHQUFDZCxLQUFBLENBQUM4SSx5Q0FBSTtNQUFBckksTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLENBQUUsQ0FBTSxDQUNsRSxDQUNiLENBRVQsQ0FBQztFQUdQO0FBQ0YsQyIsImZpbGUiOiI1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcmVxdWlyZS1kZWZhdWx0LXByb3BzICovXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgRm9ybSwgSW5wdXQsIEJ1dHRvbiwgbWVzc2FnZSwgUG9wb3ZlciwgSW1hZ2Vcbn0gZnJvbSAnYW50ZCc7XG5pbXBvcnQgeyBTZW5kT3V0bGluZWQsIFNtaWxlT3V0bGluZWQgfSBmcm9tICdAYW50LWRlc2lnbi9pY29ucyc7XG5pbXBvcnQgeyBJUGVyZm9ybWVyIH0gZnJvbSAnc3JjL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgRW1vdGlvbnMgfSBmcm9tICdAY29tcG9uZW50cy9tZXNzYWdlcy9lbW90aW9ucyc7XG5pbXBvcnQgeyBGb3JtSW5zdGFuY2UgfSBmcm9tICdhbnRkL2xpYi9mb3JtJztcbmltcG9ydCB7IElDcmVhdGVDb21tZW50IH0gZnJvbSAnc3JjL2ludGVyZmFjZXMvY29tbWVudCc7XG5pbXBvcnQgUm91dGVyIGZyb20gJ25leHQvcm91dGVyJztcbmltcG9ydCAnLi9jb21tZW50Lmxlc3MnO1xuaW1wb3J0IHsgQXBwQnV0dG9uIH0gZnJvbSAnQGNvbXBvbmVudHMvdWkvc2hhcmVkL0FwcEJ1dHRvbic7XG5cbmludGVyZmFjZSBJUHJvcHMge1xuICBvYmplY3RJZDogc3RyaW5nO1xuICBvblN1Ym1pdDogRnVuY3Rpb247XG4gIGNyZWF0b3I6IElQZXJmb3JtZXI7XG4gIG9iamVjdFR5cGU/OiBzdHJpbmc7XG4gIGlzUmVwbHk/OiBib29sZWFuO1xuICBzaXRlTmFtZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbWVudEZvcm0gZXh0ZW5kcyBQdXJlQ29tcG9uZW50PElQcm9wcz4ge1xuICBmb3JtUmVmOiBGb3JtSW5zdGFuY2U7XG5cbiAgc3RhdGUgPSB7XG4gICAgdGV4dDogJydcbiAgfTtcblxuICBvbkZpbmlzaCh2YWx1ZXM6IElDcmVhdGVDb21tZW50KSB7XG4gICAgY29uc3Qge1xuICAgICAgb25TdWJtaXQ6IGhhbmRsZUNvbW1lbnQsXG4gICAgICBvYmplY3RJZCxcbiAgICAgIG9iamVjdFR5cGUsXG4gICAgICBjcmVhdG9yXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZGF0YSA9IHZhbHVlcztcblxuICAgIGlmICghY3JlYXRvciB8fCAhY3JlYXRvci5faWQpIHtcbiAgICAgIG1lc3NhZ2UuZXJyb3IoJ1BsZWFzZSBsb2dpbiEnKTtcbiAgICAgIHJldHVybiBSb3V0ZXIucHVzaCgnLycpO1xuICAgIH1cbiAgICBpZiAoIWRhdGEuY29udGVudCkge1xuICAgICAgcmV0dXJuIG1lc3NhZ2UuZXJyb3IoJ1BsZWFzZSBhZGQgYSBjb21tZW50IScpO1xuICAgIH1cbiAgICBpZiAoZGF0YS5jb250ZW50Lmxlbmd0aCA+IDE1MCkge1xuICAgICAgcmV0dXJuIG1lc3NhZ2UuZXJyb3IoJ0NvbW1lbnQgaXMgb3ZlciAxNTAgY2hhcmFjdGVycycpO1xuICAgIH1cbiAgICBkYXRhLm9iamVjdElkID0gb2JqZWN0SWQ7XG4gICAgZGF0YS5vYmplY3RUeXBlID0gb2JqZWN0VHlwZSB8fCAndmlkZW8nO1xuICAgIHRoaXMuZm9ybVJlZi5yZXNldEZpZWxkcyhbJ2NvbnRlbnQnXSk7XG4gICAgcmV0dXJuIGhhbmRsZUNvbW1lbnQoZGF0YSk7XG4gIH1cblxuICBhc3luYyBvbkVtb2ppQ2xpY2soZW1vamkpIHtcbiAgICBjb25zdCB7IGNyZWF0b3IgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFjcmVhdG9yIHx8ICFjcmVhdG9yLl9pZCkgcmV0dXJuO1xuICAgIGNvbnN0IHsgdGV4dCB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZm9ybVJlZiBhcyBGb3JtSW5zdGFuY2U7XG4gICAgaW5zdGFuY2Uuc2V0RmllbGRzVmFsdWUoe1xuICAgICAgY29udGVudDogYCR7aW5zdGFuY2UuZ2V0RmllbGRWYWx1ZSgnY29udGVudCcpfSAke2Vtb2ppfSBgXG4gICAgfSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHRleHQ6IGAke3RleHR9ICR7ZW1vaml9IGAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY3JlYXRvciwgaXNSZXBseSwgc2l0ZU5hbWUsIG9iamVjdElkXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxGb3JtXG4gICAgICAgIHJlZj17KHJlZikgPT4ge1xuICAgICAgICAgIHRoaXMuZm9ybVJlZiA9IHJlZjtcbiAgICAgICAgfX1cbiAgICAgICAgbmFtZT1cImNvbW1lbnQtZm9ybVwiXG4gICAgICAgIG9uRmluaXNoPXt0aGlzLm9uRmluaXNoLmJpbmQodGhpcyl9XG4gICAgICAgIGluaXRpYWxWYWx1ZXM9e3tcbiAgICAgICAgICBjb250ZW50OiAnJ1xuICAgICAgICB9fVxuICAgICAgICBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBtYXJnaW46ICdhdXRvJ319XG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1zdHJldGNoXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBwYi00XCI+XG4gICAgICAgICAgICA8Rm9ybS5JdGVtIGNsYXNzTmFtZT0nbS0wJyBuYW1lPVwiY29udGVudFwiPlxuICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPSdyb3VuZGVkLWZ1bGwgcC0yJ1xuICAgICAgICAgICAgICAgIG9uUHJlc3NFbnRlcj17KGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnZhbHVlLmxlbmd0aCA8IDIpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybVJlZi5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXshY3JlYXRvciB8fCAhY3JlYXRvci5faWR9XG4gICAgICAgICAgICAgICAgbWF4TGVuZ3RoPXsxNTB9XG4gICAgICAgICAgICAgICAgbWluTGVuZ3RoPXsyfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtcbiAgICAgICAgICAgICAgICAgICFpc1JlcGx5ID8gJ0FkZCBhIGNvbW1lbnQgaGVyZScgOiAnQWRkIGEgcmVwbHkgaGVyZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0Zvcm0uSXRlbT5cbiAgICAgICAgICAgIHsvKiA8UG9wb3ZlclxuICAgICAgICAgICAgICBrZXk9e29iamVjdElkfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSByaWdodC00IG0tYXV0byB0b3AtMCBib3R0b20tMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB6LTEwXCJcbiAgICAgICAgICAgICAgdGl0bGU9e251bGx9XG4gICAgICAgICAgICAgIHRyaWdnZXI9XCJjbGlja1wiXG4gICAgICAgICAgICAgIGNvbnRlbnQ9eyhcbiAgICAgICAgICAgICAgICA8RW1vdGlvbnNcbiAgICAgICAgICAgICAgICAgIG9uRW1vamlDbGljaz17dGhpcy5vbkVtb2ppQ2xpY2suYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgIHNpdGVOYW1lPXtzaXRlTmFtZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdycC1lbW90aW9uc1wiPlxuICAgICAgICAgICAgICAgIDxTbWlsZU91dGxpbmVkIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9Qb3BvdmVyPiAqL31cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8QXBwQnV0dG9uXG4gICAgICAgICAgICBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9eycnfVxuICAgICAgICAgICAgdHlwZT0nc3VibWl0J1xuICAgICAgICAgID5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgeyFpc1JlcGx5ID8gJ1Bvc3QnIDogJ1JlcGx5J31cbiAgICAgICAgICA8L0FwcEJ1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0Zvcm0+XG4gICAgKTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcmVxdWlyZS1kZWZhdWx0LXByb3BzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90b3R5cGUtYnVpbHRpbnMgKi9cbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBNZW51LCBEcm9wZG93biwgbWVzc2FnZSwgSW1hZ2UsIE1vZGFsXG59IGZyb20gJ2FudGQnO1xuaW1wb3J0IHtcbiAgTW9yZU91dGxpbmVkLCBMaWtlT3V0bGluZWQsIERpc2xpa2VPdXRsaW5lZCwgSGVhcnRGaWxsZWRcbn0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMnO1xuaW1wb3J0IHsgcmVhY3Rpb25TZXJ2aWNlIH0gZnJvbSAnQHNlcnZpY2VzL2luZGV4JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgQ29tbWVudEZvcm0gZnJvbSAnQGNvbXBvbmVudHMvY29tbWVudC9jb21tZW50LWZvcm0nO1xuaW1wb3J0IExpc3RDb21tZW50cyBmcm9tICdAY29tcG9uZW50cy9jb21tZW50L2xpc3QtY29tbWVudHMnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5pbXBvcnQge1xuICBnZXRDb21tZW50cywgbW9yZUNvbW1lbnQsIGNyZWF0ZUNvbW1lbnQsIGRlbGV0ZUNvbW1lbnRcbn0gZnJvbSAnQHJlZHV4L2NvbW1lbnQvYWN0aW9ucyc7XG5pbXBvcnQgeyBJQ29tbWVudCwgSVBlcmZvcm1lciB9IGZyb20gJ3NyYy9pbnRlcmZhY2VzL2luZGV4JztcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XG5pbXBvcnQgZHluYW1pYyBmcm9tICduZXh0L2R5bmFtaWMnO1xuXG5jb25zdCBWZXJpZmllZEVtYWlsRm9ybSA9IGR5bmFtaWMoKCkgPT4gaW1wb3J0KCdAY29tcG9uZW50cy9wZXJmb3JtZXIvdmVyaWZpZWQtZW1haWwtZm9ybScpLCB7IHNzcjogZmFsc2UgfSk7XG5cbmludGVyZmFjZSBJUHJvcHMge1xuICBpdGVtOiBJQ29tbWVudDtcbiAgb25EZWxldGU/OiBGdW5jdGlvbjtcbiAgdXNlcj86IElQZXJmb3JtZXI7XG4gIGNhblJlcGx5PzogYm9vbGVhbjtcbiAgZ2V0Q29tbWVudHM6IEZ1bmN0aW9uO1xuICBtb3JlQ29tbWVudDogRnVuY3Rpb247XG4gIGNyZWF0ZUNvbW1lbnQ6IEZ1bmN0aW9uO1xuICBkZWxldGVDb21tZW50OiBGdW5jdGlvbjtcbiAgY29tbWVudE1hcHBpbmc6IGFueTtcbiAgc2l0ZU5hbWU6IHN0cmluZztcbiAgZmVlZE93bmVySWQ/OiBzdHJpbmc7XG59XG5cbmNsYXNzIENvbW1lbnRJdGVtIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxJUHJvcHM+IHtcbiAgc3RhdGUgPSB7XG4gICAgaXNMaWtlZDogZmFsc2UsXG4gICAgaXNPcGVuQ29tbWVudDogZmFsc2UsXG4gICAgaXNGaXJzdExvYWRDb21tZW50OiB0cnVlLFxuICAgIG9wZW5WZXJpZmllZEVtYWlsTW9kYWw6IGZhbHNlLFxuICAgIGl0ZW1QZXJQYWdlOiAxMixcbiAgICBjb21tZW50UGFnZTogMCxcbiAgICBpc1JlcGx5OiBmYWxzZSxcbiAgICB0b3RhbFJlcGx5OiAwLFxuICAgIHRvdGFsTGlrZTogMFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgaXRlbSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoaXRlbSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGlzTGlrZWQ6ICEhaXRlbS5pc0xpa2VkLFxuICAgICAgICB0b3RhbExpa2U6IGl0ZW0udG90YWxMaWtlIHx8IDAsXG4gICAgICAgIHRvdGFsUmVwbHk6IGl0ZW0udG90YWxSZXBseSA/IGl0ZW0udG90YWxSZXBseSA6IDBcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGhhbmRsZUNvbW1lbnQodmFsdWVzKSB7XG4gICAgY29uc3QgeyBjcmVhdGVDb21tZW50OiBoYW5kbGVDcmVhdGUsIHVzZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCF1c2VyLnZlcmlmaWVkRW1haWwpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHsgb3BlblZlcmlmaWVkRW1haWxNb2RhbDogdHJ1ZSB9KTtcbiAgICB9XG4gICAgY29uc3QgeyB0b3RhbFJlcGx5IH0gPSB0aGlzLnN0YXRlO1xuICAgIGhhbmRsZUNyZWF0ZSh2YWx1ZXMpO1xuICAgIGF3YWl0IHRoaXMuc2V0U3RhdGUoeyB0b3RhbFJlcGx5OiB0b3RhbFJlcGx5ICsgMSB9KTtcbiAgICB0aGlzLm9uT3BlbkNvbW1lbnQoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIG9uT3BlbkNvbW1lbnQoKSB7XG4gICAgY29uc3QgeyBpdGVtLCBnZXRDb21tZW50czogaGFuZGxlR2V0Q29tbWVudCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7XG4gICAgICBpc09wZW5Db21tZW50LCBpc0ZpcnN0TG9hZENvbW1lbnQsIGl0ZW1QZXJQYWdlLCBjb21tZW50UGFnZVxuICAgIH0gPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc09wZW5Db21tZW50OiAhaXNPcGVuQ29tbWVudCB9KTtcbiAgICBpZiAoaXNGaXJzdExvYWRDb21tZW50KSB7XG4gICAgICBhd2FpdCB0aGlzLnNldFN0YXRlKHsgaXNGaXJzdExvYWRDb21tZW50OiBmYWxzZSB9KTtcbiAgICAgIGhhbmRsZUdldENvbW1lbnQoe1xuICAgICAgICBvYmplY3RJZDogaXRlbS5faWQsXG4gICAgICAgIG9iamVjdFR5cGU6ICdjb21tZW50JyxcbiAgICAgICAgbGltaXQ6IGl0ZW1QZXJQYWdlLFxuICAgICAgICBvZmZzZXQ6IGNvbW1lbnRQYWdlXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBsaWtlQ29tbWVudChjb21tZW50KSB7XG4gICAgY29uc3QgeyBpc0xpa2VkLCB0b3RhbExpa2UgfSA9IHRoaXMuc3RhdGU7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghaXNMaWtlZCkge1xuICAgICAgICBhd2FpdCByZWFjdGlvblNlcnZpY2UuY3JlYXRlKHtcbiAgICAgICAgICBvYmplY3RJZDogY29tbWVudC5faWQsXG4gICAgICAgICAgYWN0aW9uOiAnbGlrZScsXG4gICAgICAgICAgb2JqZWN0VHlwZTogJ2NvbW1lbnQnXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNMaWtlZDogdHJ1ZSwgdG90YWxMaWtlOiB0b3RhbExpa2UgKyAxIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnN0IGVycm9yID0gYXdhaXQgZTtcbiAgICAgIG1lc3NhZ2UuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCAnRXJyb3Igb2NjdXJlZCwgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlcicpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHVuTGlrZUNvbW1lbnQoY29tbWVudCkge1xuICAgIGNvbnN0IHsgaXNMaWtlZCwgdG90YWxMaWtlIH0gPSB0aGlzLnN0YXRlO1xuICAgIHRyeSB7XG4gICAgICBpZiAoaXNMaWtlZCkge1xuICAgICAgICBhd2FpdCByZWFjdGlvblNlcnZpY2UuZGVsZXRlKHtcbiAgICAgICAgICBvYmplY3RJZDogY29tbWVudC5faWQsXG4gICAgICAgICAgYWN0aW9uOiAnbGlrZScsXG4gICAgICAgICAgb2JqZWN0VHlwZTogJ2NvbW1lbnQnXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNMaWtlZDogZmFsc2UsIHRvdGFsTGlrZTogdG90YWxMaWtlIC0gMSB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zdCBlcnJvciA9IGF3YWl0IGU7XG4gICAgICBtZXNzYWdlLmVycm9yKGVycm9yLm1lc3NhZ2UgfHwgJ0Vycm9yIG9jY3VyZWQsIHBsZWFzZSB0cnkgYWdhaW4gbGF0ZXInKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBtb3JlQ29tbWVudCgpIHtcbiAgICBjb25zdCB7IGl0ZW0sIG1vcmVDb21tZW50OiBoYW5kbGVMb2FkTW9yZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGNvbW1lbnRQYWdlLCBpdGVtUGVyUGFnZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBhd2FpdCB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNvbW1lbnRQYWdlOiBjb21tZW50UGFnZSArIDFcbiAgICB9KTtcbiAgICBoYW5kbGVMb2FkTW9yZSh7XG4gICAgICBsaW1pdDogaXRlbVBlclBhZ2UsXG4gICAgICBvYmplY3RUeXBlOiAnY29tbWVudCcsXG4gICAgICBvZmZzZXQ6IChjb21tZW50UGFnZSArIDEpICogaXRlbVBlclBhZ2UsXG4gICAgICBvYmplY3RJZDogaXRlbS5faWRcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZUNvbW1lbnQoaXRlbSkge1xuICAgIGNvbnN0IHsgZGVsZXRlQ29tbWVudDogaGFuZGxlRGVsZXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghd2luZG93LmNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB0byByZW1vdmUgdGhpcyBjb21tZW50PycpKSByZXR1cm47XG4gICAgaGFuZGxlRGVsZXRlKGl0ZW0uX2lkKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBpdGVtLCB1c2VyLCBjYW5SZXBseSwgb25EZWxldGUsIGNvbW1lbnRNYXBwaW5nLCBzaXRlTmFtZSwgZmVlZE93bmVySWRcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBmZXRjaGluZ0NvbW1lbnQgPSBjb21tZW50TWFwcGluZy5oYXNPd25Qcm9wZXJ0eShpdGVtLl9pZCkgPyBjb21tZW50TWFwcGluZ1tpdGVtLl9pZF0ucmVxdWVzdGluZyA6IGZhbHNlO1xuICAgIGNvbnN0IGNvbW1lbnRzID0gY29tbWVudE1hcHBpbmcuaGFzT3duUHJvcGVydHkoaXRlbS5faWQpID8gY29tbWVudE1hcHBpbmdbaXRlbS5faWRdLml0ZW1zIDogW107XG4gICAgY29uc3QgdG90YWxDb21tZW50cyA9IGNvbW1lbnRNYXBwaW5nLmhhc093blByb3BlcnR5KGl0ZW0uX2lkKSA/IGNvbW1lbnRNYXBwaW5nW2l0ZW0uX2lkXS50b3RhbCA6IDA7XG4gICAgY29uc3Qge1xuICAgICAgaXNMaWtlZCwgaXNPcGVuQ29tbWVudCwgaXNSZXBseSwgdG90YWxSZXBseSwgdG90YWxMaWtlLCBvcGVuVmVyaWZpZWRFbWFpbE1vZGFsXG4gICAgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYi00Jz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbXQtaXRlbVwiIGtleT17aXRlbS5faWR9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5saWtlQ29tbWVudC5iaW5kKHRoaXMsIGl0ZW0pfT5cbiAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwibm9uZVwiPlxuICAgICAgICAgICAgICAgIDxtYXNrIGlkPVwibWFzazBfMzA0N184MjgyMFwiICAgbWFza1VuaXRzPVwidXNlclNwYWNlT25Vc2VcIiB4PVwiMFwiIHk9XCIwXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCI+XG4gICAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiBmaWxsPVwiI0Q5RDlEOVwiLz5cbiAgICAgICAgICAgICAgICA8L21hc2s+XG4gICAgICAgICAgICAgICAgPGcgbWFzaz1cInVybCgjbWFzazBfMzA0N184MjgyMClcIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNyAxN1YxMS4yMDgzSDNMMTAgMkwxNyAxMS4yMDgzSDEzVjE3SDdaTTguNSAxNS41SDExLjVWOS43MDgzM0gxMy45Mzc1TDEwIDQuNDM3NUw2LjA2MjUgOS43MDgzM0g4LjVWMTUuNVpcIiBmaWxsPVwiIzEyMTIxMlwiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgIHt0b3RhbExpa2V9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMudW5MaWtlQ29tbWVudC5iaW5kKHRoaXMsIGl0ZW0pfT5cbiAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwibm9uZVwiPlxuICAgICAgICAgICAgICA8ZyBjbGlwUGF0aD1cInVybCgjY2xpcDBfMzA0N184MjgyMilcIj5cbiAgICAgICAgICAgICAgICA8bWFzayBpZD1cIm1hc2swXzMwNDdfODI4MjJcIiBtYXNrVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiIHg9XCIwXCIgeT1cIjBcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIj5cbiAgICAgICAgICAgICAgICAgIDxyZWN0IHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIGZpbGw9XCIjRDlEOUQ5XCIvPlxuICAgICAgICAgICAgICAgIDwvbWFzaz5cbiAgICAgICAgICAgICAgICA8ZyBtYXNrPVwidXJsKCNtYXNrMF8zMDQ3XzgyODIyKVwiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMyAzLjE2MjExTDEzIDguOTUzNzhMMTcgOC45NTM3OEwxMCAxOC4xNjIxTDMgOC45NTM3N0w3IDguOTUzNzdMNyAzLjE2MjExTDEzIDMuMTYyMTFaTTExLjUgNC42NjIxMUw4LjUgNC42NjIxMUw4LjUgMTAuNDUzOEw2LjA2MjUgMTAuNDUzOEwxMCAxNS43MjQ2TDEzLjkzNzUgMTAuNDUzOEwxMS41IDEwLjQ1MzhMMTEuNSA0LjY2MjExWlwiIGZpbGw9XCIjMTIxMjEyXCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICA8ZGVmcz5cbiAgICAgICAgICAgICAgICA8Y2xpcFBhdGggaWQ9XCJjbGlwMF8zMDQ3XzgyODIyXCI+XG4gICAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiBmaWxsPVwid2hpdGVcIi8+XG4gICAgICAgICAgICAgICAgPC9jbGlwUGF0aD5cbiAgICAgICAgICAgICAgPC9kZWZzPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8aW1nIGFsdD1cImNyZWF0b3ItYXZ0XCIgc3JjPXtpdGVtPy5jcmVhdG9yPy5hdmF0YXIgfHwgJy9zdGF0aWMvbm8tYXZhdGFyLnBuZyd9IGNsYXNzTmFtZT1cImF2YXRhclwiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbXQtY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbXQtdGV4dFwiPlxuICAgICAgICAgICAgICB7aXRlbT8uY3JlYXRvcj8uX2lkID8gKFxuICAgICAgICAgICAgICAgIDxMaW5rXG4gICAgICAgICAgICAgICAgICBocmVmPXt7XG4gICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lOiAnL21vZGVsL3Byb2ZpbGUnLFxuICAgICAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiBpdGVtPy5jcmVhdG9yPy51c2VybmFtZSB8fCBpdGVtPy5jcmVhdG9yPy5faWQgfHwgJ04vQSdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8YSBhcmlhLWhpZGRlbiBocmVmPVwiL21vZGVsL3Byb2ZpbGVcIj5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW0/LmNyZWF0b3I/Lm5hbWUgfHwgaXRlbT8uY3JlYXRvcj8udXNlcm5hbWUgfHwgJ04vQSd9XG4gICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICApIDogPHA+Ti9BPC9wPiB9XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY210LXVzZXJcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNtdC10aW1lXCI+e21vbWVudChpdGVtLmNyZWF0ZWRBdCkuZnJvbU5vdygpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgeyh1c2VyLl9pZCA9PT0gaXRlbS5jcmVhdGVkQnkgfHwgdXNlci5faWQgPT09IGZlZWRPd25lcklkKSAmJiAoXG4gICAgICAgICAgICAgICAgICA8RHJvcGRvd25cbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheT17KFxuICAgICAgICAgICAgICAgICAgICAgIDxNZW51IGtleT17YG1lbnVfY210XyR7aXRlbS5faWR9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVudS5JdGVtIGtleT17YGRlbGV0ZV9jbXRfJHtpdGVtLl9pZH1gfSBvbkNsaWNrPXsoKSA9PiBvbkRlbGV0ZShpdGVtKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxhPlJlcG9ydDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVudS5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnUuSXRlbSBrZXk9e2BkZWxldGVfY210XyR7aXRlbS5faWR9YH0gb25DbGljaz17KCkgPT4gb25EZWxldGUoaXRlbSl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YT5EZWxldGU8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L01lbnUuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICA8L01lbnU+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxhIGFyaWEtaGlkZGVuIGNsYXNzTmFtZT1cImFudC1kcm9wZG93bi1saW5rXCIgb25DbGljaz17KGUpID0+IGUucHJldmVudERlZmF1bHQoKX0+XG4gICAgICAgICAgICAgICAgICAgICAgPE1vcmVPdXRsaW5lZCAvPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNtdC10ZXh0XCI+XG4gICAgICAgICAgICAgIHtpdGVtLmNvbnRlbnR9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY210LWFjdGlvblwiPlxuICAgICAgICAgICAgICB7Y2FuUmVwbHkgJiYgKFxuICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICBhcmlhLWhpZGRlblxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXshaXNSZXBseSA/ICdjbXQtcmVwbHknIDogJ2NtdC1yZXBseSBhY3RpdmUnfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB0aGlzLnNldFN0YXRlKHsgaXNSZXBseTogIWlzUmVwbHkgfSwgKCkgPT4gdGhpcy5vbk9wZW5Db21tZW50KCkpOyB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtgJHt0b3RhbFJlcGx5IHx8ICcnfSBSZXBseWB9XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7aXNPcGVuQ29tbWVudCAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZXBseS1ibC1saXN0XCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8TGlzdENvbW1lbnRzXG4gICAgICAgICAgICAgICAga2V5PXtgbGlzdF9jb21tZW50c18ke2l0ZW0uX2lkfV8ke2NvbW1lbnRzLmxlbmd0aH1gfVxuICAgICAgICAgICAgICAgIHJlcXVlc3Rpbmc9e2ZldGNoaW5nQ29tbWVudH1cbiAgICAgICAgICAgICAgICBjb21tZW50cz17Y29tbWVudHN9XG4gICAgICAgICAgICAgICAgb25EZWxldGU9e3RoaXMuZGVsZXRlQ29tbWVudC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgIHVzZXI9e3VzZXJ9XG4gICAgICAgICAgICAgICAgY2FuUmVwbHk9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIGlzUmVwbHk9e2lzUmVwbHl9XG4gICAgICAgICAgICAgICAgZmVlZE93bmVySWQ9e2ZlZWRPd25lcklkfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICB7Y29tbWVudHMubGVuZ3RoIDwgdG90YWxDb21tZW50cyAmJiAoXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxhIGFyaWEtaGlkZGVuIG9uQ2xpY2s9e3RoaXMubW9yZUNvbW1lbnQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIG1vcmUuLi5cbiAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAgIHtpc1JlcGx5IFxuICAgICAgICAgPyAgPENvbW1lbnRGb3JtXG4gICAgICAgICAgICAgIGNyZWF0b3I9e3VzZXJ9XG4gICAgICAgICAgICAgIG9uU3VibWl0PXt0aGlzLmhhbmRsZUNvbW1lbnQuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgb2JqZWN0SWQ9e2l0ZW0uX2lkfVxuICAgICAgICAgICAgICBvYmplY3RUeXBlPVwiY29tbWVudFwiXG4gICAgICAgICAgICAgIGlzUmVwbHlcbiAgICAgICAgICAgICAgc2l0ZU5hbWU9e3NpdGVOYW1lfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA6IG51bGx9XG4gICAgICAgIDxNb2RhbFxuICAgICAgICAgIGtleT1cInZlcmlmaWVkX2VtYWlsXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJzdWJzY3JpcHRpb24tbW9kYWxcIlxuICAgICAgICAgIHRpdGxlPVwiUGxlYXNlIHZlcmlmeSB5b3VyIGVtYWlsIGFkZHJlc3NcIlxuICAgICAgICAgIHZpc2libGU9e29wZW5WZXJpZmllZEVtYWlsTW9kYWx9XG4gICAgICAgICAgZm9vdGVyPXtudWxsfVxuICAgICAgICAgIGRlc3Ryb3lPbkNsb3NlXG4gICAgICAgICAgb25DYW5jZWw9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBvcGVuVmVyaWZpZWRFbWFpbE1vZGFsOiBmYWxzZSB9KX1cbiAgICAgICAgPlxuICAgICAgICAgIDxWZXJpZmllZEVtYWlsRm9ybSAvPlxuICAgICAgICA8L01vZGFsPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZXMgPSAoc3RhdGU6IGFueSkgPT4ge1xuICBjb25zdCB7IGNvbW1lbnRNYXBwaW5nLCBjb21tZW50IH0gPSBzdGF0ZS5jb21tZW50O1xuXG4gIHJldHVybiB7XG4gICAgY29tbWVudE1hcHBpbmcsXG4gICAgY29tbWVudCxcbiAgICBzaXRlTmFtZTogc3RhdGUudWkuc2l0ZU5hbWVcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoID0ge1xuICBnZXRDb21tZW50cyxcbiAgbW9yZUNvbW1lbnQsXG4gIGNyZWF0ZUNvbW1lbnQsXG4gIGRlbGV0ZUNvbW1lbnRcbn07XG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlcywgbWFwRGlzcGF0Y2gpKENvbW1lbnRJdGVtKTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3JlcXVpcmUtZGVmYXVsdC1wcm9wcyAqL1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFNwaW4gfSBmcm9tICdhbnRkJztcbmltcG9ydCBDb21tZW50SXRlbSBmcm9tICdAY29tcG9uZW50cy9jb21tZW50L2NvbW1lbnQtaXRlbSc7XG5pbXBvcnQgeyBJQ29tbWVudCwgSVBlcmZvcm1lciB9IGZyb20gJ3NyYy9pbnRlcmZhY2VzL2luZGV4JztcbmltcG9ydCBJbmZpbml0ZVNjcm9sbCBmcm9tICdyZWFjdC1pbmZpbml0ZS1zY3JvbGwtY29tcG9uZW50JztcblxuaW50ZXJmYWNlIElQcm9wcyB7XG4gIGNvbW1lbnRzOiBJQ29tbWVudFtdO1xuICByZXF1ZXN0aW5nOiBib29sZWFuO1xuICBvbkRlbGV0ZT86IEZ1bmN0aW9uO1xuICB1c2VyPzogSVBlcmZvcm1lcjtcbiAgY2FuUmVwbHk/OiBib29sZWFuO1xuICBjYW5Mb2FkbW9yZT8gOmJvb2xlYW47XG4gIGxvYWRNb3JlPygpIDpGdW5jdGlvbjtcbiAgaXNSZXBseT8gOmJvb2xlYW47XG4gIGZlZWRPd25lcklkPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0Q29tbWVudHMgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PElQcm9wcz4ge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY29tbWVudHMsIHJlcXVlc3RpbmcsIHVzZXIsIG9uRGVsZXRlLCBjYW5SZXBseSwgY2FuTG9hZG1vcmUsIGxvYWRNb3JlLCBpc1JlcGx5LCBmZWVkT3duZXJJZFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDw+XG4gICAgICAgIHsoIXJlcXVlc3RpbmcgJiYgIWNvbW1lbnRzLmxlbmd0aCkgPyA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCIgc3R5bGU9e3sgcGFkZGluZzogJzVweCcgfX0gLz5cbiAgICAgICAgICA6IChcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJzY3JvbGxhYmxlTW9kYWxcIiBjbGFzc05hbWU9e2lzUmVwbHkgPyAnY210LWxpc3QnIDogJ2NtdC1saXN0IHJlcGx5J30+XG4gICAgICAgICAgICAgIDxJbmZpbml0ZVNjcm9sbFxuICAgICAgICAgICAgICAgIGRhdGFMZW5ndGg9e2NvbW1lbnRzLmxlbmd0aH1cbiAgICAgICAgICAgICAgICBoYXNNb3JlPXtjYW5Mb2FkbW9yZX1cbiAgICAgICAgICAgICAgICBsb2FkZXI9e251bGx9XG4gICAgICAgICAgICAgICAgbmV4dD17bG9hZE1vcmV9XG4gICAgICAgICAgICAgICAgZW5kTWVzc2FnZT17bnVsbH1cbiAgICAgICAgICAgICAgICBzY3JvbGxUaHJlc2hvbGQ9ezAuN31cbiAgICAgICAgICAgICAgICBzY3JvbGxhYmxlVGFyZ2V0PVwic2Nyb2xsYWJsZU1vZGFsXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtjb21tZW50cy5tYXAoKGNvbW1lbnQ6IElDb21tZW50KSA9PiA8Q29tbWVudEl0ZW0gZmVlZE93bmVySWQ9e2ZlZWRPd25lcklkfSBjYW5SZXBseT17Y2FuUmVwbHl9IGtleT17Y29tbWVudC5faWR9IGl0ZW09e2NvbW1lbnR9IHVzZXI9e3VzZXJ9IG9uRGVsZXRlPXtvbkRlbGV0ZX0gLz4pfVxuICAgICAgICAgICAgICAgIHtyZXF1ZXN0aW5nICYmIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIiBzdHlsZT17eyBtYXJnaW46IDIwIH19PjxTcGluIC8+PC9kaXY+fVxuICAgICAgICAgICAgICA8L0luZmluaXRlU2Nyb2xsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgIDwvPlxuXG4gICAgKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==