import { IPerformer } from 'src/interfaces';
import { APIRequest, IResponse } from './api-request';
import { getGlobalConfig } from './config';

export class PerformerService extends APIRequest {
  search(query?: { [key: string]: any }) {
    return this.get(this.buildUrl('/performers/user/search', query));
  }

  randomSearch(query?: { [key: string]: any }) {
    return this.get(this.buildUrl('/performers/search/random', query));
  }

  me(headers?: { [key: string]: string }): Promise<IResponse<IPerformer>> {
    return this.get('/performers/me', headers);
  }

  findOne(id: string, headers?: { [key: string]: string }) {
    return this.get(`/performers/${id}`, headers);
  }

  findByEmail(email: string, headers?: { [key: string]: string }) {
    return this.get(`/performers/findbyEmail/${email}`, headers);
  }

  // getAvatarUploadUrl(file: File, body: Record<string, any>, onProgress: Function, fileMetadata?: any) {
  //   return this.uploadUrl({
  //     type: file?.type.includes('video') ? 'video' : 'image',
  //     file,
  //     url: '/performers/avatar/upload',
  //     body,
  //     onProgress: onProgress || function next() {},
  //     fileMetadata
  //   });
  // }

  getAvatarUploadUrl() {
    const config = getGlobalConfig();
    return `${config.NEXT_PUBLIC_API_ENDPOINT}/performers/avatar/upload`;
  }

  getCoverUploadUrl() {
    const config = getGlobalConfig();
    return `${config.NEXT_PUBLIC_API_ENDPOINT}/performers/cover/upload`;
  }

  getVideoUploadUrl() {
    const config = getGlobalConfig();
    return `${config.NEXT_PUBLIC_API_ENDPOINT}/performers/welcome-video/upload`;
  }

  getDocumentUploadUrl() {
    const config = getGlobalConfig();
    return `${config.NEXT_PUBLIC_API_ENDPOINT}/performers/documents/upload`;
  }

  updateMe(id: string, payload: any) {
    return this.put(`/performers/${id}`, payload);
  }

  getTopPerformer(query?: { [key: string]: any }) {
    return this.get(this.buildUrl('/performers/top', query));
  }

  updateBanking(id: string, payload) {
    return this.put(`/performers/${id}/banking-settings`, payload);
  }

  updatePaymentGateway(id, payload) {
    return this.put(`/performers/${id}/payment-gateway-settings`, payload);
  }

  getBookmarked(payload) {
    return this.get(this.buildUrl('/reactions/performers/bookmark', payload));
  }

  uploadDocumentFiles(file: File, body: Record<string, any>, onProgress: Function, type: string) {
    return this.uploadFileAndGetUrl({
      file: file as File,
      url: '/performers/documents/upload-url',
      body,
      onProgress: onProgress || function next() {},
      type
    });
  }

  uploadAvatarFiles(file: File, body: Record<string, any>, onProgress: Function, fileMetadata?: any) {
    return this.uploadUrl({
      file,
      url: '/performers/avatar/upload-url',
      body,
      onProgress: onProgress || function next() {},
      fileMetadata
    });
  }

  uploadCoverFiles(file: File, body: Record<string, any>, onProgress: Function, fileMetadata?: any) {
    return this.uploadUrl({
      file,
      url: '/performers/cover/upload-url',
      body,
      onProgress: onProgress || function next() {},
      fileMetadata
    });
  }

  uploadDocument(payload : any) {
    return this.post('/performers/documents/upload', payload);
  }

  updateNotificationSetting(id: string, payload: any) {
    return this.put(`/performers/${id}/notification-settings`, payload);
  }

  setInternalProfile() {
    return this.post('/internal-profile/detect-login');
  }

  getRanking() {
    return this.get('/users/ranking');
  }

  getBoardCasterAnalytics(type:string, payload:any) {
    return this.get(this.buildUrl(`/performer/performer-analytics/${type}`, payload));
  }

  getNextSupportedRanking(performerId: string) {
    return this.get(`/performer/performer-analytics/ruby-to-nextRank/${performerId}`);
  }

  checkRole(payload:any) {
    return this.get(this.buildUrl('/performers/check-role', payload));
  }

  getMileStones() {
    return this.get(this.buildUrl('/performers/me/roles'));
  }

  getDocumentCheckStatus() {
    return this.get(this.buildUrl('/documents/auth/check'))
  }
}

export const performerService = new PerformerService();
