(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[7],{

/***/ "./src/components/comment/comment-form.tsx":
/*!*************************************************!*\
  !*** ./src/components/comment/comment-form.tsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CommentForm; });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _comment_less__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./comment.less */ "./src/components/comment/comment.less");
/* harmony import */ var _comment_less__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_comment_less__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _components_ui_shared_AppButton__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @components/ui/shared/AppButton */ "./src/components/ui/shared/AppButton.tsx");







var _jsxFileName = "C:\\Users\\roman\\Pictures\\Case\\row\\src\\components\\comment\\comment-form.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(typeof e + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _callSuper(t, o, e) { return o = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(o), Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
/* eslint-disable react/require-default-props */





var CommentForm = /*#__PURE__*/function (_PureComponent) {
  function CommentForm() {
    var _this;
    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, CommentForm);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, CommentForm, [].concat(args));
    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(_this, "formRef", void 0);
    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(_this, "state", {
      text: ''
    });
    return _this;
  }
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(CommentForm, _PureComponent);
  return Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(CommentForm, [{
    key: "onFinish",
    value: function onFinish(values) {
      var _this$props = this.props,
        handleComment = _this$props.onSubmit,
        objectId = _this$props.objectId,
        objectType = _this$props.objectType,
        creator = _this$props.creator;
      var data = values;
      if (!creator || !creator._id) {
        antd__WEBPACK_IMPORTED_MODULE_8__["message"].error('Please login!');
        return next_router__WEBPACK_IMPORTED_MODULE_9___default.a.push('/');
      }
      if (!data.content) {
        return antd__WEBPACK_IMPORTED_MODULE_8__["message"].error('Please add a comment!');
      }
      if (data.content.length > 150) {
        return antd__WEBPACK_IMPORTED_MODULE_8__["message"].error('Comment is over 150 characters');
      }
      data.objectId = objectId;
      data.objectType = objectType || 'video';
      this.formRef.resetFields(['content']);
      return handleComment(data);
    }
  }, {
    key: "onEmojiClick",
    value: function () {
      var _onEmojiClick = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(emoji) {
        var creator, text, instance;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              creator = this.props.creator;
              if (!(!creator || !creator._id)) {
                _context.next = 3;
                break;
              }
              return _context.abrupt("return");
            case 3:
              text = this.state.text;
              instance = this.formRef;
              instance.setFieldsValue({
                content: "".concat(instance.getFieldValue('content'), " ").concat(emoji, " ")
              });
              this.setState({
                text: "".concat(text, " ").concat(emoji, " ")
              });
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function onEmojiClick(_x) {
        return _onEmojiClick.apply(this, arguments);
      }
      return onEmojiClick;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props2 = this.props,
        creator = _this$props2.creator,
        isReply = _this$props2.isReply,
        siteName = _this$props2.siteName,
        objectId = _this$props2.objectId;
      return __jsx(antd__WEBPACK_IMPORTED_MODULE_8__["Form"], {
        ref: function ref(_ref) {
          _this2.formRef = _ref;
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
      }, __jsx(antd__WEBPACK_IMPORTED_MODULE_8__["Form"].Item, {
        className: "m-0",
        name: "content",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 85,
          columnNumber: 13
        }
      }, __jsx(antd__WEBPACK_IMPORTED_MODULE_8__["Input"], {
        className: "rounded-full p-2",
        onPressEnter: function onPressEnter(e) {
          if (e.target.value.length < 2) return;
          _this2.formRef.submit();
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
      }))), __jsx(_components_ui_shared_AppButton__WEBPACK_IMPORTED_MODULE_11__["AppButton"], {
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
  }]);
}(react__WEBPACK_IMPORTED_MODULE_7__["PureComponent"]);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvY29tbWVudC9jb21tZW50LWZvcm0udHN4Il0sIm5hbWVzIjpbIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJlIiwidCIsInIiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJuIiwiaGFzT3duUHJvcGVydHkiLCJvIiwiZGVmaW5lUHJvcGVydHkiLCJ2YWx1ZSIsImkiLCJTeW1ib2wiLCJhIiwiaXRlcmF0b3IiLCJjIiwiYXN5bmNJdGVyYXRvciIsInUiLCJ0b1N0cmluZ1RhZyIsImRlZmluZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIndyYXAiLCJHZW5lcmF0b3IiLCJjcmVhdGUiLCJDb250ZXh0IiwibWFrZUludm9rZU1ldGhvZCIsInRyeUNhdGNoIiwidHlwZSIsImFyZyIsImNhbGwiLCJoIiwibCIsImYiLCJzIiwieSIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJwIiwiZCIsImdldFByb3RvdHlwZU9mIiwidiIsInZhbHVlcyIsImciLCJkZWZpbmVJdGVyYXRvck1ldGhvZHMiLCJmb3JFYWNoIiwiX2ludm9rZSIsIkFzeW5jSXRlcmF0b3IiLCJpbnZva2UiLCJyZXNvbHZlIiwiX19hd2FpdCIsInRoZW4iLCJjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyIsIkVycm9yIiwiZG9uZSIsIm1ldGhvZCIsImRlbGVnYXRlIiwibWF5YmVJbnZva2VEZWxlZ2F0ZSIsInNlbnQiLCJfc2VudCIsImRpc3BhdGNoRXhjZXB0aW9uIiwiYWJydXB0IiwiVHlwZUVycm9yIiwicmVzdWx0TmFtZSIsIm5leHQiLCJuZXh0TG9jIiwicHVzaFRyeUVudHJ5IiwidHJ5TG9jIiwiY2F0Y2hMb2MiLCJmaW5hbGx5TG9jIiwiYWZ0ZXJMb2MiLCJ0cnlFbnRyaWVzIiwicHVzaCIsInJlc2V0VHJ5RW50cnkiLCJjb21wbGV0aW9uIiwicmVzZXQiLCJpc05hTiIsImxlbmd0aCIsImRpc3BsYXlOYW1lIiwiaXNHZW5lcmF0b3JGdW5jdGlvbiIsImNvbnN0cnVjdG9yIiwibmFtZSIsIm1hcmsiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImF3cmFwIiwiYXN5bmMiLCJQcm9taXNlIiwia2V5cyIsInJldmVyc2UiLCJwb3AiLCJwcmV2IiwiY2hhckF0Iiwic2xpY2UiLCJzdG9wIiwicnZhbCIsImhhbmRsZSIsImNvbXBsZXRlIiwiZmluaXNoIiwiX2NhdGNoIiwiZGVsZWdhdGVZaWVsZCIsIl9jYWxsU3VwZXIiLCJfZ2V0UHJvdG90eXBlT2YiLCJfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybiIsIl9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QiLCJSZWZsZWN0IiwiY29uc3RydWN0IiwiYXBwbHkiLCJCb29sZWFuIiwidmFsdWVPZiIsIkNvbW1lbnRGb3JtIiwiX1B1cmVDb21wb25lbnQiLCJfdGhpcyIsIl9jbGFzc0NhbGxDaGVjayIsIl9sZW4iLCJhcmd1bWVudHMiLCJhcmdzIiwiQXJyYXkiLCJfa2V5IiwiY29uY2F0IiwiX2RlZmluZVByb3BlcnR5IiwidGV4dCIsIl9pbmhlcml0cyIsIl9jcmVhdGVDbGFzcyIsImtleSIsIm9uRmluaXNoIiwiX3RoaXMkcHJvcHMiLCJwcm9wcyIsImhhbmRsZUNvbW1lbnQiLCJvblN1Ym1pdCIsIm9iamVjdElkIiwib2JqZWN0VHlwZSIsImNyZWF0b3IiLCJkYXRhIiwiX2lkIiwibWVzc2FnZSIsImVycm9yIiwiUm91dGVyIiwiY29udGVudCIsImZvcm1SZWYiLCJyZXNldEZpZWxkcyIsIl9vbkVtb2ppQ2xpY2siLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9jYWxsZWUiLCJlbW9qaSIsImluc3RhbmNlIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInN0YXRlIiwic2V0RmllbGRzVmFsdWUiLCJnZXRGaWVsZFZhbHVlIiwic2V0U3RhdGUiLCJvbkVtb2ppQ2xpY2siLCJfeCIsInJlbmRlciIsIl90aGlzMiIsIl90aGlzJHByb3BzMiIsImlzUmVwbHkiLCJzaXRlTmFtZSIsIl9fanN4IiwiRm9ybSIsInJlZiIsImJpbmQiLCJpbml0aWFsVmFsdWVzIiwic3R5bGUiLCJ3aWR0aCIsIm1hcmdpbiIsIl9fc2VsZiIsIl9fc291cmNlIiwiZmlsZU5hbWUiLCJfanN4RmlsZU5hbWUiLCJsaW5lTnVtYmVyIiwiY29sdW1uTnVtYmVyIiwiY2xhc3NOYW1lIiwiSXRlbSIsIklucHV0Iiwib25QcmVzc0VudGVyIiwidGFyZ2V0Iiwic3VibWl0IiwiZGlzYWJsZWQiLCJtYXhMZW5ndGgiLCJtaW5MZW5ndGgiLCJwbGFjZWhvbGRlciIsIkFwcEJ1dHRvbiIsImZvbnRTaXplIiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQ0FDQSxxSkFBQUEsbUJBQUEsWUFBQUEsb0JBQUEsV0FBQUMsQ0FBQSxTQUFBQyxDQUFBLEVBQUFELENBQUEsT0FBQUUsQ0FBQSxHQUFBQyxNQUFBLENBQUFDLFNBQUEsRUFBQUMsQ0FBQSxHQUFBSCxDQUFBLENBQUFJLGNBQUEsRUFBQUMsQ0FBQSxHQUFBSixNQUFBLENBQUFLLGNBQUEsY0FBQVAsQ0FBQSxFQUFBRCxDQUFBLEVBQUFFLENBQUEsSUFBQUQsQ0FBQSxDQUFBRCxDQUFBLElBQUFFLENBQUEsQ0FBQU8sS0FBQSxLQUFBQyxDQUFBLHdCQUFBQyxNQUFBLEdBQUFBLE1BQUEsT0FBQUMsQ0FBQSxHQUFBRixDQUFBLENBQUFHLFFBQUEsa0JBQUFDLENBQUEsR0FBQUosQ0FBQSxDQUFBSyxhQUFBLHVCQUFBQyxDQUFBLEdBQUFOLENBQUEsQ0FBQU8sV0FBQSw4QkFBQUMsT0FBQWpCLENBQUEsRUFBQUQsQ0FBQSxFQUFBRSxDQUFBLFdBQUFDLE1BQUEsQ0FBQUssY0FBQSxDQUFBUCxDQUFBLEVBQUFELENBQUEsSUFBQVMsS0FBQSxFQUFBUCxDQUFBLEVBQUFpQixVQUFBLE1BQUFDLFlBQUEsTUFBQUMsUUFBQSxTQUFBcEIsQ0FBQSxD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KiBlc2xpbnQtZGlzYWJsZSByZWFjdC9yZXF1aXJlLWRlZmF1bHQtcHJvcHMgKi9cclxuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtcclxuICBGb3JtLCBJbnB1dCwgQnV0dG9uLCBtZXNzYWdlLCBQb3BvdmVyLCBJbWFnZVxyXG59IGZyb20gJ2FudGQnO1xyXG5pbXBvcnQgeyBTZW5kT3V0bGluZWQsIFNtaWxlT3V0bGluZWQgfSBmcm9tICdAYW50LWRlc2lnbi9pY29ucyc7XHJcbmltcG9ydCB7IElQZXJmb3JtZXIgfSBmcm9tICdzcmMvaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEVtb3Rpb25zIH0gZnJvbSAnQGNvbXBvbmVudHMvbWVzc2FnZXMvZW1vdGlvbnMnO1xyXG5pbXBvcnQgeyBGb3JtSW5zdGFuY2UgfSBmcm9tICdhbnRkL2xpYi9mb3JtJztcclxuaW1wb3J0IHsgSUNyZWF0ZUNvbW1lbnQgfSBmcm9tICdzcmMvaW50ZXJmYWNlcy9jb21tZW50JztcclxuaW1wb3J0IFJvdXRlciBmcm9tICduZXh0L3JvdXRlcic7XHJcbmltcG9ydCAnLi9jb21tZW50Lmxlc3MnO1xyXG5pbXBvcnQgeyBBcHBCdXR0b24gfSBmcm9tICdAY29tcG9uZW50cy91aS9zaGFyZWQvQXBwQnV0dG9uJztcclxuXHJcbmludGVyZmFjZSBJUHJvcHMge1xyXG4gIG9iamVjdElkOiBzdHJpbmc7XHJcbiAgb25TdWJtaXQ6IEZ1bmN0aW9uO1xyXG4gIGNyZWF0b3I6IElQZXJmb3JtZXI7XHJcbiAgb2JqZWN0VHlwZT86IHN0cmluZztcclxuICBpc1JlcGx5PzogYm9vbGVhbjtcclxuICBzaXRlTmFtZT86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbWVudEZvcm0gZXh0ZW5kcyBQdXJlQ29tcG9uZW50PElQcm9wcz4ge1xyXG4gIGZvcm1SZWY6IEZvcm1JbnN0YW5jZTtcclxuXHJcbiAgc3RhdGUgPSB7XHJcbiAgICB0ZXh0OiAnJ1xyXG4gIH07XHJcblxyXG4gIG9uRmluaXNoKHZhbHVlczogSUNyZWF0ZUNvbW1lbnQpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgb25TdWJtaXQ6IGhhbmRsZUNvbW1lbnQsXHJcbiAgICAgIG9iamVjdElkLFxyXG4gICAgICBvYmplY3RUeXBlLFxyXG4gICAgICBjcmVhdG9yXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IGRhdGEgPSB2YWx1ZXM7XHJcblxyXG4gICAgaWYgKCFjcmVhdG9yIHx8ICFjcmVhdG9yLl9pZCkge1xyXG4gICAgICBtZXNzYWdlLmVycm9yKCdQbGVhc2UgbG9naW4hJyk7XHJcbiAgICAgIHJldHVybiBSb3V0ZXIucHVzaCgnLycpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFkYXRhLmNvbnRlbnQpIHtcclxuICAgICAgcmV0dXJuIG1lc3NhZ2UuZXJyb3IoJ1BsZWFzZSBhZGQgYSBjb21tZW50IScpO1xyXG4gICAgfVxyXG4gICAgaWYgKGRhdGEuY29udGVudC5sZW5ndGggPiAxNTApIHtcclxuICAgICAgcmV0dXJuIG1lc3NhZ2UuZXJyb3IoJ0NvbW1lbnQgaXMgb3ZlciAxNTAgY2hhcmFjdGVycycpO1xyXG4gICAgfVxyXG4gICAgZGF0YS5vYmplY3RJZCA9IG9iamVjdElkO1xyXG4gICAgZGF0YS5vYmplY3RUeXBlID0gb2JqZWN0VHlwZSB8fCAndmlkZW8nO1xyXG4gICAgdGhpcy5mb3JtUmVmLnJlc2V0RmllbGRzKFsnY29udGVudCddKTtcclxuICAgIHJldHVybiBoYW5kbGVDb21tZW50KGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgb25FbW9qaUNsaWNrKGVtb2ppKSB7XHJcbiAgICBjb25zdCB7IGNyZWF0b3IgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBpZiAoIWNyZWF0b3IgfHwgIWNyZWF0b3IuX2lkKSByZXR1cm47XHJcbiAgICBjb25zdCB7IHRleHQgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZm9ybVJlZiBhcyBGb3JtSW5zdGFuY2U7XHJcbiAgICBpbnN0YW5jZS5zZXRGaWVsZHNWYWx1ZSh7XHJcbiAgICAgIGNvbnRlbnQ6IGAke2luc3RhbmNlLmdldEZpZWxkVmFsdWUoJ2NvbnRlbnQnKX0gJHtlbW9qaX0gYFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgdGV4dDogYCR7dGV4dH0gJHtlbW9qaX0gYCB9KTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY3JlYXRvciwgaXNSZXBseSwgc2l0ZU5hbWUsIG9iamVjdElkXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxGb3JtXHJcbiAgICAgICAgcmVmPXsocmVmKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmZvcm1SZWYgPSByZWY7XHJcbiAgICAgICAgfX1cclxuICAgICAgICBuYW1lPVwiY29tbWVudC1mb3JtXCJcclxuICAgICAgICBvbkZpbmlzaD17dGhpcy5vbkZpbmlzaC5iaW5kKHRoaXMpfVxyXG4gICAgICAgIGluaXRpYWxWYWx1ZXM9e3tcclxuICAgICAgICAgIGNvbnRlbnQ6ICcnXHJcbiAgICAgICAgfX1cclxuICAgICAgICBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBtYXJnaW46ICdhdXRvJ319XHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtc3RyZXRjaFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBwYi00XCI+XHJcbiAgICAgICAgICAgIDxGb3JtLkl0ZW0gY2xhc3NOYW1lPSdtLTAnIG5hbWU9XCJjb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPSdyb3VuZGVkLWZ1bGwgcC0yJ1xyXG4gICAgICAgICAgICAgICAgb25QcmVzc0VudGVyPXsoZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC52YWx1ZS5sZW5ndGggPCAyKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybVJlZi5zdWJtaXQoKTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWNyZWF0b3IgfHwgIWNyZWF0b3IuX2lkfVxyXG4gICAgICAgICAgICAgICAgbWF4TGVuZ3RoPXsxNTB9XHJcbiAgICAgICAgICAgICAgICBtaW5MZW5ndGg9ezJ9XHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17XHJcbiAgICAgICAgICAgICAgICAgICFpc1JlcGx5ID8gJ0FkZCBhIGNvbW1lbnQgaGVyZScgOiAnQWRkIGEgcmVwbHkgaGVyZSdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L0Zvcm0uSXRlbT5cclxuICAgICAgICAgICAgey8qIDxQb3BvdmVyXHJcbiAgICAgICAgICAgICAga2V5PXtvYmplY3RJZH1cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSByaWdodC00IG0tYXV0byB0b3AtMCBib3R0b20tMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB6LTEwXCJcclxuICAgICAgICAgICAgICB0aXRsZT17bnVsbH1cclxuICAgICAgICAgICAgICB0cmlnZ2VyPVwiY2xpY2tcIlxyXG4gICAgICAgICAgICAgIGNvbnRlbnQ9eyhcclxuICAgICAgICAgICAgICAgIDxFbW90aW9uc1xyXG4gICAgICAgICAgICAgICAgICBvbkVtb2ppQ2xpY2s9e3RoaXMub25FbW9qaUNsaWNrLmJpbmQodGhpcyl9XHJcbiAgICAgICAgICAgICAgICAgIHNpdGVOYW1lPXtzaXRlTmFtZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JwLWVtb3Rpb25zXCI+XHJcbiAgICAgICAgICAgICAgICA8U21pbGVPdXRsaW5lZCAvPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L1BvcG92ZXI+ICovfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8QXBwQnV0dG9uXHJcbiAgICAgICAgICAgIHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcgfX1cclxuICAgICAgICAgICAgY2xhc3NOYW1lPXsnJ31cclxuICAgICAgICAgICAgdHlwZT0nc3VibWl0J1xyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgeyFpc1JlcGx5ID8gJ1Bvc3QnIDogJ1JlcGx5J31cclxuICAgICAgICAgIDwvQXBwQnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L0Zvcm0+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9