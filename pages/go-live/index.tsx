import {
  Layout, Button, Checkbox, message, Spin
} from 'antd';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { performerService } from '@services/index';
import Head from 'next/head';
import {
  IPerformer, ISettings
} from 'src/interfaces';
import Error from 'next/error';
import Router from 'next/router';
import './index.less';
import { getResponseError } from '@lib/utils';
import { ROLE_PERMISSIONS } from 'src/constants';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface IProps {
  error: any;
  currentUser: IPerformer;
  settings:ISettings
}

class GoLivePage extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  state = {
    loading: false,
    isAccept: false,
    hasRole: false
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const resp = await performerService.checkRole({ roles: [ROLE_PERMISSIONS.ROLE_HOST_LIVE] });
      this.setState({ hasRole: resp?.data, loading: false });
    } catch (error) {
      this.setState({ loading: false });
      const e = Promise.resolve(error);
      message.error(getResponseError(e));
    }
  }

  handleRedirect = () => {
    const { isAccept } = this.state;
    if (isAccept) {
      const { currentUser } = this.props;
      performerService.updateMe(currentUser._id, { privateChat: false });
      Router.push('/go-live');
    } else {
      message.error('Please accept all terms & conditions before go live');
    }
  }

  render() {
    const {
      error,
      settings
    } = this.props;
    const {
      isAccept,
      hasRole,
      loading
    } = this.state;

    if (error) {
      return <Error statusCode={error?.statusCode || 404} title={error?.message || 'Sorry, we can\'t find this page'} />;
    }

    return (
      <Layout className="model-live-waiting-room">
        <Head>
          <title>
            Going live
          </title>
        </Head>
        <div className="main-container">
          <div className="page-heading header-title">
            <span>
              Going live
            </span>
          </div>
          <a href="/help/model-links/mo-go-live">
            <QuestionCircleOutlined />
          </a>
          {!loading && (
          <>
            {!hasRole
              ? (
                <p className="notice">
                  Come back to this page when you have over
                  {' '}
                  {settings.totalFollowerForLive}
                  {' '}
                  followers
                </p>
              )
              : (
                <>
                  <Button
                    onClick={() => this.handleRedirect()}
                    className="btn-go-live"
                    disabled={!isAccept}
                    href="/model/live"
                  >
                    <strong>
                      Start
                      {' '}
                      <br />
                      Streaming
                    </strong>
                  </Button>
                  <div className="guidelines">
                    <a href="/help/about-caster/community-guidelines">Community Guidelines</a>
                    <span><Checkbox className="goliveCb" defaultChecked={isAccept} onChange={() => this.setState({ isAccept: !isAccept })}>Agree</Checkbox></span>
                  </div>
                </>
              )}
          </>
          )}
        </div>
        {loading && (
        <div className="text-center">
          <Spin />
        </div>
        )}
      </Layout>
    );
  }
}

const mapStates = (state: any) => ({
  ui: { ...state.ui },
  currentUser: { ...state.user.current },
  settings: { ...state.settings }

});

export default connect(mapStates)(GoLivePage);
