<template>
  <article v-if="hasPage" ref="page" :class="$style.page">
    <h1 :class="$style.title">{{ page.title.rendered.toUpperCase() }}</h1>
    <div :class="$style.content" v-html="page.content.rendered" />
  </article>
</template>

<script>
export default {
  name: 'SpecificPage',

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch('backByEsc', from)
    })
  },

  async asyncData({ store, route, $config, payload }) {
    let page
    if (payload) {
      page = payload
    } else {
      page = await store.dispatch('getPage', {
        wpSiteUrl: $config.wpSiteUrl,
        slug: route.params.page
      })
    }

    return { page }
  },
  head() {
    return {
      title: this.page.title.rendered,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.page.title.rendered
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        }
      ]
    }
  },

  computed: {
    hasPage() {
      return Object.keys(this.page).length > 0
    }
  }
}
</script>

<style lang="scss" module>
@import 'bourbon';
@import '~/assets/styles/config';
@import '~/assets/styles/mixin';
@import '~/assets/styles/extend';

.page {
  margin: 0 $margin_page $margin_page;
  padding-top: 185px;

  &.hidden {
    opacity: 0;
    visibility: hidden;
  }

  @include mq($mq_spLarge) {
    margin-right: $margin_page_sp;
    margin-left: $margin_page_sp;
    padding-top: 125px;
  }
}

.title {
  @extend %title;
}

.content {
  margin-top: 1.3em;
  width: 50%;

  @extend %content;

  @include mq($mq_spLarge) {
    width: 100%;
  }
}
</style>
