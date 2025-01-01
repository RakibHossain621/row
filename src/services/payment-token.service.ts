import { APIRequest } from './api-request';

class PaymentTokenService extends APIRequest {
  search(param?: any) {
    return this.get(this.buildUrl('/payment-token/user/search', param));
  }

  sendTip(performerId: string, data: { token: number, conversationId?: string}) {
    return this.post(`/payment-token/send-tip-token/${performerId}`, data);
  }
}

export const paymentTokenService = new PaymentTokenService();
