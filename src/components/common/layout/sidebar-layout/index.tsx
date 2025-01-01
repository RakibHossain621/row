/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import {
  Checkbox, Button, Divider, Form, Input, message, Radio, Image
} from 'antd';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import Router from 'next/router';
import { connect } from 'react-redux';
import Link from 'next/link';
import './index.less';
// import GoogleLogin from 'react-google-login';
import { authService } from '@services/auth.service';
import { cookieService } from '@services/cookies.service';
import { registerFan, loginSocial } from '@redux/auth/actions';
import { IPerformer } from '@interfaces/performer';
import { TickIcon } from 'src/icons';
import { IUIConfig } from '@interfaces/index';
import GoogleLoginButton from '@components/auth/google-login-button';
import { login } from '../../../../redux/auth/actions';

interface IProps {
  loggedIn: boolean;
  verified: boolean;
  user: IPerformer;
  settings: any;
  login: Function;
  registerFan: Function;
  ui: IUIConfig;
  registerFanData: any;
  loginSocial: Function;
}

const TopSidebar = ({
  loggedIn,
  verified,
  user,
  settings,
  handleRegister,
  ui,
  handleLogin,
  registerFanData,
  handleLoginSocial
}: any) => {
  // const [loginAs] = useState('user');
  const [value, setValue] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [newUser, setNewUser] = useState({} as IPerformer);

  useEffect(() => {
    if (registerFanData.success) {
      if (registerFanData.data.user) {
        setNewUser(registerFanData.data.user);
        Router.push('/help/about-caster/confirmemail');
      }
      setIsLoginForm(true);
    }
  }, [registerFanData]);

  useEffect(() => {
    if (verified) {
      setIsLoginForm(true);
    }
  }, [verified]);

  const onSubmit = (data: any) => {
    handleRegister({ ...data });
  };
  const onLoginSubmit = (data: any) => {
    handleLogin({ ...data });
  };
  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleRedirectAdd = async () => {
    Router.push({ pathname: '/model/my-post/create', query: { post: 'video' } });
  };

  const sendVerifyMail = async () => {
    try {
      authService.verifyEmail({
        sourceType: 'performer',
        source: newUser
      });
      message.success('Please check your inbox and verify your email address');
    } catch (e) {
      const error = await e;
      message.error(error.message || 'Something went wrong');
    }
  };

  const onGoogleLogin = async (resp: any) => {
    if (!resp?.credential) {
      return;
    }
    const payload = { tokenId: resp.credential, role: 'user' };
    try {
      const response = await (await authService.loginGoogle(payload)).data;
      response.token && handleLoginSocial({ token: response.token });
    } catch (e) {
      const error = await e;
      message.error(error && error.message ? error.message : 'Google login authenticated fail');
    }
  };
  return (
    <div className="top-sidebar">
      {!loggedIn && !isLoginForm && (
        <>
          <div className="login">
            <h3> Log In with </h3>
            <div className="button-login">
              <Button className="primary auth" onClick={() => setIsLoginForm(true)}>
                <img width="21px" height="21px" src={ui?.favicon} alt="" />
                {' '}
                Caster
              </Button>
              <GoogleLoginButton
                clientId={settings.googleClientId}
                onSuccess={onGoogleLogin}
                onFailure={onGoogleLogin}
                custom
              />
            </div>
          </div>
          <Divider className="divider-login"> OR Create New Account </Divider>
          <Form id="login-form" autoComplete="off" onFinish={onSubmit}>
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
              <Input className="form-input" placeholder="Email Address" type="text" id="hide" autoComplete="off" />
            </Form.Item>
            <Form.Item
              name="password"
              validateTrigger={['onChange', 'onBlur']}
              rules={[
                {
                  pattern: new RegExp(/^(?=.{8,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[^\w\d]).*$/g),
                  message:
                    'Password must have minimum 8 characters, at least 1 number, 1 uppercase letter, 1 lowercase letter & 1 special character'
                },
                { required: true, message: 'Please input your password!' }
              ]}
            >
              <Input.Password
                className="form-input"
                placeholder="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Form.Item>
            <Form.Item
              name="gender"
              validateTrigger={['onChange', 'onBlur']}
              className="gender-field"
              rules={[
                {
                  required: true,
                  message: 'Please select a gender'
                }
              ]}
            >
              <Radio.Group onChange={onChange} value={value}>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Radio.Group>
            </Form.Item>
            <div style={{ fontSize: '11px' }}>
              <Checkbox value={confirm} className="confirm-checkbox" onChange={() => setConfirm(!confirm)} />
              <div className="agree-text">
                I agree to the
                {' '}
                <a href="/help/about/terms-of-service" target="_blank">
                  Terms of Service
                </a>
                {' '}
                and confirm that I am at least 18 years old.
              </div>
            </div>
            <Form.Item className="form-item-btn">
              <Button className="secondary btn-create" disabled={!confirm} type="default" htmlType="submit">
                Create Account
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
      {!loggedIn && isLoginForm && (
        <>
          <span className="login-sidebar-form">Log In</span>
          <Form id="login-form" onFinish={onLoginSubmit}>
            <Image width="40px" height="40px" src={ui?.favicon} alt="" />
            <Form.Item
              name="username"
              validateTrigger={['onChange', 'onBlur']}
              rules={[
                { required: true, message: 'Username or Email is missing' },
                { min: 3, message: 'Username or Email must containt at least 3 characters' }
              ]}
            >
              <Input placeholder="Username or Email Address" />
            </Form.Item>
            <Form.Item
              className="login-field"
              name="password"
              validateTrigger={['onChange', 'onBlur']}
              rules={[
                {
                  pattern: new RegExp(/^(?=.{8,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[^\w\d]).*$/g),
                  message:
                    'Password must have minimum 8 characters, at least 1 number, 1 uppercase letter, 1 lowercase letter & 1 special character'
                },
                { required: true, message: 'Please input your password!' }
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <p className="text-center">
              <Link
                href={{
                  pathname: '/auth/forgot-password'
                }}
              >
                <a href="/auth/forgot-password">Forgot password?</a>
              </Link>
            </p>
            {newUser._id && (
            <Button className="secondary" type="default" onClick={() => sendVerifyMail()}>
              Resend Verification Email
            </Button>
            ) }
            <Form.Item className="form-item-btn">
              <Button className="primary" type="default" htmlType="submit">
                Sign In
              </Button>
            </Form.Item>
          </Form>
          {/* <div className="social-login">
            <GoogleLoginButton clientId={settings.googleClientId} onSuccess={onGoogleLogin} onFailure={onGoogleLogin} />
            <button
              type="button"
              disabled={!settings.twitterClientId}
              onClick={() => loginTwitter()}
              className="twitter-button"
            >
              <TwitterOutlined />
              {' '}
              Continue with Twitter
            </button>
          </div> */}
          <Divider className="divider-login"> OR </Divider>
          <span
            className="create-account"
            onClick={() => {
              setIsLoginForm(false);
              setConfirm(false);
            }}
          >
            Create a new account
          </span>
        </>
      )}
      {loggedIn && (
        <div className="info-right-bar">
          <Link
            href={{
              pathname: '/model/profile',
              query: { username: user?.username || user?._id }
            }}
          >
            <img src={user?.avatar || '/static/no-avatar.png'} alt="" style={{ cursor: 'pointer' }} />
          </Link>
          <div className="profile-name">
            <div className="user-name">
              <Link
                href={{
                  pathname: '/model/profile',
                  query: { username: user?.username || user?._id }
                }}
              >
                {user?.name ? user?.name.substring(0, 21) : 'N/A'}
              </Link>
              <span>{user?.verifiedAccount && <TickIcon />}</span>
            </div>
            <span className="sub-name">
              @
              {user?.username ? user?.username?.substring(0, 24) : 'n/a'}
            </span>
          </div>
          <div className="ranking">
            <Link href={{ pathname: '/my-follow', query: { tab: 'following' } }}>
              <a className="sidebar-totalFollow" href="my-follow?tab=following">
                Following
                <div>
                  {user?.stats?.totalFollowing}
                  {' '}
                </div>
              </a>
            </Link>
            {user?.canPrivateChat && (
              <Link href={{ pathname: '/my-follow', query: { tab: 'follower' } }}>
                <a className="sidebar-totalFollow right" href="my-follow?tab=follower">
                  Fans
                  <div>
                    {user?.stats?.totalFollower}
                    {' '}
                  </div>
                </a>
              </Link>
            )}
          </div>
        </div>
      )}
      {loggedIn && (
        <div>
          <div className="menu">
            <>
              <Button href="/home" className="btn-menu-homepage">
                <HomeOutlined />
                <p> Recommended</p>
              </Button>
              <Button onClick={handleRedirectAdd} href="/model/my-post/create" className="btn-menu-homepage">
                <PlusOutlined />
                <p> Add Video/Photo</p>
              </Button>
            </>
          </div>
        </div>
      )}
    </div>
  );
};

function SidebarLayout({
  loggedIn,
  verified,
  user,
  settings,
  registerFan: dispatchRegister,
  login: dispatchLogin,
  ui,
  registerFanData,
  loginSocial: handleLoginSocial
}: IProps) {
  const Login = async (data) => {
    const resp = (await cookieService.getCookie('introducerId')) || null;
    dispatchLogin({ ...data, introducerId: resp || null });
  };
  const handleRegister = async (data) => {
    const resp = (await cookieService.getCookie('introducerId')) || null;
    dispatchRegister({ ...data, introducerId: resp || null });
  };

  return (
    <div className="sidebar-container">
      <TopSidebar
        ui={ui}
        loggedIn={loggedIn}
        verified={verified}
        user={user}
        settings={settings}
        handleLogin={Login}
        handleRegister={handleRegister}
        registerFanData={registerFanData}
        handleLoginSocial={handleLoginSocial}
      />
    </div>
  );
}

const mapState = (state) => ({
  loggedIn: state.auth.loggedIn,
  user: state.user.current,
  settings: { ...state.settings },
  registerFanData: { ...state.auth.registerFanData },
  verified: state.auth.verified,
  ui: { ...state.ui }
});
const mapDispatch = {
  login,
  registerFan,
  loginSocial
};
export default connect(mapState, mapDispatch)(SidebarLayout);
