import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import mutations from './mutations';
import actions from './actions';

export default new Vuex.Store({
  // development時のみ厳格モード有効
  strict: process.env.NODE_ENV !== 'production',

  state: {
    pageTitle: '',
    siteTitle: document.title,
    siteUrl: process.env.NODE_ENV === 'production' ? location.protocol + '//' + location.host : 'http://dncngrl.dev',
    allPostData: [],
    currentPostData: {}
  },

  mutations,
  actions
});
