exports.ids = [10];
exports.modules = {

/***/ "./src/components/performer/tip-form.tsx":
/*!***********************************************!*\
  !*** ./src/components/performer/tip-form.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/icons */ "./src/icons/index.tsx");
/* harmony import */ var _performer_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./performer.less */ "./src/components/performer/performer.less");
/* harmony import */ var _performer_less__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_performer_less__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "C:\\Users\\roman\\Pictures\\Case\\row\\src\\components\\performer\\tip-form.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





class TipPerformerForm extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "state", {
      price: 10,
      isConfirm: false
    });
    _defineProperty(this, "onChange", () => {
      const {
        isConfirm
      } = this.state;
      this.setState({
        isConfirm: !isConfirm
      });
    });
  }
  onChangeValue(price) {
    this.setState({
      price
    });
  }
  render() {
    const {
      onFinish,
      submiting = false,
      performer,
      currentUser
    } = this.props;
    const {
      price,
      isConfirm
    } = this.state;
    return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
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
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Avatar"], {
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
    }, (performer === null || performer === void 0 ? void 0 : performer.name) || (performer === null || performer === void 0 ? void 0 : performer.username) || 'N/A', ' ', (performer === null || performer === void 0 ? void 0 : performer.verifiedAccount) && __jsx(src_icons__WEBPACK_IMPORTED_MODULE_2__["TickIcon"], {
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
    }), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      type: price === 10 ? 'primary' : 'default',
      onClick: () => this.onChangeValue(10),
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
    }), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      type: price === 20 ? 'primary' : 'default',
      onClick: () => this.onChangeValue(20),
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
    }), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      type: price === 50 ? 'primary' : 'default',
      onClick: () => this.onChangeValue(50),
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
    }), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      type: price === 100 ? 'primary' : 'default',
      onClick: () => this.onChangeValue(100),
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
    }), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      type: price === 200 ? 'primary' : 'default',
      onClick: () => this.onChangeValue(200),
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
    }), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      type: price === 500 ? 'primary' : 'default',
      onClick: () => this.onChangeValue(500),
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
    }), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      type: price === 1000 ? 'primary' : 'default',
      onClick: () => this.onChangeValue(1000),
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
    }, "Enter your tip amount in ruby"), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["InputNumber"], {
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
    }))), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      type: "primary",
      loading: submiting,
      onClick: () => onFinish(price, isConfirm),
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
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Checkbox"], {
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
}
const mapStates = state => ({
  currentUser: _objectSpread({}, state.user.current)
});
const mapDispatch = {};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStates, mapDispatch)(TipPerformerForm));

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wZXJmb3JtZXIvdGlwLWZvcm0udHN4Il0sIm5hbWVzIjpbIlRpcFBlcmZvcm1lckZvcm0iLCJQdXJlQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJhcmdzIiwiX2RlZmluZVByb3BlcnR5IiwicHJpY2UiLCJpc0NvbmZpcm0iLCJzdGF0ZSIsInNldFN0YXRlIiwib25DaGFuZ2VWYWx1ZSIsInJlbmRlciIsIm9uRmluaXNoIiwic3VibWl0aW5nIiwicGVyZm9ybWVyIiwiY3VycmVudFVzZXIiLCJwcm9wcyIsIl9fanN4IiwiUmVhY3QiLCJGcmFnbWVudCIsImNsYXNzTmFtZSIsIl9fc2VsZiIsIl9fc291cmNlIiwiZmlsZU5hbWUiLCJfanN4RmlsZU5hbWUiLCJsaW5lTnVtYmVyIiwiY29sdW1uTnVtYmVyIiwiaHJlZiIsIkF2YXRhciIsInNyYyIsImF2YXRhciIsIm5hbWUiLCJ1c2VybmFtZSIsInZlcmlmaWVkQWNjb3VudCIsIlRpY2tJY29uIiwid2lkdGgiLCJhbHQiLCJCdXR0b24iLCJ0eXBlIiwib25DbGljayIsInN0eWxlIiwidGV4dEFsaWduIiwiSW5wdXROdW1iZXIiLCJtaW4iLCJwcmVjaXNpb24iLCJvbkNoYW5nZSIsImJpbmQiLCJ2YWx1ZSIsImxvYWRpbmciLCJwYWRkaW5nIiwiQ2hlY2tib3giLCJkZWZhdWx0Q2hlY2tlZCIsIk1hdGgiLCJyb3VuZCIsInJ1YnlCYWxhbmNlIiwibWFwU3RhdGVzIiwiX29iamVjdFNwcmVhZCIsInVzZXIiLCJjdXJyZW50IiwibWFwRGlzcGF0Y2giLCJjb25uZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFzQztBQUd4QjtBQUN1QjtBQUVYO0FBQ1k7QUFTdEMsTUFBTUEsZ0JBQWdCLFNBQVNDLG1EQUFhLENBQVM7RUFBQUMsWUFBQSxHQUFBQyxJQUFBO0lBQUEsU0FBQUEsSUFBQTtJQUFBQyxlQUFBLGdCQUMzQztN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Q0FBQ0MsT0FBTztBQUN0QyxDQUFDLENBQUM7QUFFRixNQUFNQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ1BDLDBIQUFPLENBQUNMLFNBQVMsRUFBRUksV0FBVyxDQUFDLENBQUMxRCxnQkFBZ0IsQ0FBQyxFIiwiZmlsZSI6IjEwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtcclxuICBJbnB1dE51bWJlciwgQnV0dG9uLCBBdmF0YXIsIENoZWNrYm94XHJcbn0gZnJvbSAnYW50ZCc7XHJcbmltcG9ydCB7IFRpY2tJY29uIH0gZnJvbSAnc3JjL2ljb25zJztcclxuaW1wb3J0IHsgSVBlcmZvcm1lciB9IGZyb20gJ0BpbnRlcmZhY2VzL2luZGV4JztcclxuaW1wb3J0ICcuL3BlcmZvcm1lci5sZXNzJztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuXHJcbmludGVyZmFjZSBJUHJvcHMge1xyXG4gIHBlcmZvcm1lcjogSVBlcmZvcm1lcjtcclxuICBvbkZpbmlzaChwcmljZTogYW55LCBpc0NvbmZpcm0gOmJvb2xlYW4pOiBGdW5jdGlvbjtcclxuICBzdWJtaXRpbmc6IGJvb2xlYW47XHJcbiAgY3VycmVudFVzZXI6IElQZXJmb3JtZXI7XHJcbn1cclxuXHJcbmNsYXNzIFRpcFBlcmZvcm1lckZvcm0gZXh0ZW5kcyBQdXJlQ29tcG9uZW50PElQcm9wcz4ge1xyXG4gIHN0YXRlID0ge1xyXG4gICAgcHJpY2U6IDEwLFxyXG4gICAgaXNDb25maXJtOiBmYWxzZVxyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2VWYWx1ZShwcmljZSkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHByaWNlIH0pO1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IGlzQ29uZmlybSB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBpc0NvbmZpcm06ICFpc0NvbmZpcm1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBvbkZpbmlzaCwgc3VibWl0aW5nID0gZmFsc2UsIHBlcmZvcm1lciwgY3VycmVudFVzZXJcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgeyBwcmljZSwgaXNDb25maXJtIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPD5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbmZpcm0tc3Vic2NyaXB0aW9uLWZvcm1cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgQWxsIGRvbmF0aW9ucyBjb250cmlidXRlIHRvIG15XHJcbiAgICAgICAgICAgICAgeycgJ31cclxuICAgICAgICAgICAgICA8YnIgLz5cclxuICAgICAgICAgICAgICA8YSBocmVmPVwiL21vZGVsP3RhYj1tb2RlbCZmaWx0ZXI9ZWFybmluZ0N1cnJlbnRNb250aFwiPk1vc3QgU3VwcG9ydGVkPC9hPlxyXG4gICAgICAgICAgICAgIHsnICd9XHJcbiAgICAgICAgICAgICAgcmFua2luZy5cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtaGVscFwiPlxyXG4gICAgICAgICAgICA8c3Bhbj5IZWxwIG1lIGdldCB0byB0aGUgdG9wPC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgIDxBdmF0YXIgc3JjPXtwZXJmb3JtZXI/LmF2YXRhciB8fCAnL3N0YXRpYy9uby1hdmF0YXIucG5nJ30gLz5cclxuICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAge3BlcmZvcm1lcj8ubmFtZSB8fCBwZXJmb3JtZXI/LnVzZXJuYW1lIHx8ICdOL0EnfVxyXG4gICAgICAgICAgICAgIHsnICd9XHJcbiAgICAgICAgICAgICAge3BlcmZvcm1lcj8udmVyaWZpZWRBY2NvdW50ICYmIDxUaWNrSWNvbiBjbGFzc05hbWU9XCJwcmltYXJ5LWNvbG9yXCIgLz59XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXAtZ3Jwc1wiPlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiL3N0YXRpYy9nZW0ucG5nXCIgd2lkdGg9XCIyMHB4XCIgYWx0PVwiZ2VtLWljb1wiIC8+XHJcbiAgICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPXtwcmljZSA9PT0gMTAgPyAncHJpbWFyeScgOiAnZGVmYXVsdCd9IG9uQ2xpY2s9eygpID0+IHRoaXMub25DaGFuZ2VWYWx1ZSgxMCl9PlxyXG4gICAgICAgICAgICAgICAgMTBcclxuICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvc3RhdGljL2dlbS5wbmdcIiB3aWR0aD1cIjIwcHhcIiBhbHQ9XCJnZW0taWNvXCIgLz5cclxuICAgICAgICAgICAgICA8QnV0dG9uIHR5cGU9e3ByaWNlID09PSAyMCA/ICdwcmltYXJ5JyA6ICdkZWZhdWx0J30gb25DbGljaz17KCkgPT4gdGhpcy5vbkNoYW5nZVZhbHVlKDIwKX0+XHJcbiAgICAgICAgICAgICAgICAyMFxyXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9zdGF0aWMvZ2VtLnBuZ1wiIHdpZHRoPVwiMjBweFwiIGFsdD1cImdlbS1pY29cIiAvPlxyXG4gICAgICAgICAgICAgIDxCdXR0b24gdHlwZT17cHJpY2UgPT09IDUwID8gJ3ByaW1hcnknIDogJ2RlZmF1bHQnfSBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uQ2hhbmdlVmFsdWUoNTApfT5cclxuICAgICAgICAgICAgICAgIDUwXHJcbiAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiL3N0YXRpYy9nZW0ucG5nXCIgd2lkdGg9XCIyMHB4XCIgYWx0PVwiZ2VtLWljb1wiIC8+XHJcbiAgICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPXtwcmljZSA9PT0gMTAwID8gJ3ByaW1hcnknIDogJ2RlZmF1bHQnfSBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uQ2hhbmdlVmFsdWUoMTAwKX0+XHJcbiAgICAgICAgICAgICAgICAxMDBcclxuICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvc3RhdGljL2dlbS5wbmdcIiB3aWR0aD1cIjIwcHhcIiBhbHQ9XCJnZW0taWNvXCIgLz5cclxuICAgICAgICAgICAgICA8QnV0dG9uIHR5cGU9e3ByaWNlID09PSAyMDAgPyAncHJpbWFyeScgOiAnZGVmYXVsdCd9IG9uQ2xpY2s9eygpID0+IHRoaXMub25DaGFuZ2VWYWx1ZSgyMDApfT5cclxuICAgICAgICAgICAgICAgIDIwMFxyXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9zdGF0aWMvZ2VtLnBuZ1wiIHdpZHRoPVwiMjBweFwiIGFsdD1cImdlbS1pY29cIiAvPlxyXG4gICAgICAgICAgICAgIDxCdXR0b24gdHlwZT17cHJpY2UgPT09IDUwMCA/ICdwcmltYXJ5JyA6ICdkZWZhdWx0J30gb25DbGljaz17KCkgPT4gdGhpcy5vbkNoYW5nZVZhbHVlKDUwMCl9PlxyXG4gICAgICAgICAgICAgICAgNTAwXHJcbiAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiL3N0YXRpYy9nZW0ucG5nXCIgd2lkdGg9XCIyMHB4XCIgYWx0PVwiZ2VtLWljb1wiIC8+XHJcbiAgICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPXtwcmljZSA9PT0gMTAwMCA/ICdwcmltYXJ5JyA6ICdkZWZhdWx0J30gb25DbGljaz17KCkgPT4gdGhpcy5vbkNoYW5nZVZhbHVlKDEwMDApfT5cclxuICAgICAgICAgICAgICAgIDEwMDBcclxuICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5mby1ib2R5XCI+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cclxuICAgICAgICAgICAgICA8cD5FbnRlciB5b3VyIHRpcCBhbW91bnQgaW4gcnVieTwvcD5cclxuICAgICAgICAgICAgICA8SW5wdXROdW1iZXIgbWluPXsxfSBwcmVjaXNpb249ezB9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlVmFsdWUuYmluZCh0aGlzKX0gdmFsdWU9e3ByaWNlfSAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPEJ1dHRvbiB0eXBlPVwicHJpbWFyeVwiIGxvYWRpbmc9e3N1Ym1pdGluZ30gb25DbGljaz17KCkgPT4gb25GaW5pc2gocHJpY2UsIGlzQ29uZmlybSl9PlNFTkQgVElQPC9CdXR0b24+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4JyB9fT5cclxuICAgICAgICAgICAgPENoZWNrYm94IGRlZmF1bHRDaGVja2VkPXtpc0NvbmZpcm19IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfT5Db25maXJtPC9DaGVja2JveD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9vdGVyLWNvbnRlbnRcIj5cclxuICAgICAgICAgIEF2YWlsYWJsZVxyXG4gICAgICAgICAgeycgJ31cclxuICAgICAgICAgIDxpbWcgc3JjPVwiL3N0YXRpYy9nZW0ucG5nXCIgd2lkdGg9XCIyMHB4XCIgYWx0PVwiZ2VtLWljb1wiIC8+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ1c2VyLXJ1YnlcIj57TWF0aC5yb3VuZChjdXJyZW50VXNlcj8ucnVieUJhbGFuY2UpfTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC8+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVzID0gKHN0YXRlOiBhbnkpID0+ICh7XHJcbiAgY3VycmVudFVzZXI6IHsgLi4uc3RhdGUudXNlci5jdXJyZW50IH1cclxufSk7XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaCA9IHt9O1xyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlcywgbWFwRGlzcGF0Y2gpKFRpcFBlcmZvcm1lckZvcm0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9