import superagent from 'superagent'

export default {
  state: () => ({
    currentPostData: {},
    perPage: 100
  }),

  mutations: {
    SET_CURRENT_POST_DATA(state, data) {
      state.currentPostData = data
    }
  },

  actions: {
    // 記事一覧を取得
    getAllPosts(context, options) {
      console.log(options)

      return new Promise((resolve, reject) => {
        const getUrl = options.wpSiteUrl + '/wp-json/wp/v2/posts'
        const queryOptions = Object.assign(
          { _embed: null },
          options.queryOptions
        )

        superagent
          .get(getUrl)
          .query(queryOptions)
          .timeout({
            response: 10000,
            deadline: 60000
          })
          .end((err, res) => {
            if (err) {
              console.log(err)
              reject(err)
            } else {
              // console.log(res.body)
              // res.bodyが空(これ以上記事ない)ときはrejectを返す
              if (res.body.length === 0) {
                return reject(new Error('error on getAllPosts'))
              }
              resolve(res.body)
            }
          })
      })
    },

    // 単一の投稿を取得
    getPost(context, options) {
      return new Promise((resolve, reject) => {
        const getUrl = options.wpSiteUrl + '/wp-json/wp/v2/posts/' + options.id
        const queryOptions = {
          _embed: null
        }

        superagent
          .get(getUrl)
          .query(queryOptions)
          .timeout({
            response: 10000,
            deadline: 60000
          })
          .end((err, res) => {
            if (err) {
              console.log(err)
            } else {
              // console.log(res.body)
              resolve(res.body)
            }
          })
      })
    },

    // 固定ページを取得
    getPage(context, options) {
      return new Promise((resolve, reject) => {
        const getUrl = options.wpSiteUrl + '/wp-json/wp/v2/pages'
        const queryOptions = {
          _embed: null,
          slug: options.slug
        }

        superagent
          .get(getUrl)
          .query(queryOptions)
          .timeout({
            response: 10000,
            deadline: 60000
          })
          .end((err, res) => {
            if (err) {
              console.log(err)
            } else {
              // console.log(res.body[0])
              resolve(res.body[0])
            }
          })
      })
    },

    // タグidからタグの名前を取得
    // resolveの引数にタグ情報を入れて、thenに渡す
    getTagName(context, options) {
      return new Promise((resolve, reject) => {
        const getUrl = options.wpSiteUrl + '/wp-json/wp/v2/tags/' + options.id

        superagent
          .get(getUrl)
          .timeout({
            response: 10000,
            deadline: 60000
          })
          .end((err, res) => {
            if (err) {
              console.log(err)
            } else {
              // console.log(res.body)
              resolve(res.body)
            }
          })
      })
    },

    // currentPostDataにpostオブジェクトをセット
    setCurrentPost(context, data) {
      return new Promise((resolve, reject) => {
        context.commit('SET_CURRENT_POST_DATA', data)
        setTimeout(resolve, 10)
      })
    },

    clearCurrentPost(context) {
      return new Promise((resolve, reject) => {
        context.commit('SET_CURRENT_POST_DATA', {})
        setTimeout(resolve, 10)
      })
    },

    backByEsc(context, from) {
      $(document).on('keyup.backByEsc', e => {
        if (e.keyCode === 27) {
          $nuxt.$router.push(from.path)
          $(document).off('.backByEsc')
        }
      })
    }
  }
}
