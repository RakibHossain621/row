import { giftService } from 'src/services';
import { flatten } from 'lodash';
import { put } from 'redux-saga/effects';
import { createSagas } from '@lib/redux';
import { IReduxAction } from 'src/interfaces';
import {
  getGift, getGiftSuccess, getGiftFail,
  moreGift, moreGiftFail, moreGiftSuccess
} from './actions';

const giftSagas = [
  {
    on: getGift,
    * worker(data: IReduxAction<any>) {
      try {
        const resp = yield giftService.search(data.payload);
        yield put(getGiftSuccess(resp.data));
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield put(getGiftFail(error));
      }
    }
  },
  {
    on: moreGift,
    * worker(data: IReduxAction<any>) {
      try {
        const resp = yield giftService.search(data.payload);
        yield put(moreGiftSuccess(resp.data));
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield put(moreGiftFail(error));
      }
    }
  }

];

export default flatten([createSagas(giftSagas)]);
