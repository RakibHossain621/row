(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[6],{

/***/ "./node_modules/react-infinite-scroll-component/dist/index.es.js":
/*!***********************************************************************!*\
  !*** ./node_modules/react-infinite-scroll-component/dist/index.es.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param  {Number}    delay          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}   [noTrailing]   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
 *                                    the internal counter is reset)
 * @param  {Function}  callback       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param  {Boolean}   [debounceMode] If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
 *                                    schedule `callback` to execute after `delay` ms.
 *
 * @return {Function}  A new, throttled, function.
 */
function throttle (delay, noTrailing, callback, debounceMode) {
  /*
   * After wrapper has stopped being called, this timeout ensures that
   * `callback` is executed at the proper times in `throttle` and `end`
   * debounce modes.
   */
  var timeoutID;
  var cancelled = false; // Keep track of the last time `callback` was executed.

  var lastExec = 0; // Function to clear existing timeout

  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  } // Function to cancel next exec


  function cancel() {
    clearExistingTimeout();
    cancelled = true;
  } // `noTrailing` defaults to falsy.


  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = undefined;
  }
  /*
   * The `wrapper` function encapsulates all of the throttling / debouncing
   * functionality and when executed will limit the rate at which `callback`
   * is executed.
   */


  function wrapper() {
    var self = this;
    var elapsed = Date.now() - lastExec;
    var args = arguments;

    if (cancelled) {
      return;
    } // Execute `callback` and update the `lastExec` timestamp.


    function exec() {
      lastExec = Date.now();
      callback.apply(self, args);
    }
    /*
     * If `debounceMode` is true (at begin) this is used to clear the flag
     * to allow future `callback` executions.
     */


    function clear() {
      timeoutID = undefined;
    }

    if (debounceMode && !timeoutID) {
      /*
       * Since `wrapper` is being called for the first time and
       * `debounceMode` is true (at begin), execute `callback`.
       */
      exec();
    }

    clearExistingTimeout();

    if (debounceMode === undefined && elapsed > delay) {
      /*
       * In throttle mode, if `delay` time has been exceeded, execute
       * `callback`.
       */
      exec();
    } else if (noTrailing !== true) {
      /*
       * In trailing throttle mode, since `delay` time has not been
       * exceeded, schedule `callback` to execute `delay` ms after most
       * recent execution.
       *
       * If `debounceMode` is true (at begin), schedule `clear` to execute
       * after `delay` ms.
       *
       * If `debounceMode` is false (at end), schedule `callback` to
       * execute after `delay` ms.
       */
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
    }
  }

  wrapper.cancel = cancel; // Return the wrapper function.

  return wrapper;
}

var ThresholdUnits = {
    Pixel: 'Pixel',
    Percent: 'Percent',
};
var defaultThreshold = {
    unit: ThresholdUnits.Percent,
    value: 0.8,
};
function parseThreshold(scrollThreshold) {
    if (typeof scrollThreshold === 'number') {
        return {
            unit: ThresholdUnits.Percent,
            value: scrollThreshold * 100,
        };
    }
    if (typeof scrollThreshold === 'string') {
        if (scrollThreshold.match(/^(\d*(\.\d+)?)px$/)) {
            return {
                unit: ThresholdUnits.Pixel,
                value: parseFloat(scrollThreshold),
            };
        }
        if (scrollThreshold.match(/^(\d*(\.\d+)?)%$/)) {
            return {
                unit: ThresholdUnits.Percent,
                value: parseFloat(scrollThreshold),
            };
        }
        console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...');
        return defaultThreshold;
    }
    console.warn('scrollThreshold should be string or number');
    return defaultThreshold;
}

var InfiniteScroll = /** @class */ (function (_super) {
    __extends(InfiniteScroll, _super);
    function InfiniteScroll(props) {
        var _this = _super.call(this, props) || this;
        _this.lastScrollTop = 0;
        _this.actionTriggered = false;
        // variables to keep track of pull down behaviour
        _this.startY = 0;
        _this.currentY = 0;
        _this.dragging = false;
        // will be populated in componentDidMount
        // based on the height of the pull down element
        _this.maxPullDownDistance = 0;
        _this.getScrollableTarget = function () {
            if (_this.props.scrollableTarget instanceof HTMLElement)
                return _this.props.scrollableTarget;
            if (typeof _this.props.scrollableTarget === 'string') {
                return document.getElementById(_this.props.scrollableTarget);
            }
            if (_this.props.scrollableTarget === null) {
                console.warn("You are trying to pass scrollableTarget but it is null. This might\n        happen because the element may not have been added to DOM yet.\n        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.\n      ");
            }
            return null;
        };
        _this.onStart = function (evt) {
            if (_this.lastScrollTop)
                return;
            _this.dragging = true;
            if (evt instanceof MouseEvent) {
                _this.startY = evt.pageY;
            }
            else if (evt instanceof TouchEvent) {
                _this.startY = evt.touches[0].pageY;
            }
            _this.currentY = _this.startY;
            if (_this._infScroll) {
                _this._infScroll.style.willChange = 'transform';
                _this._infScroll.style.transition = "transform 0.2s cubic-bezier(0,0,0.31,1)";
            }
        };
        _this.onMove = function (evt) {
            if (!_this.dragging)
                return;
            if (evt instanceof MouseEvent) {
                _this.currentY = evt.pageY;
            }
            else if (evt instanceof TouchEvent) {
                _this.currentY = evt.touches[0].pageY;
            }
            // user is scrolling down to up
            if (_this.currentY < _this.startY)
                return;
            if (_this.currentY - _this.startY >=
                Number(_this.props.pullDownToRefreshThreshold)) {
                _this.setState({
                    pullToRefreshThresholdBreached: true,
                });
            }
            // so you can drag upto 1.5 times of the maxPullDownDistance
            if (_this.currentY - _this.startY > _this.maxPullDownDistance * 1.5)
                return;
            if (_this._infScroll) {
                _this._infScroll.style.overflow = 'visible';
                _this._infScroll.style.transform = "translate3d(0px, " + (_this.currentY -
                    _this.startY) + "px, 0px)";
            }
        };
        _this.onEnd = function () {
            _this.startY = 0;
            _this.currentY = 0;
            _this.dragging = false;
            if (_this.state.pullToRefreshThresholdBreached) {
                _this.props.refreshFunction && _this.props.refreshFunction();
                _this.setState({
                    pullToRefreshThresholdBreached: false,
                });
            }
            requestAnimationFrame(function () {
                // this._infScroll
                if (_this._infScroll) {
                    _this._infScroll.style.overflow = 'auto';
                    _this._infScroll.style.transform = 'none';
                    _this._infScroll.style.willChange = 'none';
                }
            });
        };
        _this.onScrollListener = function (event) {
            if (typeof _this.props.onScroll === 'function') {
                // Execute this callback in next tick so that it does not affect the
                // functionality of the library.
                setTimeout(function () { return _this.props.onScroll && _this.props.onScroll(event); }, 0);
            }
            var target = _this.props.height || _this._scrollableNode
                ? event.target
                : document.documentElement.scrollTop
                    ? document.documentElement
                    : document.body;
            // return immediately if the action has already been triggered,
            // prevents multiple triggers.
            if (_this.actionTriggered)
                return;
            var atBottom = _this.props.inverse
                ? _this.isElementAtTop(target, _this.props.scrollThreshold)
                : _this.isElementAtBottom(target, _this.props.scrollThreshold);
            // call the `next` function in the props to trigger the next data fetch
            if (atBottom && _this.props.hasMore) {
                _this.actionTriggered = true;
                _this.setState({ showLoader: true });
                _this.props.next && _this.props.next();
            }
            _this.lastScrollTop = target.scrollTop;
        };
        _this.state = {
            showLoader: false,
            pullToRefreshThresholdBreached: false,
        };
        _this.throttledOnScrollListener = throttle(150, _this.onScrollListener).bind(_this);
        _this.onStart = _this.onStart.bind(_this);
        _this.onMove = _this.onMove.bind(_this);
        _this.onEnd = _this.onEnd.bind(_this);
        return _this;
    }
    InfiniteScroll.prototype.componentDidMount = function () {
        if (typeof this.props.dataLength === 'undefined') {
            throw new Error("mandatory prop \"dataLength\" is missing. The prop is needed" +
                " when loading more content. Check README.md for usage");
        }
        this._scrollableNode = this.getScrollableTarget();
        this.el = this.props.height
            ? this._infScroll
            : this._scrollableNode || window;
        if (this.el) {
            this.el.addEventListener('scroll', this
                .throttledOnScrollListener);
        }
        if (typeof this.props.initialScrollY === 'number' &&
            this.el &&
            this.el instanceof HTMLElement &&
            this.el.scrollHeight > this.props.initialScrollY) {
            this.el.scrollTo(0, this.props.initialScrollY);
        }
        if (this.props.pullDownToRefresh && this.el) {
            this.el.addEventListener('touchstart', this.onStart);
            this.el.addEventListener('touchmove', this.onMove);
            this.el.addEventListener('touchend', this.onEnd);
            this.el.addEventListener('mousedown', this.onStart);
            this.el.addEventListener('mousemove', this.onMove);
            this.el.addEventListener('mouseup', this.onEnd);
            // get BCR of pullDown element to position it above
            this.maxPullDownDistance =
                (this._pullDown &&
                    this._pullDown.firstChild &&
                    this._pullDown.firstChild.getBoundingClientRect()
                        .height) ||
                    0;
            this.forceUpdate();
            if (typeof this.props.refreshFunction !== 'function') {
                throw new Error("Mandatory prop \"refreshFunction\" missing.\n          Pull Down To Refresh functionality will not work\n          as expected. Check README.md for usage'");
            }
        }
    };
    InfiniteScroll.prototype.componentWillUnmount = function () {
        if (this.el) {
            this.el.removeEventListener('scroll', this
                .throttledOnScrollListener);
            if (this.props.pullDownToRefresh) {
                this.el.removeEventListener('touchstart', this.onStart);
                this.el.removeEventListener('touchmove', this.onMove);
                this.el.removeEventListener('touchend', this.onEnd);
                this.el.removeEventListener('mousedown', this.onStart);
                this.el.removeEventListener('mousemove', this.onMove);
                this.el.removeEventListener('mouseup', this.onEnd);
            }
        }
    };
    InfiniteScroll.prototype.UNSAFE_componentWillReceiveProps = function (props) {
        // do nothing when dataLength is unchanged
        if (this.props.dataLength === props.dataLength)
            return;
        this.actionTriggered = false;
        // update state when new data was sent in
        this.setState({
            showLoader: false,
        });
    };
    InfiniteScroll.prototype.isElementAtTop = function (target, scrollThreshold) {
        if (scrollThreshold === void 0) { scrollThreshold = 0.8; }
        var clientHeight = target === document.body || target === document.documentElement
            ? window.screen.availHeight
            : target.clientHeight;
        var threshold = parseThreshold(scrollThreshold);
        if (threshold.unit === ThresholdUnits.Pixel) {
            return (target.scrollTop <=
                threshold.value + clientHeight - target.scrollHeight + 1 ||
                target.scrollTop === 0);
        }
        return (target.scrollTop <=
            threshold.value / 100 + clientHeight - target.scrollHeight + 1 ||
            target.scrollTop === 0);
    };
    InfiniteScroll.prototype.isElementAtBottom = function (target, scrollThreshold) {
        if (scrollThreshold === void 0) { scrollThreshold = 0.8; }
        var clientHeight = target === document.body || target === document.documentElement
            ? window.screen.availHeight
            : target.clientHeight;
        var threshold = parseThreshold(scrollThreshold);
        if (threshold.unit === ThresholdUnits.Pixel) {
            return (target.scrollTop + clientHeight >= target.scrollHeight - threshold.value);
        }
        return (target.scrollTop + clientHeight >=
            (threshold.value / 100) * target.scrollHeight);
    };
    InfiniteScroll.prototype.render = function () {
        var _this = this;
        var style = __assign({ height: this.props.height || 'auto', overflow: 'auto', WebkitOverflowScrolling: 'touch' }, this.props.style);
        var hasChildren = this.props.hasChildren ||
            !!(this.props.children &&
                this.props.children instanceof Array &&
                this.props.children.length);
        // because heighted infiniteScroll visualy breaks
        // on drag down as overflow becomes visible
        var outerDivStyle = this.props.pullDownToRefresh && this.props.height
            ? { overflow: 'auto' }
            : {};
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { style: outerDivStyle, className: "infinite-scroll-component__outerdiv" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "infinite-scroll-component " + (this.props.className || ''), ref: function (infScroll) { return (_this._infScroll = infScroll); }, style: style },
                this.props.pullDownToRefresh && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { style: { position: 'relative' }, ref: function (pullDown) { return (_this._pullDown = pullDown); } },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { style: {
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: -1 * this.maxPullDownDistance,
                        } }, this.state.pullToRefreshThresholdBreached
                        ? this.props.releaseToRefreshContent
                        : this.props.pullDownToRefreshContent))),
                this.props.children,
                !this.state.showLoader &&
                    !hasChildren &&
                    this.props.hasMore &&
                    this.props.loader,
                this.state.showLoader && this.props.hasMore && this.props.loader,
                !this.props.hasMore && this.props.endMessage)));
    };
    return InfiniteScroll;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));

/* harmony default export */ __webpack_exports__["default"] = (InfiniteScroll);
//# sourceMappingURL=index.es.js.map


/***/ }),

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

/***/ }),

/***/ "./src/components/comment/comment-item.tsx":
/*!*************************************************!*\
  !*** ./src/components/comment/comment-item.tsx ***!
  \*************************************************/
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
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @services/index */ "./src/services/index.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components_comment_comment_form__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @components/comment/comment-form */ "./src/components/comment/comment-form.tsx");
/* harmony import */ var _components_comment_list_comments__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @components/comment/list-comments */ "./src/components/comment/list-comments.tsx");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _redux_comment_actions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @redux/comment/actions */ "./src/redux/comment/actions.ts");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! next/dynamic */ "./node_modules/next/dist/next-server/lib/dynamic.js");
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_17__);







var _jsxFileName = "C:\\Users\\roman\\Pictures\\Case\\row\\src\\components\\comment\\comment-item.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(typeof e + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _callSuper(t, o, e) { return o = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(o), Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
/* eslint-disable react/require-default-props */
/* eslint-disable no-prototype-builtins */











