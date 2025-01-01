import * as React from "react";

const SvgIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="20"
    fill="none"
    viewBox="0 0 21 20"
    {...props}
  >
    <g clipPath="url(#clip0_7506_38245)">
      <mask
        id="mask0_7506_38245"
        width="21"
        height="20"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "alpha" }}
      >
        <path fill="#D9D9D9" d="M.75 0h20v20h-20z"></path>
      </mask>
      <g mask="url(#mask0_7506_38245)">
        <path
          fill={props.color}
          d="M6.75 13h6v-.437q0-.814-.825-1.314T9.75 10.75q-1.333 0-2.167.5-.833.498-.833 1.313zm3.01-3q.614 0 1.052-.448t.438-1.062-.438-1.052A1.43 1.43 0 0 0 9.76 7q-.614 0-1.062.438A1.42 1.42 0 0 0 8.25 8.49q0 .614.448 1.062T9.76 10m-4.51 6a1.44 1.44 0 0 1-1.052-.448A1.44 1.44 0 0 1 3.75 14.5v-9q0-.618.448-1.06Q4.647 4 5.25 4h9q.619 0 1.06.44.44.442.44 1.06V9l3-3v8l-3-3v3.5q0 .605-.44 1.052a1.43 1.43 0 0 1-1.06.448zm0-1.5h9v-9h-9z"
        ></path>
      </g>
    </g>
    <defs>
      <clipPath id="clip0_7506_38245">
        <path fill="#fff" d="M.75 0h20v20h-20z"></path>
      </clipPath>
    </defs>
  </svg>
);

export default SvgIcon;
