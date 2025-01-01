import { APIRequest } from './api-request';

export class FileService extends APIRequest {
  getSignUrlById(payload : any) {
    return this.post('/files/sign-url', payload);
  }

  getPublicInfo(payload : any) {
    return this.post('/files/public-info', payload);
  }

  getSignUrlsByIds(payload : any) {
    return this.post('/files/sign-urls', payload);
  }
}

export const fileService = new FileService();
