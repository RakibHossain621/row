import {
  Avatar, Menu, Row, Col, message
} from 'antd';
import { INotification } from 'src/interfaces';
import { useSelector, useDispatch, connect } from 'react-redux';
import React, { useContext, useEffect, useState } from 'react';
import { createSelector } from 'reselect';
import { capitalizeFirstLetter } from '@lib/string';
import moment from 'moment';
import './NotificationHeaderMenu.less';
import { notificationService } from '@services/notification.service';
import { fetchNotificaion, setReadItem } from '@redux/notification/actions';
import Router from 'next/router';
import { SocketContext } from 'src/socket';
// import ButtonFollowBack from '@components/common/buttonFollowBack';

// interface NotificationListItemProps extends ListItemProps {
//   id: string;
// }

// const NotificationListItem = React.memo(
//   ({ id, ...props }: NotificationListItemProps) => {
//     const notification: INotification = useSelector(
//       createSelector(
//         [(state: any) => state.notification.notificationMapping[id]],
//         (data) => ({ ...data })
//       ),
//       shallowEqual
//     );

//     const dispatch = useDispatch();

//     const fetchData = () => {
//       dispatch(fetchNotificaion());
//     };

//     const onClickItem = () => {
//       if (!notification.read) {
//         // goi api PUT read
//         notificationService.read(notification._id);
//         dispatch(setReadItem(notification._id));
//       }
//       fetchData();
//     };

//     return (
//       <>

//         <List.Item key={notification._id} {...props} className={notification.read === false ? 'notification-unread' : 'list-item-meta'}>
//           <List.Item.Meta
//             avatar={<Avatar src={notification.thumbnail || '/no-image.jpg'} />}
//             title={<a href="https://ant.design">{capitalizeFirstLetter(notification.title)}</a>}
//             description={moment(notification.updatedAt).fromNow()}
//           />
//           {notification.read === false ? (
//             <>
//               <span>{ }</span>
//               <Button type="link" onClick={onClickItem}>
//                 <ExclamationCircleOutlined title="dismiss" className="icon-dismiss" />
//               </Button>
//             </>
//           ) : (
//             <p>
//               {' '}
//             </p>
//           )}
//         </List.Item>
//       </>
//     );
//   }
// );

// interface IProps {

//   currentUser: IPerformer;

// }

const SEND_NOTIFICATION = 'send_notification';

const NotificationListItem = () => {
  const socket = useContext(SocketContext);
  const [read, setRead] = useState(false);

  const notifications = useSelector(
    createSelector(
      (state: any) => state.notification.success,
      (state: any) => state.notification.error,
      (state: any) => state.notification.dataSource,
      (success, error, data) => {
        if (success && !error) return data;
        return [];
      }
    )
  ) as INotification[];

  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(fetchNotificaion());
  };

  const onReceiveNotification = (data) => {
    fetchData();
    message.success(data?.title || data?.message || 'You received a new notification');
  };

  useEffect(() => {
    fetchData();
  }, [read]);

  useEffect(() => {
    if (socket) {
      socket.on(SEND_NOTIFICATION, onReceiveNotification);
    }
    return () => {
      socket.off(SEND_NOTIFICATION, onReceiveNotification);
    };
  }, [socket]);

  const redirect = (notification) => {
    switch (notification.type) {
      case 'live':
        return Router.push({
          pathname: '/stream',
          query: {
            username: notification.createdBy

          }
        }, `/stream/${notification.createdBy
        }`);
      case 'privatechatRequest':
        return Router.push('/model/private-waiting-room');
      case 'follow':
        return Router.push({
          pathname: `/${notification.createdBy}`
        });
      case 'subscription':
        return Router.push('/wallet');
      case 'comment':
        return Router.push(`/post/${notification.refId}`);
      case 'feed':
        return Router.push(`/post/${notification.refId}`);
      case 'adminDirectMessage':
        return Router.push('/messages');
      case 'crossPromotion':
        return Router.push({
          pathname: '/wallet',
          query: {
            tab: 'diamond-history'
          }
        });
      case 'directTip':
        return Router.push('/wallet');
      case 'mileStone':
        return Router.push('/broadcaster-dashboard');
      case 'available-private-chat':
        return Router.push({
          pathname: '/user/private-waiting-room',
          query: {
            username: notification.createdBy
          }
        });
      case 'directMessage':
        return Router.push('/messages');
      default: return null;
    }
  };

  const onClickItem = (notification) => {
    setRead(true);
    if (!notification?.read) {
      // goi api PUT read
      notificationService.read(notification._id);
      dispatch(setReadItem(notification._id));
    }
    redirect(notification);
  };

  return (
    <>
      <Menu title="Notifications" className="notification-page">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Menu.Item
              onClick={() => onClickItem(notification)}
              style={{ padding: 0 }}
              key={notification._id}
              className={notification?.read === false ? 'notification-unread' : 'notification-read'}
            >
              <Row gutter={24} className="notification-item">
                <Col md={3}>
                  <Avatar src={notification.thumbnail || '/no-image.jpg'} />
                </Col>
                <Col md={17}>
                  <div className="notification-item-list">
                    <div className="message">{capitalizeFirstLetter(notification.title)}</div>
                    <span className="time"><small>{moment(notification.updatedAt).fromNow()}</small></span>
                  </div>

                </Col>
                {/* <Col md={4} className="notification-follow-button">
                  <ButtonFollowBack
                    performer={null}
                    isHideOnClick
                    targetId={notification.createdBy}
                    sourceId={currentUser?._id}
                    isFollow={notification.isFollowed}
                    getPerformerList={() => {}}
                  />

                </Col> */}
                <span className={notification.read === false ? 'notification-docw' : ''}>{ }</span>
              </Row>

            </Menu.Item>
          ))
        ) : (
          <Menu.Item>There are no notifications.</Menu.Item>
        )}
      </Menu>
    </>
  );
};

NotificationListItem.displayName = 'NotificationListItem';

const mapStateToProps = () => ({
  // currentUser: state.user.current
});

export default connect(mapStateToProps)(NotificationListItem);