var VerifiedEmailForm = next_dynamic__WEBPACK_IMPORTED_MODULE_17___default()(_c = function _c() {
  return __webpack_require__.e(/*! import() */ 4).then(__webpack_require__.bind(null, /*! @components/performer/verified-email-form */ "./src/components/performer/verified-email-form.tsx"));
}, {
  ssr: false,
  loadableGenerated: {
    webpack: function webpack() {
      return [/*require.resolve*/(/*! @components/performer/verified-email-form */ "./src/components/performer/verified-email-form.tsx")];
    },
    modules: ['@components/performer/verified-email-form']
  }
});
_c2 = VerifiedEmailForm;
var CommentItem = /*#__PURE__*/function (_PureComponent) {
  function CommentItem() {
    var _this;
    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, CommentItem);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, CommentItem, [].concat(args));
    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(_this, "state", {
      isLiked: false,
      isOpenComment: false,
      isFirstLoadComment: true,
      openVerifiedEmailModal: false,
      itemPerPage: 12,
      commentPage: 0,
      isReply: false,
      totalReply: 0,
      totalLike: 0
    });
    return _this;
  }
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(CommentItem, _PureComponent);
  return Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(CommentItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var item = this.props.item;
      if (item) {
        this.setState({
          isLiked: !!item.isLiked,
          totalLike: item.totalLike || 0,
          totalReply: item.totalReply ? item.totalReply : 0
        });
      }
    }
  }, {
    key: "handleComment",
    value: function () {
      var _handleComment = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(values) {
        var _this$props, handleCreate, user, totalReply;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this$props = this.props, handleCreate = _this$props.createComment, user = _this$props.user;
              if (user.verifiedEmail) {
                _context.next = 3;
                break;
              }
              return _context.abrupt("return", this.setState({
                openVerifiedEmailModal: true
              }));
            case 3:
              totalReply = this.state.totalReply;
              handleCreate(values);
              _context.next = 7;
              return this.setState({
                totalReply: totalReply + 1
              });
            case 7:
              this.onOpenComment();
              return _context.abrupt("return", true);
            case 9:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function handleComment(_x) {
        return _handleComment.apply(this, arguments);
      }
      return handleComment;
    }()
  }, {
    key: "onOpenComment",
    value: function () {
      var _onOpenComment = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _this$props2, item, handleGetComment, _this$state, isOpenComment, isFirstLoadComment, itemPerPage, commentPage;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this$props2 = this.props, item = _this$props2.item, handleGetComment = _this$props2.getComments;
              _this$state = this.state, isOpenComment = _this$state.isOpenComment, isFirstLoadComment = _this$state.isFirstLoadComment, itemPerPage = _this$state.itemPerPage, commentPage = _this$state.commentPage;
              this.setState({
                isOpenComment: !isOpenComment
              });
              if (!isFirstLoadComment) {
                _context2.next = 7;
                break;
              }
              _context2.next = 6;
              return this.setState({
                isFirstLoadComment: false
              });
            case 6:
              handleGetComment({
                objectId: item._id,
                objectType: 'comment',
                limit: itemPerPage,
                offset: commentPage
              });
            case 7:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function onOpenComment() {
        return _onOpenComment.apply(this, arguments);
      }
      return onOpenComment;
    }()
  }, {
    key: "likeComment",
    value: function () {
      var _likeComment = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(comment) {
        var _this$state2, isLiked, totalLike, error;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _this$state2 = this.state, isLiked = _this$state2.isLiked, totalLike = _this$state2.totalLike;
              _context3.prev = 1;
              if (isLiked) {
                _context3.next = 6;
                break;
              }
              _context3.next = 5;
              return _services_index__WEBPACK_IMPORTED_MODULE_10__["reactionService"].create({
                objectId: comment._id,
                action: 'like',
                objectType: 'comment'
              });
            case 5:
              this.setState({
                isLiked: true,
                totalLike: totalLike + 1
              });
            case 6:
              _context3.next = 14;
              break;
            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](1);
              _context3.next = 12;
              return _context3.t0;
            case 12:
              error = _context3.sent;
              antd__WEBPACK_IMPORTED_MODULE_8__["message"].error(error.message || 'Error occured, please try again later');
            case 14:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[1, 8]]);
      }));
      function likeComment(_x2) {
        return _likeComment.apply(this, arguments);
      }
      return likeComment;
    }()
  }, {
    key: "unLikeComment",
    value: function () {
      var _unLikeComment = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(comment) {
        var _this$state3, isLiked, totalLike, error;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _this$state3 = this.state, isLiked = _this$state3.isLiked, totalLike = _this$state3.totalLike;
              _context4.prev = 1;
              if (!isLiked) {
                _context4.next = 6;
                break;
              }
              _context4.next = 5;
              return _services_index__WEBPACK_IMPORTED_MODULE_10__["reactionService"]["delete"]({
                objectId: comment._id,
                action: 'like',
                objectType: 'comment'
              });
            case 5:
              this.setState({
                isLiked: false,
                totalLike: totalLike - 1
              });
            case 6:
              _context4.next = 14;
              break;
            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](1);
              _context4.next = 12;
              return _context4.t0;
            case 12:
              error = _context4.sent;
              antd__WEBPACK_IMPORTED_MODULE_8__["message"].error(error.message || 'Error occured, please try again later');
            case 14:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[1, 8]]);
      }));
      function unLikeComment(_x3) {
        return _unLikeComment.apply(this, arguments);
      }
      return unLikeComment;
    }()
  }, {
    key: "moreComment",
    value: function () {
      var _moreComment = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var _this$props3, item, handleLoadMore, _this$state4, commentPage, itemPerPage;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _this$props3 = this.props, item = _this$props3.item, handleLoadMore = _this$props3.moreComment;
              _this$state4 = this.state, commentPage = _this$state4.commentPage, itemPerPage = _this$state4.itemPerPage;
              _context5.next = 4;
              return this.setState({
                commentPage: commentPage + 1
              });
            case 4:
              handleLoadMore({
                limit: itemPerPage,
                objectType: 'comment',
                offset: (commentPage + 1) * itemPerPage,
                objectId: item._id
              });
            case 5:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function moreComment() {
        return _moreComment.apply(this, arguments);
      }
      return moreComment;
    }()
  }, {
    key: "deleteComment",
    value: function () {
      var _deleteComment = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(item) {
        var handleDelete;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              handleDelete = this.props.deleteComment;
              if (window.confirm('Are you sure to remove this comment?')) {
                _context6.next = 3;
                break;
              }
              return _context6.abrupt("return");
            case 3:
              handleDelete(item._id);
            case 4:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function deleteComment(_x4) {
        return _deleteComment.apply(this, arguments);
      }
      return deleteComment;
    }()
  }, {
    key: "render",
    value: function render() {
      var _item$creator,
        _item$creator2,
        _item$creator3,
        _item$creator4,
        _item$creator5,
        _item$creator6,
        _this2 = this;
      var _this$props4 = this.props,
        item = _this$props4.item,
        user = _this$props4.user,
        canReply = _this$props4.canReply,
        onDelete = _this$props4.onDelete,
        commentMapping = _this$props4.commentMapping,
        siteName = _this$props4.siteName,
        feedOwnerId = _this$props4.feedOwnerId;
      var fetchingComment = commentMapping.hasOwnProperty(item._id) ? commentMapping[item._id].requesting : false;
      var comments = commentMapping.hasOwnProperty(item._id) ? commentMapping[item._id].items : [];
      var totalComments = commentMapping.hasOwnProperty(item._id) ? commentMapping[item._id].total : 0;
      var _this$state5 = this.state,
        isLiked = _this$state5.isLiked,
        isOpenComment = _this$state5.isOpenComment,
        isReply = _this$state5.isReply,
        totalReply = _this$state5.totalReply,
        totalLike = _this$state5.totalLike,
        openVerifiedEmailModal = _this$state5.openVerifiedEmailModal;
      return __jsx("div", {
        className: "pb-4",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 157,
          columnNumber: 7
        }
      }, __jsx("div", {
        className: "cmt-item",
        key: item._id,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 158,
          columnNumber: 9
        }
      }, __jsx("div", {
        className: "flex flex-col items-center justify-center gap-2",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 159,
          columnNumber: 11
        }
      }, __jsx("button", {
        onClick: this.likeComment.bind(this, item),
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 160,
          columnNumber: 13
        }
      }, __jsx("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "20",
        height: "20",
        viewBox: "0 0 20 20",
        fill: "none",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 161,
          columnNumber: 13
        }
      }, __jsx("mask", {
        id: "mask0_3047_82820",
        maskUnits: "userSpaceOnUse",
        x: "0",
        y: "0",
        width: "20",
        height: "20",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 162,
          columnNumber: 17
        }
      }, __jsx("rect", {
        width: "20",
        height: "20",
        fill: "#D9D9D9",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 163,
          columnNumber: 19
        }
      })), __jsx("g", {
        mask: "url(#mask0_3047_82820)",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 165,
          columnNumber: 17
        }
      }, __jsx("path", {
        d: "M7 17V11.2083H3L10 2L17 11.2083H13V17H7ZM8.5 15.5H11.5V9.70833H13.9375L10 4.4375L6.0625 9.70833H8.5V15.5Z",
        fill: "#121212",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 166,
          columnNumber: 19
        }
      })))), __jsx("span", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 170,
          columnNumber: 13
        }
      }, totalLike), __jsx("button", {
        onClick: this.unLikeComment.bind(this, item),
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 173,
          columnNumber: 13
        }
      }, __jsx("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "20",
        height: "20",
        viewBox: "0 0 20 20",
        fill: "none",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 174,
          columnNumber: 13
        }
      }, __jsx("g", {
        clipPath: "url(#clip0_3047_82822)",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 175,
          columnNumber: 15
        }
      }, __jsx("mask", {
        id: "mask0_3047_82822",
        maskUnits: "userSpaceOnUse",
        x: "0",
        y: "0",
        width: "20",
        height: "20",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 176,
          columnNumber: 17
        }
      }, __jsx("rect", {
        width: "20",
        height: "20",
        fill: "#D9D9D9",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 177,
          columnNumber: 19
        }
      })), __jsx("g", {
        mask: "url(#mask0_3047_82822)",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 179,
          columnNumber: 17
        }
      }, __jsx("path", {
        d: "M13 3.16211L13 8.95378L17 8.95378L10 18.1621L3 8.95377L7 8.95377L7 3.16211L13 3.16211ZM11.5 4.66211L8.5 4.66211L8.5 10.4538L6.0625 10.4538L10 15.7246L13.9375 10.4538L11.5 10.4538L11.5 4.66211Z",
        fill: "#121212",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 180,
          columnNumber: 19
        }
      }))), __jsx("defs", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 183,
          columnNumber: 15
        }
      }, __jsx("clipPath", {
        id: "clip0_3047_82822",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 184,
          columnNumber: 17
        }
      }, __jsx("rect", {
        width: "20",
        height: "20",
        fill: "white",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 185,
          columnNumber: 19
        }
      })))))), __jsx("img", {
        alt: "creator-avt",
        src: (item === null || item === void 0 ? void 0 : (_item$creator = item.creator) === null || _item$creator === void 0 ? void 0 : _item$creator.avatar) || '/static/no-avatar.png',
        className: "avatar",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 191,
          columnNumber: 11
        }
      }), __jsx("div", {
        className: "cmt-content",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 192,
          columnNumber: 11
        }
      }, __jsx("div", {
        className: "cmt-text",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 193,
          columnNumber: 13
        }
      }, item !== null && item !== void 0 && (_item$creator2 = item.creator) !== null && _item$creator2 !== void 0 && _item$creator2._id ? __jsx(next_link__WEBPACK_IMPORTED_MODULE_16___default.a, {
        href: {
          pathname: '/model/profile',
          query: {
            username: (item === null || item === void 0 ? void 0 : (_item$creator3 = item.creator) === null || _item$creator3 === void 0 ? void 0 : _item$creator3.username) || (item === null || item === void 0 ? void 0 : (_item$creator4 = item.creator) === null || _item$creator4 === void 0 ? void 0 : _item$creator4._id) || 'N/A'
          }
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 195,
          columnNumber: 17
        }
      }, __jsx("a", {
        "aria-hidden": true,
        href: "/model/profile",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 203,
          columnNumber: 19
        }
      }, (item === null || item === void 0 ? void 0 : (_item$creator5 = item.creator) === null || _item$creator5 === void 0 ? void 0 : _item$creator5.name) || (item === null || item === void 0 ? void 0 : (_item$creator6 = item.creator) === null || _item$creator6 === void 0 ? void 0 : _item$creator6.username) || 'N/A')) : __jsx("p", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 207,
          columnNumber: 19
        }
      }, "N/A"), __jsx("div", {
        className: "cmt-user",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 208,
          columnNumber: 15
        }
      }, __jsx("span", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 209,
          columnNumber: 17
        }
      }, __jsx("span", {
        className: "cmt-time",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 210,
          columnNumber: 19
        }
      }, moment__WEBPACK_IMPORTED_MODULE_14___default()(item.createdAt).fromNow())), (user._id === item.createdBy || user._id === feedOwnerId) && __jsx(antd__WEBPACK_IMPORTED_MODULE_8__["Dropdown"], {
        overlay: __jsx(antd__WEBPACK_IMPORTED_MODULE_8__["Menu"], {
          key: "menu_cmt_".concat(item._id),
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 215,
            columnNumber: 23
          }
        }, __jsx(antd__WEBPACK_IMPORTED_MODULE_8__["Menu"].Item, {
          key: "delete_cmt_".concat(item._id),
          onClick: function onClick() {
            return onDelete(item);
          },
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 216,
            columnNumber: 25
          }
        }, __jsx("a", {
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 217,
            columnNumber: 27
          }
        }, "Report")), __jsx(antd__WEBPACK_IMPORTED_MODULE_8__["Menu"].Item, {
          key: "delete_cmt_".concat(item._id),
          onClick: function onClick() {
            return onDelete(item);
          },
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 219,
            columnNumber: 25
          }
        }, __jsx("a", {
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 220,
            columnNumber: 27
          }
        }, "Delete"))),
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 213,
          columnNumber: 19
        }
      }, __jsx("a", {
        "aria-hidden": true,
        className: "ant-dropdown-link",
        onClick: function onClick(e) {
          return e.preventDefault();
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 225,
          columnNumber: 21
        }
      }, __jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_9__["MoreOutlined"], {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 226,
          columnNumber: 23
        }
      }))))), __jsx("div", {
        className: "cmt-text",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 232,
          columnNumber: 13
        }
      }, item.content), __jsx("div", {
        className: "cmt-action",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 235,
          columnNumber: 13
        }
      }, canReply && __jsx("a", {
        "aria-hidden": true,
        className: !isReply ? 'cmt-reply' : 'cmt-reply active',
        onClick: function onClick() {
          _this2.setState({
            isReply: !isReply
          }, function () {
            return _this2.onOpenComment();
          });
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 237,
          columnNumber: 17
        }
      }, "".concat(totalReply || '', " Reply"))))), isOpenComment && __jsx("div", {
        className: "reply-bl-list",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 249,
          columnNumber: 11
        }
      }, __jsx("div", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 250,
          columnNumber: 13
        }
      }, __jsx(_components_comment_list_comments__WEBPACK_IMPORTED_MODULE_13__["default"], {
        key: "list_comments_".concat(item._id, "_").concat(comments.length),
        requesting: fetchingComment,
        comments: comments,
        onDelete: this.deleteComment.bind(this),
        user: user,
        canReply: false,
        isReply: isReply,
        feedOwnerId: feedOwnerId,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 251,
          columnNumber: 15
        }
      }), comments.length < totalComments && __jsx("p", {
        className: "text-center",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 262,
          columnNumber: 17
        }
      }, __jsx("a", {
        "aria-hidden": true,
        onClick: this.moreComment.bind(this),
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 263,
          columnNumber: 19
        }
      }, "more...")))), isReply ? __jsx(_components_comment_comment_form__WEBPACK_IMPORTED_MODULE_12__["default"], {
        creator: user,
        onSubmit: this.handleComment.bind(this),
        objectId: item._id,
        objectType: "comment",
        isReply: true,
        siteName: siteName,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 272,
          columnNumber: 13
        }
      }) : null, __jsx(antd__WEBPACK_IMPORTED_MODULE_8__["Modal"], {
        key: "verified_email",
        className: "subscription-modal",
        title: "Please verify your email address",
        visible: openVerifiedEmailModal,
        footer: null,
        destroyOnClose: true,
        onCancel: function onCancel() {
          return _this2.setState({
            openVerifiedEmailModal: false
          });
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 281,
          columnNumber: 9
        }
      }, __jsx(VerifiedEmailForm, {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 290,
          columnNumber: 11
        }
      })));
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_7__["PureComponent"]);
var mapStates = function mapStates(state) {
  var _state$comment = state.comment,
    commentMapping = _state$comment.commentMapping,
    comment = _state$comment.comment;
  return {
    commentMapping: commentMapping,
    comment: comment,
    siteName: state.ui.siteName
  };
};
var mapDispatch = {
  getComments: _redux_comment_actions__WEBPACK_IMPORTED_MODULE_15__["getComments"],
  moreComment: _redux_comment_actions__WEBPACK_IMPORTED_MODULE_15__["moreComment"],
  createComment: _redux_comment_actions__WEBPACK_IMPORTED_MODULE_15__["createComment"],
  deleteComment: _redux_comment_actions__WEBPACK_IMPORTED_MODULE_15__["deleteComment"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_11__["connect"])(mapStates, mapDispatch)(CommentItem));
