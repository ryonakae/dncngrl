<template>
  <div :class="$style.page">
    <ul :class="$style.posts">
      <li :class="$style.post" v-for="post in allPost" :key="post.id" @mouseover="setCurrentPost(post)" @mouseleave="clearCurrentPost">
        <router-link :to="post.slug">
          <index-thumb-component :post="post"></index-thumb-component>
        </router-link>
      </li>
    </ul>

    <index-bg-component></index-bg-component>
  </div>
</template>

<script>
import IndexBgComponent from '../components/IndexBg.vue';
import IndexThumbComponent from '../components/IndexThumb.vue';

export default {
  components: {
    IndexBgComponent,
    IndexThumbComponent
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
    setCurrentPost(post) {
      return this.$store.dispatch('setCurrentPost', post);
    },

    clearCurrentPost() {
      return this.$store.dispatch('setCurrentPost', {});
    }
  },

  mounted() {
    // ページタイトルを変更
    this.$store.dispatch('changeTitle', '');

    // currentPostDataを空にする(bgをリセット)
    this.clearCurrentPost();

    // 投稿一覧を取得
    this.$store.dispatch('getAllPosts', {per_page:20, offset:0});
  },
};
</script>

<style lang='scss' module>
@import "~bourbon";
@import "~styles/config";
@import "~styles/mixin";

.page {
  margin: 0 $margin_page $margin_page;
  padding-top: 125px;
}

.posts {
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: -60px;
  margin-right: -$margin_post;
  margin-left: -$margin_post;
}

.post {
  width: (100% / 4);
  height: calc((100vw - (#{$margin_page} - #{$margin_post}) * 2) / 4 - #{$margin_post} * 2);
  margin-top: 60px;
  padding: 0 $margin_post;

  a {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
