(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[1],{

/***/ "./src/components/messages/ConversationList.tsx":
/*!******************************************************!*\
  !*** ./src/components/messages/ConversationList.tsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _redux_message_actions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @redux/message/actions */ "./src/redux/message/actions.ts");
/* harmony import */ var src_socket__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/socket */ "./src/socket/index.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _ConversationListItem__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ConversationListItem */ "./src/components/messages/ConversationListItem.tsx");
/* harmony import */ var _ConversationList_less__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ConversationList.less */ "./src/components/messages/ConversationList.less");
/* harmony import */ var _ConversationList_less__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_ConversationList_less__WEBPACK_IMPORTED_MODULE_14__);







var _jsxFileName = "C:\\Users\\Rokibul\\Documents\\case\\src\\components\\messages\\ConversationList.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(typeof e + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _callSuper(t, o, e) { return o = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(o), Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }






// import ConversationSearch from './ConversationSearch';


var ConversationList = /*#__PURE__*/function (_PureComponent) {
  function ConversationList() {
    var _this;
    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, ConversationList);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, ConversationList, [].concat(args));
    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(_this, "conversationsRef", void 0);
    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(_this, "state", {
      conversationPage: 0,
      keyword: ''
    });
    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(_this, "onMessage", function (message) {
      if (!message) {
        return;
      }
      var _this$props = _this.props,
        conversation = _this$props.conversation,
        getConversationsHandler = _this$props.getConversations,
        getConversationDetailHandler = _this$props.getConversationDetail,
        receiveMessageSuccessHandler = _this$props.receiveMessageSuccess,
        setActiveConversationHandler = _this$props.setActiveConversation,
        user = _this$props.user;
      var _this$state = _this.state,
        conversationPage = _this$state.conversationPage,
        keyword = _this$state.keyword;
      var mapping = conversation.mapping;
      if (!mapping[message.conversationId]) {
        getConversationDetailHandler({
          id: message.conversationId
        });
      }
      var conversationId = message.conversationId;
      setActiveConversationHandler({
        conversationId: conversationId,
        recipientId: user._id
      });
      getConversationsHandler({
        limit: 25,
        offset: conversationPage * 25,
        type: 'private',
        keyword: keyword
      });
      receiveMessageSuccessHandler(message);
    });
    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(_this, "onSearchConversation", Object(lodash__WEBPACK_IMPORTED_MODULE_12__["debounce"])(/*#__PURE__*/function () {
      var _ref = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
        var value, getConversationsHandler;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              value = e.target.value;
              getConversationsHandler = _this.props.searchConversations;
              _context.next = 4;
              return _this.setState({
                keyword: value,
                conversationPage: 0
              });
            case 4:
              if (!value) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", getConversationsHandler({
                keyword: value,
                limit: 25,
                offset: 0,
                type: 'private'
              }));
            case 6:
              return _context.abrupt("return", getConversationsHandler({
                limit: 25,
                offset: 0,
                type: 'private'
              }));
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }(), 500));
    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(_this, "handleScroll", /*#__PURE__*/function () {
      var _ref2 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(event) {
        var _this$props2, conversation, getConversationsHandler, _conversation$list, requesting, data, total, _this$state2, conversationPage, keyword, canloadmore, ele;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this$props2 = _this.props, conversation = _this$props2.conversation, getConversationsHandler = _this$props2.getConversations;
              _conversation$list = conversation.list, requesting = _conversation$list.requesting, data = _conversation$list.data, total = _conversation$list.total;
              _this$state2 = _this.state, conversationPage = _this$state2.conversationPage, keyword = _this$state2.keyword;
              canloadmore = total > data.length;
              ele = event.target;
              if (canloadmore) {
                _context2.next = 7;
                break;
              }
              return _context2.abrupt("return");
            case 7:
              if (ele.scrollHeight - ele.scrollTop === ele.clientHeight && !requesting && canloadmore) {
                _this.setState({
                  conversationPage: conversationPage + 1
                }, function () {
                  var newPage = _this.state.conversationPage;
                  getConversationsHandler({
                    keyword: keyword,
                    limit: 25,
                    offset: newPage * 25,
                    type: 'private'
                  });
                });
              }
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(_this, "setActive", function (conversationId) {
      var _this$props3 = _this.props,
        setActiveConversationHandler = _this$props3.setActiveConversation,
        user = _this$props3.user;
      setActiveConversationHandler({
        conversationId: conversationId,
        recipientId: user._id
      });
    });
    return _this;
  }
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(ConversationList, _PureComponent);
  return Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(ConversationList, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _this$props4, getConversationsHandler, setActiveConversationHandler, toSource, toId, user, _this$state3, conversationPage, keyword;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!this.conversationsRef) this.conversationsRef = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_7__["createRef"])();
              _this$props4 = this.props, getConversationsHandler = _this$props4.getConversations, setActiveConversationHandler = _this$props4.setActiveConversation, toSource = _this$props4.toSource, toId = _this$props4.toId, user = _this$props4.user;
              _this$state3 = this.state, conversationPage = _this$state3.conversationPage, keyword = _this$state3.keyword;
              getConversationsHandler({
                limit: 25,
                offset: conversationPage * 25,
                type: 'private',
                keyword: keyword
              });
              if (toSource && toId) {
                setTimeout(function () {
                  setActiveConversationHandler({
                    source: toSource,
                    sourceId: toId,
                    recipientId: user._id
                  });
                }, 1000);
              }
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }
      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props5 = this.props,
        conversation = _this$props5.conversation,
        user = _this$props5.user;
      var _conversation$list2 = conversation.list,
        conversations = _conversation$list2.data,
        requesting = _conversation$list2.requesting;
      var mapping = conversation.mapping,
        _conversation$activeC = conversation.activeConversation,
        activeConversation = _conversation$activeC === void 0 ? {} : _conversation$activeC;
      if (!this.conversationsRef) this.conversationsRef = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_7__["createRef"])();
      return __jsx("div", {
        className: "conversation-list",
        ref: this.conversationsRef,
        onScroll: this.handleScroll.bind(this),
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 139,
          columnNumber: 7
        }
      }, __jsx(src_socket__WEBPACK_IMPORTED_MODULE_11__["Event"], {
        event: "message_created",
        handler: this.onMessage,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 140,
          columnNumber: 9
        }
      }), conversations.length > 0 && conversations.map(function (conversationId) {
        return __jsx(_ConversationListItem__WEBPACK_IMPORTED_MODULE_13__["default"], {
          key: conversationId,
          data: mapping[conversationId],
          setActive: _this2.setActive,
          selected: activeConversation._id === conversationId,
          user: user,
          __self: _this2,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 149,
            columnNumber: 13
          }
        });
      }), requesting && __jsx("div", {
        className: "text-center",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 158,
          columnNumber: 9
        }
      }, __jsx(antd__WEBPACK_IMPORTED_MODULE_8__["Spin"], {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 158,
          columnNumber: 38
        }
      })), !requesting && !conversations.length && __jsx("p", {
        style: {
          margin: '20px 0'
        },
        className: "text-center",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 161,
          columnNumber: 11
        }
      }, "No conversation found."));
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_7__["PureComponent"]);
var mapStates = function mapStates(state) {
  return {
    conversation: _objectSpread({}, state.conversation),
    message: _objectSpread({}, state.message),
    user: _objectSpread({}, state.user.current),
    sendMessageStatus: state.message.sendMessage
  };
};
var mapDispatch = {
  searchConversations: _redux_message_actions__WEBPACK_IMPORTED_MODULE_10__["searchConversations"],
  getConversations: _redux_message_actions__WEBPACK_IMPORTED_MODULE_10__["getConversations"],
  setActiveConversation: _redux_message_actions__WEBPACK_IMPORTED_MODULE_10__["setActiveConversation"],
  getConversationDetail: _redux_message_actions__WEBPACK_IMPORTED_MODULE_10__["getConversationDetail"],
  receiveMessageSuccess: _redux_message_actions__WEBPACK_IMPORTED_MODULE_10__["receiveMessageSuccess"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_9__["connect"])(mapStates, mapDispatch)(ConversationList));

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

/***/ }),

/***/ "./src/components/messages/ConversationListItem.tsx":
/*!**********************************************************!*\
  !*** ./src/components/messages/ConversationListItem.tsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ConversationListItem; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var src_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/icons */ "./src/icons/index.tsx");
/* harmony import */ var _lib_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lib/index */ "./src/lib/index.ts");
/* harmony import */ var _ConversationListItem_less__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ConversationListItem.less */ "./src/components/messages/ConversationListItem.less");
/* harmony import */ var _ConversationListItem_less__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ConversationListItem_less__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "C:\\Users\\Rokibul\\Documents\\case\\src\\components\\messages\\ConversationListItem.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





function ConversationListItem(props) {
  var data = props.data,
    setActive = props.setActive,
    selected = props.selected,
    user = props.user;
  var recipientInfo = data.recipientInfo,
    lastMessage = data.lastMessage,
    _id = data._id,
    _data$totalNotSeenMes = data.totalNotSeenMessages,
    totalNotSeenMessages = _data$totalNotSeenMes === void 0 ? 0 : _data$totalNotSeenMes,
    lastMessageCreatedAt = data.lastMessageCreatedAt,
    updatedAt = data.updatedAt,
    diamondsArePending = data.diamondsArePending;
  var className = selected ? 'conversation-list-item active' : 'conversation-list-item';
  if (!lastMessage) {
    return null;
  }
  return __jsx("div", {
    "aria-hidden": true,
    className: className,
    onClick: function onClick() {
      setActive(_id);
      next_router__WEBPACK_IMPORTED_MODULE_5___default.a.push('/messages');
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "conversation-left-corner",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 7
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Avatar"], {
    className: "conversation-photo",
    src: (recipientInfo === null || recipientInfo === void 0 ? void 0 : recipientInfo.avatar) || '/static/no-avatar.png',
    alt: "avatar",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 9
    }
  }), __jsx("span", {
    className: (recipientInfo === null || recipientInfo === void 0 ? void 0 : recipientInfo.isOnline) > 0 ? 'online-status active' : 'online-status',
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 9
    }
  })), __jsx("div", {
    className: "conversation-info",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 7
    }
  }, __jsx("h1", {
    className: "conversation-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 9
    }
  }, __jsx("span", {
    className: "re-name",
    title: (recipientInfo === null || recipientInfo === void 0 ? void 0 : recipientInfo.name) || (recipientInfo === null || recipientInfo === void 0 ? void 0 : recipientInfo.username) || 'N/A',
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 11
    }
  }, (recipientInfo === null || recipientInfo === void 0 ? void 0 : recipientInfo.name) || (recipientInfo === null || recipientInfo === void 0 ? void 0 : recipientInfo.username) || 'N/A', (recipientInfo === null || recipientInfo === void 0 ? void 0 : recipientInfo.verifiedAccount) && __jsx(src_icons__WEBPACK_IMPORTED_MODULE_2__["TickIcon"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 48
    }
  })), user.roles.indexOf('role-host-dmefee') !== -1 && diamondsArePending ? __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], {
    title: "You must respond within 24 hours in order to collect this fee",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 11
    }
  }, __jsx("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 11
    }
  }, __jsx("small", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 13
    }
  }, diamondsArePending), ' ', __jsx("img", {
    src: "./static/diamond.png",
    width: "20px",
    alt: "ruby",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 15
    }
  }))) : null), __jsx("p", {
    className: "conversation-snippet",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "short-content",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 11
    }
  }, lastMessage), __jsx("div", {
    className: "right-content",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 11
    }
  }, __jsx("span", {
    className: "conversation-time",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 13
    }
  }, Object(_lib_index__WEBPACK_IMPORTED_MODULE_3__["formatDateFromnow"])(lastMessageCreatedAt || updatedAt)), ' ', __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Badge"], {
    className: "notification-badge",
    count: totalNotSeenMessages,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 13
    }
  })))));
}
_c = ConversationListItem;
var _c;
$RefreshReg$(_c, "ConversationListItem");

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

