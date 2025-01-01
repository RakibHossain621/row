import React, { PureComponent } from 'react';
import {
  Table, Checkbox, Button, message, Layout, PageHeader
} from 'antd';
import { connect } from 'react-redux';
import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';

import Head from 'next/head';
import type { ColumnsType } from 'antd/es/table';
import {
  IPerformer, IUIConfig
} from 'src/interfaces';
import './index.less';
import { performerService } from '@services/performer.service';
import { ROLE_PERMISSIONS } from 'src/constants';
import Router from 'next/router';

interface IProps {
  ui: IUIConfig;
  user: IPerformer;
}
interface DataType {
  key: React.Key;
  name: string;
  status: boolean;
  email : boolean;
}
class NotificationSetting extends PureComponent<IProps> {
  state = {
    list: {} as any
  };

  componentDidMount() {
    const { user } = this.props;
    this.setState({ list: user.notificationSetting });
  }

  handleActiveStatus = async (isCheck, record) => {
    const { list } = this.state;
    this.setState({ list: { ...list, [record.key]: { status: !record.status, email: record.email } } });
  };

  handleEmailStatus = async (isCheck, record) => {
    const { list } = this.state;
    this.setState({ list: { ...list, [record.key]: { status: record.status, email: !record.email } } });
  };

  handleSubmit = async () => {
    const { user } = this.props;
    const { list } = this.state;
    try {
      await performerService.updateNotificationSetting(user._id, { ...list, performerId: user._id });
      message.success('Updated notification setting successfully');
    } catch (error) {
      message.error('Error occured, please try again later');
    }
  }

  handleReceiveDesktop = async () => {
    const { list } = this.state;
    this.setState({ list: { ...list, receiveOnDesktop: !list?.receiveOnDesktop } });
  };

  render() {
    const { list } = this.state;
    const { ui, user } = this.props;
    const locale = {
      emptyText: ''
    };
    const generalColumns: ColumnsType<DataType> = [
      {
        title: 'Immediate notification',
        dataIndex: 'name',
        render: (text: string) => text
        && (
        <>
          <b>{text.split('@')[0]}</b>
          <p>{text.split('@')[1]}</p>
        </>
        )
      },
      {
        title: 'Web & App',
        dataIndex: 'status',
        width: '25%',
        render: (isCheck:boolean, record) => record && (record?.key === 'casterAdminMessage' ? <CheckOutlined style={{ fontSize: '20px' }} /> : <Checkbox checked={!!record?.status} onChange={() => this.handleActiveStatus(isCheck, record)} />)
      },
      {
        title: 'Email',
        dataIndex: 'email',
        width: '25%',
        render: (isCheck : boolean, record) => (record?.email !== null ? <Checkbox checked={!!record?.email} onChange={() => this.handleEmailStatus(isCheck, record)} /> : null)
      }
    ];
    const sponsorshipData = user?.roles?.indexOf(ROLE_PERMISSIONS.ROLE_HOST_LIVE) !== -1 ? {
      key: 'crossPromotion',
      name: 'Cross Promotion Recieved@When temporary exclusive ad rights on my content are sold.',
      status: list?.crossPromotion?.status,
      email: list?.crossPromotion?.email
    } : null;
    const privateChatData = user?.roles?.indexOf(ROLE_PERMISSIONS.ROLE_HOST_PRIVATE) !== -1 ? {
      key: 'privateChatRequest',
      name: 'Private Chat Request@Notify me when I get a request for private chat.',
      status: list?.privateChatRequest?.status,
      email: list?.privateChatRequest?.email
    } : null;
    const generalData: DataType[] = [
      {
        key: 'followingGoLive',
        name: 'Following Goes Live@When anyone I am following goes live.',
        status: list?.followingGoLive?.status,
        email: list?.followingGoLive?.email
      },
      {
        key: 'followingPrivateChat',
        name: 'Available for Private Chat@When anyone I follow is available for private chat.',
        status: list?.followingPrivateChat?.status,
        email: list?.followingPrivateChat?.email
      },
      {
        key: 'directTip',
        name: 'Direct Tip@When I receive a Direct Tip.',
        status: list?.directTip?.status,
        email: list?.directTip?.email
      },
      {
        key: 'mileStone',
        name: 'Milestone Unlocked@When I achieve a promoted milestone.',
        status: list?.mileStone?.status,
        email: list?.mileStone?.email
      },
      privateChatData,
      sponsorshipData,
      {
        key: 'feeMessage',
        name: 'Fee Paid DM message@When I receive a fee paid DM message.',
        status: list?.feeMessage?.status,
        email: list?.feeMessage?.email
      },
      {
        key: 'directMailMessage',
        name: 'Direct Mail Message@When I receive a DM message.',
        status: list?.directMailMessage?.status,
        email: list?.directMailMessage?.email
      },
      {
        key: 'newContent',
        name: 'New Content@When anyone I follow posts new content.',
        status: list?.newContent?.status,
        email: list?.newContent?.email
      },
      {
        key: 'comment',
        name: 'Commenters@When anyone comments on my own post.',
        status: list?.comment?.status,
        email: null
      },
      {
        key: 'follower',
        name: 'New Fans@When I get a new Fan.',
        status: list?.follower?.status,
        email: list?.follower?.email
      },
      {
        key: 'casterAdminMessage',
        name: 'Caster Admin@Admin Direct Message.',
        status: true,
        email: list?.casterAdminMessage?.email
      }
    ];
    return (
      <Layout>

        <Head>
          <title>
            {ui && ui.siteName}
            {' '}
            | Notification Settings
          </title>
        </Head>
        <PageHeader
          onBack={() => Router.back()}
          backIcon={<ArrowLeftOutlined />}
          title="Notification Settings"
        />
        <div className="main-container">
          <div className="receive-checkbox">
            <Checkbox checked={list?.receiveOnDesktop} defaultChecked onChange={this.handleReceiveDesktop}>
              Receive desktop notifications when you are online.
            </Checkbox>
          </div>
          <div className="table-responsive">
            <Table
              dataSource={generalData}
              locale={locale}
              columns={generalColumns}
              rowClassName={(record, index) => { if (record) return (index % 2 ? 'gray' : 'while'); return 'hidden'; }}
              rowKey="_id"
              pagination={false}
            />
          </div>
          <div className="btn-saveChange">
            <Button onClick={this.handleSubmit} className="primary"> Save Changes</Button>
          </div>
        </div>
      </Layout>
    );
  }
}
const mapStates = (state: any) => ({
  ui: { ...state.ui },
  user: { ...state.user.current }
});
const mapDispatch = {
};
export default connect(mapStates, mapDispatch)(NotificationSetting);
