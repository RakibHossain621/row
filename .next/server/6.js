exports.ids = [6];
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

/***/ "./src/components/comment/comment.less":
/*!*********************************************!*\
  !*** ./src/components/comment/comment.less ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jb21tZW50L2NvbW1lbnQtZm9ybS50c3giXSwibmFtZXMiOlsiQ29tbWVudEZvcm0iLCJQdXJlQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJhcmdzIiwiX2RlZmluZVByb3BlcnR5IiwidGV4dCIsIm9uRmluaXNoIiwidmFsdWVzIiwib25TdWJtaXQiLCJoYW5kbGVDb21tZW50Iiwib2JqZWN0SWQiLCJvYmplY3RUeXBlIiwiY3JlYXRvciIsInByb3BzIiwiZGF0YSIsIl9pZCIsIm1lc3NhZ2UiLCJlcnJvciIsIlJvdXRlciIsInB1c2giLCJjb250ZW50IiwibGVuZ3RoIiwiZm9ybVJlZiIsInJlc2V0RmllbGRzIiwib25FbW9qaUNsaWNrIiwiZW1vamkiLCJzdGF0ZSIsImluc3RhbmNlIiwic2V0RmllbGRzVmFsdWUiLCJnZXRGaWVsZFZhbHVlIiwic2V0U3RhdGUiLCJyZW5kZXIiLCJpc1JlcGx5Iiwic2l0ZU5hbWUiLCJfX2pzeCIsIkZvcm0iLCJyZWYiLCJuYW1lIiwiYmluZCIsImluaXRpYWxWYWx1ZXMiLCJzdHlsZSIsIndpZHRoIiwibWFyZ2luIiwiX19zZWxmIiwiX19zb3VyY2UiLCJmaWxlTmFtZSIsIl9qc3hGaWxlTmFtZSIsImxpbmVOdW1iZXIiLCJjb2x1bW5OdW1iZXIiLCJjbGFzc05hbWUiLCJJdGVtIiwiSW5wdXQiLCJvblByZXNzRW50ZXIiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJzdWJtaXQiLCJkaXNhYmxlZCIsIm1heExlbmd0aCIsIm1pbkxlbmd0aCIsInBsYWNlaG9sZGVyIiwiQXBwQnV0dG9uIiwiZm9udFNpemUiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDc0M7QUFHeEI7QUFNbUI7QUFDVDtBQUNvQztBQVc3QyxNQUFNQSxXQUFXLFNBQVNDLG1EQUFhLENBQVM7RUFBQUMsWUFBQSxHQUFBQyxJQUFBO0lBQUEsU0FB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cyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3JlcXVpcmUtZGVmYXVsdC1wcm9wcyAqL1xyXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1xyXG4gIEZvcm0sIElucHV0LCBCdXR0b24sIG1lc3NhZ2UsIFBvcG92ZXIsIEltYWdlXHJcbn0gZnJvbSAnYW50ZCc7XHJcbmltcG9ydCB7IFNlbmRPdXRsaW5lZCwgU21pbGVPdXRsaW5lZCB9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zJztcclxuaW1wb3J0IHsgSVBlcmZvcm1lciB9IGZyb20gJ3NyYy9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRW1vdGlvbnMgfSBmcm9tICdAY29tcG9uZW50cy9tZXNzYWdlcy9lbW90aW9ucyc7XHJcbmltcG9ydCB7IEZvcm1JbnN0YW5jZSB9IGZyb20gJ2FudGQvbGliL2Zvcm0nO1xyXG5pbXBvcnQgeyBJQ3JlYXRlQ29tbWVudCB9IGZyb20gJ3NyYy9pbnRlcmZhY2VzL2NvbW1lbnQnO1xyXG5pbXBvcnQgUm91dGVyIGZyb20gJ25leHQvcm91dGVyJztcclxuaW1wb3J0ICcuL2NvbW1lbnQubGVzcyc7XHJcbmltcG9ydCB7IEFwcEJ1dHRvbiB9IGZyb20gJ0Bjb21wb25lbnRzL3VpL3NoYXJlZC9BcHBCdXR0b24nO1xyXG5cclxuaW50ZXJmYWNlIElQcm9wcyB7XHJcbiAgb2JqZWN0SWQ6IHN0cmluZztcclxuICBvblN1Ym1pdDogRnVuY3Rpb247XHJcbiAgY3JlYXRvcjogSVBlcmZvcm1lcjtcclxuICBvYmplY3RUeXBlPzogc3RyaW5nO1xyXG4gIGlzUmVwbHk/OiBib29sZWFuO1xyXG4gIHNpdGVOYW1lPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tZW50Rm9ybSBleHRlbmRzIFB1cmVDb21wb25lbnQ8SVByb3BzPiB7XHJcbiAgZm9ybVJlZjogRm9ybUluc3RhbmNlO1xyXG5cclxuICBzdGF0ZSA9IHtcclxuICAgIHRleHQ6ICcnXHJcbiAgfTtcclxuXHJcbiAgb25GaW5pc2godmFsdWVzOiBJQ3JlYXRlQ29tbWVudCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBvblN1Ym1pdDogaGFuZGxlQ29tbWVudCxcclxuICAgICAgb2JqZWN0SWQsXHJcbiAgICAgIG9iamVjdFR5cGUsXHJcbiAgICAgIGNyZWF0b3JcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgZGF0YSA9IHZhbHVlcztcclxuXHJcbiAgICBpZiAoIWNyZWF0b3IgfHwgIWNyZWF0b3IuX2lkKSB7XHJcbiAgICAgIG1lc3NhZ2UuZXJyb3IoJ1BsZWFzZSBsb2dpbiEnKTtcclxuICAgICAgcmV0dXJuIFJvdXRlci5wdXNoKCcvJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWRhdGEuY29udGVudCkge1xyXG4gICAgICByZXR1cm4gbWVzc2FnZS5lcnJvcignUGxlYXNlIGFkZCBhIGNvbW1lbnQhJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoZGF0YS5jb250ZW50Lmxlbmd0aCA+IDE1MCkge1xyXG4gICAgICByZXR1cm4gbWVzc2FnZS5lcnJvcignQ29tbWVudCBpcyBvdmVyIDE1MCBjaGFyYWN0ZXJzJyk7XHJcbiAgICB9XHJcbiAgICBkYXRhLm9iamVjdElkID0gb2JqZWN0SWQ7XHJcbiAgICBkYXRhLm9iamVjdFR5cGUgPSBvYmplY3RUeXBlIHx8ICd2aWRlbyc7XHJcbiAgICB0aGlzLmZvcm1SZWYucmVzZXRGaWVsZHMoWydjb250ZW50J10pO1xyXG4gICAgcmV0dXJuIGhhbmRsZUNvbW1lbnQoZGF0YSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBvbkVtb2ppQ2xpY2soZW1vamkpIHtcclxuICAgIGNvbnN0IHsgY3JlYXRvciB9ID0gdGhpcy5wcm9wcztcclxuICAgIGlmICghY3JlYXRvciB8fCAhY3JlYXRvci5faWQpIHJldHVybjtcclxuICAgIGNvbnN0IHsgdGV4dCB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5mb3JtUmVmIGFzIEZvcm1JbnN0YW5jZTtcclxuICAgIGluc3RhbmNlLnNldEZpZWxkc1ZhbHVlKHtcclxuICAgICAgY29udGVudDogYCR7aW5zdGFuY2UuZ2V0RmllbGRWYWx1ZSgnY29udGVudCcpfSAke2Vtb2ppfSBgXHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyB0ZXh0OiBgJHt0ZXh0fSAke2Vtb2ppfSBgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjcmVhdG9yLCBpc1JlcGx5LCBzaXRlTmFtZSwgb2JqZWN0SWRcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEZvcm1cclxuICAgICAgICByZWY9eyhyZWYpID0+IHtcclxuICAgICAgICAgIHRoaXMuZm9ybVJlZiA9IHJlZjtcclxuICAgICAgICB9fVxyXG4gICAgICAgIG5hbWU9XCJjb21tZW50LWZvcm1cIlxyXG4gICAgICAgIG9uRmluaXNoPXt0aGlzLm9uRmluaXNoLmJpbmQodGhpcyl9XHJcbiAgICAgICAgaW5pdGlhbFZhbHVlcz17e1xyXG4gICAgICAgICAgY29udGVudDogJydcclxuICAgICAgICB9fVxyXG4gICAgICAgIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIG1hcmdpbjogJ2F1dG8nfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1zdHJldGNoXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHBiLTRcIj5cclxuICAgICAgICAgICAgPEZvcm0uSXRlbSBjbGFzc05hbWU9J20tMCcgbmFtZT1cImNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9J3JvdW5kZWQtZnVsbCBwLTInXHJcbiAgICAgICAgICAgICAgICBvblByZXNzRW50ZXI9eyhlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnZhbHVlLmxlbmd0aCA8IDIpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtUmVmLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXshY3JlYXRvciB8fCAhY3JlYXRvci5faWR9XHJcbiAgICAgICAgICAgICAgICBtYXhMZW5ndGg9ezE1MH1cclxuICAgICAgICAgICAgICAgIG1pbkxlbmd0aD17Mn1cclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtcclxuICAgICAgICAgICAgICAgICAgIWlzUmVwbHkgPyAnQWRkIGEgY29tbWVudCBoZXJlJyA6ICdBZGQgYSByZXBseSBoZXJlJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvRm9ybS5JdGVtPlxyXG4gICAgICAgICAgICB7LyogPFBvcG92ZXJcclxuICAgICAgICAgICAgICBrZXk9e29iamVjdElkfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHJpZ2h0LTQgbS1hdXRvIHRvcC0wIGJvdHRvbS0wIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHotMTBcIlxyXG4gICAgICAgICAgICAgIHRpdGxlPXtudWxsfVxyXG4gICAgICAgICAgICAgIHRyaWdnZXI9XCJjbGlja1wiXHJcbiAgICAgICAgICAgICAgY29udGVudD17KFxyXG4gICAgICAgICAgICAgICAgPEVtb3Rpb25zXHJcbiAgICAgICAgICAgICAgICAgIG9uRW1vamlDbGljaz17dGhpcy5vbkVtb2ppQ2xpY2suYmluZCh0aGlzKX1cclxuICAgICAgICAgICAgICAgICAgc2l0ZU5hbWU9e3NpdGVOYW1lfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncnAtZW1vdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgIDxTbWlsZU91dGxpbmVkIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvUG9wb3Zlcj4gKi99XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxBcHBCdXR0b25cclxuICAgICAgICAgICAgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JyB9fVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9eycnfVxyXG4gICAgICAgICAgICB0eXBlPSdzdWJtaXQnXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB7IWlzUmVwbHkgPyAnUG9zdCcgOiAnUmVwbHknfVxyXG4gICAgICAgICAgPC9BcHBCdXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvRm9ybT5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=