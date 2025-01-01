import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import React, { CSSProperties, useEffect } from 'react';
import { fetchNotificaion, addNotificaion } from '@redux/notification/actions';
import { Skeleton } from 'antd';
import { createSelector } from 'reselect';
import NotificationList from './NotificationList';
import './Notification.less';

interface NotificationProps {
  style?: CSSProperties
}

const Notification = (notificationProps: NotificationProps) => {
  const { style } = notificationProps;
  const notificationIds = useSelector(
    createSelector(
      (state: any) => state.notification.success,
      (state: any) => state.notification.error,
      (state: any) => state.notification.notificationIds,
      (success, error, data) => {
        if (success && !error) return data;
        return [];
      }
    )
  );

  const canloadmore = useSelector(
    createSelector(
      (state: any) => state.notification.loading,
      (state: any) => state.notification.total,
      (state: any) => state.notification.notificationIds,
      (loading, total, data) => {
        if (loading || data.length >= total) return false;
        return true;
      }
    )
  );

  const dispatch = useDispatch();

  const loadMore = () => {
    dispatch(addNotificaion());
  };

  const fetchData = () => {
    dispatch(fetchNotificaion());
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <InfiniteScroll
      hasMore={canloadmore}
      next={loadMore}
      dataLength={notificationIds.length}
      loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
    >
      <NotificationList style={style} notificationIds={notificationIds} />
    </InfiniteScroll>
  );
};

Notification.displayName = 'Notification';
Notification.defaultProps = {
  style: {}
};

export default Notification;
