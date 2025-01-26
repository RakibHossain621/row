(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[0],{

/***/ "./src/components/common/base/loader.tsx":
/*!***********************************************!*\
  !*** ./src/components/common/base/loader.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _loader_less__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./loader.less */ "./src/components/common/base/loader.less");
/* harmony import */ var _loader_less__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_loader_less__WEBPACK_IMPORTED_MODULE_8__);






var _jsxFileName = "C:\\Users\\roman\\Pictures\\Case\\row\\src\\components\\common\\base\\loader.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(o), Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */



var Loader = /*#__PURE__*/function (_PureComponent) {
  function Loader() {
    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Loader);
    return _callSuper(this, Loader, arguments);
  }
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(Loader, _PureComponent);
  return Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Loader, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        ui = _this$props.ui,
        customText = _this$props.customText;
      return __jsx("div", {
        className: "loading-screen",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18,
          columnNumber: 7
        }
      }, __jsx("div", {
        style: {
          textAlign: 'center'
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19,
          columnNumber: 9
        }
      }, __jsx("img", {
        alt: "loading-ico",
        src: "/images/logo.png",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21,
          columnNumber: 11
        }
      }), customText && __jsx("p", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22,
          columnNumber: 26
        }
      }, customText)));
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_6__["PureComponent"]);
var mapStatesToProps = function mapStatesToProps(state) {
  return {
    ui: _objectSpread({}, state.ui)
  };
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["connect"])(mapStatesToProps)(Loader));

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/next/node_modules/webpack/buildin/harmony-module.js */ "./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvY29tbW9uL2Jhc2UvbG9hZGVyLnRzeCJdLCJuYW1lcyI6WyJMb2FkZXIiLCJfUHVyZUNvbXBvbmVudCIsIl9jbGFzc0NhbGxDaGVjayIsIl9jYWxsU3VwZXIiLCJhcmd1bWVudHMiLCJfaW5oZXJpdHMiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsInJlbmRlciIsIl90aGlzJHByb3BzIiwicHJvcHMiLCJ1aSIsImN1c3RvbVRleHQiLCJfX2pzeCIsImNsYXNzTmFtZSIsIl9fc2VsZiIsIl9fc291cmNlIiwiZmlsZU5hbWUiLCJfanN4RmlsZU5hbWUiLCJsaW5lTnVtYmVyIiwiY29sdW1uTnVtYmVyIiwic3R5bGUiLCJ0ZXh0QWxpZ24iLCJhbHQiLCJzcmMiLCJQdXJlQ29tcG9uZW50IiwibWFwU3RhdGVzVG9Qcm9wcyIsInN0YXRlIiwiX29iamVjdFNwcmVhZCIsImNvbm5lY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNzQztBQUVBO0FBRWY7QUFBQSxJQU9qQkEsTUFBTSwwQkFBQUMsY0FBQTtFQUFBLFNBQUFELE9BQUE7SUFBQUUseUZBQUEsT0FBQUYsTUFBQTtJQUFBLE9BQUFHLFVBQUEsT0FBQUgsTUFBQSxFQUFBSSxTQUFBO0VBQUE7RUFBQUMsbUZBQUEsQ0FBQUwsTUFBQSxFQUFBQyxjQUFBO0VBQUEsT0FBQUssc0ZBQUEsQ0FBQU4sTUFBQTtJQUFBTyxHQUFBO0lBQUFDLEtBQUEsRUFDVixTQUFBQyxNQUFNQSxDQUFBLEVBQUc7TUFDUCxJQUFBQyxXQUFBLEdBQTJCLElBQUksQ0FBQ0MsS0FBSztRQUE3QkMsRUFBRSxHQUFBRixXQUFBLENBQUZFLEVBQUU7UUFBRUMsVUFBVSxHQUFBSCxXQUFBLENBQVZHLFVBQVU7TUFDdEIsT0FDRUMsS0FBQTtRQUFLQyxTQUFTLEVBQUMsZ0JBQWdCO1FBQUFDLE1BQUE7UUFBQUMsUUFBQTtVQUFBQyxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUE7TUFBQSxHQUM3QlAsS0FBQTtRQUFLUSxLQUFLLEVBQUU7VUFBRUMsU0FBUyxFQUFFO1FBQVMsQ0FBRTtRQUFBUCxNQUFBO1FBQUFDLFFBQUE7VUFBQUMsUUFBQSxFQUFBQyxZQUFBO1VBQUFDLFVBQUE7VUFBQUMsWUFBQTtRQUFBO01BQUEsR0FFbENQLEtBQUE7UUFBS1UsR0FBRyxFQUFDLGFBQWE7UUFBQ0MsR0FBRyxFQUFDLGtCQUFrQjtRQUFBVCxNQUFBO1FBQUFDLFFBQUE7VUFBQUMsUUFBQSxFQUFBQyxZQUFBO1VBQUFDLFVBQUE7VUFBQUMsWUFBQTtRQUFBO01BQUEsQ0FBRSxDQUFDLEVBQy9DUixVQUFVLElBQUlDLEtBQUE7UUFBQUUsTUFBQTtRQUFBQyxRQUFBO1VBQUFDLFFBQUEsRUFBQUMsWUFBQTtVQUFBQyxVQUFBO1VBQUFDLFlBQUE7UUFBQTtNQUFBLEdBQUlSLFVBQWMsQ0FDOUIsQ0FDRixDQUFDO0lBRVY7RUFBQztBQUFBLEVBWmtCYSxtREFBYTtBQWNsQyxJQUFNQyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQWdCQSxDQUFJQyxLQUFLO0VBQUEsT0FBTTtJQUNuQ2hCLEVBQUUsRUFBQWlCLGFBQUEsS0FBT0QsS0FBSyxDQUFDaEIsRUFBRTtFQUNuQixDQUFDO0FBQUEsQ0FBQztBQUNha0IsMEhBQU8sQ0FBQ0gsZ0JBQWdCLENBQUMsQ0FBQzNCLE1BQU0sQ0FBQyxFQUFDIiwiZmlsZSI6InN0YXRpYy9jaHVua3MvMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3JlcXVpcmUtZGVmYXVsdC1wcm9wcyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1uZXN0ZWQtdGVybmFyeSAqL1xyXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBTcGluIH0gZnJvbSAnYW50ZCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IElVSUNvbmZpZyB9IGZyb20gJ0BpbnRlcmZhY2VzL2luZGV4JztcclxuaW1wb3J0ICcuL2xvYWRlci5sZXNzJztcclxuXHJcbmludGVyZmFjZSBJUHJvcHMge1xyXG4gIHVpOiBJVUlDb25maWcsXHJcbiAgY3VzdG9tVGV4dD86IHN0cmluZztcclxufVxyXG5cclxuY2xhc3MgTG9hZGVyIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxJUHJvcHM+IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IHVpLCBjdXN0b21UZXh0IH0gPSB0aGlzLnByb3BzO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2FkaW5nLXNjcmVlblwiPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cclxuICAgICAgICAgIHsvKiB7dWkubG9nbyA/IDxpbWcgYWx0PVwibG9hZGluZy1pY29cIiBzcmM9e3VpLmxvZ299IC8+IDogdWkuc2l0ZU5hbWUgPyA8c3Bhbj57dWkuc2l0ZU5hbWV9PC9zcGFuPiA6IDxTcGluIHNpemU9XCJsYXJnZVwiIC8+fSAqL31cclxuICAgICAgICAgIDxpbWcgYWx0PVwibG9hZGluZy1pY29cIiBzcmM9XCIvaW1hZ2VzL2xvZ28ucG5nXCIgLz5cclxuICAgICAgICAgIHtjdXN0b21UZXh0ICYmIDxwPntjdXN0b21UZXh0fTwvcD59XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuY29uc3QgbWFwU3RhdGVzVG9Qcm9wcyA9IChzdGF0ZSkgPT4gKHtcclxuICB1aTogeyAuLi5zdGF0ZS51aSB9XHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlc1RvUHJvcHMpKExvYWRlcik7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=