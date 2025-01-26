exports.ids = [9];
exports.modules = {

/***/ "./src/antmedia/Player.tsx":
/*!*********************************!*\
  !*** ./src/antmedia/Player.tsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! video.js */ "video.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./src/antmedia/utils.ts");
var _jsxFileName = "C:\\Users\\roman\\Pictures\\Case\\row\\src\\antmedia\\Player.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }





let player;
let interval;
let _streamId;
const leaveSession = () => {
  if (player) {
    player.dispose();
    player = undefined;
  }
  const el = document.getElementById(_streamId);
  if (el) {
    el.remove();
  }
  if (interval) {
    clearTimeout(interval);
    interval = undefined;
  }
};
const Player = _ref => {
  let {
      streamId,
      className,
      extension,
      token,
      subscriberId,
      subscriberCode
    } = _ref,
    props = _objectWithoutProperties(_ref, ["streamId", "className", "extension", "token", "subscriberId", "subscriberCode"]);
  const ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  const settings = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useSelector"])(state => state.streaming.settings);
  const {
    viewerURL,
    AntMediaAppname
  } = settings;
  const initializePlayer = () => {
    if (interval) {
      clearTimeout(interval);
      interval = undefined;
    }
    let el = document.getElementById(streamId);
    if (!el) {
      el = document.createElement('video');
      el.id = streamId;
      el.className = classnames__WEBPACK_IMPORTED_MODULE_1___default()('video-js vjs-default-skin', className);
      el.autoplay = true;
      el.muted = true;
      el.controls = false;
      el.playsInline = true;
      el.width = ref.current.offsetWidth;
      el.height = ref.current.offsetHeight;
      ref.current.appendChild(el);
    }
    let type;
    if (extension === 'm3u8') {
      type = 'application/x-mpegURL';
    }
    if (!player) {
      const videoEl = video_js__WEBPACK_IMPORTED_MODULE_2___default()(el, {
        controlBar: false,
        controls: false,
        bigPlayButton: false,
        muted: true
      }, () => {
        player = videoEl;
        player.play();
      });
      videoEl.addClass('vjs-waiting');
      videoEl.src({
        src: `${window.location.protocol}//${viewerURL}/${AntMediaAppname}/streams/${streamId}.${extension}?token=${token}&subscriberId=${subscriberId}&subscriberCode=${subscriberCode}`,
        type
      });
      videoEl.on('ended', () => {
        videoEl.addClass('vjs-waiting');
        interval = setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          Object(_utils__WEBPACK_IMPORTED_MODULE_4__["tryToPlay"])(viewerURL, AntMediaAppname, streamId, token, extension, subscriberId, subscriberCode, noStreamCallback, initializePlayer);
        }, 3000);
      });
      videoEl.on('error', () => {
        videoEl.error(null);
        videoEl.addClass('vjs-waiting');
        interval = setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          Object(_utils__WEBPACK_IMPORTED_MODULE_4__["tryToPlay"])(viewerURL, AntMediaAppname, streamId, token, extension, subscriberId, subscriberCode, noStreamCallback, initializePlayer);
        }, 3000);
      });
      return;
    }
    player.addClass('vjs-waiting');
    player.src({
      src: `${window.location.protocol}//${viewerURL}/${AntMediaAppname}/streams/${streamId}.${extension}?token=${token}&subscriberId=${subscriberId}&subscriberCode=${subscriberCode}`,
      type
    });
    if (player.readyState()) {
      player.play();
    }
  };
  const noStreamCallback = () => {
    if (extension === 'm3u8') {
      interval = setTimeout(() => {
        Object(_utils__WEBPACK_IMPORTED_MODULE_4__["tryToPlay"])(viewerURL, AntMediaAppname, streamId, token, extension, subscriberId, subscriberCode, noStreamCallback, initializePlayer);
      }, 3000);
    }
  };
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    leaveSession();
    _streamId = streamId;
    if (streamId) {
      Object(_utils__WEBPACK_IMPORTED_MODULE_4__["tryToPlay"])(viewerURL, AntMediaAppname, streamId, token, extension, subscriberId, subscriberCode, noStreamCallback, initializePlayer);
    }
  }, [streamId]);

  // eslint-disable-next-line arrow-body-style
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    return () => {
      leaveSession();
    };
  }, []);
  return __jsx("div", _extends({}, props, {
    ref: ref,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 143,
      columnNumber: 10
    }
  }));
};
Player.defaultProps = {
  token: '',
  subscriberId: '',
  subscriberCode: '',
  className: '',
  containerCls: '',
  style: {}
};
/* harmony default export */ __webpack_exports__["default"] = (Player);

