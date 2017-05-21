<template>
  <div :class="$style.page">
    <ul :class="$style.posts">
      <li :class="$style.post" v-for="(post, index) in allPost" :key="post.id" @mouseover="setCurrentPost(post)" :data-post-index="index">
        <router-link :to="replacedPostUrl(post.link)" :style="{backgroundImage:'url('+post.acf.images[0].image+')'}"></router-link>
      </li>
    </ul>

    <index-bg-component></index-bg-component>
  </div>
</template>

<script>
import IndexBgComponent from '../components/IndexBg.vue';

export default {
  components: {
    IndexBgComponent
  },

  computed: {
    siteUrl() {
      return this.$store.state.siteUrl;
    },
    allPost() {
      return this.$store.state.allPostData;
    }
  },

  methods: {
    replacedPostUrl(originalUrl) {
      const regExp = new RegExp(this.siteUrl, 'g');
      return originalUrl.replace(regExp, '');
    },

    setCurrentPost(post) {
      return this.$store.dispatch('setCurrentPost', post);
    }
  },

  mounted() {
    // ページタイトルを変更
    this.$store.dispatch('changeTitle', '');

    // currentPostDataを空にする(bgをリセット)
    this.$store.dispatch('setCurrentPost', {});

    // 投稿一覧を取得
    this.$store.dispatch('getAllPosts', {per_page:20, offset:0});
  },
};
</script>

<style lang='scss' module>
@import "bourbon";
@import "~styles/config";
@import "~styles/mixin";

.page {
  margin: 125px $margin_page $margin_page;
}

.posts {
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: -60px -$margin_post 0 -$margin_post;
}

.post {
  width: calc(100% / 4 - (#{$margin_post} * 2));
  height: calc((100vw - (#{$margin_page} + #{$margin_post}) * 2) / 4 - #{$margin_post});
  margin: 60px $margin_post 0 $margin_post;

  a {
    display: block;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 50% 50%;
  }
}
</style>
