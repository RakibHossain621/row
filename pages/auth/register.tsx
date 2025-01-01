/* eslint-disable prefer-promise-reject-errors */
import {
  Row, Col, Button, Layout, Form, Input, message,
  Divider,
  Radio,
  RadioChangeEvent,
  Checkbox
} from 'antd';
import { PureComponent } from 'react';
import Link from 'next/link';
import {
  registerFan, loginSocial, registerFanSuccess, verifiedFanSuccess
} from '@redux/auth/actions';
import { connect } from 'react-redux';
import Head from 'next/head';
import { ISettings, IUIConfig } from 'src/interfaces';
import { authService } from '@services/auth.service';
import { cookieService } from '@services/cookies.service';
import GoogleLoginButton from '@components/auth/google-login-button';
import './index.less';
import { delay } from '@lib/utils';
import Router from 'next/router';

interface IProps {
  ui: IUIConfig;
  settings: ISettings;
  registerFan: Function;
  registerFanData: any;
  loginSocial: Function;
}

class FanRegister extends PureComponent<IProps> {
  static authenticate = false;

  static layout = 'blank';

  recaptchaSuccess = false;

  state = {
    isLoading: false,
    introducerId: '',
    value: 'male',
    confirm: false
  }

  componentDidMount(): void {
    this.getIntroducer();
  }

  async componentDidUpdate(prevProps) {
    const { registerFanData } = this.props;
    if (prevProps?.registerFanData?.success !== registerFanData?.success && registerFanData?.success) {
      Router.push('/help/about-caster/confirmemail');
      await delay(2000);
    }
  }

  handleRegister = (data: any) => {
    const { registerFan: handleRegister } = this.props;
    const { introducerId } = this.state;

    handleRegister({ ...data, introducerId });
  };

  handleVerifyCapcha(resp: any) {
    if (resp?.data?.success) {
      this.recaptchaSuccess = true;
    } else {
      this.recaptchaSuccess = false;
    }
  }

  onChange = (e: RadioChangeEvent) => {
    this.setState({ value: e.target.value });
  };

  async onGoogleLogin(resp: any) {
    if (!resp?.tokenId) {
      return;
    }
    const { loginSocial: handleLogin } = this.props;
    const payload = { tokenId: resp.tokenId, role: 'user' };
    try {
      await this.setState({ isLoading: true });
      const response = await (await authService.loginGoogle(payload)).data;
      response.token && handleLogin({ token: response.token });
    } catch (e) {
      const error = await e;
      message.error(error && error.message ? error.message : 'Google login authenticated fail');
    } finally {
      this.setState({ isLoading: false });
    }
  }

  getIntroducer = async () => {
    const data = (await cookieService.getCookie('introducerId')) || null;
    this.setState({ introducerId: data || null });
  };

  render() {
    const {
      ui, registerFanData, settings
    } = this.props;
    const { requesting: submiting } = registerFanData;
    const { isLoading, value, confirm } = this.state;
    return (
      <Layout>
        <Head>
          <title>
            Create Account
            {' '}
            |
            {' '}
            Caster
          </title>
        </Head>
        <div className="main-container">
          <div className="login-box">
            <Row style={{ justifyContent: 'center' }}>
              <Col
                xs={24}
                sm={24}
                md={18}
                lg={12}
                className="login-content center"
              >
                <div className="login-content right">
                  <div className="title">Create Account</div>
                  <div className="login-logo">
                    <a href="/">{ui.logo ? <img alt="logo" src={ui.logo} height="80px" /> : ui.siteName}</a>
                  </div>
                  <div className="social-login">
                    <GoogleLoginButton
                      clientId={settings.googleClientId}
                      onSuccess={this.onGoogleLogin.bind(this)}
                      onFailure={this.onGoogleLogin.bind(this)}
                    />
                    {/* <button type="button" disabled={!settings.twitterClientId} onClick={() => this.loginTwitter()} className="twitter-button">
                      <TwitterOutlined />
                      {' '}
                      CREATE ACCOUNT WITH TWITTER
                    </button> */}
                  </div>
                  <Divider>Or</Divider>
                  <div className="login-form">
                    <Form
                      labelCol={{ span: 24 }}
                      name="member_register"
                      initialValues={{ remember: true, gender: 'male' }}
                      onFinish={this.handleRegister.bind(this)}
                      scrollToFirstError
                    >
                      <Form.Item
                        name="email"
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            type: 'email',
                            message: 'Invalid email address!'
                          },
                          {
                            required: true,
                            message: 'Please input your email address!'
                          }
                        ]}
                      >
                        <Input placeholder="Email address" />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            pattern: new RegExp(/^(?=.{8,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[^\w\d]).*$/g),
                            message: 'Password must have minimum 8 characters, at least 1 number, 1 uppercase letter, 1 lowercase letter & 1 special character'
                          },
                          { required: true, message: 'Please enter your password!' }
                        ]}
                      >
                        <Input.Password placeholder="Password" />
                      </Form.Item>
                      <Form.Item
                        name="gender"
                        validateTrigger={['onChange', 'onBlur']}
                        className="gender-field"
                      >
                        <Radio.Group onChange={this.onChange} value={value}>
                          <Radio value="male">Male</Radio>
                          <Radio value="female">Female</Radio>
                        </Radio.Group>
                      </Form.Item>
                      {/* <GoogleReCaptcha ui={ui} handleVerify={this.handleVerifyCapcha.bind(this)} /> */}
                      <Form.Item style={{ textAlign: 'center' }}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                          disabled={submiting || isLoading || !confirm}
                          loading={submiting || isLoading}
                        >
                          CREATE ACCOUNT
                        </Button>
                        {/* <p>
                          By signing up you agree to our
                          {' '}
                          <a href="/page/terms-of-service" target="_blank">Terms of Service</a>
                          {' '}
                          and
                          {' '}
                          <a href="/page/privacy-policy" target="_blank">Privacy Policy</a>
                          , and confirm that you are at least 18 years old.
                        </p> */}
                        <div>
                          <div>
                            <Checkbox value={confirm} className="confirm-checkbox" onChange={() => this.setState({ confirm: !confirm })} />
                            I agree to the
                            {' '}
                            <a href="/help/about/terms-of-service" target="_blank">
                              Terms of Service
                            </a>
                            {' '}
                            and confirm that I am at least 18 years old.
                          </div>
                        </div>
                        <p>
                          Have an account already?
                          <Link href="/login">
                            <a> Log in here.</a>
                          </Link>
                        </p>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Layout>
    );
  }
}
const mapStatesToProps = (state: any) => ({
  ui: { ...state.ui },
  settings: { ...state.settings },
  registerFanData: { ...state.auth.registerFanData },
  verified: state.auth.verified

});

const mapDispatchToProps = {
  registerFan, loginSocial, registerFanSuccess, verifiedFanSuccess
};

export default connect(mapStatesToProps, mapDispatchToProps)(FanRegister);
