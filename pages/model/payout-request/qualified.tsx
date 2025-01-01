/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Layout, message
} from 'antd';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import {
  IPerformer
} from 'src/interfaces';
import Error from 'next/error';
import Router from 'next/router';
import 'pages/user/index.less';
import { CheckSquareTwoTone, CloseSquareTwoTone } from '@ant-design/icons';
import { ROLE_PERMISSIONS } from 'src/constants';

interface IProps {
  error: any;
  currentUser: IPerformer;
}

class NotQualified extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  handleRedirect = () => {
    const { currentUser } = this.props;
    if (currentUser.roles.includes(ROLE_PERMISSIONS.ROLE_HOST_PRIVATE) || currentUser?.analytics?.diamondsEarned > 0) {
      Router.push({ pathname: '/broadcaster-dashboard', query: { tab: 'verification' } });
    } else {
      message.error('Request Role Host Private or at least 1 diamond in their earnings history to verify document');
    }
  }

  render() {
    const {
      error,
      currentUser
    } = this.props;

    if (error) {
      return <Error statusCode={error?.statusCode || 404} title={error?.message || 'Sorry, we can\'t find this page'} />;
    }

    return (
      <Layout>
        <Head>
          <title>
            Not Qualified
          </title>
        </Head>
        <div className="main-container">
          <div className="page-heading header-title">
            <span>
              Minimum withdrawal requirements
            </span>
          </div>
          <div className="qualified-wrapper">
            <div>
              {currentUser?.balance > 10000 ? <CheckSquareTwoTone twoToneColor="limegreen" /> : <CloseSquareTwoTone twoToneColor="red" />}
              Minimum withdrawal amount $100.00
            </div>
            <div>
              {currentUser.verifiedAccount ? <CheckSquareTwoTone twoToneColor="limegreen" /> : <CloseSquareTwoTone twoToneColor="red" />}
              <a onClick={this.handleRedirect.bind(this)}>
                Verified account
              </a>
            </div>
          </div>
          {!(currentUser?.balance > 10000 && currentUser.verifiedAccount) && (
          <div className="text-qualified">
            Come back to this page when you have met the minimum withdrawal requirements.
          </div>
          )}
        </div>
      </Layout>
    );
  }
}

const mapStates = (state: any) => ({
  ui: { ...state.ui },
  currentUser: { ...state.user.current }
});

export default connect(mapStates)(NotQualified);
