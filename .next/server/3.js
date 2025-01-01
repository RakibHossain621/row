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
var _jsxFileName = "C:\\Users\\Rokibul\\Documents\\case\\src\\components\\performer\\verified-email-form.tsx";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wZXJmb3JtZXIvdmVyaWZpZWQtZW1haWwtZm9ybS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9tZXNzYWdlLnRzIl0sIm5hbWVzIjpbImxheW91dCIsImxhYmVsQ29sIiwic3BhbiIsIndyYXBwZXJDb2wiLCJWZXJpZmllZEVtYWlsRm9ybSIsIlB1cmVDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsImFyZ3MiLCJfZGVmaW5lUHJvcGVydHkiLCJjb3VudFRpbWUiLCJzdGF0ZSIsInNldFN0YXRlIiwiX2ludGVydmFsQ291bnRkb3duIiwic2V0SW50ZXJ2YWwiLCJjb3VuZG93biIsImJpbmQiLCJvblZlcmlmeUVtYWlsIiwidXNlciIsInByb3BzIiwicmVzcCIsImF1dGhTZXJ2aWNlIiwidmVyaWZ5RW1haWwiLCJzb3VyY2VUeXBlIiwic291cmNlIiwiaGFuZGxlQ291bnRkb3duIiwiZGF0YSIsIm1lc3NhZ2UiLCJzdWNjZXNzIiwiZSIsImVycm9yIiwiY2xlYXJJbnRlcnZhbCIsInJlbmRlciIsInVwZGF0aW5nIiwiZm9ybVJlZiIsImNyZWF0ZVJlZiIsIl9fanN4IiwiY2xhc3NOYW1lIiwiX19zZWxmIiwiX19zb3VyY2UiLCJmaWxlTmFtZSIsIl9qc3hGaWxlTmFtZSIsImxpbmVOdW1iZXIiLCJjb2x1bW5OdW1iZXIiLCJGb3JtIiwiX2V4dGVuZHMiLCJuYW1lIiwidmFsaWRhdGVNZXNzYWdlcyIsImluaXRpYWxWYWx1ZXMiLCJfb2JqZWN0U3ByZWFkIiwiZGF0ZU9mQmlydGgiLCJtb21lbnQiLCJzY3JvbGxUb0ZpcnN0RXJyb3IiLCJyZWYiLCJSb3ciLCJDb2wiLCJsZyIsIm1kIiwieHMiLCJJdGVtIiwibGFiZWwiLCJzdHlsZSIsImZvbnRTaXplIiwidmVyaWZpZWRFbWFpbCIsIlBvcG92ZXIiLCJ0aXRsZSIsImNvbnRlbnQiLCJydWxlcyIsInR5cGUiLCJyZXF1aXJlZCIsImhhc0ZlZWRiYWNrIiwidmFsaWRhdGVUcmlnZ2VyIiwiSW5wdXQiLCJkaXNhYmxlZCIsIkJ1dHRvbiIsIm9uQ2xpY2siLCJsb2FkaW5nIiwiUm91dGVyIiwicHVzaCIsIm1hcFN0YXRlcyIsImN1cnJlbnQiLCJtYXBEaXNwYXRjaCIsInVwZGF0ZVBlcmZvcm1lciIsImNvbm5lY3QiLCJ0eXBlcyIsImVtYWlsIiwibnVtYmVyIiwicmFuZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBaUQ7QUFHbkM7QUFFYztBQUNvQjtBQUNLO0FBR3JCO0FBQ007QUFDTDtBQUVqQyxNQUFNQSxNQUFNLEdBQUc7RUFDYkMsUUFBUSxFQUFFO0lBQUVDLElBQUksRUFBRTtFQUFHLENBQUM7RUFDdEJDLFVBQVUsRUFBRTtJQUFFRCxJQUFJLEVBQUU7RUFBRztBQUN6QixDQUFDO0FBUUQsTUFBTUUsaUJBQWlCLFNBQVNDLG1EQUFhLENBQVM7RUFBQUMsWUFBQSxHQUFBQyxJQUFBO0lBQUEsU0FBQUEsSUFBQTtJQUFBQyxlQUFBLGdCQUM1QztNQUNOQyxTQUFTLEVBQUU7SUFFYixDQUFDO0lBQUFELGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBLDBCQU1pQixZQUFZO01BQzVCLE1BQU07UUFBRUM7TUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDQyxLQUFLO01BQ2hDLElBQUksQ0FBQ0MsUUFBUSxDQUFDO1FBQUVGLFNBQVMsRUFBRUEsU0FBUyxHQUFHO01BQUUsQ0FBQyxDQUFDO01BQzNDLElBQUksQ0FBQ0csa0JBQWtCLEdBQUdDLFdBQVcsQ0FBQyxJQUFJLENBQUNDLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQztJQUN2RSxDQUFDO0VBQUE7RUFFRCxNQUFNQyxhQUFhQSxDQUFBLEVBQUc7SUFDcEIsTUFBTTtNQUFFQztJQUFLLENBQUMsR0FBRyxJQUFJLENBQUNDLEtBQUs7SUFDM0IsSUFBSTtNQUNGLE1BQU1DLElBQUksR0FBRyxNQUFNQyxrRUFBVyxDQUFDQyxX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LElBQUksRUFBQyxTQUFTO01BQ2QvQixTQUFTLEVBQUMsU0FBUztNQUNuQnNDLE9BQU8sRUFBRUEsQ0FBQSxLQUFNRSxrREFBTSxDQUFDQyxJQUFJLENBQUMsZ0JBQWdCLENBQUU7TUFBQXhDLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxHQUM5QyxjQUVPLENBQ0MsQ0FDUCxDQUNILENBQ0YsQ0FBQztFQUVWO0FBQ0Y7QUFFQSxNQUFNb0MsU0FBUyxHQUFJcEUsS0FBVSxLQUFNO0VBQ2pDc0IsUUFBUSxFQUFFdEIsS0FBSyxDQUFDTyxJQUFJLENBQUNlLFFBQVE7RUFDN0JmLElBQUksRUFBRVAsS0FBSyxDQUFDTyxJQUFJLENBQUM4RDtBQUNuQixDQUFDLENBQUM7QUFFRixNQUFNQyxXQUFXLEdBQUc7RUFDbEJDLHVGQUFlQTtBQUVqQixDQUFDO0FBQ2NDLDBIQUFPLENBQUNKLFNBQVMsRUFBRUUsV0FBVyxDQUFDLENBQUM1RSxpQkFBaUIsQ0FBQyxFOzs7Ozs7Ozs7Ozs7QUN2S2pFO0FBQUE7QUFBQTtBQUNPLE1BQU0wQyxnQkFBZ0IsR0FBRztFQUM5QnNCLFFBQVEsRUFBRSx5QkFBeUI7RUFDbkNlLEtBQUssRUFBRTtJQUNMQyxLQUFLLEVBQUUsdUJBQXVCO0lBQzlCQyxNQUFNLEVBQUU7RUFDVixDQUFDO0VBQ0RBLE1BQU0sRUFBRTtJQUNOQyxLQUFLLEVBQUU7RUFDVDtBQUNGLENBQUMsQyIsImZpbGUiOiIzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHVyZUNvbXBvbmVudCwgY3JlYXRlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgSW5wdXQsIEJ1dHRvbiwgRm9ybSwgUG9wb3ZlciwgbWVzc2FnZSwgQ29sLCBSb3dcbn0gZnJvbSAnYW50ZCc7XG5pbXBvcnQgeyBJVXNlciB9IGZyb20gJ0BpbnRlcmZhY2VzL2luZGV4JztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IHZhbGlkYXRlTWVzc2FnZXMgfSBmcm9tICdAbGliL21lc3NhZ2UnO1xuaW1wb3J0IHsgYXV0aFNlcnZpY2UgfSBmcm9tICdAc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIHVwZGF0ZVBlcmZvcm1lclxufSBmcm9tICdzcmMvcmVkdXgvdXNlci9hY3Rpb25zJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgUm91dGVyIGZyb20gJ25leHQvcm91dGVyJztcblxuY29uc3QgbGF5b3V0ID0ge1xuICBsYWJlbENvbDogeyBzcGFuOiAyNCB9LFxuICB3cmFwcGVyQ29sOiB7IHNwYW46IDI0IH1cbn07XG5cbmludGVyZmFjZSBJUHJvcHMge1xuICB1cGRhdGluZzogYm9vbGVhbjtcbiAgdXNlcjpJVXNlclxuICB1cGRhdGVQZXJmb3JtZXI6RnVuY3Rpb25cbn1cblxuY2xhc3MgVmVyaWZpZWRFbWFpbEZvcm0gZXh0ZW5kcyBQdXJlQ29tcG9uZW50PElQcm9wcz4ge1xuICBzdGF0ZSA9IHtcbiAgICBjb3VudFRpbWU6IDYwXG5cbiAgfVxuXG4gIF9pbnRlcnZhbENvdW50ZG93bjogYW55O1xuXG4gIGZvcm1SZWY6IGFueTtcblxuICBoYW5kbGVDb3VudGRvd24gPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgeyBjb3VudFRpbWUgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGNvdW50VGltZTogY291bnRUaW1lIC0gMSB9KTtcbiAgICB0aGlzLl9pbnRlcnZhbENvdW50ZG93biA9IHNldEludGVydmFsKHRoaXMuY291bmRvd24uYmluZCh0aGlzKSwgMTAwMCk7XG4gIH1cblxuICBhc3luYyBvblZlcmlmeUVtYWlsKCkge1xuICAgIGNvbnN0IHsgdXNlciB9ID0gdGhpcy5wcm9wcztcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IGF1dGhTZXJ2aWNlLnZlcmlmeUVtYWlsKHtcbiAgICAgICAgc291cmNlVHlwZTogJ3VzZXInLFxuICAgICAgICBzb3VyY2U6IHVzZXJcbiAgICAgIH0pO1xuICAgICAgdGhpcy5oYW5kbGVDb3VudGRvd24oKTtcbiAgICAgIHJlc3AuZGF0YSAmJiByZXNwLmRhdGEubWVzc2FnZSAmJiBtZXNzYWdlLnN1Y2Nlc3MocmVzcC5kYXRhLm1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnN0IGVycm9yID0gYXdhaXQgZTtcbiAgICAgIG1lc3NhZ2Uuc3VjY2VzcyhlcnJvcj8ubWVzc2FnZSB8fCAnQW4gZXJyb3Igb2NjdXJlZCwgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlcicpO1xuICAgIH1cbiAgfVxuXG4gIGNvdW5kb3duKCkge1xuICAgIGNvbnN0IHsgY291bnRUaW1lIH0gPSB0aGlzLnN0YXRlO1xuICAgIGlmIChjb3VudFRpbWUgPT09IDApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb3VudFRpbWU6IDYwIH0pO1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbENvdW50ZG93bik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7IGNvdW50VGltZTogY291bnRUaW1lIC0gMSB9KTtcbiAgfVxuXG4gIC8vIGFzeW5jIHN1Ym1pdChkYXRhOiBhbnkpIHtcbiAgLy8gY29uc3QgeyB1c2VyLCB1cGRhdGVQZXJmb3JtZXI6IGhhbmRsZVVwZGF0ZVBlcmZvcm1lciB9ID0gdGhpcy5wcm9wcztcbiAgLy8gaGFuZGxlVXBkYXRlUGVyZm9ybWVyKHtcbiAgLy8gICAuLi51c2VyLFxuICAvLyAgIC4uLmRhdGEsXG4gIC8vICAgaXNVcGRhdGVQcm9maWxlOiB0cnVlXG4gIC8vIH0pO1xuICAvLyB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHVzZXIsIHVwZGF0aW5nXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge1xuICAgICAgY291bnRUaW1lXG4gICAgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBpZiAoIXRoaXMuZm9ybVJlZikgdGhpcy5mb3JtUmVmID0gY3JlYXRlUmVmKCk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29uZmlybS1zdWJzY3JpcHRpb24tZm9ybVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImluZm8tYm9keVwiPlxuICAgICAgICAgIDxGb3JtXG4gICAgICAgICAgICB7Li4ubGF5b3V0fVxuICAgICAgICAgICAgbmFtZT1cIm5lc3QtbWVzc2FnZXNcIlxuICAgICAgICAgICAgdmFsaWRhdGVNZXNzYWdlcz17dmFsaWRhdGVNZXNzYWdlc31cbiAgICAgICAgICAgIGluaXRpYWxWYWx1ZXM9e3tcbiAgICAgICAgICAgICAgLi4udXNlcixcbiAgICAgICAgICAgICAgZGF0ZU9mQmlydGg6ICh1c2VyLmRhdGVPZkJpcnRoICYmIG1vbWVudCh1c2VyLmRhdGVPZkJpcnRoKSkgfHwgJydcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBzY3JvbGxUb0ZpcnN0RXJyb3JcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImFjY291bnQtZm9ybVwiXG4gICAgICAgICAgICByZWY9eyhyZWYpID0+IHsgdGhpcy5mb3JtUmVmID0gcmVmOyB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxSb3c+XG4gICAgICAgICAgICAgIDxDb2wgbGc9ezI0fSBtZD17MjR9IHhzPXsyNH0+XG4gICAgICAgICAgICAgICAgPEZvcm0uSXRlbVxuICAgICAgICAgICAgICAgICAgbmFtZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICAgIGxhYmVsPXsoXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAxMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICBFbWFpbCBBZGRyZXNzXG4gICAgICAgICAgICAgICAgICAgICAgeycgICd9XG4gICAgICAgICAgICAgICAgICAgICAge3VzZXIudmVyaWZpZWRFbWFpbCA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxQb3BvdmVyIHRpdGxlPVwiWW91ciBlbWFpbCBhZGRyZXNzIGlzIHZlcmlmaWVkXCIgY29udGVudD17bnVsbH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInN1Y2Nlc3MtY29sb3JcIj5WZXJpZmllZCE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L1BvcG92ZXI+XG4gICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxQb3BvdmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ9e251bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImVycm9yLWNvbG9yXCI+Tm90IHZlcmlmaWVkITwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvUG9wb3Zlcj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICBydWxlcz17W3sgdHlwZTogJ2VtYWlsJyB9LCB7IHJlcXVpcmVkOiB0cnVlLCBtZXNzYWdlOiAnUGxlYXNlIGlucHV0IHlvdXIgZW1haWwgYWRkcmVzcyEnIH1dfVxuICAgICAgICAgICAgICAgICAgaGFzRmVlZGJhY2tcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRlVHJpZ2dlcj17WydvbkNoYW5nZScsICdvbkJsdXInXX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8SW5wdXQgZGlzYWJsZWQgLz5cbiAgICAgICAgICAgICAgICA8L0Zvcm0uSXRlbT5cbiAgICAgICAgICAgICAgPC9Db2w+XG4gICAgICAgICAgICA8L1Jvdz5cbiAgICAgICAgICAgIDxGb3JtLkl0ZW0gd3JhcHBlckNvbD17eyAuLi5sYXlvdXQud3JhcHBlckNvbCB9fT5cbiAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uVmVyaWZ5RW1haWwoKX1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17dXBkYXRpbmcgfHwgY291bnRUaW1lIDwgNjB9XG4gICAgICAgICAgICAgICAgbG9hZGluZz17dXBkYXRpbmcgfHwgY291bnRUaW1lIDwgNjB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7Y291bnRUaW1lIDwgNjAgPyAnUmVzZW5kJyA6ICdTZW5kJ31cbiAgICAgICAgICAgICAgICB7JyAnfVxuICAgICAgICAgICAgICAgIHZlcmlmaWNhdGlvbiBlbWFpbFxuICAgICAgICAgICAgICAgIHsnICd9XG4gICAgICAgICAgICAgICAge2NvdW50VGltZSA8IDYwICYmIGAke2NvdW50VGltZX1zYH1cbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gUm91dGVyLnB1c2goJy9tb2RlbC9hY2NvdW50Jyl9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBDaGFuZ2UgZW1haWxcbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8L0Zvcm0uSXRlbT5cbiAgICAgICAgICA8L0Zvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZXMgPSAoc3RhdGU6IGFueSkgPT4gKHtcbiAgdXBkYXRpbmc6IHN0YXRlLnVzZXIudXBkYXRpbmcsXG4gIHVzZXI6IHN0YXRlLnVzZXIuY3VycmVudFxufSk7XG5cbmNvbnN0IG1hcERpc3BhdGNoID0ge1xuICB1cGRhdGVQZXJmb3JtZXJcblxufTtcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVzLCBtYXBEaXNwYXRjaCkoVmVyaWZpZWRFbWFpbEZvcm0pO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdGVtcGxhdGUtY3VybHktaW4tc3RyaW5nICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGVNZXNzYWdlcyA9IHtcbiAgcmVxdWlyZWQ6ICdUaGlzIGZpZWxkIGlzIHJlcXVpcmVkIScsXG4gIHR5cGVzOiB7XG4gICAgZW1haWw6ICdOb3QgYSB2YWxpZGF0ZSBlbWFpbCEnLFxuICAgIG51bWJlcjogJ05vdCBhIHZhbGlkYXRlIG51bWJlciEnXG4gIH0sXG4gIG51bWJlcjoge1xuICAgIHJhbmdlOiAnTXVzdCBiZSBiZXR3ZWVuICR7bWlufSBhbmQgJHttYXh9J1xuICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==