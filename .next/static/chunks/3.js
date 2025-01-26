(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[3],{

/***/ "./node_modules/next/node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "./node_modules/react-device-detect/dist/lib.js":
/*!******************************************************!*\
  !*** ./node_modules/react-device-detect/dist/lib.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var React__default = _interopDefault(React);

var UAParser = __webpack_require__(/*! ua-parser-js/dist/ua-parser.min */ "./node_modules/react-device-detect/node_modules/ua-parser-js/dist/ua-parser.min.js");

var ClientUAInstance = new UAParser();
var browser = ClientUAInstance.getBrowser();
var cpu = ClientUAInstance.getCPU();
var device = ClientUAInstance.getDevice();
var engine = ClientUAInstance.getEngine();
var os = ClientUAInstance.getOS();
var ua = ClientUAInstance.getUA();
var setUa = function setUa(userAgentString) {
  return ClientUAInstance.setUA(userAgentString);
};
var parseUserAgent = function parseUserAgent(userAgent) {
  if (!userAgent) {
    console.error('No userAgent string was provided');
    return;
  }

  var UserAgentInstance = new UAParser(userAgent);
  return {
    UA: UserAgentInstance,
    browser: UserAgentInstance.getBrowser(),
    cpu: UserAgentInstance.getCPU(),
    device: UserAgentInstance.getDevice(),
    engine: UserAgentInstance.getEngine(),
    os: UserAgentInstance.getOS(),
    ua: UserAgentInstance.getUA(),
    setUserAgent: function setUserAgent(userAgentString) {
      return UserAgentInstance.setUA(userAgentString);
    }
  };
};

var UAHelper = /*#__PURE__*/Object.freeze({
  ClientUAInstance: ClientUAInstance,
  browser: browser,
  cpu: cpu,
  device: device,
  engine: engine,
  os: os,
  ua: ua,
  setUa: setUa,
  parseUserAgent: parseUserAgent
});

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var DeviceTypes = {
  Mobile: 'mobile',
  Tablet: 'tablet',
  SmartTv: 'smarttv',
  Console: 'console',
  Wearable: 'wearable',
  Embedded: 'embedded',
  Browser: undefined
};
var BrowserTypes = {
  Chrome: 'Chrome',
  Firefox: 'Firefox',
  Opera: 'Opera',
  Yandex: 'Yandex',
  Safari: 'Safari',
  InternetExplorer: 'Internet Explorer',
  Edge: 'Edge',
  Chromium: 'Chromium',
  Ie: 'IE',
  MobileSafari: 'Mobile Safari',
  EdgeChromium: 'Edge Chromium',
  MIUI: 'MIUI Browser',
  SamsungBrowser: 'Samsung Browser'
};
var OsTypes = {
  IOS: 'iOS',
  Android: 'Android',
  WindowsPhone: 'Windows Phone',
  Windows: 'Windows',
  MAC_OS: 'Mac OS'
};
var InitialDeviceTypes = {
  isMobile: false,
  isTablet: false,
  isBrowser: false,
  isSmartTV: false,
  isConsole: false,
  isWearable: false
};

var checkDeviceType = function checkDeviceType(type) {
  switch (type) {
    case DeviceTypes.Mobile:
      return {
        isMobile: true
      };

    case DeviceTypes.Tablet:
      return {
        isTablet: true
      };

    case DeviceTypes.SmartTv:
      return {
        isSmartTV: true
      };

    case DeviceTypes.Console:
      return {
        isConsole: true
      };

    case DeviceTypes.Wearable:
      return {
        isWearable: true
      };

    case DeviceTypes.Browser:
      return {
        isBrowser: true
      };

    case DeviceTypes.Embedded:
      return {
        isEmbedded: true
      };

    default:
      return InitialDeviceTypes;
  }
};
var setUserAgent = function setUserAgent(userAgent) {
  return setUa(userAgent);
};
var setDefaults = function setDefaults(p) {
  var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
  return p ? p : d;
};
var getNavigatorInstance = function getNavigatorInstance() {
  if (typeof window !== 'undefined') {
    if (window.navigator || navigator) {
      return window.navigator || navigator;
    }
  }

  return false;
};
var isIOS13Check = function isIOS13Check(type) {
  var nav = getNavigatorInstance();
  return nav && nav.platform && (nav.platform.indexOf(type) !== -1 || nav.platform === 'MacIntel' && nav.maxTouchPoints > 1 && !window.MSStream);
};

var browserPayload = function browserPayload(isBrowser, browser, engine, os, ua) {
  return {
    isBrowser: isBrowser,
    browserMajorVersion: setDefaults(browser.major),
    browserFullVersion: setDefaults(browser.version),
    browserName: setDefaults(browser.name),
    engineName: setDefaults(engine.name),
    engineVersion: setDefaults(engine.version),
    osName: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    userAgent: setDefaults(ua)
  };
};
var mobilePayload = function mobilePayload(type, device, os, ua) {
  return _objectSpread2({}, type, {
    vendor: setDefaults(device.vendor),
    model: setDefaults(device.model),
    os: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    ua: setDefaults(ua)
  });
};
var smartTvPayload = function smartTvPayload(isSmartTV, engine, os, ua) {
  return {
    isSmartTV: isSmartTV,
    engineName: setDefaults(engine.name),
    engineVersion: setDefaults(engine.version),
    osName: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    userAgent: setDefaults(ua)
  };
};
var consolePayload = function consolePayload(isConsole, engine, os, ua) {
  return {
    isConsole: isConsole,
    engineName: setDefaults(engine.name),
    engineVersion: setDefaults(engine.version),
    osName: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    userAgent: setDefaults(ua)
  };
};
var wearablePayload = function wearablePayload(isWearable, engine, os, ua) {
  return {
    isWearable: isWearable,
    engineName: setDefaults(engine.name),
    engineVersion: setDefaults(engine.version),
    osName: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    userAgent: setDefaults(ua)
  };
};
var embeddedPayload = function embeddedPayload(isEmbedded, device, engine, os, ua) {
  return {
    isEmbedded: isEmbedded,
    vendor: setDefaults(device.vendor),
    model: setDefaults(device.model),
    engineName: setDefaults(engine.name),
    engineVersion: setDefaults(engine.version),
    osName: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    userAgent: setDefaults(ua)
  };
};

function deviceDetect(userAgent) {
  var _ref = userAgent ? parseUserAgent(userAgent) : UAHelper,
      device = _ref.device,
      browser = _ref.browser,
      engine = _ref.engine,
      os = _ref.os,
      ua = _ref.ua;

  var type = checkDeviceType(device.type);
  var isBrowser = type.isBrowser,
      isMobile = type.isMobile,
      isTablet = type.isTablet,
      isSmartTV = type.isSmartTV,
      isConsole = type.isConsole,
      isWearable = type.isWearable,
      isEmbedded = type.isEmbedded;

  if (isBrowser) {
    return browserPayload(isBrowser, browser, engine, os, ua);
  }

  if (isSmartTV) {
    return smartTvPayload(isSmartTV, engine, os, ua);
  }

  if (isConsole) {
    return consolePayload(isConsole, engine, os, ua);
  }

  if (isMobile) {
    return mobilePayload(type, device, os, ua);
  }

  if (isTablet) {
    return mobilePayload(type, device, os, ua);
  }

  if (isWearable) {
    return wearablePayload(isWearable, engine, os, ua);
  }

  if (isEmbedded) {
    return embeddedPayload(isEmbedded, device, engine, os, ua);
  }
}

var isMobileType = function isMobileType(_ref) {
  var type = _ref.type;
  return type === DeviceTypes.Mobile;
};
var isTabletType = function isTabletType(_ref2) {
  var type = _ref2.type;
  return type === DeviceTypes.Tablet;
};
var isMobileAndTabletType = function isMobileAndTabletType(_ref3) {
  var type = _ref3.type;
  return type === DeviceTypes.Mobile || type === DeviceTypes.Tablet;
};
var isSmartTVType = function isSmartTVType(_ref4) {
  var type = _ref4.type;
  return type === DeviceTypes.SmartTv;
};
var isBrowserType = function isBrowserType(_ref5) {
  var type = _ref5.type;
  return type === DeviceTypes.Browser;
};
var isWearableType = function isWearableType(_ref6) {
  var type = _ref6.type;
  return type === DeviceTypes.Wearable;
};
var isConsoleType = function isConsoleType(_ref7) {
  var type = _ref7.type;
  return type === DeviceTypes.Console;
};
var isEmbeddedType = function isEmbeddedType(_ref8) {
  var type = _ref8.type;
  return type === DeviceTypes.Embedded;
};
var getMobileVendor = function getMobileVendor(_ref9) {
  var vendor = _ref9.vendor;
  return setDefaults(vendor);
};
var getMobileModel = function getMobileModel(_ref10) {
  var model = _ref10.model;
  return setDefaults(model);
};
var getDeviceType = function getDeviceType(_ref11) {
  var type = _ref11.type;
  return setDefaults(type, 'browser');
}; // os types

var isAndroidType = function isAndroidType(_ref12) {
  var name = _ref12.name;
  return name === OsTypes.Android;
};
var isWindowsType = function isWindowsType(_ref13) {
  var name = _ref13.name;
  return name === OsTypes.Windows;
};
var isMacOsType = function isMacOsType(_ref14) {
  var name = _ref14.name;
  return name === OsTypes.MAC_OS;
};
var isWinPhoneType = function isWinPhoneType(_ref15) {
  var name = _ref15.name;
  return name === OsTypes.WindowsPhone;
};
var isIOSType = function isIOSType(_ref16) {
  var name = _ref16.name;
  return name === OsTypes.IOS;
};
var getOsVersion = function getOsVersion(_ref17) {
  var version = _ref17.version;
  return setDefaults(version);
};
var getOsName = function getOsName(_ref18) {
  var name = _ref18.name;
  return setDefaults(name);
}; // browser types

var isChromeType = function isChromeType(_ref19) {
  var name = _ref19.name;
  return name === BrowserTypes.Chrome;
};
var isFirefoxType = function isFirefoxType(_ref20) {
  var name = _ref20.name;
  return name === BrowserTypes.Firefox;
};
var isChromiumType = function isChromiumType(_ref21) {
  var name = _ref21.name;
  return name === BrowserTypes.Chromium;
};
var isEdgeType = function isEdgeType(_ref22) {
  var name = _ref22.name;
  return name === BrowserTypes.Edge;
};
var isYandexType = function isYandexType(_ref23) {
  var name = _ref23.name;
  return name === BrowserTypes.Yandex;
};
var isSafariType = function isSafariType(_ref24) {
  var name = _ref24.name;
  return name === BrowserTypes.Safari || name === BrowserTypes.MobileSafari;
};
var isMobileSafariType = function isMobileSafariType(_ref25) {
  var name = _ref25.name;
  return name === BrowserTypes.MobileSafari;
};
var isOperaType = function isOperaType(_ref26) {
  var name = _ref26.name;
  return name === BrowserTypes.Opera;
};
var isIEType = function isIEType(_ref27) {
  var name = _ref27.name;
  return name === BrowserTypes.InternetExplorer || name === BrowserTypes.Ie;
};
var isMIUIType = function isMIUIType(_ref28) {
  var name = _ref28.name;
  return name === BrowserTypes.MIUI;
};
var isSamsungBrowserType = function isSamsungBrowserType(_ref29) {
  var name = _ref29.name;
  return name === BrowserTypes.SamsungBrowser;
};
var getBrowserFullVersion = function getBrowserFullVersion(_ref30) {
  var version = _ref30.version;
  return setDefaults(version);
};
var getBrowserVersion = function getBrowserVersion(_ref31) {
  var major = _ref31.major;
  return setDefaults(major);
};
var getBrowserName = function getBrowserName(_ref32) {
  var name = _ref32.name;
  return setDefaults(name);
}; // engine types

var getEngineName = function getEngineName(_ref33) {
  var name = _ref33.name;
  return setDefaults(name);
};
var getEngineVersion = function getEngineVersion(_ref34) {
  var version = _ref34.version;
  return setDefaults(version);
};
var isElectronType = function isElectronType() {
  var nav = getNavigatorInstance();
  var ua = nav && nav.userAgent && nav.userAgent.toLowerCase();
  return typeof ua === 'string' ? /electron/.test(ua) : false;
};
var isEdgeChromiumType = function isEdgeChromiumType(ua) {
  return typeof ua === 'string' && ua.indexOf('Edg/') !== -1;
};
var getIOS13 = function getIOS13() {
  var nav = getNavigatorInstance();
  return nav && (/iPad|iPhone|iPod/.test(nav.platform) || nav.platform === 'MacIntel' && nav.maxTouchPoints > 1) && !window.MSStream;
};
var getIPad13 = function getIPad13() {
  return isIOS13Check('iPad');
};
var getIphone13 = function getIphone13() {
  return isIOS13Check('iPhone');
};
var getIPod13 = function getIPod13() {
  return isIOS13Check('iPod');
};
var getUseragent = function getUseragent(userAg) {
  return setDefaults(userAg);
};

function buildSelectorsObject(options) {
  var _ref = options ? options : UAHelper,
      device = _ref.device,
      browser = _ref.browser,
      os = _ref.os,
      engine = _ref.engine,
      ua = _ref.ua;

  return {
    isSmartTV: isSmartTVType(device),
    isConsole: isConsoleType(device),
    isWearable: isWearableType(device),
    isEmbedded: isEmbeddedType(device),
    isMobileSafari: isMobileSafariType(browser) || getIPad13(),
    isChromium: isChromiumType(browser),
    isMobile: isMobileAndTabletType(device) || getIPad13(),
    isMobileOnly: isMobileType(device),
    isTablet: isTabletType(device) || getIPad13(),
    isBrowser: isBrowserType(device),
    isDesktop: isBrowserType(device),
    isAndroid: isAndroidType(os),
    isWinPhone: isWinPhoneType(os),
    isIOS: isIOSType(os) || getIPad13(),
    isChrome: isChromeType(browser),
    isFirefox: isFirefoxType(browser),
    isSafari: isSafariType(browser),
    isOpera: isOperaType(browser),
    isIE: isIEType(browser),
    osVersion: getOsVersion(os),
    osName: getOsName(os),
    fullBrowserVersion: getBrowserFullVersion(browser),
    browserVersion: getBrowserVersion(browser),
    browserName: getBrowserName(browser),
    mobileVendor: getMobileVendor(device),
    mobileModel: getMobileModel(device),
    engineName: getEngineName(engine),
    engineVersion: getEngineVersion(engine),
    getUA: getUseragent(ua),
    isEdge: isEdgeType(browser) || isEdgeChromiumType(ua),
    isYandex: isYandexType(browser),
    deviceType: getDeviceType(device),
    isIOS13: getIOS13(),
    isIPad13: getIPad13(),
    isIPhone13: getIphone13(),
    isIPod13: getIPod13(),
    isElectron: isElectronType(),
    isEdgeChromium: isEdgeChromiumType(ua),
    isLegacyEdge: isEdgeType(browser) && !isEdgeChromiumType(ua),
    isWindows: isWindowsType(os),
    isMacOs: isMacOsType(os),
    isMIUI: isMIUIType(browser),
    isSamsungBrowser: isSamsungBrowserType(browser)
  };
}

var isSmartTV = isSmartTVType(device);
var isConsole = isConsoleType(device);
var isWearable = isWearableType(device);
var isEmbedded = isEmbeddedType(device);
var isMobileSafari = isMobileSafariType(browser) || getIPad13();
var isChromium = isChromiumType(browser);
var isMobile = isMobileAndTabletType(device) || getIPad13();
var isMobileOnly = isMobileType(device);
var isTablet = isTabletType(device) || getIPad13();
var isBrowser = isBrowserType(device);
var isDesktop = isBrowserType(device);
var isAndroid = isAndroidType(os);
var isWinPhone = isWinPhoneType(os);
var isIOS = isIOSType(os) || getIPad13();
var isChrome = isChromeType(browser);
var isFirefox = isFirefoxType(browser);
var isSafari = isSafariType(browser);
var isOpera = isOperaType(browser);
var isIE = isIEType(browser);
var osVersion = getOsVersion(os);
var osName = getOsName(os);
var fullBrowserVersion = getBrowserFullVersion(browser);
var browserVersion = getBrowserVersion(browser);
var browserName = getBrowserName(browser);
var mobileVendor = getMobileVendor(device);
var mobileModel = getMobileModel(device);
var engineName = getEngineName(engine);
var engineVersion = getEngineVersion(engine);
var getUA = getUseragent(ua);
var isEdge = isEdgeType(browser) || isEdgeChromiumType(ua);
var isYandex = isYandexType(browser);
var deviceType = getDeviceType(device);
var isIOS13 = getIOS13();
var isIPad13 = getIPad13();
var isIPhone13 = getIphone13();
var isIPod13 = getIPod13();
var isElectron = isElectronType();
var isEdgeChromium = isEdgeChromiumType(ua);
var isLegacyEdge = isEdgeType(browser) && !isEdgeChromiumType(ua);
var isWindows = isWindowsType(os);
var isMacOs = isMacOsType(os);
var isMIUI = isMIUIType(browser);
var isSamsungBrowser = isSamsungBrowserType(browser);
var getSelectorsByUserAgent = function getSelectorsByUserAgent(userAgent) {
  if (!userAgent || typeof userAgent !== 'string') {
    console.error('No valid user agent string was provided');
    return;
  }

  var _UAHelper$parseUserAg = parseUserAgent(userAgent),
      device = _UAHelper$parseUserAg.device,
      browser = _UAHelper$parseUserAg.browser,
      os = _UAHelper$parseUserAg.os,
      engine = _UAHelper$parseUserAg.engine,
      ua = _UAHelper$parseUserAg.ua;

  return buildSelectorsObject({
    device: device,
    browser: browser,
    os: os,
    engine: engine,
    ua: ua
  });
};

var AndroidView = function AndroidView(_ref) {
  var renderWithFragment = _ref.renderWithFragment,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ["renderWithFragment", "children"]);

  return isAndroid ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
};
var BrowserView = function BrowserView(_ref2) {
  var renderWithFragment = _ref2.renderWithFragment,
      children = _ref2.children,
      props = _objectWithoutProperties(_ref2, ["renderWithFragment", "children"]);

  return isBrowser ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
};
var IEView = function IEView(_ref3) {
  var renderWithFragment = _ref3.renderWithFragment,
      children = _ref3.children,
      props = _objectWithoutProperties(_ref3, ["renderWithFragment", "children"]);

  return isIE ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
};
var IOSView = function IOSView(_ref4) {
  var renderWithFragment = _ref4.renderWithFragment,
      children = _ref4.children,
      props = _objectWithoutProperties(_ref4, ["renderWithFragment", "children"]);

  return isIOS ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
};
var MobileView = function MobileView(_ref5) {
  var renderWithFragment = _ref5.renderWithFragment,
      children = _ref5.children,
      props = _objectWithoutProperties(_ref5, ["renderWithFragment", "children"]);

  return isMobile ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
};
var TabletView = function TabletView(_ref6) {
  var renderWithFragment = _ref6.renderWithFragment,
      children = _ref6.children,
      props = _objectWithoutProperties(_ref6, ["renderWithFragment", "children"]);

  return isTablet ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
};
var WinPhoneView = function WinPhoneView(_ref7) {
  var renderWithFragment = _ref7.renderWithFragment,
      children = _ref7.children,
      props = _objectWithoutProperties(_ref7, ["renderWithFragment", "children"]);

  return isWinPhone ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
};
var MobileOnlyView = function MobileOnlyView(_ref8) {
  var renderWithFragment = _ref8.renderWithFragment,
      children = _ref8.children,
      viewClassName = _ref8.viewClassName,
      style = _ref8.style,
      props = _objectWithoutProperties(_ref8, ["renderWithFragment", "children", "viewClassName", "style"]);

  return isMobileOnly ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
};
var SmartTVView = function SmartTVView(_ref9) {
  var renderWithFragment = _ref9.renderWithFragment,
      children = _ref9.children,
      props = _objectWithoutProperties(_ref9, ["renderWithFragment", "children"]);

  return isSmartTV ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
};
var ConsoleView = function ConsoleView(_ref10) {
  var renderWithFragment = _ref10.renderWithFragment,
      children = _ref10.children,
      props = _objectWithoutProperties(_ref10, ["renderWithFragment", "children"]);

  return isConsole ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
};
var WearableView = function WearableView(_ref11) {
  var renderWithFragment = _ref11.renderWithFragment,
      children = _ref11.children,
      props = _objectWithoutProperties(_ref11, ["renderWithFragment", "children"]);

  return isWearable ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
};
var CustomView = function CustomView(_ref12) {
  var renderWithFragment = _ref12.renderWithFragment,
      children = _ref12.children,
      viewClassName = _ref12.viewClassName,
      style = _ref12.style,
      condition = _ref12.condition,
      props = _objectWithoutProperties(_ref12, ["renderWithFragment", "children", "viewClassName", "style", "condition"]);

  return condition ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
};

function withOrientationChange(WrappedComponent) {
  return /*#__PURE__*/function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class(props) {
      var _this;

      _classCallCheck(this, _class);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, props));
      _this.isEventListenerAdded = false;
      _this.handleOrientationChange = _this.handleOrientationChange.bind(_assertThisInitialized(_this));
      _this.onOrientationChange = _this.onOrientationChange.bind(_assertThisInitialized(_this));
      _this.onPageLoad = _this.onPageLoad.bind(_assertThisInitialized(_this));
      _this.state = {
        isLandscape: false,
        isPortrait: false
      };
      return _this;
    }

    _createClass(_class, [{
      key: "handleOrientationChange",
      value: function handleOrientationChange() {
        if (!this.isEventListenerAdded) {
          this.isEventListenerAdded = true;
        }

        var orientation = window.innerWidth > window.innerHeight ? 90 : 0;
        this.setState({
          isPortrait: orientation === 0,
          isLandscape: orientation === 90
        });
      }
    }, {
      key: "onOrientationChange",
      value: function onOrientationChange() {
        this.handleOrientationChange();
      }
    }, {
      key: "onPageLoad",
      value: function onPageLoad() {
        this.handleOrientationChange();
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== undefined && isMobile) {
          if (!this.isEventListenerAdded) {
            this.handleOrientationChange();
            window.addEventListener("load", this.onPageLoad, false);
          } else {
            window.removeEventListener("load", this.onPageLoad, false);
          }

          window.addEventListener("resize", this.onOrientationChange, false);
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        window.removeEventListener("resize", this.onOrientationChange, false);
      }
    }, {
      key: "render",
      value: function render() {
        return React__default.createElement(WrappedComponent, _extends({}, this.props, {
          isLandscape: this.state.isLandscape,
          isPortrait: this.state.isPortrait
        }));
      }
    }]);

    return _class;
  }(React__default.Component);
}

function useMobileOrientation() {
  var _useState = React.useState(function () {
    var orientation = window.innerWidth > window.innerHeight ? 90 : 0;
    return {
      isPortrait: orientation === 0,
      isLandscape: orientation === 90,
      orientation: orientation === 0 ? 'portrait' : 'landscape'
    };
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var handleOrientationChange = React.useCallback(function () {
    var orientation = window.innerWidth > window.innerHeight ? 90 : 0;
    var next = {
      isPortrait: orientation === 0,
      isLandscape: orientation === 90,
      orientation: orientation === 0 ? 'portrait' : 'landscape'
    };
    state.orientation !== next.orientation && setState(next);
  }, [state.orientation]);
  React.useEffect(function () {
    if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== undefined && isMobile) {
      handleOrientationChange();
      window.addEventListener("load", handleOrientationChange, false);
      window.addEventListener("resize", handleOrientationChange, false);
    }

    return function () {
      window.removeEventListener("resize", handleOrientationChange, false);
      window.removeEventListener("load", handleOrientationChange, false);
    };
  }, [handleOrientationChange]);
  return state;
}

function useDeviceData(userAgent) {
  var hookUserAgent = userAgent ? userAgent : window.navigator.userAgent;
  return parseUserAgent(hookUserAgent);
}

function useDeviceSelectors(userAgent) {
  var hookUserAgent = userAgent ? userAgent : window.navigator.userAgent;
  var deviceData = useDeviceData(hookUserAgent);
  var selectors = buildSelectorsObject(deviceData);
  return [selectors, deviceData];
}

exports.AndroidView = AndroidView;
exports.BrowserTypes = BrowserTypes;
exports.BrowserView = BrowserView;
exports.ConsoleView = ConsoleView;
exports.CustomView = CustomView;
exports.IEView = IEView;
exports.IOSView = IOSView;
exports.MobileOnlyView = MobileOnlyView;
exports.MobileView = MobileView;
exports.OsTypes = OsTypes;
exports.SmartTVView = SmartTVView;
exports.TabletView = TabletView;
exports.WearableView = WearableView;
exports.WinPhoneView = WinPhoneView;
exports.browserName = browserName;
exports.browserVersion = browserVersion;
exports.deviceDetect = deviceDetect;
exports.deviceType = deviceType;
exports.engineName = engineName;
exports.engineVersion = engineVersion;
exports.fullBrowserVersion = fullBrowserVersion;
exports.getSelectorsByUserAgent = getSelectorsByUserAgent;
exports.getUA = getUA;
exports.isAndroid = isAndroid;
exports.isBrowser = isBrowser;
exports.isChrome = isChrome;
exports.isChromium = isChromium;
exports.isConsole = isConsole;
exports.isDesktop = isDesktop;
exports.isEdge = isEdge;
exports.isEdgeChromium = isEdgeChromium;
exports.isElectron = isElectron;
exports.isEmbedded = isEmbedded;
exports.isFirefox = isFirefox;
exports.isIE = isIE;
exports.isIOS = isIOS;
exports.isIOS13 = isIOS13;
exports.isIPad13 = isIPad13;
exports.isIPhone13 = isIPhone13;
exports.isIPod13 = isIPod13;
exports.isLegacyEdge = isLegacyEdge;
exports.isMIUI = isMIUI;
exports.isMacOs = isMacOs;
exports.isMobile = isMobile;
exports.isMobileOnly = isMobileOnly;
exports.isMobileSafari = isMobileSafari;
exports.isOpera = isOpera;
exports.isSafari = isSafari;
exports.isSamsungBrowser = isSamsungBrowser;
exports.isSmartTV = isSmartTV;
exports.isTablet = isTablet;
exports.isWearable = isWearable;
exports.isWinPhone = isWinPhone;
exports.isWindows = isWindows;
exports.isYandex = isYandex;
exports.mobileModel = mobileModel;
exports.mobileVendor = mobileVendor;
exports.osName = osName;
exports.osVersion = osVersion;
exports.parseUserAgent = parseUserAgent;
exports.setUserAgent = setUserAgent;
exports.useDeviceData = useDeviceData;
exports.useDeviceSelectors = useDeviceSelectors;
exports.useMobileOrientation = useMobileOrientation;
exports.withOrientationChange = withOrientationChange;


/***/ }),

/***/ "./node_modules/react-device-detect/node_modules/ua-parser-js/dist/ua-parser.min.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/react-device-detect/node_modules/ua-parser-js/dist/ua-parser.min.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* UAParser.js v1.0.39
   Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
   MIT License */
