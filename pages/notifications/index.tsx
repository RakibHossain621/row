import Head from 'next/head';
import Notification from '@components/notification/Notification';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { IPerformer } from '@interfaces/performer';
import { message } from 'antd';
import Router from 'next/router';
import NotificationsList from '@components/notifications/NotificationsList';

interface IProps {

  currentUser: IPerformer;

}

class NotificationPage extends PureComponent<IProps> {
  static authenticate: boolean = true;

  static noredirect: boolean = true;

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    const { currentUser } = this.props;
    if (!currentUser?._id) {
      message.error('You not have permission to access this page');
      Router.push('/home');
    }
  }

  render() {
    return (
      <>
        <Head>
          <title>Notifications</title>
        </Head>
        <NotificationsList />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.current
});

export default connect(mapStateToProps)(NotificationPage);
