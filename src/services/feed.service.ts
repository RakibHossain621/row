import { APIRequest } from './api-request';

export class FeedService extends APIRequest {
  search(query?: { [key: string]: any }) {
    return this.get(
      this.buildUrl('/feeds/performers', query)
    );
  }

  userSearch(query?: { [key: string]: any }) {
    return this.get(
      this.buildUrl('/feeds/users', query)
    );
  }

  userRecommendSearch(query?: { [key: string]: any }) {
    return this.get(
      this.buildUrl('/feeds/users/search/recommended', query)
    );
  }

  followingSearch(query?: { [key: string]: any }) {
    return this.get(
      this.buildUrl('/feeds/users/search/following', query)
    );
  }

  trendingSearch(query?: { [key: string]: any }) {
    return this.get(
      this.buildUrl('/feeds/users/search/trending', query)
    );
  }

  userHomeFeeds(query?: { [key: string]: any }) {
    if (query.q === '') {
      return this.get(
        this.buildUrl('/feeds/users/home-feeds', query)
      );
    }
    return this.get(
      this.buildUrl('/feeds/users', query)
    );
  }

  delete(id: string) {
    return this.del(`/feeds/performers/${id}`);
  }

  findById(id: string, headers?: { [key: string]: string }) {
    return this.get(`/feeds/performers/${id}`, headers);
  }

  findByHashtag(hashtag: string, headers?: { [key: string]: string }) {
    return this.get(`/feeds/users/?hashTag=${hashtag}`, headers);
  }

  findOne(id: string, headers?: { [key: string]: string }) {
    return this.get(`/feeds/users/${id}`, headers);
  }

  update(id: string, payload: any) {
    return this.put(`/feeds/performers/${id}`, payload);
  }

  create(data) {
    return this.post('/feeds/performers', data);
  }

  uploadPhoto(file: File, payload: any, onProgress?: Function) {
    return this.upload(
      '/feeds/performers/photo/upload',
      [
        {
          fieldname: 'file',
          file
        }
      ],
      {
        onProgress,
        customData: payload
      }
    );
  }

  uploadThumbnail(file: File, payload: any, onProgress?: Function) {
    return this.upload(
      '/feeds/performers/thumbnail/upload',
      [
        {
          fieldname: 'file',
          file
        }
      ],
      {
        onProgress,
        customData: payload
      }
    );
  }

  uploadVideo(file: File, payload: any, onProgress?: Function) {
    return this.upload(
      '/feeds/performers/video/upload',
      [
        {
          fieldname: 'file',
          file
        }
      ],
      {
        onProgress,
        customData: payload
      }
    );
  }

  uploadTeaser(file: File, payload: any, onProgress?: Function) {
    return this.upload(
      '/feeds/performers/teaser/upload',
      [
        {
          fieldname: 'file',
          file
        }
      ],
      {
        onProgress,
        customData: payload
      }
    );
  }

  uploadFile(file: File, body: Record<string, any>, onProgress: Function, fileMetadata?: any) {
    return this.uploadFileAndGetUrl({
      type: file?.type.includes('video') ? 'video' : 'image',
      file,
      url: '/feeds/performers/upload-url',
      body,
      onProgress: onProgress || function next() {},
      fileMetadata
    });
  }

  addPoll(payload) {
    return this.post('/feeds/performers/polls', payload);
  }

  votePoll(pollId: string) {
    return this.post(`/feeds/users/vote/${pollId}`);
  }

  getBookmark(payload) {
    return this.get(this.buildUrl('/reactions/feeds/bookmark', payload));
  }

  addView(id:string) {
    return this.post(`/feeds/users/${id}/view`);
  }

  getTrendingHashtag(type, payload) {
    return this.get(this.buildUrl(`/feed-hashtags/trending/${type}`, payload));
  }

  getHashtagAlphabet(payload) {
    return this.get(this.buildUrl('/feed-hashtags/alphabetically', payload));
  }

  userGetHashtagAlphabet(type) {
    return this.get(this.buildUrl(`/feed-hashtags/user/alphabetically/${type}`));
  }
}

export const feedService = new FeedService();
