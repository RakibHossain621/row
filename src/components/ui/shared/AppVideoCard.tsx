import React, { useState, useEffect } from 'react';

interface Props {
}

const AppVideoCard: React.FC<Props> = ({ }) => {

  return (
    <div style={{ backgroundImage: `url(${'/images/default-avatar.png'})` }} className='relative h-96 w-full max-w-[260px] rounded-lg bg-cover bg-center mx-auto'>
      <div>
        <span className='absolute text-[10px] text-white top-3 right-3'>
          00:00
        </span>
      </div>

      <button className='absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2'>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
          <mask id="mask0_3975_31159" maskUnits="userSpaceOnUse" x="0" y="0" width="50" height="50">
            <rect width="50" height="50" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_3975_31159)">
            <path d="M20.3127 33.4135L33.4135 25.0001L20.3127 16.5867V33.4135ZM25.0036 44.7917C22.2662 44.7917 19.6933 44.2723 17.2846 43.2334C14.876 42.1945 12.7808 40.7846 10.9991 39.0037C9.21739 37.2228 7.80685 35.1285 6.76751 32.7209C5.72817 30.3134 5.2085 27.741 5.2085 25.0036C5.2085 22.2662 5.72794 19.6933 6.76683 17.2846C7.80572 14.876 9.21561 12.7808 10.9965 10.9991C12.7775 9.21739 14.8717 7.80685 17.2793 6.76751C19.6868 5.72817 22.2593 5.2085 24.9966 5.2085C27.734 5.2085 30.307 5.72794 32.7156 6.76683C35.1242 7.80572 37.2194 9.21561 39.0011 10.9965C40.7828 12.7775 42.1934 14.8717 43.2327 17.2793C44.2721 19.6868 44.7917 22.2593 44.7917 24.9966C44.7917 27.734 44.2723 30.307 43.2334 32.7156C42.1945 35.1242 40.7846 37.2194 39.0037 39.0011C37.2228 40.7828 35.1285 42.1934 32.7209 43.2327C30.3134 44.2721 27.741 44.7917 25.0036 44.7917ZM25.0001 41.6668C29.6529 41.6668 33.5939 40.0522 36.823 36.823C40.0522 33.5939 41.6668 29.6529 41.6668 25.0001C41.6668 20.3473 40.0522 16.4064 36.823 13.1772C33.5939 9.94803 29.6529 8.33345 25.0001 8.33345C20.3473 8.33345 16.4064 9.94803 13.1772 13.1772C9.94803 16.4064 8.33344 20.3473 8.33344 25.0001C8.33344 29.6529 9.94803 33.5939 13.1772 36.823C16.4064 40.0522 20.3473 41.6668 25.0001 41.6668Z" fill="white" />
          </g>
        </svg>
      </button>

      <div className='absolute left-3 bottom-8'>
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

      <span className='absolute left-3 bottom-4 text-[10px] text-white'>
        1500 views
      </span>
    </div>
  );
};


export default AppVideoCard;
