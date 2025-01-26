exports.ids = [3];
exports.modules = {

/***/ "./src/components/performer/verified-email-form.tsx":
/*!**********************************************************!*\
  !*** ./src/components/performer/verified-email-form.tsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lib/message */ "./src/lib/message.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @services/auth.service */ "./src/services/auth.service.ts");
/* harmony import */ var src_redux_user_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/redux/user/actions */ "./src/redux/user/actions.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
var _jsxFileName = "C:\\Users\\roman\\Pictures\\Case\\row\\src\\components\\performer\\verified-email-form.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }








const layout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
};
class VerifiedEmailForm extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "state", {
      countTime: 60
    });
    _defineProperty(this, "_intervalCountdown", void 0);
    _defineProperty(this, "formRef", void 0);
    _defineProperty(this, "handleCountdown", async () => {
      const {
        countTime
      } = this.state;
      this.setState({
        countTime: countTime - 1
      });
      this._intervalCountdown = setInterval(this.coundown.bind(this), 1000);
    });
  }
  async onVerifyEmail() {
    const {
      user
    } = this.props;
    try {
      const resp = await _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["authService"].verifyEmail({
        sourceType: 'user',
        source: user
      });
      this.handleCountdown();
      resp.data && resp.data.message && antd__WEBPACK_IMPORTED_MODULE_1__["message"].success(resp.data.message);
    } catch (e) {
      const error = await e;
      antd__WEBPACK_IMPORTED_MODULE_1__["message"].success((error === null || error === void 0 ? void 0 : error.message) || 'An error occured, please try again later');
    }
  }
  coundown() {
    const {
      countTime
    } = this.state;
    if (countTime === 0) {
      this.setState({
        countTime: 60
      });
      clearInterval(this._intervalCountdown);
      return null;
    }
    return this.setState({
      countTime: countTime - 1
    });
  }

  // async submit(data: any) {
  // const { user, updatePerformer: handleUpdatePerformer } = this.props;
  // handleUpdatePerformer({
  //   ...user,
  //   ...data,
  //   isUpdateProfile: true
  // });
  // }

  render() {
    const {
      user,
      updating
    } = this.props;
    const {
      countTime
    } = this.state;
    if (!this.formRef) this.formRef = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createRef"])();
    return __jsx("div", {
      className: "confirm-subscription-form",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 87,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: "info-body",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 88,
        columnNumber: 9
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Form"], _extends({}, layout, {
      name: "nest-messages",
      validateMessages: _lib_message__WEBPACK_IMPORTED_MODULE_3__["validateMessages"],
      initialValues: _objectSpread(_objectSpread({}, user), {}, {
        dateOfBirth: user.dateOfBirth && moment__WEBPACK_IMPORTED_MODULE_2___default()(user.dateOfBirth) || ''
      }),
      scrollToFirstError: true,
      className: "account-form",
      ref: ref => {
        this.formRef = ref;
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 89,
        columnNumber: 11
      }
    }), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Row"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 101,
        columnNumber: 13
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Col"], {
      lg: 24,
      md: 24,
      xs: 24,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 102,
        columnNumber: 15
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, {
      name: "email",
      label: __jsx("span", {
        style: {
          fontSize: 10
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 106,
          columnNumber: 21
        }
      }, "Email Address", '  ', user.verifiedEmail ? __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Popover"], {
        title: "Your email address is verified",
        content: null,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 110,
          columnNumber: 25
        }
      }, __jsx("span", {
        className: "success-color",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 111,
          columnNumber: 27
        }
      }, "Verified!")) : __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Popover"], {
        content: null,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114,
          columnNumber: 25
        }
      }, __jsx("span", {
        className: "error-color",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 117,
          columnNumber: 27
        }
      }, "Not verified!"))),
      rules: [{
        type: 'email'
      }, {
        required: true,
        message: 'Please input your email address!'
      }],
      hasFeedback: true,
      validateTrigger: ['onChange', 'onBlur'],
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 103,
        columnNumber: 17
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Input"], {
      disabled: true,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 126,
        columnNumber: 19
      }
    })))), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, {
      wrapperCol: _objectSpread({}, layout.wrapperCol),
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 130,
        columnNumber: 13
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      type: "primary",
      className: "primary",
      onClick: () => this.onVerifyEmail(),
      disabled: updating || countTime < 60,
      loading: updating || countTime < 60,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 131,
        columnNumber: 15
      }
    }, countTime < 60 ? 'Resend' : 'Send', ' ', "verification email", ' ', countTime < 60 && `${countTime}s`), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      type: "primary",
      className: "primary",
      onClick: () => next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push('/model/account'),
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 144,
        columnNumber: 15
      }
    }, "Change email")))));
  }
}
const mapStates = state => ({
  updating: state.user.updating,
  user: state.user.current
});
const mapDispatch = {
  updatePerformer: src_redux_user_actions__WEBPACK_IMPORTED_MODULE_5__["updatePerformer"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_6__["connect"])(mapStates, mapDispatch)(VerifiedEmailForm));

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

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wZXJmb3JtZXIvdmVyaWZpZWQtZW1haWwtZm9ybS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9tZXNzYWdlLnRzIl0sIm5hbWVzIjpbImxheW91dCIsImxhYmVsQ29sIiwic3BhbiIsIndyYXBwZXJDb2wiLCJWZXJpZmllZEVtYWlsRm9ybSIsIlB1cmVDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsImFyZ3MiLCJfZGVmaW5lUHJvcGVydHkiLCJjb3VudFRpbWUiLCJzdGF0ZSIsInNldFN0YXRlIiwiX2ludGVydmFsQ291bnRkb3duIiwic2V0SW50ZXJ2YWwiLCJjb3VuZG93biIsImJpbmQiLCJvblZlcmlmeUVtYWlsIiwidXNlciIsInByb3BzIiwicmVzcCIsImF1dGhTZXJ2aWNlIiwidmVyaWZ5RW1haWwiLCJzb3VyY2VUeXBlIiwic291cmNlIiwiaGFuZGxlQ291bnRkb3duIiwiZGF0YSIsIm1lc3NhZ2UiLCJzdWNjZXNzIiwiZSIsImVycm9yIiwiY2xlYXJJbnRlcnZhbCIsInJlbmRlciIsInVwZGF0aW5nIiwiZm9ybVJlZiIsImNyZWF0ZVJlZiIsIl9fanN4IiwiY2xhc3NOYW1lIiwiX19zZWxmIiwiX19zb3VyY2UiLCJmaWxlTmFtZSIsIl9qc3hGaWxlTmFtZSIsImxpbmVOdW1iZXIiLCJjb2x1bW5OdW1iZXIiLCJGb3JtIiwiX2V4dGVuZHMiLCJuYW1lIiwidmFsaWRhdGVNZXNzYWdlcyIsImluaXRpYWxWYWx1ZXMiLCJfb2JqZWN0U3ByZWFkIiwiZGF0ZU9mQmlydGgiLCJtb21lbnQiLCJzY3JvbGxUb0ZpcnN0RXJyb3IiLCJyZWYiLCJSb3ciLCJDb2wiLCJsZyIsIm1kIiwieHMiLCJJdGVtIiwibGFiZWwiLCJzdHlsZSIsImZvbnRTaXplIiwidmVyaWZpZWRFbWFpbCIsIlBvcG92ZXIiLCJ0aXRsZSIsImNvbnRlbnQiLCJydWxlcyIsInR5cGUiLCJyZXF1aXJlZCIsImhhc0ZlZWRiYWNrIiwidmFsaWRhdGVUcmlnZ2VyIiwiSW5wdXQiLCJkaXNhYmxlZCIsIkJ1dHRvbiIsIm9uQ2xpY2siLCJsb2FkaW5nIiwiUm91dGVyIiwicHVzaCIsIm1hcFN0YXRlcyIsImN1cnJlbnQiLCJtYXBEaXNwYXRjaCIsInVwZGF0ZVBlcmZvcm1lciIsImNvbm5lY3QiLCJ0eXBlcyIsImVtYWlsIiwibnVtYmVyIiwicmFuZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBaUQ7QUFHbkM7QUFFYztBQUNvQjtBQUNLO0FBR3JCO0FBQ007QUFDTDtBQUVqQyxNQUFNQSxNQUFNLEdBQUc7RUFDYkMsUUFBUSxFQUFFO0lBQUVDLElBQUksRUFBRTtFQUFHLENBQUM7RUFDdEJDLFVBQVUsRUFBRTtJQUFFRCxJQUFJLEVBQUU7RUFBRztBQUN6QixDQUFDO0FBUUQsTUFBTUUsaUJBQWlCLFNBQVNDLG1EQUFhLENBQVM7RUFBQUMsWUFBQSxHQUFBQyxJQUFBO0lBQUEsU0FBQUEsSUFBQTtJQUFBQyxlQUFBLGdCQUM1QztNQUNOQyxTQUFTLEVBQUU7SUFFYixDQUFDO0lBQUFELGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBLDBCQU1pQixZQUFZO01BQzVCLE1BQU07UUFBRUM7TUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDQyxLQUFLO01BQ2hDLElBQUksQ0FBQ0MsUUFBUSxDQUFDO1FBQUVGLFNBQVMsRUFBRUEsU0FBUyxHQUFHO01BQUUsQ0FBQyxDQUFDO01BQzNDLElBQUksQ0FBQ0csa0JBQWtCLEdBQUdDLFdBQVcsQ0FBQyxJQUFJLENBQUNDLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQztJQUN2RSxDQUFDO0VBQUE7RUFFRCxNQUFNQyxhQUFhQSxDQUFBLEVBQUc7SUFDcEIsTUFBTTtNQUFFQztJQUFLLENBQUMsR0FBRyxJQUFJLENBQUNDLEtBQUs7SUFDM0IsSUFBSTtNQUNGLE1BQU1DLElBQUksR0FBRyxNQUFNQyxrRUFBVyxDQUFDQyxX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LElBQUksRUFBQyxTQUFTO01BQ2QvQixTQUFTLEVBQUMsU0FBUztNQUNuQnNDLE9BQU8sRUFBRUEsQ0FBQSxLQUFNRSxrREFBTSxDQUFDQyxJQUFJLENBQUMsZ0JBQWdCLENBQUU7TUFBQXhDLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxHQUM5QyxjQUVPLENBQ0MsQ0FDUCxDQUNILENBQ0YsQ0FBQztFQUVWO0FBQ0Y7QUFFQSxNQUFNb0MsU0FBUyxHQUFJcEUsS0FBVSxLQUFNO0VBQ2pDc0IsUUFBUSxFQUFFdEIsS0FBSyxDQUFDTyxJQUFJLENBQUNlLFFBQVE7RUFDN0JmLElBQUksRUFBRVAsS0FBSyxDQUFDTyxJQUFJLENBQUM4RDtBQUNuQixDQUFDLENBQUM7QUFFRixNQUFNQyxXQUFXLEdBQUc7RUFDbEJDLHVGQUFlQTtBQUVqQixDQUFDO0FBQ2NDLDBIQUFPLENBQUNKLFNBQVMsRUFBRUUsV0FBVyxDQUFDLENBQUM1RSxpQkFBaUIsQ0FBQyxFOzs7Ozs7Ozs7Ozs7QUN2S2pFO0FBQUE7QUFBQTtBQUNPLE1BQU0wQyxnQkFBZ0IsR0FBRztFQUM5QnNCLFFBQVEsRUFBRSx5QkFBeUI7RUFDbkNlLEtBQUssRUFBRTtJQUNMQyxLQUFLLEVBQUUsdUJBQXVCO0lBQzlCQyxNQUFNLEVBQUU7RUFDVixDQUFDO0VBQ0RBLE1BQU0sRUFBRTtJQUNOQyxLQUFLLEVBQUU7RUFDVDtBQUNGLENBQUMsQyIsImZpbGUiOiIzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHVyZUNvbXBvbmVudCwgY3JlYXRlUmVmIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1xyXG4gIElucHV0LCBCdXR0b24sIEZvcm0sIFBvcG92ZXIsIG1lc3NhZ2UsIENvbCwgUm93XHJcbn0gZnJvbSAnYW50ZCc7XHJcbmltcG9ydCB7IElVc2VyIH0gZnJvbSAnQGludGVyZmFjZXMvaW5kZXgnO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCB7IHZhbGlkYXRlTWVzc2FnZXMgfSBmcm9tICdAbGliL21lc3NhZ2UnO1xyXG5pbXBvcnQgeyBhdXRoU2VydmljZSB9IGZyb20gJ0BzZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQge1xyXG4gIHVwZGF0ZVBlcmZvcm1lclxyXG59IGZyb20gJ3NyYy9yZWR1eC91c2VyL2FjdGlvbnMnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgUm91dGVyIGZyb20gJ25leHQvcm91dGVyJztcclxuXHJcbmNvbnN0IGxheW91dCA9IHtcclxuICBsYWJlbENvbDogeyBzcGFuOiAyNCB9LFxyXG4gIHdyYXBwZXJDb2w6IHsgc3BhbjogMjQgfVxyXG59O1xyXG5cclxuaW50ZXJmYWNlIElQcm9wcyB7XHJcbiAgdXBkYXRpbmc6IGJvb2xlYW47XHJcbiAgdXNlcjpJVXNlclxyXG4gIHVwZGF0ZVBlcmZvcm1lcjpGdW5jdGlvblxyXG59XHJcblxyXG5jbGFzcyBWZXJpZmllZEVtYWlsRm9ybSBleHRlbmRzIFB1cmVDb21wb25lbnQ8SVByb3BzPiB7XHJcbiAgc3RhdGUgPSB7XHJcbiAgICBjb3VudFRpbWU6IDYwXHJcblxyXG4gIH1cclxuXHJcbiAgX2ludGVydmFsQ291bnRkb3duOiBhbnk7XHJcblxyXG4gIGZvcm1SZWY6IGFueTtcclxuXHJcbiAgaGFuZGxlQ291bnRkb3duID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgeyBjb3VudFRpbWUgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgY291bnRUaW1lOiBjb3VudFRpbWUgLSAxIH0pO1xyXG4gICAgdGhpcy5faW50ZXJ2YWxDb3VudGRvd24gPSBzZXRJbnRlcnZhbCh0aGlzLmNvdW5kb3duLmJpbmQodGhpcyksIDEwMDApO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgb25WZXJpZnlFbWFpbCgpIHtcclxuICAgIGNvbnN0IHsgdXNlciB9ID0gdGhpcy5wcm9wcztcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBhdXRoU2VydmljZS52ZXJpZnlFbWFpbCh7XHJcbiAgICAgICAgc291cmNlVHlwZTogJ3VzZXInLFxyXG4gICAgICAgIHNvdXJjZTogdXNlclxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5oYW5kbGVDb3VudGRvd24oKTtcclxuICAgICAgcmVzcC5kYXRhICYmIHJlc3AuZGF0YS5tZXNzYWdlICYmIG1lc3NhZ2Uuc3VjY2VzcyhyZXNwLmRhdGEubWVzc2FnZSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yID0gYXdhaXQgZTtcclxuICAgICAgbWVzc2FnZS5zdWNjZXNzKGVycm9yPy5tZXNzYWdlIHx8ICdBbiBlcnJvciBvY2N1cmVkLCBwbGVhc2UgdHJ5IGFnYWluIGxhdGVyJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb3VuZG93bigpIHtcclxuICAgIGNvbnN0IHsgY291bnRUaW1lIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgaWYgKGNvdW50VGltZSA9PT0gMCkge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgY291bnRUaW1lOiA2MCB9KTtcclxuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbENvdW50ZG93bik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHsgY291bnRUaW1lOiBjb3VudFRpbWUgLSAxIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gYXN5bmMgc3VibWl0KGRhdGE6IGFueSkge1xyXG4gIC8vIGNvbnN0IHsgdXNlciwgdXBkYXRlUGVyZm9ybWVyOiBoYW5kbGVVcGRhdGVQZXJmb3JtZXIgfSA9IHRoaXMucHJvcHM7XHJcbiAgLy8gaGFuZGxlVXBkYXRlUGVyZm9ybWVyKHtcclxuICAvLyAgIC4uLnVzZXIsXHJcbiAgLy8gICAuLi5kYXRhLFxyXG4gIC8vICAgaXNVcGRhdGVQcm9maWxlOiB0cnVlXHJcbiAgLy8gfSk7XHJcbiAgLy8gfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHVzZXIsIHVwZGF0aW5nXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHtcclxuICAgICAgY291bnRUaW1lXHJcbiAgICB9ID0gdGhpcy5zdGF0ZTtcclxuXHJcbiAgICBpZiAoIXRoaXMuZm9ybVJlZikgdGhpcy5mb3JtUmVmID0gY3JlYXRlUmVmKCk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbmZpcm0tc3Vic2NyaXB0aW9uLWZvcm1cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImluZm8tYm9keVwiPlxyXG4gICAgICAgICAgPEZvcm1cclxuICAgICAgICAgICAgey4uLmxheW91dH1cclxuICAgICAgICAgICAgbmFtZT1cIm5lc3QtbWVzc2FnZXNcIlxyXG4gICAgICAgICAgICB2YWxpZGF0ZU1lc3NhZ2VzPXt2YWxpZGF0ZU1lc3NhZ2VzfVxyXG4gICAgICAgICAgICBpbml0aWFsVmFsdWVzPXt7XHJcbiAgICAgICAgICAgICAgLi4udXNlcixcclxuICAgICAgICAgICAgICBkYXRlT2ZCaXJ0aDogKHVzZXIuZGF0ZU9mQmlydGggJiYgbW9tZW50KHVzZXIuZGF0ZU9mQmlydGgpKSB8fCAnJ1xyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICBzY3JvbGxUb0ZpcnN0RXJyb3JcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWNjb3VudC1mb3JtXCJcclxuICAgICAgICAgICAgcmVmPXsocmVmKSA9PiB7IHRoaXMuZm9ybVJlZiA9IHJlZjsgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPFJvdz5cclxuICAgICAgICAgICAgICA8Q29sIGxnPXsyNH0gbWQ9ezI0fSB4cz17MjR9PlxyXG4gICAgICAgICAgICAgICAgPEZvcm0uSXRlbVxyXG4gICAgICAgICAgICAgICAgICBuYW1lPVwiZW1haWxcIlxyXG4gICAgICAgICAgICAgICAgICBsYWJlbD17KFxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAxMCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgIEVtYWlsIEFkZHJlc3NcclxuICAgICAgICAgICAgICAgICAgICAgIHsnICAnfVxyXG4gICAgICAgICAgICAgICAgICAgICAge3VzZXIudmVyaWZpZWRFbWFpbCA/IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPFBvcG92ZXIgdGl0bGU9XCJZb3VyIGVtYWlsIGFkZHJlc3MgaXMgdmVyaWZpZWRcIiBjb250ZW50PXtudWxsfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdWNjZXNzLWNvbG9yXCI+VmVyaWZpZWQhPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1BvcG92ZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8UG9wb3ZlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ9e251bGx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJlcnJvci1jb2xvclwiPk5vdCB2ZXJpZmllZCE8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvUG9wb3Zlcj5cclxuICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgIHJ1bGVzPXtbeyB0eXBlOiAnZW1haWwnIH0sIHsgcmVxdWlyZWQ6IHRydWUsIG1lc3NhZ2U6ICdQbGVhc2UgaW5wdXQgeW91ciBlbWFpbCBhZGRyZXNzIScgfV19XHJcbiAgICAgICAgICAgICAgICAgIGhhc0ZlZWRiYWNrXHJcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRlVHJpZ2dlcj17WydvbkNoYW5nZScsICdvbkJsdXInXX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgPElucHV0IGRpc2FibGVkIC8+XHJcbiAgICAgICAgICAgICAgICA8L0Zvcm0uSXRlbT5cclxuICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgPC9Sb3c+XHJcbiAgICAgICAgICAgIDxGb3JtLkl0ZW0gd3JhcHBlckNvbD17eyAuLi5sYXlvdXQud3JhcHBlckNvbCB9fT5cclxuICAgICAgICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMub25WZXJpZnlFbWFpbCgpfVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3VwZGF0aW5nIHx8IGNvdW50VGltZSA8IDYwfVxyXG4gICAgICAgICAgICAgICAgbG9hZGluZz17dXBkYXRpbmcgfHwgY291bnRUaW1lIDwgNjB9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2NvdW50VGltZSA8IDYwID8gJ1Jlc2VuZCcgOiAnU2VuZCd9XHJcbiAgICAgICAgICAgICAgICB7JyAnfVxyXG4gICAgICAgICAgICAgICAgdmVyaWZpY2F0aW9uIGVtYWlsXHJcbiAgICAgICAgICAgICAgICB7JyAnfVxyXG4gICAgICAgICAgICAgICAge2NvdW50VGltZSA8IDYwICYmIGAke2NvdW50VGltZX1zYH1cclxuICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IFJvdXRlci5wdXNoKCcvbW9kZWwvYWNjb3VudCcpfVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIENoYW5nZSBlbWFpbFxyXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICA8L0Zvcm0uSXRlbT5cclxuICAgICAgICAgIDwvRm9ybT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVzID0gKHN0YXRlOiBhbnkpID0+ICh7XHJcbiAgdXBkYXRpbmc6IHN0YXRlLnVzZXIudXBkYXRpbmcsXHJcbiAgdXNlcjogc3RhdGUudXNlci5jdXJyZW50XHJcbn0pO1xyXG5cclxuY29uc3QgbWFwRGlzcGF0Y2ggPSB7XHJcbiAgdXBkYXRlUGVyZm9ybWVyXHJcblxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlcywgbWFwRGlzcGF0Y2gpKFZlcmlmaWVkRW1haWxGb3JtKTtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdGVtcGxhdGUtY3VybHktaW4tc3RyaW5nICovXHJcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZU1lc3NhZ2VzID0ge1xyXG4gIHJlcXVpcmVkOiAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZCEnLFxyXG4gIHR5cGVzOiB7XHJcbiAgICBlbWFpbDogJ05vdCBhIHZhbGlkYXRlIGVtYWlsIScsXHJcbiAgICBudW1iZXI6ICdOb3QgYSB2YWxpZGF0ZSBudW1iZXIhJ1xyXG4gIH0sXHJcbiAgbnVtYmVyOiB7XHJcbiAgICByYW5nZTogJ011c3QgYmUgYmV0d2VlbiAke21pbn0gYW5kICR7bWF4fSdcclxuICB9XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=