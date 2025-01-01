exports.ids = [0];
exports.modules = {

/***/ "./src/components/common/base/loader.less":
/*!************************************************!*\
  !*** ./src/components/common/base/loader.less ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/components/common/base/loader.tsx":
/*!***********************************************!*\
  !*** ./src/components/common/base/loader.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _loader_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loader.less */ "./src/components/common/base/loader.less");
/* harmony import */ var _loader_less__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_loader_less__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "C:\\Users\\Rokibul\\Documents\\case\\src\\components\\common\\base\\loader.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */



class Loader extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  render() {
    const {
      ui,
      customText
    } = this.props;
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
}
const mapStatesToProps = state => ({
  ui: _objectSpread({}, state.ui)
});
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStatesToProps)(Loader));

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jb21tb24vYmFzZS9sb2FkZXIudHN4Il0sIm5hbWVzIjpbIkxvYWRlciIsIlB1cmVDb21wb25lbnQiLCJyZW5kZXIiLCJ1aSIsImN1c3RvbVRleHQiLCJwcm9wcyIsIl9fanN4IiwiY2xhc3NOYW1lIiwiX19zZWxmIiwiX19zb3VyY2UiLCJmaWxlTmFtZSIsIl9qc3hGaWxlTmFtZSIsImxpbmVOdW1iZXIiLCJjb2x1bW5OdW1iZXIiLCJzdHlsZSIsInRleHRBbGlnbiIsImFsdCIsInNyYyIsIm1hcFN0YXRlc1RvUHJvcHMiLCJzdGF0ZSIsIl9vYmplY3RTcHJlYWQiLCJjb25uZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNzQztBQUVBO0FBRWY7QUFPdkIsTUFBTUEsTUFBTSxTQUFTQyxtREFBYSxDQUFTO0VBQ3pDQyxNQUFNQSxDQUFBLEVBQUc7SUFDUCxNQUFNO01BQUVDLEVBQUU7TUFBRUM7SUFBVyxDQUFDLEdBQUcsSUFBSSxDQUFDQyxLQUFLO0lBQ3JDLE9BQ0VDLEtBQUE7TUFBS0MsU0FBUyxFQUFDLGdCQUFnQjtNQUFBQyxNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsR0FDN0JQLEtBQUE7TUFBS1EsS0FBSyxFQUFFO1FBQUVDLFNBQVMsRUFBRTtNQUFTLENBQUU7TUFBQVAsTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLEdBRWxDUCxLQUFBO01BQUtVLEdBQUcsRUFBQyxhQUFhO01BQUNDLEdBQUcsRUFBQyxrQkFBa0I7TUFBQVQsTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLENBQUUsQ0FBQyxFQUMvQ1QsVUFBVSxJQUFJRSxLQUFBO01BQUFFLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxHQUFJVCxVQUFjLENBQzlCLENBQ0YsQ0FBQztFQUVWO0FBQ0Y7QUFDQSxNQUFNYyxnQkFBZ0IsR0FBSUMsS0FBSyxLQUFNO0VBQ25DaEIsRUFBRSxFQUFBaUIsYUFBQSxLQUFPRCxLQUFLLENBQUNoQixFQUFFO0FBQ25CLENBQUMsQ0FBQztBQUNha0IsMEhBQU8sQ0FBQ0gsZ0JBQWdCLENBQUMsQ0FBQ2xCLE1BQU0sQ0FBQyxFIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9yZXF1aXJlLWRlZmF1bHQtcHJvcHMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3BpbiB9IGZyb20gJ2FudGQnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IElVSUNvbmZpZyB9IGZyb20gJ0BpbnRlcmZhY2VzL2luZGV4JztcbmltcG9ydCAnLi9sb2FkZXIubGVzcyc7XG5cbmludGVyZmFjZSBJUHJvcHMge1xuICB1aTogSVVJQ29uZmlnLFxuICBjdXN0b21UZXh0Pzogc3RyaW5nO1xufVxuXG5jbGFzcyBMb2FkZXIgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PElQcm9wcz4ge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyB1aSwgY3VzdG9tVGV4dCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2FkaW5nLXNjcmVlblwiPlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgey8qIHt1aS5sb2dvID8gPGltZyBhbHQ9XCJsb2FkaW5nLWljb1wiIHNyYz17dWkubG9nb30gLz4gOiB1aS5zaXRlTmFtZSA/IDxzcGFuPnt1aS5zaXRlTmFtZX08L3NwYW4+IDogPFNwaW4gc2l6ZT1cImxhcmdlXCIgLz59ICovfVxuICAgICAgICAgIDxpbWcgYWx0PVwibG9hZGluZy1pY29cIiBzcmM9XCIvaW1hZ2VzL2xvZ28ucG5nXCIgLz5cbiAgICAgICAgICB7Y3VzdG9tVGV4dCAmJiA8cD57Y3VzdG9tVGV4dH08L3A+fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbmNvbnN0IG1hcFN0YXRlc1RvUHJvcHMgPSAoc3RhdGUpID0+ICh7XG4gIHVpOiB7IC4uLnN0YXRlLnVpIH1cbn0pO1xuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZXNUb1Byb3BzKShMb2FkZXIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==