(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[11],{

/***/ "./src/components/performer/tip-form.tsx":
/*!***********************************************!*\
  !*** ./src/components/performer/tip-form.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var src_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/icons */ "./src/icons/index.tsx");
/* harmony import */ var _performer_less__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./performer.less */ "./src/components/performer/performer.less");
/* harmony import */ var _performer_less__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_performer_less__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");






var _jsxFileName = "C:\\Users\\roman\\Pictures\\Case\\row\\src\\components\\performer\\tip-form.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(o), Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }





var TipPerformerForm = /*#__PURE__*/function (_PureComponent) {
  function TipPerformerForm() {
    var _this;
    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, TipPerformerForm);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, TipPerformerForm, [].concat(args));
    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(_this, "state", {
      price: 10,
      isConfirm: false
    });
    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(_this, "onChange", function () {
      var isConfirm = _this.state.isConfirm;
      _this.setState({
        isConfirm: !isConfirm
      });
    });
    return _this;
  }
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(TipPerformerForm, _PureComponent);
  return Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(TipPerformerForm, [{
    key: "onChangeValue",
    value: function onChangeValue(price) {
      this.setState({
        price: price
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        onFinish = _this$props.onFinish,
        _this$props$submiting = _this$props.submiting,
        submiting = _this$props$submiting === void 0 ? false : _this$props$submiting,
        performer = _this$props.performer,
        currentUser = _this$props.currentUser;
      var _this$state = this.state,
        price = _this$state.price,
        isConfirm = _this$state.isConfirm;
      return __jsx(react__WEBPACK_IMPORTED_MODULE_6___default.a.Fragment, null, __jsx("div", {
        className: "confirm-subscription-form",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41,
          columnNumber: 9
        }
      }, __jsx("div", {
        className: "top-content",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42,
          columnNumber: 11
        }
      }, __jsx("span", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43,
          columnNumber: 13
        }
      }, "All donations contribute to my", ' ', __jsx("br", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46,
          columnNumber: 15
        }
      }), __jsx("a", {
        href: "/model?tab=model&filter=earningCurrentMonth",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 47,
          columnNumber: 15
        }
      }, "Most Supported"), ' ', "ranking.")), __jsx("div", {
        className: "text-help",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52,
          columnNumber: 11
        }
      }, __jsx("span", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53,
          columnNumber: 13
        }
      }, "Help me get to the top")), __jsx("div", {
        className: "text-center",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55,
          columnNumber: 11
        }
      }, __jsx(antd__WEBPACK_IMPORTED_MODULE_7__["Avatar"], {
        src: (performer === null || performer === void 0 ? void 0 : performer.avatar) || '/static/no-avatar.png',
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 56,
          columnNumber: 13
        }
      }), __jsx("p", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 57,
          columnNumber: 13
        }
      }, (performer === null || performer === void 0 ? void 0 : performer.name) || (performer === null || performer === void 0 ? void 0 : performer.username) || 'N/A', ' ', (performer === null || performer === void 0 ? void 0 : performer.verifiedAccount) && __jsx(src_icons__WEBPACK_IMPORTED_MODULE_8__["TickIcon"], {
        className: "primary-color",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60,
          columnNumber: 46
        }
      }))), __jsx("div", {
        className: "tip-grps",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 63,
          columnNumber: 11
        }
      }, __jsx("div", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64,
          columnNumber: 13
        }
      }, __jsx("img", {
        src: "/static/gem.png",
        width: "20px",
        alt: "gem-ico",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65,
          columnNumber: 15
        }
      }), __jsx(antd__WEBPACK_IMPORTED_MODULE_7__["Button"], {
        type: price === 10 ? 'primary' : 'default',
        onClick: function onClick() {
          return _this2.onChangeValue(10);
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66,
          columnNumber: 15
        }
      }, "10")), __jsx("div", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70,
          columnNumber: 13
        }
      }, __jsx("img", {
        src: "/static/gem.png",
        width: "20px",
        alt: "gem-ico",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71,
          columnNumber: 15
        }
      }), __jsx(antd__WEBPACK_IMPORTED_MODULE_7__["Button"], {
        type: price === 20 ? 'primary' : 'default',
        onClick: function onClick() {
          return _this2.onChangeValue(20);
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72,
          columnNumber: 15
        }
      }, "20")), __jsx("div", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76,
          columnNumber: 13
        }
      }, __jsx("img", {
        src: "/static/gem.png",
        width: "20px",
        alt: "gem-ico",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 77,
          columnNumber: 15
        }
      }), __jsx(antd__WEBPACK_IMPORTED_MODULE_7__["Button"], {
        type: price === 50 ? 'primary' : 'default',
        onClick: function onClick() {
          return _this2.onChangeValue(50);
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 78,
          columnNumber: 15
        }
      }, "50")), __jsx("div", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 82,
          columnNumber: 13
        }
      }, __jsx("img", {
        src: "/static/gem.png",
        width: "20px",
        alt: "gem-ico",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 83,
          columnNumber: 15
        }
      }), __jsx(antd__WEBPACK_IMPORTED_MODULE_7__["Button"], {
        type: price === 100 ? 'primary' : 'default',
        onClick: function onClick() {
          return _this2.onChangeValue(100);
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84,
          columnNumber: 15
        }
      }, "100")), __jsx("div", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 88,
          columnNumber: 13
        }
      }, __jsx("img", {
        src: "/static/gem.png",
        width: "20px",
        alt: "gem-ico",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 89,
          columnNumber: 15
        }
      }), __jsx(antd__WEBPACK_IMPORTED_MODULE_7__["Button"], {
        type: price === 200 ? 'primary' : 'default',
        onClick: function onClick() {
          return _this2.onChangeValue(200);
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 90,
          columnNumber: 15
        }
      }, "200")), __jsx("div", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 94,
          columnNumber: 13
        }
      }, __jsx("img", {
        src: "/static/gem.png",
        width: "20px",
        alt: "gem-ico",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 95,
          columnNumber: 15
        }
      }), __jsx(antd__WEBPACK_IMPORTED_MODULE_7__["Button"], {
        type: price === 500 ? 'primary' : 'default',
        onClick: function onClick() {
          return _this2.onChangeValue(500);
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 96,
          columnNumber: 15
        }
      }, "500")), __jsx("div", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 100,
          columnNumber: 13
        }
      }, __jsx("img", {
        src: "/static/gem.png",
        width: "20px",
        alt: "gem-ico",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 101,
          columnNumber: 15
        }
      }), __jsx(antd__WEBPACK_IMPORTED_MODULE_7__["Button"], {
        type: price === 1000 ? 'primary' : 'default',
        onClick: function onClick() {
          return _this2.onChangeValue(1000);
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102,
          columnNumber: 15
        }
      }, "1000"))), __jsx("div", {
        className: "info-body",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 107,
          columnNumber: 11
        }
      }, __jsx("div", {
        style: {
          textAlign: 'center'
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 108,
          columnNumber: 13
        }
      }, __jsx("p", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 109,
          columnNumber: 15
        }
      }, "Enter your tip amount in ruby"), __jsx(antd__WEBPACK_IMPORTED_MODULE_7__["InputNumber"], {
        min: 1,
        precision: 0,
        onChange: this.onChangeValue.bind(this),
        value: price,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 110,
          columnNumber: 15
        }
      }))), __jsx(antd__WEBPACK_IMPORTED_MODULE_7__["Button"], {
        type: "primary",
        loading: submiting,
        onClick: function onClick() {
          return onFinish(price, isConfirm);
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113,
          columnNumber: 11
        }
      }, "SEND TIP"), __jsx("div", {
        style: {
          padding: '10px'
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114,
          columnNumber: 11
        }
      }, __jsx(antd__WEBPACK_IMPORTED_MODULE_7__["Checkbox"], {
        defaultChecked: isConfirm,
        onChange: this.onChange,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115,
          columnNumber: 13
        }
      }, "Confirm"))), __jsx("div", {
        className: "footer-content",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 118,
          columnNumber: 9
        }
      }, "Available", ' ', __jsx("img", {
        src: "/static/gem.png",
        width: "20px",
        alt: "gem-ico",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 121,
          columnNumber: 11
        }
      }), __jsx("span", {
        className: "user-ruby",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122,
          columnNumber: 11
        }
      }, Math.round(currentUser === null || currentUser === void 0 ? void 0 : currentUser.rubyBalance))));
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_6__["PureComponent"]);
var mapStates = function mapStates(state) {
  return {
    currentUser: _objectSpread({}, state.user.current)
  };
};
var mapDispatch = {};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_10__["connect"])(mapStates, mapDispatch)(TipPerformerForm));

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/next/node_modules/webpack/buildin/harmony-module.js */ "./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvcGVyZm9ybWVyL3RpcC1mb3JtLnRzeCJdLCJuYW1lcyI6WyJUaXBQZXJmb3JtZXJGb3JtIiwiX1B1cmVDb21wb25lbnQiLCJfdGhpcyIsIl9jbGFzc0NhbGxDaGVjayIsIl9sZW4iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJhcmdzIiwiQXJyYXkiLCJfa2V5IiwiX2NhbGxTdXBlciIsImNvbmNhdCIsIl9kZWZpbmVQcm9wZXJ0eSIsInByaWNlIiwiaXNDb25maXJtIiwic3RhdGUiLCJzZXRTdGF0ZSIsIl9pbmhlcml0cyIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwib25DaGFuZ2VWYWx1ZSIsInJlbmRlciIsIl90aGlzMiIsIl90aGlzJHByb3BzIiwicHJvcHMiLCJvbkZpbmlzaCIsIl90aGlzJHByb3BzJHN1Ym1pdGluZyIsInN1Ym1pdGluZyIsInBlcmZvcm1lciIsImN1cnJlbnRVc2VyIiwiX3RoaXMkc3RhdGUiLCJfX2pzeCIsIlJlYWN0IiwiRnJhZ21lbnQiLCJjbGFzc05hbWUiLCJfX3NlbGYiLCJfX3NvdXJjZSIsImZpbGVOYW1lIiwiX2pzeEZpbGVOYW1lIiwibGluZU51bWJlciIsImNvbHVtbk51bWJlciIsImhyZWYiLCJBdmF0YXIiLCJzcmMiLCJhdmF0YXIiLCJuYW1lIiwidXNlcm5hbWUiLCJ2ZXJpZmllZEFjY291bnQiLCJUaWNrSWNvbiIsIndpZHRoIiwiYWx0IiwiQnV0dG9uIiwidHlwZSIsIm9uQ2xpY2siLCJzdHlsZSIsInRleHRBbGlnbiIsIklucHV0TnVtYmVyIiwibWluIiwicHJlY2lzaW9uIiwib25DaGFuZ2UiLCJiaW5kIiwibG9hZGluZyIsInBhZGRpbmciLCJDaGVja2JveCIsImRlZmF1bHRDaGVja2VkIiwiTWF0aCIsInJvdW5kIiwicnVieUJhbGFuY2UiLCJQdXJlQ29tcG9uZW50IiwibWFwU3RhdGVzIiwiX29iamVjdFNwcmVhZCIsInVzZXIiLCJjdXJyZW50IiwibWFwRGlzcGF0Y2giLCJjb25uZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXNDO0FBR3hCO0FBQ3VCO0FBRVg7QUFDWTtBQUFBLElBU2hDQSxnQkFBZ0IsMEJBQUFDLGNBQUE7RUFBQSxTQUFBRCxpQkFBQTtJQUFBLElBQUFFLEtBQUE7SUFBQUMseUZBQUEsT0FBQUgsZ0JBQUE7SUFBQSxTQUFBSSxJQUFBLEdBQUFDLFNBQUEsQ0FBQUMsTUFBQSxFQUFBQyxJQUFBLE9BQUFDLEtBQUEsQ0FBQUosSUFBQSxHQUFBSyxJQUFBLE1BQUFBLElBQUEsR0FBQUwsSUFBQSxFQUFBSyxJQUFBO01BQUFGLElBQUEsQ0FBQUUsSUFBQSxJQUFBSixTQUFBLENBQUFJLElBQUE7SUFBQTtJQUFBUCxLQUFBLEdBQUFRLFVBQUEsT0FBQVYsZ0JBQUEsS0FBQVcsTUFBQSxDQUFBSixJQUFBO0lBQUFLLHlGQUFBLENBQUFWLEtBQUEsV0FDWjtNQUNOVyxLQUFLLEVBQUUsRUFBRTtNQUNUQyxTQUFTLEVBQUU7SUFDYixDQUFDO0lBQUFGLHlGQUFBLENBQUFWLEtBQUEsY0FNVSxZQUFNO01BQ2YsSUFBUVksU0FBUyxHQUFLWixLQUFBLENBQUthLEtBQUssQ0FBeEJELFNBQVM7TUFDakJaLEtBQUEsQ0FBS2MsUUFBUSxDQUFDO1FBQ1pGLFNBQVMsRUFBRSxDQUFDQTtNQUNkLENBQUMsQ0FBQztJQUNKLENBQUM7SUFBQSxPQUFBWixLQUFBO0VBQUE7RUFBQWUsbUZBQUEsQ0FBQWpCLGdCQUFBLEVBQUFDLGNBQUE7RUFBQSxPQUFBaUIsc0ZBQUEsQ0FBQWxCLGdCQUFBO0lBQUFtQixHQUFBO0lBQUFDLEtBQUEsRUFURCxTQUFBQyxhQUFhQSxDQUFDUixLQUFLLEVBQUU7TUFDbkIsSUFBSSxDQUFDRyxRQUFRLENBQUM7UUFBRUgsS0FBSyxFQUFMQTtNQUFNLENBQUMsQ0FBQztJQUMxQjtFQUFDO0lBQUFNLEdBQUE7SUFBQUMsS0FBQSxFQVNELFNBQUFFLE1BQU1BLENBQUEsRUFBRztNQUFBLElBQUFDLE1BQUE7TUFDUCxJQUFBQyxXQUFBLEdBRUksSUFBSSxDQUFDQyxLQUFLO1FBRFpDLFFBQVEsR0FBQUYsV0FBQSxDQUFSRSxRQUFRO1FBQUFDLHFCQUFBLEdBQUFILFdBQUEsQ0FBRUksU0FBUztRQUFUQSxTQUFTLEdBQUFELHFCQUFBLGNBQUcsS0FBSyxHQUFBQSxxQkFBQTtRQUFFRSxTQUFTLEdBQUFMLFdBQUEsQ0FBVEssU0FBUztRQUFFQyxXQUFXLEdBQUFOLFdBQUEsQ0FBWE0sV0FBVztNQUVyRCxJQUFBQyxXQUFBLEdBQTZCLElBQUksQ0FBQ2hCLEtBQUs7UUFBL0JGLEtBQUssR0FBQWtCLFdBQUEsQ0FBTGxCLEtBQUs7UUFBRUMsU0FBUyxHQUFBaUIsV0FBQSxDQUFUakIsU0FBUztNQUN4QixPQUNFa0IsS0FBQSxDQUFBQyw0Q0FBQSxDQUFBQyxRQUFBLFFBQ0VGLEtBQUE7UUFBS0csU0FBUyxFQUFDLDJCQUEyQjtRQUFBQyxNQUFBO1FBQUFDLFFBQUE7VUFBQUMsUUFBQSxFQUFBQyxZQUFBO1VBQUFDLFVBQUE7VUFBQUMsWUFBQTtRQUFBO01BQUEsR0FDeENULEtBQUE7UUFBS0csU0FBUyxFQUFDLGFBQWE7UUFBQUMsTUFBQTtRQUFBQyxRQUFBO1VBQUFDLFFBQUEsRUFBQUMsWUFBQTtVQUFBQyxVQUFBO1VBQUFDLFlBQUE7UUFBQTtNQUFBLEdBQzFCVCxLQUFBO1FBQUFJLE1BQUE7UUFBQUMsUUFBQTtVQUFBQyxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUE7TUFBQSxHQUFNLGdDQUVKLEVBQUMsR0FBRyxFQUNKVCxLQUFBO1FBQUFJLE1BQUE7UUFBQUMsUUFBQTtVQUFBQyxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUE7TUFBQSxDQUFLLENBQUMsRUFDTlQsS0FBQTtRQUFHVSxJQUFJLEVBQUMsNkNBQTZDO1FBQUFOLE1BQUE7UUFBQUMsUUFBQTtVQUFBQyxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUE7TUFBQSxHQUFDLGdCQUFpQixDQUFDLEVBQ3ZFLEdBQUcsRUFBQyxVQUVELENBQ0gsQ0FBQyxFQUNOVCxLQUFBO1FBQUtHLFNBQVMsRUFBQyxXQUFXO1FBQUFDLE1BQUE7UUFBQUMsUUFBQTtVQUFBQyxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUE7TUFBQSxHQUN4QlQsS0FBQTtRQUFBSSxNQUFBO1FBQUFDLFFBQUE7VUFBQUMsUUFBQSxFQUFBQyxZQUFBO1VBQUFDLFVBQUE7VUFBQUMsWUFBQTtRQUFBO01BQUEsR0FBTSx3QkFBNEIsQ0FDL0IsQ0FBQyxFQUNOVCxLQUFBO1FBQUtHLFNBQVMsRUFBQyxhQUFhO1FBQUFDLE1BQUE7UUFBQUMsUUFBQTtVQUFBQyxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUE7TUFBQSxHQUMxQlQsS0FBQSxDQUFDVywyQ0FBTTtRQUFDQyxHQUFHLEVBQUUsQ0FBQWYsU0FBUyxhQUFUQSxTQUFTLHVCQUFUQSxTQUFTLENBQUVnQixNQUFNLEtBQUksdUJBQXdCO1FBQUFULE1BQUE7UUFBQUMsUUFBQTtVQUFBQyxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUE7TUFBQSxDQUFFLENBQUMsRUFDN0RULEtBQUE7UUFBQUksTUFBQTtRQUFBQyxRQUFBO1VBQUFDLFFBQUEsRUFBQUMsWUFBQTtVQUFBQyxVQUFBO1VBQUFDLFlBQUE7UUFBQTtNQUFBLEdBQ0csQ0FBQVosU0FBUyxhQUFUQSxTQUFTLHVCQUFUQSxTQUFTLENBQUVpQixJQUFJLE1BQUlqQixTQUFTLGFBQVRBLFNBQVMsdUJBQVRBLFNBQVMsQ0FBRWtCLFFBQVEsS0FBSSxLQUFLLEVBQy9DLEdBQUcsRUFDSCxDQUFBbEIsU0FBUyxhQUFUQSxTQUFTLHVCQUFUQSxTQUFTLENBQUVtQixlQUFlLEtBQUloQixLQUFBLENBQUNpQixrREFBUTtRQUFDZCxTQUFTLEVBQUMsZUFBZTtRQUFBQyxNQUFBO1FBQUFDLFFBQUE7VUFBQUMsUUFBQSxFQUFBQyxZQUFBO1VBQUFDLFVBQUE7VUFBQUMsWUFBQTtRQUFBO01BQUEsQ0FBRSxDQUNuRSxDQUNBLENBQUMsRUFDTlQsS0FBQTtRQUFLRyxTQUFTLEVBQUMsVUFBVTtRQUFBQyxNQUFBO1FBQUFDLFFBQUE7VUFBQUMsUUFBQSxFQUFBQyxZQUFBO1VBQUFDLFVBQUE7VUFBQUMsWUFBQTtRQUFBO01BQUEsR0FDdkJULEtBQUE7UUFBQUksTUFBQTtRQUFBQyxRQUFBO1VBQUFDLFFBQUEsRUFBQUMsWUFBQTtVQUFBQyxVQUFBO1VBQUFDLFlBQUE7UUFBQTtNQUFBLEdBQ0VULEtBQUE7UUFBS1ksR0FBRyxFQUFDLGlCQUFpQjtRQUFDTSxLQUFLLEVBQUMsTUFBTTtRQUFDQyxHQUFHLEVBQUMsU0FBUztRQUFBZixNQUFBO1FBQUFDLFFBQUE7VUFBQUMsUUFBQSxFQUFBQyxZQUFBO1VBQUFDLFVBQUE7VUFBQUMsWUFBQTtRQUFBO01BQUEsQ0FBRSxDQUFDLEVBQ3hEVCxLQUFBLENBQUNvQiwyQ0FBTTtRQUFDQyxJQUFJLEVBQUV4QyxLQUFLLEtBQUssRUFBRSxHQUFHLFNBQVMsR0FBRyxTQUFVO1FBQUN5QyxPQUFPLEVBQUUsU0FBVEEsT0FBT0EsQ0FBQTtVQUFBLE9BQVEvQixNQUFJLENBQUNGLGFBQWEsQ0FBQyxFQUFFLENBQUM7UUFBQSxDQUFDO1FBQUFlLE1BQUE7UUFBQUMsUUFBQTtVQUFBQyxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUE7TUFBQSxHQUFDLElBRW5GLENBQ0wsQ0FBQyxFQUNOVCxLQUFBO1FBQUFJLE1BQUE7UUFBQUMsUUFBQTtVQUFBQyxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUE7TUFBQSxHQUNFVCxLQUFBO1FBQUtZLEdBQUcsRUFBQyxpQkFBaUI7UUFBQ00sS0FBSyxFQUFDLE1BQU07UUFBQ0MsR0FBRyxFQUFDLFNBQVM7UUFBQWYsTUFBQTtRQUFBQyxRQUFBO1VBQUFDLFFBQUEsRUFBQUMsWUFBQTtVQUFBQyxVQUFBO1VBQUFDLFlBQUE7UUFBQTtNQUFBLENBQUUsQ0FBQyxFQUN4RFQsS0FBQSxDQUFDb0IsMkNBQU07UUFBQ0MsSUFBSSxFQUFFeEMsS0FBSyxLQUFLLEVBQUUsR0FBRyxTQUFTLEdBQUcsU0FBVTtRQUFDeUMsT0FBTyxFQUFFLFNBQVRBLE9BQU9BLENBQUE7VUFBQSxPQUFRL0IsTUFBSSxDQUFDRixhQUFhLENBQUMsRUFBRSxDQUFDO1FBQUEsQ0FBQztRQUFBZSxNQUFBO1FBQUFDLFFBQUE7VUFBQUMsUUFBQSxFQUFBQyxZQUFBO1VBQUFDLFVBQUE7VUFBQUMsWUFBQTtRQUFBO01BQUEsR0FBQyxJQUVuRixDQUNMLENBQUMsRUFDTlQsS0FBQTtRQUFBSSxNQUFBO1FBQUFDLFFBQUE7VUFBQUMsUUFBQSxFQUFBQyxZQUFBO1VBQUFDLFVBQUE7VUFBQUMsWUFBQTtRQUFBO01BQUEsR0FDRVQsS0FBQTtRQUFLWSxHQUFHLEVBQUMsaUJBQWlCO1FBQUNNLEtBQUssRUFBQyxNQUFNO1FBQUNDLEdBQUcsRUFBQyxTQUFTO1FBQUFmLE1BQUE7UUFBQUMsUUFBQTtVQUFBQyxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUE7TUFBQSxDQUFFLENBQUMsRUFDeERULEtBQUEsQ0FBQ29CLDJDQUFNO1FBQUNDLElBQUksRUFBRXhDLEtBQUssS0FBSyxFQUFFLEdBQUcsU0FBUyxHQUFHLFNBQVU7UUFBQ3lDLE9BQU8sRUFBRSxTQUFUQSxPQUFPQSxDQUFBO1VBQUEsT0FBUS9CLE1BQUksQ0FBQ0YsYUFBYSxDQUFDLEVBQUUsQ0FBQztRQUFBLENBQUM7UUFBQWUsTUFBQTtRQUFBQyxRQUFBO1VBQUFDLFFBQUEsRUFBQUMsWUFBQTtVQUFBQyxVQUFBO1VBQUFDLFlBQUE7UUFBQTtNQUFBLEdBQUMsSUFFbkYsQ0FDTCxDQUFDLEVBQ05ULEtBQUE7UUFBQUksTUFBQTtRQUFBQyxRQUFBO1VBQUFDLFFBQUEsRUFBQUMsWUFBQTtVQUFBQyxVQUFBO1VBQUFDLFlBQUE7UUFBQTtNQUFBLEdBQ0VULEtBQUE7UUFBS1ksR0FBRyxFQUFDLGlCQUFpQjtRQUFDTSxLQUFLLEVBQUMsTUFBTTtRQUFDQyxHQUFHLEVBQUMsU0FBUztRQUFBZixNQUFBO1FBQUFDLFFBQUE7VUFBQUMsUUFBQSxFQUFBQyxZQUFBO1VBQUFDLFVBQUE7VUFBQUMsWUFBQTtRQUFBO01BQUEsQ0FBRSxDQUFDLEVBQ3hEVCxLQUFBLENBQUNvQiwyQ0FBTTtRQUFDQyxJQUFJLEVBQUV4QyxLQUFLLEtBQUssR0FBRyxHQUFHLFNBQVMsR0FBRyxTQUFVO1FBQUN5QyxPQUFPLEVBQUUsU0FBVEEsT0FBT0EsQ0FBQTtVQUFBLE9BQVEvQixNQUFJLENBQUNGLGFBQWEsQ0FBQyxHQUFHLENBQUM7UUFBQSxDQUFDO1FBQUFlLE1BQUE7UUFBQUMsUUFBQTtVQUFBQyxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUE7TUFBQSxHQUFDLEtBRXJGLENBQ0wsQ0FBQyxFQUNOVCxLQUFBO1FBQUFJLE1BQUE7UUFBQUMsUUFBQTtVQUFBQyxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUE7TUFBQSxHQUNFVCxLQUFBO1FBQUtZLEdBQUcsRUFBQyxpQkFBaUI7UUFBQ00sS0FBSyxFQUFDLE1BQU07UUFBQ0MsR0FBRyxFQUFDLFNBQVM7UUFBQWYsTUFBQTtRQUFBQyxRQUFBO1VBQUFDLFFBQUEsRUFBQUMsWUFBQTtVQUFBQyxVQUFBO1VBQUFDLFlBQUE7UUFBQTtNQUFBLENBQUUsQ0FBQyxFQUN4RFQsS0FBQSxDQUFDb0IsMkNBQU07UUFBQ0MsSUFBSSxFQUFFeEMsS0FBSyxLQUFLLEdBQUcsR0FBRyxTQUFTLEdBQUcsU0FBVTtRQUFDeUMsT0FBTyxFQUFFLFNBQVRBLE9BQU9BLENBQUE7VUFBQSxPQUFRL0IsTUFBSSxDQUFDRixhQUFhLENBQUMsR0FBRyxDQUFDO1FBQUEsQ0FBQztRQUFBZSxNQUFBO1FBQUFDLFFBQUE7VUFBQUMsUUFBQSxFQUFBQyxZQUFBO1VBQUFDLFVBQUE7VUFBQUMsWUFBQTtRQUFBO01BQUEsR0FBQyxLQUVyRixDQUNMLENBQUMsRUFDTlQsS0FBQTtRQUFBSSxNQUFBO1FBQUFDLFFBQUE7VUFBQUMsUUFBQSxFQUFBQyxZQUFBO1VBQUFDLFVBQUE7VUFBQUMsWUFBQTtRQUFBO01BQUEsR0FDRVQsS0FBQTtRQUFLWSxHQUFHLEVBQUMsaUJBQWlCO1FBQUNNLEtBQUssRUFBQyxNQUFNO1FBQUNDLEdBQUcsRUFBQyxTQUFTO1FBQUFmLE1BQUE7UUFBQUMsUUFBQTtVQUFBQyxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUE7TUFBQSxDQUFFLENBQUMsRUFDeERULEtBQUEsQ0FBQ29CLDJDQUFNO1FBQUNDLElBQUksRUFBRXhDLEtBQUssS0FBSyxHQUFHLEdBQUcsU0FBUyxHQUFHLFNBQVU7UUFBQ3lDLE9BQU8sRUFBRSxTQUFUQSxPQUFPQSxDQUFBO1VBQUEsT0FBUS9CLE1BQUksQ0FBQ0YsYUFBYSxDQUFDLEdBQUcsQ0FBQztRQUFBLENBQUM7UUFBQWUsTUFBQTtRQUFBQyxRQUFBO1VBQUFDLFFBQUEsRUFBQUMsWUFBQTtVQUFBQyxVQUFBO1VBQUFDLFlBQUE7UUFBQTtNQUFBLEdBQUMsS0FFckYsQ0FDTCxDQUFDLEVBQ05ULEtBQUE7UUFBQUksTUFBQTtRQUFBQyxRQUFBO1VBQUFDLFFBQUEsRUFBQUMsWUFBQTtVQUFBQyxVQUFBO1VBQUFDLFlBQUE7UUFBQTtNQUFBLEdBQ0VULEtBQUE7UUFBS1ksR0FBRyxFQUFDLGlCQUFpQjtRQUFDTSxLQUFLLEVBQUMsTUFBTTtRQUFDQyxHQUFHLEVBQUMsU0FBUztRQUFBZixNQUFBO1FBQUFDLFFBQUE7VUFBQUMsUUFBQSxFQUFBQyxZQUFBO1VBQUFDLFVBQUE7VUFBQUMsWUFBQTtRQUFBO01BQUEsQ0FBRSxDQUFDLEVBQ3hEVCxLQUFBLENBQUNvQiwyQ0FBTTtRQUFDQyxJQUFJLEVBQUV4QyxLQUFLLEtBQUssSUFBSSxHQUFHLFNBQVMsR0FBRyxTQUFVO1FBQUN5QyxPQUFPLEVBQUUsU0FBVEEsT0FBT0EsQ0FBQTtVQUFBLE9BQVEvQixNQUFJLENBQUNGLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFBQSxDQUFDO1FBQUFlLE1BQUE7UUFBQUMsUUFBQTtVQUFBQyxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUE7TUFBQSxHQUFDLE1BRXZGLENBQ0wsQ0FDRixDQUFDLEVBQ05ULEtBQUE7UUFBS0csU0FBUyxFQUFDLFdBQVc7UUFBQUMsTUFBQTtRQUFBQyxRQUFBO1VBQUFDLFFBQUEsRUFBQUMsWUFBQTtVQUFBQyxVQUFBO1VBQUFDLFlBQUE7UUFBQTtNQUFBLEdBQ3hCVCxLQUFBO1FBQUt1QixLQUFLLEVBQUU7VUFBRUMsU0FBUyxFQUFFO1FBQVMsQ0FBRTtRQUFBcEIsTUFBQTtRQUFBQyxRQUFBO1VBQUFDLFFBQUEsRUFBQUMsWUFBQTtVQUFBQyxVQUFBO1VBQUFDLFlBQUE7UUFBQTtNQUFBLEdBQ2xDVCxLQUFBO1FBQUFJLE1BQUE7UUFBQUMsUUFBQTtVQUFBQyxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUE7TUFBQSxHQUFHLCtCQUFnQyxDQUFDLEVBQ3BDVCxLQUFBLENBQUN5QixnREFBVztRQUFDQyxHQUFHLEVBQUUsQ0FBRTtRQUFDQyxTQUFTLEVBQUUsQ0FBRTtRQUFDQyxRQUFRLEVBQUUsSUFBSSxDQUFDdkMsYUFBYSxDQUFDd0MsSUFBSSxDQUFDLElBQUksQ0FBRTtRQUFDekMsS0FBSyxFQUFFUCxLQUFNO1FBQUF1QixNQUFBO1FBQUFDLFFBQUE7VUFBQUMsUUFBQSxFQUFBQyxZQUFBO1VBQUFDLFVBQUE7VUFBQUMsWUFBQTtRQUFBO01BQUEsQ0FBRSxDQUN4RixDQUNGLENBQUMsRUFDTlQsS0FBQSxDQUFDb0IsMkNBQU07UUFBQ0MsSUFBSSxFQUFDLFNBQVM7UUFBQ1MsT0FBTyxFQUFFbEMsU0FBVTtRQUFDMEIsT0FBTyxFQUFFLFNBQVRBLE9BQU9BLENBQUE7VUFBQSxPQUFRNUIsUUFBUSxDQUFDYixLQUFLLEVBQUVDLFNBQVMsQ0FBQztRQUFBLENBQUM7UUFBQXNCLE1BQUE7UUFBQUMsUUFBQTtVQUFBQyxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUE7TUFBQSxHQUFDLFVBQWdCLENBQUMsRUFDdkdULEtBQUE7UUFBS3VCLEtBQUssRUFBRTtVQUFFUSxPQUFPLEVBQUU7UUFBTyxDQUFFO1FBQUEzQixNQUFBO1FBQUFDLFFBQUE7VUFBQUMsUUFBQSxFQUFBQyxZQUFBO1VBQUFDLFVBQUE7VUFBQUMsWUFBQTtRQUFBO01BQUEsR0FDOUJULEtBQUEsQ0FBQ2dDLDZDQUFRO1FBQUNDLGNBQWMsRUFBRW5ELFNBQVU7UUFBQzhDLFFBQVEsRUFBRSxJQUFJLENBQUNBLFFBQVM7UUFBQXhCLE1BQUE7UUFBQUMsUUFBQTtVQUFBQyxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUE7TUFBQSxHQUFDLFNBQWlCLENBQzVFLENBQ0YsQ0FBQyxFQUNOVCxLQUFBO1FBQUtHLFNBQVMsRUFBQyxnQkFBZ0I7UUFBQUMsTUFBQTtRQUFBQyxRQUFBO1VBQUFDLFFBQUEsRUFBQUMsWUFBQTtVQUFBQyxVQUFBO1VBQUFDLFlBQUE7UUFBQTtNQUFBLEdBQUMsV0FFOUIsRUFBQyxHQUFHLEVBQ0pULEtBQUE7UUFBS1ksR0FBRyxFQUFDLGlCQUFpQjtRQUFDTSxLQUFLLEVBQUMsTUFBTTtRQUFDQyxHQUFHLEVBQUMsU0FBUztRQUFBZixNQUFBO1FBQUFDLFFBQUE7VUFBQUMsUUFBQSxFQUFBQyxZQUFBO1VBQUFDLFVBQUE7VUFBQUMsWUFBQTtRQUFBO01BQUEsQ0FBRSxDQUFDLEVBQ3hEVCxLQUFBO1FBQU1HLFNBQVMsRUFBQyxXQUFXO1FBQUFDLE1BQUE7UUFBQUMsUUFBQTtVQUFBQyxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUE7TUFBQSxHQUFFeUIsSUFBSSxDQUFDQyxLQUFLLENBQUNyQyxXQUFXLGFBQVhBLFdBQVcsdUJBQVhBLFdBQVcsQ0FBRXNDLFdBQVcsQ0FBUSxDQUNyRSxDQUNMLENBQUM7SUFFUDtFQUFDO0FBQUEsRUE3RzRCQyxtREFBYTtBQWdINUMsSUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQUl2RCxLQUFVO0VBQUEsT0FBTTtJQUNqQ2UsV0FBVyxFQUFBeUMsYUFBQSxLQUFPeEQsS0FBSyxDQUFDeUQsSUFBSSxDQUFDQyxPQUFPO0VBQ3RDLENBQUM7QUFBQSxDQUFDO0FBRUYsSUFBTUMsV0FBVyxHQUFHLENBQUMsQ0FBQztBQUNQQywySEFBTyxDQUFDTCxTQUFTLEVBQUVJLFdBQVcsQ0FBQyxDQUFDMUUsZ0JBQWdCLENBQUMsRUFBQyIsImZpbGUiOiJzdGF0aWMvY2h1bmtzLzExLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtcclxuICBJbnB1dE51bWJlciwgQnV0dG9uLCBBdmF0YXIsIENoZWNrYm94XHJcbn0gZnJvbSAnYW50ZCc7XHJcbmltcG9ydCB7IFRpY2tJY29uIH0gZnJvbSAnc3JjL2ljb25zJztcclxuaW1wb3J0IHsgSVBlcmZvcm1lciB9IGZyb20gJ0BpbnRlcmZhY2VzL2luZGV4JztcclxuaW1wb3J0ICcuL3BlcmZvcm1lci5sZXNzJztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuXHJcbmludGVyZmFjZSBJUHJvcHMge1xyXG4gIHBlcmZvcm1lcjogSVBlcmZvcm1lcjtcclxuICBvbkZpbmlzaChwcmljZTogYW55LCBpc0NvbmZpcm0gOmJvb2xlYW4pOiBGdW5jdGlvbjtcclxuICBzdWJtaXRpbmc6IGJvb2xlYW47XHJcbiAgY3VycmVudFVzZXI6IElQZXJmb3JtZXI7XHJcbn1cclxuXHJcbmNsYXNzIFRpcFBlcmZvcm1lckZvcm0gZXh0ZW5kcyBQdXJlQ29tcG9uZW50PElQcm9wcz4ge1xyXG4gIHN0YXRlID0ge1xyXG4gICAgcHJpY2U6IDEwLFxyXG4gICAgaXNDb25maXJtOiBmYWxzZVxyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2VWYWx1ZShwcmljZSkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHByaWNlIH0pO1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IGlzQ29uZmlybSB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBpc0NvbmZpcm06ICFpc0NvbmZpcm1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBvbkZpbmlzaCwgc3VibWl0aW5nID0gZmFsc2UsIHBlcmZvcm1lciwgY3VycmVudFVzZXJcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgeyBwcmljZSwgaXNDb25maXJtIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPD5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbmZpcm0tc3Vic2NyaXB0aW9uLWZvcm1cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgQWxsIGRvbmF0aW9ucyBjb250cmlidXRlIHRvIG15XHJcbiAgICAgICAgICAgICAgeycgJ31cclxuICAgICAgICAgICAgICA8YnIgLz5cclxuICAgICAgICAgICAgICA8YSBocmVmPVwiL21vZGVsP3RhYj1tb2RlbCZmaWx0ZXI9ZWFybmluZ0N1cnJlbnRNb250aFwiPk1vc3QgU3VwcG9ydGVkPC9hPlxyXG4gICAgICAgICAgICAgIHsnICd9XHJcbiAgICAgICAgICAgICAgcmFua2luZy5cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtaGVscFwiPlxyXG4gICAgICAgICAgICA8c3Bhbj5IZWxwIG1lIGdldCB0byB0aGUgdG9wPC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgIDxBdmF0YXIgc3JjPXtwZXJmb3JtZXI/LmF2YXRhciB8fCAnL3N0YXRpYy9uby1hdmF0YXIucG5nJ30gLz5cclxuICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAge3BlcmZvcm1lcj8ubmFtZSB8fCBwZXJmb3JtZXI/LnVzZXJuYW1lIHx8ICdOL0EnfVxyXG4gICAgICAgICAgICAgIHsnICd9XHJcbiAgICAgICAgICAgICAge3BlcmZvcm1lcj8udmVyaWZpZWRBY2NvdW50ICYmIDxUaWNrSWNvbiBjbGFzc05hbWU9XCJwcmltYXJ5LWNvbG9yXCIgLz59XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXAtZ3Jwc1wiPlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiL3N0YXRpYy9nZW0ucG5nXCIgd2lkdGg9XCIyMHB4XCIgYWx0PVwiZ2VtLWljb1wiIC8+XHJcbiAgICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPXtwcmljZSA9PT0gMTAgPyAncHJpbWFyeScgOiAnZGVmYXVsdCd9IG9uQ2xpY2s9eygpID0+IHRoaXMub25DaGFuZ2VWYWx1ZSgxMCl9PlxyXG4gICAgICAgICAgICAgICAgMTBcclxuICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvc3RhdGljL2dlbS5wbmdcIiB3aWR0aD1cIjIwcHhcIiBhbHQ9XCJnZW0taWNvXCIgLz5cclxuICAgICAgICAgICAgICA8QnV0dG9uIHR5cGU9e3ByaWNlID09PSAyMCA/ICdwcmltYXJ5JyA6ICdkZWZhdWx0J30gb25DbGljaz17KCkgPT4gdGhpcy5vbkNoYW5nZVZhbHVlKDIwKX0+XHJcbiAgICAgICAgICAgICAgICAyMFxyXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9zdGF0aWMvZ2VtLnBuZ1wiIHdpZHRoPVwiMjBweFwiIGFsdD1cImdlbS1pY29cIiAvPlxyXG4gICAgICAgICAgICAgIDxCdXR0b24gdHlwZT17cHJpY2UgPT09IDUwID8gJ3ByaW1hcnknIDogJ2RlZmF1bHQnfSBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uQ2hhbmdlVmFsdWUoNTApfT5cclxuICAgICAgICAgICAgICAgIDUwXHJcbiAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiL3N0YXRpYy9nZW0ucG5nXCIgd2lkdGg9XCIyMHB4XCIgYWx0PVwiZ2VtLWljb1wiIC8+XHJcbiAgICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPXtwcmljZSA9PT0gMTAwID8gJ3ByaW1hcnknIDogJ2RlZmF1bHQnfSBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uQ2hhbmdlVmFsdWUoMTAwKX0+XHJcbiAgICAgICAgICAgICAgICAxMDBcclxuICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvc3RhdGljL2dlbS5wbmdcIiB3aWR0aD1cIjIwcHhcIiBhbHQ9XCJnZW0taWNvXCIgLz5cclxuICAgICAgICAgICAgICA8QnV0dG9uIHR5cGU9e3ByaWNlID09PSAyMDAgPyAncHJpbWFyeScgOiAnZGVmYXVsdCd9IG9uQ2xpY2s9eygpID0+IHRoaXMub25DaGFuZ2VWYWx1ZSgyMDApfT5cclxuICAgICAgICAgICAgICAgIDIwMFxyXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9zdGF0aWMvZ2VtLnBuZ1wiIHdpZHRoPVwiMjBweFwiIGFsdD1cImdlbS1pY29cIiAvPlxyXG4gICAgICAgICAgICAgIDxCdXR0b24gdHlwZT17cHJpY2UgPT09IDUwMCA/ICdwcmltYXJ5JyA6ICdkZWZhdWx0J30gb25DbGljaz17KCkgPT4gdGhpcy5vbkNoYW5nZVZhbHVlKDUwMCl9PlxyXG4gICAgICAgICAgICAgICAgNTAwXHJcbiAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiL3N0YXRpYy9nZW0ucG5nXCIgd2lkdGg9XCIyMHB4XCIgYWx0PVwiZ2VtLWljb1wiIC8+XHJcbiAgICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPXtwcmljZSA9PT0gMTAwMCA/ICdwcmltYXJ5JyA6ICdkZWZhdWx0J30gb25DbGljaz17KCkgPT4gdGhpcy5vbkNoYW5nZVZhbHVlKDEwMDApfT5cclxuICAgICAgICAgICAgICAgIDEwMDBcclxuICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5mby1ib2R5XCI+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cclxuICAgICAgICAgICAgICA8cD5FbnRlciB5b3VyIHRpcCBhbW91bnQgaW4gcnVieTwvcD5cclxuICAgICAgICAgICAgICA8SW5wdXROdW1iZXIgbWluPXsxfSBwcmVjaXNpb249ezB9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlVmFsdWUuYmluZCh0aGlzKX0gdmFsdWU9e3ByaWNlfSAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPEJ1dHRvbiB0eXBlPVwicHJpbWFyeVwiIGxvYWRpbmc9e3N1Ym1pdGluZ30gb25DbGljaz17KCkgPT4gb25GaW5pc2gocHJpY2UsIGlzQ29uZmlybSl9PlNFTkQgVElQPC9CdXR0b24+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4JyB9fT5cclxuICAgICAgICAgICAgPENoZWNrYm94IGRlZmF1bHRDaGVja2VkPXtpc0NvbmZpcm19IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfT5Db25maXJtPC9DaGVja2JveD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9vdGVyLWNvbnRlbnRcIj5cclxuICAgICAgICAgIEF2YWlsYWJsZVxyXG4gICAgICAgICAgeycgJ31cclxuICAgICAgICAgIDxpbWcgc3JjPVwiL3N0YXRpYy9nZW0ucG5nXCIgd2lkdGg9XCIyMHB4XCIgYWx0PVwiZ2VtLWljb1wiIC8+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ1c2VyLXJ1YnlcIj57TWF0aC5yb3VuZChjdXJyZW50VXNlcj8ucnVieUJhbGFuY2UpfTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC8+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVzID0gKHN0YXRlOiBhbnkpID0+ICh7XHJcbiAgY3VycmVudFVzZXI6IHsgLi4uc3RhdGUudXNlci5jdXJyZW50IH1cclxufSk7XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaCA9IHt9O1xyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlcywgbWFwRGlzcGF0Y2gpKFRpcFBlcmZvcm1lckZvcm0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9