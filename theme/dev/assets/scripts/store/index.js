import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import superagent from 'superagent';

export default new Vuex.Store({
  // development時のみ厳格モード有効
  strict: process.env.NODE_ENV !== 'production',

  state: {
    pageTitle: '',
    siteTitle: 'Dancing Girl.',
    postData: [],
    siteUrl: location.protocol + '//' + location.host
  },

  // 同期、単一の処理
  mutations: {
    SET_PAGE_TITLE(state, title) {
      state.pageTitle = title;
    },

    SET_POST_DATA(state, data) {
      state.postData = data;
    }
  },

  // 非同期、複数のmutationsを組み合わせた処理
  actions: {
    changeTitle(context, title) {
      // pageTitleを変更
      context.commit('SET_PAGE_TITLE', title);

      // document titleも変更
      if (title === '') {
        document.title = context.state.siteTitle;
      }
      else {
        document.title = title + ' - ' + context.state.siteTitle;
      }
    },

    getPosts(context) {
      superagent
        .get(context.state.siteUrl + '/wp-json/wp/v2/posts')
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          else {
            context.commit('SET_POST_DATA', res.body);
          }
        });
    }
  }
});