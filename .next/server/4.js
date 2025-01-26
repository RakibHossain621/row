exports.ids = [4];
exports.modules = {

/***/ "./src/components/photo/capture-photo.tsx":
/*!************************************************!*\
  !*** ./src/components/photo/capture-photo.tsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CapturePhoto; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_webcam__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-webcam */ "react-webcam");
/* harmony import */ var react_webcam__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_webcam__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-device-detect */ "react-device-detect");
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_device_detect__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "C:\\Users\\roman\\Pictures\\Case\\row\\src\\components\\photo\\capture-photo.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */




function CapturePhoto({
  onFinish,
  onCancel,
  capturing
}) {
  const webcamRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const capture = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onFinish(imageSrc);
  }, [webcamRef]);
  const videoConstraints = {
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

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waG90by9jYXB0dXJlLXBob3RvLnRzeCJdLCJuYW1lcyI6WyJDYXB0dXJlUGhvdG8iLCJvbkZpbmlzaCIsIm9uQ2FuY2VsIiwiY2FwdHVyaW5nIiwid2ViY2FtUmVmIiwidXNlUmVmIiwiY2FwdHVyZSIsInVzZUNhbGxiYWNrIiwiaW1hZ2VTcmMiLCJjdXJyZW50IiwiZ2V0U2NyZWVuc2hvdCIsInZpZGVvQ29uc3RyYWludHMiLCJmYWNpbmdNb2RlIiwiaXNNb2JpbGUiLCJfX2pzeCIsIlJlYWN0IiwiRnJhZ21lbnQiLCJjbGFzc05hbWUiLCJfX3NlbGYiLCJfX3NvdXJjZSIsImZpbGVOYW1lIiwiX2pzeEZpbGVOYW1lIiwibGluZU51bWJlciIsImNvbHVtbk51bWJlciIsIldlYmNhbSIsImF1ZGlvIiwic2NyZWVuc2hvdEZvcm1hdCIsIndpZHRoIiwicmVmIiwib25DbGljayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBSWU7QUFDbUI7QUFDYTtBQVFoQyxTQUFTQSxZQUFZQSxDQUFDO0VBQUVDLFFBQVE7RUFBRUMsUUFBUTtFQUFFQztBQUFrQixDQUFDLEVBQUU7RUFDOUUsTUFBTUMsU0FBUyxHQUFHQyxvREFBTSxDQUFDLElBQUksQ0FBQztFQUU5QixNQUFNQyxPQUFPLEdBQUdDLHlEQUFXLENBQ3pCLE1BQU07SUFDSixNQUFNQyxRQUFRLEdBQUdKLFNBQVMsQ0FBQ0ssT0FBTyxDQUFDQyxhQUFhLENBQUMsQ0FBQztJQUNsRFQsUUFBUSxDQUFDTyxRQUFRLENBQUM7RUFDcEIsQ0FBQyxFQUNELENBQUNKLFNBQVMsQ0FDWixDQUFDO0VBRUQsTUFBTU8sZ0JBQWdCLEdBQUc7SUFDdkJDLFVBQVUsRUFBRTtFQUNkLENBQUM7RUFFRCxJQUFJQyw0REFBUSxFQUFFLE9BQU8sSUFBSTtFQUV6QixPQUNFQyxLQUFBLENBQUFDLDRDQUFBLENBQUFDLFFBQUEsUUFDRUYsS0FBQTtJQUFLRyxTQUFTLEVBQUMsYUFBYTtJQUFBQyxNQUFBO0lBQUFDLFFBQUE7TUFBQUMsUUFBQSxFQUFBQyxZQUFBO01BQUFDLFVBQUE7TUFBQUMsWUFBQTtJQUFBO0VBQUEsR0FDMUJULEtBQUEsQ0FBQ1UsbURBQU07SUFDTEMsS0FBSyxFQUFFLEtBQU07SUFDYkMsZ0JBQWdCLEVBQUMsV0FBVztJQUM1QkMsS0FBSyxFQUFDLE1BQU07SUFDWmhCLGdCQUFnQixFQUFFQSxnQkFBaUI7SUFDbkNpQixHQUFHLEVBQUV4QixTQUFVO0lBQUFjLE1BQUE7SUFBQUMsUUFBQTtNQUFBQyxRQUFBLEVBQUFDLFlBQUE7TUFBQUMsVUFBQTtNQUFBQyxZQUFBO0lBQUE7RUFBQSxDQUNoQixDQUFDLEVBQ0ZULEtBQUE7SUFBS0csU0FBUyxFQUFDLE1BQU07SUFBQUMsTUFBQTtJQUFBQyxRQUFBO01BQUFDLFFBQUEsRUFBQUMsWUFBQTtNQUFBQyxVQUFBO01BQUFDLFlBQUE7SUFBQTtFQUFBLEdBQ25CVCxLQUFBO0lBQVFHLFNBQVMsRUFBQyxtRUFBbUU7SUFBQ1ksT0FBTyxFQUFFdkIsT0FBUTtJQUFBWSxNQUFBO0lBQUFDLFFBQUE7TUFBQUMsUUFBQSxFQUFBQyxZQUFBO01BQUFDLFVBQUE7TUFBQUMsWUFBQTtJQUFBO0VBQUEsQ0FBUyxDQUM3RyxDQUNGLENBQ0wsQ0FBQztBQUVQLEMiLCJmaWxlIjoiNC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgKi9cclxuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvaW50ZXJhY3RpdmUtc3VwcG9ydHMtZm9jdXMgKi9cclxuaW1wb3J0IHsgQnV0dG9uLCBNb2RhbCB9IGZyb20gJ2FudGQnO1xyXG5pbXBvcnQge1xyXG4gIHVzZUNhbGxiYWNrLCB1c2VSZWZcclxufSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBXZWJjYW0gZnJvbSAncmVhY3Qtd2ViY2FtJztcclxuaW1wb3J0IHsgaXNNb2JpbGUgfSBmcm9tICdyZWFjdC1kZXZpY2UtZGV0ZWN0JztcclxuXHJcbmludGVyZmFjZSBJUHJvcHMge1xyXG4gIG9uRmluaXNoOiAoc3JjOiBhbnkpID0+IHZvaWQ7XHJcbiAgb25DYW5jZWwgOiAoKT0+IHZvaWQ7XHJcbiAgY2FwdHVyaW5nIDogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2FwdHVyZVBob3RvKHsgb25GaW5pc2gsIG9uQ2FuY2VsLCBjYXB0dXJpbmcgfTogSVByb3BzKSB7XHJcbiAgY29uc3Qgd2ViY2FtUmVmID0gdXNlUmVmKG51bGwpO1xyXG5cclxuICBjb25zdCBjYXB0dXJlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGltYWdlU3JjID0gd2ViY2FtUmVmLmN1cnJlbnQuZ2V0U2NyZWVuc2hvdCgpO1xyXG4gICAgICBvbkZpbmlzaChpbWFnZVNyYyk7XHJcbiAgICB9LFxyXG4gICAgW3dlYmNhbVJlZl1cclxuICApO1xyXG5cclxuICBjb25zdCB2aWRlb0NvbnN0cmFpbnRzID0ge1xyXG4gICAgZmFjaW5nTW9kZTogJ3VzZXInXHJcbiAgfTtcclxuXHJcbiAgaWYgKGlzTW9iaWxlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICA8V2ViY2FtXHJcbiAgICAgICAgICBhdWRpbz17ZmFsc2V9XHJcbiAgICAgICAgICBzY3JlZW5zaG90Rm9ybWF0PVwiaW1hZ2UvcG5nXCJcclxuICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXHJcbiAgICAgICAgICB2aWRlb0NvbnN0cmFpbnRzPXt2aWRlb0NvbnN0cmFpbnRzfVxyXG4gICAgICAgICAgcmVmPXt3ZWJjYW1SZWZ9XHJcbiAgICAgICAgLz5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTRcIj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiaC0xMiB3LTEyIHJvdW5kZWQtZnVsbCBiZy1yZWQtNzAwIGhvdmVyOmJnLXJlZC02MDAgdHJhbnNpdGlvbi1hbGxcIiBvbkNsaWNrPXtjYXB0dXJlfT48L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8Lz5cclxuICApO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=