import { APIRequest } from './api-request';

export class WalletService extends APIRequest {
  findById(id: string) {
    return this.get(`/wallet/performer/${id}`);
  }

  search() {
    return this.get('/wallet/performer');
  }
}

export const walletService = new WalletService();
