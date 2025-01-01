/* eslint-disable react/require-default-props */
import { INotification } from '@interfaces/notification';
import {
  Menu, Avatar, message, Row, Col, Button
} from 'antd';
import { useDispatch, useSelector, connect } from 'react-redux';
import { createSelector } from 'reselect';
import { deactiveConversation } from '@redux/message/actions';
import './NotificationHeaderMenu.less';
import { fetchNotificaion, setReadItem } from '@redux/notification/actions';
import { useContext, useEffect, useState } from 'react';
import Router from 'next/router';
import moment from 'moment';
import { SocketContext } from 'src/socket';
import { capitalizeFirstLetter } from '@lib/string';
import { notificationService } from '@services/notification.service';
// import ButtonFollowBack from '@components/common/buttonFollowBack';
// import { IPerformer } from '@interfaces/performer';
import { BellOutlined, MailOutlined } from '@ant-design/icons';
import ConversationList from '@components/messages/ConversationList';

const SEND_NOTIFICATION = 'send_notification';

interface IProps {

  // currentUser: IPerformer;
  totalNotReadMessage: number;
  notificationCount: number;
  toSource?: string;
  toId?: string;
  deactiveConversation: Function;
  onReceiveMessage?:Function;

}

const NotificationHeaderMenu = ({
  totalNotReadMessage, notificationCount, toId, toSource, deactiveConversation: handleDeactive, onReceiveMessage
}: IProps) => {
  const [read, setRead] = useState(false);
  const [tab, setTab] = useState('message');

  const socket = useContext(SocketContext);

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
    onReceiveMessage();
    message.success(data?.title || data?.message || 'You received a new notification');
  };

  useEffect(() => {
    fetchData();
  }, [read]);

  useEffect(() => {
    if (!toSource && !toId) {
      handleDeactive();
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on(SEND_NOTIFICATION, onReceiveNotification);
    }
    return () => {
      socket?.off(SEND_NOTIFICATION, onReceiveNotification);
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
    if (!notification.read) {
      // goi api PUT read
      notificationService.read(notification._id);
      dispatch(setReadItem(notification._id));
    }
    redirect(notification);
  };

  const handleChangeTab = (val: string) => {
    if (val === tab) {
      tab === 'notification' && Router.push('/notifications');
      tab === 'message' && Router.push('/messages');
    }
    setTab(val);
  };

  return (
    <Menu title="Notifications" className="notification-menu">
      <Menu.ItemGroup
        title={(
          <div className="title-notification">
            <div>
              <Button className="btn-dismiss-read-all" onClick={() => handleChangeTab('message')}>
                <MailOutlined style={{ marginRight: '5px' }} />
                Inbox
                {' '}
                {totalNotReadMessage}
              </Button>
            </div>
            <div>
              <Button className="btn-dismiss-read-all" onClick={() => handleChangeTab('notification')}>
                <BellOutlined style={{ marginRight: '5px' }} />
                Notifications
                {' '}
                {notificationCount}
              </Button>
            </div>
          </div>
        )}
      >
        {tab === 'message' ? <ConversationList toSource={toSource} toId={toId} />
          : (
            <>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <Menu.Item
                    style={{ padding: 0 }}
                    key={notification._id}
                    className={notification.read === false ? 'notification-unread' : 'notification-read'}
                  >
                    <Row gutter={24} className="notification-item" style={{ padding: '0 3px 0 3px' }} onClick={() => onClickItem(notification)}>
                      <Col md={3} style={{ padding: 0 }}>
                        <Avatar src={notification.thumbnail || '/no-image.jpg'} />
                      </Col>
                      <Col md={15} style={{ padding: 0 }}>
                        <div className="notification-item-list">
                          <div className="message">{capitalizeFirstLetter(notification.title)}</div>
                          <span className="time"><small>{moment(notification.updatedAt).fromNow()}</small></span>
                        </div>
                      </Col>
                      {/* <Col md={6} className="notification-follow-button">
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
                <Menu.Item key="no-notification">There are no notifications.</Menu.Item>
              )}

            </>
          )}
      </Menu.ItemGroup>
    </Menu>
  );
};

const mapStateToProps = (state:any) => ({
  fetchNotificationSuccess: state.notification.success
});

const mapDispatch = { deactiveConversation };

export default connect(mapStateToProps, mapDispatch)(NotificationHeaderMenu);
