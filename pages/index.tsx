/* eslint-disable indent */
/* eslint-disable camelcase */
import {
  Form, Input, Button, Row, Col, Divider, Layout, message
} from 'antd';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { login, loginSuccess, loginSocial } from '@redux/auth/actions';
import { updateCurrentUser } from '@redux/user/actions';
import { authService, userService } from '@services/index';
import Link from 'next/link';
import { ISettings, IUIConfig } from 'src/interfaces';
import Router from 'next/router';
import GoogleLoginButton from '@components/auth/google-login-button';
import Loader from '@components/common/base/loader';
import './auth/index.less';
import { cookieService } from '@services/cookies.service';

interface IProps {
  loginAuth: any;
  login: Function;

  loginSocial: Function;
  ui: IUIConfig;
  settings: ISettings;
  query: { [key: string]: any };

}

class Login extends PureComponent<IProps> {
  static authenticate = false;

  static layout = 'blank';

  recaptchaSuccess = false;

  static async getInitialProps({ ctx }) {
    const { query } = ctx;
    return {

      query
    };
  }

  state = {
    loginAs: 'user',
    isLoading: false
  };

  async componentDidMount() {
    this.redirectLogin()
  }

  async handleLogin(values: any) {
    
  }

  async handleVerifyCapcha(resp: any) {
    if (resp?.data?.success) {
      this.recaptchaSuccess = true;
    } else {
      this.recaptchaSuccess = false;
    }
  }

  async onGoogleLogin(resp: any) {
    
  }

  async redirectLogin() {
    Router.push('/trending');
  }

  render() {
    const { ui, settings, loginAuth } = this.props;
    const { isLoading } = this.state;

    return (
      <>
        <Head>
          <title>
            Login
            {' '}
            |
            {' '}
            Caster
          </title>
          <meta name="keywords" content={settings && settings.metaKeywords} />
          <meta name="description" content={settings && settings.metaDescription} />
          {/* OG tags */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={ui && ui.siteName} />
          <meta property="og:image" content={ui && ui.logo} />
          <meta property="og:description" content={settings && settings.metaDescription} />
          {/* Twitter tags */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={ui && ui.siteName} />
          <meta name="twitter:image" content={ui && ui.logo} />
          <meta name="twitter:description" content={settings && settings.metaDescription} />
        </Head>
        <div className="main-container">
        </div>
        {isLoading && <Loader />}
      </>
    );
  }
}

const mapStatesToProps = (state: any) => ({
  ui: { ...state.ui },
  settings: { ...state.settings },
});

const mapDispatchToProps = {

};
export default connect(mapStatesToProps, mapDispatchToProps)(Login);