(function(window,undefined){"use strict";var LIBVERSION="1.0.39",EMPTY="",UNKNOWN="?",FUNC_TYPE="function",UNDEF_TYPE="undefined",OBJ_TYPE="object",STR_TYPE="string",MAJOR="major",MODEL="model",NAME="name",TYPE="type",VENDOR="vendor",VERSION="version",ARCHITECTURE="architecture",CONSOLE="console",MOBILE="mobile",TABLET="tablet",SMARTTV="smarttv",WEARABLE="wearable",EMBEDDED="embedded",UA_MAX_LENGTH=500;var AMAZON="Amazon",APPLE="Apple",ASUS="ASUS",BLACKBERRY="BlackBerry",BROWSER="Browser",CHROME="Chrome",EDGE="Edge",FIREFOX="Firefox",GOOGLE="Google",HUAWEI="Huawei",LG="LG",MICROSOFT="Microsoft",MOTOROLA="Motorola",OPERA="Opera",SAMSUNG="Samsung",SHARP="Sharp",SONY="Sony",XIAOMI="Xiaomi",ZEBRA="Zebra",FACEBOOK="Facebook",CHROMIUM_OS="Chromium OS",MAC_OS="Mac OS",SUFFIX_BROWSER=" Browser";var extend=function(regexes,extensions){var mergedRegexes={};for(var i in regexes){if(extensions[i]&&extensions[i].length%2===0){mergedRegexes[i]=extensions[i].concat(regexes[i])}else{mergedRegexes[i]=regexes[i]}}return mergedRegexes},enumerize=function(arr){var enums={};for(var i=0;i<arr.length;i++){enums[arr[i].toUpperCase()]=arr[i]}return enums},has=function(str1,str2){return typeof str1===STR_TYPE?lowerize(str2).indexOf(lowerize(str1))!==-1:false},lowerize=function(str){return str.toLowerCase()},majorize=function(version){return typeof version===STR_TYPE?version.replace(/[^\d\.]/g,EMPTY).split(".")[0]:undefined},trim=function(str,len){if(typeof str===STR_TYPE){str=str.replace(/^\s\s*/,EMPTY);return typeof len===UNDEF_TYPE?str:str.substring(0,UA_MAX_LENGTH)}};var rgxMapper=function(ua,arrays){var i=0,j,k,p,q,matches,match;while(i<arrays.length&&!matches){var regex=arrays[i],props=arrays[i+1];j=k=0;while(j<regex.length&&!matches){if(!regex[j]){break}matches=regex[j++].exec(ua);if(!!matches){for(p=0;p<props.length;p++){match=matches[++k];q=props[p];if(typeof q===OBJ_TYPE&&q.length>0){if(q.length===2){if(typeof q[1]==FUNC_TYPE){this[q[0]]=q[1].call(this,match)}else{this[q[0]]=q[1]}}else if(q.length===3){if(typeof q[1]===FUNC_TYPE&&!(q[1].exec&&q[1].test)){this[q[0]]=match?q[1].call(this,match,q[2]):undefined}else{this[q[0]]=match?match.replace(q[1],q[2]):undefined}}else if(q.length===4){this[q[0]]=match?q[3].call(this,match.replace(q[1],q[2])):undefined}}else{this[q]=match?match:undefined}}}}i+=2}},strMapper=function(str,map){for(var i in map){if(typeof map[i]===OBJ_TYPE&&map[i].length>0){for(var j=0;j<map[i].length;j++){if(has(map[i][j],str)){return i===UNKNOWN?undefined:i}}}else if(has(map[i],str)){return i===UNKNOWN?undefined:i}}return map.hasOwnProperty("*")?map["*"]:str};var oldSafariMap={"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"},windowsVersionMap={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"};var regexes={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[VERSION,[NAME,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[VERSION,[NAME,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[NAME,VERSION],[/opios[\/ ]+([\w\.]+)/i],[VERSION,[NAME,OPERA+" Mini"]],[/\bop(?:rg)?x\/([\w\.]+)/i],[VERSION,[NAME,OPERA+" GX"]],[/\bopr\/([\w\.]+)/i],[VERSION,[NAME,OPERA]],[/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i],[VERSION,[NAME,"Baidu"]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[\/ ]?([\w\.]*)/i,/(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio)\/([-\w\.]+)/i,/(heytap|ovi)browser\/([\d\.]+)/i,/(weibo)__([\d\.]+)/i],[NAME,VERSION],[/quark(?:pc)?\/([-\w\.]+)/i],[VERSION,[NAME,"Quark"]],[/\bddg\/([\w\.]+)/i],[VERSION,[NAME,"DuckDuckGo"]],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[VERSION,[NAME,"UC"+BROWSER]],[/microm.+\bqbcore\/([\w\.]+)/i,/\bqbcore\/([\w\.]+).+microm/i,/micromessenger\/([\w\.]+)/i],[VERSION,[NAME,"WeChat"]],[/konqueror\/([\w\.]+)/i],[VERSION,[NAME,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[VERSION,[NAME,"IE"]],[/ya(?:search)?browser\/([\w\.]+)/i],[VERSION,[NAME,"Yandex"]],[/slbrowser\/([\w\.]+)/i],[VERSION,[NAME,"Smart Lenovo "+BROWSER]],[/(avast|avg)\/([\w\.]+)/i],[[NAME,/(.+)/,"$1 Secure "+BROWSER],VERSION],[/\bfocus\/([\w\.]+)/i],[VERSION,[NAME,FIREFOX+" Focus"]],[/\bopt\/([\w\.]+)/i],[VERSION,[NAME,OPERA+" Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[VERSION,[NAME,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[VERSION,[NAME,"Dolphin"]],[/coast\/([\w\.]+)/i],[VERSION,[NAME,OPERA+" Coast"]],[/miuibrowser\/([\w\.]+)/i],[VERSION,[NAME,"MIUI "+BROWSER]],[/fxios\/([-\w\.]+)/i],[VERSION,[NAME,FIREFOX]],[/\bqihu|(qi?ho?o?|360)browser/i],[[NAME,"360"+SUFFIX_BROWSER]],[/\b(qq)\/([\w\.]+)/i],[[NAME,/(.+)/,"$1Browser"],VERSION],[/(oculus|sailfish|huawei|vivo|pico)browser\/([\w\.]+)/i],[[NAME,/(.+)/,"$1"+SUFFIX_BROWSER],VERSION],[/samsungbrowser\/([\w\.]+)/i],[VERSION,[NAME,SAMSUNG+" Internet"]],[/(comodo_dragon)\/([\w\.]+)/i],[[NAME,/_/g," "],VERSION],[/metasr[\/ ]?([\d\.]+)/i],[VERSION,[NAME,"Sogou Explorer"]],[/(sogou)mo\w+\/([\d\.]+)/i],[[NAME,"Sogou Mobile"],VERSION],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i],[NAME,VERSION],[/(lbbrowser|rekonq)/i,/\[(linkedin)app\]/i],[NAME],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[NAME,FACEBOOK],VERSION],[/(Klarna)\/([\w\.]+)/i,/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(alipay)client\/([\w\.]+)/i,/(twitter)(?:and| f.+e\/([\w\.]+))/i,/(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i],[NAME,VERSION],[/\bgsa\/([\w\.]+) .*safari\//i],[VERSION,[NAME,"GSA"]],[/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],[VERSION,[NAME,"TikTok"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[VERSION,[NAME,CHROME+" Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[NAME,CHROME+" WebView"],VERSION],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[VERSION,[NAME,"Android "+BROWSER]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[NAME,VERSION],[/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],[VERSION,[NAME,"Mobile Safari"]],[/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],[VERSION,NAME],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[NAME,[VERSION,strMapper,oldSafariMap]],[/(webkit|khtml)\/([\w\.]+)/i],[NAME,VERSION],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[NAME,"Netscape"],VERSION],[/(wolvic)\/([\w\.]+)/i],[NAME,VERSION],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[VERSION,[NAME,FIREFOX+" Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i],[NAME,[VERSION,/_/g,"."]],[/(cobalt)\/([\w\.]+)/i],[NAME,[VERSION,/master.|lts./,""]]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[[ARCHITECTURE,"amd64"]],[/(ia32(?=;))/i],[[ARCHITECTURE,lowerize]],[/((?:i[346]|x)86)[;\)]/i],[[ARCHITECTURE,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[ARCHITECTURE,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[ARCHITECTURE,"armhf"]],[/windows (ce|mobile); ppc;/i],[[ARCHITECTURE,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[ARCHITECTURE,/ower/,EMPTY,lowerize]],[/(sun4\w)[;\)]/i],[[ARCHITECTURE,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[ARCHITECTURE,lowerize]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[MODEL,[VENDOR,SAMSUNG],[TYPE,TABLET]],[/\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,/samsung[- ]((?!sm-[lr])[-\w]+)/i,/sec-(sgh\w+)/i],[MODEL,[VENDOR,SAMSUNG],[TYPE,MOBILE]],[/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],[MODEL,[VENDOR,APPLE],[TYPE,MOBILE]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[MODEL,[VENDOR,APPLE],[TYPE,TABLET]],[/(macintosh);/i],[MODEL,[VENDOR,APPLE]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[MODEL,[VENDOR,SHARP],[TYPE,MOBILE]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[MODEL,[VENDOR,HUAWEI],[TYPE,TABLET]],[/(?:huawei|honor)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],[MODEL,[VENDOR,HUAWEI],[TYPE,MOBILE]],[/\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite|pro)?)(?: bui|\))/i],[[MODEL,/_/g," "],[VENDOR,XIAOMI],[TYPE,MOBILE]],[/oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[MODEL,/_/g," "],[VENDOR,XIAOMI],[TYPE,TABLET]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[MODEL,[VENDOR,"OPPO"],[TYPE,MOBILE]],[/\b(opd2\d{3}a?) bui/i],[MODEL,[VENDOR,"OPPO"],[TYPE,TABLET]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[MODEL,[VENDOR,"Vivo"],[TYPE,MOBILE]],[/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],[MODEL,[VENDOR,"Realme"],[TYPE,MOBILE]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[MODEL,[VENDOR,MOTOROLA],[TYPE,MOBILE]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[MODEL,[VENDOR,MOTOROLA],[TYPE,TABLET]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[MODEL,[VENDOR,LG],[TYPE,TABLET]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[MODEL,[VENDOR,LG],[TYPE,MOBILE]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[MODEL,[VENDOR,"Lenovo"],[TYPE,TABLET]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[MODEL,/_/g," "],[VENDOR,"Nokia"],[TYPE,MOBILE]],[/(pixel c)\b/i],[MODEL,[VENDOR,GOOGLE],[TYPE,TABLET]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[MODEL,[VENDOR,GOOGLE],[TYPE,MOBILE]],[/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[MODEL,[VENDOR,SONY],[TYPE,MOBILE]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[MODEL,"Xperia Tablet"],[VENDOR,SONY],[TYPE,TABLET]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[MODEL,[VENDOR,"OnePlus"],[TYPE,MOBILE]],[/(alexa)webm/i,/(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[MODEL,[VENDOR,AMAZON],[TYPE,TABLET]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[MODEL,/(.+)/g,"Fire Phone $1"],[VENDOR,AMAZON],[TYPE,MOBILE]],[/(playbook);[-\w\),; ]+(rim)/i],[MODEL,VENDOR,[TYPE,TABLET]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[MODEL,[VENDOR,BLACKBERRY],[TYPE,MOBILE]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[MODEL,[VENDOR,ASUS],[TYPE,TABLET]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[MODEL,[VENDOR,ASUS],[TYPE,MOBILE]],[/(nexus 9)/i],[MODEL,[VENDOR,"HTC"],[TYPE,TABLET]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],[VENDOR,[MODEL,/_/g," "],[TYPE,MOBILE]],[/droid [\w\.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])\w*(\)| bui)/i],[MODEL,[VENDOR,"TCL"],[TYPE,TABLET]],[/(itel) ((\w+))/i],[[VENDOR,lowerize],MODEL,[TYPE,strMapper,{tablet:["p10001l","w7001"],"*":"mobile"}]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[MODEL,[VENDOR,"Acer"],[TYPE,TABLET]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[MODEL,[VENDOR,"Meizu"],[TYPE,MOBILE]],[/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],[MODEL,[VENDOR,"Ulefone"],[TYPE,MOBILE]],[/droid.+; (a(?:015|06[35]|142p?))/i],[MODEL,[VENDOR,"Nothing"],[TYPE,MOBILE]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[VENDOR,MODEL,[TYPE,MOBILE]],[/(kobo)\s(ereader|touch)/i,/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[VENDOR,MODEL,[TYPE,TABLET]],[/(surface duo)/i],[MODEL,[VENDOR,MICROSOFT],[TYPE,TABLET]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[MODEL,[VENDOR,"Fairphone"],[TYPE,MOBILE]],[/(u304aa)/i],[MODEL,[VENDOR,"AT&T"],[TYPE,MOBILE]],[/\bsie-(\w*)/i],[MODEL,[VENDOR,"Siemens"],[TYPE,MOBILE]],[/\b(rct\w+) b/i],[MODEL,[VENDOR,"RCA"],[TYPE,TABLET]],[/\b(venue[\d ]{2,7}) b/i],[MODEL,[VENDOR,"Dell"],[TYPE,TABLET]],[/\b(q(?:mv|ta)\w+) b/i],[MODEL,[VENDOR,"Verizon"],[TYPE,TABLET]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[MODEL,[VENDOR,"Barnes & Noble"],[TYPE,TABLET]],[/\b(tm\d{3}\w+) b/i],[MODEL,[VENDOR,"NuVision"],[TYPE,TABLET]],[/\b(k88) b/i],[MODEL,[VENDOR,"ZTE"],[TYPE,TABLET]],[/\b(nx\d{3}j) b/i],[MODEL,[VENDOR,"ZTE"],[TYPE,MOBILE]],[/\b(gen\d{3}) b.+49h/i],[MODEL,[VENDOR,"Swiss"],[TYPE,MOBILE]],[/\b(zur\d{3}) b/i],[MODEL,[VENDOR,"Swiss"],[TYPE,TABLET]],[/\b((zeki)?tb.*\b) b/i],[MODEL,[VENDOR,"Zeki"],[TYPE,TABLET]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[VENDOR,"Dragon Touch"],MODEL,[TYPE,TABLET]],[/\b(ns-?\w{0,9}) b/i],[MODEL,[VENDOR,"Insignia"],[TYPE,TABLET]],[/\b((nxa|next)-?\w{0,9}) b/i],[MODEL,[VENDOR,"NextBook"],[TYPE,TABLET]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[VENDOR,"Voice"],MODEL,[TYPE,MOBILE]],[/\b(lvtel\-)?(v1[12]) b/i],[[VENDOR,"LvTel"],MODEL,[TYPE,MOBILE]],[/\b(ph-1) /i],[MODEL,[VENDOR,"Essential"],[TYPE,MOBILE]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[MODEL,[VENDOR,"Envizen"],[TYPE,TABLET]],[/\b(trio[-\w\. ]+) b/i],[MODEL,[VENDOR,"MachSpeed"],[TYPE,TABLET]],[/\btu_(1491) b/i],[MODEL,[VENDOR,"Rotor"],[TYPE,TABLET]],[/(shield[\w ]+) b/i],[MODEL,[VENDOR,"Nvidia"],[TYPE,TABLET]],[/(sprint) (\w+)/i],[VENDOR,MODEL,[TYPE,MOBILE]],[/(kin\.[onetw]{3})/i],[[MODEL,/\./g," "],[VENDOR,MICROSOFT],[TYPE,MOBILE]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[MODEL,[VENDOR,ZEBRA],[TYPE,TABLET]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[MODEL,[VENDOR,ZEBRA],[TYPE,MOBILE]],[/smart-tv.+(samsung)/i],[VENDOR,[TYPE,SMARTTV]],[/hbbtv.+maple;(\d+)/i],[[MODEL,/^/,"SmartTV"],[VENDOR,SAMSUNG],[TYPE,SMARTTV]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[VENDOR,LG],[TYPE,SMARTTV]],[/(apple) ?tv/i],[VENDOR,[MODEL,APPLE+" TV"],[TYPE,SMARTTV]],[/crkey/i],[[MODEL,CHROME+"cast"],[VENDOR,GOOGLE],[TYPE,SMARTTV]],[/droid.+aft(\w+)( bui|\))/i],[MODEL,[VENDOR,AMAZON],[TYPE,SMARTTV]],[/\(dtv[\);].+(aquos)/i,/(aquos-tv[\w ]+)\)/i],[MODEL,[VENDOR,SHARP],[TYPE,SMARTTV]],[/(bravia[\w ]+)( bui|\))/i],[MODEL,[VENDOR,SONY],[TYPE,SMARTTV]],[/(mitv-\w{5}) bui/i],[MODEL,[VENDOR,XIAOMI],[TYPE,SMARTTV]],[/Hbbtv.*(technisat) (.*);/i],[VENDOR,MODEL,[TYPE,SMARTTV]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],[[VENDOR,trim],[MODEL,trim],[TYPE,SMARTTV]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[TYPE,SMARTTV]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[VENDOR,MODEL,[TYPE,CONSOLE]],[/droid.+; (shield) bui/i],[MODEL,[VENDOR,"Nvidia"],[TYPE,CONSOLE]],[/(playstation [345portablevi]+)/i],[MODEL,[VENDOR,SONY],[TYPE,CONSOLE]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[MODEL,[VENDOR,MICROSOFT],[TYPE,CONSOLE]],[/\b(sm-[lr]\d\d[05][fnuw]?s?)\b/i],[MODEL,[VENDOR,SAMSUNG],[TYPE,WEARABLE]],[/((pebble))app/i],[VENDOR,MODEL,[TYPE,WEARABLE]],[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],[MODEL,[VENDOR,APPLE],[TYPE,WEARABLE]],[/droid.+; (glass) \d/i],[MODEL,[VENDOR,GOOGLE],[TYPE,WEARABLE]],[/droid.+; (wt63?0{2,3})\)/i],[MODEL,[VENDOR,ZEBRA],[TYPE,WEARABLE]],[/(quest( \d| pro)?)/i],[MODEL,[VENDOR,FACEBOOK],[TYPE,WEARABLE]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[VENDOR,[TYPE,EMBEDDED]],[/(aeobc)\b/i],[MODEL,[VENDOR,AMAZON],[TYPE,EMBEDDED]],[/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i],[MODEL,[TYPE,MOBILE]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[MODEL,[TYPE,TABLET]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[TYPE,TABLET]],[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],[[TYPE,MOBILE]],[/(android[-\w\. ]{0,9});.+buil/i],[MODEL,[VENDOR,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[VERSION,[NAME,EDGE+"HTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[VERSION,[NAME,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i,/\b(libweb)/i],[NAME,VERSION],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[VERSION,NAME]],os:[[/microsoft (windows) (vista|xp)/i],[NAME,VERSION],[/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i],[NAME,[VERSION,strMapper,windowsVersionMap]],[/windows nt 6\.2; (arm)/i,/windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,/(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[VERSION,strMapper,windowsVersionMap],[NAME,"Windows"]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,/cfnetwork\/.+darwin/i],[[VERSION,/_/g,"."],[NAME,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[NAME,MAC_OS],[VERSION,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],[VERSION,NAME],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[NAME,VERSION],[/\(bb(10);/i],[VERSION,[NAME,BLACKBERRY]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[VERSION,[NAME,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[VERSION,[NAME,FIREFOX+" OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[VERSION,[NAME,"webOS"]],[/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],[VERSION,[NAME,"watchOS"]],[/crkey\/([\d\.]+)/i],[VERSION,[NAME,CHROME+"cast"]],[/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],[[NAME,CHROMIUM_OS],VERSION],[/panasonic;(viera)/i,/(netrange)mmh/i,/(nettv)\/(\d+\.[\w\.]+)/i,/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[NAME,VERSION],[/(sunos) ?([\w\.\d]*)/i],[[NAME,"Solaris"],VERSION],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,/(unix) ?([\w\.]*)/i],[NAME,VERSION]]};var UAParser=function(ua,extensions){if(typeof ua===OBJ_TYPE){extensions=ua;ua=undefined}if(!(this instanceof UAParser)){return new UAParser(ua,extensions).getResult()}var _navigator=typeof window!==UNDEF_TYPE&&window.navigator?window.navigator:undefined;var _ua=ua||(_navigator&&_navigator.userAgent?_navigator.userAgent:EMPTY);var _uach=_navigator&&_navigator.userAgentData?_navigator.userAgentData:undefined;var _rgxmap=extensions?extend(regexes,extensions):regexes;var _isSelfNav=_navigator&&_navigator.userAgent==_ua;this.getBrowser=function(){var _browser={};_browser[NAME]=undefined;_browser[VERSION]=undefined;rgxMapper.call(_browser,_ua,_rgxmap.browser);_browser[MAJOR]=majorize(_browser[VERSION]);if(_isSelfNav&&_navigator&&_navigator.brave&&typeof _navigator.brave.isBrave==FUNC_TYPE){_browser[NAME]="Brave"}return _browser};this.getCPU=function(){var _cpu={};_cpu[ARCHITECTURE]=undefined;rgxMapper.call(_cpu,_ua,_rgxmap.cpu);return _cpu};this.getDevice=function(){var _device={};_device[VENDOR]=undefined;_device[MODEL]=undefined;_device[TYPE]=undefined;rgxMapper.call(_device,_ua,_rgxmap.device);if(_isSelfNav&&!_device[TYPE]&&_uach&&_uach.mobile){_device[TYPE]=MOBILE}if(_isSelfNav&&_device[MODEL]=="Macintosh"&&_navigator&&typeof _navigator.standalone!==UNDEF_TYPE&&_navigator.maxTouchPoints&&_navigator.maxTouchPoints>2){_device[MODEL]="iPad";_device[TYPE]=TABLET}return _device};this.getEngine=function(){var _engine={};_engine[NAME]=undefined;_engine[VERSION]=undefined;rgxMapper.call(_engine,_ua,_rgxmap.engine);return _engine};this.getOS=function(){var _os={};_os[NAME]=undefined;_os[VERSION]=undefined;rgxMapper.call(_os,_ua,_rgxmap.os);if(_isSelfNav&&!_os[NAME]&&_uach&&_uach.platform&&_uach.platform!="Unknown"){_os[NAME]=_uach.platform.replace(/chrome os/i,CHROMIUM_OS).replace(/macos/i,MAC_OS)}return _os};this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}};this.getUA=function(){return _ua};this.setUA=function(ua){_ua=typeof ua===STR_TYPE&&ua.length>UA_MAX_LENGTH?trim(ua,UA_MAX_LENGTH):ua;return this};this.setUA(_ua);return this};UAParser.VERSION=LIBVERSION;UAParser.BROWSER=enumerize([NAME,VERSION,MAJOR]);UAParser.CPU=enumerize([ARCHITECTURE]);UAParser.DEVICE=enumerize([MODEL,VENDOR,TYPE,CONSOLE,MOBILE,SMARTTV,TABLET,WEARABLE,EMBEDDED]);UAParser.ENGINE=UAParser.OS=enumerize([NAME,VERSION]);if(typeof exports!==UNDEF_TYPE){if(typeof module!==UNDEF_TYPE&&module.exports){exports=module.exports=UAParser}exports.UAParser=UAParser}else{if("function"===FUNC_TYPE&&__webpack_require__(/*! !webpack amd options */ "./node_modules/next/node_modules/webpack/buildin/amd-options.js")){!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return UAParser}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}else if(typeof window!==UNDEF_TYPE){window.UAParser=UAParser}}var $=typeof window!==UNDEF_TYPE&&(window.jQuery||window.Zepto);if($&&!$.ua){var parser=new UAParser;$.ua=parser.getResult();$.ua.get=function(){return parser.getUA()};$.ua.set=function(ua){parser.setUA(ua);var result=parser.getResult();for(var prop in result){$.ua[prop]=result[prop]}}}})(typeof window==="object"?window:this);

/***/ }),

/***/ "./src/components/photo/capture-photo.tsx":
/*!************************************************!*\
  !*** ./src/components/photo/capture-photo.tsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CapturePhoto; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_webcam__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-webcam */ "./node_modules/react-webcam/dist/react-webcam.js");
/* harmony import */ var react_webcam__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_webcam__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-device-detect */ "./node_modules/react-device-detect/dist/lib.js");
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_device_detect__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "C:\\Users\\roman\\Pictures\\Case\\row\\src\\components\\photo\\capture-photo.tsx",
  _s = $RefreshSig$();

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */




function CapturePhoto(_ref) {
  _s();
  var onFinish = _ref.onFinish,
    onCancel = _ref.onCancel,
    capturing = _ref.capturing;
  var webcamRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  var capture = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
    var imageSrc = webcamRef.current.getScreenshot();
    onFinish(imageSrc);
  }, [webcamRef]);
  var videoConstraints = {
    facingMode: 'user'
  };
  if (react_device_detect__WEBPACK_IMPORTED_MODULE_2__["isMobile"]) return null;
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "text-center",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }
  }, __jsx(react_webcam__WEBPACK_IMPORTED_MODULE_1___default.a, {
    audio: false,
    screenshotFormat: "image/png",
    width: "100%",
    videoConstraints: videoConstraints,
    ref: webcamRef,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 9
    }
  }), __jsx("div", {
    className: "pt-4",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 9
    }
  }, __jsx("button", {
    className: "h-12 w-12 rounded-full bg-red-700 hover:bg-red-600 transition-all",
    onClick: capture,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 11
    }
  }))));
}
_s(CapturePhoto, "Hucxar3NFXzIhqIknsdv6SpCTE0=");
_c = CapturePhoto;
var _c;
$RefreshReg$(_c, "CapturePhoto");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLyh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvcmVhY3QtZGV2aWNlLWRldGVjdC9kaXN0L2xpYi5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWRldmljZS1kZXRlY3Qvbm9kZV9tb2R1bGVzL3VhLXBhcnNlci1qcy9kaXN0L3VhLXBhcnNlci5taW4uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL3Bob3RvL2NhcHR1cmUtcGhvdG8udHN4Il0sIm5hbWVzIjpbIkNhcHR1cmVQaG90byIsIl9yZWYiLCJfcyIsIm9uRmluaXNoIiwib25DYW5jZWwiLCJjYXB0dXJpbmciLCJ3ZWJjYW1SZWYiLCJ1c2VSZWYiLCJjYXB0dXJlIiwidXNlQ2FsbGJhY2siLCJpbWFnZVNyYyIsImN1cnJlbnQiLCJnZXRTY3JlZW5zaG90IiwidmlkZW9Db25zdHJhaW50cyIsImZhY2luZ01vZGUiLCJpc01vYmlsZSIsIl9fanN4IiwiUmVhY3QiLCJGcmFnbWVudCIsImNsYXNzTmFtZSIsIl9fc2VsZiIsIl9fc291cmNlIiwiZmlsZU5hbWUiLCJfanN4RmlsZU5hbWUiLCJsaW5lTnVtYmVyIiwiY29sdW1uTnVtYmVyIiwiV2ViY2FtIiwiYXVkaW8iLCJzY3JlZW5zaG90Rm9ybWF0Iiwid2lkdGgiLCJyZWYiLCJvbkNsaWNrIiwiX2MiLCIkUmVmcmVzaFJlZyQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDRGE7O0FBRWIsOENBQThDLGNBQWM7O0FBRTVELCtCQUErQixpRkFBaUY7O0FBRWhILFlBQVksbUJBQU8sQ0FBQyw0Q0FBTztBQUMzQjs7QUFFQSxlQUFlLG1CQUFPLENBQUMsMkhBQWlDOztBQUV4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLHVCQUF1QjtBQUNwQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxlQUFlLDZCQUE2QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsMkJBQTJCLCtCQUErQjtBQUMxRDs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsd0NBQXdDLFNBQVM7O0FBRWpEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHlFQUF5RTtBQUN6RTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM1akNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixhQUFhLDZXQUE2Vyx3WUFBd1ksd0NBQXdDLHFCQUFxQixzQkFBc0IsOENBQThDLGtEQUFrRCxLQUFLLDZCQUE2QixxQkFBcUIseUJBQXlCLGFBQWEsWUFBWSxhQUFhLEtBQUssbUNBQW1DLGFBQWEseUJBQXlCLGdGQUFnRix3QkFBd0IseUJBQXlCLDRCQUE0QiwyRkFBMkYsd0JBQXdCLDBCQUEwQixnQ0FBZ0Msb0VBQW9FLGtDQUFrQyw4QkFBOEIsaUNBQWlDLHNDQUFzQyxNQUFNLGdDQUFnQyxjQUFjLE1BQU0sNEJBQTRCLGNBQWMsUUFBUSxlQUFlLEtBQUssbUJBQW1CLFdBQVcsb0NBQW9DLGlCQUFpQiwyQkFBMkIsaUNBQWlDLEtBQUssaUJBQWlCLHNCQUFzQixxREFBcUQsc0RBQXNELEtBQUsscURBQXFELHNCQUFzQixxRUFBcUUsS0FBSyxpQ0FBaUMsTUFBTSw2QkFBNkIsa0JBQWtCLDhDQUE4QyxZQUFZLGdCQUFnQixLQUFLLHVCQUF1QixpQ0FBaUMseUJBQXlCLGdDQUFnQyw2Q0FBNkMsa0JBQWtCLCtGQUErRixvQkFBb0Isc0tBQXNLLGFBQWEsNktBQTZLLElBQUksd1JBQXdSLElBQUksdzNCQUF3M0IsSUFBSSxzekNBQXN6QyxnQkFBZ0IsMHNCQUEwc0IsRUFBRSxrY0FBa2MsMG5CQUEwbkIsMkNBQTJDLG9EQUFvRCxnTEFBZ0wsS0FBSyw4REFBOEQsMkRBQTJELG9EQUFvRCwwQ0FBMEMsd0lBQXdJLElBQUksV0FBVyxJQUFJLHFRQUFxUSxxREFBcUQsUUFBUSxxRUFBcUUsK0RBQStELCtJQUErSSxFQUFFLG9GQUFvRixzQkFBc0IsSUFBSSw2R0FBNkcsRUFBRSxXQUFXLEVBQUUsbUJBQW1CLHdIQUF3SCxzQkFBc0IsSUFBSSxhQUFhLG9MQUFvTCxNQUFNLEVBQUUsOEhBQThILGtDQUFrQyxFQUFFLHFHQUFxRyxFQUFFLHVGQUF1RixFQUFFLGlCQUFpQiwyREFBMkQsRUFBRSxVQUFVLHVMQUF1TCxJQUFJLHNGQUFzRixJQUFJLDBFQUEwRSxFQUFFLGVBQWUsR0FBRyxHQUFHLGFBQWEsSUFBSSx1R0FBdUcsMktBQTJLLEVBQUUsV0FBVyxFQUFFLGdPQUFnTyxnQkFBZ0IsSUFBSSwyRUFBMkUsRUFBRSxXQUFXLEVBQUUseURBQXlELElBQUksOFNBQThTLEVBQUUsa09BQWtPLFFBQVEsa0ZBQWtGLG1GQUFtRixLQUFLLDBPQUEwTyxJQUFJLElBQUksMEdBQTBHLDZGQUE2RixvTUFBb00sd0NBQXdDLGFBQWEsOEVBQThFLGtDQUFrQyxHQUFHLCtDQUErQywyQkFBMkIsSUFBSSxvRUFBb0UsdU9BQXVPLGlUQUFpVCxJQUFJLDRCQUE0QixFQUFFLDRCQUE0QixJQUFJLG9KQUFvSixzUEFBc1AsSUFBSSx5TkFBeU4sRUFBRSxrSEFBa0gsRUFBRSx3REFBd0QsRUFBRSw4REFBOEQsRUFBRSx5SEFBeUgsRUFBRSxtQ0FBbUMsRUFBRSxpRUFBaUUsSUFBSSxxRUFBcUUsSUFBSSx3bEJBQXdsQixFQUFFLG9FQUFvRSwrRkFBK0YscUlBQXFJLHdFQUF3RSxvU0FBb1MsdUpBQXVKLEVBQUUsMEVBQTBFLCtHQUErRyxZQUFZLElBQUksSUFBSSw0RkFBNEYsNkdBQTZHLHlKQUF5SixXQUFXLHlRQUF5USxpRUFBaUUsU0FBUyxJQUFJLHFQQUFxUCxLQUFLLGFBQWEsdUVBQXVFLEtBQUssd0ZBQXdGLGtFQUFrRSxrRkFBa0YsSUFBSSxFQUFFLDRaQUE0WixJQUFJLGdOQUFnTixrS0FBa0ssSUFBSSw0QkFBNEIsa0JBQWtCLGthQUFrYSw4QkFBOEIsK0RBQStELDBHQUEwRyxTQUFTLGtFQUFrRSxtUkFBbVIsaUhBQWlILGFBQWEsOEZBQThGLHFYQUFxWCxJQUFJLG1DQUFtQyxJQUFJLHdSQUF3UixxQ0FBcUMseUJBQXlCLGNBQWMsYUFBYSxnQ0FBZ0MsK0NBQStDLHVGQUF1RiwwRUFBMEUsa0ZBQWtGLDBEQUEwRCxxREFBcUQsMkJBQTJCLGdCQUFnQix5QkFBeUIsNEJBQTRCLDZDQUE2Qyw0Q0FBNEMseUZBQXlGLHVCQUF1QixpQkFBaUIsdUJBQXVCLFlBQVksNkJBQTZCLHFDQUFxQyxhQUFhLDBCQUEwQixlQUFlLDBCQUEwQix5QkFBeUIsd0JBQXdCLDJDQUEyQyxvREFBb0QscUJBQXFCLDJKQUEySixzQkFBc0IscUJBQXFCLGdCQUFnQiwwQkFBMEIsZUFBZSx3QkFBd0IsMkJBQTJCLDJDQUEyQyxnQkFBZ0Isc0JBQXNCLFdBQVcsb0JBQW9CLHVCQUF1QixtQ0FBbUMsNkVBQTZFLG9GQUFvRixZQUFZLDBCQUEwQixPQUFPLDhIQUE4SCxzQkFBc0IsWUFBWSx3QkFBd0IsNEVBQTRFLGFBQWEsZ0JBQWdCLGFBQWEsNEJBQTRCLGlEQUFpRCx1Q0FBdUMsK0ZBQStGLHNEQUFzRCxnQ0FBZ0MsK0NBQStDLGdDQUFnQywwQkFBMEIsS0FBSyxHQUFHLFVBQWEsY0FBYyxrSEFBVSxFQUFFLG1DQUFPLFdBQVcsZ0JBQWdCO0FBQUEsb0dBQUMsQ0FBQyxvQ0FBb0MsMEJBQTBCLGdFQUFnRSxhQUFhLHdCQUF3Qix3QkFBd0Isb0JBQW9CLHVCQUF1QixzQkFBc0IsaUJBQWlCLDhCQUE4Qix3QkFBd0IsMkJBQTJCLHdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIN3lzQjtBQUNBOztBQUllO0FBQ21CO0FBQ2E7QUFRaEMsU0FBU0EsWUFBWUEsQ0FBQUMsSUFBQSxFQUE0QztFQUFBQyxFQUFBO0VBQUEsSUFBekNDLFFBQVEsR0FBQUYsSUFBQSxDQUFSRSxRQUFRO0lBQUVDLFFBQVEsR0FBQUgsSUFBQSxDQUFSRyxRQUFRO0lBQUVDLFNBQVMsR0FBQUosSUFBQSxDQUFUSSxTQUFTO0VBQ2xFLElBQU1DLFNBQVMsR0FBR0Msb0RBQU0sQ0FBQyxJQUFJLENBQUM7RUFFOUIsSUFBTUMsT0FBTyxHQUFHQyx5REFBVyxDQUN6QixZQUFNO0lBQ0osSUFBTUMsUUFBUSxHQUFHSixTQUFTLENBQUNLLE9BQU8sQ0FBQ0MsYUFBYSxDQUFDLENBQUM7SUFDbERULFFBQVEsQ0FBQ08sUUFBUSxDQUFDO0VBQ3BCLENBQUMsRUFDRCxDQUFDSixTQUFTLENBQ1osQ0FBQztFQUVELElBQU1PLGdCQUFnQixHQUFHO0lBQ3ZCQyxVQUFVLEVBQUU7RUFDZCxDQUFDO0VBRUQsSUFBSUMsNERBQVEsRUFBRSxPQUFPLElBQUk7RUFFekIsT0FDRUMsS0FBQSxDQUFBQyw0Q0FBQSxDQUFBQyxRQUFBLFFBQ0VGLEtBQUE7SUFBS0csU0FBUyxFQUFDLGFBQWE7SUFBQUMsTUFBQTtJQUFBQyxRQUFBO01BQUFDLFFBQUEsRUFBQUMsWUFBQTtNQUFBQyxVQUFBO01BQUFDLFlBQUE7SUFBQTtFQUFBLEdBQzFCVCxLQUFBLENBQUNVLG1EQUFNO0lBQ0xDLEtBQUssRUFBRSxLQUFNO0lBQ2JDLGdCQUFnQixFQUFDLFdBQVc7SUFDNUJDLEtBQUssRUFBQyxNQUFNO0lBQ1poQixnQkFBZ0IsRUFBRUEsZ0JBQWlCO0lBQ25DaUIsR0FBRyxFQUFFeEIsU0FBVTtJQUFBYyxNQUFBO0lBQUFDLFFBQUE7TUFBQUMsUUFBQSxFQUFBQyxZQUFBO01BQUFDLFVBQUE7TUFBQUMsWUFBQTtJQUFBO0VBQUEsQ0FDaEIsQ0FBQyxFQUNGVCxLQUFBO0lBQUtHLFNBQVMsRUFBQyxNQUFNO0lBQUFDLE1BQUE7SUFBQUMsUUFBQTtNQUFBQyxRQUFBLEVBQUFDLFlBQUE7TUFBQUMsVUFBQTtNQUFBQyxZQUFBO0lBQUE7RUFBQSxHQUNuQlQsS0FBQTtJQUFRRyxTQUFTLEVBQUMsbUVBQW1FO0lBQUNZLE9BQU8sRUFBRXZCLE9BQVE7SUFBQVksTUFBQTtJQUFBQyxRQUFBO01BQUFDLFFBQUEsRUFBQUMsWUFBQTtNQUFBQyxVQUFBO01BQUFDLFlBQUE7SUFBQTtFQUFBLENBQVMsQ0FDN0csQ0FDRixDQUNMLENBQUM7QUFFUDtBQUFDdkIsRUFBQSxDQWpDdUJGLFlBQVk7QUFBQWdDLEVBQUEsR0FBWmhDLFlBQVk7QUFBQSxJQUFBZ0MsRUFBQTtBQUFBQyxZQUFBLENBQUFELEVBQUEiLCJmaWxlIjoic3RhdGljL2NodW5rcy8zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFscyBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXyAqL1xubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXztcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxuZnVuY3Rpb24gX2ludGVyb3BEZWZhdWx0IChleCkgeyByZXR1cm4gKGV4ICYmICh0eXBlb2YgZXggPT09ICdvYmplY3QnKSAmJiAnZGVmYXVsdCcgaW4gZXgpID8gZXhbJ2RlZmF1bHQnXSA6IGV4OyB9XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RfX2RlZmF1bHQgPSBfaW50ZXJvcERlZmF1bHQoUmVhY3QpO1xuXG52YXIgVUFQYXJzZXIgPSByZXF1aXJlKCd1YS1wYXJzZXItanMvZGlzdC91YS1wYXJzZXIubWluJyk7XG5cbnZhciBDbGllbnRVQUluc3RhbmNlID0gbmV3IFVBUGFyc2VyKCk7XG52YXIgYnJvd3NlciA9IENsaWVudFVBSW5zdGFuY2UuZ2V0QnJvd3NlcigpO1xudmFyIGNwdSA9IENsaWVudFVBSW5zdGFuY2UuZ2V0Q1BVKCk7XG52YXIgZGV2aWNlID0gQ2xpZW50VUFJbnN0YW5jZS5nZXREZXZpY2UoKTtcbnZhciBlbmdpbmUgPSBDbGllbnRVQUluc3RhbmNlLmdldEVuZ2luZSgpO1xudmFyIG9zID0gQ2xpZW50VUFJbnN0YW5jZS5nZXRPUygpO1xudmFyIHVhID0gQ2xpZW50VUFJbnN0YW5jZS5nZXRVQSgpO1xudmFyIHNldFVhID0gZnVuY3Rpb24gc2V0VWEodXNlckFnZW50U3RyaW5nKSB7XG4gIHJldHVybiBDbGllbnRVQUluc3RhbmNlLnNldFVBKHVzZXJBZ2VudFN0cmluZyk7XG59O1xudmFyIHBhcnNlVXNlckFnZW50ID0gZnVuY3Rpb24gcGFyc2VVc2VyQWdlbnQodXNlckFnZW50KSB7XG4gIGlmICghdXNlckFnZW50KSB7XG4gICAgY29uc29sZS5lcnJvcignTm8gdXNlckFnZW50IHN0cmluZyB3YXMgcHJvdmlkZWQnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgVXNlckFnZW50SW5zdGFuY2UgPSBuZXcgVUFQYXJzZXIodXNlckFnZW50KTtcbiAgcmV0dXJuIHtcbiAgICBVQTogVXNlckFnZW50SW5zdGFuY2UsXG4gICAgYnJvd3NlcjogVXNlckFnZW50SW5zdGFuY2UuZ2V0QnJvd3NlcigpLFxuICAgIGNwdTogVXNlckFnZW50SW5zdGFuY2UuZ2V0Q1BVKCksXG4gICAgZGV2aWNlOiBVc2VyQWdlbnRJbnN0YW5jZS5nZXREZXZpY2UoKSxcbiAgICBlbmdpbmU6IFVzZXJBZ2VudEluc3RhbmNlLmdldEVuZ2luZSgpLFxuICAgIG9zOiBVc2VyQWdlbnRJbnN0YW5jZS5nZXRPUygpLFxuICAgIHVhOiBVc2VyQWdlbnRJbnN0YW5jZS5nZXRVQSgpLFxuICAgIHNldFVzZXJBZ2VudDogZnVuY3Rpb24gc2V0VXNlckFnZW50KHVzZXJBZ2VudFN0cmluZykge1xuICAgICAgcmV0dXJuIFVzZXJBZ2VudEluc3RhbmNlLnNldFVBKHVzZXJBZ2VudFN0cmluZyk7XG4gICAgfVxuICB9O1xufTtcblxudmFyIFVBSGVscGVyID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICBDbGllbnRVQUluc3RhbmNlOiBDbGllbnRVQUluc3RhbmNlLFxuICBicm93c2VyOiBicm93c2VyLFxuICBjcHU6IGNwdSxcbiAgZGV2aWNlOiBkZXZpY2UsXG4gIGVuZ2luZTogZW5naW5lLFxuICBvczogb3MsXG4gIHVhOiB1YSxcbiAgc2V0VWE6IHNldFVhLFxuICBwYXJzZVVzZXJBZ2VudDogcGFyc2VVc2VyQWdlbnRcbn0pO1xuXG5mdW5jdGlvbiBvd25LZXlzKG9iamVjdCwgZW51bWVyYWJsZU9ubHkpIHtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xuXG4gIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7XG5cbiAgICBpZiAoZW51bWVyYWJsZU9ubHkpIHtcbiAgICAgIHN5bWJvbHMgPSBzeW1ib2xzLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAga2V5cy5wdXNoLmFwcGx5KGtleXMsIHN5bWJvbHMpO1xuICB9XG5cbiAgcmV0dXJuIGtleXM7XG59XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQyKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuXG4gICAgaWYgKGkgJSAyKSB7XG4gICAgICBvd25LZXlzKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvd25LZXlzKE9iamVjdChzb3VyY2UpKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7XG4gICAgX3R5cGVvZiA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgX3R5cGVvZiA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuXG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpO1xufVxuXG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICAgIHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG4gIH07XG4gIHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7XG59XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gIF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICAgIG8uX19wcm90b19fID0gcDtcbiAgICByZXR1cm4gbztcbiAgfTtcblxuICByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApO1xufVxuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0ge307XG4gIHZhciBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgdmFyIGtleSwgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgc291cmNlS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleSA9IHNvdXJjZUtleXNbaV07XG4gICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG5cbiAgdmFyIHRhcmdldCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpO1xuXG4gIHZhciBrZXksIGk7XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICB2YXIgc291cmNlU3ltYm9sS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VTeW1ib2xLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXkgPSBzb3VyY2VTeW1ib2xLZXlzW2ldO1xuICAgICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHNvdXJjZSwga2V5KSkgY29udGludWU7XG4gICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcbiAgaWYgKGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH0gZWxzZSBpZiAoY2FsbCAhPT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkRlcml2ZWQgY29uc3RydWN0b3JzIG1heSBvbmx5IHJldHVybiBvYmplY3Qgb3IgdW5kZWZpbmVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7XG59XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdO1xuXG4gIGlmIChfaSA9PSBudWxsKSByZXR1cm47XG4gIHZhciBfYXJyID0gW107XG4gIHZhciBfbiA9IHRydWU7XG4gIHZhciBfZCA9IGZhbHNlO1xuXG4gIHZhciBfcywgX2U7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZCA9IHRydWU7XG4gICAgX2UgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2Fycjtcbn1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIGFycjJbaV0gPSBhcnJbaV07XG5cbiAgcmV0dXJuIGFycjI7XG59XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59XG5cbnZhciBEZXZpY2VUeXBlcyA9IHtcbiAgTW9iaWxlOiAnbW9iaWxlJyxcbiAgVGFibGV0OiAndGFibGV0JyxcbiAgU21hcnRUdjogJ3NtYXJ0dHYnLFxuICBDb25zb2xlOiAnY29uc29sZScsXG4gIFdlYXJhYmxlOiAnd2VhcmFibGUnLFxuICBFbWJlZGRlZDogJ2VtYmVkZGVkJyxcbiAgQnJvd3NlcjogdW5kZWZpbmVkXG59O1xudmFyIEJyb3dzZXJUeXBlcyA9IHtcbiAgQ2hyb21lOiAnQ2hyb21lJyxcbiAgRmlyZWZveDogJ0ZpcmVmb3gnLFxuICBPcGVyYTogJ09wZXJhJyxcbiAgWWFuZGV4OiAnWWFuZGV4JyxcbiAgU2FmYXJpOiAnU2FmYXJpJyxcbiAgSW50ZXJuZXRFeHBsb3JlcjogJ0ludGVybmV0IEV4cGxvcmVyJyxcbiAgRWRnZTogJ0VkZ2UnLFxuICBDaHJvbWl1bTogJ0Nocm9taXVtJyxcbiAgSWU6ICdJRScsXG4gIE1vYmlsZVNhZmFyaTogJ01vYmlsZSBTYWZhcmknLFxuICBFZGdlQ2hyb21pdW06ICdFZGdlIENocm9taXVtJyxcbiAgTUlVSTogJ01JVUkgQnJvd3NlcicsXG4gIFNhbXN1bmdCcm93c2VyOiAnU2Ftc3VuZyBCcm93c2VyJ1xufTtcbnZhciBPc1R5cGVzID0ge1xuICBJT1M6ICdpT1MnLFxuICBBbmRyb2lkOiAnQW5kcm9pZCcsXG4gIFdpbmRvd3NQaG9uZTogJ1dpbmRvd3MgUGhvbmUnLFxuICBXaW5kb3dzOiAnV2luZG93cycsXG4gIE1BQ19PUzogJ01hYyBPUydcbn07XG52YXIgSW5pdGlhbERldmljZVR5cGVzID0ge1xuICBpc01vYmlsZTogZmFsc2UsXG4gIGlzVGFibGV0OiBmYWxzZSxcbiAgaXNCcm93c2VyOiBmYWxzZSxcbiAgaXNTbWFydFRWOiBmYWxzZSxcbiAgaXNDb25zb2xlOiBmYWxzZSxcbiAgaXNXZWFyYWJsZTogZmFsc2Vcbn07XG5cbnZhciBjaGVja0RldmljZVR5cGUgPSBmdW5jdGlvbiBjaGVja0RldmljZVR5cGUodHlwZSkge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIERldmljZVR5cGVzLk1vYmlsZTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzTW9iaWxlOiB0cnVlXG4gICAgICB9O1xuXG4gICAgY2FzZSBEZXZpY2VUeXBlcy5UYWJsZXQ6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpc1RhYmxldDogdHJ1ZVxuICAgICAgfTtcblxuICAgIGNhc2UgRGV2aWNlVHlwZXMuU21hcnRUdjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzU21hcnRUVjogdHJ1ZVxuICAgICAgfTtcblxuICAgIGNhc2UgRGV2aWNlVHlwZXMuQ29uc29sZTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzQ29uc29sZTogdHJ1ZVxuICAgICAgfTtcblxuICAgIGNhc2UgRGV2aWNlVHlwZXMuV2VhcmFibGU6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpc1dlYXJhYmxlOiB0cnVlXG4gICAgICB9O1xuXG4gICAgY2FzZSBEZXZpY2VUeXBlcy5Ccm93c2VyOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXNCcm93c2VyOiB0cnVlXG4gICAgICB9O1xuXG4gICAgY2FzZSBEZXZpY2VUeXBlcy5FbWJlZGRlZDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzRW1iZWRkZWQ6IHRydWVcbiAgICAgIH07XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIEluaXRpYWxEZXZpY2VUeXBlcztcbiAgfVxufTtcbnZhciBzZXRVc2VyQWdlbnQgPSBmdW5jdGlvbiBzZXRVc2VyQWdlbnQodXNlckFnZW50KSB7XG4gIHJldHVybiBzZXRVYSh1c2VyQWdlbnQpO1xufTtcbnZhciBzZXREZWZhdWx0cyA9IGZ1bmN0aW9uIHNldERlZmF1bHRzKHApIHtcbiAgdmFyIGQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6ICdub25lJztcbiAgcmV0dXJuIHAgPyBwIDogZDtcbn07XG52YXIgZ2V0TmF2aWdhdG9ySW5zdGFuY2UgPSBmdW5jdGlvbiBnZXROYXZpZ2F0b3JJbnN0YW5jZSgpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHdpbmRvdy5uYXZpZ2F0b3IgfHwgbmF2aWdhdG9yKSB7XG4gICAgICByZXR1cm4gd2luZG93Lm5hdmlnYXRvciB8fCBuYXZpZ2F0b3I7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcbnZhciBpc0lPUzEzQ2hlY2sgPSBmdW5jdGlvbiBpc0lPUzEzQ2hlY2sodHlwZSkge1xuICB2YXIgbmF2ID0gZ2V0TmF2aWdhdG9ySW5zdGFuY2UoKTtcbiAgcmV0dXJuIG5hdiAmJiBuYXYucGxhdGZvcm0gJiYgKG5hdi5wbGF0Zm9ybS5pbmRleE9mKHR5cGUpICE9PSAtMSB8fCBuYXYucGxhdGZvcm0gPT09ICdNYWNJbnRlbCcgJiYgbmF2Lm1heFRvdWNoUG9pbnRzID4gMSAmJiAhd2luZG93Lk1TU3RyZWFtKTtcbn07XG5cbnZhciBicm93c2VyUGF5bG9hZCA9IGZ1bmN0aW9uIGJyb3dzZXJQYXlsb2FkKGlzQnJvd3NlciwgYnJvd3NlciwgZW5naW5lLCBvcywgdWEpIHtcbiAgcmV0dXJuIHtcbiAgICBpc0Jyb3dzZXI6IGlzQnJvd3NlcixcbiAgICBicm93c2VyTWFqb3JWZXJzaW9uOiBzZXREZWZhdWx0cyhicm93c2VyLm1ham9yKSxcbiAgICBicm93c2VyRnVsbFZlcnNpb246IHNldERlZmF1bHRzKGJyb3dzZXIudmVyc2lvbiksXG4gICAgYnJvd3Nlck5hbWU6IHNldERlZmF1bHRzKGJyb3dzZXIubmFtZSksXG4gICAgZW5naW5lTmFtZTogc2V0RGVmYXVsdHMoZW5naW5lLm5hbWUpLFxuICAgIGVuZ2luZVZlcnNpb246IHNldERlZmF1bHRzKGVuZ2luZS52ZXJzaW9uKSxcbiAgICBvc05hbWU6IHNldERlZmF1bHRzKG9zLm5hbWUpLFxuICAgIG9zVmVyc2lvbjogc2V0RGVmYXVsdHMob3MudmVyc2lvbiksXG4gICAgdXNlckFnZW50OiBzZXREZWZhdWx0cyh1YSlcbiAgfTtcbn07XG52YXIgbW9iaWxlUGF5bG9hZCA9IGZ1bmN0aW9uIG1vYmlsZVBheWxvYWQodHlwZSwgZGV2aWNlLCBvcywgdWEpIHtcbiAgcmV0dXJuIF9vYmplY3RTcHJlYWQyKHt9LCB0eXBlLCB7XG4gICAgdmVuZG9yOiBzZXREZWZhdWx0cyhkZXZpY2UudmVuZG9yKSxcbiAgICBtb2RlbDogc2V0RGVmYXVsdHMoZGV2aWNlLm1vZGVsKSxcbiAgICBvczogc2V0RGVmYXVsdHMob3MubmFtZSksXG4gICAgb3NWZXJzaW9uOiBzZXREZWZhdWx0cyhvcy52ZXJzaW9uKSxcbiAgICB1YTogc2V0RGVmYXVsdHModWEpXG4gIH0pO1xufTtcbnZhciBzbWFydFR2UGF5bG9hZCA9IGZ1bmN0aW9uIHNtYXJ0VHZQYXlsb2FkKGlzU21hcnRUViwgZW5naW5lLCBvcywgdWEpIHtcbiAgcmV0dXJuIHtcbiAgICBpc1NtYXJ0VFY6IGlzU21hcnRUVixcbiAgICBlbmdpbmVOYW1lOiBzZXREZWZhdWx0cyhlbmdpbmUubmFtZSksXG4gICAgZW5naW5lVmVyc2lvbjogc2V0RGVmYXVsdHMoZW5naW5lLnZlcnNpb24pLFxuICAgIG9zTmFtZTogc2V0RGVmYXVsdHMob3MubmFtZSksXG4gICAgb3NWZXJzaW9uOiBzZXREZWZhdWx0cyhvcy52ZXJzaW9uKSxcbiAgICB1c2VyQWdlbnQ6IHNldERlZmF1bHRzKHVhKVxuICB9O1xufTtcbnZhciBjb25zb2xlUGF5bG9hZCA9IGZ1bmN0aW9uIGNvbnNvbGVQYXlsb2FkKGlzQ29uc29sZSwgZW5naW5lLCBvcywgdWEpIHtcbiAgcmV0dXJuIHtcbiAgICBpc0NvbnNvbGU6IGlzQ29uc29sZSxcbiAgICBlbmdpbmVOYW1lOiBzZXREZWZhdWx0cyhlbmdpbmUubmFtZSksXG4gICAgZW5naW5lVmVyc2lvbjogc2V0RGVmYXVsdHMoZW5naW5lLnZlcnNpb24pLFxuICAgIG9zTmFtZTogc2V0RGVmYXVsdHMob3MubmFtZSksXG4gICAgb3NWZXJzaW9uOiBzZXREZWZhdWx0cyhvcy52ZXJzaW9uKSxcbiAgICB1c2VyQWdlbnQ6IHNldERlZmF1bHRzKHVhKVxuICB9O1xufTtcbnZhciB3ZWFyYWJsZVBheWxvYWQgPSBmdW5jdGlvbiB3ZWFyYWJsZVBheWxvYWQoaXNXZWFyYWJsZSwgZW5naW5lLCBvcywgdWEpIHtcbiAgcmV0dXJuIHtcbiAgICBpc1dlYXJhYmxlOiBpc1dlYXJhYmxlLFxuICAgIGVuZ2luZU5hbWU6IHNldERlZmF1bHRzKGVuZ2luZS5uYW1lKSxcbiAgICBlbmdpbmVWZXJzaW9uOiBzZXREZWZhdWx0cyhlbmdpbmUudmVyc2lvbiksXG4gICAgb3NOYW1lOiBzZXREZWZhdWx0cyhvcy5uYW1lKSxcbiAgICBvc1ZlcnNpb246IHNldERlZmF1bHRzKG9zLnZlcnNpb24pLFxuICAgIHVzZXJBZ2VudDogc2V0RGVmYXVsdHModWEpXG4gIH07XG59O1xudmFyIGVtYmVkZGVkUGF5bG9hZCA9IGZ1bmN0aW9uIGVtYmVkZGVkUGF5bG9hZChpc0VtYmVkZGVkLCBkZXZpY2UsIGVuZ2luZSwgb3MsIHVhKSB7XG4gIHJldHVybiB7XG4gICAgaXNFbWJlZGRlZDogaXNFbWJlZGRlZCxcbiAgICB2ZW5kb3I6IHNldERlZmF1bHRzKGRldmljZS52ZW5kb3IpLFxuICAgIG1vZGVsOiBzZXREZWZhdWx0cyhkZXZpY2UubW9kZWwpLFxuICAgIGVuZ2luZU5hbWU6IHNldERlZmF1bHRzKGVuZ2luZS5uYW1lKSxcbiAgICBlbmdpbmVWZXJzaW9uOiBzZXREZWZhdWx0cyhlbmdpbmUudmVyc2lvbiksXG4gICAgb3NOYW1lOiBzZXREZWZhdWx0cyhvcy5uYW1lKSxcbiAgICBvc1ZlcnNpb246IHNldERlZmF1bHRzKG9zLnZlcnNpb24pLFxuICAgIHVzZXJBZ2VudDogc2V0RGVmYXVsdHModWEpXG4gIH07XG59O1xuXG5mdW5jdGlvbiBkZXZpY2VEZXRlY3QodXNlckFnZW50KSB7XG4gIHZhciBfcmVmID0gdXNlckFnZW50ID8gcGFyc2VVc2VyQWdlbnQodXNlckFnZW50KSA6IFVBSGVscGVyLFxuICAgICAgZGV2aWNlID0gX3JlZi5kZXZpY2UsXG4gICAgICBicm93c2VyID0gX3JlZi5icm93c2VyLFxuICAgICAgZW5naW5lID0gX3JlZi5lbmdpbmUsXG4gICAgICBvcyA9IF9yZWYub3MsXG4gICAgICB1YSA9IF9yZWYudWE7XG5cbiAgdmFyIHR5cGUgPSBjaGVja0RldmljZVR5cGUoZGV2aWNlLnR5cGUpO1xuICB2YXIgaXNCcm93c2VyID0gdHlwZS5pc0Jyb3dzZXIsXG4gICAgICBpc01vYmlsZSA9IHR5cGUuaXNNb2JpbGUsXG4gICAgICBpc1RhYmxldCA9IHR5cGUuaXNUYWJsZXQsXG4gICAgICBpc1NtYXJ0VFYgPSB0eXBlLmlzU21hcnRUVixcbiAgICAgIGlzQ29uc29sZSA9IHR5cGUuaXNDb25zb2xlLFxuICAgICAgaXNXZWFyYWJsZSA9IHR5cGUuaXNXZWFyYWJsZSxcbiAgICAgIGlzRW1iZWRkZWQgPSB0eXBlLmlzRW1iZWRkZWQ7XG5cbiAgaWYgKGlzQnJvd3Nlcikge1xuICAgIHJldHVybiBicm93c2VyUGF5bG9hZChpc0Jyb3dzZXIsIGJyb3dzZXIsIGVuZ2luZSwgb3MsIHVhKTtcbiAgfVxuXG4gIGlmIChpc1NtYXJ0VFYpIHtcbiAgICByZXR1cm4gc21hcnRUdlBheWxvYWQoaXNTbWFydFRWLCBlbmdpbmUsIG9zLCB1YSk7XG4gIH1cblxuICBpZiAoaXNDb25zb2xlKSB7XG4gICAgcmV0dXJuIGNvbnNvbGVQYXlsb2FkKGlzQ29uc29sZSwgZW5naW5lLCBvcywgdWEpO1xuICB9XG5cbiAgaWYgKGlzTW9iaWxlKSB7XG4gICAgcmV0dXJuIG1vYmlsZVBheWxvYWQodHlwZSwgZGV2aWNlLCBvcywgdWEpO1xuICB9XG5cbiAgaWYgKGlzVGFibGV0KSB7XG4gICAgcmV0dXJuIG1vYmlsZVBheWxvYWQodHlwZSwgZGV2aWNlLCBvcywgdWEpO1xuICB9XG5cbiAgaWYgKGlzV2VhcmFibGUpIHtcbiAgICByZXR1cm4gd2VhcmFibGVQYXlsb2FkKGlzV2VhcmFibGUsIGVuZ2luZSwgb3MsIHVhKTtcbiAgfVxuXG4gIGlmIChpc0VtYmVkZGVkKSB7XG4gICAgcmV0dXJuIGVtYmVkZGVkUGF5bG9hZChpc0VtYmVkZGVkLCBkZXZpY2UsIGVuZ2luZSwgb3MsIHVhKTtcbiAgfVxufVxuXG52YXIgaXNNb2JpbGVUeXBlID0gZnVuY3Rpb24gaXNNb2JpbGVUeXBlKF9yZWYpIHtcbiAgdmFyIHR5cGUgPSBfcmVmLnR5cGU7XG4gIHJldHVybiB0eXBlID09PSBEZXZpY2VUeXBlcy5Nb2JpbGU7XG59O1xudmFyIGlzVGFibGV0VHlwZSA9IGZ1bmN0aW9uIGlzVGFibGV0VHlwZShfcmVmMikge1xuICB2YXIgdHlwZSA9IF9yZWYyLnR5cGU7XG4gIHJldHVybiB0eXBlID09PSBEZXZpY2VUeXBlcy5UYWJsZXQ7XG59O1xudmFyIGlzTW9iaWxlQW5kVGFibGV0VHlwZSA9IGZ1bmN0aW9uIGlzTW9iaWxlQW5kVGFibGV0VHlwZShfcmVmMykge1xuICB2YXIgdHlwZSA9IF9yZWYzLnR5cGU7XG4gIHJldHVybiB0eXBlID09PSBEZXZpY2VUeXBlcy5Nb2JpbGUgfHwgdHlwZSA9PT0gRGV2aWNlVHlwZXMuVGFibGV0O1xufTtcbnZhciBpc1NtYXJ0VFZUeXBlID0gZnVuY3Rpb24gaXNTbWFydFRWVHlwZShfcmVmNCkge1xuICB2YXIgdHlwZSA9IF9yZWY0LnR5cGU7XG4gIHJldHVybiB0eXBlID09PSBEZXZpY2VUeXBlcy5TbWFydFR2O1xufTtcbnZhciBpc0Jyb3dzZXJUeXBlID0gZnVuY3Rpb24gaXNCcm93c2VyVHlwZShfcmVmNSkge1xuICB2YXIgdHlwZSA9IF9yZWY1LnR5cGU7XG4gIHJldHVybiB0eXBlID09PSBEZXZpY2VUeXBlcy5Ccm93c2VyO1xufTtcbnZhciBpc1dlYXJhYmxlVHlwZSA9IGZ1bmN0aW9uIGlzV2VhcmFibGVUeXBlKF9yZWY2KSB7XG4gIHZhciB0eXBlID0gX3JlZjYudHlwZTtcbiAgcmV0dXJuIHR5cGUgPT09IERldmljZVR5cGVzLldlYXJhYmxlO1xufTtcbnZhciBpc0NvbnNvbGVUeXBlID0gZnVuY3Rpb24gaXNDb25zb2xlVHlwZShfcmVmNykge1xuICB2YXIgdHlwZSA9IF9yZWY3LnR5cGU7XG4gIHJldHVybiB0eXBlID09PSBEZXZpY2VUeXBlcy5Db25zb2xlO1xufTtcbnZhciBpc0VtYmVkZGVkVHlwZSA9IGZ1bmN0aW9uIGlzRW1iZWRkZWRUeXBlKF9yZWY4KSB7XG4gIHZhciB0eXBlID0gX3JlZjgudHlwZTtcbiAgcmV0dXJuIHR5cGUgPT09IERldmljZVR5cGVzLkVtYmVkZGVkO1xufTtcbnZhciBnZXRNb2JpbGVWZW5kb3IgPSBmdW5jdGlvbiBnZXRNb2JpbGVWZW5kb3IoX3JlZjkpIHtcbiAgdmFyIHZlbmRvciA9IF9yZWY5LnZlbmRvcjtcbiAgcmV0dXJuIHNldERlZmF1bHRzKHZlbmRvcik7XG59O1xudmFyIGdldE1vYmlsZU1vZGVsID0gZnVuY3Rpb24gZ2V0TW9iaWxlTW9kZWwoX3JlZjEwKSB7XG4gIHZhciBtb2RlbCA9IF9yZWYxMC5tb2RlbDtcbiAgcmV0dXJuIHNldERlZmF1bHRzKG1vZGVsKTtcbn07XG52YXIgZ2V0RGV2aWNlVHlwZSA9IGZ1bmN0aW9uIGdldERldmljZVR5cGUoX3JlZjExKSB7XG4gIHZhciB0eXBlID0gX3JlZjExLnR5cGU7XG4gIHJldHVybiBzZXREZWZhdWx0cyh0eXBlLCAnYnJvd3NlcicpO1xufTsgLy8gb3MgdHlwZXNcblxudmFyIGlzQW5kcm9pZFR5cGUgPSBmdW5jdGlvbiBpc0FuZHJvaWRUeXBlKF9yZWYxMikge1xuICB2YXIgbmFtZSA9IF9yZWYxMi5uYW1lO1xuICByZXR1cm4gbmFtZSA9PT0gT3NUeXBlcy5BbmRyb2lkO1xufTtcbnZhciBpc1dpbmRvd3NUeXBlID0gZnVuY3Rpb24gaXNXaW5kb3dzVHlwZShfcmVmMTMpIHtcbiAgdmFyIG5hbWUgPSBfcmVmMTMubmFtZTtcbiAgcmV0dXJuIG5hbWUgPT09IE9zVHlwZXMuV2luZG93cztcbn07XG52YXIgaXNNYWNPc1R5cGUgPSBmdW5jdGlvbiBpc01hY09zVHlwZShfcmVmMTQpIHtcbiAgdmFyIG5hbWUgPSBfcmVmMTQubmFtZTtcbiAgcmV0dXJuIG5hbWUgPT09IE9zVHlwZXMuTUFDX09TO1xufTtcbnZhciBpc1dpblBob25lVHlwZSA9IGZ1bmN0aW9uIGlzV2luUGhvbmVUeXBlKF9yZWYxNSkge1xuICB2YXIgbmFtZSA9IF9yZWYxNS5uYW1lO1xuICByZXR1cm4gbmFtZSA9PT0gT3NUeXBlcy5XaW5kb3dzUGhvbmU7XG59O1xudmFyIGlzSU9TVHlwZSA9IGZ1bmN0aW9uIGlzSU9TVHlwZShfcmVmMTYpIHtcbiAgdmFyIG5hbWUgPSBfcmVmMTYubmFtZTtcbiAgcmV0dXJuIG5hbWUgPT09IE9zVHlwZXMuSU9TO1xufTtcbnZhciBnZXRPc1ZlcnNpb24gPSBmdW5jdGlvbiBnZXRPc1ZlcnNpb24oX3JlZjE3KSB7XG4gIHZhciB2ZXJzaW9uID0gX3JlZjE3LnZlcnNpb247XG4gIHJldHVybiBzZXREZWZhdWx0cyh2ZXJzaW9uKTtcbn07XG52YXIgZ2V0T3NOYW1lID0gZnVuY3Rpb24gZ2V0T3NOYW1lKF9yZWYxOCkge1xuICB2YXIgbmFtZSA9IF9yZWYxOC5uYW1lO1xuICByZXR1cm4gc2V0RGVmYXVsdHMobmFtZSk7XG59OyAvLyBicm93c2VyIHR5cGVzXG5cbnZhciBpc0Nocm9tZVR5cGUgPSBmdW5jdGlvbiBpc0Nocm9tZVR5cGUoX3JlZjE5KSB7XG4gIHZhciBuYW1lID0gX3JlZjE5Lm5hbWU7XG4gIHJldHVybiBuYW1lID09PSBCcm93c2VyVHlwZXMuQ2hyb21lO1xufTtcbnZhciBpc0ZpcmVmb3hUeXBlID0gZnVuY3Rpb24gaXNGaXJlZm94VHlwZShfcmVmMjApIHtcbiAgdmFyIG5hbWUgPSBfcmVmMjAubmFtZTtcbiAgcmV0dXJuIG5hbWUgPT09IEJyb3dzZXJUeXBlcy5GaXJlZm94O1xufTtcbnZhciBpc0Nocm9taXVtVHlwZSA9IGZ1bmN0aW9uIGlzQ2hyb21pdW1UeXBlKF9yZWYyMSkge1xuICB2YXIgbmFtZSA9IF9yZWYyMS5uYW1lO1xuICByZXR1cm4gbmFtZSA9PT0gQnJvd3NlclR5cGVzLkNocm9taXVtO1xufTtcbnZhciBpc0VkZ2VUeXBlID0gZnVuY3Rpb24gaXNFZGdlVHlwZShfcmVmMjIpIHtcbiAgdmFyIG5hbWUgPSBfcmVmMjIubmFtZTtcbiAgcmV0dXJuIG5hbWUgPT09IEJyb3dzZXJUeXBlcy5FZGdlO1xufTtcbnZhciBpc1lhbmRleFR5cGUgPSBmdW5jdGlvbiBpc1lhbmRleFR5cGUoX3JlZjIzKSB7XG4gIHZhciBuYW1lID0gX3JlZjIzLm5hbWU7XG4gIHJldHVybiBuYW1lID09PSBCcm93c2VyVHlwZXMuWWFuZGV4O1xufTtcbnZhciBpc1NhZmFyaVR5cGUgPSBmdW5jdGlvbiBpc1NhZmFyaVR5cGUoX3JlZjI0KSB7XG4gIHZhciBuYW1lID0gX3JlZjI0Lm5hbWU7XG4gIHJldHVybiBuYW1lID09PSBCcm93c2VyVHlwZXMuU2FmYXJpIHx8IG5hbWUgPT09IEJyb3dzZXJUeXBlcy5Nb2JpbGVTYWZhcmk7XG59O1xudmFyIGlzTW9iaWxlU2FmYXJpVHlwZSA9IGZ1bmN0aW9uIGlzTW9iaWxlU2FmYXJpVHlwZShfcmVmMjUpIHtcbiAgdmFyIG5hbWUgPSBfcmVmMjUubmFtZTtcbiAgcmV0dXJuIG5hbWUgPT09IEJyb3dzZXJUeXBlcy5Nb2JpbGVTYWZhcmk7XG59O1xudmFyIGlzT3BlcmFUeXBlID0gZnVuY3Rpb24gaXNPcGVyYVR5cGUoX3JlZjI2KSB7XG4gIHZhciBuYW1lID0gX3JlZjI2Lm5hbWU7XG4gIHJldHVybiBuYW1lID09PSBCcm93c2VyVHlwZXMuT3BlcmE7XG59O1xudmFyIGlzSUVUeXBlID0gZnVuY3Rpb24gaXNJRVR5cGUoX3JlZjI3KSB7XG4gIHZhciBuYW1lID0gX3JlZjI3Lm5hbWU7XG4gIHJldHVybiBuYW1lID09PSBCcm93c2VyVHlwZXMuSW50ZXJuZXRFeHBsb3JlciB8fCBuYW1lID09PSBCcm93c2VyVHlwZXMuSWU7XG59O1xudmFyIGlzTUlVSVR5cGUgPSBmdW5jdGlvbiBpc01JVUlUeXBlKF9yZWYyOCkge1xuICB2YXIgbmFtZSA9IF9yZWYyOC5uYW1lO1xuICByZXR1cm4gbmFtZSA9PT0gQnJvd3NlclR5cGVzLk1JVUk7XG59O1xudmFyIGlzU2Ftc3VuZ0Jyb3dzZXJUeXBlID0gZnVuY3Rpb24gaXNTYW1zdW5nQnJvd3NlclR5cGUoX3JlZjI5KSB7XG4gIHZhciBuYW1lID0gX3JlZjI5Lm5hbWU7XG4gIHJldHVybiBuYW1lID09PSBCcm93c2VyVHlwZXMuU2Ftc3VuZ0Jyb3dzZXI7XG59O1xudmFyIGdldEJyb3dzZXJGdWxsVmVyc2lvbiA9IGZ1bmN0aW9uIGdldEJyb3dzZXJGdWxsVmVyc2lvbihfcmVmMzApIHtcbiAgdmFyIHZlcnNpb24gPSBfcmVmMzAudmVyc2lvbjtcbiAgcmV0dXJuIHNldERlZmF1bHRzKHZlcnNpb24pO1xufTtcbnZhciBnZXRCcm93c2VyVmVyc2lvbiA9IGZ1bmN0aW9uIGdldEJyb3dzZXJWZXJzaW9uKF9yZWYzMSkge1xuICB2YXIgbWFqb3IgPSBfcmVmMzEubWFqb3I7XG4gIHJldHVybiBzZXREZWZhdWx0cyhtYWpvcik7XG59O1xudmFyIGdldEJyb3dzZXJOYW1lID0gZnVuY3Rpb24gZ2V0QnJvd3Nlck5hbWUoX3JlZjMyKSB7XG4gIHZhciBuYW1lID0gX3JlZjMyLm5hbWU7XG4gIHJldHVybiBzZXREZWZhdWx0cyhuYW1lKTtcbn07IC8vIGVuZ2luZSB0eXBlc1xuXG52YXIgZ2V0RW5naW5lTmFtZSA9IGZ1bmN0aW9uIGdldEVuZ2luZU5hbWUoX3JlZjMzKSB7XG4gIHZhciBuYW1lID0gX3JlZjMzLm5hbWU7XG4gIHJldHVybiBzZXREZWZhdWx0cyhuYW1lKTtcbn07XG52YXIgZ2V0RW5naW5lVmVyc2lvbiA9IGZ1bmN0aW9uIGdldEVuZ2luZVZlcnNpb24oX3JlZjM0KSB7XG4gIHZhciB2ZXJzaW9uID0gX3JlZjM0LnZlcnNpb247XG4gIHJldHVybiBzZXREZWZhdWx0cyh2ZXJzaW9uKTtcbn07XG52YXIgaXNFbGVjdHJvblR5cGUgPSBmdW5jdGlvbiBpc0VsZWN0cm9uVHlwZSgpIHtcbiAgdmFyIG5hdiA9IGdldE5hdmlnYXRvckluc3RhbmNlKCk7XG4gIHZhciB1YSA9IG5hdiAmJiBuYXYudXNlckFnZW50ICYmIG5hdi51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIHR5cGVvZiB1YSA9PT0gJ3N0cmluZycgPyAvZWxlY3Ryb24vLnRlc3QodWEpIDogZmFsc2U7XG59O1xudmFyIGlzRWRnZUNocm9taXVtVHlwZSA9IGZ1bmN0aW9uIGlzRWRnZUNocm9taXVtVHlwZSh1YSkge1xuICByZXR1cm4gdHlwZW9mIHVhID09PSAnc3RyaW5nJyAmJiB1YS5pbmRleE9mKCdFZGcvJykgIT09IC0xO1xufTtcbnZhciBnZXRJT1MxMyA9IGZ1bmN0aW9uIGdldElPUzEzKCkge1xuICB2YXIgbmF2ID0gZ2V0TmF2aWdhdG9ySW5zdGFuY2UoKTtcbiAgcmV0dXJuIG5hdiAmJiAoL2lQYWR8aVBob25lfGlQb2QvLnRlc3QobmF2LnBsYXRmb3JtKSB8fCBuYXYucGxhdGZvcm0gPT09ICdNYWNJbnRlbCcgJiYgbmF2Lm1heFRvdWNoUG9pbnRzID4gMSkgJiYgIXdpbmRvdy5NU1N0cmVhbTtcbn07XG52YXIgZ2V0SVBhZDEzID0gZnVuY3Rpb24gZ2V0SVBhZDEzKCkge1xuICByZXR1cm4gaXNJT1MxM0NoZWNrKCdpUGFkJyk7XG59O1xudmFyIGdldElwaG9uZTEzID0gZnVuY3Rpb24gZ2V0SXBob25lMTMoKSB7XG4gIHJldHVybiBpc0lPUzEzQ2hlY2soJ2lQaG9uZScpO1xufTtcbnZhciBnZXRJUG9kMTMgPSBmdW5jdGlvbiBnZXRJUG9kMTMoKSB7XG4gIHJldHVybiBpc0lPUzEzQ2hlY2soJ2lQb2QnKTtcbn07XG52YXIgZ2V0VXNlcmFnZW50ID0gZnVuY3Rpb24gZ2V0VXNlcmFnZW50KHVzZXJBZykge1xuICByZXR1cm4gc2V0RGVmYXVsdHModXNlckFnKTtcbn07XG5cbmZ1bmN0aW9uIGJ1aWxkU2VsZWN0b3JzT2JqZWN0KG9wdGlvbnMpIHtcbiAgdmFyIF9yZWYgPSBvcHRpb25zID8gb3B0aW9ucyA6IFVBSGVscGVyLFxuICAgICAgZGV2aWNlID0gX3JlZi5kZXZpY2UsXG4gICAgICBicm93c2VyID0gX3JlZi5icm93c2VyLFxuICAgICAgb3MgPSBfcmVmLm9zLFxuICAgICAgZW5naW5lID0gX3JlZi5lbmdpbmUsXG4gICAgICB1YSA9IF9yZWYudWE7XG5cbiAgcmV0dXJuIHtcbiAgICBpc1NtYXJ0VFY6IGlzU21hcnRUVlR5cGUoZGV2aWNlKSxcbiAgICBpc0NvbnNvbGU6IGlzQ29uc29sZVR5cGUoZGV2aWNlKSxcbiAgICBpc1dlYXJhYmxlOiBpc1dlYXJhYmxlVHlwZShkZXZpY2UpLFxuICAgIGlzRW1iZWRkZWQ6IGlzRW1iZWRkZWRUeXBlKGRldmljZSksXG4gICAgaXNNb2JpbGVTYWZhcmk6IGlzTW9iaWxlU2FmYXJpVHlwZShicm93c2VyKSB8fCBnZXRJUGFkMTMoKSxcbiAgICBpc0Nocm9taXVtOiBpc0Nocm9taXVtVHlwZShicm93c2VyKSxcbiAgICBpc01vYmlsZTogaXNNb2JpbGVBbmRUYWJsZXRUeXBlKGRldmljZSkgfHwgZ2V0SVBhZDEzKCksXG4gICAgaXNNb2JpbGVPbmx5OiBpc01vYmlsZVR5cGUoZGV2aWNlKSxcbiAgICBpc1RhYmxldDogaXNUYWJsZXRUeXBlKGRldmljZSkgfHwgZ2V0SVBhZDEzKCksXG4gICAgaXNCcm93c2VyOiBpc0Jyb3dzZXJUeXBlKGRldmljZSksXG4gICAgaXNEZXNrdG9wOiBpc0Jyb3dzZXJUeXBlKGRldmljZSksXG4gICAgaXNBbmRyb2lkOiBpc0FuZHJvaWRUeXBlKG9zKSxcbiAgICBpc1dpblBob25lOiBpc1dpblBob25lVHlwZShvcyksXG4gICAgaXNJT1M6IGlzSU9TVHlwZShvcykgfHwgZ2V0SVBhZDEzKCksXG4gICAgaXNDaHJvbWU6IGlzQ2hyb21lVHlwZShicm93c2VyKSxcbiAgICBpc0ZpcmVmb3g6IGlzRmlyZWZveFR5cGUoYnJvd3NlciksXG4gICAgaXNTYWZhcmk6IGlzU2FmYXJpVHlwZShicm93c2VyKSxcbiAgICBpc09wZXJhOiBpc09wZXJhVHlwZShicm93c2VyKSxcbiAgICBpc0lFOiBpc0lFVHlwZShicm93c2VyKSxcbiAgICBvc1ZlcnNpb246IGdldE9zVmVyc2lvbihvcyksXG4gICAgb3NOYW1lOiBnZXRPc05hbWUob3MpLFxuICAgIGZ1bGxCcm93c2VyVmVyc2lvbjogZ2V0QnJvd3NlckZ1bGxWZXJzaW9uKGJyb3dzZXIpLFxuICAgIGJyb3dzZXJWZXJzaW9uOiBnZXRCcm93c2VyVmVyc2lvbihicm93c2VyKSxcbiAgICBicm93c2VyTmFtZTogZ2V0QnJvd3Nlck5hbWUoYnJvd3NlciksXG4gICAgbW9iaWxlVmVuZG9yOiBnZXRNb2JpbGVWZW5kb3IoZGV2aWNlKSxcbiAgICBtb2JpbGVNb2RlbDogZ2V0TW9iaWxlTW9kZWwoZGV2aWNlKSxcbiAgICBlbmdpbmVOYW1lOiBnZXRFbmdpbmVOYW1lKGVuZ2luZSksXG4gICAgZW5naW5lVmVyc2lvbjogZ2V0RW5naW5lVmVyc2lvbihlbmdpbmUpLFxuICAgIGdldFVBOiBnZXRVc2VyYWdlbnQodWEpLFxuICAgIGlzRWRnZTogaXNFZGdlVHlwZShicm93c2VyKSB8fCBpc0VkZ2VDaHJvbWl1bVR5cGUodWEpLFxuICAgIGlzWWFuZGV4OiBpc1lhbmRleFR5cGUoYnJvd3NlciksXG4gICAgZGV2aWNlVHlwZTogZ2V0RGV2aWNlVHlwZShkZXZpY2UpLFxuICAgIGlzSU9TMTM6IGdldElPUzEzKCksXG4gICAgaXNJUGFkMTM6IGdldElQYWQxMygpLFxuICAgIGlzSVBob25lMTM6IGdldElwaG9uZTEzKCksXG4gICAgaXNJUG9kMTM6IGdldElQb2QxMygpLFxuICAgIGlzRWxlY3Ryb246IGlzRWxlY3Ryb25UeXBlKCksXG4gICAgaXNFZGdlQ2hyb21pdW06IGlzRWRnZUNocm9taXVtVHlwZSh1YSksXG4gICAgaXNMZWdhY3lFZGdlOiBpc0VkZ2VUeXBlKGJyb3dzZXIpICYmICFpc0VkZ2VDaHJvbWl1bVR5cGUodWEpLFxuICAgIGlzV2luZG93czogaXNXaW5kb3dzVHlwZShvcyksXG4gICAgaXNNYWNPczogaXNNYWNPc1R5cGUob3MpLFxuICAgIGlzTUlVSTogaXNNSVVJVHlwZShicm93c2VyKSxcbiAgICBpc1NhbXN1bmdCcm93c2VyOiBpc1NhbXN1bmdCcm93c2VyVHlwZShicm93c2VyKVxuICB9O1xufVxuXG52YXIgaXNTbWFydFRWID0gaXNTbWFydFRWVHlwZShkZXZpY2UpO1xudmFyIGlzQ29uc29sZSA9IGlzQ29uc29sZVR5cGUoZGV2aWNlKTtcbnZhciBpc1dlYXJhYmxlID0gaXNXZWFyYWJsZVR5cGUoZGV2aWNlKTtcbnZhciBpc0VtYmVkZGVkID0gaXNFbWJlZGRlZFR5cGUoZGV2aWNlKTtcbnZhciBpc01vYmlsZVNhZmFyaSA9IGlzTW9iaWxlU2FmYXJpVHlwZShicm93c2VyKSB8fCBnZXRJUGFkMTMoKTtcbnZhciBpc0Nocm9taXVtID0gaXNDaHJvbWl1bVR5cGUoYnJvd3Nlcik7XG52YXIgaXNNb2JpbGUgPSBpc01vYmlsZUFuZFRhYmxldFR5cGUoZGV2aWNlKSB8fCBnZXRJUGFkMTMoKTtcbnZhciBpc01vYmlsZU9ubHkgPSBpc01vYmlsZVR5cGUoZGV2aWNlKTtcbnZhciBpc1RhYmxldCA9IGlzVGFibGV0VHlwZShkZXZpY2UpIHx8IGdldElQYWQxMygpO1xudmFyIGlzQnJvd3NlciA9IGlzQnJvd3NlclR5cGUoZGV2aWNlKTtcbnZhciBpc0Rlc2t0b3AgPSBpc0Jyb3dzZXJUeXBlKGRldmljZSk7XG52YXIgaXNBbmRyb2lkID0gaXNBbmRyb2lkVHlwZShvcyk7XG52YXIgaXNXaW5QaG9uZSA9IGlzV2luUGhvbmVUeXBlKG9zKTtcbnZhciBpc0lPUyA9IGlzSU9TVHlwZShvcykgfHwgZ2V0SVBhZDEzKCk7XG52YXIgaXNDaHJvbWUgPSBpc0Nocm9tZVR5cGUoYnJvd3Nlcik7XG52YXIgaXNGaXJlZm94ID0gaXNGaXJlZm94VHlwZShicm93c2VyKTtcbnZhciBpc1NhZmFyaSA9IGlzU2FmYXJpVHlwZShicm93c2VyKTtcbnZhciBpc09wZXJhID0gaXNPcGVyYVR5cGUoYnJvd3Nlcik7XG52YXIgaXNJRSA9IGlzSUVUeXBlKGJyb3dzZXIpO1xudmFyIG9zVmVyc2lvbiA9IGdldE9zVmVyc2lvbihvcyk7XG52YXIgb3NOYW1lID0gZ2V0T3NOYW1lKG9zKTtcbnZhciBmdWxsQnJvd3NlclZlcnNpb24gPSBnZXRCcm93c2VyRnVsbFZlcnNpb24oYnJvd3Nlcik7XG52YXIgYnJvd3NlclZlcnNpb24gPSBnZXRCcm93c2VyVmVyc2lvbihicm93c2VyKTtcbnZhciBicm93c2VyTmFtZSA9IGdldEJyb3dzZXJOYW1lKGJyb3dzZXIpO1xudmFyIG1vYmlsZVZlbmRvciA9IGdldE1vYmlsZVZlbmRvcihkZXZpY2UpO1xudmFyIG1vYmlsZU1vZGVsID0gZ2V0TW9iaWxlTW9kZWwoZGV2aWNlKTtcbnZhciBlbmdpbmVOYW1lID0gZ2V0RW5naW5lTmFtZShlbmdpbmUpO1xudmFyIGVuZ2luZVZlcnNpb24gPSBnZXRFbmdpbmVWZXJzaW9uKGVuZ2luZSk7XG52YXIgZ2V0VUEgPSBnZXRVc2VyYWdlbnQodWEpO1xudmFyIGlzRWRnZSA9IGlzRWRnZVR5cGUoYnJvd3NlcikgfHwgaXNFZGdlQ2hyb21pdW1UeXBlKHVhKTtcbnZhciBpc1lhbmRleCA9IGlzWWFuZGV4VHlwZShicm93c2VyKTtcbnZhciBkZXZpY2VUeXBlID0gZ2V0RGV2aWNlVHlwZShkZXZpY2UpO1xudmFyIGlzSU9TMTMgPSBnZXRJT1MxMygpO1xudmFyIGlzSVBhZDEzID0gZ2V0SVBhZDEzKCk7XG52YXIgaXNJUGhvbmUxMyA9IGdldElwaG9uZTEzKCk7XG52YXIgaXNJUG9kMTMgPSBnZXRJUG9kMTMoKTtcbnZhciBpc0VsZWN0cm9uID0gaXNFbGVjdHJvblR5cGUoKTtcbnZhciBpc0VkZ2VDaHJvbWl1bSA9IGlzRWRnZUNocm9taXVtVHlwZSh1YSk7XG52YXIgaXNMZWdhY3lFZGdlID0gaXNFZGdlVHlwZShicm93c2VyKSAmJiAhaXNFZGdlQ2hyb21pdW1UeXBlKHVhKTtcbnZhciBpc1dpbmRvd3MgPSBpc1dpbmRvd3NUeXBlKG9zKTtcbnZhciBpc01hY09zID0gaXNNYWNPc1R5cGUob3MpO1xudmFyIGlzTUlVSSA9IGlzTUlVSVR5cGUoYnJvd3Nlcik7XG52YXIgaXNTYW1zdW5nQnJvd3NlciA9IGlzU2Ftc3VuZ0Jyb3dzZXJUeXBlKGJyb3dzZXIpO1xudmFyIGdldFNlbGVjdG9yc0J5VXNlckFnZW50ID0gZnVuY3Rpb24gZ2V0U2VsZWN0b3JzQnlVc2VyQWdlbnQodXNlckFnZW50KSB7XG4gIGlmICghdXNlckFnZW50IHx8IHR5cGVvZiB1c2VyQWdlbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgY29uc29sZS5lcnJvcignTm8gdmFsaWQgdXNlciBhZ2VudCBzdHJpbmcgd2FzIHByb3ZpZGVkJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIF9VQUhlbHBlciRwYXJzZVVzZXJBZyA9IHBhcnNlVXNlckFnZW50KHVzZXJBZ2VudCksXG4gICAgICBkZXZpY2UgPSBfVUFIZWxwZXIkcGFyc2VVc2VyQWcuZGV2aWNlLFxuICAgICAgYnJvd3NlciA9IF9VQUhlbHBlciRwYXJzZVVzZXJBZy5icm93c2VyLFxuICAgICAgb3MgPSBfVUFIZWxwZXIkcGFyc2VVc2VyQWcub3MsXG4gICAgICBlbmdpbmUgPSBfVUFIZWxwZXIkcGFyc2VVc2VyQWcuZW5naW5lLFxuICAgICAgdWEgPSBfVUFIZWxwZXIkcGFyc2VVc2VyQWcudWE7XG5cbiAgcmV0dXJuIGJ1aWxkU2VsZWN0b3JzT2JqZWN0KHtcbiAgICBkZXZpY2U6IGRldmljZSxcbiAgICBicm93c2VyOiBicm93c2VyLFxuICAgIG9zOiBvcyxcbiAgICBlbmdpbmU6IGVuZ2luZSxcbiAgICB1YTogdWFcbiAgfSk7XG59O1xuXG52YXIgQW5kcm9pZFZpZXcgPSBmdW5jdGlvbiBBbmRyb2lkVmlldyhfcmVmKSB7XG4gIHZhciByZW5kZXJXaXRoRnJhZ21lbnQgPSBfcmVmLnJlbmRlcldpdGhGcmFnbWVudCxcbiAgICAgIGNoaWxkcmVuID0gX3JlZi5jaGlsZHJlbixcbiAgICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFtcInJlbmRlcldpdGhGcmFnbWVudFwiLCBcImNoaWxkcmVuXCJdKTtcblxuICByZXR1cm4gaXNBbmRyb2lkID8gcmVuZGVyV2l0aEZyYWdtZW50ID8gUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwgY2hpbGRyZW4pIDogUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBwcm9wcywgY2hpbGRyZW4pIDogbnVsbDtcbn07XG52YXIgQnJvd3NlclZpZXcgPSBmdW5jdGlvbiBCcm93c2VyVmlldyhfcmVmMikge1xuICB2YXIgcmVuZGVyV2l0aEZyYWdtZW50ID0gX3JlZjIucmVuZGVyV2l0aEZyYWdtZW50LFxuICAgICAgY2hpbGRyZW4gPSBfcmVmMi5jaGlsZHJlbixcbiAgICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYyLCBbXCJyZW5kZXJXaXRoRnJhZ21lbnRcIiwgXCJjaGlsZHJlblwiXSk7XG5cbiAgcmV0dXJuIGlzQnJvd3NlciA/IHJlbmRlcldpdGhGcmFnbWVudCA/IFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsIGNoaWxkcmVuKSA6IFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgcHJvcHMsIGNoaWxkcmVuKSA6IG51bGw7XG59O1xudmFyIElFVmlldyA9IGZ1bmN0aW9uIElFVmlldyhfcmVmMykge1xuICB2YXIgcmVuZGVyV2l0aEZyYWdtZW50ID0gX3JlZjMucmVuZGVyV2l0aEZyYWdtZW50LFxuICAgICAgY2hpbGRyZW4gPSBfcmVmMy5jaGlsZHJlbixcbiAgICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYzLCBbXCJyZW5kZXJXaXRoRnJhZ21lbnRcIiwgXCJjaGlsZHJlblwiXSk7XG5cbiAgcmV0dXJuIGlzSUUgPyByZW5kZXJXaXRoRnJhZ21lbnQgPyBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLCBjaGlsZHJlbikgOiBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHByb3BzLCBjaGlsZHJlbikgOiBudWxsO1xufTtcbnZhciBJT1NWaWV3ID0gZnVuY3Rpb24gSU9TVmlldyhfcmVmNCkge1xuICB2YXIgcmVuZGVyV2l0aEZyYWdtZW50ID0gX3JlZjQucmVuZGVyV2l0aEZyYWdtZW50LFxuICAgICAgY2hpbGRyZW4gPSBfcmVmNC5jaGlsZHJlbixcbiAgICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWY0LCBbXCJyZW5kZXJXaXRoRnJhZ21lbnRcIiwgXCJjaGlsZHJlblwiXSk7XG5cbiAgcmV0dXJuIGlzSU9TID8gcmVuZGVyV2l0aEZyYWdtZW50ID8gUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwgY2hpbGRyZW4pIDogUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBwcm9wcywgY2hpbGRyZW4pIDogbnVsbDtcbn07XG52YXIgTW9iaWxlVmlldyA9IGZ1bmN0aW9uIE1vYmlsZVZpZXcoX3JlZjUpIHtcbiAgdmFyIHJlbmRlcldpdGhGcmFnbWVudCA9IF9yZWY1LnJlbmRlcldpdGhGcmFnbWVudCxcbiAgICAgIGNoaWxkcmVuID0gX3JlZjUuY2hpbGRyZW4sXG4gICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmNSwgW1wicmVuZGVyV2l0aEZyYWdtZW50XCIsIFwiY2hpbGRyZW5cIl0pO1xuXG4gIHJldHVybiBpc01vYmlsZSA/IHJlbmRlcldpdGhGcmFnbWVudCA/IFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsIGNoaWxkcmVuKSA6IFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgcHJvcHMsIGNoaWxkcmVuKSA6IG51bGw7XG59O1xudmFyIFRhYmxldFZpZXcgPSBmdW5jdGlvbiBUYWJsZXRWaWV3KF9yZWY2KSB7XG4gIHZhciByZW5kZXJXaXRoRnJhZ21lbnQgPSBfcmVmNi5yZW5kZXJXaXRoRnJhZ21lbnQsXG4gICAgICBjaGlsZHJlbiA9IF9yZWY2LmNoaWxkcmVuLFxuICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZjYsIFtcInJlbmRlcldpdGhGcmFnbWVudFwiLCBcImNoaWxkcmVuXCJdKTtcblxuICByZXR1cm4gaXNUYWJsZXQgPyByZW5kZXJXaXRoRnJhZ21lbnQgPyBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLCBjaGlsZHJlbikgOiBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHByb3BzLCBjaGlsZHJlbikgOiBudWxsO1xufTtcbnZhciBXaW5QaG9uZVZpZXcgPSBmdW5jdGlvbiBXaW5QaG9uZVZpZXcoX3JlZjcpIHtcbiAgdmFyIHJlbmRlcldpdGhGcmFnbWVudCA9IF9yZWY3LnJlbmRlcldpdGhGcmFnbWVudCxcbiAgICAgIGNoaWxkcmVuID0gX3JlZjcuY2hpbGRyZW4sXG4gICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmNywgW1wicmVuZGVyV2l0aEZyYWdtZW50XCIsIFwiY2hpbGRyZW5cIl0pO1xuXG4gIHJldHVybiBpc1dpblBob25lID8gcmVuZGVyV2l0aEZyYWdtZW50ID8gUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwgY2hpbGRyZW4pIDogUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBwcm9wcywgY2hpbGRyZW4pIDogbnVsbDtcbn07XG52YXIgTW9iaWxlT25seVZpZXcgPSBmdW5jdGlvbiBNb2JpbGVPbmx5VmlldyhfcmVmOCkge1xuICB2YXIgcmVuZGVyV2l0aEZyYWdtZW50ID0gX3JlZjgucmVuZGVyV2l0aEZyYWdtZW50LFxuICAgICAgY2hpbGRyZW4gPSBfcmVmOC5jaGlsZHJlbixcbiAgICAgIHZpZXdDbGFzc05hbWUgPSBfcmVmOC52aWV3Q2xhc3NOYW1lLFxuICAgICAgc3R5bGUgPSBfcmVmOC5zdHlsZSxcbiAgICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWY4LCBbXCJyZW5kZXJXaXRoRnJhZ21lbnRcIiwgXCJjaGlsZHJlblwiLCBcInZpZXdDbGFzc05hbWVcIiwgXCJzdHlsZVwiXSk7XG5cbiAgcmV0dXJuIGlzTW9iaWxlT25seSA/IHJlbmRlcldpdGhGcmFnbWVudCA/IFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsIGNoaWxkcmVuKSA6IFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgcHJvcHMsIGNoaWxkcmVuKSA6IG51bGw7XG59O1xudmFyIFNtYXJ0VFZWaWV3ID0gZnVuY3Rpb24gU21hcnRUVlZpZXcoX3JlZjkpIHtcbiAgdmFyIHJlbmRlcldpdGhGcmFnbWVudCA9IF9yZWY5LnJlbmRlcldpdGhGcmFnbWVudCxcbiAgICAgIGNoaWxkcmVuID0gX3JlZjkuY2hpbGRyZW4sXG4gICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmOSwgW1wicmVuZGVyV2l0aEZyYWdtZW50XCIsIFwiY2hpbGRyZW5cIl0pO1xuXG4gIHJldHVybiBpc1NtYXJ0VFYgPyByZW5kZXJXaXRoRnJhZ21lbnQgPyBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLCBjaGlsZHJlbikgOiBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHByb3BzLCBjaGlsZHJlbikgOiBudWxsO1xufTtcbnZhciBDb25zb2xlVmlldyA9IGZ1bmN0aW9uIENvbnNvbGVWaWV3KF9yZWYxMCkge1xuICB2YXIgcmVuZGVyV2l0aEZyYWdtZW50ID0gX3JlZjEwLnJlbmRlcldpdGhGcmFnbWVudCxcbiAgICAgIGNoaWxkcmVuID0gX3JlZjEwLmNoaWxkcmVuLFxuICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZjEwLCBbXCJyZW5kZXJXaXRoRnJhZ21lbnRcIiwgXCJjaGlsZHJlblwiXSk7XG5cbiAgcmV0dXJuIGlzQ29uc29sZSA/IHJlbmRlcldpdGhGcmFnbWVudCA/IFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsIGNoaWxkcmVuKSA6IFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgcHJvcHMsIGNoaWxkcmVuKSA6IG51bGw7XG59O1xudmFyIFdlYXJhYmxlVmlldyA9IGZ1bmN0aW9uIFdlYXJhYmxlVmlldyhfcmVmMTEpIHtcbiAgdmFyIHJlbmRlcldpdGhGcmFnbWVudCA9IF9yZWYxMS5yZW5kZXJXaXRoRnJhZ21lbnQsXG4gICAgICBjaGlsZHJlbiA9IF9yZWYxMS5jaGlsZHJlbixcbiAgICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYxMSwgW1wicmVuZGVyV2l0aEZyYWdtZW50XCIsIFwiY2hpbGRyZW5cIl0pO1xuXG4gIHJldHVybiBpc1dlYXJhYmxlID8gcmVuZGVyV2l0aEZyYWdtZW50ID8gUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwgY2hpbGRyZW4pIDogUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBwcm9wcywgY2hpbGRyZW4pIDogbnVsbDtcbn07XG52YXIgQ3VzdG9tVmlldyA9IGZ1bmN0aW9uIEN1c3RvbVZpZXcoX3JlZjEyKSB7XG4gIHZhciByZW5kZXJXaXRoRnJhZ21lbnQgPSBfcmVmMTIucmVuZGVyV2l0aEZyYWdtZW50LFxuICAgICAgY2hpbGRyZW4gPSBfcmVmMTIuY2hpbGRyZW4sXG4gICAgICB2aWV3Q2xhc3NOYW1lID0gX3JlZjEyLnZpZXdDbGFzc05hbWUsXG4gICAgICBzdHlsZSA9IF9yZWYxMi5zdHlsZSxcbiAgICAgIGNvbmRpdGlvbiA9IF9yZWYxMi5jb25kaXRpb24sXG4gICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmMTIsIFtcInJlbmRlcldpdGhGcmFnbWVudFwiLCBcImNoaWxkcmVuXCIsIFwidmlld0NsYXNzTmFtZVwiLCBcInN0eWxlXCIsIFwiY29uZGl0aW9uXCJdKTtcblxuICByZXR1cm4gY29uZGl0aW9uID8gcmVuZGVyV2l0aEZyYWdtZW50ID8gUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwgY2hpbGRyZW4pIDogUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBwcm9wcywgY2hpbGRyZW4pIDogbnVsbDtcbn07XG5cbmZ1bmN0aW9uIHdpdGhPcmllbnRhdGlvbkNoYW5nZShXcmFwcGVkQ29tcG9uZW50KSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoX2NsYXNzLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIF9jbGFzcyhwcm9wcykge1xuICAgICAgdmFyIF90aGlzO1xuXG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgX2NsYXNzKTtcblxuICAgICAgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoX2NsYXNzKS5jYWxsKHRoaXMsIHByb3BzKSk7XG4gICAgICBfdGhpcy5pc0V2ZW50TGlzdGVuZXJBZGRlZCA9IGZhbHNlO1xuICAgICAgX3RoaXMuaGFuZGxlT3JpZW50YXRpb25DaGFuZ2UgPSBfdGhpcy5oYW5kbGVPcmllbnRhdGlvbkNoYW5nZS5iaW5kKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcbiAgICAgIF90aGlzLm9uT3JpZW50YXRpb25DaGFuZ2UgPSBfdGhpcy5vbk9yaWVudGF0aW9uQ2hhbmdlLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuICAgICAgX3RoaXMub25QYWdlTG9hZCA9IF90aGlzLm9uUGFnZUxvYWQuYmluZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSk7XG4gICAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgaXNMYW5kc2NhcGU6IGZhbHNlLFxuICAgICAgICBpc1BvcnRyYWl0OiBmYWxzZVxuICAgICAgfTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoX2NsYXNzLCBbe1xuICAgICAga2V5OiBcImhhbmRsZU9yaWVudGF0aW9uQ2hhbmdlXCIsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlT3JpZW50YXRpb25DaGFuZ2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0V2ZW50TGlzdGVuZXJBZGRlZCkge1xuICAgICAgICAgIHRoaXMuaXNFdmVudExpc3RlbmVyQWRkZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG9yaWVudGF0aW9uID0gd2luZG93LmlubmVyV2lkdGggPiB3aW5kb3cuaW5uZXJIZWlnaHQgPyA5MCA6IDA7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGlzUG9ydHJhaXQ6IG9yaWVudGF0aW9uID09PSAwLFxuICAgICAgICAgIGlzTGFuZHNjYXBlOiBvcmllbnRhdGlvbiA9PT0gOTBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiBcIm9uT3JpZW50YXRpb25DaGFuZ2VcIixcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBvbk9yaWVudGF0aW9uQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLmhhbmRsZU9yaWVudGF0aW9uQ2hhbmdlKCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiBcIm9uUGFnZUxvYWRcIixcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBvblBhZ2VMb2FkKCkge1xuICAgICAgICB0aGlzLmhhbmRsZU9yaWVudGF0aW9uQ2hhbmdlKCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiBcImNvbXBvbmVudERpZE1vdW50XCIsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICgodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKHdpbmRvdykpICE9PSB1bmRlZmluZWQgJiYgaXNNb2JpbGUpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuaXNFdmVudExpc3RlbmVyQWRkZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlT3JpZW50YXRpb25DaGFuZ2UoKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCB0aGlzLm9uUGFnZUxvYWQsIGZhbHNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHRoaXMub25QYWdlTG9hZCwgZmFsc2UpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMub25PcmllbnRhdGlvbkNoYW5nZSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiBcImNvbXBvbmVudFdpbGxVbm1vdW50XCIsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMub25PcmllbnRhdGlvbkNoYW5nZSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogXCJyZW5kZXJcIixcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFdyYXBwZWRDb21wb25lbnQsIF9leHRlbmRzKHt9LCB0aGlzLnByb3BzLCB7XG4gICAgICAgICAgaXNMYW5kc2NhcGU6IHRoaXMuc3RhdGUuaXNMYW5kc2NhcGUsXG4gICAgICAgICAgaXNQb3J0cmFpdDogdGhpcy5zdGF0ZS5pc1BvcnRyYWl0XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gX2NsYXNzO1xuICB9KFJlYWN0X19kZWZhdWx0LkNvbXBvbmVudCk7XG59XG5cbmZ1bmN0aW9uIHVzZU1vYmlsZU9yaWVudGF0aW9uKCkge1xuICB2YXIgX3VzZVN0YXRlID0gUmVhY3QudXNlU3RhdGUoZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcmllbnRhdGlvbiA9IHdpbmRvdy5pbm5lcldpZHRoID4gd2luZG93LmlubmVySGVpZ2h0ID8gOTAgOiAwO1xuICAgIHJldHVybiB7XG4gICAgICBpc1BvcnRyYWl0OiBvcmllbnRhdGlvbiA9PT0gMCxcbiAgICAgIGlzTGFuZHNjYXBlOiBvcmllbnRhdGlvbiA9PT0gOTAsXG4gICAgICBvcmllbnRhdGlvbjogb3JpZW50YXRpb24gPT09IDAgPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZSdcbiAgICB9O1xuICB9KSxcbiAgICAgIF91c2VTdGF0ZTIgPSBfc2xpY2VkVG9BcnJheShfdXNlU3RhdGUsIDIpLFxuICAgICAgc3RhdGUgPSBfdXNlU3RhdGUyWzBdLFxuICAgICAgc2V0U3RhdGUgPSBfdXNlU3RhdGUyWzFdO1xuXG4gIHZhciBoYW5kbGVPcmllbnRhdGlvbkNoYW5nZSA9IFJlYWN0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3JpZW50YXRpb24gPSB3aW5kb3cuaW5uZXJXaWR0aCA+IHdpbmRvdy5pbm5lckhlaWdodCA/IDkwIDogMDtcbiAgICB2YXIgbmV4dCA9IHtcbiAgICAgIGlzUG9ydHJhaXQ6IG9yaWVudGF0aW9uID09PSAwLFxuICAgICAgaXNMYW5kc2NhcGU6IG9yaWVudGF0aW9uID09PSA5MCxcbiAgICAgIG9yaWVudGF0aW9uOiBvcmllbnRhdGlvbiA9PT0gMCA/ICdwb3J0cmFpdCcgOiAnbGFuZHNjYXBlJ1xuICAgIH07XG4gICAgc3RhdGUub3JpZW50YXRpb24gIT09IG5leHQub3JpZW50YXRpb24gJiYgc2V0U3RhdGUobmV4dCk7XG4gIH0sIFtzdGF0ZS5vcmllbnRhdGlvbl0pO1xuICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgIGlmICgodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKHdpbmRvdykpICE9PSB1bmRlZmluZWQgJiYgaXNNb2JpbGUpIHtcbiAgICAgIGhhbmRsZU9yaWVudGF0aW9uQ2hhbmdlKCk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgaGFuZGxlT3JpZW50YXRpb25DaGFuZ2UsIGZhbHNlKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGhhbmRsZU9yaWVudGF0aW9uQ2hhbmdlLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGhhbmRsZU9yaWVudGF0aW9uQ2hhbmdlLCBmYWxzZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgaGFuZGxlT3JpZW50YXRpb25DaGFuZ2UsIGZhbHNlKTtcbiAgICB9O1xuICB9LCBbaGFuZGxlT3JpZW50YXRpb25DaGFuZ2VdKTtcbiAgcmV0dXJuIHN0YXRlO1xufVxuXG5mdW5jdGlvbiB1c2VEZXZpY2VEYXRhKHVzZXJBZ2VudCkge1xuICB2YXIgaG9va1VzZXJBZ2VudCA9IHVzZXJBZ2VudCA/IHVzZXJBZ2VudCA6IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICByZXR1cm4gcGFyc2VVc2VyQWdlbnQoaG9va1VzZXJBZ2VudCk7XG59XG5cbmZ1bmN0aW9uIHVzZURldmljZVNlbGVjdG9ycyh1c2VyQWdlbnQpIHtcbiAgdmFyIGhvb2tVc2VyQWdlbnQgPSB1c2VyQWdlbnQgPyB1c2VyQWdlbnQgOiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgdmFyIGRldmljZURhdGEgPSB1c2VEZXZpY2VEYXRhKGhvb2tVc2VyQWdlbnQpO1xuICB2YXIgc2VsZWN0b3JzID0gYnVpbGRTZWxlY3RvcnNPYmplY3QoZGV2aWNlRGF0YSk7XG4gIHJldHVybiBbc2VsZWN0b3JzLCBkZXZpY2VEYXRhXTtcbn1cblxuZXhwb3J0cy5BbmRyb2lkVmlldyA9IEFuZHJvaWRWaWV3O1xuZXhwb3J0cy5Ccm93c2VyVHlwZXMgPSBCcm93c2VyVHlwZXM7XG5leHBvcnRzLkJyb3dzZXJWaWV3ID0gQnJvd3NlclZpZXc7XG5leHBvcnRzLkNvbnNvbGVWaWV3ID0gQ29uc29sZVZpZXc7XG5leHBvcnRzLkN1c3RvbVZpZXcgPSBDdXN0b21WaWV3O1xuZXhwb3J0cy5JRVZpZXcgPSBJRVZpZXc7XG5leHBvcnRzLklPU1ZpZXcgPSBJT1NWaWV3O1xuZXhwb3J0cy5Nb2JpbGVPbmx5VmlldyA9IE1vYmlsZU9ubHlWaWV3O1xuZXhwb3J0cy5Nb2JpbGVWaWV3ID0gTW9iaWxlVmlldztcbmV4cG9ydHMuT3NUeXBlcyA9IE9zVHlwZXM7XG5leHBvcnRzLlNtYXJ0VFZWaWV3ID0gU21hcnRUVlZpZXc7XG5leHBvcnRzLlRhYmxldFZpZXcgPSBUYWJsZXRWaWV3O1xuZXhwb3J0cy5XZWFyYWJsZVZpZXcgPSBXZWFyYWJsZVZpZXc7XG5leHBvcnRzLldpblBob25lVmlldyA9IFdpblBob25lVmlldztcbmV4cG9ydHMuYnJvd3Nlck5hbWUgPSBicm93c2VyTmFtZTtcbmV4cG9ydHMuYnJvd3NlclZlcnNpb24gPSBicm93c2VyVmVyc2lvbjtcbmV4cG9ydHMuZGV2aWNlRGV0ZWN0ID0gZGV2aWNlRGV0ZWN0O1xuZXhwb3J0cy5kZXZpY2VUeXBlID0gZGV2aWNlVHlwZTtcbmV4cG9ydHMuZW5naW5lTmFtZSA9IGVuZ2luZU5hbWU7XG5leHBvcnRzLmVuZ2luZVZlcnNpb24gPSBlbmdpbmVWZXJzaW9uO1xuZXhwb3J0cy5mdWxsQnJvd3NlclZlcnNpb24gPSBmdWxsQnJvd3NlclZlcnNpb247XG5leHBvcnRzLmdldFNlbGVjdG9yc0J5VXNlckFnZW50ID0gZ2V0U2VsZWN0b3JzQnlVc2VyQWdlbnQ7XG5leHBvcnRzLmdldFVBID0gZ2V0VUE7XG5leHBvcnRzLmlzQW5kcm9pZCA9IGlzQW5kcm9pZDtcbmV4cG9ydHMuaXNCcm93c2VyID0gaXNCcm93c2VyO1xuZXhwb3J0cy5pc0Nocm9tZSA9IGlzQ2hyb21lO1xuZXhwb3J0cy5pc0Nocm9taXVtID0gaXNDaHJvbWl1bTtcbmV4cG9ydHMuaXNDb25zb2xlID0gaXNDb25zb2xlO1xuZXhwb3J0cy5pc0Rlc2t0b3AgPSBpc0Rlc2t0b3A7XG5leHBvcnRzLmlzRWRnZSA9IGlzRWRnZTtcbmV4cG9ydHMuaXNFZGdlQ2hyb21pdW0gPSBpc0VkZ2VDaHJvbWl1bTtcbmV4cG9ydHMuaXNFbGVjdHJvbiA9IGlzRWxlY3Ryb247XG5leHBvcnRzLmlzRW1iZWRkZWQgPSBpc0VtYmVkZGVkO1xuZXhwb3J0cy5pc0ZpcmVmb3ggPSBpc0ZpcmVmb3g7XG5leHBvcnRzLmlzSUUgPSBpc0lFO1xuZXhwb3J0cy5pc0lPUyA9IGlzSU9TO1xuZXhwb3J0cy5pc0lPUzEzID0gaXNJT1MxMztcbmV4cG9ydHMuaXNJUGFkMTMgPSBpc0lQYWQxMztcbmV4cG9ydHMuaXNJUGhvbmUxMyA9IGlzSVBob25lMTM7XG5leHBvcnRzLmlzSVBvZDEzID0gaXNJUG9kMTM7XG5leHBvcnRzLmlzTGVnYWN5RWRnZSA9IGlzTGVnYWN5RWRnZTtcbmV4cG9ydHMuaXNNSVVJID0gaXNNSVVJO1xuZXhwb3J0cy5pc01hY09zID0gaXNNYWNPcztcbmV4cG9ydHMuaXNNb2JpbGUgPSBpc01vYmlsZTtcbmV4cG9ydHMuaXNNb2JpbGVPbmx5ID0gaXNNb2JpbGVPbmx5O1xuZXhwb3J0cy5pc01vYmlsZVNhZmFyaSA9IGlzTW9iaWxlU2FmYXJpO1xuZXhwb3J0cy5pc09wZXJhID0gaXNPcGVyYTtcbmV4cG9ydHMuaXNTYWZhcmkgPSBpc1NhZmFyaTtcbmV4cG9ydHMuaXNTYW1zdW5nQnJvd3NlciA9IGlzU2Ftc3VuZ0Jyb3dzZXI7XG5leHBvcnRzLmlzU21hcnRUViA9IGlzU21hcnRUVjtcbmV4cG9ydHMuaXNUYWJsZXQgPSBpc1RhYmxldDtcbmV4cG9ydHMuaXNXZWFyYWJsZSA9IGlzV2VhcmFibGU7XG5leHBvcnRzLmlzV2luUGhvbmUgPSBpc1dpblBob25lO1xuZXhwb3J0cy5pc1dpbmRvd3MgPSBpc1dpbmRvd3M7XG5leHBvcnRzLmlzWWFuZGV4ID0gaXNZYW5kZXg7XG5leHBvcnRzLm1vYmlsZU1vZGVsID0gbW9iaWxlTW9kZWw7XG5leHBvcnRzLm1vYmlsZVZlbmRvciA9IG1vYmlsZVZlbmRvcjtcbmV4cG9ydHMub3NOYW1lID0gb3NOYW1lO1xuZXhwb3J0cy5vc1ZlcnNpb24gPSBvc1ZlcnNpb247XG5leHBvcnRzLnBhcnNlVXNlckFnZW50ID0gcGFyc2VVc2VyQWdlbnQ7XG5leHBvcnRzLnNldFVzZXJBZ2VudCA9IHNldFVzZXJBZ2VudDtcbmV4cG9ydHMudXNlRGV2aWNlRGF0YSA9IHVzZURldmljZURhdGE7XG5leHBvcnRzLnVzZURldmljZVNlbGVjdG9ycyA9IHVzZURldmljZVNlbGVjdG9ycztcbmV4cG9ydHMudXNlTW9iaWxlT3JpZW50YXRpb24gPSB1c2VNb2JpbGVPcmllbnRhdGlvbjtcbmV4cG9ydHMud2l0aE9yaWVudGF0aW9uQ2hhbmdlID0gd2l0aE9yaWVudGF0aW9uQ2hhbmdlO1xuIiwiLyogVUFQYXJzZXIuanMgdjEuMC4zOVxuICAgQ29weXJpZ2h0IMKpIDIwMTItMjAyMSBGYWlzYWwgU2FsbWFuIDxmQGZhaXNhbG1hbi5jb20+XG4gICBNSVQgTGljZW5zZSAqL1xuKGZ1bmN0aW9uKHdpbmRvdyx1bmRlZmluZWQpe1widXNlIHN0cmljdFwiO3ZhciBMSUJWRVJTSU9OPVwiMS4wLjM5XCIsRU1QVFk9XCJcIixVTktOT1dOPVwiP1wiLEZVTkNfVFlQRT1cImZ1bmN0aW9uXCIsVU5ERUZfVFlQRT1cInVuZGVmaW5lZFwiLE9CSl9UWVBFPVwib2JqZWN0XCIsU1RSX1RZUEU9XCJzdHJpbmdcIixNQUpPUj1cIm1ham9yXCIsTU9ERUw9XCJtb2RlbFwiLE5BTUU9XCJuYW1lXCIsVFlQRT1cInR5cGVcIixWRU5ET1I9XCJ2ZW5kb3JcIixWRVJTSU9OPVwidmVyc2lvblwiLEFSQ0hJVEVDVFVSRT1cImFyY2hpdGVjdHVyZVwiLENPTlNPTEU9XCJjb25zb2xlXCIsTU9CSUxFPVwibW9iaWxlXCIsVEFCTEVUPVwidGFibGV0XCIsU01BUlRUVj1cInNtYXJ0dHZcIixXRUFSQUJMRT1cIndlYXJhYmxlXCIsRU1CRURERUQ9XCJlbWJlZGRlZFwiLFVBX01BWF9MRU5HVEg9NTAwO3ZhciBBTUFaT049XCJBbWF6b25cIixBUFBMRT1cIkFwcGxlXCIsQVNVUz1cIkFTVVNcIixCTEFDS0JFUlJZPVwiQmxhY2tCZXJyeVwiLEJST1dTRVI9XCJCcm93c2VyXCIsQ0hST01FPVwiQ2hyb21lXCIsRURHRT1cIkVkZ2VcIixGSVJFRk9YPVwiRmlyZWZveFwiLEdPT0dMRT1cIkdvb2dsZVwiLEhVQVdFST1cIkh1YXdlaVwiLExHPVwiTEdcIixNSUNST1NPRlQ9XCJNaWNyb3NvZnRcIixNT1RPUk9MQT1cIk1vdG9yb2xhXCIsT1BFUkE9XCJPcGVyYVwiLFNBTVNVTkc9XCJTYW1zdW5nXCIsU0hBUlA9XCJTaGFycFwiLFNPTlk9XCJTb255XCIsWElBT01JPVwiWGlhb21pXCIsWkVCUkE9XCJaZWJyYVwiLEZBQ0VCT09LPVwiRmFjZWJvb2tcIixDSFJPTUlVTV9PUz1cIkNocm9taXVtIE9TXCIsTUFDX09TPVwiTWFjIE9TXCIsU1VGRklYX0JST1dTRVI9XCIgQnJvd3NlclwiO3ZhciBleHRlbmQ9ZnVuY3Rpb24ocmVnZXhlcyxleHRlbnNpb25zKXt2YXIgbWVyZ2VkUmVnZXhlcz17fTtmb3IodmFyIGkgaW4gcmVnZXhlcyl7aWYoZXh0ZW5zaW9uc1tpXSYmZXh0ZW5zaW9uc1tpXS5sZW5ndGglMj09PTApe21lcmdlZFJlZ2V4ZXNbaV09ZXh0ZW5zaW9uc1tpXS5jb25jYXQocmVnZXhlc1tpXSl9ZWxzZXttZXJnZWRSZWdleGVzW2ldPXJlZ2V4ZXNbaV19fXJldHVybiBtZXJnZWRSZWdleGVzfSxlbnVtZXJpemU9ZnVuY3Rpb24oYXJyKXt2YXIgZW51bXM9e307Zm9yKHZhciBpPTA7aTxhcnIubGVuZ3RoO2krKyl7ZW51bXNbYXJyW2ldLnRvVXBwZXJDYXNlKCldPWFycltpXX1yZXR1cm4gZW51bXN9LGhhcz1mdW5jdGlvbihzdHIxLHN0cjIpe3JldHVybiB0eXBlb2Ygc3RyMT09PVNUUl9UWVBFP2xvd2VyaXplKHN0cjIpLmluZGV4T2YobG93ZXJpemUoc3RyMSkpIT09LTE6ZmFsc2V9LGxvd2VyaXplPWZ1bmN0aW9uKHN0cil7cmV0dXJuIHN0ci50b0xvd2VyQ2FzZSgpfSxtYWpvcml6ZT1mdW5jdGlvbih2ZXJzaW9uKXtyZXR1cm4gdHlwZW9mIHZlcnNpb249PT1TVFJfVFlQRT92ZXJzaW9uLnJlcGxhY2UoL1teXFxkXFwuXS9nLEVNUFRZKS5zcGxpdChcIi5cIilbMF06dW5kZWZpbmVkfSx0cmltPWZ1bmN0aW9uKHN0cixsZW4pe2lmKHR5cGVvZiBzdHI9PT1TVFJfVFlQRSl7c3RyPXN0ci5yZXBsYWNlKC9eXFxzXFxzKi8sRU1QVFkpO3JldHVybiB0eXBlb2YgbGVuPT09VU5ERUZfVFlQRT9zdHI6c3RyLnN1YnN0cmluZygwLFVBX01BWF9MRU5HVEgpfX07dmFyIHJneE1hcHBlcj1mdW5jdGlvbih1YSxhcnJheXMpe3ZhciBpPTAsaixrLHAscSxtYXRjaGVzLG1hdGNoO3doaWxlKGk8YXJyYXlzLmxlbmd0aCYmIW1hdGNoZXMpe3ZhciByZWdleD1hcnJheXNbaV0scHJvcHM9YXJyYXlzW2krMV07aj1rPTA7d2hpbGUoajxyZWdleC5sZW5ndGgmJiFtYXRjaGVzKXtpZighcmVnZXhbal0pe2JyZWFrfW1hdGNoZXM9cmVnZXhbaisrXS5leGVjKHVhKTtpZighIW1hdGNoZXMpe2ZvcihwPTA7cDxwcm9wcy5sZW5ndGg7cCsrKXttYXRjaD1tYXRjaGVzWysra107cT1wcm9wc1twXTtpZih0eXBlb2YgcT09PU9CSl9UWVBFJiZxLmxlbmd0aD4wKXtpZihxLmxlbmd0aD09PTIpe2lmKHR5cGVvZiBxWzFdPT1GVU5DX1RZUEUpe3RoaXNbcVswXV09cVsxXS5jYWxsKHRoaXMsbWF0Y2gpfWVsc2V7dGhpc1txWzBdXT1xWzFdfX1lbHNlIGlmKHEubGVuZ3RoPT09Myl7aWYodHlwZW9mIHFbMV09PT1GVU5DX1RZUEUmJiEocVsxXS5leGVjJiZxWzFdLnRlc3QpKXt0aGlzW3FbMF1dPW1hdGNoP3FbMV0uY2FsbCh0aGlzLG1hdGNoLHFbMl0pOnVuZGVmaW5lZH1lbHNle3RoaXNbcVswXV09bWF0Y2g/bWF0Y2gucmVwbGFjZShxWzFdLHFbMl0pOnVuZGVmaW5lZH19ZWxzZSBpZihxLmxlbmd0aD09PTQpe3RoaXNbcVswXV09bWF0Y2g/cVszXS5jYWxsKHRoaXMsbWF0Y2gucmVwbGFjZShxWzFdLHFbMl0pKTp1bmRlZmluZWR9fWVsc2V7dGhpc1txXT1tYXRjaD9tYXRjaDp1bmRlZmluZWR9fX19aSs9Mn19LHN0ck1hcHBlcj1mdW5jdGlvbihzdHIsbWFwKXtmb3IodmFyIGkgaW4gbWFwKXtpZih0eXBlb2YgbWFwW2ldPT09T0JKX1RZUEUmJm1hcFtpXS5sZW5ndGg+MCl7Zm9yKHZhciBqPTA7ajxtYXBbaV0ubGVuZ3RoO2orKyl7aWYoaGFzKG1hcFtpXVtqXSxzdHIpKXtyZXR1cm4gaT09PVVOS05PV04/dW5kZWZpbmVkOml9fX1lbHNlIGlmKGhhcyhtYXBbaV0sc3RyKSl7cmV0dXJuIGk9PT1VTktOT1dOP3VuZGVmaW5lZDppfX1yZXR1cm4gbWFwLmhhc093blByb3BlcnR5KFwiKlwiKT9tYXBbXCIqXCJdOnN0cn07dmFyIG9sZFNhZmFyaU1hcD17XCIxLjBcIjpcIi84XCIsMS4yOlwiLzFcIiwxLjM6XCIvM1wiLFwiMi4wXCI6XCIvNDEyXCIsXCIyLjAuMlwiOlwiLzQxNlwiLFwiMi4wLjNcIjpcIi80MTdcIixcIjIuMC40XCI6XCIvNDE5XCIsXCI/XCI6XCIvXCJ9LHdpbmRvd3NWZXJzaW9uTWFwPXtNRTpcIjQuOTBcIixcIk5UIDMuMTFcIjpcIk5UMy41MVwiLFwiTlQgNC4wXCI6XCJOVDQuMFwiLDJlMzpcIk5UIDUuMFwiLFhQOltcIk5UIDUuMVwiLFwiTlQgNS4yXCJdLFZpc3RhOlwiTlQgNi4wXCIsNzpcIk5UIDYuMVwiLDg6XCJOVCA2LjJcIiw4LjE6XCJOVCA2LjNcIiwxMDpbXCJOVCA2LjRcIixcIk5UIDEwLjBcIl0sUlQ6XCJBUk1cIn07dmFyIHJlZ2V4ZXM9e2Jyb3dzZXI6W1svXFxiKD86Y3Jtb3xjcmlvcylcXC8oW1xcd1xcLl0rKS9pXSxbVkVSU0lPTixbTkFNRSxcIkNocm9tZVwiXV0sWy9lZGcoPzplfGlvc3xhKT9cXC8oW1xcd1xcLl0rKS9pXSxbVkVSU0lPTixbTkFNRSxcIkVkZ2VcIl1dLFsvKG9wZXJhIG1pbmkpXFwvKFstXFx3XFwuXSspL2ksLyhvcGVyYSBbbW9iaWxldGFiXXszLDZ9KVxcYi4rdmVyc2lvblxcLyhbLVxcd1xcLl0rKS9pLC8ob3BlcmEpKD86Lit2ZXJzaW9uXFwvfFtcXC8gXSspKFtcXHdcXC5dKykvaV0sW05BTUUsVkVSU0lPTl0sWy9vcGlvc1tcXC8gXSsoW1xcd1xcLl0rKS9pXSxbVkVSU0lPTixbTkFNRSxPUEVSQStcIiBNaW5pXCJdXSxbL1xcYm9wKD86cmcpP3hcXC8oW1xcd1xcLl0rKS9pXSxbVkVSU0lPTixbTkFNRSxPUEVSQStcIiBHWFwiXV0sWy9cXGJvcHJcXC8oW1xcd1xcLl0rKS9pXSxbVkVSU0lPTixbTkFNRSxPUEVSQV1dLFsvXFxiYlthaV0qZCg/OnVoZHxbdWJdKlthZWtvcHJzd3hdezUsNn0pW1xcLyBdPyhbXFx3XFwuXSspL2ldLFtWRVJTSU9OLFtOQU1FLFwiQmFpZHVcIl1dLFsvKGtpbmRsZSlcXC8oW1xcd1xcLl0rKS9pLC8obHVuYXNjYXBlfG1heHRob258bmV0ZnJvbnR8amFzbWluZXxibGF6ZXJ8c2xlaXBuaXIpW1xcLyBdPyhbXFx3XFwuXSopL2ksLyhhdmFudHxpZW1vYmlsZXxzbGltKVxccz8oPzpicm93c2VyKT9bXFwvIF0/KFtcXHdcXC5dKikvaSwvKD86bXN8XFwoKShpZSkgKFtcXHdcXC5dKykvaSwvKGZsb2NrfHJvY2ttZWx0fG1pZG9yaXxlcGlwaGFueXxzaWxrfHNreWZpcmV8b3ZpYnJvd3Nlcnxib2x0fGlyb258dml2YWxkaXxpcmlkaXVtfHBoYW50b21qc3xib3dzZXJ8cXVwemlsbGF8ZmFsa29ufHJla29ucXxwdWZmaW58YnJhdmV8d2hhbGUoPyEuK25hdmVyKXxxcWJyb3dzZXJsaXRlfGR1Y2tkdWNrZ298a2xhcnxoZWxpbylcXC8oWy1cXHdcXC5dKykvaSwvKGhleXRhcHxvdmkpYnJvd3NlclxcLyhbXFxkXFwuXSspL2ksLyh3ZWlibylfXyhbXFxkXFwuXSspL2ldLFtOQU1FLFZFUlNJT05dLFsvcXVhcmsoPzpwYyk/XFwvKFstXFx3XFwuXSspL2ldLFtWRVJTSU9OLFtOQU1FLFwiUXVhcmtcIl1dLFsvXFxiZGRnXFwvKFtcXHdcXC5dKykvaV0sW1ZFUlNJT04sW05BTUUsXCJEdWNrRHVja0dvXCJdXSxbLyg/OlxcYnVjPyA/YnJvd3NlcnwoPzpqdWMuKyl1Y3dlYilbXFwvIF0/KFtcXHdcXC5dKykvaV0sW1ZFUlNJT04sW05BTUUsXCJVQ1wiK0JST1dTRVJdXSxbL21pY3JvbS4rXFxicWJjb3JlXFwvKFtcXHdcXC5dKykvaSwvXFxicWJjb3JlXFwvKFtcXHdcXC5dKykuK21pY3JvbS9pLC9taWNyb21lc3NlbmdlclxcLyhbXFx3XFwuXSspL2ldLFtWRVJTSU9OLFtOQU1FLFwiV2VDaGF0XCJdXSxbL2tvbnF1ZXJvclxcLyhbXFx3XFwuXSspL2ldLFtWRVJTSU9OLFtOQU1FLFwiS29ucXVlcm9yXCJdXSxbL3RyaWRlbnQuK3J2WzogXShbXFx3XFwuXXsxLDl9KVxcYi4rbGlrZSBnZWNrby9pXSxbVkVSU0lPTixbTkFNRSxcIklFXCJdXSxbL3lhKD86c2VhcmNoKT9icm93c2VyXFwvKFtcXHdcXC5dKykvaV0sW1ZFUlNJT04sW05BTUUsXCJZYW5kZXhcIl1dLFsvc2xicm93c2VyXFwvKFtcXHdcXC5dKykvaV0sW1ZFUlNJT04sW05BTUUsXCJTbWFydCBMZW5vdm8gXCIrQlJPV1NFUl1dLFsvKGF2YXN0fGF2ZylcXC8oW1xcd1xcLl0rKS9pXSxbW05BTUUsLyguKykvLFwiJDEgU2VjdXJlIFwiK0JST1dTRVJdLFZFUlNJT05dLFsvXFxiZm9jdXNcXC8oW1xcd1xcLl0rKS9pXSxbVkVSU0lPTixbTkFNRSxGSVJFRk9YK1wiIEZvY3VzXCJdXSxbL1xcYm9wdFxcLyhbXFx3XFwuXSspL2ldLFtWRVJTSU9OLFtOQU1FLE9QRVJBK1wiIFRvdWNoXCJdXSxbL2NvY19jb2NcXHcrXFwvKFtcXHdcXC5dKykvaV0sW1ZFUlNJT04sW05BTUUsXCJDb2MgQ29jXCJdXSxbL2RvbGZpblxcLyhbXFx3XFwuXSspL2ldLFtWRVJTSU9OLFtOQU1FLFwiRG9scGhpblwiXV0sWy9jb2FzdFxcLyhbXFx3XFwuXSspL2ldLFtWRVJTSU9OLFtOQU1FLE9QRVJBK1wiIENvYXN0XCJdXSxbL21pdWlicm93c2VyXFwvKFtcXHdcXC5dKykvaV0sW1ZFUlNJT04sW05BTUUsXCJNSVVJIFwiK0JST1dTRVJdXSxbL2Z4aW9zXFwvKFstXFx3XFwuXSspL2ldLFtWRVJTSU9OLFtOQU1FLEZJUkVGT1hdXSxbL1xcYnFpaHV8KHFpP2hvP28/fDM2MClicm93c2VyL2ldLFtbTkFNRSxcIjM2MFwiK1NVRkZJWF9CUk9XU0VSXV0sWy9cXGIocXEpXFwvKFtcXHdcXC5dKykvaV0sW1tOQU1FLC8oLispLyxcIiQxQnJvd3NlclwiXSxWRVJTSU9OXSxbLyhvY3VsdXN8c2FpbGZpc2h8aHVhd2VpfHZpdm98cGljbylicm93c2VyXFwvKFtcXHdcXC5dKykvaV0sW1tOQU1FLC8oLispLyxcIiQxXCIrU1VGRklYX0JST1dTRVJdLFZFUlNJT05dLFsvc2Ftc3VuZ2Jyb3dzZXJcXC8oW1xcd1xcLl0rKS9pXSxbVkVSU0lPTixbTkFNRSxTQU1TVU5HK1wiIEludGVybmV0XCJdXSxbLyhjb21vZG9fZHJhZ29uKVxcLyhbXFx3XFwuXSspL2ldLFtbTkFNRSwvXy9nLFwiIFwiXSxWRVJTSU9OXSxbL21ldGFzcltcXC8gXT8oW1xcZFxcLl0rKS9pXSxbVkVSU0lPTixbTkFNRSxcIlNvZ291IEV4cGxvcmVyXCJdXSxbLyhzb2dvdSltb1xcdytcXC8oW1xcZFxcLl0rKS9pXSxbW05BTUUsXCJTb2dvdSBNb2JpbGVcIl0sVkVSU0lPTl0sWy8oZWxlY3Ryb24pXFwvKFtcXHdcXC5dKykgc2FmYXJpL2ksLyh0ZXNsYSkoPzogcXRjYXJicm93c2VyfFxcLygyMFxcZFxcZFxcLlstXFx3XFwuXSspKS9pLC9tPyhxcWJyb3dzZXJ8MjM0NUV4cGxvcmVyKVtcXC8gXT8oW1xcd1xcLl0rKS9pXSxbTkFNRSxWRVJTSU9OXSxbLyhsYmJyb3dzZXJ8cmVrb25xKS9pLC9cXFsobGlua2VkaW4pYXBwXFxdL2ldLFtOQU1FXSxbLygoPzpmYmFuXFwvZmJpb3N8ZmJfaWFiXFwvZmI0YSkoPyEuK2ZiYXYpfDtmYmF2XFwvKFtcXHdcXC5dKyk7KS9pXSxbW05BTUUsRkFDRUJPT0tdLFZFUlNJT05dLFsvKEtsYXJuYSlcXC8oW1xcd1xcLl0rKS9pLC8oa2FrYW8oPzp0YWxrfHN0b3J5KSlbXFwvIF0oW1xcd1xcLl0rKS9pLC8obmF2ZXIpXFwoLio/KFxcZCtcXC5bXFx3XFwuXSspLipcXCkvaSwvc2FmYXJpIChsaW5lKVxcLyhbXFx3XFwuXSspL2ksL1xcYihsaW5lKVxcLyhbXFx3XFwuXSspXFwvaWFiL2ksLyhhbGlwYXkpY2xpZW50XFwvKFtcXHdcXC5dKykvaSwvKHR3aXR0ZXIpKD86YW5kfCBmLitlXFwvKFtcXHdcXC5dKykpL2ksLyhjaHJvbWl1bXxpbnN0YWdyYW18c25hcGNoYXQpW1xcLyBdKFstXFx3XFwuXSspL2ldLFtOQU1FLFZFUlNJT05dLFsvXFxiZ3NhXFwvKFtcXHdcXC5dKykgLipzYWZhcmlcXC8vaV0sW1ZFUlNJT04sW05BTUUsXCJHU0FcIl1dLFsvbXVzaWNhbF9seSg/Oi4rYXBwXz92ZXJzaW9uXFwvfF8pKFtcXHdcXC5dKykvaV0sW1ZFUlNJT04sW05BTUUsXCJUaWtUb2tcIl1dLFsvaGVhZGxlc3NjaHJvbWUoPzpcXC8oW1xcd1xcLl0rKXwgKS9pXSxbVkVSU0lPTixbTkFNRSxDSFJPTUUrXCIgSGVhZGxlc3NcIl1dLFsvIHd2XFwpLisoY2hyb21lKVxcLyhbXFx3XFwuXSspL2ldLFtbTkFNRSxDSFJPTUUrXCIgV2ViVmlld1wiXSxWRVJTSU9OXSxbL2Ryb2lkLisgdmVyc2lvblxcLyhbXFx3XFwuXSspXFxiLisoPzptb2JpbGUgc2FmYXJpfHNhZmFyaSkvaV0sW1ZFUlNJT04sW05BTUUsXCJBbmRyb2lkIFwiK0JST1dTRVJdXSxbLyhjaHJvbWV8b21uaXdlYnxhcm9yYXxbdGl6ZW5va2FdezV9ID9icm93c2VyKVxcL3Y/KFtcXHdcXC5dKykvaV0sW05BTUUsVkVSU0lPTl0sWy92ZXJzaW9uXFwvKFtcXHdcXC5cXCxdKykgLiptb2JpbGVcXC9cXHcrIChzYWZhcmkpL2ldLFtWRVJTSU9OLFtOQU1FLFwiTW9iaWxlIFNhZmFyaVwiXV0sWy92ZXJzaW9uXFwvKFtcXHcoXFwufFxcLCldKykgLioobW9iaWxlID9zYWZhcml8c2FmYXJpKS9pXSxbVkVSU0lPTixOQU1FXSxbL3dlYmtpdC4rPyhtb2JpbGUgP3NhZmFyaXxzYWZhcmkpKFxcL1tcXHdcXC5dKykvaV0sW05BTUUsW1ZFUlNJT04sc3RyTWFwcGVyLG9sZFNhZmFyaU1hcF1dLFsvKHdlYmtpdHxraHRtbClcXC8oW1xcd1xcLl0rKS9pXSxbTkFNRSxWRVJTSU9OXSxbLyhuYXZpZ2F0b3J8bmV0c2NhcGVcXGQ/KVxcLyhbLVxcd1xcLl0rKS9pXSxbW05BTUUsXCJOZXRzY2FwZVwiXSxWRVJTSU9OXSxbLyh3b2x2aWMpXFwvKFtcXHdcXC5dKykvaV0sW05BTUUsVkVSU0lPTl0sWy9tb2JpbGUgdnI7IHJ2OihbXFx3XFwuXSspXFwpLitmaXJlZm94L2ldLFtWRVJTSU9OLFtOQU1FLEZJUkVGT1grXCIgUmVhbGl0eVwiXV0sWy9la2lvaGYuKyhmbG93KVxcLyhbXFx3XFwuXSspL2ksLyhzd2lmdGZveCkvaSwvKGljZWRyYWdvbnxpY2V3ZWFzZWx8Y2FtaW5vfGNoaW1lcmF8ZmVubmVjfG1hZW1vIGJyb3dzZXJ8bWluaW1vfGNvbmtlcm9yKVtcXC8gXT8oW1xcd1xcLlxcK10rKS9pLC8oc2VhbW9ua2V5fGstbWVsZW9ufGljZWNhdHxpY2VhcGV8ZmlyZWJpcmR8cGhvZW5peHxwYWxlbW9vbnxiYXNpbGlza3x3YXRlcmZveClcXC8oWy1cXHdcXC5dKykkL2ksLyhmaXJlZm94KVxcLyhbXFx3XFwuXSspL2ksLyhtb3ppbGxhKVxcLyhbXFx3XFwuXSspIC4rcnZcXDouK2dlY2tvXFwvXFxkKy9pLC8ocG9sYXJpc3xseW54fGRpbGxvfGljYWJ8ZG9yaXN8YW1heWF8dzNtfG5ldHN1cmZ8b2JpZ298bW9zYWljfCg/OmdvfGljZXx1cClbXFwuIF0/YnJvd3NlcilbLVxcLyBdP3Y/KFtcXHdcXC5dKykvaSwvKGxpbmtzKSBcXCgoW1xcd1xcLl0rKS9pXSxbTkFNRSxbVkVSU0lPTiwvXy9nLFwiLlwiXV0sWy8oY29iYWx0KVxcLyhbXFx3XFwuXSspL2ldLFtOQU1FLFtWRVJTSU9OLC9tYXN0ZXIufGx0cy4vLFwiXCJdXV0sY3B1OltbLyg/OihhbWR8eCg/Oig/Ojg2fDY0KVstX10pP3x3b3d8d2luKTY0KVs7XFwpXS9pXSxbW0FSQ0hJVEVDVFVSRSxcImFtZDY0XCJdXSxbLyhpYTMyKD89OykpL2ldLFtbQVJDSElURUNUVVJFLGxvd2VyaXplXV0sWy8oKD86aVszNDZdfHgpODYpWztcXCldL2ldLFtbQVJDSElURUNUVVJFLFwiaWEzMlwiXV0sWy9cXGIoYWFyY2g2NHxhcm0odj84ZT9sP3xfPzY0KSlcXGIvaV0sW1tBUkNISVRFQ1RVUkUsXCJhcm02NFwiXV0sWy9cXGIoYXJtKD86dls2N10pP2h0P24/W2ZsXXA/KVxcYi9pXSxbW0FSQ0hJVEVDVFVSRSxcImFybWhmXCJdXSxbL3dpbmRvd3MgKGNlfG1vYmlsZSk7IHBwYzsvaV0sW1tBUkNISVRFQ1RVUkUsXCJhcm1cIl1dLFsvKCg/OnBwY3xwb3dlcnBjKSg/OjY0KT8pKD86IG1hY3w7fFxcKSkvaV0sW1tBUkNISVRFQ1RVUkUsL293ZXIvLEVNUFRZLGxvd2VyaXplXV0sWy8oc3VuNFxcdylbO1xcKV0vaV0sW1tBUkNISVRFQ1RVUkUsXCJzcGFyY1wiXV0sWy8oKD86YXZyMzJ8aWE2NCg/PTspKXw2OGsoPz1cXCkpfFxcYmFybSg/PXYoPzpbMS03XXxbNS03XTEpbD98O3xlYWJpKXwoPz1hdG1lbCApYXZyfCg/OmlyaXh8bWlwc3xzcGFyYykoPzo2NCk/XFxifHBhLXJpc2MpL2ldLFtbQVJDSElURUNUVVJFLGxvd2VyaXplXV1dLGRldmljZTpbWy9cXGIoc2NoLWlbODldMFxcZHxzaHctbTM4MHN8c20tW3B0eF1cXHd7Miw0fXxndC1bcG5dXFxkezIsNH18c2doLXQ4WzU2XTl8bmV4dXMgMTApL2ldLFtNT0RFTCxbVkVORE9SLFNBTVNVTkddLFtUWVBFLFRBQkxFVF1dLFsvXFxiKCg/OnNbY2dwXWh8Z3R8c20pLSg/IVtscl0pXFx3K3xzY1tnLV0/W1xcZF0rYT98Z2FsYXh5IG5leHVzKS9pLC9zYW1zdW5nWy0gXSgoPyFzbS1bbHJdKVstXFx3XSspL2ksL3NlYy0oc2doXFx3KykvaV0sW01PREVMLFtWRU5ET1IsU0FNU1VOR10sW1RZUEUsTU9CSUxFXV0sWy8oPzpcXC98XFwoKShpcCg/OmhvbmV8b2QpW1xcdywgXSopKD86XFwvfDspL2ldLFtNT0RFTCxbVkVORE9SLEFQUExFXSxbVFlQRSxNT0JJTEVdXSxbL1xcKChpcGFkKTtbLVxcd1xcKSw7IF0rYXBwbGUvaSwvYXBwbGVjb3JlbWVkaWFcXC9bXFx3XFwuXSsgXFwoKGlwYWQpL2ksL1xcYihpcGFkKVxcZFxcZD8sXFxkXFxkP1s7XFxdXS4raW9zL2ldLFtNT0RFTCxbVkVORE9SLEFQUExFXSxbVFlQRSxUQUJMRVRdXSxbLyhtYWNpbnRvc2gpOy9pXSxbTU9ERUwsW1ZFTkRPUixBUFBMRV1dLFsvXFxiKHNoLT9bYWx0dnpdP1xcZFxcZFthLWVrbV0/KS9pXSxbTU9ERUwsW1ZFTkRPUixTSEFSUF0sW1RZUEUsTU9CSUxFXV0sWy9cXGIoKD86YWdbcnNdWzIzXT98YmFoMj98c2h0P3xidHYpLWE/W2x3XVxcZHsyfSlcXGIoPyEuK2RcXC9zKS9pXSxbTU9ERUwsW1ZFTkRPUixIVUFXRUldLFtUWVBFLFRBQkxFVF1dLFsvKD86aHVhd2VpfGhvbm9yKShbLVxcdyBdKylbO1xcKV0vaSwvXFxiKG5leHVzIDZwfFxcd3syLDR9ZT8tW2F0dV0/W2xuXVtcXGR4XVswMTIzNTljXVthZG5dPylcXGIoPyEuK2RcXC9zKS9pXSxbTU9ERUwsW1ZFTkRPUixIVUFXRUldLFtUWVBFLE1PQklMRV1dLFsvXFxiKHBvY29bXFx3IF0rfG0yXFxkezN9alxcZFxcZFthLXpdezJ9KSg/OiBidWl8XFwpKS9pLC9cXGI7IChcXHcrKSBidWlsZFxcL2htXFwxL2ksL1xcYihobVstXyBdP25vdGU/W18gXT8oPzpcXGRcXHcpPykgYnVpL2ksL1xcYihyZWRtaVtcXC1fIF0/KD86bm90ZXxrKT9bXFx3XyBdKykoPzogYnVpfFxcKSkvaSwvb2lkW15cXCldKzsgKG0/WzEyXVswLTM4OV1bMDFdXFx3ezMsNn1bYy15XSkoIGJ1aXw7IHd2fFxcKSkvaSwvXFxiKG1pWy1fIF0/KD86YVxcZHxvbmV8b25lW18gXXBsdXN8bm90ZSBsdGV8bWF4fGNjKT9bXyBdPyg/OlxcZD9cXHc/KVtfIF0/KD86cGx1c3xzZXxsaXRlfHBybyk/KSg/OiBidWl8XFwpKS9pXSxbW01PREVMLC9fL2csXCIgXCJdLFtWRU5ET1IsWElBT01JXSxbVFlQRSxNT0JJTEVdXSxbL29pZFteXFwpXSs7ICgyXFxkezR9KDI4M3xycGJmKVtjZ2xdKSggYnVpfFxcKSkvaSwvXFxiKG1pWy1fIF0/KD86cGFkKSg/OltcXHdfIF0rKSkoPzogYnVpfFxcKSkvaV0sW1tNT0RFTCwvXy9nLFwiIFwiXSxbVkVORE9SLFhJQU9NSV0sW1RZUEUsVEFCTEVUXV0sWy87IChcXHcrKSBidWkuKyBvcHBvL2ksL1xcYihjcGhbMTJdXFxkezN9fHAoPzphZnxjW2FsXXxkXFx3fGVbYXJdKVttdF1cXGQwfHg5MDA3fGExMDFvcClcXGIvaV0sW01PREVMLFtWRU5ET1IsXCJPUFBPXCJdLFtUWVBFLE1PQklMRV1dLFsvXFxiKG9wZDJcXGR7M31hPykgYnVpL2ldLFtNT0RFTCxbVkVORE9SLFwiT1BQT1wiXSxbVFlQRSxUQUJMRVRdXSxbL3Zpdm8gKFxcdyspKD86IGJ1aXxcXCkpL2ksL1xcYih2WzEyXVxcZHszfVxcdz9bYXRdKSg/OiBidWl8OykvaV0sW01PREVMLFtWRU5ET1IsXCJWaXZvXCJdLFtUWVBFLE1PQklMRV1dLFsvXFxiKHJteFsxLTNdXFxkezN9KSg/OiBidWl8O3xcXCkpL2ldLFtNT0RFTCxbVkVORE9SLFwiUmVhbG1lXCJdLFtUWVBFLE1PQklMRV1dLFsvXFxiKG1pbGVzdG9uZXxkcm9pZCg/OlsyLTR4XXwgKD86YmlvbmljfHgyfHByb3xyYXpyKSk/Oj8oIDRnKT8pXFxiW1xcdyBdK2J1aWxkXFwvL2ksL1xcYm1vdCg/Om9yb2xhKT9bLSBdKFxcdyopL2ksLygoPzptb3RvW1xcd1xcKFxcKSBdK3x4dFxcZHszLDR9fG5leHVzIDYpKD89IGJ1aXxcXCkpKS9pXSxbTU9ERUwsW1ZFTkRPUixNT1RPUk9MQV0sW1RZUEUsTU9CSUxFXV0sWy9cXGIobXo2MFxcZHx4b29tWzIgXXswLDJ9KSBidWlsZFxcLy9pXSxbTU9ERUwsW1ZFTkRPUixNT1RPUk9MQV0sW1RZUEUsVEFCTEVUXV0sWy8oKD89bGcpP1t2bF1rXFwtP1xcZHszfSkgYnVpfCAzXFwuWy1cXHc7IF17MTB9bGc/LShbMDZjdjldezMsNH0pL2ldLFtNT0RFTCxbVkVORE9SLExHXSxbVFlQRSxUQUJMRVRdXSxbLyhsbSg/Oi0/ZjEwMFtudl0/fC1bXFx3XFwuXSspKD89IGJ1aXxcXCkpfG5leHVzIFs0NV0pL2ksL1xcYmxnWy1lO1xcLyBdKygoPyFicm93c2VyfG5ldGNhc3R8YW5kcm9pZCB0dilcXHcrKS9pLC9cXGJsZy0/KFtcXGRcXHddKykgYnVpL2ldLFtNT0RFTCxbVkVORE9SLExHXSxbVFlQRSxNT0JJTEVdXSxbLyhpZGVhdGFiWy1cXHcgXSspL2ksL2xlbm92byA/KHNbNTZdMDAwWy1cXHddK3x0YWIoPzpbXFx3IF0rKXx5dFstXFxkXFx3XXs2fXx0YlstXFxkXFx3XXs2fSkvaV0sW01PREVMLFtWRU5ET1IsXCJMZW5vdm9cIl0sW1RZUEUsVEFCTEVUXV0sWy8oPzptYWVtb3xub2tpYSkuKihuOTAwfGx1bWlhIFxcZCspL2ksL25va2lhWy1fIF0/KFstXFx3XFwuXSopL2ldLFtbTU9ERUwsL18vZyxcIiBcIl0sW1ZFTkRPUixcIk5va2lhXCJdLFtUWVBFLE1PQklMRV1dLFsvKHBpeGVsIGMpXFxiL2ldLFtNT0RFTCxbVkVORE9SLEdPT0dMRV0sW1RZUEUsVEFCTEVUXV0sWy9kcm9pZC4rOyAocGl4ZWxbXFxkYXhsIF17MCw2fSkoPzogYnVpfFxcKSkvaV0sW01PREVMLFtWRU5ET1IsR09PR0xFXSxbVFlQRSxNT0JJTEVdXSxbL2Ryb2lkLisgKGE/XFxkWzAtMl17Mn1zb3xbYy1nXVxcZHs0fXxzb1stZ2xdXFx3K3x4cS1hXFx3WzQtN11bMTJdKSg/PSBidWl8XFwpLitjaHJvbWVcXC8oPyFbMS02XXswLDF9XFxkXFwuKSkvaV0sW01PREVMLFtWRU5ET1IsU09OWV0sW1RZUEUsTU9CSUxFXV0sWy9zb255IHRhYmxldCBbcHNdL2ksL1xcYig/OnNvbnkpP3NncFxcdysoPzogYnVpfFxcKSkvaV0sW1tNT0RFTCxcIlhwZXJpYSBUYWJsZXRcIl0sW1ZFTkRPUixTT05ZXSxbVFlQRSxUQUJMRVRdXSxbLyAoa2IyMDA1fGluMjBbMTJdNXxiZTIwWzEyXVs1OV0pXFxiL2ksLyg/Om9uZSk/KD86cGx1cyk/IChhXFxkMFxcZFxcZCkoPzogYnxcXCkpL2ldLFtNT0RFTCxbVkVORE9SLFwiT25lUGx1c1wiXSxbVFlQRSxNT0JJTEVdXSxbLyhhbGV4YSl3ZWJtL2ksLyhrZlthLXpdezJ9d2l8YWVvKD8hYmMpXFx3XFx3KSggYnVpfFxcKSkvaSwvKGtmW2Etel0rKSggYnVpfFxcKSkuK3NpbGtcXC8vaV0sW01PREVMLFtWRU5ET1IsQU1BWk9OXSxbVFlQRSxUQUJMRVRdXSxbLygoPzpzZHxrZilbMDM0OWhpam9yc3R1d10rKSggYnVpfFxcKSkuK3NpbGtcXC8vaV0sW1tNT0RFTCwvKC4rKS9nLFwiRmlyZSBQaG9uZSAkMVwiXSxbVkVORE9SLEFNQVpPTl0sW1RZUEUsTU9CSUxFXV0sWy8ocGxheWJvb2spO1stXFx3XFwpLDsgXSsocmltKS9pXSxbTU9ERUwsVkVORE9SLFtUWVBFLFRBQkxFVF1dLFsvXFxiKCg/OmJiW2EtZl18c3RbaHZdKTEwMC1cXGQpL2ksL1xcKGJiMTA7IChcXHcrKS9pXSxbTU9ERUwsW1ZFTkRPUixCTEFDS0JFUlJZXSxbVFlQRSxNT0JJTEVdXSxbLyg/OlxcYnxhc3VzXykodHJhbnNmb1twcmltZSBdezQsMTB9IFxcdyt8ZWVlcGN8c2xpZGVyIFxcdyt8bmV4dXMgN3xwYWRmb25lfHAwMFtjal0pL2ldLFtNT0RFTCxbVkVORE9SLEFTVVNdLFtUWVBFLFRBQkxFVF1dLFsvICh6W2Jlc102WzAyN11bMDEyXVtrbV1bbHNdfHplbmZvbmUgXFxkXFx3PylcXGIvaV0sW01PREVMLFtWRU5ET1IsQVNVU10sW1RZUEUsTU9CSUxFXV0sWy8obmV4dXMgOSkvaV0sW01PREVMLFtWRU5ET1IsXCJIVENcIl0sW1RZUEUsVEFCTEVUXV0sWy8oaHRjKVstO18gXXsxLDJ9KFtcXHcgXSsoPz1cXCl8IGJ1aSl8XFx3KykvaSwvKHp0ZSlbLSBdKFtcXHcgXSs/KSg/OiBidWl8XFwvfFxcKSkvaSwvKGFsY2F0ZWx8Z2Vla3NwaG9uZXxuZXhpYW58cGFuYXNvbmljKD8hKD86O3xcXC4pKXxzb255KD8hLWJyYSkpWy1fIF0/KFstXFx3XSopL2ldLFtWRU5ET1IsW01PREVMLC9fL2csXCIgXCJdLFtUWVBFLE1PQklMRV1dLFsvZHJvaWQgW1xcd1xcLl0rOyAoKD86OFsxNF05WzE2XXw5KD86MCg/OjQ4fDYwfDhbMDFdKXwxKD86M1syN118NjYpfDIoPzo2WzY5XXw5WzU2XSl8NDY2KSlbZ3Fzd3hdKVxcdyooXFwpfCBidWkpL2ldLFtNT0RFTCxbVkVORE9SLFwiVENMXCJdLFtUWVBFLFRBQkxFVF1dLFsvKGl0ZWwpICgoXFx3KykpL2ldLFtbVkVORE9SLGxvd2VyaXplXSxNT0RFTCxbVFlQRSxzdHJNYXBwZXIse3RhYmxldDpbXCJwMTAwMDFsXCIsXCJ3NzAwMVwiXSxcIipcIjpcIm1vYmlsZVwifV1dLFsvZHJvaWQuKzsgKFthYl1bMS03XS0/WzAxNzhhXVxcZFxcZD8pL2ldLFtNT0RFTCxbVkVORE9SLFwiQWNlclwiXSxbVFlQRSxUQUJMRVRdXSxbL2Ryb2lkLis7IChtWzEtNV0gbm90ZSkgYnVpL2ksL1xcYm16LShbLVxcd117Mix9KS9pXSxbTU9ERUwsW1ZFTkRPUixcIk1laXp1XCJdLFtUWVBFLE1PQklMRV1dLFsvOyAoKD86cG93ZXIgKT9hcm1vcig/OltcXHcgXXswLDh9KSkoPzogYnVpfFxcKSkvaV0sW01PREVMLFtWRU5ET1IsXCJVbGVmb25lXCJdLFtUWVBFLE1PQklMRV1dLFsvZHJvaWQuKzsgKGEoPzowMTV8MDZbMzVdfDE0MnA/KSkvaV0sW01PREVMLFtWRU5ET1IsXCJOb3RoaW5nXCJdLFtUWVBFLE1PQklMRV1dLFsvKGJsYWNrYmVycnl8YmVucXxwYWxtKD89XFwtKXxzb255ZXJpY3Nzb258YWNlcnxhc3VzfGRlbGx8bWVpenV8bW90b3JvbGF8cG9seXRyb258aW5maW5peHx0ZWNubylbLV8gXT8oWy1cXHddKikvaSwvKGhwKSAoW1xcdyBdK1xcdykvaSwvKGFzdXMpLT8oXFx3KykvaSwvKG1pY3Jvc29mdCk7IChsdW1pYVtcXHcgXSspL2ksLyhsZW5vdm8pWy1fIF0/KFstXFx3XSspL2ksLyhqb2xsYSkvaSwvKG9wcG8pID8oW1xcdyBdKykgYnVpL2ldLFtWRU5ET1IsTU9ERUwsW1RZUEUsTU9CSUxFXV0sWy8oa29ibylcXHMoZXJlYWRlcnx0b3VjaCkvaSwvKGFyY2hvcykgKGdhbWVwYWQyPykvaSwvKGhwKS4rKHRvdWNocGFkKD8hLit0YWJsZXQpfHRhYmxldCkvaSwvKGtpbmRsZSlcXC8oW1xcd1xcLl0rKS9pLC8obm9vaylbXFx3IF0rYnVpbGRcXC8oXFx3KykvaSwvKGRlbGwpIChzdHJlYVtrcHJcXGQgXSpbXFxka29dKS9pLC8obGVbLSBdK3BhbilbLSBdKyhcXHd7MSw5fSkgYnVpL2ksLyh0cmluaXR5KVstIF0qKHRcXGR7M30pIGJ1aS9pLC8oZ2lnYXNldClbLSBdKyhxXFx3ezEsOX0pIGJ1aS9pLC8odm9kYWZvbmUpIChbXFx3IF0rKSg/OlxcKXwgYnVpKS9pXSxbVkVORE9SLE1PREVMLFtUWVBFLFRBQkxFVF1dLFsvKHN1cmZhY2UgZHVvKS9pXSxbTU9ERUwsW1ZFTkRPUixNSUNST1NPRlRdLFtUWVBFLFRBQkxFVF1dLFsvZHJvaWQgW1xcZFxcLl0rOyAoZnBcXGR1PykoPzogYnxcXCkpL2ldLFtNT0RFTCxbVkVORE9SLFwiRmFpcnBob25lXCJdLFtUWVBFLE1PQklMRV1dLFsvKHUzMDRhYSkvaV0sW01PREVMLFtWRU5ET1IsXCJBVCZUXCJdLFtUWVBFLE1PQklMRV1dLFsvXFxic2llLShcXHcqKS9pXSxbTU9ERUwsW1ZFTkRPUixcIlNpZW1lbnNcIl0sW1RZUEUsTU9CSUxFXV0sWy9cXGIocmN0XFx3KykgYi9pXSxbTU9ERUwsW1ZFTkRPUixcIlJDQVwiXSxbVFlQRSxUQUJMRVRdXSxbL1xcYih2ZW51ZVtcXGQgXXsyLDd9KSBiL2ldLFtNT0RFTCxbVkVORE9SLFwiRGVsbFwiXSxbVFlQRSxUQUJMRVRdXSxbL1xcYihxKD86bXZ8dGEpXFx3KykgYi9pXSxbTU9ERUwsW1ZFTkRPUixcIlZlcml6b25cIl0sW1RZUEUsVEFCTEVUXV0sWy9cXGIoPzpiYXJuZXNbJiBdK25vYmxlIHxibltydF0pKFtcXHdcXCsgXSopIGIvaV0sW01PREVMLFtWRU5ET1IsXCJCYXJuZXMgJiBOb2JsZVwiXSxbVFlQRSxUQUJMRVRdXSxbL1xcYih0bVxcZHszfVxcdyspIGIvaV0sW01PREVMLFtWRU5ET1IsXCJOdVZpc2lvblwiXSxbVFlQRSxUQUJMRVRdXSxbL1xcYihrODgpIGIvaV0sW01PREVMLFtWRU5ET1IsXCJaVEVcIl0sW1RZUEUsVEFCTEVUXV0sWy9cXGIobnhcXGR7M31qKSBiL2ldLFtNT0RFTCxbVkVORE9SLFwiWlRFXCJdLFtUWVBFLE1PQklMRV1dLFsvXFxiKGdlblxcZHszfSkgYi4rNDloL2ldLFtNT0RFTCxbVkVORE9SLFwiU3dpc3NcIl0sW1RZUEUsTU9CSUxFXV0sWy9cXGIoenVyXFxkezN9KSBiL2ldLFtNT0RFTCxbVkVORE9SLFwiU3dpc3NcIl0sW1RZUEUsVEFCTEVUXV0sWy9cXGIoKHpla2kpP3RiLipcXGIpIGIvaV0sW01PREVMLFtWRU5ET1IsXCJaZWtpXCJdLFtUWVBFLFRBQkxFVF1dLFsvXFxiKFt5cl1cXGR7Mn0pIGIvaSwvXFxiKGRyYWdvblstIF0rdG91Y2ggfGR0KShcXHd7NX0pIGIvaV0sW1tWRU5ET1IsXCJEcmFnb24gVG91Y2hcIl0sTU9ERUwsW1RZUEUsVEFCTEVUXV0sWy9cXGIobnMtP1xcd3swLDl9KSBiL2ldLFtNT0RFTCxbVkVORE9SLFwiSW5zaWduaWFcIl0sW1RZUEUsVEFCTEVUXV0sWy9cXGIoKG54YXxuZXh0KS0/XFx3ezAsOX0pIGIvaV0sW01PREVMLFtWRU5ET1IsXCJOZXh0Qm9va1wiXSxbVFlQRSxUQUJMRVRdXSxbL1xcYih4dHJlbWVcXF8pPyh2KDFbMDQ1XXwyWzAxNV18WzM0NjldMHw3WzA1XSkpIGIvaV0sW1tWRU5ET1IsXCJWb2ljZVwiXSxNT0RFTCxbVFlQRSxNT0JJTEVdXSxbL1xcYihsdnRlbFxcLSk/KHYxWzEyXSkgYi9pXSxbW1ZFTkRPUixcIkx2VGVsXCJdLE1PREVMLFtUWVBFLE1PQklMRV1dLFsvXFxiKHBoLTEpIC9pXSxbTU9ERUwsW1ZFTkRPUixcIkVzc2VudGlhbFwiXSxbVFlQRSxNT0JJTEVdXSxbL1xcYih2KDEwMG1kfDcwMG5hfDcwMTF8OTE3ZykuKlxcYikgYi9pXSxbTU9ERUwsW1ZFTkRPUixcIkVudml6ZW5cIl0sW1RZUEUsVEFCTEVUXV0sWy9cXGIodHJpb1stXFx3XFwuIF0rKSBiL2ldLFtNT0RFTCxbVkVORE9SLFwiTWFjaFNwZWVkXCJdLFtUWVBFLFRBQkxFVF1dLFsvXFxidHVfKDE0OTEpIGIvaV0sW01PREVMLFtWRU5ET1IsXCJSb3RvclwiXSxbVFlQRSxUQUJMRVRdXSxbLyhzaGllbGRbXFx3IF0rKSBiL2ldLFtNT0RFTCxbVkVORE9SLFwiTnZpZGlhXCJdLFtUWVBFLFRBQkxFVF1dLFsvKHNwcmludCkgKFxcdyspL2ldLFtWRU5ET1IsTU9ERUwsW1RZUEUsTU9CSUxFXV0sWy8oa2luXFwuW29uZXR3XXszfSkvaV0sW1tNT0RFTCwvXFwuL2csXCIgXCJdLFtWRU5ET1IsTUlDUk9TT0ZUXSxbVFlQRSxNT0JJTEVdXSxbL2Ryb2lkLis7IChjYzY2NjY/fGV0NVsxNl18bWNbMjM5XVsyM114P3x2YzhbMDNdeD8pXFwpL2ldLFtNT0RFTCxbVkVORE9SLFpFQlJBXSxbVFlQRSxUQUJMRVRdXSxbL2Ryb2lkLis7IChlYzMwfHBzMjB8dGNbMi04XVxcZFtreF0pXFwpL2ldLFtNT0RFTCxbVkVORE9SLFpFQlJBXSxbVFlQRSxNT0JJTEVdXSxbL3NtYXJ0LXR2Lisoc2Ftc3VuZykvaV0sW1ZFTkRPUixbVFlQRSxTTUFSVFRWXV0sWy9oYmJ0di4rbWFwbGU7KFxcZCspL2ldLFtbTU9ERUwsL14vLFwiU21hcnRUVlwiXSxbVkVORE9SLFNBTVNVTkddLFtUWVBFLFNNQVJUVFZdXSxbLyhudXg7IG5ldGNhc3QuK3NtYXJ0dHZ8bGcgKG5ldGNhc3RcXC50di0yMDFcXGR8YW5kcm9pZCB0dikpL2ldLFtbVkVORE9SLExHXSxbVFlQRSxTTUFSVFRWXV0sWy8oYXBwbGUpID90di9pXSxbVkVORE9SLFtNT0RFTCxBUFBMRStcIiBUVlwiXSxbVFlQRSxTTUFSVFRWXV0sWy9jcmtleS9pXSxbW01PREVMLENIUk9NRStcImNhc3RcIl0sW1ZFTkRPUixHT09HTEVdLFtUWVBFLFNNQVJUVFZdXSxbL2Ryb2lkLithZnQoXFx3KykoIGJ1aXxcXCkpL2ldLFtNT0RFTCxbVkVORE9SLEFNQVpPTl0sW1RZUEUsU01BUlRUVl1dLFsvXFwoZHR2W1xcKTtdLisoYXF1b3MpL2ksLyhhcXVvcy10dltcXHcgXSspXFwpL2ldLFtNT0RFTCxbVkVORE9SLFNIQVJQXSxbVFlQRSxTTUFSVFRWXV0sWy8oYnJhdmlhW1xcdyBdKykoIGJ1aXxcXCkpL2ldLFtNT0RFTCxbVkVORE9SLFNPTlldLFtUWVBFLFNNQVJUVFZdXSxbLyhtaXR2LVxcd3s1fSkgYnVpL2ldLFtNT0RFTCxbVkVORE9SLFhJQU9NSV0sW1RZUEUsU01BUlRUVl1dLFsvSGJidHYuKih0ZWNobmlzYXQpICguKik7L2ldLFtWRU5ET1IsTU9ERUwsW1RZUEUsU01BUlRUVl1dLFsvXFxiKHJva3UpW1xcZHhdKltcXClcXC9dKCg/OmR2cC0pP1tcXGRcXC5dKikvaSwvaGJidHZcXC9cXGQrXFwuXFxkK1xcLlxcZCsgK1xcKFtcXHdcXCsgXSo7ICooW1xcd1xcZF1bXjtdKik7KFteO10qKS9pXSxbW1ZFTkRPUix0cmltXSxbTU9ERUwsdHJpbV0sW1RZUEUsU01BUlRUVl1dLFsvXFxiKGFuZHJvaWQgdHZ8c21hcnRbLSBdP3R2fG9wZXJhIHR2fHR2OyBydjopXFxiL2ldLFtbVFlQRSxTTUFSVFRWXV0sWy8ob3V5YSkvaSwvKG5pbnRlbmRvKSAoW3dpZHMzdXRjaF0rKS9pXSxbVkVORE9SLE1PREVMLFtUWVBFLENPTlNPTEVdXSxbL2Ryb2lkLis7IChzaGllbGQpIGJ1aS9pXSxbTU9ERUwsW1ZFTkRPUixcIk52aWRpYVwiXSxbVFlQRSxDT05TT0xFXV0sWy8ocGxheXN0YXRpb24gWzM0NXBvcnRhYmxldmldKykvaV0sW01PREVMLFtWRU5ET1IsU09OWV0sW1RZUEUsQ09OU09MRV1dLFsvXFxiKHhib3goPzogb25lKT8oPyE7IHhib3gpKVtcXCk7IF0vaV0sW01PREVMLFtWRU5ET1IsTUlDUk9TT0ZUXSxbVFlQRSxDT05TT0xFXV0sWy9cXGIoc20tW2xyXVxcZFxcZFswNV1bZm51d10/cz8pXFxiL2ldLFtNT0RFTCxbVkVORE9SLFNBTVNVTkddLFtUWVBFLFdFQVJBQkxFXV0sWy8oKHBlYmJsZSkpYXBwL2ldLFtWRU5ET1IsTU9ERUwsW1RZUEUsV0VBUkFCTEVdXSxbLyh3YXRjaCkoPzogP29zWyxcXC9dfFxcZCxcXGRcXC8pW1xcZFxcLl0rL2ldLFtNT0RFTCxbVkVORE9SLEFQUExFXSxbVFlQRSxXRUFSQUJMRV1dLFsvZHJvaWQuKzsgKGdsYXNzKSBcXGQvaV0sW01PREVMLFtWRU5ET1IsR09PR0xFXSxbVFlQRSxXRUFSQUJMRV1dLFsvZHJvaWQuKzsgKHd0NjM/MHsyLDN9KVxcKS9pXSxbTU9ERUwsW1ZFTkRPUixaRUJSQV0sW1RZUEUsV0VBUkFCTEVdXSxbLyhxdWVzdCggXFxkfCBwcm8pPykvaV0sW01PREVMLFtWRU5ET1IsRkFDRUJPT0tdLFtUWVBFLFdFQVJBQkxFXV0sWy8odGVzbGEpKD86IHF0Y2FyYnJvd3NlcnxcXC9bLVxcd1xcLl0rKS9pXSxbVkVORE9SLFtUWVBFLEVNQkVEREVEXV0sWy8oYWVvYmMpXFxiL2ldLFtNT0RFTCxbVkVORE9SLEFNQVpPTl0sW1RZUEUsRU1CRURERURdXSxbL2Ryb2lkIC4rPzsgKFteO10rPykoPzogYnVpfDsgd3ZcXCl8XFwpIGFwcGxldykuKz8gbW9iaWxlIHNhZmFyaS9pXSxbTU9ERUwsW1RZUEUsTU9CSUxFXV0sWy9kcm9pZCAuKz87IChbXjtdKz8pKD86IGJ1aXxcXCkgYXBwbGV3KS4rPyg/ISBtb2JpbGUpIHNhZmFyaS9pXSxbTU9ERUwsW1RZUEUsVEFCTEVUXV0sWy9cXGIoKHRhYmxldHx0YWIpWztcXC9dfGZvY3VzXFwvXFxkKD8hLittb2JpbGUpKS9pXSxbW1RZUEUsVEFCTEVUXV0sWy8ocGhvbmV8bW9iaWxlKD86WztcXC9dfCBbIFxcd1xcL1xcLl0qc2FmYXJpKXxwZGEoPz0uK3dpbmRvd3MgY2UpKS9pXSxbW1RZUEUsTU9CSUxFXV0sWy8oYW5kcm9pZFstXFx3XFwuIF17MCw5fSk7LitidWlsL2ldLFtNT0RFTCxbVkVORE9SLFwiR2VuZXJpY1wiXV1dLGVuZ2luZTpbWy93aW5kb3dzLisgZWRnZVxcLyhbXFx3XFwuXSspL2ldLFtWRVJTSU9OLFtOQU1FLEVER0UrXCJIVE1MXCJdXSxbL3dlYmtpdFxcLzUzN1xcLjM2LitjaHJvbWVcXC8oPyEyNykoW1xcd1xcLl0rKS9pXSxbVkVSU0lPTixbTkFNRSxcIkJsaW5rXCJdXSxbLyhwcmVzdG8pXFwvKFtcXHdcXC5dKykvaSwvKHdlYmtpdHx0cmlkZW50fG5ldGZyb250fG5ldHN1cmZ8YW1heWF8bHlueHx3M218Z29hbm5hKVxcLyhbXFx3XFwuXSspL2ksL2VraW9oKGZsb3cpXFwvKFtcXHdcXC5dKykvaSwvKGtodG1sfHRhc21hbnxsaW5rcylbXFwvIF1cXCg/KFtcXHdcXC5dKykvaSwvKGljYWIpW1xcLyBdKFsyM11cXC5bXFxkXFwuXSspL2ksL1xcYihsaWJ3ZWIpL2ldLFtOQU1FLFZFUlNJT05dLFsvcnZcXDooW1xcd1xcLl17MSw5fSlcXGIuKyhnZWNrbykvaV0sW1ZFUlNJT04sTkFNRV1dLG9zOltbL21pY3Jvc29mdCAod2luZG93cykgKHZpc3RhfHhwKS9pXSxbTkFNRSxWRVJTSU9OXSxbLyh3aW5kb3dzICg/OnBob25lKD86IG9zKT98bW9iaWxlKSlbXFwvIF0/KFtcXGRcXC5cXHcgXSopL2ldLFtOQU1FLFtWRVJTSU9OLHN0ck1hcHBlcix3aW5kb3dzVmVyc2lvbk1hcF1dLFsvd2luZG93cyBudCA2XFwuMjsgKGFybSkvaSwvd2luZG93c1tcXC8gXT8oW250Y2VcXGRcXC4gXStcXHcpKD8hLit4Ym94KS9pLC8oPzp3aW4oPz0zfDl8bil8d2luIDl4ICkoW250XFxkXFwuXSspL2ldLFtbVkVSU0lPTixzdHJNYXBwZXIsd2luZG93c1ZlcnNpb25NYXBdLFtOQU1FLFwiV2luZG93c1wiXV0sWy9pcFtob25lYWRdezIsNH1cXGIoPzouKm9zIChbXFx3XSspIGxpa2UgbWFjfDsgb3BlcmEpL2ksLyg/OmlvcztmYnN2XFwvfGlwaG9uZS4raW9zW1xcLyBdKShbXFxkXFwuXSspL2ksL2NmbmV0d29ya1xcLy4rZGFyd2luL2ldLFtbVkVSU0lPTiwvXy9nLFwiLlwiXSxbTkFNRSxcImlPU1wiXV0sWy8obWFjIG9zIHgpID8oW1xcd1xcLiBdKikvaSwvKG1hY2ludG9zaHxtYWNfcG93ZXJwY1xcYikoPyEuK2hhaWt1KS9pXSxbW05BTUUsTUFDX09TXSxbVkVSU0lPTiwvXy9nLFwiLlwiXV0sWy9kcm9pZCAoW1xcd1xcLl0rKVxcYi4rKGFuZHJvaWRbLSBdeDg2fGhhcm1vbnlvcykvaV0sW1ZFUlNJT04sTkFNRV0sWy8oYW5kcm9pZHx3ZWJvc3xxbnh8YmFkYXxyaW0gdGFibGV0IG9zfG1hZW1vfG1lZWdvfHNhaWxmaXNoKVstXFwvIF0/KFtcXHdcXC5dKikvaSwvKGJsYWNrYmVycnkpXFx3KlxcLyhbXFx3XFwuXSopL2ksLyh0aXplbnxrYWlvcylbXFwvIF0oW1xcd1xcLl0rKS9pLC9cXCgoc2VyaWVzNDApOy9pXSxbTkFNRSxWRVJTSU9OXSxbL1xcKGJiKDEwKTsvaV0sW1ZFUlNJT04sW05BTUUsQkxBQ0tCRVJSWV1dLFsvKD86c3ltYmlhbiA/b3N8c3ltYm9zfHM2MCg/PTspfHNlcmllczYwKVstXFwvIF0/KFtcXHdcXC5dKikvaV0sW1ZFUlNJT04sW05BTUUsXCJTeW1iaWFuXCJdXSxbL21vemlsbGFcXC9bXFxkXFwuXSsgXFwoKD86bW9iaWxlfHRhYmxldHx0dnxtb2JpbGU7IFtcXHcgXSspOyBydjouKyBnZWNrb1xcLyhbXFx3XFwuXSspL2ldLFtWRVJTSU9OLFtOQU1FLEZJUkVGT1grXCIgT1NcIl1dLFsvd2ViMHM7LitydCh0dikvaSwvXFxiKD86aHApP3dvcyg/OmJyb3dzZXIpP1xcLyhbXFx3XFwuXSspL2ldLFtWRVJTSU9OLFtOQU1FLFwid2ViT1NcIl1dLFsvd2F0Y2goPzogP29zWyxcXC9dfFxcZCxcXGRcXC8pKFtcXGRcXC5dKykvaV0sW1ZFUlNJT04sW05BTUUsXCJ3YXRjaE9TXCJdXSxbL2Nya2V5XFwvKFtcXGRcXC5dKykvaV0sW1ZFUlNJT04sW05BTUUsQ0hST01FK1wiY2FzdFwiXV0sWy8oY3JvcykgW1xcd10rKD86XFwpfCAoW1xcd1xcLl0rKVxcYikvaV0sW1tOQU1FLENIUk9NSVVNX09TXSxWRVJTSU9OXSxbL3BhbmFzb25pYzsodmllcmEpL2ksLyhuZXRyYW5nZSltbWgvaSwvKG5ldHR2KVxcLyhcXGQrXFwuW1xcd1xcLl0rKS9pLC8obmludGVuZG98cGxheXN0YXRpb24pIChbd2lkczM0NXBvcnRhYmxldnVjaF0rKS9pLC8oeGJveCk7ICt4Ym94IChbXlxcKTtdKykvaSwvXFxiKGpvbGl8cGFsbSlcXGIgPyg/Om9zKT9cXC8/KFtcXHdcXC5dKikvaSwvKG1pbnQpW1xcL1xcKFxcKSBdPyhcXHcqKS9pLC8obWFnZWlhfHZlY3RvcmxpbnV4KVs7IF0vaSwvKFtreGxuXT91YnVudHV8ZGViaWFufHN1c2V8b3BlbnN1c2V8Z2VudG9vfGFyY2goPz0gbGludXgpfHNsYWNrd2FyZXxmZWRvcmF8bWFuZHJpdmF8Y2VudG9zfHBjbGludXhvc3xyZWQgP2hhdHx6ZW53YWxrfGxpbnB1c3xyYXNwYmlhbnxwbGFuIDl8bWluaXh8cmlzYyBvc3xjb250aWtpfGRlZXBpbnxtYW5qYXJvfGVsZW1lbnRhcnkgb3N8c2FiYXlvbnxsaW5zcGlyZSkoPzogZ251XFwvbGludXgpPyg/OiBlbnRlcnByaXNlKT8oPzpbLSBdbGludXgpPyg/Oi1nbnUpP1stXFwvIF0/KD8hY2hyb218cGFja2FnZSkoWy1cXHdcXC5dKikvaSwvKGh1cmR8bGludXgpID8oW1xcd1xcLl0qKS9pLC8oZ251KSA/KFtcXHdcXC5dKikvaSwvXFxiKFstZnJlbnRvcGNnaHNdezAsNX1ic2R8ZHJhZ29uZmx5KVtcXC8gXT8oPyFhbWR8W2l4MzQ2XXsxLDJ9ODYpKFtcXHdcXC5dKikvaSwvKGhhaWt1KSAoXFx3KykvaV0sW05BTUUsVkVSU0lPTl0sWy8oc3Vub3MpID8oW1xcd1xcLlxcZF0qKS9pXSxbW05BTUUsXCJTb2xhcmlzXCJdLFZFUlNJT05dLFsvKCg/Om9wZW4pP3NvbGFyaXMpWy1cXC8gXT8oW1xcd1xcLl0qKS9pLC8oYWl4KSAoKFxcZCkoPz1cXC58XFwpfCApW1xcd1xcLl0pKi9pLC9cXGIoYmVvc3xvc1xcLzJ8YW1pZ2Fvc3xtb3JwaG9zfG9wZW52bXN8ZnVjaHNpYXxocC11eHxzZXJlbml0eW9zKS9pLC8odW5peCkgPyhbXFx3XFwuXSopL2ldLFtOQU1FLFZFUlNJT05dXX07dmFyIFVBUGFyc2VyPWZ1bmN0aW9uKHVhLGV4dGVuc2lvbnMpe2lmKHR5cGVvZiB1YT09PU9CSl9UWVBFKXtleHRlbnNpb25zPXVhO3VhPXVuZGVmaW5lZH1pZighKHRoaXMgaW5zdGFuY2VvZiBVQVBhcnNlcikpe3JldHVybiBuZXcgVUFQYXJzZXIodWEsZXh0ZW5zaW9ucykuZ2V0UmVzdWx0KCl9dmFyIF9uYXZpZ2F0b3I9dHlwZW9mIHdpbmRvdyE9PVVOREVGX1RZUEUmJndpbmRvdy5uYXZpZ2F0b3I/d2luZG93Lm5hdmlnYXRvcjp1bmRlZmluZWQ7dmFyIF91YT11YXx8KF9uYXZpZ2F0b3ImJl9uYXZpZ2F0b3IudXNlckFnZW50P19uYXZpZ2F0b3IudXNlckFnZW50OkVNUFRZKTt2YXIgX3VhY2g9X25hdmlnYXRvciYmX25hdmlnYXRvci51c2VyQWdlbnREYXRhP19uYXZpZ2F0b3IudXNlckFnZW50RGF0YTp1bmRlZmluZWQ7dmFyIF9yZ3htYXA9ZXh0ZW5zaW9ucz9leHRlbmQocmVnZXhlcyxleHRlbnNpb25zKTpyZWdleGVzO3ZhciBfaXNTZWxmTmF2PV9uYXZpZ2F0b3ImJl9uYXZpZ2F0b3IudXNlckFnZW50PT1fdWE7dGhpcy5nZXRCcm93c2VyPWZ1bmN0aW9uKCl7dmFyIF9icm93c2VyPXt9O19icm93c2VyW05BTUVdPXVuZGVmaW5lZDtfYnJvd3NlcltWRVJTSU9OXT11bmRlZmluZWQ7cmd4TWFwcGVyLmNhbGwoX2Jyb3dzZXIsX3VhLF9yZ3htYXAuYnJvd3Nlcik7X2Jyb3dzZXJbTUFKT1JdPW1ham9yaXplKF9icm93c2VyW1ZFUlNJT05dKTtpZihfaXNTZWxmTmF2JiZfbmF2aWdhdG9yJiZfbmF2aWdhdG9yLmJyYXZlJiZ0eXBlb2YgX25hdmlnYXRvci5icmF2ZS5pc0JyYXZlPT1GVU5DX1RZUEUpe19icm93c2VyW05BTUVdPVwiQnJhdmVcIn1yZXR1cm4gX2Jyb3dzZXJ9O3RoaXMuZ2V0Q1BVPWZ1bmN0aW9uKCl7dmFyIF9jcHU9e307X2NwdVtBUkNISVRFQ1RVUkVdPXVuZGVmaW5lZDtyZ3hNYXBwZXIuY2FsbChfY3B1LF91YSxfcmd4bWFwLmNwdSk7cmV0dXJuIF9jcHV9O3RoaXMuZ2V0RGV2aWNlPWZ1bmN0aW9uKCl7dmFyIF9kZXZpY2U9e307X2RldmljZVtWRU5ET1JdPXVuZGVmaW5lZDtfZGV2aWNlW01PREVMXT11bmRlZmluZWQ7X2RldmljZVtUWVBFXT11bmRlZmluZWQ7cmd4TWFwcGVyLmNhbGwoX2RldmljZSxfdWEsX3JneG1hcC5kZXZpY2UpO2lmKF9pc1NlbGZOYXYmJiFfZGV2aWNlW1RZUEVdJiZfdWFjaCYmX3VhY2gubW9iaWxlKXtfZGV2aWNlW1RZUEVdPU1PQklMRX1pZihfaXNTZWxmTmF2JiZfZGV2aWNlW01PREVMXT09XCJNYWNpbnRvc2hcIiYmX25hdmlnYXRvciYmdHlwZW9mIF9uYXZpZ2F0b3Iuc3RhbmRhbG9uZSE9PVVOREVGX1RZUEUmJl9uYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMmJl9uYXZpZ2F0b3IubWF4VG91Y2hQb2ludHM+Mil7X2RldmljZVtNT0RFTF09XCJpUGFkXCI7X2RldmljZVtUWVBFXT1UQUJMRVR9cmV0dXJuIF9kZXZpY2V9O3RoaXMuZ2V0RW5naW5lPWZ1bmN0aW9uKCl7dmFyIF9lbmdpbmU9e307X2VuZ2luZVtOQU1FXT11bmRlZmluZWQ7X2VuZ2luZVtWRVJTSU9OXT11bmRlZmluZWQ7cmd4TWFwcGVyLmNhbGwoX2VuZ2luZSxfdWEsX3JneG1hcC5lbmdpbmUpO3JldHVybiBfZW5naW5lfTt0aGlzLmdldE9TPWZ1bmN0aW9uKCl7dmFyIF9vcz17fTtfb3NbTkFNRV09dW5kZWZpbmVkO19vc1tWRVJTSU9OXT11bmRlZmluZWQ7cmd4TWFwcGVyLmNhbGwoX29zLF91YSxfcmd4bWFwLm9zKTtpZihfaXNTZWxmTmF2JiYhX29zW05BTUVdJiZfdWFjaCYmX3VhY2gucGxhdGZvcm0mJl91YWNoLnBsYXRmb3JtIT1cIlVua25vd25cIil7X29zW05BTUVdPV91YWNoLnBsYXRmb3JtLnJlcGxhY2UoL2Nocm9tZSBvcy9pLENIUk9NSVVNX09TKS5yZXBsYWNlKC9tYWNvcy9pLE1BQ19PUyl9cmV0dXJuIF9vc307dGhpcy5nZXRSZXN1bHQ9ZnVuY3Rpb24oKXtyZXR1cm57dWE6dGhpcy5nZXRVQSgpLGJyb3dzZXI6dGhpcy5nZXRCcm93c2VyKCksZW5naW5lOnRoaXMuZ2V0RW5naW5lKCksb3M6dGhpcy5nZXRPUygpLGRldmljZTp0aGlzLmdldERldmljZSgpLGNwdTp0aGlzLmdldENQVSgpfX07dGhpcy5nZXRVQT1mdW5jdGlvbigpe3JldHVybiBfdWF9O3RoaXMuc2V0VUE9ZnVuY3Rpb24odWEpe191YT10eXBlb2YgdWE9PT1TVFJfVFlQRSYmdWEubGVuZ3RoPlVBX01BWF9MRU5HVEg/dHJpbSh1YSxVQV9NQVhfTEVOR1RIKTp1YTtyZXR1cm4gdGhpc307dGhpcy5zZXRVQShfdWEpO3JldHVybiB0aGlzfTtVQVBhcnNlci5WRVJTSU9OPUxJQlZFUlNJT047VUFQYXJzZXIuQlJPV1NFUj1lbnVtZXJpemUoW05BTUUsVkVSU0lPTixNQUpPUl0pO1VBUGFyc2VyLkNQVT1lbnVtZXJpemUoW0FSQ0hJVEVDVFVSRV0pO1VBUGFyc2VyLkRFVklDRT1lbnVtZXJpemUoW01PREVMLFZFTkRPUixUWVBFLENPTlNPTEUsTU9CSUxFLFNNQVJUVFYsVEFCTEVULFdFQVJBQkxFLEVNQkVEREVEXSk7VUFQYXJzZXIuRU5HSU5FPVVBUGFyc2VyLk9TPWVudW1lcml6ZShbTkFNRSxWRVJTSU9OXSk7aWYodHlwZW9mIGV4cG9ydHMhPT1VTkRFRl9UWVBFKXtpZih0eXBlb2YgbW9kdWxlIT09VU5ERUZfVFlQRSYmbW9kdWxlLmV4cG9ydHMpe2V4cG9ydHM9bW9kdWxlLmV4cG9ydHM9VUFQYXJzZXJ9ZXhwb3J0cy5VQVBhcnNlcj1VQVBhcnNlcn1lbHNle2lmKHR5cGVvZiBkZWZpbmU9PT1GVU5DX1RZUEUmJmRlZmluZS5hbWQpe2RlZmluZShmdW5jdGlvbigpe3JldHVybiBVQVBhcnNlcn0pfWVsc2UgaWYodHlwZW9mIHdpbmRvdyE9PVVOREVGX1RZUEUpe3dpbmRvdy5VQVBhcnNlcj1VQVBhcnNlcn19dmFyICQ9dHlwZW9mIHdpbmRvdyE9PVVOREVGX1RZUEUmJih3aW5kb3cualF1ZXJ5fHx3aW5kb3cuWmVwdG8pO2lmKCQmJiEkLnVhKXt2YXIgcGFyc2VyPW5ldyBVQVBhcnNlcjskLnVhPXBhcnNlci5nZXRSZXN1bHQoKTskLnVhLmdldD1mdW5jdGlvbigpe3JldHVybiBwYXJzZXIuZ2V0VUEoKX07JC51YS5zZXQ9ZnVuY3Rpb24odWEpe3BhcnNlci5zZXRVQSh1YSk7dmFyIHJlc3VsdD1wYXJzZXIuZ2V0UmVzdWx0KCk7Zm9yKHZhciBwcm9wIGluIHJlc3VsdCl7JC51YVtwcm9wXT1yZXN1bHRbcHJvcF19fX19KSh0eXBlb2Ygd2luZG93PT09XCJvYmplY3RcIj93aW5kb3c6dGhpcyk7IiwiLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50cyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9pbnRlcmFjdGl2ZS1zdXBwb3J0cy1mb2N1cyAqL1xyXG5pbXBvcnQgeyBCdXR0b24sIE1vZGFsIH0gZnJvbSAnYW50ZCc7XHJcbmltcG9ydCB7XHJcbiAgdXNlQ2FsbGJhY2ssIHVzZVJlZlxyXG59IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFdlYmNhbSBmcm9tICdyZWFjdC13ZWJjYW0nO1xyXG5pbXBvcnQgeyBpc01vYmlsZSB9IGZyb20gJ3JlYWN0LWRldmljZS1kZXRlY3QnO1xyXG5cclxuaW50ZXJmYWNlIElQcm9wcyB7XHJcbiAgb25GaW5pc2g6IChzcmM6IGFueSkgPT4gdm9pZDtcclxuICBvbkNhbmNlbCA6ICgpPT4gdm9pZDtcclxuICBjYXB0dXJpbmcgOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDYXB0dXJlUGhvdG8oeyBvbkZpbmlzaCwgb25DYW5jZWwsIGNhcHR1cmluZyB9OiBJUHJvcHMpIHtcclxuICBjb25zdCB3ZWJjYW1SZWYgPSB1c2VSZWYobnVsbCk7XHJcblxyXG4gIGNvbnN0IGNhcHR1cmUgPSB1c2VDYWxsYmFjayhcclxuICAgICgpID0+IHtcclxuICAgICAgY29uc3QgaW1hZ2VTcmMgPSB3ZWJjYW1SZWYuY3VycmVudC5nZXRTY3JlZW5zaG90KCk7XHJcbiAgICAgIG9uRmluaXNoKGltYWdlU3JjKTtcclxuICAgIH0sXHJcbiAgICBbd2ViY2FtUmVmXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHZpZGVvQ29uc3RyYWludHMgPSB7XHJcbiAgICBmYWNpbmdNb2RlOiAndXNlcidcclxuICB9O1xyXG5cclxuICBpZiAoaXNNb2JpbGUpIHJldHVybiBudWxsO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgIDxXZWJjYW1cclxuICAgICAgICAgIGF1ZGlvPXtmYWxzZX1cclxuICAgICAgICAgIHNjcmVlbnNob3RGb3JtYXQ9XCJpbWFnZS9wbmdcIlxyXG4gICAgICAgICAgd2lkdGg9XCIxMDAlXCJcclxuICAgICAgICAgIHZpZGVvQ29uc3RyYWludHM9e3ZpZGVvQ29uc3RyYWludHN9XHJcbiAgICAgICAgICByZWY9e3dlYmNhbVJlZn1cclxuICAgICAgICAvPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtNFwiPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJoLTEyIHctMTIgcm91bmRlZC1mdWxsIGJnLXJlZC03MDAgaG92ZXI6YmctcmVkLTYwMCB0cmFuc2l0aW9uLWFsbFwiIG9uQ2xpY2s9e2NhcHR1cmV9PjwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvPlxyXG4gICk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==