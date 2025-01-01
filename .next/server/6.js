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

/***/ "./src/components/comment/comment.less":
/*!*********************************************!*\
  !*** ./src/components/comment/comment.less ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jb21tZW50L2NvbW1lbnQtZm9ybS50c3giXSwibmFtZXMiOlsiQ29tbWVudEZvcm0iLCJQdXJlQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJhcmdzIiwiX2RlZmluZVByb3BlcnR5IiwidGV4dCIsIm9uRmluaXNoIiwidmFsdWVzIiwib25TdWJtaXQiLCJoYW5kbGVDb21tZW50Iiwib2JqZWN0SWQiLCJvYmplY3RUeXBlIiwiY3JlYXRvciIsInByb3BzIiwiZGF0YSIsIl9pZCIsIm1lc3NhZ2UiLCJlcnJvciIsIlJvdXRlciIsInB1c2giLCJjb250ZW50IiwibGVuZ3RoIiwiZm9ybVJlZiIsInJlc2V0RmllbGRzIiwib25FbW9qaUNsaWNrIiwiZW1vamkiLCJzdGF0ZSIsImluc3RhbmNlIiwic2V0RmllbGRzVmFsdWUiLCJnZXRGaWVsZFZhbHVlIiwic2V0U3RhdGUiLCJyZW5kZXIiLCJpc1JlcGx5Iiwic2l0ZU5hbWUiLCJfX2pzeCIsIkZvcm0iLCJyZWYiLCJuYW1lIiwiYmluZCIsImluaXRpYWxWYWx1ZXMiLCJzdHlsZSIsIndpZHRoIiwibWFyZ2luIiwiX19zZWxmIiwiX19zb3VyY2UiLCJmaWxlTmFtZSIsIl9qc3hGaWxlTmFtZSIsImxpbmVOdW1iZXIiLCJjb2x1bW5OdW1iZXIiLCJjbGFzc05hbWUiLCJJdGVtIiwiSW5wdXQiLCJvblByZXNzRW50ZXIiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJzdWJtaXQiLCJkaXNhYmxlZCIsIm1heExlbmd0aCIsIm1pbkxlbmd0aCIsInBsYWNlaG9sZGVyIiwiQXBwQnV0dG9uIiwiZm9udFNpemUiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDc0M7QUFHeEI7QUFNbUI7QUFDVDtBQUNvQztBQVc3QyxNQUFNQSxXQUFXLFNBQVNDLG1EQUFhLENBQVM7RUFBQUMsWUFBQSxHQUFBQyxJQUFBO0lBQUEsU0FBQUEsSUFBQTtJQUFBQyxlQUFBO0lBQUFBLGVBQUEsZ0JBR3JEO01BQ05DLElBQUksRUFBRTtJQUNSLENBQUM7RUFBQTtFQUVEQyxRQUFRQSxDQUFDQyxNQUFzQixFQUFFO0lBQy9CLE1BQU07TUFDSkMsUUFBUSxFQUFFQyxhQUFhO01BQ3ZCQyxRQUFRO01BQ1JDLFVBQVU7TUFDVkM7SUFDRixDQUFDLEdBQUcsSUFBSSxDQUFDQyxLQUFLO0lBQ2QsTUFBTUMsSUFBSSxHQUFHUCxNQUFNO0lBRW5CLElBQUksQ0FBQ0ssT0FBTyxJQUFJLENBQUNBLE9BQU8sQ0FBQ0csR0FBRyxFQUFFO01BQzVCQyw0Q0FBTyxDQUFDQyxLQUFLLENBQUMsZUFBZSxDQUFDO01BQzlCLE9BQU9DLGtEQUFNLENBQUNDLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDekI7SUFDQSxJQUFJLENBQUNMLElBQUksQ0FBQ00sT0FBTyxFQUFFO01BQ2pCLE9BQU9KLDRDQUFPLENBQUNDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQztJQUMvQztJQUNBLElBQUlILElBQUksQ0FBQ00sT0FBTyxDQUFDQyxNQUFNLEdBQUcsR0FBRyxFQUFFO01BQzdCLE9BQU9MLDRDQUFPLENBQUNDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQztJQUN4RDtJQUNBSCxJQUFJLENBQUNKLFFBQVEsR0FBR0EsUUFBUTtJQUN4QkksSUFBSSxDQUFDSCxVQUFVLEdBQUdBLFVBQVUsSUFBSSxPQUFPO0lBQ3ZDLElBQUksQ0FBQ1csT0FBTyxDQUFDQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyQyxPQUFPZCxhQUFhLENBQUNLLElBQUksQ0FBQztFQUM1QjtFQUVBLE1BQU1VLFlBQVlBLENBQUNDLEtBQUssRUFBRTtJQUN4QixNQUFNO01BQUViO0lBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQ0MsS0FBSztJQUM5QixJQUFJLENBQUNELE9BQU8sSUFBSSxDQUFDQSxPQUFPLENBQUNHLEdBQUcsRUFBRTtJQUM5QixNQUFNO01BQUVWO0lBQUssQ0FBQyxHQUFHLElBQUksQ0FBQ3FCLEtBQUs7SUFDM0IsTUFBTUMsUUFBUSxHQUFHLElBQUksQ0FBQ0wsT0FBdUI7SUFDN0NLLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDO01BQ3RCUixPQUFPLEVBQUUsR0FBR08sUUFBUSxDQUFDRSxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUlKLEtBQUs7SUFDeEQsQ0FBQyxDQUFDO0lBQ0YsSUFBSSxDQUFDSyxRQUFRLENBQUM7TUFBRXpCLElBQUksRUFBRSxHQUFHQSxJQUFJLElBQUlvQixLQUFLO0lBQUksQ0FBQyxDQUFDO0VBQzlDO0VBRUFNLE1BQU1BLENBQUEsRUFBRztJQUNQLE1BQU07TUFDSm5CLE9BQU87TUFBRW9CLE9BQU87TUFBRUMsUUFBUTtNQUFFdkI7SUFDOUIsQ0FBQyxHQUFHLElBQUksQ0FBQ0csS0FBSztJQUNkLE9BQ0VxQixLQUFBLENBQUNDLHlDQUFJO01BQ0hDLEdBQUcsRUFBR0EsR0FBRyxJQUFLO1FBQ1osSUFBSSxDQUFDZCxPQUFPLEdBQUdjLEdBQUc7TUFDcEIsQ0FBRTtNQUNGQyxJQUFJLEVBQUMsY0FBYztNQUNuQi9CLFFBQVEsRUFBRSxJQUFJLENBQUNBLFFBQVEsQ0FBQ2dDLElBQUksQ0FBQyxJQUFJLENBQUU7TUFDbkNDLGFBQWEsRUFBRTtRQUNibkIsT0FBTyxFQUFFO01BQ1gsQ0FBRTtNQUNGb0IsS0FBSyxFQUFFO1FBQUVDLEtBQUssRUFBRSxNQUFNO1FBQUVDLE1BQU0sRUFBRTtNQUFNLENBQUU7TUFBQUMsTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLEdBRXhDZCxLQUFBO01BQUtlLFNBQVMsRUFBQyw2QkFBNkI7TUFBQU4sTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLEdBQzFDZCxLQUFBO01BQUtlLFNBQVMsRUFBQyxlQUFlO01BQUFOLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxHQUM1QmQsS0FBQSxDQUFDQyx5Q0FBSSxDQUFDZSxJQUFJO01BQUNELFNBQVMsRUFBQyxLQUFLO01BQUNaLElBQUksRUFBQyxTQUFTO01BQUFNLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxHQUN2Q2QsS0FBQSxDQUFDaUIsMENBQUs7TUFDTkYsU0FBUyxFQUFDLGtCQUFrQjtNQUMxQkcsWUFBWSxFQUFHQyxDQUFNLElBQUs7UUFDeEIsSUFBSUEsQ0FBQyxDQUFDQyxNQUFNLENBQUNDLEtBQUssQ0FBQ2xDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDL0IsSUFBSSxDQUFDQyxPQUFPLENBQUNrQyxNQUFNLENBQUMsQ0FBQztNQUN2QixDQUFFO01BQ0ZDLFFBQVEsRUFBRSxDQUFDN0MsT0FBTyxJQUFJLENBQUNBLE9BQU8sQ0FBQ0csR0FBSTtNQUNuQzJDLFNBQVMsRUFBRSxHQUFJO01BQ2ZDLFNBQVMsRUFBRSxDQUFFO01BQ2JDLFdBQVcsRUFDVCxDQUFDNUIsT0FBTyxHQUFHLG9CQUFvQixHQUFHLGtCQUNuQztNQUFBVyxNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsQ0FDRixDQUNRLENBaUJSLENBQUMsRUFDTmQsS0FBQSxDQUFDMkIseUVBQVM7TUFDUnJCLEtBQUssRUFBRTtRQUFFc0IsUUFBUSxFQUFFO01BQU8sQ0FBRTtNQUM1QmIsU0FBUyxFQUFFLEVBQUc7TUFDZGMsSUFBSSxFQUFDLFFBQVE7TUFBQXBCLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxHQUdaLENBQUNoQixPQUFPLEdBQUcsTUFBTSxHQUFHLE9BQ1osQ0FDUixDQUNELENBQUM7RUFFWDtBQUNGLEMiLCJmaWxlIjoiNi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3JlcXVpcmUtZGVmYXVsdC1wcm9wcyAqL1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEZvcm0sIElucHV0LCBCdXR0b24sIG1lc3NhZ2UsIFBvcG92ZXIsIEltYWdlXG59IGZyb20gJ2FudGQnO1xuaW1wb3J0IHsgU2VuZE91dGxpbmVkLCBTbWlsZU91dGxpbmVkIH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMnO1xuaW1wb3J0IHsgSVBlcmZvcm1lciB9IGZyb20gJ3NyYy9pbnRlcmZhY2VzJztcbmltcG9ydCB7IEVtb3Rpb25zIH0gZnJvbSAnQGNvbXBvbmVudHMvbWVzc2FnZXMvZW1vdGlvbnMnO1xuaW1wb3J0IHsgRm9ybUluc3RhbmNlIH0gZnJvbSAnYW50ZC9saWIvZm9ybSc7XG5pbXBvcnQgeyBJQ3JlYXRlQ29tbWVudCB9IGZyb20gJ3NyYy9pbnRlcmZhY2VzL2NvbW1lbnQnO1xuaW1wb3J0IFJvdXRlciBmcm9tICduZXh0L3JvdXRlcic7XG5pbXBvcnQgJy4vY29tbWVudC5sZXNzJztcbmltcG9ydCB7IEFwcEJ1dHRvbiB9IGZyb20gJ0Bjb21wb25lbnRzL3VpL3NoYXJlZC9BcHBCdXR0b24nO1xuXG5pbnRlcmZhY2UgSVByb3BzIHtcbiAgb2JqZWN0SWQ6IHN0cmluZztcbiAgb25TdWJtaXQ6IEZ1bmN0aW9uO1xuICBjcmVhdG9yOiBJUGVyZm9ybWVyO1xuICBvYmplY3RUeXBlPzogc3RyaW5nO1xuICBpc1JlcGx5PzogYm9vbGVhbjtcbiAgc2l0ZU5hbWU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1lbnRGb3JtIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxJUHJvcHM+IHtcbiAgZm9ybVJlZjogRm9ybUluc3RhbmNlO1xuXG4gIHN0YXRlID0ge1xuICAgIHRleHQ6ICcnXG4gIH07XG5cbiAgb25GaW5pc2godmFsdWVzOiBJQ3JlYXRlQ29tbWVudCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uU3VibWl0OiBoYW5kbGVDb21tZW50LFxuICAgICAgb2JqZWN0SWQsXG4gICAgICBvYmplY3RUeXBlLFxuICAgICAgY3JlYXRvclxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGRhdGEgPSB2YWx1ZXM7XG5cbiAgICBpZiAoIWNyZWF0b3IgfHwgIWNyZWF0b3IuX2lkKSB7XG4gICAgICBtZXNzYWdlLmVycm9yKCdQbGVhc2UgbG9naW4hJyk7XG4gICAgICByZXR1cm4gUm91dGVyLnB1c2goJy8nKTtcbiAgICB9XG4gICAgaWYgKCFkYXRhLmNvbnRlbnQpIHtcbiAgICAgIHJldHVybiBtZXNzYWdlLmVycm9yKCdQbGVhc2UgYWRkIGEgY29tbWVudCEnKTtcbiAgICB9XG4gICAgaWYgKGRhdGEuY29udGVudC5sZW5ndGggPiAxNTApIHtcbiAgICAgIHJldHVybiBtZXNzYWdlLmVycm9yKCdDb21tZW50IGlzIG92ZXIgMTUwIGNoYXJhY3RlcnMnKTtcbiAgICB9XG4gICAgZGF0YS5vYmplY3RJZCA9IG9iamVjdElkO1xuICAgIGRhdGEub2JqZWN0VHlwZSA9IG9iamVjdFR5cGUgfHwgJ3ZpZGVvJztcbiAgICB0aGlzLmZvcm1SZWYucmVzZXRGaWVsZHMoWydjb250ZW50J10pO1xuICAgIHJldHVybiBoYW5kbGVDb21tZW50KGRhdGEpO1xuICB9XG5cbiAgYXN5bmMgb25FbW9qaUNsaWNrKGVtb2ppKSB7XG4gICAgY29uc3QgeyBjcmVhdG9yIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghY3JlYXRvciB8fCAhY3JlYXRvci5faWQpIHJldHVybjtcbiAgICBjb25zdCB7IHRleHQgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmZvcm1SZWYgYXMgRm9ybUluc3RhbmNlO1xuICAgIGluc3RhbmNlLnNldEZpZWxkc1ZhbHVlKHtcbiAgICAgIGNvbnRlbnQ6IGAke2luc3RhbmNlLmdldEZpZWxkVmFsdWUoJ2NvbnRlbnQnKX0gJHtlbW9qaX0gYFxuICAgIH0pO1xuICAgIHRoaXMuc2V0U3RhdGUoeyB0ZXh0OiBgJHt0ZXh0fSAke2Vtb2ppfSBgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNyZWF0b3IsIGlzUmVwbHksIHNpdGVOYW1lLCBvYmplY3RJZFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8Rm9ybVxuICAgICAgICByZWY9eyhyZWYpID0+IHtcbiAgICAgICAgICB0aGlzLmZvcm1SZWYgPSByZWY7XG4gICAgICAgIH19XG4gICAgICAgIG5hbWU9XCJjb21tZW50LWZvcm1cIlxuICAgICAgICBvbkZpbmlzaD17dGhpcy5vbkZpbmlzaC5iaW5kKHRoaXMpfVxuICAgICAgICBpbml0aWFsVmFsdWVzPXt7XG4gICAgICAgICAgY29udGVudDogJydcbiAgICAgICAgfX1cbiAgICAgICAgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgbWFyZ2luOiAnYXV0byd9fVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtc3RyZXRjaFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgcGItNFwiPlxuICAgICAgICAgICAgPEZvcm0uSXRlbSBjbGFzc05hbWU9J20tMCcgbmFtZT1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT0ncm91bmRlZC1mdWxsIHAtMidcbiAgICAgICAgICAgICAgICBvblByZXNzRW50ZXI9eyhlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC52YWx1ZS5sZW5ndGggPCAyKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICB0aGlzLmZvcm1SZWYuc3VibWl0KCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWNyZWF0b3IgfHwgIWNyZWF0b3IuX2lkfVxuICAgICAgICAgICAgICAgIG1heExlbmd0aD17MTUwfVxuICAgICAgICAgICAgICAgIG1pbkxlbmd0aD17Mn1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17XG4gICAgICAgICAgICAgICAgICAhaXNSZXBseSA/ICdBZGQgYSBjb21tZW50IGhlcmUnIDogJ0FkZCBhIHJlcGx5IGhlcmUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Gb3JtLkl0ZW0+XG4gICAgICAgICAgICB7LyogPFBvcG92ZXJcbiAgICAgICAgICAgICAga2V5PXtvYmplY3RJZH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcmlnaHQtNCBtLWF1dG8gdG9wLTAgYm90dG9tLTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgei0xMFwiXG4gICAgICAgICAgICAgIHRpdGxlPXtudWxsfVxuICAgICAgICAgICAgICB0cmlnZ2VyPVwiY2xpY2tcIlxuICAgICAgICAgICAgICBjb250ZW50PXsoXG4gICAgICAgICAgICAgICAgPEVtb3Rpb25zXG4gICAgICAgICAgICAgICAgICBvbkVtb2ppQ2xpY2s9e3RoaXMub25FbW9qaUNsaWNrLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICBzaXRlTmFtZT17c2l0ZU5hbWV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncnAtZW1vdGlvbnNcIj5cbiAgICAgICAgICAgICAgICA8U21pbGVPdXRsaW5lZCAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvUG9wb3Zlcj4gKi99XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPEFwcEJ1dHRvblxuICAgICAgICAgICAgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JyB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPXsnJ31cbiAgICAgICAgICAgIHR5cGU9J3N1Ym1pdCdcbiAgICAgICAgICA+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHshaXNSZXBseSA/ICdQb3N0JyA6ICdSZXBseSd9XG4gICAgICAgICAgPC9BcHBCdXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9Gb3JtPlxuICAgICk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=