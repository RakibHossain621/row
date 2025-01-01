import { APIRequest } from './api-request';

export class TokenTransctionService extends APIRequest {
  sendTip(performerId: string, payload: any) {
    return this.post(`/token-transactions/tip/${performerId}`, payload);
  }

  sendGift(performerId: string, payload: any) {
    return this.post(`/token-transactions/gifts/${performerId}`, payload);
  }

  public sendPaidToken(conversationId: string, payload: any) {
    return this.post(`/token-transactions/pay-token/${conversationId}`, payload);
  }

  purchaseFeed(id, payload) {
    return this.post(`/token-transactions/feed/${id}`, payload);
  }

  purchaseProduct(id, payload) {
    return this.post(`/token-transactions/product/${id}`, payload);
  }

  purchaseVideo(id, payload) {
    return this.post(`/token-transactions/video/${id}`, payload);
  }

  purchaseGallery(id, payload) {
    return this.post(`/token-transactions/gallery/${id}`, payload);
  }

  purchaseMessage(id, payload) {
    return this.post(`/token-transactions/message/${id}`, payload);
  }

  purchaseStream(id) {
    return this.post(`/token-transactions/stream/${id}`);
  }

  boostPromotion(bracketId: string, payload: any) {
    return this.post(`/token-transactions/booking-cross-promotion/${bracketId}`, payload);
  }

  userSearch(query?: { [key: string]: any }) {
    return this.get(this.buildUrl('/token-transactions/user/search', query));
  }

  userTransactions(query?: { [key: string]: any }) {
    return this.get(this.buildUrl('/transactions/user/search', query));
  }
}

export const tokenTransctionService = new TokenTransctionService();
