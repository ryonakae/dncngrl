<template>
  <div :class="$style.page">
    <ul v-if="hasPosts" :class="$style.posts">
      <li
        v-for="post in posts"
        :key="post.id"
        :class="$style.post"
        @mouseenter="setCurrentPost(post)"
        @mouseleave="clearCurrentPost"
        @touchstart="setCurrentPost(post)"
        @touchend="clearCurrentPost"
      >
        <NuxtLink :to="'/post/' + post.id" tag="div" :class="$style.inner">
          <IndexThumb :post="post" />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ store, route, $config }) {
    const posts = await store.dispatch('getAllPosts', {
      wpSiteUrl: $config.wpSiteUrl,
      queryOptions: {
        per_page: store.state.perPage,
        offset: 0
      }
    })
    return { posts }
  },
  head() {
    return {
      titleTemplate: undefined,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$config.siteTitle,
          template: '%s'
        }
      ]
    }
  },

  computed: {
    hasPosts() {
      return this.posts.length > 0
    },

    perPage() {
      return this.$store.state.perPage
    }
  },

  created() {
    // currentPostDataを空にする(bgをリセット)
    this.clearCurrentPost()
  },

  methods: {
    setCurrentPost(post) {
      if (this.$route.path === '/') {
        this.$store.dispatch('setCurrentPost', post)
      }
    },

    clearCurrentPost() {
      if (this.$route.path === '/') {
        this.$store.dispatch('clearCurrentPost')
      }
    }
  }
}
</script>

<style lang="scss" module>
@import 'bourbon';
@import '~/assets/styles/config';
@import '~/assets/styles/mixin';

.page {
  margin: 0 auto $margin_page;
  max-width: 1600px;
  padding: 125px $margin_page 0;

  @include mq($mq_pcXLarge) {
    margin-right: $margin_page;
    margin-left: $margin_page;
    padding-right: 0;
    padding-left: 0;
  }

  @include mq($mq_spLarge) {
    margin-right: $margin_page_sp;
    margin-left: $margin_page_sp;
    padding-top: 95px;
  }
}

.posts {
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: -$margin_post * 2;
  margin-right: -$margin_post;
  margin-left: -$margin_post;

  @include mq($mq_spLarge) {
    margin-top: -$margin_post_sp * 2;
    margin-right: -$margin_post_sp;
    margin-left: -$margin_post_sp;
  }
}

.post {
  width: calc(100% / 5);
  height: calc(
    (#{$max_page_width} - (#{$margin_page} - #{$margin_post}) * 2) / 5 - #{$margin_post} *
      2 + 60px
  );
  // margin-top: 60px;
  padding: calc(60px / 2) $margin_post;

  .inner {
    display: block;
    width: 100%;
    height: 100%;
    // background-color: #fff;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    cursor: pointer;
  }

  @include mq($mq_pcXLarge) {
    height: calc(
      (100vw - (#{$margin_page} - #{$margin_post}) * 2) / 5 - #{$margin_post} * 2 +
        60px
    );
  }

  @include mq($mq_pcLarge) {
    width: calc(100% / 4);
    height: calc(
      (100vw - (#{$margin_page} - #{$margin_post}) * 2) / 4 - #{$margin_post} * 2 +
        60px
    );
  }

  @include mq($mq_tabletLarge) {
    width: calc(100% / 3);
    height: calc(
      (100vw - (#{$margin_page} - #{$margin_post}) * 2) / 3 - #{$margin_post} * 2 +
        60px
    );
  }

  @include mq($mq_spLarge) {
    width: calc(100% / 2);
    height: calc(
      (100vw - (#{$margin_page_sp} - #{$margin_post_sp}) * 2) / 2 - #{$margin_post_sp} *
        2 + 30px
    );
    // margin-top: 30px;
    padding: calc(30px / 2) $margin_post_sp;
  }

  @include mq($mq_spSmall) {
    width: calc(100% / 1);
    height: calc(
      (100vw - (#{$margin_page_sp} - #{$margin_post_sp}) * 2) / 1 - #{$margin_post_sp} *
        2 + 30px
    );
  }
}
</style>
