/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import { PureComponent } from 'react';
import { Alert, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IFeed, IPerformer } from '@interfaces/index';
import { connect } from 'react-redux';
import { FeedGridCard } from './grid-card';
import { AddFeedCard } from './add-feed-card';

interface IProps {
  items: IFeed[];
  tab: string;
  canLoadmore: boolean;
  loadMore(): any;
  currentUser: IPerformer;
  performer: IPerformer;
  loading?: boolean;
  isGrid?: boolean;
  notFoundText?: string;
  isBookmarkPage?:boolean;
}
class ScrollListFeed extends PureComponent<IProps> {
  render() {
    const {
      items = [],
      loadMore,
      canLoadmore,
      loading = false,
      isGrid = false,
      isBookmarkPage = false,
      currentUser,
      performer,
      tab
    } = this.props;

    return (
      <InfiniteScroll
        dataLength={items.length}
        hasMore={canLoadmore}
        loader={null}
        next={loadMore}
        endMessage={null}
        scrollThreshold={0.8}
        scrollableTarget="scrollableContent"
      >
        <div className={isGrid ? 'grid grid-cols-2 md:grid-cols-5 gap-4 py-3' : 'fixed-scroll'}>
          {performer && isGrid && (currentUser._id === performer._id) && ''}
          {items.length > 0 && (
            items.map((item) => <FeedGridCard feed={item} key={item._id} />)
          )}
        </div>
        {!items.length && !loading && (
          <div className="main-container custom">
            <Alert
              className="text-center"
              message={isBookmarkPage ? `There are no bookmarked ${tab}` : 'No post was found'}
              type="info"
            />
          </div>
        )}
        {loading && (
          <div className="text-center">
            <Spin />
          </div>
        )}
      </InfiniteScroll>
    );
  }
}
const mapStates = (state: any) => ({
  currentUser: { ...state.user.current }
});
export default connect(mapStates)(ScrollListFeed);
