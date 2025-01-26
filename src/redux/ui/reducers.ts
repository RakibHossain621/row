import { merge } from 'lodash';
import { createReducers } from '@lib/redux';
import { updateUIValue, loadUIValue, updateTabValue, updateSidebarCollapseValue } from './actions';

  const selectedTabIndex = typeof window !== 'undefined' && localStorage.getItem('selectedTabIndex')
  ? Number(localStorage.getItem('selectedTabIndex'))
  :0

const initialState = {
  theme: 'light',
  siteName: '',
  logo: '',
  menus: [],
  favicon: '/static/favicon.ico',
  loginPlaceholderImage: '',
  footerContent: '',
  modelBenefit: '',
  userBenefit: '',
  selectedTabIndex:  selectedTabIndex, 
  sidebarCollapse: false,
  fans: 0,
  following: 0,
};

const uiReducers = [
  {
    on: updateUIValue,
    reducer(state: any, data: any) {
      if (process.browser) {
        Object.keys(data.payload).forEach(
          (key) => localStorage && localStorage.setItem(key, data.payload[key])
        );
      }
      return {
        ...state,
        ...data.payload
      };
    }
  },
  {
    on: updateTabValue,
    reducer(state: any, data: any) {
      if (process.browser) {
        localStorage.setItem('selectedTabIndex', data.payload);
      }
      return {
        ...state,
        selectedTabIndex: data.payload
      };
    }
  },
  {
    on: updateSidebarCollapseValue,
    reducer(state: any, data: any) {
      return {
        ...state,
        sidebarCollapse: !state.sidebarCollapse
      };
    }
  },
  {
    on: loadUIValue,
    reducer(state: any) {
      const newVal = {};
      if (process.browser) {
        Object.keys(initialState).forEach((key) => {
          const val = localStorage.getItem(key);
          if (val) {
            newVal[key] = val;
          }
        });
      }
      return {
        ...state,
        ...newVal
      };
    }
  }
];

export default merge({}, createReducers('ui', [uiReducers], initialState));
