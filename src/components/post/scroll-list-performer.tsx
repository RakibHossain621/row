/* eslint-disable react/require-default-props */
import { useDebugValue, useEffect, useState } from 'react';
import { Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IFeed } from '@interfaces/index';
import FeedVideo from '@components/performer/feed-video';
import './index.less';

interface IProps {
  items: IFeed[];
  canLoadmore: boolean;
  loadMore(): Function;
  loading: boolean;
  currentPage: string;
  scrollHeight?: number;
}

function getWindowDimensions() {
  if (typeof window !== 'undefined') {
    const { body } = document;
    return body.offsetHeight;
  }
  return 0;
}

const ScrollListPerformer = ({
  items = [], canLoadmore, loadMore, loading, currentPage, scrollHeight
}: IProps) => {
  const [bodyHeight, setWindowDimensions] = useState(getWindowDimensions());
  const [headerHeight, setHeaderHeight] = useState(0);
  const [tabHeight, setTabHeight] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
    return null;
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHeaderHeight(document.getElementById('main-header')?.clientHeight);
      document.getElementById('tab-header')?.clientHeight
        ? setTabHeight(document.getElementById('tab-header')?.clientHeight)
        : setTabHeight(document.getElementById('ant-tabs-nav')?.clientHeight);
    }
  }, [scrollHeight]);

  useEffect(() => {
    if (canLoadmore) loadMore() 
  }, [canLoadmore])

  return (
    <>
      {items?.length > 0
        && items.map(
          (item, index) => item?._id && 
            <FeedVideo 
              feed={item} 
              currentPage={currentPage} 
              key={`${item?._id + index}`} 
            />
        )}
      {loading && (
        <div className="text-center">
          <Spin />
        </div>
      )}
    </>
  );
};

export default ScrollListPerformer;
