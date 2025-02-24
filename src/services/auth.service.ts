import cookie from 'js-cookie';
import {
  ILogin, IFanRegister, IForgot, IVerifyEmail
} from 'src/interfaces';
import { APIRequest, TOKEN } from './api-request';

export class AuthService extends APIRequest {
  public async login(data: ILogin) {
    return this.post('/auth/login', data);
  }

  public async loginTwitter() {
    return this.get(this.buildUrl('/auth/twitter/login'));
  }

  public async loginGoogle(data: any) {
    return this.post('/auth/google/login', data);
  }

  public async callbackLoginTwitter(data) {
    return this.get(this.buildUrl('/auth/twitter/callback', data));
  }

  public async verifyEmail(data: IVerifyEmail) {
    return this.post('/auth/email-verification', data);
  }

  setToken(token: string, remember = true): void {
    const expired = { expires: !remember ? 1 : 365 };
    cookie.set(TOKEN, token, expired);
    this.setAuthHeaderToken(token);
  }

  getToken(): string {
    return cookie.get(TOKEN);
  }

  setTwitterToken(data: any, role: string) {
    cookie.set('oauthToken', data.oauthToken, { expires: 1 });
    cookie.set('oauthTokenSecret', data.oauthTokenSecret, { expires: 1 });
    cookie.set('role', role, { expires: 1 });
  }

  getTwitterToken() {
    const oauthToken = cookie.get('oauthToken');
    const oauthTokenSecret = cookie.get('oauthTokenSecret');
    const role = cookie.get('role');
    return { oauthToken, oauthTokenSecret, role };
  }

  removeToken(): void {
    cookie.remove(TOKEN);
  }

  updatePassword(data) {
    return this.put('/auth/users/me/password', data);
  }

  resetPassword(data: IForgot) {
    return this.post('/auth/users/forgot', data);
  }

  updateForgotPassword(data: {password: string }, token: string) {
    return this.post(`/auth/password-change?token=${token}`, { ...data, source: 'user' })
  }

  register(data: IFanRegister) {
    return this.post('/auth/users/register', data);
  }

  registerPerformer(
    documents: {
      file: File;
      fieldname: string;
    }[],
    data: any,
    onProgress?: Function
  ) {
    return this.upload('/auth/performers/register', documents, {
      onProgress,
      customData: data
    });
  }

  userSwitchToPerformer(userId: string) {
    return this.post(`/auth/users/${userId}/switch-to-performer`);
  }
}

export const authService = new AuthService();
