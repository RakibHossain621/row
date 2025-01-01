import { useEffect } from 'react';

const useDisableScroll = (isOpen) => {
  useEffect(() => {
    if (isOpen) {
      // Disable scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scroll
      document.body.style.overflow = '';
    }

    // Cleanup function to re-enable scroll when the component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
};

export default useDisableScroll;
