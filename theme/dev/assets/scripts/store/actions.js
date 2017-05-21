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
    const d = new $.Deferred();

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
          d.resolve();
        }
      });

    return d.promise();
  },

  // 単一の投稿を取得
  // slugは絶対に重複しないという前提
  getPost(context, slug) {
    const d = new $.Deferred();

    const getUrl = context.state.siteUrl + '/wp-json/wp/v2/posts';
    const queryOptions = {
      _embed: null,
      slug: slug
    };

    superagent
      .get(getUrl)
      .query(queryOptions)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log(res.body[0]);
          context.commit('SET_CURRENT_POST_DATA', res.body[0]);
          d.resolve();
        }
      });

    return d.promise();
  },

  // currentPostDataにpostオブジェクトをセット
  setCurrentPost(context, post) {
    context.commit('SET_CURRENT_POST_DATA', post);
  }
};
