import { APIRequest } from './api-request';

export class PostService extends APIRequest {
  search(query: any) {
    return this.get(this.buildUrl('/posts', query as any));
  }

  findById(id: string) {
    return this.get(`/posts/${id}`);
  }
}

export const postService = new PostService();
