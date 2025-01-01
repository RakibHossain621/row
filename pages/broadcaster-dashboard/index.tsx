import React from 'react';
import { Layout, Tabs } from 'antd';
import Router from 'next/router';
import Head from 'next/head';
import Error from 'next/error';
import { connect } from 'react-redux';
import { updatePerformer } from 'src/redux/user/actions';
import { IPerformer } from 'src/interfaces';
import '../user/index.less';
import { PerformerSettingsForm, PerformerVerificationForm } from '@components/performer';
import DashBoard from '@components/dashboard';
import { ROLE_PERMISSIONS } from 'src/constants';
import { NextPageContext } from 'next';
import { BroadcasterTopHeader } from '@components/broadcaster-dashboard/broadcaster-top-header';

interface IProps {
  error: any;
  ui: any;
  currentUser: IPerformer;
  updating: boolean;
  updatePerformer: Function;
  query: { [key: string]: any };
}

class BroadCaster extends React.PureComponent<IProps> {
  static authenticate = true;
  static noredirect = true;

  state = {
    currentTab: 'dashboard'
  };

  static async getInitialProps({ ctx }: { ctx: NextPageContext }) {
    const { query } = ctx;
    return { query };
  }

  componentDidMount() {
    const { query } = this.props;
    if (query?.tab) {
      this.setState({ currentTab: query.tab });
    }
    window.addEventListener('beforeunload', this.onbeforeunload);
    Router.events.on('routeChangeStart', this.onbeforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
    Router.events.off('routeChangeStart', this.onbeforeunload);
  }

  onbeforeunload = () => {
    this.handleTabChange('verification');
  };

  handleTabChange = (tab: string) => {
    this.setState({ currentTab: tab });
  };

  capitalizeFirstLetter = (string: string) => string?.charAt(0).toUpperCase() + string?.slice(1);

  submit = (data: any) => {
    const { currentUser, updatePerformer: handleUpdatePerformer } = this.props;
    if (data.privateChatPrice || data.messagePrice) {
      data.privateChatPrice = Number(data.privateChatPrice)
      data.messagePrice = Number(data.messagePrice)
    }
    handleUpdatePerformer({
      ...currentUser,
      ...data,
      isUpdateProfile: true
    });
  };

  render() {
    const { error, ui, currentUser, updating } = this.props;
    const { currentTab } = this.state;

    if (error) {
      return <Error statusCode={error?.statusCode || 404} title={error?.message || "Sorry, we can't find this page"} />;
    }

    return (
      <>
        <Head>
          <title>
            BroadCaster | {ui && this.capitalizeFirstLetter(ui.siteName)}
          </title>
        </Head>
        <section className='px-4'>
          <BroadcasterTopHeader activeTab={currentTab} updateTab={this.handleTabChange} />
          {currentTab === 'dashboard' && 
            <DashBoard />
          }
          {currentTab === 'settings' && 
            <PerformerSettingsForm onFinish={this.submit} updating={updating} user={currentUser} />
          }
          {currentTab === 'verification' && 
            <PerformerVerificationForm onFinish={this.submit} user={currentUser} />
          }
          {/* <Tabs activeKey={currentTab} onChange={this.handleTabChange}>
            <Tabs.TabPane tab="Dashboard" key="dashboard">
            </Tabs.TabPane>
            <Tabs.TabPane tab="Settings" key="settings">
              <PerformerSettingsForm onFinish={this.submit} updating={updating} user={currentUser} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Verification" key="verification">
              <PerformerVerificationForm onFinish={this.submit} user={currentUser} />
            </Tabs.TabPane>
          </Tabs> */}
        </section>
      </>
    );
  }
}

const mapStates = (state: any) => ({
  ui: { ...state.ui },
  currentUser: { ...state.user.current },
  settings: { ...state.settings },
  updating: state.user.updating
});

const mapDispatch = { updatePerformer };

export default connect(mapStates, mapDispatch)(BroadCaster);