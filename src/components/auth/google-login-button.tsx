/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import { GoogleOutlined } from '@ant-design/icons';
import useGoogleLogin from '@lib/hook/use-google-login';
// import { Typography } from 'antd';
import './google-login-button.less';

// const { Text } = Typography;

interface IProps {
  clientId: string;
  onSuccess: Function;
  onFailure: Function;
  custom? : boolean;
}
const GoogleLoginButton = ({
  clientId, onSuccess, onFailure, custom = false
}: IProps) => {
  const { signIn, loaded, renderButtonSignIn } = useGoogleLogin({
    clientId,
    onSuccess,
    onFailure,
    onScriptLoadFailure: onFailure
  });

  const loginWithGoogle = () => {
    if (typeof window !== 'undefined') {
      document.querySelectorAll('[role=button]')
        .forEach((el: any) => el.click());
    }
  };

  useEffect(() => {
    if (loaded) {
      renderButtonSignIn();
      signIn();
    }
  }, [loaded]);

  return (
    <>
      {custom ? (
        <button type="button" disabled={!clientId || !loaded} onClick={() => loginWithGoogle()} className="custom-google-button">
          <GoogleOutlined />
          Google
        </button>
      ) : (
        <button type="button" disabled={!clientId || !loaded} onClick={() => loginWithGoogle()} className="google-button">
          <GoogleOutlined />
          Continue with Google
        </button>
      )}
      <div className={custom ? 'btn-google-login-box custom' : 'btn-google-login-box'}>
        <div id="btnLoginWithGoogle" className="btn-google-login" />
      </div>
    </>
  );
};

export default GoogleLoginButton;
