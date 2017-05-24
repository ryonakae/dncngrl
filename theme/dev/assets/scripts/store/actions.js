import superagent from 'superagent';

// 非同期、複数のmutationsを組み合わせた処理
export default {
  changeTitle(context, title) {
    return new Promise((resolve, reject)=>{
      // pageTitleを変更
      context.commit('SET_PAGE_TITLE', title);

      // document.titleも変更
      if (title === '') {
        document.title = context.state.siteTitle;
      }
      else {
        document.title = title + ' - ' + context.state.siteTitle;
      }

      setTimeout(resolve, 10);
    });
  },

  // 記事一覧を取得
  getAllPosts(context, options) {
    return new Promise((resolve, reject)=>{
      const getUrl = context.state.siteUrl + '/wp-json/wp/v2/posts';
      const queryOptions = Object.assign({_embed: null}, options);

      superagent
        .get(getUrl)
        .query(queryOptions)
        .timeout({
          response: 10000,
          deadline: 60000
        })
        .end((err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          else {
            console.log(res.body);
            // res.bodyが空(これ以上記事ない)ときはrejectを返す
            if (res.body.length === 0) {
              reject();
            }
            else {
              resolve(res.body);
            }
          }
        });
    });
  },

  // スクロールでさらに記事一覧を取得
  initInfiniteScroll(context, options) {
    let lock = false;

    options.scrollManager.add(onScroll);

    function onScroll(){
      const documentHeight = $(document).height();

      // スクロールが7割位になったら次のポストロード
      if (options.scrollManager.scrollBottom > documentHeight * 0.7) {
        if (lock) return;

        lock = true;

        context.dispatch('getAllPosts', {per_page:context.state.perPage, offset:context.state.allPostData.length})
          .then((result)=>{
            // 現在のallPostDataとresultを結合する
            const newData = context.state.allPostData.concat(result);
            console.log(newData);
            // 結合した配列をallPostDataにセット
            return context.dispatch('setAllPost', newData);
          })
          .then(()=>{
            lock = false;
          })
          .catch((err)=>{
            lock = true;
          });
      }
    }
  },

  // 単一の投稿を取得
  getPost(context, id) {
    return new Promise((resolve, reject)=>{
      const getUrl = context.state.siteUrl + '/wp-json/wp/v2/posts/' + id;
      const queryOptions = {
        _embed: null
      };

      superagent
        .get(getUrl)
        .query(queryOptions)
        .timeout({
          response: 10000,
          deadline: 60000
        })
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          else {
            console.log(res.body);
            resolve(res.body);
          }
        });
    });
  },

  // タグidからタグの名前を取得
  // resolveの引数にタグ情報を入れて、thenに渡す
  getTagName(context, id) {
    return new Promise((resolve, reject)=>{
      const getUrl = context.state.siteUrl + '/wp-json/wp/v2/tags/' + id;

      superagent
        .get(getUrl)
        .timeout({
          response: 10000,
          deadline: 60000
        })
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          else {
            console.log(res.body);
            resolve(res.body);
          }
        });
    });
  },

  setAllPost(context, data) {
    return new Promise((resolve, reject)=>{
      context.commit('SET_ALL_POST_DATA', data);
      setTimeout(resolve, 10);
    });
  },

  // currentPostDataにpostオブジェクトをセット
  setCurrentPost(context, data) {
    return new Promise((resolve, reject)=>{
      context.commit('SET_CURRENT_POST_DATA', data);
      setTimeout(resolve, 10);
    });
  },

  clearCurrentPost(context) {
    return new Promise((resolve, reject)=>{
      context.commit('SET_CURRENT_POST_DATA', {});
      setTimeout(resolve, 10);
    });
  }
};