/***/ }),

/***/ "./src/components/notification/NotificationHeaderMenu.tsx":
/*!****************************************************************!*\
  !*** ./src/components/notification/NotificationHeaderMenu.tsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reselect */ "./node_modules/reselect/es/index.js");
/* harmony import */ var _redux_message_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @redux/message/actions */ "./src/redux/message/actions.ts");
/* harmony import */ var _NotificationHeaderMenu_less__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NotificationHeaderMenu.less */ "./src/components/notification/NotificationHeaderMenu.less");
/* harmony import */ var _NotificationHeaderMenu_less__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_NotificationHeaderMenu_less__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _redux_notification_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @redux/notification/actions */ "./src/redux/notification/actions.ts");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var src_socket__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/socket */ "./src/socket/index.ts");
/* harmony import */ var _lib_string__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @lib/string */ "./src/lib/string.ts");
/* harmony import */ var _services_notification_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @services/notification.service */ "./src/services/notification.service.ts");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");
/* harmony import */ var _components_messages_ConversationList__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @components/messages/ConversationList */ "./src/components/messages/ConversationList.tsx");
var _this = undefined,
  _jsxFileName = "C:\\Users\\Rokibul\\Documents\\case\\src\\components\\notification\\NotificationHeaderMenu.tsx",
  _s = $RefreshSig$();

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
/* eslint-disable react/require-default-props */













// import ButtonFollowBack from '@components/common/buttonFollowBack';
// import { IPerformer } from '@interfaces/performer';


var SEND_NOTIFICATION = 'send_notification';
var NotificationHeaderMenu = function NotificationHeaderMenu(_ref) {
  _s();
  var totalNotReadMessage = _ref.totalNotReadMessage,
    notificationCount = _ref.notificationCount,
    toId = _ref.toId,
    toSource = _ref.toSource,
    handleDeactive = _ref.deactiveConversation,
    onReceiveMessage = _ref.onReceiveMessage;
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
    read = _useState[0],
    setRead = _useState[1];
  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('message'),
    tab = _useState2[0],
    setTab = _useState2[1];
  var socket = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(src_socket__WEBPACK_IMPORTED_MODULE_9__["SocketContext"]);
  var notifications = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(Object(reselect__WEBPACK_IMPORTED_MODULE_3__["createSelector"])(function (state) {
    return state.notification.success;
  }, function (state) {
    return state.notification.error;
  }, function (state) {
    return state.notification.dataSource;
  }, function (success, error, data) {
    if (success && !error) return data;
    return [];
  }));
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();
  var fetchData = function fetchData() {
    dispatch(Object(_redux_notification_actions__WEBPACK_IMPORTED_MODULE_6__["fetchNotificaion"])());
  };
  var onReceiveNotification = function onReceiveNotification(data) {
    fetchData();
    onReceiveMessage();
    antd__WEBPACK_IMPORTED_MODULE_1__["message"].success((data === null || data === void 0 ? void 0 : data.title) || (data === null || data === void 0 ? void 0 : data.message) || 'You received a new notification');
  };
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    fetchData();
  }, [read]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (!toSource && !toId) {
      handleDeactive();
    }
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (socket) {
      socket.on(SEND_NOTIFICATION, onReceiveNotification);
    }
    return function () {
      socket === null || socket === void 0 ? void 0 : socket.off(SEND_NOTIFICATION, onReceiveNotification);
    };
  }, [socket]);
  var redirect = function redirect(notification) {
    switch (notification.type) {
      case 'live':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push({
          pathname: '/stream',
          query: {
            username: notification.createdBy
          }
        }, "/stream/".concat(notification.createdBy));
      case 'privatechatRequest':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push('/model/private-waiting-room');
      case 'follow':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push({
          pathname: "/".concat(notification.createdBy)
        });
      case 'subscription':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push('/wallet');
      case 'comment':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push("/post/".concat(notification.refId));
      case 'feed':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push("/post/".concat(notification.refId));
      case 'adminDirectMessage':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push('/messages');
      case 'crossPromotion':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push({
          pathname: '/wallet',
          query: {
            tab: 'diamond-history'
          }
        });
      case 'directTip':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push('/wallet');
      case 'mileStone':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push('/broadcaster-dashboard');
      case 'available-private-chat':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push({
          pathname: '/user/private-waiting-room',
          query: {
            username: notification.createdBy
          }
        });
      case 'directMessage':
        return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push('/messages');
      default:
        return null;
    }
  };
  var onClickItem = function onClickItem(notification) {
    setRead(true);
    if (!notification.read) {
      // goi api PUT read
      _services_notification_service__WEBPACK_IMPORTED_MODULE_11__["notificationService"].read(notification._id);
      dispatch(Object(_redux_notification_actions__WEBPACK_IMPORTED_MODULE_6__["setReadItem"])(notification._id));
    }
    redirect(notification);
  };
  var handleChangeTab = function handleChangeTab(val) {
    if (val === tab) {
      tab === 'notification' && next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push('/notifications');
      tab === 'message' && next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push('/messages');
    }
    setTab(val);
  };
  return __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Menu"], {
    title: "Notifications",
    className: "notification-menu",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 155,
      columnNumber: 5
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Menu"].ItemGroup, {
    title: __jsx("div", {
      className: "title-notification",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 158,
        columnNumber: 11
      }
    }, __jsx("div", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 159,
        columnNumber: 13
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      className: "btn-dismiss-read-all",
      onClick: function onClick() {
        return handleChangeTab('message');
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 160,
        columnNumber: 15
      }
    }, __jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_12__["MailOutlined"], {
      style: {
        marginRight: '5px'
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 161,
        columnNumber: 17
      }
    }), "Inbox", ' ', totalNotReadMessage)), __jsx("div", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 167,
        columnNumber: 13
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      className: "btn-dismiss-read-all",
      onClick: function onClick() {
        return handleChangeTab('notification');
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 168,
        columnNumber: 15
      }
    }, __jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_12__["BellOutlined"], {
      style: {
        marginRight: '5px'
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 169,
        columnNumber: 17
      }
    }), "Notifications", ' ', notificationCount))),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 156,
      columnNumber: 7
    }
  }, tab === 'message' ? __jsx(_components_messages_ConversationList__WEBPACK_IMPORTED_MODULE_13__["default"], {
    toSource: toSource,
    toId: toId,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 178,
      columnNumber: 30
    }
  }) : __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, notifications.length > 0 ? notifications.map(function (notification) {
    return __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Menu"].Item, {
      style: {
        padding: 0
      },
      key: notification._id,
      className: notification.read === false ? 'notification-unread' : 'notification-read',
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 183,
        columnNumber: 19
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Row"], {
      gutter: 24,
      className: "notification-item",
      style: {
        padding: '0 3px 0 3px'
      },
      onClick: function onClick() {
        return onClickItem(notification);
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 188,
        columnNumber: 21
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Col"], {
      md: 3,
      style: {
        padding: 0
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 189,
        columnNumber: 23
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Avatar"], {
      src: notification.thumbnail || '/no-image.jpg',
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 190,
        columnNumber: 25
      }
    })), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Col"], {
      md: 15,
      style: {
        padding: 0
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 192,
        columnNumber: 23
      }
    }, __jsx("div", {
      className: "notification-item-list",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 193,
        columnNumber: 25
      }
    }, __jsx("div", {
      className: "message",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 194,
        columnNumber: 27
      }
    }, Object(_lib_string__WEBPACK_IMPORTED_MODULE_10__["capitalizeFirstLetter"])(notification.title)), __jsx("span", {
      className: "time",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 195,
        columnNumber: 27
      }
    }, __jsx("small", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 195,
        columnNumber: 50
      }
    }, moment__WEBPACK_IMPORTED_MODULE_8___default()(notification.updatedAt).fromNow())))), __jsx("span", {
      className: notification.read === false ? 'notification-docw' : '',
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 208,
        columnNumber: 23
      }
    })));
  }) : __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Menu"].Item, {
    key: "no-notification",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 213,
      columnNumber: 17
    }
  }, "There are no notifications."))));
};
_s(NotificationHeaderMenu, "UonX2oELuS4g+Z1ItG90ohTwUz0=", false, function () {
  return [react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"], react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"]];
});
_c = NotificationHeaderMenu;
var mapStateToProps = function mapStateToProps(state) {
  return {
    fetchNotificationSuccess: state.notification.success
  };
};
var mapDispatch = {
  deactiveConversation: _redux_message_actions__WEBPACK_IMPORTED_MODULE_4__["deactiveConversation"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatch)(NotificationHeaderMenu));
var _c;
$RefreshReg$(_c, "NotificationHeaderMenu");

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

/***/ }),

/***/ "./src/lib/date.ts":
/*!*************************!*\
  !*** ./src/lib/date.ts ***!
  \*************************/
/*! exports provided: formatDate, formatDateFromnow, dobToAge, formatLocaleDate, formatDateNew, formatDateToMMMDDYYYY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDate", function() { return formatDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDateFromnow", function() { return formatDateFromnow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dobToAge", function() { return dobToAge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatLocaleDate", function() { return formatLocaleDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDateNew", function() { return formatDateNew; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDateToMMMDDYYYY", function() { return formatDateToMMMDDYYYY; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

function formatDate(date) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'MMM/DD/YYYY';
  return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format(format);
}
function formatDateFromnow(date) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'MMM-DD-YYYY';
  if (moment__WEBPACK_IMPORTED_MODULE_0___default()().diff(moment__WEBPACK_IMPORTED_MODULE_0___default()(date), 'years') > 0) {
    return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format(format);
  }
  return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).fromNow();
}
function dobToAge(date) {
  return moment__WEBPACK_IMPORTED_MODULE_0___default()().diff(moment__WEBPACK_IMPORTED_MODULE_0___default()(date), 'years') > 0 && "".concat(moment__WEBPACK_IMPORTED_MODULE_0___default()().diff(moment__WEBPACK_IMPORTED_MODULE_0___default()(date), 'years'), "+");
}
function formatLocaleDate(dateString) {
  var date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}
function formatDateNew(date) {
  var d = new Date(date);
  var month = String(d.getMonth() + 1).padStart(2, '0');
  var day = String(d.getDate()).padStart(2, '0');
  var year = d.getFullYear();
  return "".concat(month, "/").concat(day, "/").concat(year);
}
function formatDateToMMMDDYYYY(dateInput) {
  if (!dateInput) {
    throw new Error("Invalid date input. Please provide a valid Date object or a valid date string.");
  }
  var date = new Date(dateInput);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input. Unable to parse the date.");
  }
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var day = String(date.getDate()).padStart(2, "0");
  var month = months[date.getMonth()];
  var year = date.getFullYear();
  return "".concat(month, "/").concat(day, "/").concat(year);
}

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/next/node_modules/webpack/buildin/harmony-module.js */ "./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/lib/duration.ts":
/*!*****************************!*\
  !*** ./src/lib/duration.ts ***!
  \*****************************/
/*! exports provided: videoDuration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "videoDuration", function() { return videoDuration; });
function videoDuration(s) {
  if (!s) {
    return '00:00';
  }
  var secNum = parseInt(s, 10); // don't forget the second param
  var hours = Math.floor(secNum / 3600);
  var minutes = Math.floor((secNum - hours * 3600) / 60);
  var seconds = secNum - hours * 3600 - minutes * 60;
  if (hours < 10) hours = "0".concat(hours);
  if (minutes < 10) minutes = "0".concat(minutes);
  if (seconds < 10) seconds = "0".concat(seconds);
  return "".concat((hours !== '00' ? "".concat(hours, ":") : '') + minutes, ":").concat(seconds);
}

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/next/node_modules/webpack/buildin/harmony-module.js */ "./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/lib/index.ts":
/*!**************************!*\
  !*** ./src/lib/index.ts ***!
  \**************************/
