<template>
  <div id="app">
    <HeaderComponent />
    <Nuxt />
    <IndexBg v-show="$route.name === 'index'" />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  head() {
    return {
      htmlAttrs: {
        lang: 'ja'
      },
      title: this.$config.siteTitle,
      titleTemplate: `%s - ${this.$config.siteTitle}`,
      meta: [
        { charset: 'utf-8' },
        { name: 'robots', content: 'index, follow' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: this.$config.siteDescription
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$config.siteTitle,
          template: `%s / ${this.$config.siteTitle}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.$config.siteDescription
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.$config.siteUrl
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${this.$config.siteUrl}/ogp.png`
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:locale',
          content: 'ja_JP'
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: '@ryo_dg'
        },
        {
          hid: 'theme-color',
          name: 'theme-color',
          content: '#000'
        }
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: true
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap'
        }
      ]
    }
  },

  mounted() {
    // デバイスによってbodyにaddClass
    if (this.$util.getDevice() === 'pc') {
      document.body.classList.add('is-pc')
    } else if (this.$util.getDevice() === 'tablet') {
      document.body.classList.add('is-tablet')
    } else if (this.$util.getDevice() === 'mobile') {
      document.body.classList.add('is-mobile')
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/base';
</style>
