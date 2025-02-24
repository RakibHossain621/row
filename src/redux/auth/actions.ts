import { createAsyncAction, createAction } from '@lib/redux';

export const { login, loginSuccess, loginFail } = createAsyncAction(
  'login',
  'LOGIN'
);

export const { loginPerformer } = createAsyncAction(
  'loginPerformer',
  'LOGINPERFORMER'
);

export const { loginSocial } = createAsyncAction(
  'loginSocial',
  'LOGINSOCIAL'
);

export const { registerFan, registerFanSuccess, registerFanFail } = createAsyncAction(
  'registerFan',
  'REGISTERFAN'
);

export const { verifiedFanSuccess } = createAsyncAction(
  'verifiedFanSuccess',
  'VERIFIEDFANSUCCESS'
);

export const { registerPerformer, registerPerformerSuccess, registerPerformerFail } = createAsyncAction(
  'registerPerformer',
  'REGISTERPERFORMER'
);

export const { forgot, forgotSuccess, forgotFail } = createAsyncAction(
  'forgot',
  'FORGOT'
);

export const logout = createAction('logout');
export const logoutSuccess = createAction('logoutSuccess');

export const getCurrentUser = createAction('getCurrentUser');
