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
    CHANGE_TITLE(state, title) {
      state.pageTitle = title;
    }
  },

  // 非同期、複数のmutationsを組み合わせた処理
  actions: {
    changeTitle(context, title) {
      // pageTitleを変更
      context.commit('CHANGE_TITLE', title);

      // document titleも変更
      if (title === '') {
        document.title = context.state.siteTitle;
      }
      else {
        document.title = title + ' - ' + context.state.siteTitle;
      }
    },
  }
});