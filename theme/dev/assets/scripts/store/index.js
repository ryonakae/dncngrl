import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pageTitle: '',
    siteTitle: 'Dancing Girl.'
  },

  // 同期、単一の処理
  mutations: {
    CHANGE_PAGE_TITLE(state, title) {
      state.pageTitle = title;
    }
  },

  // 非同期、複数のmutationsを組み合わせた処理
  actions: {
    changePageTitle(context, title) {
      context.commit('CHANGE_PAGE_TITLE', title);
    }
  }
});