exports.ids = [8];
exports.modules = {

/***/ "./src/components/report/report-form.tsx":
/*!***********************************************!*\
  !*** ./src/components/report/report-form.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReportForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "C:\\Users\\roman\\Pictures\\Case\\row\\src\\components\\report\\report-form.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


class ReportForm extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "state", {
      reason: 'Anoying'
    });
  }
  onChangeValue(e) {
    this.setState({
      reason: e.target.value
    });
  }
  render() {
    const {
      onFinish,
      submiting = false,
      performer,
      objectType
    } = this.props;
    const {
      reason
    } = this.state;
    return __jsx("div", {
      className: "confirm-subscription-form",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: "text-center",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 9
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Avatar"], {
      alt: "main-avt",
      src: (performer === null || performer === void 0 ? void 0 : performer.avatar) || '/static/no-avatar.png',
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 31,
        columnNumber: 11
      }
    })), __jsx("div", {
      className: "info-body",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 9
      }
    }, __jsx("div", {
      style: {
        marginBottom: '15px',
        width: '100%',
        textAlign: 'center'
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 37,
        columnNumber: 11
      }
    }, __jsx("p", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38,
        columnNumber: 13
      }
    }, "Report post"), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Input"].TextArea, {
      placeholder: objectType === 'video' ? 'Tell us why you are reporting this video?' : 'Tell us why you are reporting this photo?',
      minLength: 20,
      showCount: true,
      maxLength: 100,
      onChange: this.onChangeValue.bind(this),
      rows: 3,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 13
      }
    }))), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      type: "primary",
      disabled: submiting,
      loading: submiting,
      onClick: () => onFinish(reason),
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42,
        columnNumber: 9
      }
    }, "SUBMIT"));
  }
}

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9yZXBvcnQvcmVwb3J0LWZvcm0udHN4Il0sIm5hbWVzIjpbIlJlcG9ydEZvcm0iLCJQdXJlQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJhcmdzIiwiX2RlZmluZVByb3BlcnR5IiwicmVhc29uIiwib25DaGFuZ2VWYWx1ZSIsImUiLCJzZXRTdGF0ZSIsInRhcmdldCIsInZhbHVlIiwicmVuZGVyIiwib25GaW5pc2giLCJzdWJtaXRpbmciLCJwZXJmb3JtZXIiLCJvYmplY3RUeXBlIiwicHJvcHMiLCJzdGF0ZSIsIl9fanN4IiwiY2xhc3NOYW1lIiwiX19zZWxmIiwiX19zb3VyY2UiLCJmaWxlTmFtZSIsIl9qc3hGaWxlTmFtZSIsImxpbmVOdW1iZXIiLCJjb2x1bW5OdW1iZXIiLCJBdmF0YXIiLCJhbHQiLCJzcmMiLCJhdmF0YXIiLCJzdHlsZSIsIm1hcmdpbkJvdHRvbSIsIndpZHRoIiwidGV4dEFsaWduIiwiSW5wdXQiLCJUZXh0QXJlYSIsInBsYWNlaG9sZGVyIiwibWluTGVuZ3RoIiwic2hvd0NvdW50IiwibWF4TGVuZ3RoIiwib25DaGFuZ2UiLCJiaW5kIiwicm93cyIsIkJ1dHRvbiIsInR5cGUiLCJkaXNhYmxlZCIsImxvYWRpbmciLCJvbkNsaWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFzQztBQUd4QjtBQVVDLE1BQU1BLFVBQVUsU0FBU0MsbURBQWEsQ0FBUztFQUFBQyxZQUFBLEdBQUFDLElBQUE7SUFBQSxTQUFBQSxJQUFBO0lBQUFDLGVBQUEsZ0JBQ3BEO01BQ05DLE1BQU0sRUFBRTtJQUNWLENBQUM7RUFBQTtFQUVEQyxhQUFhQSxDQUFDQyxDQUFDLEVBQUU7SUFDZixJQUFJLENBQUNDLFFBQVEsQ0FBQztNQUFFSCxNQUFNLEVBQUVFLENBQUMsQ0FBQ0UsTUFBTSxDQUFDQztJQUFNLENBQUMsQ0FBQztFQUMzQztFQUVBQyxNQUFNQSxDQUFBLEVBQUc7SUFDUCxNQUFNO01BQ0pDLFFBQVE7TUFBRUMsU0FBUyxHQUFHLEtBQUs7TUFBRUMsU0FBUztNQUFFQztJQUMxQyxDQUFDLEdBQUcsSUFBSSxDQUFDQyxLQUFLO0lBQ2QsTUFBTTtNQUFFWDtJQUFPLENBQUMsR0FBRyxJQUFJLENBQUNZLEtBQUs7SUFDN0IsT0FDRUMsS0FBQTtNQUFLQyxTQUFTLEVBQUMsMkJBQTJCO01BQUFDLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxHQUN4Q1AsS0FBQTtNQUFLQyxTQUFTLEVBQUMsYUFBYTtNQUFBQyxNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsR0FDMUJQLEtBQUEsQ0FBQ1EsMkNBQU07TUFDTEMsR0FBRyxFQUFDLFVBQVU7TUFDZEMsR0FBRyxFQUFFLENBQUFkLFNBQVMsYUFBVEEsU0FBUyx1QkFBVEEsU0FBUyxDQUFFZSxNQUFNLEtBQUksdUJBQXdCO01BQUFULE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxDQUNuRCxDQUNFLENBQUMsRUFDTlAsS0FBQTtNQUFLQyxTQUFTLEVBQUMsV0FBVztNQUFBQyxNQUFBO01BQUFDLFFBQUE7UUFBQUMsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBO0lBQUEsR0FDeEJQLEtBQUE7TUFBS1ksS0FBSyxFQUFFO1FBQUVDLFlBQVksRUFBRSxNQUFNO1FBQUVDLEtBQUssRUFBRSxNQUFNO1FBQUVDLFNBQVMsRUFBRTtNQUFTLENBQUU7TUFBQWIsTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLEdBQ3ZFUCxLQUFBO01BQUFFLE1BQUE7TUFBQUMsUUFBQTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUE7SUFBQSxHQUFHLGFBQWMsQ0FBQyxFQUNsQlAsS0FBQSxDQUFDZ0IsMENBQUssQ0FBQ0MsUUFBUTtNQUFDQyxXQUFXLEVBQUVyQixVQUFVLEtBQUssT0FBTyxHQUFHLDJDQUEyQyxHQUFHLDJDQUE0QztNQUFDc0IsU0FBUyxFQUFFLEVBQUc7TUFBQ0MsU0FBUztNQUFDQyxTQUFTLEVBQUUsR0FBSTtNQUFDQyxRQUFRLEVBQUUsSUFBSSxDQUFDbEMsYUFBYSxDQUFDbUMsSUFBSSxDQUFDLElBQUksQ0FBRTtNQUFDQyxJQUFJLEVBQUUsQ0FBRTtNQUFBdEIsTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLENBQUUsQ0FDMU8sQ0FDRixDQUFDLEVBQ05QLEtBQUEsQ0FBQ3lCLDJDQUFNO01BQUNDLElBQUksRUFBQyxTQUFTO01BQUNDLFFBQVEsRUFBRWhDLFNBQVU7TUFBQ2lDLE9BQU8sRUFBRWpDLFNBQVU7TUFBQ2tDLE9BQU8sRUFBRUEsQ0FBQSxLQUFNbkMsUUFBUSxDQUFDUCxNQUFNLENBQUU7TUFBQWUsTUFBQTtNQUFBQyxRQUFBO1FBQUFDLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQTtJQUFBLEdBQUMsUUFBYyxDQUM1RyxDQUFDO0VBRVY7QUFDRixDIiwiZmlsZSI6IjguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1xyXG4gIElucHV0LCBCdXR0b24sIEF2YXRhclxyXG59IGZyb20gJ2FudGQnO1xyXG5pbXBvcnQgeyBJUGVyZm9ybWVyIH0gZnJvbSAnQGludGVyZmFjZXMvaW5kZXgnO1xyXG5cclxuaW50ZXJmYWNlIElQcm9wcyB7XHJcbiAgcGVyZm9ybWVyOiBJUGVyZm9ybWVyO1xyXG4gIG9uRmluaXNoOiBGdW5jdGlvbjtcclxuICBzdWJtaXRpbmc6IGJvb2xlYW47XHJcbiAgb2JqZWN0VHlwZSA6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVwb3J0Rm9ybSBleHRlbmRzIFB1cmVDb21wb25lbnQ8SVByb3BzPiB7XHJcbiAgc3RhdGUgPSB7XHJcbiAgICByZWFzb246ICdBbm95aW5nJ1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2VWYWx1ZShlKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgcmVhc29uOiBlLnRhcmdldC52YWx1ZSB9KTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgb25GaW5pc2gsIHN1Ym1pdGluZyA9IGZhbHNlLCBwZXJmb3JtZXIsIG9iamVjdFR5cGVcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgeyByZWFzb24gfSA9IHRoaXMuc3RhdGU7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbmZpcm0tc3Vic2NyaXB0aW9uLWZvcm1cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICA8QXZhdGFyXHJcbiAgICAgICAgICAgIGFsdD1cIm1haW4tYXZ0XCJcclxuICAgICAgICAgICAgc3JjPXtwZXJmb3JtZXI/LmF2YXRhciB8fCAnL3N0YXRpYy9uby1hdmF0YXIucG5nJ31cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmZvLWJvZHlcIj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMTVweCcsIHdpZHRoOiAnMTAwJScsIHRleHRBbGlnbjogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgIDxwPlJlcG9ydCBwb3N0PC9wPlxyXG4gICAgICAgICAgICA8SW5wdXQuVGV4dEFyZWEgcGxhY2Vob2xkZXI9e29iamVjdFR5cGUgPT09ICd2aWRlbycgPyAnVGVsbCB1cyB3aHkgeW91IGFyZSByZXBvcnRpbmcgdGhpcyB2aWRlbz8nIDogJ1RlbGwgdXMgd2h5IHlvdSBhcmUgcmVwb3J0aW5nIHRoaXMgcGhvdG8/J30gbWluTGVuZ3RoPXsyMH0gc2hvd0NvdW50IG1heExlbmd0aD17MTAwfSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZVZhbHVlLmJpbmQodGhpcyl9IHJvd3M9ezN9IC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8QnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgZGlzYWJsZWQ9e3N1Ym1pdGluZ30gbG9hZGluZz17c3VibWl0aW5nfSBvbkNsaWNrPXsoKSA9PiBvbkZpbmlzaChyZWFzb24pfT5TVUJNSVQ8L0J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9