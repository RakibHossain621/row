import { INotification } from '@interfaces/notification';
import List, { ListProps } from 'antd/lib/list';
import { CSSProperties, useEffect } from 'react';
import { Button } from 'antd';
import './NotificationHeaderMenu.less';
import { notificationService } from '@services/notification.service';
import { useDispatch } from 'react-redux';
import { fetchNotificaion } from '@redux/notification/actions';
import { SettingOutlined } from '@ant-design/icons';
import NotificationListItem from './NotificationListItem';

interface NotificationListProps extends ListProps<INotification> {
  notificationIds: string[];
  style: CSSProperties;
}

const NotificationList = ({
  style,
  /* notificationIds, */ ...props
}: NotificationListProps) => {
  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(fetchNotificaion());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const readAll = async () => {
    await notificationService.readAll();
    fetchData();
  };

  return (
    <>
      <Button
        type="primary"
        icon={<SettingOutlined />}
        className="btn-settings"
        href="/notification-setting"

      />
      <Button className="btn-dismiss-all" onClick={readAll}>
        Mark as read
      </Button>
      <List {...props} style={style} header="All Notifications">
        {/* {notificationIds.length > 0 ? notificationIds.map((id) => <NotificationListItem key={id} id={id} />) : <p>There is no notification.</p>} */}
        <NotificationListItem />
      </List>
    </>
  );
};

export default NotificationList;
