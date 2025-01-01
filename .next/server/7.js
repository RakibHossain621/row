exports.ids = [7];
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

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wZXJmb3JtZXIvdmVyaWZpZWQtZW1haWwtZm9ybS50c3giXSwibmFtZXMiOlsibGF5b3V0IiwibGFiZWxDb2wiLCJzcGFuIiwid3JhcHBlckNvbCIsIlZlcmlmaWVkRW1haWxGb3JtIiwiUHVyZUNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwiYXJncyIsIl9kZWZpbmVQcm9wZXJ0eSIsImNvdW50VGltZSIsInN0YXRlIiwic2V0U3RhdGUiLCJfaW50ZXJ2YWxDb3VudGRvd24iLCJzZXRJbnRlcnZhbCIsImNvdW5kb3duIiwiYmluZCIsIm9uVmVyaWZ5RW1haWwiLCJ1c2VyIiwicHJvcHMiLCJyZXNwIiwiYXV0aFNlcnZpY2UiLCJ2ZXJpZnlFbWFpbCIsInNvdXJjZVR5cGUiLCJzb3VyY2UiLCJoYW5kbGVDb3VudGRvd24iLCJkYXRhIiwibWVzc2FnZSIsInN1Y2Nlc3MiLCJlIiwiZXJyb3IiLCJjbGVhckludGVydmFsIiwicmVuZGVyIiwidXBkYXRpbmciLCJmb3JtUmVmIiwiY3JlYXRlUmVmIiwiX19qc3giLCJjbGFzc05hbWUiLCJfX3NlbGYiLCJfX3NvdXJjZSIsImZpbGVOYW1lIiwiX2pzeEZpbGVOYW1lIiwibGluZU51bWJlciIsImNvbHVtbk51bWJlciIsIkZvcm0iLCJfZXh0ZW5kcyIsIm5hbWUiLCJ2YWxpZGF0ZU1lc3NhZ2VzIiwiaW5pdGlhbFZhbHVlcyIsIl9vYmplY3RTcHJlYWQiLCJkYXRlT2ZCaXJ0aCIsIm1vbWVudCIsInNjcm9sbFRvRmlyc3RFcnJvciIsInJlZiIsIlJvdyIsIkNvbCIsImxnIiwibWQiLCJ4cyIsIkl0ZW0iLCJsYWJlbCIsInN0eWxlIiwiZm9udFNpemUiLCJ2ZXJpZmllZEVtYWlsIiwiUG9wb3ZlciIsInRpdGxlIiwiY29udGVudCIsInJ1bGVzIiwidHlwZSIsInJlcXVpcmVkIiwiaGFzRmVlZGJhY2siLCJ2YWxpZGF0ZVRyaWdnZXIiLCJJbnB1dCIsImRpc2FibGVkIiwiQnV0dG9uIiwib25DbGljayIsImxvYWRpbmciLCJSb3V0ZXIiLCJwdXNoIiwibWFwU3RhdGVzIiwiY3VycmVudCIsIm1hcERpc3BhdGNoIiwidXBkYXRlUGVyZm9ybWVyIiwiY29ubmVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFpRDtBQUduQztBQUVjO0FBQ29CO0FBQ0s7QUFHckI7QUFDTTtBQUNMO0FBRWpDLE1BQU1BLE1BQU0sR0FBRztFQUNiQyxRQUFRLEVBQUU7SUFBRUMsSUFBSSxFQUFFO0VBQUcsQ0FBQztFQUN0QkMsVUFBVSxFQUFFO0lBQUVELElBQUksRUFBRTtFQUFHO0FBQ3pCLENBQUM7QUFRRCxNQUFNRSxpQkFBaUIsU0FBU0MsbURBQWEsQ0FBUztFQUFBQyxZQUFBLEdBQUFDLElBQUE7SUFBQSxTQUFBQSxJQUFBO0lBQUFDLGVBQUEsZ0JBQzVDO01BQ05DLFNBQVMsRUFBRTtJQUViLENBQUM7SUFBQUQsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUEsMEJBTWlCLFlBQVk7TUFDNUIsTUFBTTtRQUFFQztNQUFVLENBQUMsR0FBRyxJQUFJLENBQUNDLEtBQUs7TUFDaEMsSUFBSSxDQUFDQyxRQUFRLENBQUM7UUFBRUYsU0FBUyxFQUFFQSxTQUFTLEdBQUc7TUFBRSxDQUFDLENBQUM7TUFDM0MsSUFBSSxDQUFDRyxrQkFBa0IsR0FBR0MsV0FBVyxDQUFDLElBQUksQ0FBQ0MsUUFBUSxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDO0lBQ3ZFLENBQUM7RUFBQTtFQUVELE1BQU1DLGFBQWFBLENBQUEsRUFBRztJQUNwQixNQUFNO01BQUVDO0lBQUssQ0FBQyxHQUFHLElBQUksQ0FBQ0MsS0FBSztJQUMzQixJQUFJO01BQ0YsTUFBTUMsSUFBSSxHQUFHLE1BQU1DLGtFQUFXLENBQUNDLFdBQVcsQ0FBQztRQUN6Q0MsVUFBVSxFQUFFLE1BQU07UUFDbEJDLE1BQU0sRUFBRU47TUFDVixDQUFDLENBQUM7TUFD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LGtEQUFNLENBQUNDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBRTtNQUFBeEMsTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLEdBQzlDLGNBRU8sQ0FDQyxDQUNQLENBQ0gsQ0FDRixDQUFDO0VBRVY7QUFDRjtBQUVBLE1BQU1vQyxTQUFTLEdBQUlwRSxLQUFVLEtBQU07RUFDakNzQixRQUFRLEVBQUV0QixLQUFLLENBQUNPLElBQUksQ0FBQ2UsUUFBUTtFQUM3QmYsSUFBSSxFQUFFUCxLQUFLLENBQUNPLElBQUksQ0FBQzhEO0FBQ25CLENBQUMsQ0FBQztBQUVGLE1BQU1DLFdBQVcsR0FBRztFQUNsQkMsdUZBQWVBO0FBRWpCLENBQUM7QUFDY0MsMEhBQU8sQ0FBQ0osU0FBUyxFQUFFRSxXQUFXLENBQUMsQ0FBQzVFLGlCQUFpQixDQUFDLEUiLCJmaWxlIjoiNy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFB1cmVDb21wb25lbnQsIGNyZWF0ZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIElucHV0LCBCdXR0b24sIEZvcm0sIFBvcG92ZXIsIG1lc3NhZ2UsIENvbCwgUm93XG59IGZyb20gJ2FudGQnO1xuaW1wb3J0IHsgSVVzZXIgfSBmcm9tICdAaW50ZXJmYWNlcy9pbmRleCc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyB2YWxpZGF0ZU1lc3NhZ2VzIH0gZnJvbSAnQGxpYi9tZXNzYWdlJztcbmltcG9ydCB7IGF1dGhTZXJ2aWNlIH0gZnJvbSAnQHNlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQge1xuICB1cGRhdGVQZXJmb3JtZXJcbn0gZnJvbSAnc3JjL3JlZHV4L3VzZXIvYWN0aW9ucyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFJvdXRlciBmcm9tICduZXh0L3JvdXRlcic7XG5cbmNvbnN0IGxheW91dCA9IHtcbiAgbGFiZWxDb2w6IHsgc3BhbjogMjQgfSxcbiAgd3JhcHBlckNvbDogeyBzcGFuOiAyNCB9XG59O1xuXG5pbnRlcmZhY2UgSVByb3BzIHtcbiAgdXBkYXRpbmc6IGJvb2xlYW47XG4gIHVzZXI6SVVzZXJcbiAgdXBkYXRlUGVyZm9ybWVyOkZ1bmN0aW9uXG59XG5cbmNsYXNzIFZlcmlmaWVkRW1haWxGb3JtIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxJUHJvcHM+IHtcbiAgc3RhdGUgPSB7XG4gICAgY291bnRUaW1lOiA2MFxuXG4gIH1cblxuICBfaW50ZXJ2YWxDb3VudGRvd246IGFueTtcblxuICBmb3JtUmVmOiBhbnk7XG5cbiAgaGFuZGxlQ291bnRkb3duID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHsgY291bnRUaW1lIH0gPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBjb3VudFRpbWU6IGNvdW50VGltZSAtIDEgfSk7XG4gICAgdGhpcy5faW50ZXJ2YWxDb3VudGRvd24gPSBzZXRJbnRlcnZhbCh0aGlzLmNvdW5kb3duLmJpbmQodGhpcyksIDEwMDApO1xuICB9XG5cbiAgYXN5bmMgb25WZXJpZnlFbWFpbCgpIHtcbiAgICBjb25zdCB7IHVzZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBhdXRoU2VydmljZS52ZXJpZnlFbWFpbCh7XG4gICAgICAgIHNvdXJjZVR5cGU6ICd1c2VyJyxcbiAgICAgICAgc291cmNlOiB1c2VyXG4gICAgICB9KTtcbiAgICAgIHRoaXMuaGFuZGxlQ291bnRkb3duKCk7XG4gICAgICByZXNwLmRhdGEgJiYgcmVzcC5kYXRhLm1lc3NhZ2UgJiYgbWVzc2FnZS5zdWNjZXNzKHJlc3AuZGF0YS5tZXNzYWdlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zdCBlcnJvciA9IGF3YWl0IGU7XG4gICAgICBtZXNzYWdlLnN1Y2Nlc3MoZXJyb3I/Lm1lc3NhZ2UgfHwgJ0FuIGVycm9yIG9jY3VyZWQsIHBsZWFzZSB0cnkgYWdhaW4gbGF0ZXInKTtcbiAgICB9XG4gIH1cblxuICBjb3VuZG93bigpIHtcbiAgICBjb25zdCB7IGNvdW50VGltZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAoY291bnRUaW1lID09PSAwKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgY291bnRUaW1lOiA2MCB9KTtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWxDb3VudGRvd24pO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoeyBjb3VudFRpbWU6IGNvdW50VGltZSAtIDEgfSk7XG4gIH1cblxuICAvLyBhc3luYyBzdWJtaXQoZGF0YTogYW55KSB7XG4gIC8vIGNvbnN0IHsgdXNlciwgdXBkYXRlUGVyZm9ybWVyOiBoYW5kbGVVcGRhdGVQZXJmb3JtZXIgfSA9IHRoaXMucHJvcHM7XG4gIC8vIGhhbmRsZVVwZGF0ZVBlcmZvcm1lcih7XG4gIC8vICAgLi4udXNlcixcbiAgLy8gICAuLi5kYXRhLFxuICAvLyAgIGlzVXBkYXRlUHJvZmlsZTogdHJ1ZVxuICAvLyB9KTtcbiAgLy8gfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB1c2VyLCB1cGRhdGluZ1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtcbiAgICAgIGNvdW50VGltZVxuICAgIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgaWYgKCF0aGlzLmZvcm1SZWYpIHRoaXMuZm9ybVJlZiA9IGNyZWF0ZVJlZigpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbmZpcm0tc3Vic2NyaXB0aW9uLWZvcm1cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmZvLWJvZHlcIj5cbiAgICAgICAgICA8Rm9ybVxuICAgICAgICAgICAgey4uLmxheW91dH1cbiAgICAgICAgICAgIG5hbWU9XCJuZXN0LW1lc3NhZ2VzXCJcbiAgICAgICAgICAgIHZhbGlkYXRlTWVzc2FnZXM9e3ZhbGlkYXRlTWVzc2FnZXN9XG4gICAgICAgICAgICBpbml0aWFsVmFsdWVzPXt7XG4gICAgICAgICAgICAgIC4uLnVzZXIsXG4gICAgICAgICAgICAgIGRhdGVPZkJpcnRoOiAodXNlci5kYXRlT2ZCaXJ0aCAmJiBtb21lbnQodXNlci5kYXRlT2ZCaXJ0aCkpIHx8ICcnXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgc2Nyb2xsVG9GaXJzdEVycm9yXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhY2NvdW50LWZvcm1cIlxuICAgICAgICAgICAgcmVmPXsocmVmKSA9PiB7IHRoaXMuZm9ybVJlZiA9IHJlZjsgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Um93PlxuICAgICAgICAgICAgICA8Q29sIGxnPXsyNH0gbWQ9ezI0fSB4cz17MjR9PlxuICAgICAgICAgICAgICAgIDxGb3JtLkl0ZW1cbiAgICAgICAgICAgICAgICAgIG5hbWU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgICBsYWJlbD17KFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogMTAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgRW1haWwgQWRkcmVzc1xuICAgICAgICAgICAgICAgICAgICAgIHsnICAnfVxuICAgICAgICAgICAgICAgICAgICAgIHt1c2VyLnZlcmlmaWVkRW1haWwgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8UG9wb3ZlciB0aXRsZT1cIllvdXIgZW1haWwgYWRkcmVzcyBpcyB2ZXJpZmllZFwiIGNvbnRlbnQ9e251bGx9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdWNjZXNzLWNvbG9yXCI+VmVyaWZpZWQhPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Qb3BvdmVyPlxuICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8UG9wb3ZlclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PXtudWxsfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJlcnJvci1jb2xvclwiPk5vdCB2ZXJpZmllZCE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L1BvcG92ZXI+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgcnVsZXM9e1t7IHR5cGU6ICdlbWFpbCcgfSwgeyByZXF1aXJlZDogdHJ1ZSwgbWVzc2FnZTogJ1BsZWFzZSBpbnB1dCB5b3VyIGVtYWlsIGFkZHJlc3MhJyB9XX1cbiAgICAgICAgICAgICAgICAgIGhhc0ZlZWRiYWNrXG4gICAgICAgICAgICAgICAgICB2YWxpZGF0ZVRyaWdnZXI9e1snb25DaGFuZ2UnLCAnb25CbHVyJ119XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPElucHV0IGRpc2FibGVkIC8+XG4gICAgICAgICAgICAgICAgPC9Gb3JtLkl0ZW0+XG4gICAgICAgICAgICAgIDwvQ29sPlxuICAgICAgICAgICAgPC9Sb3c+XG4gICAgICAgICAgICA8Rm9ybS5JdGVtIHdyYXBwZXJDb2w9e3sgLi4ubGF5b3V0LndyYXBwZXJDb2wgfX0+XG4gICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5vblZlcmlmeUVtYWlsKCl9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3VwZGF0aW5nIHx8IGNvdW50VGltZSA8IDYwfVxuICAgICAgICAgICAgICAgIGxvYWRpbmc9e3VwZGF0aW5nIHx8IGNvdW50VGltZSA8IDYwfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2NvdW50VGltZSA8IDYwID8gJ1Jlc2VuZCcgOiAnU2VuZCd9XG4gICAgICAgICAgICAgICAgeycgJ31cbiAgICAgICAgICAgICAgICB2ZXJpZmljYXRpb24gZW1haWxcbiAgICAgICAgICAgICAgICB7JyAnfVxuICAgICAgICAgICAgICAgIHtjb3VudFRpbWUgPCA2MCAmJiBgJHtjb3VudFRpbWV9c2B9XG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IFJvdXRlci5wdXNoKCcvbW9kZWwvYWNjb3VudCcpfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgQ2hhbmdlIGVtYWlsXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9Gb3JtLkl0ZW0+XG4gICAgICAgICAgPC9Gb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgbWFwU3RhdGVzID0gKHN0YXRlOiBhbnkpID0+ICh7XG4gIHVwZGF0aW5nOiBzdGF0ZS51c2VyLnVwZGF0aW5nLFxuICB1c2VyOiBzdGF0ZS51c2VyLmN1cnJlbnRcbn0pO1xuXG5jb25zdCBtYXBEaXNwYXRjaCA9IHtcbiAgdXBkYXRlUGVyZm9ybWVyXG5cbn07XG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlcywgbWFwRGlzcGF0Y2gpKFZlcmlmaWVkRW1haWxGb3JtKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=