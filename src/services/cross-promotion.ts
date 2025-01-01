import { APIRequest } from './api-request';

export class CrossPromotionService extends APIRequest {
  getBrackets(performerId: string) {
    return this.get(this.buildUrl(`/cross-promotion/performer-active-bracket/${performerId}`));
  }

  getListBookingPerformer(performerId: string) {
    return this.get(this.buildUrl(`/cross-promotion/bookings/${performerId}`));
  }

  getMyBooking(transactionId: string) {
    return this.get(this.buildUrl(`/cross-promotion/my-bookings/${transactionId}`));
  }
}

export const crossPromotionService = new CrossPromotionService();