/***/ }),

/***/ "./src/antmedia/utils.ts":
/*!*******************************!*\
  !*** ./src/antmedia/utils.ts ***!
  \*******************************/
/*! exports provided: initializePlayer, tryToPlay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initializePlayer", function() { return initializePlayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tryToPlay", function() { return tryToPlay; });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);

function initializePlayer(id, cls) {
  const video = document.createElement('video');
  video.id = id;
  video.className = classnames__WEBPACK_IMPORTED_MODULE_0___default()('video-js broadcaster', cls);
  video.autoplay = true;
  video.muted = true;
  video.controls = true;
  video.playsInline = true;
  return video;
}

// eslint-disable-next-line no-shadow
function tryToPlay(url, appName, streamId, token, type, subscriberId, subscriberCode, noStreamCallback, initializePlayer) {
  fetch(`${window.location.protocol}//${url}/${appName}/streams/${streamId}_adaptive.${type}`, {
    method: 'HEAD'
  }).then(response => {
    if (response.status === 200) {
      // adaptive m3u8 & mpd exists,play it
      initializePlayer(`${streamId}_adaptive`, type, token, subscriberId, subscriberCode);
    } else {
      // adaptive not exists, try mpd or m3u8 exists.
      fetch(`${window.location.protocol}//${url}/${appName}/streams/${streamId}.${type}`, {
        method: 'HEAD'
      })
      // eslint-disable-next-line no-shadow
      .then(response => {
        if (response.status === 200) {
          initializePlayer(streamId, type, token, subscriberId, subscriberCode);
        } else {
          // eslint-disable-next-line no-console
          console.log('No stream found');
          if (typeof noStreamCallback !== 'undefined') {
            noStreamCallback();
          }
        }
      }).catch(err => {
        // eslint-disable-next-line no-console
        console.log(`Error: ${err}`);
      });
    }
  }).catch(err => {
    // eslint-disable-next-line no-console
    console.log(`Error: ${err}`);
  });
}

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYW50bWVkaWEvUGxheWVyLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvYW50bWVkaWEvdXRpbHMudHMiXSwibmFtZXMiOlsicGxheWVyIiwiaW50ZXJ2YWwiLCJfc3RyZWFtSWQiLCJsZWF2ZVNlc3Npb24iLCJkaXNwb3NlIiwidW5kZWZpbmVkIiwiZWwiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVtb3ZlIiwiY2xlYXJUaW1lb3V0IiwiUGxheWVyIiwiX3JlZiIsInN0cmVhbUlkIiwiY2xhc3NOYW1lIiwiZXh0ZW5zaW9uIiwidG9rZW4iLCJzdWJzY3JpYmVySWQiLCJzdWJzY3JpYmVyQ29kZSIsInByb3BzIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwicmVmIiwidXNlUmVmIiwic2V0dGluZ3MiLCJ1c2VTZWxlY3RvciIsInN0YXRlIiwic3RyZWFtaW5nIiwidmlld2VyVVJMIiwiQW50TWVkaWFBcHBuYW1lIiwiaW5pdGlhbGl6ZVBsYXllciIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsImNsYXNzbmFtZXMiLCJhdXRvcGxheSIsIm11dGVkIiwiY29udHJvbHMiLCJwbGF5c0lubGluZSIsIndpZHRoIiwiY3VycmVudCIsIm9mZnNldFdpZHRoIiwiaGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0IiwiYXBwZW5kQ2hpbGQiLCJ0eXBlIiwidmlkZW9FbCIsInZpZGVvanMiLCJjb250cm9sQmFyIiwiYmlnUGxheUJ1dHRvbiIsInBsYXkiLCJhZGRDbGFzcyIsInNyYyIsIndpbmRvdyIsImxvY2F0aW9uIiwicHJvdG9jb2wiLCJvbiIsInNldFRpbWVvdXQiLCJ0cnlUb1BsYXkiLCJub1N0cmVhbUNhbGxiYWNrIiwiZXJyb3IiLCJyZWFkeVN0YXRlIiwidXNlRWZmZWN0IiwiX19qc3giLCJfZXh0ZW5kcyIsIl9fc2VsZiIsIl9fc291cmNlIiwiZmlsZU5hbWUiLCJfanN4RmlsZU5hbWUiLCJsaW5lTnVtYmVyIiwiY29sdW1uTnVtYmVyIiwiZGVmYXVsdFByb3BzIiwiY29udGFpbmVyQ2xzIiwic3R5bGUiLCJjbHMiLCJ2aWRlbyIsInVybCIsImFwcE5hbWUiLCJmZXRjaCIsIm1ldGhvZCIsInRoZW4iLCJyZXNwb25zZSIsInN0YXR1cyIsImNvbnNvbGUiLCJsb2ciLCJjYXRjaCIsImVyciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlEO0FBQ3JCO0FBQ0w7QUFDVztBQUVOO0FBYXBDLElBQUlBLE1BQXNCO0FBQzFCLElBQUlDLFFBQXdCO0FBQzVCLElBQUlDLFNBQWlCO0FBRXJCLE1BQU1DLFlBQVksR0FBR0EsQ0FBQSxLQUFNO0VBQ3pCLElBQUlILE1BQU0sRUFBRTtJQUNWQSxNQUFNLENBQUNJLE9BQU8sQ0FBQyxDQUFDO0lBQ2hCSixNQUFNLEdBQUdLLFNBQVM7RUFDcEI7RUFFQSxNQUFNQyxFQUFFLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDTixTQUFTLENBQUM7RUFDN0MsSUFBSUksRUFBRSxFQUFFO0lBQ05BLEVBQUUsQ0FBQ0csTUFBTSxDQUFDLENBQUM7RUFDYjtFQUVBLElBQUlSLFFBQVEsRUFBRTtJQUNaUyxZQUFZLENBQUNULFFBQVEsQ0FBQztJQUN0QkEsUUFBUSxHQUFHSSxTQUFTO0VBQ3RCO0FBQ0YsQ0FBQztBQUVELE1BQU1NLE1BQU0sR0FBR0MsSUFBQSxJQUVGO0VBQUEsSUFGRztNQUNkQyxRQUFRO01BQUVDLFNBQVM7TUFBRUMsU0FBUztNQUFFQyxLQUFLO01BQUVDLFlBQVk7TUFBRUM7SUFDaEQsQ0FBQyxHQUFBTixJQUFBO0lBRGtFTyxLQUFLLEdBQUFDLHdCQUFBLENBQUFSLElBQUE7RUFFN0UsTUFBTVMsR0FBRyxHQUFHQyxvREFBTSxDQUFpQixDQUFDO0VBQ3BDLE1BQU1DLFFBQVEsR0FBR0MsK0RBQVcsQ0FBRUMsS0FBVSxJQUFLQSxLQUFLLENBQUNDLFNBQVMsQ0FBQ0gsUUFBUSxDQUFtQjtFQUN4RixNQUFNO0lBQUVJLFNBQVM7SUFBRUM7RUFBZ0IsQ0FB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QjtRQUNBSCxPQUFPLENBQUNDLEdBQUcsQ0FBQyxVQUFVRSxHQUFHLEVBQUUsQ0FBQztNQUM5QixDQUFDLENBQUM7SUFDTjtFQUNGLENBQUMsQ0FBQyxDQUFDRCxLQUFLLENBQUVDLEdBQUcsSUFBSztJQUNoQjtJQUNBSCxPQUFPLENBQUNDLEdBQUcsQ0FBQyxVQUFVRSxHQUFHLEVBQUUsQ0FBQztFQUM5QixDQUFDLENBQUM7QUFDTixDIiwiZmlsZSI6IjkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiwgQ1NTUHJvcGVydGllcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcbmltcG9ydCB2aWRlb2pzIGZyb20gJ3ZpZGVvLmpzJztcclxuaW1wb3J0IHsgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IFN0cmVhbVNldHRpbmdzIH0gZnJvbSAnc3JjL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyB0cnlUb1BsYXkgfSBmcm9tICcuL3V0aWxzJztcclxuXHJcbmludGVyZmFjZSBQcm9wcyB7XHJcbiAgc3RyZWFtSWQ6IHN0cmluZztcclxuICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgY29udGFpbmVyQ2xzPzogc3RyaW5nO1xyXG4gIGV4dGVuc2lvbjogc3RyaW5nO1xyXG4gIHRva2VuPzogc3RyaW5nO1xyXG4gIHN1YnNjcmliZXJJZD86IHN0cmluZztcclxuICBzdWJzY3JpYmVyQ29kZT86IHN0cmluZztcclxuICBzdHlsZT86IENTU1Byb3BlcnRpZXM7XHJcbn1cclxuXHJcbmxldCBwbGF5ZXI6IHZpZGVvanMuUGxheWVyO1xyXG5sZXQgaW50ZXJ2YWw6IE5vZGVKUy5UaW1lb3V0O1xyXG5sZXQgX3N0cmVhbUlkOiBzdHJpbmc7XHJcblxyXG5jb25zdCBsZWF2ZVNlc3Npb24gPSAoKSA9PiB7XHJcbiAgaWYgKHBsYXllcikge1xyXG4gICAgcGxheWVyLmRpc3Bvc2UoKTtcclxuICAgIHBsYXllciA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoX3N0cmVhbUlkKTtcclxuICBpZiAoZWwpIHtcclxuICAgIGVsLnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGludGVydmFsKSB7XHJcbiAgICBjbGVhclRpbWVvdXQoaW50ZXJ2YWwpO1xyXG4gICAgaW50ZXJ2YWwgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgUGxheWVyID0gKHtcclxuICBzdHJlYW1JZCwgY2xhc3NOYW1lLCBleHRlbnNpb24sIHRva2VuLCBzdWJzY3JpYmVySWQsIHN1YnNjcmliZXJDb2RlLCAuLi5wcm9wc1xyXG59OiBQcm9wcykgPT4ge1xyXG4gIGNvbnN0IHJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4oKTtcclxuICBjb25zdCBzZXR0aW5ncyA9IHVzZVNlbGVjdG9yKChzdGF0ZTogYW55KSA9PiBzdGF0ZS5zdHJlYW1pbmcuc2V0dGluZ3MpIGFzIFN0cmVhbVNldHRpbmdzO1xyXG4gIGNvbnN0IHsgdmlld2VyVVJMLCBBbnRNZWRpYUFwcG5hbWUgfSA9IHNldHRpbmdzO1xyXG4gIGNvbnN0IGluaXRpYWxpemVQbGF5ZXIgPSAoKSA9PiB7XHJcbiAgICBpZiAoaW50ZXJ2YWwpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KGludGVydmFsKTtcclxuICAgICAgaW50ZXJ2YWwgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3RyZWFtSWQpIGFzIEhUTUxWaWRlb0VsZW1lbnQ7XHJcbiAgICBpZiAoIWVsKSB7XHJcbiAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuICAgICAgZWwuaWQgPSBzdHJlYW1JZDtcclxuICAgICAgZWwuY2xhc3NOYW1lID0gY2xhc3NuYW1lcygndmlkZW8tanMgdmpzLWRlZmF1bHQtc2tpbicsIGNsYXNzTmFtZSk7XHJcbiAgICAgIGVsLmF1dG9wbGF5ID0gdHJ1ZTtcclxuICAgICAgZWwubXV0ZWQgPSB0cnVlO1xyXG4gICAgICBlbC5jb250cm9scyA9IGZhbHNlO1xyXG4gICAgICBlbC5wbGF5c0lubGluZSA9IHRydWU7XHJcbiAgICAgIGVsLndpZHRoID0gcmVmLmN1cnJlbnQub2Zmc2V0V2lkdGg7XHJcbiAgICAgIGVsLmhlaWdodCA9IHJlZi5jdXJyZW50Lm9mZnNldEhlaWdodDtcclxuICAgICAgcmVmLmN1cnJlbnQuYXBwZW5kQ2hpbGQoZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB0eXBlOiBzdHJpbmc7XHJcbiAgICBpZiAoZXh0ZW5zaW9uID09PSAnbTN1OCcpIHtcclxuICAgICAgdHlwZSA9ICdhcHBsaWNhdGlvbi94LW1wZWdVUkwnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghcGxheWVyKSB7XHJcbiAgICAgIGNvbnN0IHZpZGVvRWwgPSB2aWRlb2pzKGVsLCB7XHJcbiAgICAgICAgY29udHJvbEJhcjogZmFsc2UsXHJcbiAgICAgICAgY29udHJvbHM6IGZhbHNlLFxyXG4gICAgICAgIGJpZ1BsYXlCdXR0b246IGZhbHNlLFxyXG4gICAgICAgIG11dGVkOiB0cnVlXHJcbiAgICAgIH0sICgpID0+IHtcclxuICAgICAgICBwbGF5ZXIgPSB2aWRlb0VsO1xyXG4gICAgICAgIHBsYXllci5wbGF5KCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdmlkZW9FbC5hZGRDbGFzcygndmpzLXdhaXRpbmcnKTtcclxuICAgICAgdmlkZW9FbC5zcmMoe1xyXG4gICAgICAgIHNyYzogYCR7d2luZG93LmxvY2F0aW9uLnByb3RvY29sfS8vJHt2aWV3ZXJVUkx9LyR7QW50TWVkaWFBcHBuYW1lfS9zdHJlYW1zLyR7c3RyZWFtSWR9LiR7ZXh0ZW5zaW9ufT90b2tlbj0ke3Rva2VufSZzdWJzY3JpYmVySWQ9JHtzdWJzY3JpYmVySWR9JnN1YnNjcmliZXJDb2RlPSR7c3Vic2NyaWJlckNvZGV9YCxcclxuICAgICAgICB0eXBlXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdmlkZW9FbC5vbignZW5kZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgdmlkZW9FbC5hZGRDbGFzcygndmpzLXdhaXRpbmcnKTtcclxuICAgICAgICBpbnRlcnZhbCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11c2UtYmVmb3JlLWRlZmluZVxyXG4gICAgICAgICAgdHJ5VG9QbGF5KHZpZXdlclVSTCwgQW50TWVkaWFBcHBuYW1lLCBzdHJlYW1JZCwgdG9rZW4sIGV4dGVuc2lvbiwgc3Vic2NyaWJlcklkLCBzdWJzY3JpYmVyQ29kZSwgbm9TdHJlYW1DYWxsYmFjaywgaW5pdGlhbGl6ZVBsYXllcik7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdmlkZW9FbC5vbignZXJyb3InLCAoKSA9PiB7XHJcbiAgICAgICAgdmlkZW9FbC5lcnJvcihudWxsKTtcclxuICAgICAgICB2aWRlb0VsLmFkZENsYXNzKCd2anMtd2FpdGluZycpO1xyXG4gICAgICAgIGludGVydmFsID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVzZS1iZWZvcmUtZGVmaW5lXHJcbiAgICAgICAgICB0cnlUb1BsYXkodmlld2VyVVJMLCBBbnRNZWRpYUFwcG5hbWUsIHN0cmVhbUlkLCB0b2tlbiwgZXh0ZW5zaW9uLCBzdWJzY3JpYmVySWQsIHN1YnNjcmliZXJDb2RlLCBub1N0cmVhbUNhbGxiYWNrLCBpbml0aWFsaXplUGxheWVyKTtcclxuICAgICAgICB9LCAzMDAwKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcGxheWVyLmFkZENsYXNzKCd2anMtd2FpdGluZycpO1xyXG4gICAgcGxheWVyLnNyYyh7XHJcbiAgICAgIHNyYzogYCR7d2luZG93LmxvY2F0aW9uLnByb3RvY29sfS8vJHt2aWV3ZXJVUkx9LyR7QW50TWVkaWFBcHBuYW1lfS9zdHJlYW1zLyR7c3RyZWFtSWR9LiR7ZXh0ZW5zaW9ufT90b2tlbj0ke3Rva2VufSZzdWJzY3JpYmVySWQ9JHtzdWJzY3JpYmVySWR9JnN1YnNjcmliZXJDb2RlPSR7c3Vic2NyaWJlckNvZGV9YCxcclxuICAgICAgdHlwZVxyXG4gICAgfSk7XHJcbiAgICBpZiAocGxheWVyLnJlYWR5U3RhdGUoKSkge1xyXG4gICAgICBwbGF5ZXIucGxheSgpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IG5vU3RyZWFtQ2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICBpZiAoZXh0ZW5zaW9uID09PSAnbTN1OCcpIHtcclxuICAgICAgaW50ZXJ2YWwgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0cnlUb1BsYXkodmlld2VyVVJMLCBBbnRNZWRpYUFwcG5hbWUsIHN0cmVhbUlkLCB0b2tlbiwgZXh0ZW5zaW9uLCBzdWJzY3JpYmVySWQsIHN1YnNjcmliZXJDb2RlLCBub1N0cmVhbUNhbGxiYWNrLCBpbml0aWFsaXplUGxheWVyKTtcclxuICAgICAgfSwgMzAwMCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGxlYXZlU2Vzc2lvbigpO1xyXG5cclxuICAgIF9zdHJlYW1JZCA9IHN0cmVhbUlkO1xyXG5cclxuICAgIGlmIChzdHJlYW1JZCkge1xyXG4gICAgICB0cnlUb1BsYXkodmlld2VyVVJMLCBBbnRNZWRpYUFwcG5hbWUsIHN0cmVhbUlkLCB0b2tlbiwgZXh0ZW5zaW9uLCBzdWJzY3JpYmVySWQsIHN1YnNjcmliZXJDb2RlLCBub1N0cmVhbUNhbGxiYWNrLCBpbml0aWFsaXplUGxheWVyKTtcclxuICAgIH1cclxuICB9LCBbc3RyZWFtSWRdKTtcclxuXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGFycm93LWJvZHktc3R5bGVcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgbGVhdmVTZXNzaW9uKCk7XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgcmV0dXJuIDxkaXYgey4uLnByb3BzfSByZWY9e3JlZn0gLz47XHJcbn07XHJcblxyXG5QbGF5ZXIuZGVmYXVsdFByb3BzID0ge1xyXG4gIHRva2VuOiAnJyxcclxuICBzdWJzY3JpYmVySWQ6ICcnLFxyXG4gIHN1YnNjcmliZXJDb2RlOiAnJyxcclxuICBjbGFzc05hbWU6ICcnLFxyXG4gIGNvbnRhaW5lckNsczogJycsXHJcbiAgc3R5bGU6IHt9XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcclxuIiwiaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZVBsYXllcihpZDogc3RyaW5nLCBjbHM/OiBzdHJpbmcpOiBIVE1MVmlkZW9FbGVtZW50IHtcclxuICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgdmlkZW8uaWQgPSBpZDtcclxuICB2aWRlby5jbGFzc05hbWUgPSBjbGFzc25hbWVzKCd2aWRlby1qcyBicm9hZGNhc3RlcicsIGNscyk7XHJcbiAgdmlkZW8uYXV0b3BsYXkgPSB0cnVlO1xyXG4gIHZpZGVvLm11dGVkID0gdHJ1ZTtcclxuICB2aWRlby5jb250cm9scyA9IHRydWU7XHJcbiAgdmlkZW8ucGxheXNJbmxpbmUgPSB0cnVlO1xyXG4gIHJldHVybiB2aWRlbztcclxufVxyXG5cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNoYWRvd1xyXG5leHBvcnQgZnVuY3Rpb24gdHJ5VG9QbGF5KHVybDogc3RyaW5nLCBhcHBOYW1lOiBzdHJpbmcsIHN0cmVhbUlkOiBzdHJpbmcsIHRva2VuOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgc3Vic2NyaWJlcklkOiBzdHJpbmcsIHN1YnNjcmliZXJDb2RlOiBzdHJpbmcsIG5vU3RyZWFtQ2FsbGJhY2s6IEZ1bmN0aW9uLCBpbml0aWFsaXplUGxheWVyOiBGdW5jdGlvbikge1xyXG4gIGZldGNoKGAke3dpbmRvdy5sb2NhdGlvbi5wcm90b2NvbH0vLyR7dXJsfS8ke2FwcE5hbWV9L3N0cmVhbXMvJHtzdHJlYW1JZH1fYWRhcHRpdmUuJHt0eXBlfWAsIHsgbWV0aG9kOiAnSEVBRCcgfSlcclxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAvLyBhZGFwdGl2ZSBtM3U4ICYgbXBkIGV4aXN0cyxwbGF5IGl0XHJcbiAgICAgICAgaW5pdGlhbGl6ZVBsYXllcihgJHtzdHJlYW1JZH1fYWRhcHRpdmVgLCB0eXBlLCB0b2tlbiwgc3Vic2NyaWJlcklkLCBzdWJzY3JpYmVyQ29kZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gYWRhcHRpdmUgbm90IGV4aXN0cywgdHJ5IG1wZCBvciBtM3U4IGV4aXN0cy5cclxuICAgICAgICBmZXRjaChgJHt3aW5kb3cubG9jYXRpb24ucHJvdG9jb2x9Ly8ke3VybH0vJHthcHBOYW1lfS9zdHJlYW1zLyR7c3RyZWFtSWR9LiR7dHlwZX1gLCB7IG1ldGhvZDogJ0hFQUQnIH0pXHJcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2hhZG93XHJcbiAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgaW5pdGlhbGl6ZVBsYXllcihzdHJlYW1JZCwgdHlwZSwgdG9rZW4sIHN1YnNjcmliZXJJZCwgc3Vic2NyaWJlckNvZGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIHN0cmVhbSBmb3VuZCcpO1xyXG4gICAgICAgICAgICAgIGlmICh0eXBlb2Ygbm9TdHJlYW1DYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIG5vU3RyZWFtQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYEVycm9yOiAke2Vycn1gKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXHJcbiAgICAgIGNvbnNvbGUubG9nKGBFcnJvcjogJHtlcnJ9YCk7XHJcbiAgICB9KTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9