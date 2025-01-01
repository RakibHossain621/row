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
var _jsxFileName = "C:\\Users\\Rokibul\\Documents\\case\\src\\components\\photo\\capture-photo.tsx";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waG90by9jYXB0dXJlLXBob3RvLnRzeCJdLCJuYW1lcyI6WyJDYXB0dXJlUGhvdG8iLCJvbkZpbmlzaCIsIm9uQ2FuY2VsIiwiY2FwdHVyaW5nIiwid2ViY2FtUmVmIiwidXNlUmVmIiwiY2FwdHVyZSIsInVzZUNhbGxiYWNrIiwiaW1hZ2VTcmMiLCJjdXJyZW50IiwiZ2V0U2NyZWVuc2hvdCIsInZpZGVvQ29uc3RyYWludHMiLCJmYWNpbmdNb2RlIiwiaXNNb2JpbGUiLCJfX2pzeCIsIlJlYWN0IiwiRnJhZ21lbnQiLCJjbGFzc05hbWUiLCJfX3NlbGYiLCJfX3NvdXJjZSIsImZpbGVOYW1lIiwiX2pzeEZpbGVOYW1lIiwibGluZU51bWJlciIsImNvbHVtbk51bWJlciIsIldlYmNhbSIsImF1ZGlvIiwic2NyZWVuc2hvdEZvcm1hdCIsIndpZHRoIiwicmVmIiwib25DbGljayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBSWU7QUFDbUI7QUFDYTtBQVFoQyxTQUFTQSxZQUFZQSxDQUFDO0VBQUVDLFFBQVE7RUFBRUMsUUFBUTtFQUFFQztBQUFrQixDQUFDLEVBQUU7RUFDOUUsTUFBTUMsU0FBUyxHQUFHQyxvREFBTSxDQUFDLElBQUksQ0FBQztFQUU5QixNQUFNQyxPQUFPLEdBQUdDLHlEQUFXLENBQ3pCLE1BQU07SUFDSixNQUFNQyxRQUFRLEdBQUdKLFNBQVMsQ0FBQ0ssT0FBTyxDQUFDQyxhQUFhLENBQUMsQ0FBQztJQUNsRFQsUUFBUSxDQUFDTyxRQUFRLENBQUM7RUFDcEIsQ0FBQyxFQUNELENBQUNKLFNBQVMsQ0FDWixDQUFDO0VBRUQsTUFBTU8sZ0JBQWdCLEdBQUc7SUFDdkJDLFVBQVUsRUFBRTtFQUNkLENBQUM7RUFFRCxJQUFJQyw0REFBUSxFQUFFLE9BQU8sSUFBSTtFQUV6QixPQUNFQyxLQUFBLENBQUFDLDRDQUFBLENBQUFDLFFBQUEsUUFDRUYsS0FBQTtJQUFLRyxTQUFTLEVBQUMsYUFBYTtJQUFBQyxNQUFBO0lBQUFDLFFBQUE7TUFBQUMsUUFBQSxFQUFBQyxZQUFBO01BQUFDLFVBQUE7TUFBQUMsWUFBQTtJQUFBO0VBQUEsR0FDMUJULEtBQUEsQ0FBQ1UsbURBQU07SUFDTEMsS0FBSyxFQUFFLEtBQU07SUFDYkMsZ0JBQWdCLEVBQUMsV0FBVztJQUM1QkMsS0FBSyxFQUFDLE1BQU07SUFDWmhCLGdCQUFnQixFQUFFQSxnQkFBaUI7SUFDbkNpQixHQUFHLEVBQUV4QixTQUFVO0lBQUFjLE1BQUE7SUFBQUMsUUFBQTtNQUFBQyxRQUFBLEVBQUFDLFlBQUE7TUFBQUMsVUFBQTtNQUFBQyxZQUFBO0lBQUE7RUFBQSxDQUNoQixDQUFDLEVBQ0ZULEtBQUE7SUFBS0csU0FBUyxFQUFDLE1BQU07SUFBQUMsTUFBQTtJQUFBQyxRQUFBO01BQUFDLFFBQUEsRUFBQUMsWUFBQTtNQUFBQyxVQUFBO01BQUFDLFlBQUE7SUFBQTtFQUFBLEdBQ25CVCxLQUFBO0lBQVFHLFNBQVMsRUFBQyxtRUFBbUU7SUFBQ1ksT0FBTyxFQUFFdkIsT0FBUTtJQUFBWSxNQUFBO0lBQUFDLFFBQUE7TUFBQUMsUUFBQSxFQUFBQyxZQUFBO01BQUFDLFVBQUE7TUFBQUMsWUFBQTtJQUFBO0VBQUEsQ0FBUyxDQUM3RyxDQUNGLENBQ0wsQ0FBQztBQUVQLEMiLCJmaWxlIjoiNC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L2ludGVyYWN0aXZlLXN1cHBvcnRzLWZvY3VzICovXG5pbXBvcnQgeyBCdXR0b24sIE1vZGFsIH0gZnJvbSAnYW50ZCc7XG5pbXBvcnQge1xuICB1c2VDYWxsYmFjaywgdXNlUmVmXG59IGZyb20gJ3JlYWN0JztcbmltcG9ydCBXZWJjYW0gZnJvbSAncmVhY3Qtd2ViY2FtJztcbmltcG9ydCB7IGlzTW9iaWxlIH0gZnJvbSAncmVhY3QtZGV2aWNlLWRldGVjdCc7XG5cbmludGVyZmFjZSBJUHJvcHMge1xuICBvbkZpbmlzaDogKHNyYzogYW55KSA9PiB2b2lkO1xuICBvbkNhbmNlbCA6ICgpPT4gdm9pZDtcbiAgY2FwdHVyaW5nIDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2FwdHVyZVBob3RvKHsgb25GaW5pc2gsIG9uQ2FuY2VsLCBjYXB0dXJpbmcgfTogSVByb3BzKSB7XG4gIGNvbnN0IHdlYmNhbVJlZiA9IHVzZVJlZihudWxsKTtcblxuICBjb25zdCBjYXB0dXJlID0gdXNlQ2FsbGJhY2soXG4gICAgKCkgPT4ge1xuICAgICAgY29uc3QgaW1hZ2VTcmMgPSB3ZWJjYW1SZWYuY3VycmVudC5nZXRTY3JlZW5zaG90KCk7XG4gICAgICBvbkZpbmlzaChpbWFnZVNyYyk7XG4gICAgfSxcbiAgICBbd2ViY2FtUmVmXVxuICApO1xuXG4gIGNvbnN0IHZpZGVvQ29uc3RyYWludHMgPSB7XG4gICAgZmFjaW5nTW9kZTogJ3VzZXInXG4gIH07XG5cbiAgaWYgKGlzTW9iaWxlKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgIDxXZWJjYW1cbiAgICAgICAgICBhdWRpbz17ZmFsc2V9XG4gICAgICAgICAgc2NyZWVuc2hvdEZvcm1hdD1cImltYWdlL3BuZ1wiXG4gICAgICAgICAgd2lkdGg9XCIxMDAlXCJcbiAgICAgICAgICB2aWRlb0NvbnN0cmFpbnRzPXt2aWRlb0NvbnN0cmFpbnRzfVxuICAgICAgICAgIHJlZj17d2ViY2FtUmVmfVxuICAgICAgICAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTRcIj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImgtMTIgdy0xMiByb3VuZGVkLWZ1bGwgYmctcmVkLTcwMCBob3ZlcjpiZy1yZWQtNjAwIHRyYW5zaXRpb24tYWxsXCIgb25DbGljaz17Y2FwdHVyZX0+PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9