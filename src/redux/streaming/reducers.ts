import { merge } from 'lodash';
import { createReducers } from '@lib/redux';
import { IReduxAction } from 'src/interfaces';
import {
  addPrivateRequest, accessPrivateRequest, updateLiveStreamSettings, cancelPrivateRequest, addMuted
} from './actions';

const initialState = {
  privateRequests: [],
  beenMuted: [],
  settings: {
    viewerURL: '',
    publisherURL: '',
    optionForBroadcast: 'hls',
    optionForGroup: 'hls',
    optionForPrivate: 'hls',
    secureOption: false,
    agoraEnable: false
  }
};

const reducers = [
  {
    on: addPrivateRequest,
    reducer(state: any, action: IReduxAction<any>) {
      const { user } = action.payload;
      const { privateRequests } = state;
      const privateIndex = privateRequests.findIndex((item) => item.user._id === user._id);
      return {
        ...state,
        // eslint-disable-next-line no-nested-ternary
        privateRequests: privateIndex > -1 ? state.privateRequests : state.privateRequests[0]?.user?.rubyBalance > user?.rubyBalance ? [...state.privateRequests, { ...action.payload }] : [{ ...action.payload }, ...state.privateRequests]
      };
    }
  },

  {
    on: addMuted,
    reducer(state: any, action: IReduxAction<any>) {
      const { performerId } = action.payload;
      const { beenMuted } = state;
      const muteIndex = beenMuted.findIndex((item) => item === performerId);
      return {
        ...state,
        beenMuted: muteIndex > -1 ? state.beenMuted : [...state.beenMuted, performerId]
      };
    }
  },
  {
    on: accessPrivateRequest,
    reducer(state: any, action: IReduxAction<string>) {
      return {
        ...state,
        privateRequests: state.privateRequests.filter((p) => p.conversationId !== action.payload)
      };
    }
  },

  {
    on: cancelPrivateRequest,
    reducer(state: any, action: IReduxAction<string>) {
      return {
        ...state,
        privateRequests: [...state.privateRequests.filter((p) => p.conversationId !== action.payload)]
      };
    }
  },
  {
    on: updateLiveStreamSettings,
    reducer(state: any, action: IReduxAction<any>) {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload
        }
      };
    }
  }
];
export default merge({}, createReducers('streaming', [reducers], initialState));
