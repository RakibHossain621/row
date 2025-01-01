import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IFeed } from '@interfaces/index';
import FeedVideo from '@components/performer/feed-video';
import HomePageHeader from '@layouts/home-page-header';

interface IProps {
  items: IFeed[];
  canLoadmore: boolean;
  loadMore(): Function;
  loading: boolean;
  currentPage: string;
  onHandleTabChange : Function;
  tabs: any;
  keys: any
}

function getWindowDimensions() {
  if (typeof window !== 'undefined') {
    const { body } = document;
    return body.offsetHeight;
  }
  return 0;
}

const ScrollListCustom = (props: IProps) => {
  const [bodyHeight, setWindowDimensions] = useState(getWindowDimensions());

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

  const {
    items = [], loadMore, canLoadmore, loading, currentPage, onHandleTabChange, keys, tabs
  } = props;
  return (
    <div id="scrollableDiv" style={{ height: bodyHeight - 20 }}>
      <HomePageHeader
        tabs={[
          { key: keys[0], tab: tabs[0] },
          { key: keys[1], tab: tabs[1] }
        ]}
        handleTabChange={(val) => onHandleTabChange(val)}
      />

      <InfiniteScroll
        dataLength={items.length}
        hasMore={canLoadmore}
        loader={null}
        next={loadMore}
        endMessage={null}
        scrollThreshold={0.5}
        scrollableTarget="scrollableDiv"
      >
        <div className={loading ? 'grid-view' : 'fixed-scroll'}>
          {items?.length > 0
            && items.map((item, index) => (
              <FeedVideo feed={item} currentPage={currentPage} key={`${item._id + index}`} />
            ))}
        </div>
        {loading && (
          <div className="text-center">
            <Spin />
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default ScrollListCustom;
