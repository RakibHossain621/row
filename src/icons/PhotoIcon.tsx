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
    <g clipPath="url(#clip0_7506_38250)">
      <mask
        id="mask0_7506_38250"
        width="21"
        height="20"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "alpha" }}
      >
        <path fill="#D9D9D9" d="M.75 0h20v20h-20z"></path>
      </mask>
      <g mask="url(#mask0_7506_38250)">
        <path
          fill={props.color}
          d="M10.75 14.5q1.5 0 2.5-1.02 1-1.022 1-2.48 0-1.437-1-2.469-1-1.03-2.5-1.031t-2.5 1.031q-1 1.031-1 2.48 0 1.448 1 2.468t2.5 1.021m0-1.5q-.875 0-1.437-.586t-.563-1.435q0-.83.563-1.405Q9.875 9 10.75 9t1.438.574.562 1.405q0 .849-.562 1.435-.564.585-1.438.586m-6.5 4a1.44 1.44 0 0 1-1.052-.448A1.44 1.44 0 0 1 2.75 15.5v-9q0-.604.448-1.052A1.44 1.44 0 0 1 4.25 5h2.5l1.5-2h5l1.5 2h2.5q.62 0 1.06.448.44.449.44 1.052v9q0 .604-.44 1.052a1.43 1.43 0 0 1-1.06.448zm0-1.5h13v-9H14l-1.502-2H9l-1.5 2H4.25z"
        ></path>
      </g>
    </g>
    <defs>
      <clipPath id="clip0_7506_38250">
        <path fill="#fff" d="M.75 0h20v20h-20z"></path>
      </clipPath>
    </defs>
  </svg>
);

export default SvgIcon;
