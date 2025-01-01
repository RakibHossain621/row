import { APIRequest } from './api-request';

export class FollowService extends APIRequest {
  search(type :string, query?: { [key: string]: any }) {
    return this.get(this.buildUrl(`/follow/search/${type}`, query));
  }

  create(payload: any) {
    return this.post('/follow', payload);
  }

  delete(performerId: string) {
    return this.del(`/follow/${performerId}`);
  }
}

export const followService = new FollowService();
