import React, { useState, useEffect } from 'react';

interface Props {
}

const AppPhotoCard: React.FC<Props> = ({ }) => {

  return (
    <div style={{ backgroundImage: `url(${'/images/default-avatar.png'})` }} className='relative mx-auto bg-top bg-cover rounded-lg h-52 w-full max-w-[208px]'>
      <div className='absolute left-3 bottom-5'>
        <div className='flex items-center gap-1'>
          <h4 className='font-semibold text-white'>
            Business Time
          </h4>

          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
            <g clipPath="url(#clip0_3975_31167)">
              <mask id="mask0_3975_31167" maskUnits="userSpaceOnUse" x="0" y="0" width="13" height="13">
                <rect width="13" height="13" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_3975_31167)">
                <path d="M4.69886 12.0251L3.68324 10.3459L1.77386 9.9126L1.9499 7.9626L0.649902 6.5001L1.9499 5.0376L1.77386 3.0876L3.68324 2.65426L4.69886 0.975098L6.4999 1.74697L8.30094 0.975098L9.31657 2.65426L11.2259 3.0876L11.0499 5.0376L12.3499 6.5001L11.0499 7.9626L11.2259 9.9126L9.31657 10.3459L8.30094 12.0251L6.4999 11.2532L4.69886 12.0251ZM5.80928 8.4501L9.03219 5.24072L8.34157 4.5501L5.80928 7.06885L4.65824 5.93135L3.96761 6.62197L5.80928 8.4501Z" fill="white" />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_3975_31167">
                <rect width="13" height="13" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      <span className='absolute left-3 bottom-2 text-[10px] text-white'>
        1500 views
      </span>
    </div>
  );
};


export default AppPhotoCard;
