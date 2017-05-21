import superagent from 'superagent';

// 非同期、複数のmutationsを組み合わせた処理
export default {
  changeTitle(context, title) {
    // pageTitleを変更
    context.commit('SET_PAGE_TITLE', title);

    // document.titleも変更
    if (title === '') {
      document.title = context.state.siteTitle;
    }
    else {
      document.title = title + ' - ' + context.state.siteTitle;
    }
  },

  // 記事一覧を取得
  getAllPosts(context, options) {
    const getUrl = context.state.siteUrl + '/wp-json/wp/v2/posts';
    const queryOptions = Object.assign({_embed: null}, options);

    superagent
      .get(getUrl)
      .query(queryOptions)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log(res.body);
          context.commit('SET_ALL_POST_DATA', res.body);
        }
      });
  },

  // currentPostDataにpostオブジェクトをセット
  setCurrentPost(context, post) {
    context.commit('SET_CURRENT_POST_DATA', post);
  }
};
