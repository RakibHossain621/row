import { APIRequest } from './api-request';

export class PaymentService extends APIRequest {
  subscribePerformer(payload: any) {
    return this.post('/payment/subscribe/performers', payload);
  }

  userSearch(payload) {
    return this.get(this.buildUrl('/transactions/user/search', payload));
  }

  purchaseTokenPackage(id: string) {
    return this.post(`/payment/purchase-tokens/${id}`, {
      paymentGateway: "paypal"
    });
  }

  applyCoupon(code: any) {
    return this.post(`/coupons/${code}/apply-coupon`);
  }

  connectStripeAccount() {
    return this.post('/stripe/accounts');
  }

  getStripeCards() {
    return this.get('/stripe/user/cards');
  }

  addStripeCard(payload) {
    return this.post('/stripe/user/cards', payload);
  }

  removeStripeCard(id) {
    return this.del(`/stripe/user/cards/${id}`);
  }

  retrieveStripeAccount() {
    return this.get('/stripe/accounts/me');
  }

  loginLink() {
    return this.get('/stripe/accounts/me/login-link');
  }

  getCards(req: any) {
    return this.get(this.buildUrl('/payment-cards', req));
  }

  addCard(gateway: string, payload: any) {
    return this.post(`/${gateway}/cards`, payload);
  }

  removeCard(id: string) {
    return this.del(`/payment-cards/${id}`);
  }

  sendSavePaypalCredentials({
    performerId,
    email
  }: {
    performerId: string,
    email: string
  }) {
    return this.post(`/performers/payment-gateway-settings`, {
      performerId,
      key: 'paypal',
      status: 'active',
      value: email
    })
  }

  tradeDiamond(amount: number) {
    return this.post('/payment/trade-diamonds', {
      amount
    });
  }

  paypalCallback(paypalOrderId:string) {
    return this.post(`/paypal/cheking/${paypalOrderId}`);
  }

  paypalCallhook({eventType, orderId} : { eventType: string, orderId: string }) {
    return this.post(`/payment/paypal/callhook`, {
      event_type: eventType,
      resource: {
          id: orderId
      }
    })
  }
}

export const paymentService = new PaymentService();
