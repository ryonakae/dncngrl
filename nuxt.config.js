import superagent from 'superagent'

// https://dev.to/tbeseda/use-bourbon-sass-in-a-vue-cli-project-1i2d
const sass = require('sass')
const bourbon = require('bourbon')
const bourbonPaths = [...bourbon.includePaths]

// https://zenn.dev/cyber_hacnosuke/articles/0b72c2e996e450
const webpack = require('webpack')

export default {
  target: 'static',
  components: true,
  build: {
    loaders: {
      scss: {
        implementation: sass,
        sassOptions: {
          includePaths: bourbonPaths
        }
      }
    },
    vendor: ['jquery'],
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery'
      })
    ]
  },
  buildModules: ['@nuxt/typescript-build'],
  plugins: [
    { src: '~/plugins/util' },
    { src: '~/plugins/resizeManager', mode: 'client' },
    { src: '~/plugins/scrollManager', mode: 'client' }
  ],
  publicRuntimeConfig: {
    siteTitle: 'Dancing Girl.',
    siteDescription: '同人サークル「Dancing Girl.」のWebサイト。',
    siteUrl: 'https://dncngrl.com/',
    wpSiteUrl: process.env.WP_SITE_URL
  },
  generate: {
    fallback: true,
    interval: 1000,
    crawler: false,
    async routes() {
      async function getPostsRoute() {
        const getUrl = process.env.WP_SITE_URL + '/wp-json/wp/v2/posts'
        const queryOptions = {
          _embed: null,
          per_page: 100,
          offset: 0
        }
        const res = await superagent.get(getUrl).query(queryOptions)
        const posts = res.body
        return posts.map(post => {
          return {
            route: `/post/${post.id}`,
            payload: post
          }
        })
      }

      async function getPageRoute() {
        const getUrl = process.env.WP_SITE_URL + '/wp-json/wp/v2/pages'
        const queryOptions = {
          _embed: null,
          slug: 'about'
        }
        const res = await superagent.get(getUrl).query(queryOptions)
        const pages = res.body
        return pages.map(page => {
          return {
            route: `/${page.slug}`,
            payload: page
          }
        })
      }

      const routes = await Promise.all([getPostsRoute(), getPageRoute()])

      return [...routes[0], ...routes[1]]
    }
  }
}