var _c, _c2;
$RefreshReg$(_c, "VerifiedEmailForm$dynamic");
$RefreshReg$(_c2, "VerifiedEmailForm");

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

/***/ "./src/components/comment/list-comments.tsx":
/*!**************************************************!*\
  !*** ./src/components/comment/list-comments.tsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ListComments; });
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var _components_comment_comment_item__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @components/comment/comment-item */ "./src/components/comment/comment-item.tsx");
/* harmony import */ var react_infinite_scroll_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-infinite-scroll-component */ "./node_modules/react-infinite-scroll-component/dist/index.es.js");





var _jsxFileName = "C:\\Users\\roman\\Pictures\\Case\\row\\src\\components\\comment\\list-comments.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement;
function _callSuper(t, o, e) { return o = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(o), Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
/* eslint-disable react/require-default-props */




var ListComments = /*#__PURE__*/function (_PureComponent) {
  function ListComments() {
    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ListComments);
    return _callSuper(this, ListComments, arguments);
  }
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(ListComments, _PureComponent);
  return Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ListComments, [{
    key: "render",
    value: function render() {
      var _this = this;
      var _this$props = this.props,
        comments = _this$props.comments,
        requesting = _this$props.requesting,
        user = _this$props.user,
        onDelete = _this$props.onDelete,
        canReply = _this$props.canReply,
        canLoadmore = _this$props.canLoadmore,
        loadMore = _this$props.loadMore,
        isReply = _this$props.isReply,
        feedOwnerId = _this$props.feedOwnerId;
      return __jsx(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment, null, !requesting && !comments.length ? __jsx("div", {
        className: "text-center",
        style: {
          padding: '5px'
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28,
          columnNumber: 46
        }
      }) : __jsx("div", {
        id: "scrollableModal",
        className: isReply ? 'cmt-list' : 'cmt-list reply',
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30,
          columnNumber: 13
        }
      }, __jsx(react_infinite_scroll_component__WEBPACK_IMPORTED_MODULE_8__["default"], {
        dataLength: comments.length,
        hasMore: canLoadmore,
        loader: null,
        next: loadMore,
        endMessage: null,
        scrollThreshold: 0.7,
        scrollableTarget: "scrollableModal",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31,
          columnNumber: 15
        }
      }, comments.map(function (comment) {
        return __jsx(_components_comment_comment_item__WEBPACK_IMPORTED_MODULE_7__["default"], {
          feedOwnerId: feedOwnerId,
          canReply: canReply,
          key: comment._id,
          item: comment,
          user: user,
          onDelete: onDelete,
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 40,
            columnNumber: 54
          }
        });
      }), requesting && __jsx("div", {
        className: "text-center",
        style: {
          margin: 20
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41,
          columnNumber: 32
        }
      }, __jsx(antd__WEBPACK_IMPORTED_MODULE_6__["Spin"], {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41,
          columnNumber: 84
        }
      })))));
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_5__["PureComponent"]);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWluZmluaXRlLXNjcm9sbC1jb21wb25lbnQvZGlzdC9pbmRleC5lcy5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvY29tbWVudC9jb21tZW50LWZvcm0udHN4Iiwid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9jb21tZW50L2NvbW1lbnQtaXRlbS50c3giLCJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQvbGlzdC1jb21tZW50cy50c3giXSwibmFtZXMiOlsiX3JlZ2VuZXJhdG9yUnVudGltZSIsImUiLCJ0IiwiciIsIk9iamVjdCIsInByb3RvdHlwZSIsIm4iLCJoYXNPd25Qcm9wZXJ0eSIsIm8iLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwiaSIsIlN5bWJvbCIsImEiLCJpdGVyYXRvciIsImMiLCJhc3luY0l0ZXJhdG9yIiwidSIsInRvU3RyaW5nVGFnIiwiZGVmaW5lIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwid3JhcCIsIkdlbmVyYXRvciIsImNyZWF0ZSIsIkNvbnRleHQiLCJtYWtlSW52b2tlTWV0aG9kIiwidHJ5Q2F0Y2giLCJ0eXBlIiwiYXJnIiwiY2FsbCIsImgiLCJsIiwiZiIsInMiLCJ5IiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsInAiLCJkIiwiZ2V0UHJvdG90eXBlT2YiLCJ2IiwidmFsdWVzIiwiZyIsImRlZmluZUl0ZXJhdG9yTWV0aG9kcyIsImZvckVhY2giLCJfaW52b2tlIiwiQXN5bmNJdGVyYXRvciIsImludm9rZSIsInJlc29sdmUiLCJfX2F3YWl0IiwidGhlbiIsImNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnIiwiRXJyb3IiLCJkb25lIiwibWV0aG9kIiwiZGVsZWdhdGUiLCJtYXliZUludm9rZURlbGVnYXRlIiwic2VudCIsIl9zZW50IiwiZGlzcGF0Y2hFeGNlcHRpb24iLCJhYnJ1cHQiLCJUeXBlRXJyb3IiLCJyZXN1bHROYW1lIiwibmV4dCIsIm5leHRMb2MiLCJwdXNoVHJ5RW50cnkiLCJ0cnlMb2MiLCJjYXRjaExvYyIsImZpbmFsbHlMb2MiLCJhZnRlckxvYyIsInRyeUVudHJpZXMiLCJwdXNoIiwicmVzZXRUcnlFbnRyeSIsImNvbXBsZXRpb24iLCJyZXNldCIsImlzTmFOIiwibGVuZ3RoIiwiZGlzcGxheU5hbWUiLCJpc0dlbmVyYXRvckZ1bmN0aW9uIiwiY29uc3RydWN0b3IiLCJuYW1lIiwibWFyayIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiYXdyYXAiLCJhc3luYyIsIlByb21pc2UiLCJrZXlzIiwicmV2ZXJzZSIsInBvcCIsInByZXYiLCJjaGFyQXQiLCJzbGljZSIsInN0b3AiLCJydmFsIiwiaGFuZGxlIiwiY29tcGxldGUiLCJmaW5pc2giLCJfY2F0Y2giLCJkZWxlZ2F0ZVlpZWxkIiwiX2NhbGxTdXBlciIsIl9nZXRQcm90b3R5cGVPZiIsIl9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuIiwiX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCIsIlJlZmxlY3QiLCJjb25zdHJ1Y3QiLCJhcHBseSIsIkJvb2xlYW4iLCJ2YWx1ZU9mIiwiQ29tbWVudEZvcm0iLCJfUHVyZUNvbXBvbmVudCIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2xlbiIsImFyZ3VtZW50cyIsImFyZ3MiLCJBcnJheSIsIl9rZXkiLCJjb25jYXQiLCJfZGVmaW5lUHJvcGVydHkiLCJ0ZXh0IiwiX2luaGVyaXRzIiwiX2NyZWF0ZUNsYXNzIiwia2V5Iiwib25GaW5pc2giLCJfdGhpcyRwcm9wcyIsInByb3BzIiwiaGFuZGxlQ29tbWVudCIsIm9uU3VibWl0Iiwib2JqZWN0SWQiLCJvYmplY3RUeXBlIiwiY3JlYXRvciIsImRhdGEiLCJfaWQiLCJtZXNzYWdlIiwiZXJyb3IiLCJSb3V0ZXIiLCJjb250ZW50IiwiZm9ybVJlZiIsInJlc2V0RmllbGRzIiwiX29uRW1vamlDbGljayIsIl9hc3luY1RvR2VuZXJhdG9yIiwiX2NhbGxlZSIsImVtb2ppIiwiaW5zdGFuY2UiLCJfY2FsbGVlJCIsIl9jb250ZXh0Iiwic3RhdGUiLCJzZXRGaWVsZHNWYWx1ZSIsImdldEZpZWxkVmFsdWUiLCJzZXRTdGF0ZSIsIm9uRW1vamlDbGljayIsIl94IiwicmVuZGVyIiwiX3RoaXMyIiwiX3RoaXMkcHJvcHMyIiwiaXNSZXBseSIsInNpdGVOYW1lIiwiX19qc3giLCJGb3JtIiwicmVmIiwiYmluZCIsImluaXRpYWxWYWx1ZXMiLCJzdHlsZSIsIndpZHRoIiwibWFyZ2luIiwiX19zZWxmIiwiX19zb3VyY2UiLCJmaWxlTmFtZSIsIl9qc3hGaWxlTmFtZSIsImxpbmVOdW1iZXIiLCJjb2x1bW5OdW1iZXIiLCJjbGFzc05hbWUiLCJJdGVtIiwiSW5wdXQiLCJvblByZXNzRW50ZXIiLCJ0YXJnZXQiLCJzdWJtaXQiLCJkaXNhYmxlZCIsIm1heExlbmd0aCIsIm1pbkxlbmd0aCIsInBsYWNlaG9sZGVyIiwiQXBwQnV0dG9uIiwiZm9udFNpemUiLCJQdXJlQ29tcG9uZW50IiwiVmVyaWZpZWRFbWFpbEZvcm0iLCJkeW5hbWljIiwiX2MiLCJzc3IiLCJsb2FkYWJsZUdlbmVyYXRlZCIsIndlYnBhY2siLCJyZXF1aXJlIiwibW9kdWxlcyIsIl9jMiIsIkNvbW1lbnRJdGVtIiwiaXNMaWtlZCIsImlzT3BlbkNvbW1lbnQiLCJpc0ZpcnN0TG9hZENvbW1lbnQiLCJvcGVuVmVyaWZpZWRFbWFpbE1vZGFsIiwiaXRlbVBlclBhZ2UiLCJjb21tZW50UGFnZSIsInRvdGFsUmVwbHkiLCJ0b3RhbExpa2UiLCJjb21wb25lbnREaWRNb3VudCIsIml0ZW0iLCJfaGFuZGxlQ29tbWVudCIsImhhbmRsZUNyZWF0ZSIsInVzZXIiLCJjcmVhdGVDb21tZW50IiwidmVyaWZpZWRFbWFpbCIsIm9uT3BlbkNvbW1lbnQiLCJfb25PcGVuQ29tbWVudCIsIl9jYWxsZWUyIiwiaGFuZGxlR2V0Q29tbWVudCIsIl90aGlzJHN0YXRlIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiZ2V0Q29tbWVudHMiLCJsaW1pdCIsIm9mZnNldCIsIl9saWtlQ29tbWVudCIsIl9jYWxsZWUzIiwiY29tbWVudCIsIl90aGlzJHN0YXRlMiIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsInJlYWN0aW9uU2VydmljZSIsImFjdGlvbiIsInQwIiwibGlrZUNvbW1lbnQiLCJfeDIiLCJfdW5MaWtlQ29tbWVudCIsIl9jYWxsZWU0IiwiX3RoaXMkc3RhdGUzIiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwidW5MaWtlQ29tbWVudCIsIl94MyIsIl9tb3JlQ29tbWVudCIsIl9jYWxsZWU1IiwiX3RoaXMkcHJvcHMzIiwiaGFuZGxlTG9hZE1vcmUiLCJfdGhpcyRzdGF0ZTQiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJtb3JlQ29tbWVudCIsIl9kZWxldGVDb21tZW50IiwiX2NhbGxlZTYiLCJoYW5kbGVEZWxldGUiLCJfY2FsbGVlNiQiLCJfY29udGV4dDYiLCJkZWxldGVDb21tZW50Iiwid2luZG93IiwiY29uZmlybSIsIl94NCIsIl9pdGVtJGNyZWF0b3IiLCJfaXRlbSRjcmVhdG9yMiIsIl9pdGVtJGNyZWF0b3IzIiwiX2l0ZW0kY3JlYXRvcjQiLCJfaXRlbSRjcmVhdG9yNSIsIl9pdGVtJGNyZWF0b3I2IiwiX3RoaXMkcHJvcHM0IiwiY2FuUmVwbHkiLCJvbkRlbGV0ZSIsImNvbW1lbnRNYXBwaW5nIiwiZmVlZE93bmVySWQiLCJmZXRjaGluZ0NvbW1lbnQiLCJyZXF1ZXN0aW5nIiwiY29tbWVudHMiLCJpdGVtcyIsInRvdGFsQ29tbWVudHMiLCJ0b3RhbCIsIl90aGlzJHN0YXRlNSIsIm9uQ2xpY2siLCJ4bWxucyIsImhlaWdodCIsInZpZXdCb3giLCJmaWxsIiwiaWQiLCJtYXNrVW5pdHMiLCJ4IiwibWFzayIsImNsaXBQYXRoIiwiYWx0Iiwic3JjIiwiYXZhdGFyIiwiTGluayIsImhyZWYiLCJwYXRobmFtZSIsInF1ZXJ5IiwidXNlcm5hbWUiLCJtb21lbnQiLCJjcmVhdGVkQXQiLCJmcm9tTm93IiwiY3JlYXRlZEJ5IiwiRHJvcGRvd24iLCJvdmVybGF5IiwiTWVudSIsInByZXZlbnREZWZhdWx0IiwiTW9yZU91dGxpbmVkIiwiTGlzdENvbW1lbnRzIiwiTW9kYWwiLCJ0aXRsZSIsInZpc2libGUiLCJmb290ZXIiLCJkZXN0cm95T25DbG9zZSIsIm9uQ2FuY2VsIiwibWFwU3RhdGVzIiwiX3N0YXRlJGNvbW1lbnQiLCJ1aSIsIm1hcERpc3BhdGNoIiwiY29ubmVjdCIsIiRSZWZyZXNoUmVnJCIsImNhbkxvYWRtb3JlIiwibG9hZE1vcmUiLCJSZWFjdCIsIkZyYWdtZW50IiwicGFkZGluZyIsIkluZmluaXRlU2Nyb2xsIiwiZGF0YUxlbmd0aCIsImhhc01vcmUiLCJsb2FkZXIiLCJlbmRNZXNzYWdlIiwic2Nyb2xsVGhyZXNob2xkIiwic2Nyb2xsYWJsZVRhcmdldCIsIm1hcCIsIlNwaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBeUM7O0FBRXpDO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qix1REFBdUQ7QUFDaEY7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxnREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0EsWUFBWSxTQUFTO0FBQ3JCO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQSxZQUFZLFNBQVM7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qjs7QUFFeEIsbUJBQW1COztBQUVuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCQUEwQjs7QUFFMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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STtRQUNyQkMsZ0JBQWdCLEVBQUMsaUJBQWlCO1FBQUE5SixNQUFBO1FBQUFDLFFBQUE7VUFBQUMsUUFBQSxFQUFBQyxZQUFBO1VBQUFDLFVBQUE7VUFBQUMsWUFBQTtRQUFBO01BQUEsR0FFakNpRyxRQUFRLENBQUN5RCxHQUFHLENBQUMsVUFBQ3ZHLE9BQWlCO1FBQUEsT0FBS2hFLEtBQUEsQ0FBQ29DLHdFQUFXO1VBQUN1RSxXQUFXLEVBQUVBLFdBQVk7VUFBQ0gsUUFBUSxFQUFFQSxRQUFTO1VBQUMzSSxHQUFHLEVBQUVtRyxPQUFPLENBQUN6RixHQUFJO1VBQUN1RSxJQUFJLEVBQUVrQixPQUFRO1VBQUNmLElBQUksRUFBRUEsSUFBSztVQUFDd0QsUUFBUSxFQUFFQSxRQUFTO1VBQUFqRyxNQUFBLEVBQUF2RCxLQUFBO1VBQUF3RCxRQUFBO1lBQUFDLFFBQUEsRUFBQUMsWUFBQTtZQUFBQyxVQUFBO1lBQUFDLFlBQUE7VUFBQTtRQUFBLENBQUUsQ0FBQztNQUFBLEVBQUMsRUFDbktnRyxVQUFVLElBQUk3RyxLQUFBO1FBQUtjLFNBQVMsRUFBQyxhQUFhO1FBQUNULEtBQUssRUFBRTtVQUFFRSxNQUFNLEVBQUU7UUFBRyxDQUFFO1FBQUFDLE1BQUE7UUFBQUMsUUFBQTtVQUFBQyxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUE7TUFBQSxHQUFDYixLQUFBLENBQUN3Syx5Q0FBSTtRQUFBaEssTUFBQTtRQUFBQyxRQUFBO1VBQUFDLFFBQUEsRUFBQUMsWUFBQTtVQUFBQyxVQUFBO1VBQUFDLFlBQUE7UUFBQTtNQUFBLENBQUUsQ0FBTSxDQUNsRSxDQUNiLENBRVQsQ0FBQztJQUdQO0VBQUM7QUFBQSxFQTVCdUNhLG1EQUFhO0FBQXRCIiwiZmlsZSI6InN0YXRpYy9jaHVua3MvNi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5cbi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn07XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmaW5lZCxuby1wYXJhbS1yZWFzc2lnbixuby1zaGFkb3cgKi9cblxuLyoqXG4gKiBUaHJvdHRsZSBleGVjdXRpb24gb2YgYSBmdW5jdGlvbi4gRXNwZWNpYWxseSB1c2VmdWwgZm9yIHJhdGUgbGltaXRpbmdcbiAqIGV4ZWN1dGlvbiBvZiBoYW5kbGVycyBvbiBldmVudHMgbGlrZSByZXNpemUgYW5kIHNjcm9sbC5cbiAqXG4gKiBAcGFyYW0gIHtOdW1iZXJ9ICAgIGRlbGF5ICAgICAgICAgIEEgemVyby1vci1ncmVhdGVyIGRlbGF5IGluIG1pbGxpc2Vjb25kcy4gRm9yIGV2ZW50IGNhbGxiYWNrcywgdmFsdWVzIGFyb3VuZCAxMDAgb3IgMjUwIChvciBldmVuIGhpZ2hlcikgYXJlIG1vc3QgdXNlZnVsLlxuICogQHBhcmFtICB7Qm9vbGVhbn0gICBbbm9UcmFpbGluZ10gICBPcHRpb25hbCwgZGVmYXVsdHMgdG8gZmFsc2UuIElmIG5vVHJhaWxpbmcgaXMgdHJ1ZSwgY2FsbGJhY2sgd2lsbCBvbmx5IGV4ZWN1dGUgZXZlcnkgYGRlbGF5YCBtaWxsaXNlY29uZHMgd2hpbGUgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm90dGxlZC1mdW5jdGlvbiBpcyBiZWluZyBjYWxsZWQuIElmIG5vVHJhaWxpbmcgaXMgZmFsc2Ugb3IgdW5zcGVjaWZpZWQsIGNhbGxiYWNrIHdpbGwgYmUgZXhlY3V0ZWQgb25lIGZpbmFsIHRpbWVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIgdGhlIGxhc3QgdGhyb3R0bGVkLWZ1bmN0aW9uIGNhbGwuIChBZnRlciB0aGUgdGhyb3R0bGVkLWZ1bmN0aW9uIGhhcyBub3QgYmVlbiBjYWxsZWQgZm9yIGBkZWxheWAgbWlsbGlzZWNvbmRzLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgaW50ZXJuYWwgY291bnRlciBpcyByZXNldClcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSAgY2FsbGJhY2sgICAgICAgQSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBhZnRlciBkZWxheSBtaWxsaXNlY29uZHMuIFRoZSBgdGhpc2AgY29udGV4dCBhbmQgYWxsIGFyZ3VtZW50cyBhcmUgcGFzc2VkIHRocm91Z2gsIGFzLWlzLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byBgY2FsbGJhY2tgIHdoZW4gdGhlIHRocm90dGxlZC1mdW5jdGlvbiBpcyBleGVjdXRlZC5cbiAqIEBwYXJhbSAge0Jvb2xlYW59ICAgW2RlYm91bmNlTW9kZV0gSWYgYGRlYm91bmNlTW9kZWAgaXMgdHJ1ZSAoYXQgYmVnaW4pLCBzY2hlZHVsZSBgY2xlYXJgIHRvIGV4ZWN1dGUgYWZ0ZXIgYGRlbGF5YCBtcy4gSWYgYGRlYm91bmNlTW9kZWAgaXMgZmFsc2UgKGF0IGVuZCksXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlIGBjYWxsYmFja2AgdG8gZXhlY3V0ZSBhZnRlciBgZGVsYXlgIG1zLlxuICpcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSAgQSBuZXcsIHRocm90dGxlZCwgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHRocm90dGxlIChkZWxheSwgbm9UcmFpbGluZywgY2FsbGJhY2ssIGRlYm91bmNlTW9kZSkge1xuICAvKlxuICAgKiBBZnRlciB3cmFwcGVyIGhhcyBzdG9wcGVkIGJlaW5nIGNhbGxlZCwgdGhpcyB0aW1lb3V0IGVuc3VyZXMgdGhhdFxuICAgKiBgY2FsbGJhY2tgIGlzIGV4ZWN1dGVkIGF0IHRoZSBwcm9wZXIgdGltZXMgaW4gYHRocm90dGxlYCBhbmQgYGVuZGBcbiAgICogZGVib3VuY2UgbW9kZXMuXG4gICAqL1xuICB2YXIgdGltZW91dElEO1xuICB2YXIgY2FuY2VsbGVkID0gZmFsc2U7IC8vIEtlZXAgdHJhY2sgb2YgdGhlIGxhc3QgdGltZSBgY2FsbGJhY2tgIHdhcyBleGVjdXRlZC5cblxuICB2YXIgbGFzdEV4ZWMgPSAwOyAvLyBGdW5jdGlvbiB0byBjbGVhciBleGlzdGluZyB0aW1lb3V0XG5cbiAgZnVuY3Rpb24gY2xlYXJFeGlzdGluZ1RpbWVvdXQoKSB7XG4gICAgaWYgKHRpbWVvdXRJRCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJRCk7XG4gICAgfVxuICB9IC8vIEZ1bmN0aW9uIHRvIGNhbmNlbCBuZXh0IGV4ZWNcblxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBjbGVhckV4aXN0aW5nVGltZW91dCgpO1xuICAgIGNhbmNlbGxlZCA9IHRydWU7XG4gIH0gLy8gYG5vVHJhaWxpbmdgIGRlZmF1bHRzIHRvIGZhbHN5LlxuXG5cbiAgaWYgKHR5cGVvZiBub1RyYWlsaW5nICE9PSAnYm9vbGVhbicpIHtcbiAgICBkZWJvdW5jZU1vZGUgPSBjYWxsYmFjaztcbiAgICBjYWxsYmFjayA9IG5vVHJhaWxpbmc7XG4gICAgbm9UcmFpbGluZyA9IHVuZGVmaW5lZDtcbiAgfVxuICAvKlxuICAgKiBUaGUgYHdyYXBwZXJgIGZ1bmN0aW9uIGVuY2Fwc3VsYXRlcyBhbGwgb2YgdGhlIHRocm90dGxpbmcgLyBkZWJvdW5jaW5nXG4gICAqIGZ1bmN0aW9uYWxpdHkgYW5kIHdoZW4gZXhlY3V0ZWQgd2lsbCBsaW1pdCB0aGUgcmF0ZSBhdCB3aGljaCBgY2FsbGJhY2tgXG4gICAqIGlzIGV4ZWN1dGVkLlxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIHdyYXBwZXIoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBlbGFwc2VkID0gRGF0ZS5ub3coKSAtIGxhc3RFeGVjO1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgaWYgKGNhbmNlbGxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gRXhlY3V0ZSBgY2FsbGJhY2tgIGFuZCB1cGRhdGUgdGhlIGBsYXN0RXhlY2AgdGltZXN0YW1wLlxuXG5cbiAgICBmdW5jdGlvbiBleGVjKCkge1xuICAgICAgbGFzdEV4ZWMgPSBEYXRlLm5vdygpO1xuICAgICAgY2FsbGJhY2suYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgfVxuICAgIC8qXG4gICAgICogSWYgYGRlYm91bmNlTW9kZWAgaXMgdHJ1ZSAoYXQgYmVnaW4pIHRoaXMgaXMgdXNlZCB0byBjbGVhciB0aGUgZmxhZ1xuICAgICAqIHRvIGFsbG93IGZ1dHVyZSBgY2FsbGJhY2tgIGV4ZWN1dGlvbnMuXG4gICAgICovXG5cblxuICAgIGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgdGltZW91dElEID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmIChkZWJvdW5jZU1vZGUgJiYgIXRpbWVvdXRJRCkge1xuICAgICAgLypcbiAgICAgICAqIFNpbmNlIGB3cmFwcGVyYCBpcyBiZWluZyBjYWxsZWQgZm9yIHRoZSBmaXJzdCB0aW1lIGFuZFxuICAgICAgICogYGRlYm91bmNlTW9kZWAgaXMgdHJ1ZSAoYXQgYmVnaW4pLCBleGVjdXRlIGBjYWxsYmFja2AuXG4gICAgICAgKi9cbiAgICAgIGV4ZWMoKTtcbiAgICB9XG5cbiAgICBjbGVhckV4aXN0aW5nVGltZW91dCgpO1xuXG4gICAgaWYgKGRlYm91bmNlTW9kZSA9PT0gdW5kZWZpbmVkICYmIGVsYXBzZWQgPiBkZWxheSkge1xuICAgICAgLypcbiAgICAgICAqIEluIHRocm90dGxlIG1vZGUsIGlmIGBkZWxheWAgdGltZSBoYXMgYmVlbiBleGNlZWRlZCwgZXhlY3V0ZVxuICAgICAgICogYGNhbGxiYWNrYC5cbiAgICAgICAqL1xuICAgICAgZXhlYygpO1xuICAgIH0gZWxzZSBpZiAobm9UcmFpbGluZyAhPT0gdHJ1ZSkge1xuICAgICAgLypcbiAgICAgICAqIEluIHRyYWlsaW5nIHRocm90dGxlIG1vZGUsIHNpbmNlIGBkZWxheWAgdGltZSBoYXMgbm90IGJlZW5cbiAgICAgICAqIGV4Y2VlZGVkLCBzY2hlZHVsZSBgY2FsbGJhY2tgIHRvIGV4ZWN1dGUgYGRlbGF5YCBtcyBhZnRlciBtb3N0XG4gICAgICAgKiByZWNlbnQgZXhlY3V0aW9uLlxuICAgICAgICpcbiAgICAgICAqIElmIGBkZWJvdW5jZU1vZGVgIGlzIHRydWUgKGF0IGJlZ2luKSwgc2NoZWR1bGUgYGNsZWFyYCB0byBleGVjdXRlXG4gICAgICAgKiBhZnRlciBgZGVsYXlgIG1zLlxuICAgICAgICpcbiAgICAgICAqIElmIGBkZWJvdW5jZU1vZGVgIGlzIGZhbHNlIChhdCBlbmQpLCBzY2hlZHVsZSBgY2FsbGJhY2tgIHRvXG4gICAgICAgKiBleGVjdXRlIGFmdGVyIGBkZWxheWAgbXMuXG4gICAgICAgKi9cbiAgICAgIHRpbWVvdXRJRCA9IHNldFRpbWVvdXQoZGVib3VuY2VNb2RlID8gY2xlYXIgOiBleGVjLCBkZWJvdW5jZU1vZGUgPT09IHVuZGVmaW5lZCA/IGRlbGF5IC0gZWxhcHNlZCA6IGRlbGF5KTtcbiAgICB9XG4gIH1cblxuICB3cmFwcGVyLmNhbmNlbCA9IGNhbmNlbDsgLy8gUmV0dXJuIHRoZSB3cmFwcGVyIGZ1bmN0aW9uLlxuXG4gIHJldHVybiB3cmFwcGVyO1xufVxuXG52YXIgVGhyZXNob2xkVW5pdHMgPSB7XHJcbiAgICBQaXhlbDogJ1BpeGVsJyxcclxuICAgIFBlcmNlbnQ6ICdQZXJjZW50JyxcclxufTtcclxudmFyIGRlZmF1bHRUaHJlc2hvbGQgPSB7XHJcbiAgICB1bml0OiBUaHJlc2hvbGRVbml0cy5QZXJjZW50LFxyXG4gICAgdmFsdWU6IDAuOCxcclxufTtcclxuZnVuY3Rpb24gcGFyc2VUaHJlc2hvbGQoc2Nyb2xsVGhyZXNob2xkKSB7XHJcbiAgICBpZiAodHlwZW9mIHNjcm9sbFRocmVzaG9sZCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB1bml0OiBUaHJlc2hvbGRVbml0cy5QZXJjZW50LFxyXG4gICAgICAgICAgICB2YWx1ZTogc2Nyb2xsVGhyZXNob2xkICogMTAwLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHNjcm9sbFRocmVzaG9sZCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBpZiAoc2Nyb2xsVGhyZXNob2xkLm1hdGNoKC9eKFxcZCooXFwuXFxkKyk/KXB4JC8pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB1bml0OiBUaHJlc2hvbGRVbml0cy5QaXhlbCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBwYXJzZUZsb2F0KHNjcm9sbFRocmVzaG9sZCksXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzY3JvbGxUaHJlc2hvbGQubWF0Y2goL14oXFxkKihcXC5cXGQrKT8pJSQvKSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdW5pdDogVGhyZXNob2xkVW5pdHMuUGVyY2VudCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBwYXJzZUZsb2F0KHNjcm9sbFRocmVzaG9sZCksXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUud2Fybignc2Nyb2xsVGhyZXNob2xkIGZvcm1hdCBpcyBpbnZhbGlkLiBWYWxpZCBmb3JtYXRzOiBcIjEyMHB4XCIsIFwiNTAlXCIuLi4nKTtcclxuICAgICAgICByZXR1cm4gZGVmYXVsdFRocmVzaG9sZDtcclxuICAgIH1cclxuICAgIGNvbnNvbGUud2Fybignc2Nyb2xsVGhyZXNob2xkIHNob3VsZCBiZSBzdHJpbmcgb3IgbnVtYmVyJyk7XHJcbiAgICByZXR1cm4gZGVmYXVsdFRocmVzaG9sZDtcclxufVxuXG52YXIgSW5maW5pdGVTY3JvbGwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoSW5maW5pdGVTY3JvbGwsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBJbmZpbml0ZVNjcm9sbChwcm9wcykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHByb3BzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmxhc3RTY3JvbGxUb3AgPSAwO1xyXG4gICAgICAgIF90aGlzLmFjdGlvblRyaWdnZXJlZCA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHZhcmlhYmxlcyB0byBrZWVwIHRyYWNrIG9mIHB1bGwgZG93biBiZWhhdmlvdXJcclxuICAgICAgICBfdGhpcy5zdGFydFkgPSAwO1xyXG4gICAgICAgIF90aGlzLmN1cnJlbnRZID0gMDtcclxuICAgICAgICBfdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHdpbGwgYmUgcG9wdWxhdGVkIGluIGNvbXBvbmVudERpZE1vdW50XHJcbiAgICAgICAgLy8gYmFzZWQgb24gdGhlIGhlaWdodCBvZiB0aGUgcHVsbCBkb3duIGVsZW1lbnRcclxuICAgICAgICBfdGhpcy5tYXhQdWxsRG93bkRpc3RhbmNlID0gMDtcclxuICAgICAgICBfdGhpcy5nZXRTY3JvbGxhYmxlVGFyZ2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMucHJvcHMuc2Nyb2xsYWJsZVRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnByb3BzLnNjcm9sbGFibGVUYXJnZXQ7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgX3RoaXMucHJvcHMuc2Nyb2xsYWJsZVRhcmdldCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChfdGhpcy5wcm9wcy5zY3JvbGxhYmxlVGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoX3RoaXMucHJvcHMuc2Nyb2xsYWJsZVRhcmdldCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiWW91IGFyZSB0cnlpbmcgdG8gcGFzcyBzY3JvbGxhYmxlVGFyZ2V0IGJ1dCBpdCBpcyBudWxsLiBUaGlzIG1pZ2h0XFxuICAgICAgICBoYXBwZW4gYmVjYXVzZSB0aGUgZWxlbWVudCBtYXkgbm90IGhhdmUgYmVlbiBhZGRlZCB0byBET00geWV0LlxcbiAgICAgICAgU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmtlZXRtYWluaS9yZWFjdC1pbmZpbml0ZS1zY3JvbGwtY29tcG9uZW50L2lzc3Vlcy81OSBmb3IgbW9yZSBpbmZvLlxcbiAgICAgIFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIF90aGlzLm9uU3RhcnQgPSBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5sYXN0U2Nyb2xsVG9wKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBfdGhpcy5kcmFnZ2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChldnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zdGFydFkgPSBldnQucGFnZVk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZXZ0IGluc3RhbmNlb2YgVG91Y2hFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc3RhcnRZID0gZXZ0LnRvdWNoZXNbMF0ucGFnZVk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX3RoaXMuY3VycmVudFkgPSBfdGhpcy5zdGFydFk7XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5faW5mU2Nyb2xsKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5faW5mU2Nyb2xsLnN0eWxlLndpbGxDaGFuZ2UgPSAndHJhbnNmb3JtJztcclxuICAgICAgICAgICAgICAgIF90aGlzLl9pbmZTY3JvbGwuc3R5bGUudHJhbnNpdGlvbiA9IFwidHJhbnNmb3JtIDAuMnMgY3ViaWMtYmV6aWVyKDAsMCwwLjMxLDEpXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIF90aGlzLm9uTW92ZSA9IGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICAgICAgaWYgKCFfdGhpcy5kcmFnZ2luZylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKGV2dCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmN1cnJlbnRZID0gZXZ0LnBhZ2VZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGV2dCBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmN1cnJlbnRZID0gZXZ0LnRvdWNoZXNbMF0ucGFnZVk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gdXNlciBpcyBzY3JvbGxpbmcgZG93biB0byB1cFxyXG4gICAgICAgICAgICBpZiAoX3RoaXMuY3VycmVudFkgPCBfdGhpcy5zdGFydFkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5jdXJyZW50WSAtIF90aGlzLnN0YXJ0WSA+PVxyXG4gICAgICAgICAgICAgICAgTnVtYmVyKF90aGlzLnByb3BzLnB1bGxEb3duVG9SZWZyZXNoVGhyZXNob2xkKSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHB1bGxUb1JlZnJlc2hUaHJlc2hvbGRCcmVhY2hlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHNvIHlvdSBjYW4gZHJhZyB1cHRvIDEuNSB0aW1lcyBvZiB0aGUgbWF4UHVsbERvd25EaXN0YW5jZVxyXG4gICAgICAgICAgICBpZiAoX3RoaXMuY3VycmVudFkgLSBfdGhpcy5zdGFydFkgPiBfdGhpcy5tYXhQdWxsRG93bkRpc3RhbmNlICogMS41KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMuX2luZlNjcm9sbCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuX2luZlNjcm9sbC5zdHlsZS5vdmVyZmxvdyA9ICd2aXNpYmxlJztcclxuICAgICAgICAgICAgICAgIF90aGlzLl9pbmZTY3JvbGwuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUzZCgwcHgsIFwiICsgKF90aGlzLmN1cnJlbnRZIC1cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdGFydFkpICsgXCJweCwgMHB4KVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBfdGhpcy5vbkVuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMuc3RhcnRZID0gMDtcclxuICAgICAgICAgICAgX3RoaXMuY3VycmVudFkgPSAwO1xyXG4gICAgICAgICAgICBfdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMuc3RhdGUucHVsbFRvUmVmcmVzaFRocmVzaG9sZEJyZWFjaGVkKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5wcm9wcy5yZWZyZXNoRnVuY3Rpb24gJiYgX3RoaXMucHJvcHMucmVmcmVzaEZ1bmN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcHVsbFRvUmVmcmVzaFRocmVzaG9sZEJyZWFjaGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9pbmZTY3JvbGxcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5faW5mU2Nyb2xsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2luZlNjcm9sbC5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJztcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5faW5mU2Nyb2xsLnN0eWxlLnRyYW5zZm9ybSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5faW5mU2Nyb2xsLnN0eWxlLndpbGxDaGFuZ2UgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgX3RoaXMub25TY3JvbGxMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIF90aGlzLnByb3BzLm9uU2Nyb2xsID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIHRoaXMgY2FsbGJhY2sgaW4gbmV4dCB0aWNrIHNvIHRoYXQgaXQgZG9lcyBub3QgYWZmZWN0IHRoZVxyXG4gICAgICAgICAgICAgICAgLy8gZnVuY3Rpb25hbGl0eSBvZiB0aGUgbGlicmFyeS5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMucHJvcHMub25TY3JvbGwgJiYgX3RoaXMucHJvcHMub25TY3JvbGwoZXZlbnQpOyB9LCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gX3RoaXMucHJvcHMuaGVpZ2h0IHx8IF90aGlzLl9zY3JvbGxhYmxlTm9kZVxyXG4gICAgICAgICAgICAgICAgPyBldmVudC50YXJnZXRcclxuICAgICAgICAgICAgICAgIDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcFxyXG4gICAgICAgICAgICAgICAgICAgID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgOiBkb2N1bWVudC5ib2R5O1xyXG4gICAgICAgICAgICAvLyByZXR1cm4gaW1tZWRpYXRlbHkgaWYgdGhlIGFjdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHRyaWdnZXJlZCxcclxuICAgICAgICAgICAgLy8gcHJldmVudHMgbXVsdGlwbGUgdHJpZ2dlcnMuXHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5hY3Rpb25UcmlnZ2VyZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciBhdEJvdHRvbSA9IF90aGlzLnByb3BzLmludmVyc2VcclxuICAgICAgICAgICAgICAgID8gX3RoaXMuaXNFbGVtZW50QXRUb3AodGFyZ2V0LCBfdGhpcy5wcm9wcy5zY3JvbGxUaHJlc2hvbGQpXHJcbiAgICAgICAgICAgICAgICA6IF90aGlzLmlzRWxlbWVudEF0Qm90dG9tKHRhcmdldCwgX3RoaXMucHJvcHMuc2Nyb2xsVGhyZXNob2xkKTtcclxuICAgICAgICAgICAgLy8gY2FsbCB0aGUgYG5leHRgIGZ1bmN0aW9uIGluIHRoZSBwcm9wcyB0byB0cmlnZ2VyIHRoZSBuZXh0IGRhdGEgZmV0Y2hcclxuICAgICAgICAgICAgaWYgKGF0Qm90dG9tICYmIF90aGlzLnByb3BzLmhhc01vcmUpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFjdGlvblRyaWdnZXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7IHNob3dMb2FkZXI6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5wcm9wcy5uZXh0ICYmIF90aGlzLnByb3BzLm5leHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfdGhpcy5sYXN0U2Nyb2xsVG9wID0gdGFyZ2V0LnNjcm9sbFRvcDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIF90aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBzaG93TG9hZGVyOiBmYWxzZSxcclxuICAgICAgICAgICAgcHVsbFRvUmVmcmVzaFRocmVzaG9sZEJyZWFjaGVkOiBmYWxzZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIF90aGlzLnRocm90dGxlZE9uU2Nyb2xsTGlzdGVuZXIgPSB0aHJvdHRsZSgxNTAsIF90aGlzLm9uU2Nyb2xsTGlzdGVuZXIpLmJpbmQoX3RoaXMpO1xyXG4gICAgICAgIF90aGlzLm9uU3RhcnQgPSBfdGhpcy5vblN0YXJ0LmJpbmQoX3RoaXMpO1xyXG4gICAgICAgIF90aGlzLm9uTW92ZSA9IF90aGlzLm9uTW92ZS5iaW5kKF90aGlzKTtcclxuICAgICAgICBfdGhpcy5vbkVuZCA9IF90aGlzLm9uRW5kLmJpbmQoX3RoaXMpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIEluZmluaXRlU2Nyb2xsLnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuZGF0YUxlbmd0aCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibWFuZGF0b3J5IHByb3AgXFxcImRhdGFMZW5ndGhcXFwiIGlzIG1pc3NpbmcuIFRoZSBwcm9wIGlzIG5lZWRlZFwiICtcclxuICAgICAgICAgICAgICAgIFwiIHdoZW4gbG9hZGluZyBtb3JlIGNvbnRlbnQuIENoZWNrIFJFQURNRS5tZCBmb3IgdXNhZ2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3Njcm9sbGFibGVOb2RlID0gdGhpcy5nZXRTY3JvbGxhYmxlVGFyZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5lbCA9IHRoaXMucHJvcHMuaGVpZ2h0XHJcbiAgICAgICAgICAgID8gdGhpcy5faW5mU2Nyb2xsXHJcbiAgICAgICAgICAgIDogdGhpcy5fc2Nyb2xsYWJsZU5vZGUgfHwgd2luZG93O1xyXG4gICAgICAgIGlmICh0aGlzLmVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpc1xyXG4gICAgICAgICAgICAgICAgLnRocm90dGxlZE9uU2Nyb2xsTGlzdGVuZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5pdGlhbFNjcm9sbFkgPT09ICdudW1iZXInICYmXHJcbiAgICAgICAgICAgIHRoaXMuZWwgJiZcclxuICAgICAgICAgICAgdGhpcy5lbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmXHJcbiAgICAgICAgICAgIHRoaXMuZWwuc2Nyb2xsSGVpZ2h0ID4gdGhpcy5wcm9wcy5pbml0aWFsU2Nyb2xsWSkge1xyXG4gICAgICAgICAgICB0aGlzLmVsLnNjcm9sbFRvKDAsIHRoaXMucHJvcHMuaW5pdGlhbFNjcm9sbFkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5wdWxsRG93blRvUmVmcmVzaCAmJiB0aGlzLmVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMub25TdGFydCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5vbk1vdmUpO1xyXG4gICAgICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5vbkVuZCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vblN0YXJ0KTtcclxuICAgICAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW92ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25FbmQpO1xyXG4gICAgICAgICAgICAvLyBnZXQgQkNSIG9mIHB1bGxEb3duIGVsZW1lbnQgdG8gcG9zaXRpb24gaXQgYWJvdmVcclxuICAgICAgICAgICAgdGhpcy5tYXhQdWxsRG93bkRpc3RhbmNlID1cclxuICAgICAgICAgICAgICAgICh0aGlzLl9wdWxsRG93biAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3B1bGxEb3duLmZpcnN0Q2hpbGQgJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wdWxsRG93bi5maXJzdENoaWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5oZWlnaHQpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgMDtcclxuICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMucmVmcmVzaEZ1bmN0aW9uICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNYW5kYXRvcnkgcHJvcCBcXFwicmVmcmVzaEZ1bmN0aW9uXFxcIiBtaXNzaW5nLlxcbiAgICAgICAgICBQdWxsIERvd24gVG8gUmVmcmVzaCBmdW5jdGlvbmFsaXR5IHdpbGwgbm90IHdvcmtcXG4gICAgICAgICAgYXMgZXhwZWN0ZWQuIENoZWNrIFJFQURNRS5tZCBmb3IgdXNhZ2UnXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEluZmluaXRlU2Nyb2xsLnByb3RvdHlwZS5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5lbCkge1xyXG4gICAgICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXNcclxuICAgICAgICAgICAgICAgIC50aHJvdHRsZWRPblNjcm9sbExpc3RlbmVyKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMucHVsbERvd25Ub1JlZnJlc2gpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMub25TdGFydCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMub25Nb3ZlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9uRW5kKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vblN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5vbk1vdmUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbkVuZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgSW5maW5pdGVTY3JvbGwucHJvdG90eXBlLlVOU0FGRV9jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gZnVuY3Rpb24gKHByb3BzKSB7XHJcbiAgICAgICAgLy8gZG8gbm90aGluZyB3aGVuIGRhdGFMZW5ndGggaXMgdW5jaGFuZ2VkXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGF0YUxlbmd0aCA9PT0gcHJvcHMuZGF0YUxlbmd0aClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuYWN0aW9uVHJpZ2dlcmVkID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdXBkYXRlIHN0YXRlIHdoZW4gbmV3IGRhdGEgd2FzIHNlbnQgaW5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgc2hvd0xvYWRlcjogZmFsc2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgSW5maW5pdGVTY3JvbGwucHJvdG90eXBlLmlzRWxlbWVudEF0VG9wID0gZnVuY3Rpb24gKHRhcmdldCwgc2Nyb2xsVGhyZXNob2xkKSB7XHJcbiAgICAgICAgaWYgKHNjcm9sbFRocmVzaG9sZCA9PT0gdm9pZCAwKSB7IHNjcm9sbFRocmVzaG9sZCA9IDAuODsgfVxyXG4gICAgICAgIHZhciBjbGllbnRIZWlnaHQgPSB0YXJnZXQgPT09IGRvY3VtZW50LmJvZHkgfHwgdGFyZ2V0ID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcclxuICAgICAgICAgICAgPyB3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0XHJcbiAgICAgICAgICAgIDogdGFyZ2V0LmNsaWVudEhlaWdodDtcclxuICAgICAgICB2YXIgdGhyZXNob2xkID0gcGFyc2VUaHJlc2hvbGQoc2Nyb2xsVGhyZXNob2xkKTtcclxuICAgICAgICBpZiAodGhyZXNob2xkLnVuaXQgPT09IFRocmVzaG9sZFVuaXRzLlBpeGVsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAodGFyZ2V0LnNjcm9sbFRvcCA8PVxyXG4gICAgICAgICAgICAgICAgdGhyZXNob2xkLnZhbHVlICsgY2xpZW50SGVpZ2h0IC0gdGFyZ2V0LnNjcm9sbEhlaWdodCArIDEgfHxcclxuICAgICAgICAgICAgICAgIHRhcmdldC5zY3JvbGxUb3AgPT09IDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKHRhcmdldC5zY3JvbGxUb3AgPD1cclxuICAgICAgICAgICAgdGhyZXNob2xkLnZhbHVlIC8gMTAwICsgY2xpZW50SGVpZ2h0IC0gdGFyZ2V0LnNjcm9sbEhlaWdodCArIDEgfHxcclxuICAgICAgICAgICAgdGFyZ2V0LnNjcm9sbFRvcCA9PT0gMCk7XHJcbiAgICB9O1xyXG4gICAgSW5maW5pdGVTY3JvbGwucHJvdG90eXBlLmlzRWxlbWVudEF0Qm90dG9tID0gZnVuY3Rpb24gKHRhcmdldCwgc2Nyb2xsVGhyZXNob2xkKSB7XHJcbiAgICAgICAgaWYgKHNjcm9sbFRocmVzaG9sZCA9PT0gdm9pZCAwKSB7IHNjcm9sbFRocmVzaG9sZCA9IDAuODsgfVxyXG4gICAgICAgIHZhciBjbGllbnRIZWlnaHQgPSB0YXJnZXQgPT09IGRvY3VtZW50LmJvZHkgfHwgdGFyZ2V0ID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcclxuICAgICAgICAgICAgPyB3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0XHJcbiAgICAgICAgICAgIDogdGFyZ2V0LmNsaWVudEhlaWdodDtcclxuICAgICAgICB2YXIgdGhyZXNob2xkID0gcGFyc2VUaHJlc2hvbGQoc2Nyb2xsVGhyZXNob2xkKTtcclxuICAgICAgICBpZiAodGhyZXNob2xkLnVuaXQgPT09IFRocmVzaG9sZFVuaXRzLlBpeGVsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAodGFyZ2V0LnNjcm9sbFRvcCArIGNsaWVudEhlaWdodCA+PSB0YXJnZXQuc2Nyb2xsSGVpZ2h0IC0gdGhyZXNob2xkLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICh0YXJnZXQuc2Nyb2xsVG9wICsgY2xpZW50SGVpZ2h0ID49XHJcbiAgICAgICAgICAgICh0aHJlc2hvbGQudmFsdWUgLyAxMDApICogdGFyZ2V0LnNjcm9sbEhlaWdodCk7XHJcbiAgICB9O1xyXG4gICAgSW5maW5pdGVTY3JvbGwucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBzdHlsZSA9IF9fYXNzaWduKHsgaGVpZ2h0OiB0aGlzLnByb3BzLmhlaWdodCB8fCAnYXV0bycsIG92ZXJmbG93OiAnYXV0bycsIFdlYmtpdE92ZXJmbG93U2Nyb2xsaW5nOiAndG91Y2gnIH0sIHRoaXMucHJvcHMuc3R5bGUpO1xyXG4gICAgICAgIHZhciBoYXNDaGlsZHJlbiA9IHRoaXMucHJvcHMuaGFzQ2hpbGRyZW4gfHxcclxuICAgICAgICAgICAgISEodGhpcy5wcm9wcy5jaGlsZHJlbiAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlbiBpbnN0YW5jZW9mIEFycmF5ICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuLmxlbmd0aCk7XHJcbiAgICAgICAgLy8gYmVjYXVzZSBoZWlnaHRlZCBpbmZpbml0ZVNjcm9sbCB2aXN1YWx5IGJyZWFrc1xyXG4gICAgICAgIC8vIG9uIGRyYWcgZG93biBhcyBvdmVyZmxvdyBiZWNvbWVzIHZpc2libGVcclxuICAgICAgICB2YXIgb3V0ZXJEaXZTdHlsZSA9IHRoaXMucHJvcHMucHVsbERvd25Ub1JlZnJlc2ggJiYgdGhpcy5wcm9wcy5oZWlnaHRcclxuICAgICAgICAgICAgPyB7IG92ZXJmbG93OiAnYXV0bycgfVxyXG4gICAgICAgICAgICA6IHt9O1xyXG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiBvdXRlckRpdlN0eWxlLCBjbGFzc05hbWU6IFwiaW5maW5pdGUtc2Nyb2xsLWNvbXBvbmVudF9fb3V0ZXJkaXZcIiB9LFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImluZmluaXRlLXNjcm9sbC1jb21wb25lbnQgXCIgKyAodGhpcy5wcm9wcy5jbGFzc05hbWUgfHwgJycpLCByZWY6IGZ1bmN0aW9uIChpbmZTY3JvbGwpIHsgcmV0dXJuIChfdGhpcy5faW5mU2Nyb2xsID0gaW5mU2Nyb2xsKTsgfSwgc3R5bGU6IHN0eWxlIH0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnB1bGxEb3duVG9SZWZyZXNoICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgcG9zaXRpb246ICdyZWxhdGl2ZScgfSwgcmVmOiBmdW5jdGlvbiAocHVsbERvd24pIHsgcmV0dXJuIChfdGhpcy5fcHVsbERvd24gPSBwdWxsRG93bik7IH0gfSxcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAtMSAqIHRoaXMubWF4UHVsbERvd25EaXN0YW5jZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCB0aGlzLnN0YXRlLnB1bGxUb1JlZnJlc2hUaHJlc2hvbGRCcmVhY2hlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMucmVsZWFzZVRvUmVmcmVzaENvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnByb3BzLnB1bGxEb3duVG9SZWZyZXNoQ29udGVudCkpKSxcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW4sXHJcbiAgICAgICAgICAgICAgICAhdGhpcy5zdGF0ZS5zaG93TG9hZGVyICYmXHJcbiAgICAgICAgICAgICAgICAgICAgIWhhc0NoaWxkcmVuICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oYXNNb3JlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5sb2FkZXIsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNob3dMb2FkZXIgJiYgdGhpcy5wcm9wcy5oYXNNb3JlICYmIHRoaXMucHJvcHMubG9hZGVyLFxyXG4gICAgICAgICAgICAgICAgIXRoaXMucHJvcHMuaGFzTW9yZSAmJiB0aGlzLnByb3BzLmVuZE1lc3NhZ2UpKSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEluZmluaXRlU2Nyb2xsO1xyXG59KENvbXBvbmVudCkpO1xuXG5leHBvcnQgZGVmYXVsdCBJbmZpbml0ZVNjcm9sbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzLmpzLm1hcFxuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcmVxdWlyZS1kZWZhdWx0LXByb3BzICovXHJcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7XHJcbiAgRm9ybSwgSW5wdXQsIEJ1dHRvbiwgbWVzc2FnZSwgUG9wb3ZlciwgSW1hZ2VcclxufSBmcm9tICdhbnRkJztcclxuaW1wb3J0IHsgU2VuZE91dGxpbmVkLCBTbWlsZU91dGxpbmVkIH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMnO1xyXG5pbXBvcnQgeyBJUGVyZm9ybWVyIH0gZnJvbSAnc3JjL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBFbW90aW9ucyB9IGZyb20gJ0Bjb21wb25lbnRzL21lc3NhZ2VzL2Vtb3Rpb25zJztcclxuaW1wb3J0IHsgRm9ybUluc3RhbmNlIH0gZnJvbSAnYW50ZC9saWIvZm9ybSc7XHJcbmltcG9ydCB7IElDcmVhdGVDb21tZW50IH0gZnJvbSAnc3JjL2ludGVyZmFjZXMvY29tbWVudCc7XHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnbmV4dC9yb3V0ZXInO1xyXG5pbXBvcnQgJy4vY29tbWVudC5sZXNzJztcclxuaW1wb3J0IHsgQXBwQnV0dG9uIH0gZnJvbSAnQGNvbXBvbmVudHMvdWkvc2hhcmVkL0FwcEJ1dHRvbic7XHJcblxyXG5pbnRlcmZhY2UgSVByb3BzIHtcclxuICBvYmplY3RJZDogc3RyaW5nO1xyXG4gIG9uU3VibWl0OiBGdW5jdGlvbjtcclxuICBjcmVhdG9yOiBJUGVyZm9ybWVyO1xyXG4gIG9iamVjdFR5cGU/OiBzdHJpbmc7XHJcbiAgaXNSZXBseT86IGJvb2xlYW47XHJcbiAgc2l0ZU5hbWU/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1lbnRGb3JtIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxJUHJvcHM+IHtcclxuICBmb3JtUmVmOiBGb3JtSW5zdGFuY2U7XHJcblxyXG4gIHN0YXRlID0ge1xyXG4gICAgdGV4dDogJydcclxuICB9O1xyXG5cclxuICBvbkZpbmlzaCh2YWx1ZXM6IElDcmVhdGVDb21tZW50KSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIG9uU3VibWl0OiBoYW5kbGVDb21tZW50LFxyXG4gICAgICBvYmplY3RJZCxcclxuICAgICAgb2JqZWN0VHlwZSxcclxuICAgICAgY3JlYXRvclxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCBkYXRhID0gdmFsdWVzO1xyXG5cclxuICAgIGlmICghY3JlYXRvciB8fCAhY3JlYXRvci5faWQpIHtcclxuICAgICAgbWVzc2FnZS5lcnJvcignUGxlYXNlIGxvZ2luIScpO1xyXG4gICAgICByZXR1cm4gUm91dGVyLnB1c2goJy8nKTtcclxuICAgIH1cclxuICAgIGlmICghZGF0YS5jb250ZW50KSB7XHJcbiAgICAgIHJldHVybiBtZXNzYWdlLmVycm9yKCdQbGVhc2UgYWRkIGEgY29tbWVudCEnKTtcclxuICAgIH1cclxuICAgIGlmIChkYXRhLmNvbnRlbnQubGVuZ3RoID4gMTUwKSB7XHJcbiAgICAgIHJldHVybiBtZXNzYWdlLmVycm9yKCdDb21tZW50IGlzIG92ZXIgMTUwIGNoYXJhY3RlcnMnKTtcclxuICAgIH1cclxuICAgIGRhdGEub2JqZWN0SWQgPSBvYmplY3RJZDtcclxuICAgIGRhdGEub2JqZWN0VHlwZSA9IG9iamVjdFR5cGUgfHwgJ3ZpZGVvJztcclxuICAgIHRoaXMuZm9ybVJlZi5yZXNldEZpZWxkcyhbJ2NvbnRlbnQnXSk7XHJcbiAgICByZXR1cm4gaGFuZGxlQ29tbWVudChkYXRhKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG9uRW1vamlDbGljayhlbW9qaSkge1xyXG4gICAgY29uc3QgeyBjcmVhdG9yIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgaWYgKCFjcmVhdG9yIHx8ICFjcmVhdG9yLl9pZCkgcmV0dXJuO1xyXG4gICAgY29uc3QgeyB0ZXh0IH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmZvcm1SZWYgYXMgRm9ybUluc3RhbmNlO1xyXG4gICAgaW5zdGFuY2Uuc2V0RmllbGRzVmFsdWUoe1xyXG4gICAgICBjb250ZW50OiBgJHtpbnN0YW5jZS5nZXRGaWVsZFZhbHVlKCdjb250ZW50Jyl9ICR7ZW1vaml9IGBcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHRleHQ6IGAke3RleHR9ICR7ZW1vaml9IGAgfSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNyZWF0b3IsIGlzUmVwbHksIHNpdGVOYW1lLCBvYmplY3RJZFxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Rm9ybVxyXG4gICAgICAgIHJlZj17KHJlZikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5mb3JtUmVmID0gcmVmO1xyXG4gICAgICAgIH19XHJcbiAgICAgICAgbmFtZT1cImNvbW1lbnQtZm9ybVwiXHJcbiAgICAgICAgb25GaW5pc2g9e3RoaXMub25GaW5pc2guYmluZCh0aGlzKX1cclxuICAgICAgICBpbml0aWFsVmFsdWVzPXt7XHJcbiAgICAgICAgICBjb250ZW50OiAnJ1xyXG4gICAgICAgIH19XHJcbiAgICAgICAgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgbWFyZ2luOiAnYXV0byd9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLXN0cmV0Y2hcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgcGItNFwiPlxyXG4gICAgICAgICAgICA8Rm9ybS5JdGVtIGNsYXNzTmFtZT0nbS0wJyBuYW1lPVwiY29udGVudFwiPlxyXG4gICAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT0ncm91bmRlZC1mdWxsIHAtMidcclxuICAgICAgICAgICAgICAgIG9uUHJlc3NFbnRlcj17KGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQudmFsdWUubGVuZ3RoIDwgMikgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmZvcm1SZWYuc3VibWl0KCk7XHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFjcmVhdG9yIHx8ICFjcmVhdG9yLl9pZH1cclxuICAgICAgICAgICAgICAgIG1heExlbmd0aD17MTUwfVxyXG4gICAgICAgICAgICAgICAgbWluTGVuZ3RoPXsyfVxyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e1xyXG4gICAgICAgICAgICAgICAgICAhaXNSZXBseSA/ICdBZGQgYSBjb21tZW50IGhlcmUnIDogJ0FkZCBhIHJlcGx5IGhlcmUnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9Gb3JtLkl0ZW0+XHJcbiAgICAgICAgICAgIHsvKiA8UG9wb3ZlclxyXG4gICAgICAgICAgICAgIGtleT17b2JqZWN0SWR9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcmlnaHQtNCBtLWF1dG8gdG9wLTAgYm90dG9tLTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgei0xMFwiXHJcbiAgICAgICAgICAgICAgdGl0bGU9e251bGx9XHJcbiAgICAgICAgICAgICAgdHJpZ2dlcj1cImNsaWNrXCJcclxuICAgICAgICAgICAgICBjb250ZW50PXsoXHJcbiAgICAgICAgICAgICAgICA8RW1vdGlvbnNcclxuICAgICAgICAgICAgICAgICAgb25FbW9qaUNsaWNrPXt0aGlzLm9uRW1vamlDbGljay5iaW5kKHRoaXMpfVxyXG4gICAgICAgICAgICAgICAgICBzaXRlTmFtZT17c2l0ZU5hbWV9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdycC1lbW90aW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgPFNtaWxlT3V0bGluZWQgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9Qb3BvdmVyPiAqL31cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPEFwcEJ1dHRvblxyXG4gICAgICAgICAgICBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnIH19XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Jyd9XHJcbiAgICAgICAgICAgIHR5cGU9J3N1Ym1pdCdcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHshaXNSZXBseSA/ICdQb3N0JyA6ICdSZXBseSd9XHJcbiAgICAgICAgICA8L0FwcEJ1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9Gb3JtPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcmVxdWlyZS1kZWZhdWx0LXByb3BzICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvdHlwZS1idWlsdGlucyAqL1xyXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1xyXG4gIE1lbnUsIERyb3Bkb3duLCBtZXNzYWdlLCBJbWFnZSwgTW9kYWxcclxufSBmcm9tICdhbnRkJztcclxuaW1wb3J0IHtcclxuICBNb3JlT3V0bGluZWQsIExpa2VPdXRsaW5lZCwgRGlzbGlrZU91dGxpbmVkLCBIZWFydEZpbGxlZFxyXG59IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zJztcclxuaW1wb3J0IHsgcmVhY3Rpb25TZXJ2aWNlIH0gZnJvbSAnQHNlcnZpY2VzL2luZGV4JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IENvbW1lbnRGb3JtIGZyb20gJ0Bjb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC1mb3JtJztcclxuaW1wb3J0IExpc3RDb21tZW50cyBmcm9tICdAY29tcG9uZW50cy9jb21tZW50L2xpc3QtY29tbWVudHMnO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5pbXBvcnQge1xyXG4gIGdldENvbW1lbnRzLCBtb3JlQ29tbWVudCwgY3JlYXRlQ29tbWVudCwgZGVsZXRlQ29tbWVudFxyXG59IGZyb20gJ0ByZWR1eC9jb21tZW50L2FjdGlvbnMnO1xyXG5pbXBvcnQgeyBJQ29tbWVudCwgSVBlcmZvcm1lciB9IGZyb20gJ3NyYy9pbnRlcmZhY2VzL2luZGV4JztcclxuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcclxuaW1wb3J0IGR5bmFtaWMgZnJvbSAnbmV4dC9keW5hbWljJztcclxuXHJcbmNvbnN0IFZlcmlmaWVkRW1haWxGb3JtID0gZHluYW1pYygoKSA9PiBpbXBvcnQoJ0Bjb21wb25lbnRzL3BlcmZvcm1lci92ZXJpZmllZC1lbWFpbC1mb3JtJyksIHsgc3NyOiBmYWxzZSB9KTtcclxuXHJcbmludGVyZmFjZSBJUHJvcHMge1xyXG4gIGl0ZW06IElDb21tZW50O1xyXG4gIG9uRGVsZXRlPzogRnVuY3Rpb247XHJcbiAgdXNlcj86IElQZXJmb3JtZXI7XHJcbiAgY2FuUmVwbHk/OiBib29sZWFuO1xyXG4gIGdldENvbW1lbnRzOiBGdW5jdGlvbjtcclxuICBtb3JlQ29tbWVudDogRnVuY3Rpb247XHJcbiAgY3JlYXRlQ29tbWVudDogRnVuY3Rpb247XHJcbiAgZGVsZXRlQ29tbWVudDogRnVuY3Rpb247XHJcbiAgY29tbWVudE1hcHBpbmc6IGFueTtcclxuICBzaXRlTmFtZTogc3RyaW5nO1xyXG4gIGZlZWRPd25lcklkPzogc3RyaW5nO1xyXG59XHJcblxyXG5jbGFzcyBDb21tZW50SXRlbSBleHRlbmRzIFB1cmVDb21wb25lbnQ8SVByb3BzPiB7XHJcbiAgc3RhdGUgPSB7XHJcbiAgICBpc0xpa2VkOiBmYWxzZSxcclxuICAgIGlzT3BlbkNvbW1lbnQ6IGZhbHNlLFxyXG4gICAgaXNGaXJzdExvYWRDb21tZW50OiB0cnVlLFxyXG4gICAgb3BlblZlcmlmaWVkRW1haWxNb2RhbDogZmFsc2UsXHJcbiAgICBpdGVtUGVyUGFnZTogMTIsXHJcbiAgICBjb21tZW50UGFnZTogMCxcclxuICAgIGlzUmVwbHk6IGZhbHNlLFxyXG4gICAgdG90YWxSZXBseTogMCxcclxuICAgIHRvdGFsTGlrZTogMFxyXG4gIH07XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgY29uc3QgeyBpdGVtIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgaWYgKGl0ZW0pIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgaXNMaWtlZDogISFpdGVtLmlzTGlrZWQsXHJcbiAgICAgICAgdG90YWxMaWtlOiBpdGVtLnRvdGFsTGlrZSB8fCAwLFxyXG4gICAgICAgIHRvdGFsUmVwbHk6IGl0ZW0udG90YWxSZXBseSA/IGl0ZW0udG90YWxSZXBseSA6IDBcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBoYW5kbGVDb21tZW50KHZhbHVlcykge1xyXG4gICAgY29uc3QgeyBjcmVhdGVDb21tZW50OiBoYW5kbGVDcmVhdGUsIHVzZXIgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBpZiAoIXVzZXIudmVyaWZpZWRFbWFpbCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7IG9wZW5WZXJpZmllZEVtYWlsTW9kYWw6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB7IHRvdGFsUmVwbHkgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBoYW5kbGVDcmVhdGUodmFsdWVzKTtcclxuICAgIGF3YWl0IHRoaXMuc2V0U3RhdGUoeyB0b3RhbFJlcGx5OiB0b3RhbFJlcGx5ICsgMSB9KTtcclxuICAgIHRoaXMub25PcGVuQ29tbWVudCgpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBhc3luYyBvbk9wZW5Db21tZW50KCkge1xyXG4gICAgY29uc3QgeyBpdGVtLCBnZXRDb21tZW50czogaGFuZGxlR2V0Q29tbWVudCB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHtcclxuICAgICAgaXNPcGVuQ29tbWVudCwgaXNGaXJzdExvYWRDb21tZW50LCBpdGVtUGVyUGFnZSwgY29tbWVudFBhZ2VcclxuICAgIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzT3BlbkNvbW1lbnQ6ICFpc09wZW5Db21tZW50IH0pO1xyXG4gICAgaWYgKGlzRmlyc3RMb2FkQ29tbWVudCkge1xyXG4gICAgICBhd2FpdCB0aGlzLnNldFN0YXRlKHsgaXNGaXJzdExvYWRDb21tZW50OiBmYWxzZSB9KTtcclxuICAgICAgaGFuZGxlR2V0Q29tbWVudCh7XHJcbiAgICAgICAgb2JqZWN0SWQ6IGl0ZW0uX2lkLFxyXG4gICAgICAgIG9iamVjdFR5cGU6ICdjb21tZW50JyxcclxuICAgICAgICBsaW1pdDogaXRlbVBlclBhZ2UsXHJcbiAgICAgICAgb2Zmc2V0OiBjb21tZW50UGFnZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGxpa2VDb21tZW50KGNvbW1lbnQpIHtcclxuICAgIGNvbnN0IHsgaXNMaWtlZCwgdG90YWxMaWtlIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKCFpc0xpa2VkKSB7XHJcbiAgICAgICAgYXdhaXQgcmVhY3Rpb25TZXJ2aWNlLmNyZWF0ZSh7XHJcbiAgICAgICAgICBvYmplY3RJZDogY29tbWVudC5faWQsXHJcbiAgICAgICAgICBhY3Rpb246ICdsaWtlJyxcclxuICAgICAgICAgIG9iamVjdFR5cGU6ICdjb21tZW50J1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0xpa2VkOiB0cnVlLCB0b3RhbExpa2U6IHRvdGFsTGlrZSArIDEgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc3QgZXJyb3IgPSBhd2FpdCBlO1xyXG4gICAgICBtZXNzYWdlLmVycm9yKGVycm9yLm1lc3NhZ2UgfHwgJ0Vycm9yIG9jY3VyZWQsIHBsZWFzZSB0cnkgYWdhaW4gbGF0ZXInKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHVuTGlrZUNvbW1lbnQoY29tbWVudCkge1xyXG4gICAgY29uc3QgeyBpc0xpa2VkLCB0b3RhbExpa2UgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAoaXNMaWtlZCkge1xyXG4gICAgICAgIGF3YWl0IHJlYWN0aW9uU2VydmljZS5kZWxldGUoe1xyXG4gICAgICAgICAgb2JqZWN0SWQ6IGNvbW1lbnQuX2lkLFxyXG4gICAgICAgICAgYWN0aW9uOiAnbGlrZScsXHJcbiAgICAgICAgICBvYmplY3RUeXBlOiAnY29tbWVudCdcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNMaWtlZDogZmFsc2UsIHRvdGFsTGlrZTogdG90YWxMaWtlIC0gMSB9KTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zdCBlcnJvciA9IGF3YWl0IGU7XHJcbiAgICAgIG1lc3NhZ2UuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCAnRXJyb3Igb2NjdXJlZCwgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlcicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgbW9yZUNvbW1lbnQoKSB7XHJcbiAgICBjb25zdCB7IGl0ZW0sIG1vcmVDb21tZW50OiBoYW5kbGVMb2FkTW9yZSB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHsgY29tbWVudFBhZ2UsIGl0ZW1QZXJQYWdlIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgYXdhaXQgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGNvbW1lbnRQYWdlOiBjb21tZW50UGFnZSArIDFcclxuICAgIH0pO1xyXG4gICAgaGFuZGxlTG9hZE1vcmUoe1xyXG4gICAgICBsaW1pdDogaXRlbVBlclBhZ2UsXHJcbiAgICAgIG9iamVjdFR5cGU6ICdjb21tZW50JyxcclxuICAgICAgb2Zmc2V0OiAoY29tbWVudFBhZ2UgKyAxKSAqIGl0ZW1QZXJQYWdlLFxyXG4gICAgICBvYmplY3RJZDogaXRlbS5faWRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZGVsZXRlQ29tbWVudChpdGVtKSB7XHJcbiAgICBjb25zdCB7IGRlbGV0ZUNvbW1lbnQ6IGhhbmRsZURlbGV0ZSB9ID0gdGhpcy5wcm9wcztcclxuICAgIGlmICghd2luZG93LmNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB0byByZW1vdmUgdGhpcyBjb21tZW50PycpKSByZXR1cm47XHJcbiAgICBoYW5kbGVEZWxldGUoaXRlbS5faWQpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpdGVtLCB1c2VyLCBjYW5SZXBseSwgb25EZWxldGUsIGNvbW1lbnRNYXBwaW5nLCBzaXRlTmFtZSwgZmVlZE93bmVySWRcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgZmV0Y2hpbmdDb21tZW50ID0gY29tbWVudE1hcHBpbmcuaGFzT3duUHJvcGVydHkoaXRlbS5faWQpID8gY29tbWVudE1hcHBpbmdbaXRlbS5faWRdLnJlcXVlc3RpbmcgOiBmYWxzZTtcclxuICAgIGNvbnN0IGNvbW1lbnRzID0gY29tbWVudE1hcHBpbmcuaGFzT3duUHJvcGVydHkoaXRlbS5faWQpID8gY29tbWVudE1hcHBpbmdbaXRlbS5faWRdLml0ZW1zIDogW107XHJcbiAgICBjb25zdCB0b3RhbENvbW1lbnRzID0gY29tbWVudE1hcHBpbmcuaGFzT3duUHJvcGVydHkoaXRlbS5faWQpID8gY29tbWVudE1hcHBpbmdbaXRlbS5faWRdLnRvdGFsIDogMDtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaXNMaWtlZCwgaXNPcGVuQ29tbWVudCwgaXNSZXBseSwgdG90YWxSZXBseSwgdG90YWxMaWtlLCBvcGVuVmVyaWZpZWRFbWFpbE1vZGFsXHJcbiAgICB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYi00Jz5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNtdC1pdGVtXCIga2V5PXtpdGVtLl9pZH0+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5saWtlQ29tbWVudC5iaW5kKHRoaXMsIGl0ZW0pfT5cclxuICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCI+XHJcbiAgICAgICAgICAgICAgICA8bWFzayBpZD1cIm1hc2swXzMwNDdfODI4MjBcIiAgIG1hc2tVbml0cz1cInVzZXJTcGFjZU9uVXNlXCIgeD1cIjBcIiB5PVwiMFwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiPlxyXG4gICAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiBmaWxsPVwiI0Q5RDlEOVwiLz5cclxuICAgICAgICAgICAgICAgIDwvbWFzaz5cclxuICAgICAgICAgICAgICAgIDxnIG1hc2s9XCJ1cmwoI21hc2swXzMwNDdfODI4MjApXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNyAxN1YxMS4yMDgzSDNMMTAgMkwxNyAxMS4yMDgzSDEzVjE3SDdaTTguNSAxNS41SDExLjVWOS43MDgzM0gxMy45Mzc1TDEwIDQuNDM3NUw2LjA2MjUgOS43MDgzM0g4LjVWMTUuNVpcIiBmaWxsPVwiIzEyMTIxMlwiLz5cclxuICAgICAgICAgICAgICAgIDwvZz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICB7dG90YWxMaWtlfVxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy51bkxpa2VDb21tZW50LmJpbmQodGhpcywgaXRlbSl9PlxyXG4gICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgZmlsbD1cIm5vbmVcIj5cclxuICAgICAgICAgICAgICA8ZyBjbGlwUGF0aD1cInVybCgjY2xpcDBfMzA0N184MjgyMilcIj5cclxuICAgICAgICAgICAgICAgIDxtYXNrIGlkPVwibWFzazBfMzA0N184MjgyMlwiIG1hc2tVbml0cz1cInVzZXJTcGFjZU9uVXNlXCIgeD1cIjBcIiB5PVwiMFwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiPlxyXG4gICAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiBmaWxsPVwiI0Q5RDlEOVwiLz5cclxuICAgICAgICAgICAgICAgIDwvbWFzaz5cclxuICAgICAgICAgICAgICAgIDxnIG1hc2s9XCJ1cmwoI21hc2swXzMwNDdfODI4MjIpXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTMgMy4xNjIxMUwxMyA4Ljk1Mzc4TDE3IDguOTUzNzhMMTAgMTguMTYyMUwzIDguOTUzNzdMNyA4Ljk1Mzc3TDcgMy4xNjIxMUwxMyAzLjE2MjExWk0xMS41IDQuNjYyMTFMOC41IDQuNjYyMTFMOC41IDEwLjQ1MzhMNi4wNjI1IDEwLjQ1MzhMMTAgMTUuNzI0NkwxMy45Mzc1IDEwLjQ1MzhMMTEuNSAxMC40NTM4TDExLjUgNC42NjIxMVpcIiBmaWxsPVwiIzEyMTIxMlwiLz5cclxuICAgICAgICAgICAgICAgIDwvZz5cclxuICAgICAgICAgICAgICA8L2c+XHJcbiAgICAgICAgICAgICAgPGRlZnM+XHJcbiAgICAgICAgICAgICAgICA8Y2xpcFBhdGggaWQ9XCJjbGlwMF8zMDQ3XzgyODIyXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxyZWN0IHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIGZpbGw9XCJ3aGl0ZVwiLz5cclxuICAgICAgICAgICAgICAgIDwvY2xpcFBhdGg+XHJcbiAgICAgICAgICAgICAgPC9kZWZzPlxyXG4gICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxpbWcgYWx0PVwiY3JlYXRvci1hdnRcIiBzcmM9e2l0ZW0/LmNyZWF0b3I/LmF2YXRhciB8fCAnL3N0YXRpYy9uby1hdmF0YXIucG5nJ30gY2xhc3NOYW1lPVwiYXZhdGFyXCIgLz5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY210LWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbXQtdGV4dFwiPlxyXG4gICAgICAgICAgICAgIHtpdGVtPy5jcmVhdG9yPy5faWQgPyAoXHJcbiAgICAgICAgICAgICAgICA8TGlua1xyXG4gICAgICAgICAgICAgICAgICBocmVmPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWU6ICcvbW9kZWwvcHJvZmlsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiBpdGVtPy5jcmVhdG9yPy51c2VybmFtZSB8fCBpdGVtPy5jcmVhdG9yPy5faWQgfHwgJ04vQSdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDxhIGFyaWEtaGlkZGVuIGhyZWY9XCIvbW9kZWwvcHJvZmlsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHtpdGVtPy5jcmVhdG9yPy5uYW1lIHx8IGl0ZW0/LmNyZWF0b3I/LnVzZXJuYW1lIHx8ICdOL0EnfVxyXG4gICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgICAgKSA6IDxwPk4vQTwvcD4gfVxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY210LXVzZXJcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjbXQtdGltZVwiPnttb21lbnQoaXRlbS5jcmVhdGVkQXQpLmZyb21Ob3coKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICB7KHVzZXIuX2lkID09PSBpdGVtLmNyZWF0ZWRCeSB8fCB1c2VyLl9pZCA9PT0gZmVlZE93bmVySWQpICYmIChcclxuICAgICAgICAgICAgICAgICAgPERyb3Bkb3duXHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheT17KFxyXG4gICAgICAgICAgICAgICAgICAgICAgPE1lbnUga2V5PXtgbWVudV9jbXRfJHtpdGVtLl9pZH1gfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnUuSXRlbSBrZXk9e2BkZWxldGVfY210XyR7aXRlbS5faWR9YH0gb25DbGljaz17KCkgPT4gb25EZWxldGUoaXRlbSl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxhPlJlcG9ydDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9NZW51Lkl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZW51Lkl0ZW0ga2V5PXtgZGVsZXRlX2NtdF8ke2l0ZW0uX2lkfWB9IG9uQ2xpY2s9eygpID0+IG9uRGVsZXRlKGl0ZW0pfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YT5EZWxldGU8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVudS5JdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9NZW51PlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICA8YSBhcmlhLWhpZGRlbiBjbGFzc05hbWU9XCJhbnQtZHJvcGRvd24tbGlua1wiIG9uQ2xpY2s9eyhlKSA9PiBlLnByZXZlbnREZWZhdWx0KCl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPE1vcmVPdXRsaW5lZCAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bj5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNtdC10ZXh0XCI+XHJcbiAgICAgICAgICAgICAge2l0ZW0uY29udGVudH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY210LWFjdGlvblwiPlxyXG4gICAgICAgICAgICAgIHtjYW5SZXBseSAmJiAoXHJcbiAgICAgICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgICAgICBhcmlhLWhpZGRlblxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyFpc1JlcGx5ID8gJ2NtdC1yZXBseScgOiAnY210LXJlcGx5IGFjdGl2ZSd9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdGhpcy5zZXRTdGF0ZSh7IGlzUmVwbHk6ICFpc1JlcGx5IH0sICgpID0+IHRoaXMub25PcGVuQ29tbWVudCgpKTsgfX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAge2Ake3RvdGFsUmVwbHkgfHwgJyd9IFJlcGx5YH1cclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIHtpc09wZW5Db21tZW50ICYmIChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVwbHktYmwtbGlzdFwiPlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxMaXN0Q29tbWVudHNcclxuICAgICAgICAgICAgICAgIGtleT17YGxpc3RfY29tbWVudHNfJHtpdGVtLl9pZH1fJHtjb21tZW50cy5sZW5ndGh9YH1cclxuICAgICAgICAgICAgICAgIHJlcXVlc3Rpbmc9e2ZldGNoaW5nQ29tbWVudH1cclxuICAgICAgICAgICAgICAgIGNvbW1lbnRzPXtjb21tZW50c31cclxuICAgICAgICAgICAgICAgIG9uRGVsZXRlPXt0aGlzLmRlbGV0ZUNvbW1lbnQuYmluZCh0aGlzKX1cclxuICAgICAgICAgICAgICAgIHVzZXI9e3VzZXJ9XHJcbiAgICAgICAgICAgICAgICBjYW5SZXBseT17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICBpc1JlcGx5PXtpc1JlcGx5fVxyXG4gICAgICAgICAgICAgICAgZmVlZE93bmVySWQ9e2ZlZWRPd25lcklkfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAge2NvbW1lbnRzLmxlbmd0aCA8IHRvdGFsQ29tbWVudHMgJiYgKFxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgPGEgYXJpYS1oaWRkZW4gb25DbGljaz17dGhpcy5tb3JlQ29tbWVudC5iaW5kKHRoaXMpfT5cclxuICAgICAgICAgICAgICAgICAgICBtb3JlLi4uXHJcbiAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgICAgIHtpc1JlcGx5IFxyXG4gICAgICAgICA/ICA8Q29tbWVudEZvcm1cclxuICAgICAgICAgICAgICBjcmVhdG9yPXt1c2VyfVxyXG4gICAgICAgICAgICAgIG9uU3VibWl0PXt0aGlzLmhhbmRsZUNvbW1lbnQuYmluZCh0aGlzKX1cclxuICAgICAgICAgICAgICBvYmplY3RJZD17aXRlbS5faWR9XHJcbiAgICAgICAgICAgICAgb2JqZWN0VHlwZT1cImNvbW1lbnRcIlxyXG4gICAgICAgICAgICAgIGlzUmVwbHlcclxuICAgICAgICAgICAgICBzaXRlTmFtZT17c2l0ZU5hbWV9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA6IG51bGx9XHJcbiAgICAgICAgPE1vZGFsXHJcbiAgICAgICAgICBrZXk9XCJ2ZXJpZmllZF9lbWFpbFwiXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJzdWJzY3JpcHRpb24tbW9kYWxcIlxyXG4gICAgICAgICAgdGl0bGU9XCJQbGVhc2UgdmVyaWZ5IHlvdXIgZW1haWwgYWRkcmVzc1wiXHJcbiAgICAgICAgICB2aXNpYmxlPXtvcGVuVmVyaWZpZWRFbWFpbE1vZGFsfVxyXG4gICAgICAgICAgZm9vdGVyPXtudWxsfVxyXG4gICAgICAgICAgZGVzdHJveU9uQ2xvc2VcclxuICAgICAgICAgIG9uQ2FuY2VsPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgb3BlblZlcmlmaWVkRW1haWxNb2RhbDogZmFsc2UgfSl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPFZlcmlmaWVkRW1haWxGb3JtIC8+XHJcbiAgICAgICAgPC9Nb2RhbD5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVzID0gKHN0YXRlOiBhbnkpID0+IHtcclxuICBjb25zdCB7IGNvbW1lbnRNYXBwaW5nLCBjb21tZW50IH0gPSBzdGF0ZS5jb21tZW50O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY29tbWVudE1hcHBpbmcsXHJcbiAgICBjb21tZW50LFxyXG4gICAgc2l0ZU5hbWU6IHN0YXRlLnVpLnNpdGVOYW1lXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoID0ge1xyXG4gIGdldENvbW1lbnRzLFxyXG4gIG1vcmVDb21tZW50LFxyXG4gIGNyZWF0ZUNvbW1lbnQsXHJcbiAgZGVsZXRlQ29tbWVudFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlcywgbWFwRGlzcGF0Y2gpKENvbW1lbnRJdGVtKTtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcmVxdWlyZS1kZWZhdWx0LXByb3BzICovXHJcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFNwaW4gfSBmcm9tICdhbnRkJztcclxuaW1wb3J0IENvbW1lbnRJdGVtIGZyb20gJ0Bjb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC1pdGVtJztcclxuaW1wb3J0IHsgSUNvbW1lbnQsIElQZXJmb3JtZXIgfSBmcm9tICdzcmMvaW50ZXJmYWNlcy9pbmRleCc7XHJcbmltcG9ydCBJbmZpbml0ZVNjcm9sbCBmcm9tICdyZWFjdC1pbmZpbml0ZS1zY3JvbGwtY29tcG9uZW50JztcclxuXHJcbmludGVyZmFjZSBJUHJvcHMge1xyXG4gIGNvbW1lbnRzOiBJQ29tbWVudFtdO1xyXG4gIHJlcXVlc3Rpbmc6IGJvb2xlYW47XHJcbiAgb25EZWxldGU/OiBGdW5jdGlvbjtcclxuICB1c2VyPzogSVBlcmZvcm1lcjtcclxuICBjYW5SZXBseT86IGJvb2xlYW47XHJcbiAgY2FuTG9hZG1vcmU/IDpib29sZWFuO1xyXG4gIGxvYWRNb3JlPygpIDpGdW5jdGlvbjtcclxuICBpc1JlcGx5PyA6Ym9vbGVhbjtcclxuICBmZWVkT3duZXJJZD86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdENvbW1lbnRzIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxJUHJvcHM+IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNvbW1lbnRzLCByZXF1ZXN0aW5nLCB1c2VyLCBvbkRlbGV0ZSwgY2FuUmVwbHksIGNhbkxvYWRtb3JlLCBsb2FkTW9yZSwgaXNSZXBseSwgZmVlZE93bmVySWRcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDw+XHJcbiAgICAgICAgeyghcmVxdWVzdGluZyAmJiAhY29tbWVudHMubGVuZ3RoKSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIiBzdHlsZT17eyBwYWRkaW5nOiAnNXB4JyB9fSAvPlxyXG4gICAgICAgICAgOiAoXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJzY3JvbGxhYmxlTW9kYWxcIiBjbGFzc05hbWU9e2lzUmVwbHkgPyAnY210LWxpc3QnIDogJ2NtdC1saXN0IHJlcGx5J30+XHJcbiAgICAgICAgICAgICAgPEluZmluaXRlU2Nyb2xsXHJcbiAgICAgICAgICAgICAgICBkYXRhTGVuZ3RoPXtjb21tZW50cy5sZW5ndGh9XHJcbiAgICAgICAgICAgICAgICBoYXNNb3JlPXtjYW5Mb2FkbW9yZX1cclxuICAgICAgICAgICAgICAgIGxvYWRlcj17bnVsbH1cclxuICAgICAgICAgICAgICAgIG5leHQ9e2xvYWRNb3JlfVxyXG4gICAgICAgICAgICAgICAgZW5kTWVzc2FnZT17bnVsbH1cclxuICAgICAgICAgICAgICAgIHNjcm9sbFRocmVzaG9sZD17MC43fVxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsYWJsZVRhcmdldD1cInNjcm9sbGFibGVNb2RhbFwiXHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2NvbW1lbnRzLm1hcCgoY29tbWVudDogSUNvbW1lbnQpID0+IDxDb21tZW50SXRlbSBmZWVkT3duZXJJZD17ZmVlZE93bmVySWR9IGNhblJlcGx5PXtjYW5SZXBseX0ga2V5PXtjb21tZW50Ll9pZH0gaXRlbT17Y29tbWVudH0gdXNlcj17dXNlcn0gb25EZWxldGU9e29uRGVsZXRlfSAvPil9XHJcbiAgICAgICAgICAgICAgICB7cmVxdWVzdGluZyAmJiA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCIgc3R5bGU9e3sgbWFyZ2luOiAyMCB9fT48U3BpbiAvPjwvZGl2Pn1cclxuICAgICAgICAgICAgICA8L0luZmluaXRlU2Nyb2xsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICl9XHJcbiAgICAgIDwvPlxyXG5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=