/*! exports provided: isHasInternetConnection, createSagas, createAction, createAsyncAction, createAsyncActions, createSelectorsA, handleActions, createReducers, createSelectors, createSelector, createJSSelectors, isUrl, capitalizeFirstLetter, isEmail, generateUuid, checkHeadTitle, formatDate, formatDateFromnow, dobToAge, formatLocaleDate, formatDateNew, formatDateToMMMDDYYYY, validateMessages, videoDuration, arrayToTree, pathMatchRegexp, queryAncestors, getResponseError, delay, redirect404, shortenLargeNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _internet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internet */ "./src/lib/internet.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isHasInternetConnection", function() { return _internet__WEBPACK_IMPORTED_MODULE_0__["isHasInternetConnection"]; });

/* harmony import */ var _redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./redux */ "./src/lib/redux.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createSagas", function() { return _redux__WEBPACK_IMPORTED_MODULE_1__["createSagas"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createAction", function() { return _redux__WEBPACK_IMPORTED_MODULE_1__["createAction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createAsyncAction", function() { return _redux__WEBPACK_IMPORTED_MODULE_1__["createAsyncAction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createAsyncActions", function() { return _redux__WEBPACK_IMPORTED_MODULE_1__["createAsyncActions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createSelectorsA", function() { return _redux__WEBPACK_IMPORTED_MODULE_1__["createSelectorsA"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "handleActions", function() { return _redux__WEBPACK_IMPORTED_MODULE_1__["handleActions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createReducers", function() { return _redux__WEBPACK_IMPORTED_MODULE_1__["createReducers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createSelectors", function() { return _redux__WEBPACK_IMPORTED_MODULE_1__["createSelectors"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createSelector", function() { return _redux__WEBPACK_IMPORTED_MODULE_1__["createSelector"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createJSSelectors", function() { return _redux__WEBPACK_IMPORTED_MODULE_1__["createJSSelectors"]; });

/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./string */ "./src/lib/string.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isUrl", function() { return _string__WEBPACK_IMPORTED_MODULE_2__["isUrl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "capitalizeFirstLetter", function() { return _string__WEBPACK_IMPORTED_MODULE_2__["capitalizeFirstLetter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isEmail", function() { return _string__WEBPACK_IMPORTED_MODULE_2__["isEmail"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generateUuid", function() { return _string__WEBPACK_IMPORTED_MODULE_2__["generateUuid"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "checkHeadTitle", function() { return _string__WEBPACK_IMPORTED_MODULE_2__["checkHeadTitle"]; });

/* harmony import */ var _date__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./date */ "./src/lib/date.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatDate", function() { return _date__WEBPACK_IMPORTED_MODULE_3__["formatDate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatDateFromnow", function() { return _date__WEBPACK_IMPORTED_MODULE_3__["formatDateFromnow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dobToAge", function() { return _date__WEBPACK_IMPORTED_MODULE_3__["dobToAge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatLocaleDate", function() { return _date__WEBPACK_IMPORTED_MODULE_3__["formatLocaleDate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatDateNew", function() { return _date__WEBPACK_IMPORTED_MODULE_3__["formatDateNew"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatDateToMMMDDYYYY", function() { return _date__WEBPACK_IMPORTED_MODULE_3__["formatDateToMMMDDYYYY"]; });

/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./message */ "./src/lib/message.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validateMessages", function() { return _message__WEBPACK_IMPORTED_MODULE_4__["validateMessages"]; });

/* harmony import */ var _duration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./duration */ "./src/lib/duration.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "videoDuration", function() { return _duration__WEBPACK_IMPORTED_MODULE_5__["videoDuration"]; });

/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "arrayToTree", function() { return _utils__WEBPACK_IMPORTED_MODULE_6__["arrayToTree"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pathMatchRegexp", function() { return _utils__WEBPACK_IMPORTED_MODULE_6__["pathMatchRegexp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryAncestors", function() { return _utils__WEBPACK_IMPORTED_MODULE_6__["queryAncestors"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getResponseError", function() { return _utils__WEBPACK_IMPORTED_MODULE_6__["getResponseError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "delay", function() { return _utils__WEBPACK_IMPORTED_MODULE_6__["delay"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "redirect404", function() { return _utils__WEBPACK_IMPORTED_MODULE_6__["redirect404"]; });

/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./number */ "./src/lib/number.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shortenLargeNumber", function() { return _number__WEBPACK_IMPORTED_MODULE_7__["shortenLargeNumber"]; });










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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/next/node_modules/webpack/buildin/harmony-module.js */ "./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/lib/internet.ts":
/*!*****************************!*\
  !*** ./src/lib/internet.ts ***!
  \*****************************/
/*! exports provided: isHasInternetConnection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHasInternetConnection", function() { return isHasInternetConnection; });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(typeof e + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }

var INTERNET_CHECK_URL = 'https://google.com';
var isHasInternetConnection = /*#__PURE__*/function () {
  var _ref = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var res;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return fetch(INTERNET_CHECK_URL, {
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              Pragma: 'no-cache',
              Expires: 0
            }
          });
        case 3:
          res = _context.sent;
          if (!(res.status === 404 || res.status === 401 || res.status === 403 || res.status === 500 || res.status >= 200 && res.status <= 300)) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", true);
        case 6:
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          antd__WEBPACK_IMPORTED_MODULE_1__["message"].error(_context.t0);
        case 11:
          return _context.abrupt("return", false);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function isHasInternetConnection() {
    return _ref.apply(this, arguments);
  };
}();

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/next/node_modules/webpack/buildin/harmony-module.js */ "./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/lib/message.ts":
/*!****************************!*\
  !*** ./src/lib/message.ts ***!
  \****************************/
/*! exports provided: validateMessages */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateMessages", function() { return validateMessages; });
/* eslint-disable no-template-curly-in-string */
var validateMessages = {
  required: 'This field is required!',
  types: {
    email: 'Not a validate email!',
    number: 'Not a validate number!'
  },
  number: {
    range: 'Must be between ${min} and ${max}'
  }
};

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/next/node_modules/webpack/buildin/harmony-module.js */ "./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/lib/number.ts":
/*!***************************!*\
  !*** ./src/lib/number.ts ***!
  \***************************/
/*! exports provided: shortenLargeNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shortenLargeNumber", function() { return shortenLargeNumber; });
function shortenLargeNumber(num) {
  if (num >= 1000000000) {
    return "".concat((num / 1000000000).toFixed(1).replace(/\.0$/, ''), "B");
  }
  if (num >= 1000000) {
    return "".concat((num / 1000000).toFixed(1).replace(/\.0$/, ''), "M");
  }
  if (num >= 1000) {
    return "".concat((num / 1000).toFixed(1).replace(/\.0$/, ''), "K");
  }
  return num;
}

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/next/node_modules/webpack/buildin/harmony-module.js */ "./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvbWVzc2FnZXMvQ29udmVyc2F0aW9uTGlzdC50c3giLCJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL21lc3NhZ2VzL0NvbnZlcnNhdGlvbkxpc3RJdGVtLnRzeCIsIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uL05vdGlmaWNhdGlvbkhlYWRlck1lbnUudHN4Iiwid2VicGFjazovL19OX0UvLi9zcmMvbGliL2RhdGUudHMiLCJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9saWIvZHVyYXRpb24udHMiLCJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9saWIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9saWIvaW50ZXJuZXQudHMiLCJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9saWIvbWVzc2FnZS50cyIsIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2xpYi9udW1iZXIudHMiXSwibmFtZXMiOlsiX3JlZ2VuZXJhdG9yUnVudGltZSIsImUiLCJ0IiwiciIsIk9iamVjdCIsInByb3RvdHlwZSIsIm4iLCJoYXNPd25Qcm9wZXJ0eSIsIm8iLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwiaSIsIlN5bWJvbCIsImEiLCJpdGVyYXRvciIsImMiLCJhc3luY0l0ZXJhdG9yIiwidSIsInRvU3RyaW5nVGFnIiwiZGVmaW5lIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwid3JhcCIsIkdlbmVyYXRvciIsImNyZWF0ZSIsIkNvbnRleHQiLCJtYWtlSW52b2tlTWV0aG9kIiwidHJ5Q2F0Y2giLCJ0eXBlIiwiYXJnIiwiY2FsbCIsImgiLCJsIiwiZiIsInMiLCJ5IiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsInAiLCJkIiwiZ2V0UHJvdG90eXBlT2YiLCJ2IiwidmFsdWVzIiwiZyIsImRlZmluZUl0ZXJhdG9yTWV0aG9kcyIsImZvckVhY2giLCJfaW52b2tlIiwiQXN5bmNJdGVyYXRvciIsImludm9rZSIsInJlc29sdmUiLCJfX2F3YWl0IiwidGhlbiIsImNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnIiwiRXJyb3IiLCJkb25lIiwibWV0aG9kIiwiZGVsZWdhdGUiLCJtYXliZUludm9rZURlbGVnYXRlIiwic2VudCIsIl9zZW50IiwiZGlzcGF0Y2hFeGNlcHRpb24iLCJhYnJ1cHQiLCJUeXBlRXJyb3IiLCJyZXN1bHROYW1lIiwibmV4dCIsIm5leHRMb2MiLCJwdXNoVHJ5RW50cnkiLCJ0cnlMb2MiLCJjYXRjaExvYyIsImZpbmFsbHlMb2MiLCJhZnRlckxvYyIsInRyeUVudHJpZXMiLCJwdXNoIiwicmVzZXRUcnlFbnRyeSIsImNvbXBsZXRpb24iLCJyZXNldCIsImlzTmFOIiwibGVuZ3RoIiwiZGlzcGxheU5hbWUiLCJpc0dlbmVyYXRvckZ1bmN0aW9uIiwiY29uc3RydWN0b3IiLCJuYW1lIiwibWFyayIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiYXdyYXAiLCJhc3luYyIsIlByb21pc2UiLCJrZXlzIiwicmV2ZXJzZSIsInBvcCIsInByZXYiLCJjaGFyQXQiLCJzbGljZSIsInN0b3AiLCJydmFsIiwiaGFuZGxlIiwiY29tcGxldGUiLCJmaW5pc2giLCJfY2F0Y2giLCJkZWxlZ2F0ZVlpZWxkIiwiX2NhbGxTdXBlciIsIl9nZXRQcm90b3R5cGVPZiIsIl9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuIiwiX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCIsIlJlZmxlY3QiLCJjb25zdHJ1Y3QiLCJhcHBseSIsIkJvb2xlYW4iLCJ2YWx1ZU9mIiwiQ29udmVyc2F0aW9uTGlzdCIsIl9QdXJlQ29tcG9uZW50IiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfbGVuIiwiYXJndW1lbnRzIiwiYXJncyIsIkFycmF5IiwiX2tleSIsImNvbmNhdCIsIl9kZWZpbmVQcm9wZXJ0eSIsImNvbnZlcnNhdGlvblBhZ2UiLCJrZXl3b3JkIiwibWVzc2FnZSIsIl90aGlzJHByb3BzIiwicHJvcHMiLCJjb252ZXJzYXRpb24iLCJnZXRDb252ZXJzYXRpb25zSGFuZGxlciIsImdldENvbnZlcnNhdGlvbnMiLCJnZXRDb252ZXJzYXRpb25EZXRhaWxIYW5kbGVyIiwiZ2V0Q29udmVyc2F0aW9uRGV0YWlsIiwicmVjZWl2ZU1lc3NhZ2VTdWNjZXNzSGFuZGxlciIsInJlY2VpdmVNZXNzYWdlU3VjY2VzcyIsInNldEFjdGl2ZUNvbnZlcnNhdGlvbkhhbmRsZXIiLCJzZXRBY3RpdmVDb252ZXJzYXRpb24iLCJ1c2VyIiwiX3RoaXMkc3RhdGUiLCJzdGF0ZSIsIm1hcHBpbmciLCJjb252ZXJzYXRpb25JZCIsImlkIiwicmVjaXBpZW50SWQiLCJfaWQiLCJsaW1pdCIsIm9mZnNldCIsImRlYm91bmNlIiwiX3JlZiIsIl9hc3luY1RvR2VuZXJhdG9yIiwiX2NhbGxlZSIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJ0YXJnZXQiLCJzZWFyY2hDb252ZXJzYXRpb25zIiwic2V0U3RhdGUiLCJfeCIsIl9yZWYyIiwiX2NhbGxlZTIiLCJldmVudCIsIl90aGlzJHByb3BzMiIsIl9jb252ZXJzYXRpb24kbGlzdCIsInJlcXVlc3RpbmciLCJkYXRhIiwidG90YWwiLCJfdGhpcyRzdGF0ZTIiLCJjYW5sb2FkbW9yZSIsImVsZSIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImxpc3QiLCJzY3JvbGxIZWlnaHQiLCJzY3JvbGxUb3AiLCJjbGllbnRIZWlnaHQiLCJuZXdQYWdlIiwiX3gyIiwiX3RoaXMkcHJvcHMzIiwiX2luaGVyaXRzIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwiX2NvbXBvbmVudERpZE1vdW50IiwiX2NhbGxlZTMiLCJfdGhpcyRwcm9wczQiLCJ0b1NvdXJjZSIsInRvSWQiLCJfdGhpcyRzdGF0ZTMiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJjb252ZXJzYXRpb25zUmVmIiwiY3JlYXRlUmVmIiwic2V0VGltZW91dCIsInNvdXJjZSIsInNvdXJjZUlkIiwiY29tcG9uZW50RGlkTW91bnQiLCJyZW5kZXIiLCJfdGhpczIiLCJfdGhpcyRwcm9wczUiLCJfY29udmVyc2F0aW9uJGxpc3QyIiwiY29udmVyc2F0aW9ucyIsIl9jb252ZXJzYXRpb24kYWN0aXZlQyIsImFjdGl2ZUNvbnZlcnNhdGlvbiIsIl9fanN4IiwiY2xhc3NOYW1lIiwicmVmIiwib25TY3JvbGwiLCJoYW5kbGVTY3JvbGwiLCJiaW5kIiwiX19zZWxmIiwiX19zb3VyY2UiLCJmaWxlTmFtZSIsIl9qc3hGaWxlTmFtZSIsImxpbmVOdW1iZXIiLCJjb2x1bW5OdW1iZXIiLCJFdmVudCIsImhhbmRsZXIiLCJvbk1lc3NhZ2UiLCJtYXAiLCJDb252ZXJzYXRpb25MaXN0SXRlbSIsInNldEFjdGl2ZSIsInNlbGVjdGVkIiwiU3BpbiIsInN0eWxlIiwibWFyZ2luIiwiUHVyZUNvbXBvbmVudCIsIm1hcFN0YXRlcyIsIl9vYmplY3RTcHJlYWQiLCJjdXJyZW50Iiwic2VuZE1lc3NhZ2VTdGF0dXMiLCJzZW5kTWVzc2FnZSIsIm1hcERpc3BhdGNoIiwiY29ubmVjdCIsInJlY2lwaWVudEluZm8iLCJsYXN0TWVzc2FnZSIsIl9kYXRhJHRvdGFsTm90U2Vlbk1lcyIsInRvdGFsTm90U2Vlbk1lc3NhZ2VzIiwibGFzdE1lc3NhZ2VDcmVhdGVkQXQiLCJ1cGRhdGVkQXQiLCJkaWFtb25kc0FyZVBlbmRpbmciLCJvbkNsaWNrIiwiUm91dGVyIiwiQXZhdGFyIiwic3JjIiwiYXZhdGFyIiwiYWx0IiwiaXNPbmxpbmUiLCJ0aXRsZSIsInVzZXJuYW1lIiwidmVyaWZpZWRBY2NvdW50IiwiVGlja0ljb24iLCJyb2xlcyIsImluZGV4T2YiLCJUb29sdGlwIiwid2lkdGgiLCJmb3JtYXREYXRlRnJvbW5vdyIsIkJhZGdlIiwiY291bnQiLCJfYyIsIiRSZWZyZXNoUmVnJCIsIlNFTkRfTk9USUZJQ0FUSU9OIiwiTm90aWZpY2F0aW9uSGVhZGVyTWVudSIsIl9zIiwidG90YWxOb3RSZWFkTWVzc2FnZSIsIm5vdGlmaWNhdGlvbkNvdW50IiwiaGFuZGxlRGVhY3RpdmUiLCJkZWFjdGl2ZUNvbnZlcnNhdGlvbiIsIm9uUmVjZWl2ZU1lc3NhZ2UiLCJfdXNlU3RhdGUiLCJ1c2VTdGF0ZSIsInJlYWQiLCJzZXRSZWFkIiwiX3VzZVN0YXRlMiIsInRhYiIsInNldFRhYiIsInNvY2tldCIsInVzZUNvbnRleHQiLCJTb2NrZXRDb250ZXh0Iiwibm90aWZpY2F0aW9ucyIsInVzZVNlbGVjdG9yIiwiY3JlYXRlU2VsZWN0b3IiLCJub3RpZmljYXRpb24iLCJzdWNjZXNzIiwiZXJyb3IiLCJkYXRhU291cmNlIiwiZGlzcGF0Y2giLCJ1c2VEaXNwYXRjaCIsImZldGNoRGF0YSIsImZldGNoTm90aWZpY2Fpb24iLCJvblJlY2VpdmVOb3RpZmljYXRpb24iLCJ1c2VFZmZlY3QiLCJvbiIsIm9mZiIsInJlZGlyZWN0IiwicGF0aG5hbWUiLCJxdWVyeSIsImNyZWF0ZWRCeSIsInJlZklkIiwib25DbGlja0l0ZW0iLCJub3RpZmljYXRpb25TZXJ2aWNlIiwic2V0UmVhZEl0ZW0iLCJoYW5kbGVDaGFuZ2VUYWIiLCJ2YWwiLCJNZW51IiwiSXRlbUdyb3VwIiwiQnV0dG9uIiwiTWFpbE91dGxpbmVkIiwibWFyZ2luUmlnaHQiLCJCZWxsT3V0bGluZWQiLCJSZWFjdCIsIkZyYWdtZW50IiwiSXRlbSIsInBhZGRpbmciLCJSb3ciLCJndXR0ZXIiLCJDb2wiLCJtZCIsInRodW1ibmFpbCIsImNhcGl0YWxpemVGaXJzdExldHRlciIsIm1vbWVudCIsImZyb21Ob3ciLCJtYXBTdGF0ZVRvUHJvcHMiLCJmZXRjaE5vdGlmaWNhdGlvblN1Y2Nlc3MiLCJmb3JtYXREYXRlIiwiZGF0ZSIsImZvcm1hdCIsInVuZGVmaW5lZCIsImRpZmYiLCJkb2JUb0FnZSIsImZvcm1hdExvY2FsZURhdGUiLCJkYXRlU3RyaW5nIiwiRGF0ZSIsInRvTG9jYWxlRGF0ZVN0cmluZyIsImRheSIsIm1vbnRoIiwieWVhciIsImZvcm1hdERhdGVOZXciLCJTdHJpbmciLCJnZXRNb250aCIsInBhZFN0YXJ0IiwiZ2V0RGF0ZSIsImdldEZ1bGxZZWFyIiwiZm9ybWF0RGF0ZVRvTU1NRERZWVlZIiwiZGF0ZUlucHV0IiwiZ2V0VGltZSIsIm1vbnRocyIsInZpZGVvRHVyYXRpb24iLCJzZWNOdW0iLCJwYXJzZUludCIsImhvdXJzIiwiTWF0aCIsImZsb29yIiwibWludXRlcyIsInNlY29uZHMiLCJJTlRFUk5FVF9DSEVDS19VUkwiLCJpc0hhc0ludGVybmV0Q29ubmVjdGlvbiIsInJlcyIsImZldGNoIiwiaGVhZGVycyIsIlByYWdtYSIsIkV4cGlyZXMiLCJzdGF0dXMiLCJ0MCIsInZhbGlkYXRlTWVzc2FnZXMiLCJyZXF1aXJlZCIsInR5cGVzIiwiZW1haWwiLCJudW1iZXIiLCJyYW5nZSIsInNob3J0ZW5MYXJnZU51bWJlciIsIm51bSIsInRvRml4ZWQiLCJyZXBsYWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQ0FDQSxxSkFBQUEsbUJBQUEsWUFBQUEsb0JBQUEsV0FBQUMsQ0FBQSxTQUFBQyxDQUFBLEVBQUFELENBQUEsT0FBQUUsQ0FBQSxHQUFBQyxNQUFBLENBQUFDLFNBQUEsRUFBQUMsQ0FBQSxHQUFBSCxDQUFBLENBQUFJLGNBQUEsRUFBQUMsQ0FBQSxHQUFBSixNQUFBLENBQUFLLGNBQUEsY0FBQVAsQ0FBQSxFQUFBRCxDQUFBLEVBQUFFLENBQUEsSUFBQUQsQ0FBQSxDQUFBRCxDQUFBLElBQUFFLENBQUEsQ0FBQU8sS0FBQSxLQUFBQyxDQUFBLHdCQUFBQyxNQUFBLEdBQUFBLE1BQUEsT0FBQUMsQ0FBQSxHQUFBRixDQUFBLENBQUFHLFFBQUEsa0JBQUFDLENBQUEsR0FBQUosQ0FBQSxDQUFBSyxhQUFBLHVCQUFBQyxDQUFBLEdBQUFOLENBQUEsQ0FBQU8sV0FBQSw4QkFBQUMsT0FBQWpCLENBQUEsRUFBQUQsQ0FBQSxFQUFBRSxDQUFBLFdBQUFDLE1BQUEsQ0FBQUssY0FBQSxD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Qm5DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQkQ7QUFBQTtBQUFBO0FBQ08sSUFBTW9QLGdCQUFnQixHQUFHO0VBQzlCQyxRQUFRLEVBQUUseUJBQXlCO0VBQ25DQyxLQUFLLEVBQUU7SUFDTEMsS0FBSyxFQUFFLHVCQUF1QjtJQUM5QkMsTUFBTSxFQUFFO0VBQ1YsQ0FBQztFQUNEQSxNQUFNLEVBQUU7SUFDTkMsS0FBSyxFQUFFO0VBQ1Q7QUFDRixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWRDtBQUFBO0FBQU8sU0FBU0Msa0JBQWtCQSxDQUFDQyxHQUFHLEVBQUU7RUFDdEMsSUFBSUEsR0FBRyxJQUFJLFVBQVUsRUFBRTtJQUNyQixVQUFBdlAsTUFBQSxDQUFVLENBQUN1UCxHQUFHLEdBQUcsVUFBVSxFQUFFQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUNDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO0VBQzdEO0VBQ0EsSUFBSUYsR0FBRyxJQUFJLE9BQU8sRUFBRTtJQUNsQixVQUFBdlAsTUFBQSxDQUFVLENBQUN1UCxHQUFHLEdBQUcsT0FBTyxFQUFFQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUNDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO0VBQzFEO0VBQ0EsSUFBSUYsR0FBRyxJQUFJLElBQUksRUFBRTtJQUNmLFVBQUF2UCxNQUFBLENBQVUsQ0FBQ3VQLEdBQUcsR0FBRyxJQUFJLEVBQUVDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7RUFDdkQ7RUFDQSxPQUFPRixHQUFHO0FBQ1oiLCJmaWxlIjoic3RhdGljL2NodW5rcy8xLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHVyZUNvbXBvbmVudCwgY3JlYXRlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3BpbiB9IGZyb20gJ2FudGQnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7XG4gIHNlYXJjaENvbnZlcnNhdGlvbnMsIGdldENvbnZlcnNhdGlvbnMsIHNldEFjdGl2ZUNvbnZlcnNhdGlvbixcbiAgZ2V0Q29udmVyc2F0aW9uRGV0YWlsLCByZWNlaXZlTWVzc2FnZVN1Y2Nlc3Ncbn0gZnJvbSAnQHJlZHV4L21lc3NhZ2UvYWN0aW9ucyc7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJ3NyYy9zb2NrZXQnO1xuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgSVBlcmZvcm1lciB9IGZyb20gJ3NyYy9pbnRlcmZhY2VzJztcbi8vIGltcG9ydCBDb252ZXJzYXRpb25TZWFyY2ggZnJvbSAnLi9Db252ZXJzYXRpb25TZWFyY2gnO1xuaW1wb3J0IENvbnZlcnNhdGlvbkxpc3RJdGVtIGZyb20gJy4vQ29udmVyc2F0aW9uTGlzdEl0ZW0nO1xuaW1wb3J0ICcuL0NvbnZlcnNhdGlvbkxpc3QubGVzcyc7XG5cbmludGVyZmFjZSBJUHJvcHMge1xuICBzZWFyY2hDb252ZXJzYXRpb25zOiBGdW5jdGlvbjtcbiAgZ2V0Q29udmVyc2F0aW9uczogRnVuY3Rpb247XG4gIHNldEFjdGl2ZUNvbnZlcnNhdGlvbjogRnVuY3Rpb247XG4gIGdldENvbnZlcnNhdGlvbkRldGFpbDogRnVuY3Rpb247XG4gIHJlY2VpdmVNZXNzYWdlU3VjY2VzczogRnVuY3Rpb247XG4gIGNvbnZlcnNhdGlvbjoge1xuICAgIGxpc3Q6IHtcbiAgICAgIHJlcXVlc3Rpbmc6IGJvb2xlYW47XG4gICAgICBlcnJvcjogYW55O1xuICAgICAgZGF0YTogYW55W107XG4gICAgICB0b3RhbDogbnVtYmVyO1xuICAgICAgc3VjY2VzczogYm9vbGVhbjtcbiAgICB9O1xuICAgIG1hcHBpbmc6IFJlY29yZDxzdHJpbmcsIGFueT47XG4gICAgYWN0aXZlQ29udmVyc2F0aW9uOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xuICB9O1xuICB0b1NvdXJjZTogc3RyaW5nO1xuICB0b0lkOiBzdHJpbmc7XG4gIHVzZXI6IElQZXJmb3JtZXI7XG59XG5jbGFzcyBDb252ZXJzYXRpb25MaXN0IGV4dGVuZHMgUHVyZUNvbXBvbmVudDxJUHJvcHM+IHtcbiAgY29udmVyc2F0aW9uc1JlZjogYW55O1xuXG4gIHN0YXRlID0ge1xuICAgIGNvbnZlcnNhdGlvblBhZ2U6IDAsXG4gICAga2V5d29yZDogJydcbiAgfVxuXG4gIGFzeW5jIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGlmICghdGhpcy5jb252ZXJzYXRpb25zUmVmKSB0aGlzLmNvbnZlcnNhdGlvbnNSZWYgPSBjcmVhdGVSZWYoKTtcbiAgICBjb25zdCB7XG4gICAgICBnZXRDb252ZXJzYXRpb25zOiBnZXRDb252ZXJzYXRpb25zSGFuZGxlcixcbiAgICAgIHNldEFjdGl2ZUNvbnZlcnNhdGlvbjogc2V0QWN0aXZlQ29udmVyc2F0aW9uSGFuZGxlcixcbiAgICAgIHRvU291cmNlLFxuICAgICAgdG9JZCxcbiAgICAgIHVzZXJcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGNvbnZlcnNhdGlvblBhZ2UsIGtleXdvcmQgfSA9IHRoaXMuc3RhdGU7XG4gICAgZ2V0Q29udmVyc2F0aW9uc0hhbmRsZXIoe1xuICAgICAgbGltaXQ6IDI1LCBvZmZzZXQ6IGNvbnZlcnNhdGlvblBhZ2UgKiAyNSwgdHlwZTogJ3ByaXZhdGUnLCBrZXl3b3JkXG4gICAgfSk7XG4gICAgaWYgKHRvU291cmNlICYmIHRvSWQpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzZXRBY3RpdmVDb252ZXJzYXRpb25IYW5kbGVyKHtcbiAgICAgICAgICBzb3VyY2U6IHRvU291cmNlLFxuICAgICAgICAgIHNvdXJjZUlkOiB0b0lkLFxuICAgICAgICAgIHJlY2lwaWVudElkOiB1c2VyLl9pZFxuICAgICAgICB9KTtcbiAgICAgIH0sIDEwMDApO1xuICAgIH1cbiAgfVxuXG4gIG9uTWVzc2FnZSA9IChtZXNzYWdlOiB7IGNvbnZlcnNhdGlvbklkOiBzdHJpbmcgfCBudW1iZXI7IH0pID0+IHtcbiAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qge1xuICAgICAgY29udmVyc2F0aW9uLFxuICAgICAgZ2V0Q29udmVyc2F0aW9uczogZ2V0Q29udmVyc2F0aW9uc0hhbmRsZXIsXG4gICAgICBnZXRDb252ZXJzYXRpb25EZXRhaWw6IGdldENvbnZlcnNhdGlvbkRldGFpbEhhbmRsZXIsXG4gICAgICByZWNlaXZlTWVzc2FnZVN1Y2Nlc3M6IHJlY2VpdmVNZXNzYWdlU3VjY2Vzc0hhbmRsZXIsXG4gICAgICBzZXRBY3RpdmVDb252ZXJzYXRpb246IHNldEFjdGl2ZUNvbnZlcnNhdGlvbkhhbmRsZXIsXG4gICAgICB1c2VyXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBjb252ZXJzYXRpb25QYWdlLCBrZXl3b3JkIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgbWFwcGluZyB9ID0gY29udmVyc2F0aW9uO1xuICAgIGlmICghbWFwcGluZ1ttZXNzYWdlLmNvbnZlcnNhdGlvbklkXSkge1xuICAgICAgZ2V0Q29udmVyc2F0aW9uRGV0YWlsSGFuZGxlcih7XG4gICAgICAgIGlkOiBtZXNzYWdlLmNvbnZlcnNhdGlvbklkXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgeyBjb252ZXJzYXRpb25JZCB9ID0gbWVzc2FnZTtcbiAgICBzZXRBY3RpdmVDb252ZXJzYXRpb25IYW5kbGVyKHsgY29udmVyc2F0aW9uSWQsIHJlY2lwaWVudElkOiB1c2VyLl9pZCB9KTtcbiAgICBnZXRDb252ZXJzYXRpb25zSGFuZGxlcih7XG4gICAgICBsaW1pdDogMjUsIG9mZnNldDogY29udmVyc2F0aW9uUGFnZSAqIDI1LCB0eXBlOiAncHJpdmF0ZScsIGtleXdvcmRcbiAgICB9KTtcbiAgICByZWNlaXZlTWVzc2FnZVN1Y2Nlc3NIYW5kbGVyKG1lc3NhZ2UpO1xuICB9O1xuXG4gIG9uU2VhcmNoQ29udmVyc2F0aW9uID0gZGVib3VuY2UoYXN5bmMgKGUpID0+IHtcbiAgICBjb25zdCB7IHZhbHVlIH0gPSBlLnRhcmdldDtcbiAgICBjb25zdCB7IHNlYXJjaENvbnZlcnNhdGlvbnM6IGdldENvbnZlcnNhdGlvbnNIYW5kbGVyIH0gPSB0aGlzLnByb3BzO1xuICAgIGF3YWl0IHRoaXMuc2V0U3RhdGUoeyBrZXl3b3JkOiB2YWx1ZSwgY29udmVyc2F0aW9uUGFnZTogMCB9KTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBnZXRDb252ZXJzYXRpb25zSGFuZGxlcih7XG4gICAgICAgIGtleXdvcmQ6IHZhbHVlLCBsaW1pdDogMjUsIG9mZnNldDogMCwgdHlwZTogJ3ByaXZhdGUnXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGdldENvbnZlcnNhdGlvbnNIYW5kbGVyKHsgbGltaXQ6IDI1LCBvZmZzZXQ6IDAsIHR5cGU6ICdwcml2YXRlJyB9KTtcbiAgfSwgNTAwKTtcblxuICBoYW5kbGVTY3JvbGwgPSBhc3luYyAoZXZlbnQ6IHsgdGFyZ2V0OiBhbnk7IH0pID0+IHtcbiAgICBjb25zdCB7IGNvbnZlcnNhdGlvbiwgZ2V0Q29udmVyc2F0aW9uczogZ2V0Q29udmVyc2F0aW9uc0hhbmRsZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyByZXF1ZXN0aW5nLCBkYXRhLCB0b3RhbCB9ID0gY29udmVyc2F0aW9uLmxpc3Q7XG4gICAgY29uc3QgeyBjb252ZXJzYXRpb25QYWdlLCBrZXl3b3JkIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGNhbmxvYWRtb3JlID0gdG90YWwgPiBkYXRhLmxlbmd0aDtcbiAgICBjb25zdCBlbGUgPSBldmVudC50YXJnZXQ7XG4gICAgaWYgKCFjYW5sb2FkbW9yZSkgcmV0dXJuO1xuICAgIGlmIChlbGUuc2Nyb2xsSGVpZ2h0IC0gZWxlLnNjcm9sbFRvcCA9PT0gZWxlLmNsaWVudEhlaWdodCAmJiAhcmVxdWVzdGluZyAmJiBjYW5sb2FkbW9yZSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbnZlcnNhdGlvblBhZ2U6IGNvbnZlcnNhdGlvblBhZ2UgKyAxIH0sICgpID0+IHtcbiAgICAgICAgY29uc3QgeyBjb252ZXJzYXRpb25QYWdlOiBuZXdQYWdlIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBnZXRDb252ZXJzYXRpb25zSGFuZGxlcih7XG4gICAgICAgICAga2V5d29yZCwgbGltaXQ6IDI1LCBvZmZzZXQ6IG5ld1BhZ2UgKiAyNSwgdHlwZTogJ3ByaXZhdGUnXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0QWN0aXZlID0gKGNvbnZlcnNhdGlvbklkOiBhbnkpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzZXRBY3RpdmVDb252ZXJzYXRpb246IHNldEFjdGl2ZUNvbnZlcnNhdGlvbkhhbmRsZXIsXG4gICAgICB1c2VyXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgc2V0QWN0aXZlQ29udmVyc2F0aW9uSGFuZGxlcih7IGNvbnZlcnNhdGlvbklkLCByZWNpcGllbnRJZDogdXNlci5faWQgfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY29udmVyc2F0aW9uLCB1c2VyIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgZGF0YTogY29udmVyc2F0aW9ucywgcmVxdWVzdGluZyB9ID0gY29udmVyc2F0aW9uLmxpc3Q7XG4gICAgY29uc3QgeyBtYXBwaW5nLCBhY3RpdmVDb252ZXJzYXRpb24gPSB7fSB9ID0gY29udmVyc2F0aW9uO1xuICAgIGlmICghdGhpcy5jb252ZXJzYXRpb25zUmVmKSB0aGlzLmNvbnZlcnNhdGlvbnNSZWYgPSBjcmVhdGVSZWYoKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnZlcnNhdGlvbi1saXN0XCIgcmVmPXt0aGlzLmNvbnZlcnNhdGlvbnNSZWZ9IG9uU2Nyb2xsPXt0aGlzLmhhbmRsZVNjcm9sbC5iaW5kKHRoaXMpfT5cbiAgICAgICAgPEV2ZW50IGV2ZW50PVwibWVzc2FnZV9jcmVhdGVkXCIgaGFuZGxlcj17dGhpcy5vbk1lc3NhZ2V9IC8+XG4gICAgICAgIHsvKiA8Q29udmVyc2F0aW9uU2VhcmNoXG4gICAgICAgICAgb25TZWFyY2g9eyhlKSA9PiB7XG4gICAgICAgICAgICBlLnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMub25TZWFyY2hDb252ZXJzYXRpb24oZSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgLz4gKi99XG4gICAgICAgIHtjb252ZXJzYXRpb25zLmxlbmd0aCA+IDBcbiAgICAgICAgICAmJiBjb252ZXJzYXRpb25zLm1hcCgoY29udmVyc2F0aW9uSWQpID0+IChcbiAgICAgICAgICAgIDxDb252ZXJzYXRpb25MaXN0SXRlbVxuICAgICAgICAgICAgICBrZXk9e2NvbnZlcnNhdGlvbklkfVxuICAgICAgICAgICAgICBkYXRhPXttYXBwaW5nW2NvbnZlcnNhdGlvbklkXX1cbiAgICAgICAgICAgICAgc2V0QWN0aXZlPXt0aGlzLnNldEFjdGl2ZX1cbiAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2FjdGl2ZUNvbnZlcnNhdGlvbi5faWQgPT09IGNvbnZlcnNhdGlvbklkfVxuICAgICAgICAgICAgICB1c2VyPXt1c2VyfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAge3JlcXVlc3RpbmcgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+PFNwaW4gLz48L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAgeyFyZXF1ZXN0aW5nICYmICFjb252ZXJzYXRpb25zLmxlbmd0aCAmJiAoXG4gICAgICAgICAgPHAgc3R5bGU9e3sgbWFyZ2luOiAnMjBweCAwJyB9fSBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPk5vIGNvbnZlcnNhdGlvbiBmb3VuZC48L3A+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlcyA9IChzdGF0ZTogYW55KSA9PiAoe1xuICBjb252ZXJzYXRpb246IHsgLi4uc3RhdGUuY29udmVyc2F0aW9uIH0sXG4gIG1lc3NhZ2U6IHsgLi4uc3RhdGUubWVzc2FnZSB9LFxuICB1c2VyOiB7IC4uLnN0YXRlLnVzZXIuY3VycmVudCB9LFxuICBzZW5kTWVzc2FnZVN0YXR1czogc3RhdGUubWVzc2FnZS5zZW5kTWVzc2FnZVxufSk7XG5cbmNvbnN0IG1hcERpc3BhdGNoID0ge1xuICBzZWFyY2hDb252ZXJzYXRpb25zLFxuICBnZXRDb252ZXJzYXRpb25zLFxuICBzZXRBY3RpdmVDb252ZXJzYXRpb24sXG4gIGdldENvbnZlcnNhdGlvbkRldGFpbCxcbiAgcmVjZWl2ZU1lc3NhZ2VTdWNjZXNzXG59O1xuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZXMsIG1hcERpc3BhdGNoKShDb252ZXJzYXRpb25MaXN0KTtcbiIsImltcG9ydCB7IEJhZGdlLCBBdmF0YXIsIFRvb2x0aXAgfSBmcm9tICdhbnRkJztcbmltcG9ydCB7IFRpY2tJY29uIH0gZnJvbSAnc3JjL2ljb25zJztcbmltcG9ydCB7IGZvcm1hdERhdGVGcm9tbm93IH0gZnJvbSAnQGxpYi9pbmRleCc7XG5pbXBvcnQgeyBJQ29udmVyc2F0aW9uIH0gZnJvbSAnQGludGVyZmFjZXMvbWVzc2FnZSc7XG5pbXBvcnQgJy4vQ29udmVyc2F0aW9uTGlzdEl0ZW0ubGVzcyc7XG5pbXBvcnQgUm91dGVyIGZyb20gJ25leHQvcm91dGVyJztcbmltcG9ydCB7IElQZXJmb3JtZXIgfSBmcm9tICdAaW50ZXJmYWNlcy9wZXJmb3JtZXInO1xuXG5pbnRlcmZhY2UgSVByb3BzIHtcbiAgZGF0YTogSUNvbnZlcnNhdGlvbjtcbiAgc2V0QWN0aXZlOiBGdW5jdGlvbjtcbiAgc2VsZWN0ZWQ6IGJvb2xlYW47XG4gIHVzZXI6IElQZXJmb3JtZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbnZlcnNhdGlvbkxpc3RJdGVtKHByb3BzOiBJUHJvcHMpIHtcbiAgY29uc3QgeyBkYXRhLCBzZXRBY3RpdmUsIHNlbGVjdGVkLCB1c2VyIH0gPSBwcm9wcztcblxuICBjb25zdCB7XG4gICAgcmVjaXBpZW50SW5mbywgbGFzdE1lc3NhZ2UsIF9pZCwgdG90YWxOb3RTZWVuTWVzc2FnZXMgPSAwLCBsYXN0TWVzc2FnZUNyZWF0ZWRBdCwgdXBkYXRlZEF0LCBkaWFtb25kc0FyZVBlbmRpbmdcbiAgfSA9IGRhdGE7XG4gIFxuICBjb25zdCBjbGFzc05hbWUgPSBzZWxlY3RlZCA/ICdjb252ZXJzYXRpb24tbGlzdC1pdGVtIGFjdGl2ZScgOiAnY29udmVyc2F0aW9uLWxpc3QtaXRlbSc7XG4gIFxuICBpZiAoIWxhc3RNZXNzYWdlKSB7IHJldHVybiBudWxsOyB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGFyaWEtaGlkZGVuIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBvbkNsaWNrPXsoKSA9PiB7IHNldEFjdGl2ZShfaWQpOyBSb3V0ZXIucHVzaCgnL21lc3NhZ2VzJyk7IH19PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb252ZXJzYXRpb24tbGVmdC1jb3JuZXJcIj5cbiAgICAgICAgPEF2YXRhciBjbGFzc05hbWU9XCJjb252ZXJzYXRpb24tcGhvdG9cIiBzcmM9e3JlY2lwaWVudEluZm8/LmF2YXRhciB8fCAnL3N0YXRpYy9uby1hdmF0YXIucG5nJ30gYWx0PVwiYXZhdGFyXCIgLz5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtyZWNpcGllbnRJbmZvPy5pc09ubGluZSA+IDAgPyAnb25saW5lLXN0YXR1cyBhY3RpdmUnIDogJ29ubGluZS1zdGF0dXMnfSAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnZlcnNhdGlvbi1pbmZvXCI+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJjb252ZXJzYXRpb24tdGl0bGVcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZS1uYW1lXCIgdGl0bGU9e3JlY2lwaWVudEluZm8/Lm5hbWUgfHwgcmVjaXBpZW50SW5mbz8udXNlcm5hbWUgfHwgJ04vQSd9PlxuICAgICAgICAgICAge3JlY2lwaWVudEluZm8/Lm5hbWUgfHwgcmVjaXBpZW50SW5mbz8udXNlcm5hbWUgfHwgJ04vQSd9XG4gICAgICAgICAgICB7cmVjaXBpZW50SW5mbz8udmVyaWZpZWRBY2NvdW50ICYmIDxUaWNrSWNvbiAvPn1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAge3VzZXIucm9sZXMuaW5kZXhPZigncm9sZS1ob3N0LWRtZWZlZScpICE9PSAtMSAmJiBkaWFtb25kc0FyZVBlbmRpbmcgPyAoXG4gICAgICAgICAgPFRvb2x0aXAgdGl0bGU9XCJZb3UgbXVzdCByZXNwb25kIHdpdGhpbiAyNCBob3VycyBpbiBvcmRlciB0byBjb2xsZWN0IHRoaXMgZmVlXCI+XG4gICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICA8c21hbGw+e2RpYW1vbmRzQXJlUGVuZGluZ308L3NtYWxsPlxuICAgICAgICAgICAgICB7JyAnfVxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vc3RhdGljL2RpYW1vbmQucG5nXCIgd2lkdGg9XCIyMHB4XCIgYWx0PVwicnVieVwiIC8+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvVG9vbHRpcD5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPC9oMT5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwiY29udmVyc2F0aW9uLXNuaXBwZXRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNob3J0LWNvbnRlbnRcIj57bGFzdE1lc3NhZ2V9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyaWdodC1jb250ZW50XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjb252ZXJzYXRpb24tdGltZVwiPntmb3JtYXREYXRlRnJvbW5vdyhsYXN0TWVzc2FnZUNyZWF0ZWRBdCB8fCB1cGRhdGVkQXQpfTwvc3Bhbj5cbiAgICAgICAgICAgIHsnICd9XG4gICAgICAgICAgICA8QmFkZ2VcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibm90aWZpY2F0aW9uLWJhZGdlXCJcbiAgICAgICAgICAgICAgY291bnQ9e3RvdGFsTm90U2Vlbk1lc3NhZ2VzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9yZXF1aXJlLWRlZmF1bHQtcHJvcHMgKi9cbmltcG9ydCB7IElOb3RpZmljYXRpb24gfSBmcm9tICdAaW50ZXJmYWNlcy9ub3RpZmljYXRpb24nO1xuaW1wb3J0IHtcbiAgTWVudSwgQXZhdGFyLCBtZXNzYWdlLCBSb3csIENvbCwgQnV0dG9uXG59IGZyb20gJ2FudGQnO1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2gsIHVzZVNlbGVjdG9yLCBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgY3JlYXRlU2VsZWN0b3IgfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgeyBkZWFjdGl2ZUNvbnZlcnNhdGlvbiB9IGZyb20gJ0ByZWR1eC9tZXNzYWdlL2FjdGlvbnMnO1xuaW1wb3J0ICcuL05vdGlmaWNhdGlvbkhlYWRlck1lbnUubGVzcyc7XG5pbXBvcnQgeyBmZXRjaE5vdGlmaWNhaW9uLCBzZXRSZWFkSXRlbSB9IGZyb20gJ0ByZWR1eC9ub3RpZmljYXRpb24vYWN0aW9ucyc7XG5pbXBvcnQgeyB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJvdXRlciBmcm9tICduZXh0L3JvdXRlcic7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBTb2NrZXRDb250ZXh0IH0gZnJvbSAnc3JjL3NvY2tldCc7XG5pbXBvcnQgeyBjYXBpdGFsaXplRmlyc3RMZXR0ZXIgfSBmcm9tICdAbGliL3N0cmluZyc7XG5pbXBvcnQgeyBub3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnQHNlcnZpY2VzL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbi8vIGltcG9ydCBCdXR0b25Gb2xsb3dCYWNrIGZyb20gJ0Bjb21wb25lbnRzL2NvbW1vbi9idXR0b25Gb2xsb3dCYWNrJztcbi8vIGltcG9ydCB7IElQZXJmb3JtZXIgfSBmcm9tICdAaW50ZXJmYWNlcy9wZXJmb3JtZXInO1xuaW1wb3J0IHsgQmVsbE91dGxpbmVkLCBNYWlsT3V0bGluZWQgfSBmcm9tICdAYW50LWRlc2lnbi9pY29ucyc7XG5pbXBvcnQgQ29udmVyc2F0aW9uTGlzdCBmcm9tICdAY29tcG9uZW50cy9tZXNzYWdlcy9Db252ZXJzYXRpb25MaXN0JztcblxuY29uc3QgU0VORF9OT1RJRklDQVRJT04gPSAnc2VuZF9ub3RpZmljYXRpb24nO1xuXG5pbnRlcmZhY2UgSVByb3BzIHtcblxuICAvLyBjdXJyZW50VXNlcjogSVBlcmZvcm1lcjtcbiAgdG90YWxOb3RSZWFkTWVzc2FnZTogbnVtYmVyO1xuICBub3RpZmljYXRpb25Db3VudDogbnVtYmVyO1xuICB0b1NvdXJjZT86IHN0cmluZztcbiAgdG9JZD86IHN0cmluZztcbiAgZGVhY3RpdmVDb252ZXJzYXRpb246IEZ1bmN0aW9uO1xuICBvblJlY2VpdmVNZXNzYWdlPzpGdW5jdGlvbjtcblxufVxuXG5jb25zdCBOb3RpZmljYXRpb25IZWFkZXJNZW51ID0gKHtcbiAgdG90YWxOb3RSZWFkTWVzc2FnZSwgbm90aWZpY2F0aW9uQ291bnQsIHRvSWQsIHRvU291cmNlLCBkZWFjdGl2ZUNvbnZlcnNhdGlvbjogaGFuZGxlRGVhY3RpdmUsIG9uUmVjZWl2ZU1lc3NhZ2Vcbn06IElQcm9wcykgPT4ge1xuICBjb25zdCBbcmVhZCwgc2V0UmVhZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFt0YWIsIHNldFRhYl0gPSB1c2VTdGF0ZSgnbWVzc2FnZScpO1xuXG4gIGNvbnN0IHNvY2tldCA9IHVzZUNvbnRleHQoU29ja2V0Q29udGV4dCk7XG5cbiAgY29uc3Qgbm90aWZpY2F0aW9ucyA9IHVzZVNlbGVjdG9yKFxuICAgIGNyZWF0ZVNlbGVjdG9yKFxuICAgICAgKHN0YXRlOiBhbnkpID0+IHN0YXRlLm5vdGlmaWNhdGlvbi5zdWNjZXNzLFxuICAgICAgKHN0YXRlOiBhbnkpID0+IHN0YXRlLm5vdGlmaWNhdGlvbi5lcnJvcixcbiAgICAgIChzdGF0ZTogYW55KSA9PiBzdGF0ZS5ub3RpZmljYXRpb24uZGF0YVNvdXJjZSxcbiAgICAgIChzdWNjZXNzLCBlcnJvciwgZGF0YSkgPT4ge1xuICAgICAgICBpZiAoc3VjY2VzcyAmJiAhZXJyb3IpIHJldHVybiBkYXRhO1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgKVxuICApIGFzIElOb3RpZmljYXRpb25bXTtcblxuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XG5cbiAgY29uc3QgZmV0Y2hEYXRhID0gKCkgPT4ge1xuICAgIGRpc3BhdGNoKGZldGNoTm90aWZpY2Fpb24oKSk7XG4gIH07XG5cbiAgY29uc3Qgb25SZWNlaXZlTm90aWZpY2F0aW9uID0gKGRhdGEpID0+IHtcbiAgICBmZXRjaERhdGEoKTtcbiAgICBvblJlY2VpdmVNZXNzYWdlKCk7XG4gICAgbWVzc2FnZS5zdWNjZXNzKGRhdGE/LnRpdGxlIHx8IGRhdGE/Lm1lc3NhZ2UgfHwgJ1lvdSByZWNlaXZlZCBhIG5ldyBub3RpZmljYXRpb24nKTtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGZldGNoRGF0YSgpO1xuICB9LCBbcmVhZF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCF0b1NvdXJjZSAmJiAhdG9JZCkge1xuICAgICAgaGFuZGxlRGVhY3RpdmUoKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChzb2NrZXQpIHtcbiAgICAgIHNvY2tldC5vbihTRU5EX05PVElGSUNBVElPTiwgb25SZWNlaXZlTm90aWZpY2F0aW9uKTtcbiAgICB9XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHNvY2tldD8ub2ZmKFNFTkRfTk9USUZJQ0FUSU9OLCBvblJlY2VpdmVOb3RpZmljYXRpb24pO1xuICAgIH07XG4gIH0sIFtzb2NrZXRdKTtcblxuICBjb25zdCByZWRpcmVjdCA9IChub3RpZmljYXRpb24pID0+IHtcbiAgICBzd2l0Y2ggKG5vdGlmaWNhdGlvbi50eXBlKSB7XG4gICAgICBjYXNlICdsaXZlJzpcbiAgICAgICAgcmV0dXJuIFJvdXRlci5wdXNoKHtcbiAgICAgICAgICBwYXRobmFtZTogJy9zdHJlYW0nLFxuICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICB1c2VybmFtZTogbm90aWZpY2F0aW9uLmNyZWF0ZWRCeVxuXG4gICAgICAgICAgfVxuICAgICAgICB9LCBgL3N0cmVhbS8ke25vdGlmaWNhdGlvbi5jcmVhdGVkQnlcbiAgICAgICAgfWApO1xuICAgICAgY2FzZSAncHJpdmF0ZWNoYXRSZXF1ZXN0JzpcbiAgICAgICAgcmV0dXJuIFJvdXRlci5wdXNoKCcvbW9kZWwvcHJpdmF0ZS13YWl0aW5nLXJvb20nKTtcbiAgICAgIGNhc2UgJ2ZvbGxvdyc6XG4gICAgICAgIHJldHVybiBSb3V0ZXIucHVzaCh7XG4gICAgICAgICAgcGF0aG5hbWU6IGAvJHtub3RpZmljYXRpb24uY3JlYXRlZEJ5fWBcbiAgICAgICAgfSk7XG4gICAgICBjYXNlICdzdWJzY3JpcHRpb24nOlxuICAgICAgICByZXR1cm4gUm91dGVyLnB1c2goJy93YWxsZXQnKTtcbiAgICAgIGNhc2UgJ2NvbW1lbnQnOlxuICAgICAgICByZXR1cm4gUm91dGVyLnB1c2goYC9wb3N0LyR7bm90aWZpY2F0aW9uLnJlZklkfWApO1xuICAgICAgY2FzZSAnZmVlZCc6XG4gICAgICAgIHJldHVybiBSb3V0ZXIucHVzaChgL3Bvc3QvJHtub3RpZmljYXRpb24ucmVmSWR9YCk7XG4gICAgICBjYXNlICdhZG1pbkRpcmVjdE1lc3NhZ2UnOlxuICAgICAgICByZXR1cm4gUm91dGVyLnB1c2goJy9tZXNzYWdlcycpO1xuICAgICAgY2FzZSAnY3Jvc3NQcm9tb3Rpb24nOlxuICAgICAgICByZXR1cm4gUm91dGVyLnB1c2goe1xuICAgICAgICAgIHBhdGhuYW1lOiAnL3dhbGxldCcsXG4gICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgIHRhYjogJ2RpYW1vbmQtaGlzdG9yeSdcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAnZGlyZWN0VGlwJzpcbiAgICAgICAgcmV0dXJuIFJvdXRlci5wdXNoKCcvd2FsbGV0Jyk7XG4gICAgICBjYXNlICdtaWxlU3RvbmUnOlxuICAgICAgICByZXR1cm4gUm91dGVyLnB1c2goJy9icm9hZGNhc3Rlci1kYXNoYm9hcmQnKTtcbiAgICAgIGNhc2UgJ2F2YWlsYWJsZS1wcml2YXRlLWNoYXQnOlxuICAgICAgICByZXR1cm4gUm91dGVyLnB1c2goe1xuICAgICAgICAgIHBhdGhuYW1lOiAnL3VzZXIvcHJpdmF0ZS13YWl0aW5nLXJvb20nLFxuICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICB1c2VybmFtZTogbm90aWZpY2F0aW9uLmNyZWF0ZWRCeVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICBjYXNlICdkaXJlY3RNZXNzYWdlJzpcbiAgICAgICAgcmV0dXJuIFJvdXRlci5wdXNoKCcvbWVzc2FnZXMnKTtcbiAgICAgIGRlZmF1bHQ6IHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBvbkNsaWNrSXRlbSA9IChub3RpZmljYXRpb24pID0+IHtcbiAgICBzZXRSZWFkKHRydWUpO1xuICAgIGlmICghbm90aWZpY2F0aW9uLnJlYWQpIHtcbiAgICAgIC8vIGdvaSBhcGkgUFVUIHJlYWRcbiAgICAgIG5vdGlmaWNhdGlvblNlcnZpY2UucmVhZChub3RpZmljYXRpb24uX2lkKTtcbiAgICAgIGRpc3BhdGNoKHNldFJlYWRJdGVtKG5vdGlmaWNhdGlvbi5faWQpKTtcbiAgICB9XG4gICAgcmVkaXJlY3Qobm90aWZpY2F0aW9uKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDaGFuZ2VUYWIgPSAodmFsOiBzdHJpbmcpID0+IHtcbiAgICBpZiAodmFsID09PSB0YWIpIHtcbiAgICAgIHRhYiA9PT0gJ25vdGlmaWNhdGlvbicgJiYgUm91dGVyLnB1c2goJy9ub3RpZmljYXRpb25zJyk7XG4gICAgICB0YWIgPT09ICdtZXNzYWdlJyAmJiBSb3V0ZXIucHVzaCgnL21lc3NhZ2VzJyk7XG4gICAgfVxuICAgIHNldFRhYih2YWwpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPE1lbnUgdGl0bGU9XCJOb3RpZmljYXRpb25zXCIgY2xhc3NOYW1lPVwibm90aWZpY2F0aW9uLW1lbnVcIj5cbiAgICAgIDxNZW51Lkl0ZW1Hcm91cFxuICAgICAgICB0aXRsZT17KFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGUtbm90aWZpY2F0aW9uXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8QnV0dG9uIGNsYXNzTmFtZT1cImJ0bi1kaXNtaXNzLXJlYWQtYWxsXCIgb25DbGljaz17KCkgPT4gaGFuZGxlQ2hhbmdlVGFiKCdtZXNzYWdlJyl9PlxuICAgICAgICAgICAgICAgIDxNYWlsT3V0bGluZWQgc3R5bGU9e3sgbWFyZ2luUmlnaHQ6ICc1cHgnIH19IC8+XG4gICAgICAgICAgICAgICAgSW5ib3hcbiAgICAgICAgICAgICAgICB7JyAnfVxuICAgICAgICAgICAgICAgIHt0b3RhbE5vdFJlYWRNZXNzYWdlfVxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPEJ1dHRvbiBjbGFzc05hbWU9XCJidG4tZGlzbWlzcy1yZWFkLWFsbFwiIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNoYW5nZVRhYignbm90aWZpY2F0aW9uJyl9PlxuICAgICAgICAgICAgICAgIDxCZWxsT3V0bGluZWQgc3R5bGU9e3sgbWFyZ2luUmlnaHQ6ICc1cHgnIH19IC8+XG4gICAgICAgICAgICAgICAgTm90aWZpY2F0aW9uc1xuICAgICAgICAgICAgICAgIHsnICd9XG4gICAgICAgICAgICAgICAge25vdGlmaWNhdGlvbkNvdW50fVxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPlxuICAgICAgICB7dGFiID09PSAnbWVzc2FnZScgPyA8Q29udmVyc2F0aW9uTGlzdCB0b1NvdXJjZT17dG9Tb3VyY2V9IHRvSWQ9e3RvSWR9IC8+XG4gICAgICAgICAgOiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICB7bm90aWZpY2F0aW9ucy5sZW5ndGggPiAwID8gKFxuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbnMubWFwKChub3RpZmljYXRpb24pID0+IChcbiAgICAgICAgICAgICAgICAgIDxNZW51Lkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgcGFkZGluZzogMCB9fVxuICAgICAgICAgICAgICAgICAgICBrZXk9e25vdGlmaWNhdGlvbi5faWR9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17bm90aWZpY2F0aW9uLnJlYWQgPT09IGZhbHNlID8gJ25vdGlmaWNhdGlvbi11bnJlYWQnIDogJ25vdGlmaWNhdGlvbi1yZWFkJ31cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPFJvdyBndXR0ZXI9ezI0fSBjbGFzc05hbWU9XCJub3RpZmljYXRpb24taXRlbVwiIHN0eWxlPXt7IHBhZGRpbmc6ICcwIDNweCAwIDNweCcgfX0gb25DbGljaz17KCkgPT4gb25DbGlja0l0ZW0obm90aWZpY2F0aW9uKX0+XG4gICAgICAgICAgICAgICAgICAgICAgPENvbCBtZD17M30gc3R5bGU9e3sgcGFkZGluZzogMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxBdmF0YXIgc3JjPXtub3RpZmljYXRpb24udGh1bWJuYWlsIHx8ICcvbm8taW1hZ2UuanBnJ30gLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L0NvbD5cbiAgICAgICAgICAgICAgICAgICAgICA8Q29sIG1kPXsxNX0gc3R5bGU9e3sgcGFkZGluZzogMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm90aWZpY2F0aW9uLWl0ZW0tbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lc3NhZ2VcIj57Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyKG5vdGlmaWNhdGlvbi50aXRsZSl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRpbWVcIj48c21hbGw+e21vbWVudChub3RpZmljYXRpb24udXBkYXRlZEF0KS5mcm9tTm93KCl9PC9zbWFsbD48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L0NvbD5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogPENvbCBtZD17Nn0gY2xhc3NOYW1lPVwibm90aWZpY2F0aW9uLWZvbGxvdy1idXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25Gb2xsb3dCYWNrXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBlcmZvcm1lcj17bnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNIaWRlT25DbGlja1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRJZD17bm90aWZpY2F0aW9uLmNyZWF0ZWRCeX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlSWQ9e2N1cnJlbnRVc2VyPy5faWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlzRm9sbG93PXtub3RpZmljYXRpb24uaXNGb2xsb3dlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0UGVyZm9ybWVyTGlzdD17KCkgPT4ge319XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvQ29sPiAqL31cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e25vdGlmaWNhdGlvbi5yZWFkID09PSBmYWxzZSA/ICdub3RpZmljYXRpb24tZG9jdycgOiAnJ30+eyB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L1Jvdz5cbiAgICAgICAgICAgICAgICAgIDwvTWVudS5JdGVtPlxuICAgICAgICAgICAgICAgICkpXG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPE1lbnUuSXRlbSBrZXk9XCJuby1ub3RpZmljYXRpb25cIj5UaGVyZSBhcmUgbm8gbm90aWZpY2F0aW9ucy48L01lbnUuSXRlbT5cbiAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgIDwvTWVudS5JdGVtR3JvdXA+XG4gICAgPC9NZW51PlxuICApO1xufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlOmFueSkgPT4gKHtcbiAgZmV0Y2hOb3RpZmljYXRpb25TdWNjZXNzOiBzdGF0ZS5ub3RpZmljYXRpb24uc3VjY2Vzc1xufSk7XG5cbmNvbnN0IG1hcERpc3BhdGNoID0geyBkZWFjdGl2ZUNvbnZlcnNhdGlvbiB9O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2gpKE5vdGlmaWNhdGlvbkhlYWRlck1lbnUpO1xuIiwiaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlOiBEYXRlLCBmb3JtYXQgPSAnTU1NL0REL1lZWVknKSB7XG4gIHJldHVybiBtb21lbnQoZGF0ZSkuZm9ybWF0KGZvcm1hdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlRnJvbW5vdyhkYXRlOiBEYXRlLCBmb3JtYXQgPSAnTU1NLURELVlZWVknKSB7XG4gIGlmIChtb21lbnQoKS5kaWZmKG1vbWVudChkYXRlKSwgJ3llYXJzJykgPiAwKSB7IHJldHVybiBtb21lbnQoZGF0ZSkuZm9ybWF0KGZvcm1hdCk7IH1cbiAgcmV0dXJuIG1vbWVudChkYXRlKS5mcm9tTm93KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkb2JUb0FnZShkYXRlOiBEYXRlKSB7XG4gIHJldHVybiAoXG4gICAgbW9tZW50KCkuZGlmZihtb21lbnQoZGF0ZSksICd5ZWFycycpID4gMFxuICAgICYmIGAke21vbWVudCgpLmRpZmYobW9tZW50KGRhdGUpLCAneWVhcnMnKX0rYFxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0TG9jYWxlRGF0ZShkYXRlU3RyaW5nOiBzdHJpbmcpIHtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHJpbmcpO1xuICByZXR1cm4gZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoJ3B0LUJSJywge1xuICAgIGRheTogJzItZGlnaXQnLCBcbiAgICBtb250aDogJzItZGlnaXQnLCBcbiAgICB5ZWFyOiAnbnVtZXJpYydcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlTmV3KGRhdGUpIHtcbiAgY29uc3QgZCA9IG5ldyBEYXRlKGRhdGUpO1xuICBjb25zdCBtb250aCA9IFN0cmluZyhkLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCAnMCcpOyBcbiAgY29uc3QgZGF5ID0gU3RyaW5nKGQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCAnMCcpOyBcbiAgY29uc3QgeWVhciA9IGQuZ2V0RnVsbFllYXIoKTtcblxuICByZXR1cm4gYCR7bW9udGh9LyR7ZGF5fS8ke3llYXJ9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGVUb01NTUREWVlZWShkYXRlSW5wdXQ6c3RyaW5nKSB7XG4gIGlmICghZGF0ZUlucHV0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBkYXRlIGlucHV0LiBQbGVhc2UgcHJvdmlkZSBhIHZhbGlkIERhdGUgb2JqZWN0IG9yIGEgdmFsaWQgZGF0ZSBzdHJpbmcuXCIpO1xuICB9XG5cbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGVJbnB1dCk7XG4gIGlmIChpc05hTihkYXRlLmdldFRpbWUoKSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRhdGUgaW5wdXQuIFVuYWJsZSB0byBwYXJzZSB0aGUgZGF0ZS5cIik7XG4gIH1cblxuICBjb25zdCBtb250aHMgPSBbXG4gICAgXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIixcbiAgICBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiXG4gIF07XG5cbiAgY29uc3QgZGF5ID0gU3RyaW5nKGRhdGUuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIGNvbnN0IG1vbnRoID0gbW9udGhzW2RhdGUuZ2V0TW9udGgoKV07XG4gIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgcmV0dXJuIGAke21vbnRofS8ke2RheX0vJHt5ZWFyfWA7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIHZpZGVvRHVyYXRpb24ocykge1xuICBpZiAoIXMpIHtcbiAgICByZXR1cm4gJzAwOjAwJztcbiAgfVxuICBjb25zdCBzZWNOdW06IGFueSA9IHBhcnNlSW50KHMsIDEwKTsgLy8gZG9uJ3QgZm9yZ2V0IHRoZSBzZWNvbmQgcGFyYW1cbiAgbGV0IGhvdXJzOiBhbnkgPSBNYXRoLmZsb29yKHNlY051bSAvIDM2MDApO1xuICBsZXQgbWludXRlczogYW55ID0gTWF0aC5mbG9vcigoc2VjTnVtIC0gKGhvdXJzICogMzYwMCkpIC8gNjApO1xuICBsZXQgc2Vjb25kczogYW55ID0gc2VjTnVtIC0gKGhvdXJzICogMzYwMCkgLSAobWludXRlcyAqIDYwKTtcblxuICBpZiAoaG91cnMgPCAxMCkgaG91cnMgPSBgMCR7aG91cnN9YDtcbiAgaWYgKG1pbnV0ZXMgPCAxMCkgbWludXRlcyA9IGAwJHttaW51dGVzfWA7XG4gIGlmIChzZWNvbmRzIDwgMTApIHNlY29uZHMgPSBgMCR7c2Vjb25kc31gO1xuICByZXR1cm4gYCR7KGhvdXJzICE9PSAnMDAnID8gYCR7aG91cnN9OmAgOiAnJykgKyBtaW51dGVzfToke3NlY29uZHN9YDtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vaW50ZXJuZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9yZWR1eCc7XG5leHBvcnQgKiBmcm9tICcuL3N0cmluZyc7XG5leHBvcnQgKiBmcm9tICcuL2RhdGUnO1xuZXhwb3J0ICogZnJvbSAnLi9tZXNzYWdlJztcbmV4cG9ydCAqIGZyb20gJy4vZHVyYXRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi91dGlscyc7XG5leHBvcnQgKiBmcm9tICcuL251bWJlcic7XG4iLCJpbXBvcnQgeyBtZXNzYWdlIH0gZnJvbSAnYW50ZCc7XG5cbmNvbnN0IElOVEVSTkVUX0NIRUNLX1VSTCA9ICdodHRwczovL2dvb2dsZS5jb20nO1xuXG5leHBvcnQgY29uc3QgaXNIYXNJbnRlcm5ldENvbm5lY3Rpb24gPSBhc3luYyAoKTogUHJvbWlzZTxib29sZWFuPiA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goSU5URVJORVRfQ0hFQ0tfVVJMLCB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDYWNoZS1Db250cm9sJzogJ25vLWNhY2hlLCBuby1zdG9yZSwgbXVzdC1yZXZhbGlkYXRlJyxcbiAgICAgICAgUHJhZ21hOiAnbm8tY2FjaGUnLFxuICAgICAgICBFeHBpcmVzOiAwXG4gICAgICB9IGFzIGFueVxuICAgIH0pO1xuICAgIGlmIChcbiAgICAgIHJlcy5zdGF0dXMgPT09IDQwNFxuICAgICAgfHwgcmVzLnN0YXR1cyA9PT0gNDAxXG4gICAgICB8fCByZXMuc3RhdHVzID09PSA0MDNcbiAgICAgIHx8IHJlcy5zdGF0dXMgPT09IDUwMFxuICAgICAgfHwgKHJlcy5zdGF0dXMgPj0gMjAwICYmIHJlcy5zdGF0dXMgPD0gMzAwKVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICBtZXNzYWdlLmVycm9yKGV4Y2VwdGlvbik7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXRlbXBsYXRlLWN1cmx5LWluLXN0cmluZyAqL1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlTWVzc2FnZXMgPSB7XG4gIHJlcXVpcmVkOiAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZCEnLFxuICB0eXBlczoge1xuICAgIGVtYWlsOiAnTm90IGEgdmFsaWRhdGUgZW1haWwhJyxcbiAgICBudW1iZXI6ICdOb3QgYSB2YWxpZGF0ZSBudW1iZXIhJ1xuICB9LFxuICBudW1iZXI6IHtcbiAgICByYW5nZTogJ011c3QgYmUgYmV0d2VlbiAke21pbn0gYW5kICR7bWF4fSdcbiAgfVxufTtcbiIsImV4cG9ydCBmdW5jdGlvbiBzaG9ydGVuTGFyZ2VOdW1iZXIobnVtKSB7XG4gIGlmIChudW0gPj0gMTAwMDAwMDAwMCkge1xuICAgIHJldHVybiBgJHsobnVtIC8gMTAwMDAwMDAwMCkudG9GaXhlZCgxKS5yZXBsYWNlKC9cXC4wJC8sICcnKX1CYDtcbiAgfVxuICBpZiAobnVtID49IDEwMDAwMDApIHtcbiAgICByZXR1cm4gYCR7KG51bSAvIDEwMDAwMDApLnRvRml4ZWQoMSkucmVwbGFjZSgvXFwuMCQvLCAnJyl9TWA7XG4gIH1cbiAgaWYgKG51bSA+PSAxMDAwKSB7XG4gICAgcmV0dXJuIGAkeyhudW0gLyAxMDAwKS50b0ZpeGVkKDEpLnJlcGxhY2UoL1xcLjAkLywgJycpfUtgO1xuICB9XG4gIHJldHVybiBudW07XG59XG4iXSwic291cmNlUm9vdCI6IiJ9