<template>
  <div :class="$style.page">
    <ul :class="$style.posts">
      <li :class="$style.post" v-if="hasPosts" v-for="post in posts" :key="post.id">
        <router-link :to="'/post/'+post.id" tag="div" :class="$style.inner">
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
import {scrollManager} from '../app';

export default {
  components: {
    IndexBgComponent,
    IndexThumbComponent
  },

  computed: {
    siteUrl() {
      return this.$store.state.siteUrl;
    },

    posts() {
      return this.$store.state.allPostData;
    },

    hasPosts() {
      return this.posts.length > 0 ? true : false;
    },

    perPage() {
      return this.$store.state.perPage;
    },
  },

  methods: {
    clearCurrentPost() {
      if (this.$route.path === '/') {
        this.$store.dispatch('clearCurrentPost');
      }
    }
  },

  created() {
    // currentPostDataを空にする(bgをリセット)
    this.clearCurrentPost();
  },

  mounted() {
    // ページタイトルを変更
    this.$store.dispatch('changeTitle', '');

    // allPostDataがある(一度indexを表示した時)ときは、通信せずにallPostDataをそのまま使う
    // allPostDataがない時だけgetAllPostsする
    console.log(this.posts.length, this.hasPosts);
    if (!this.hasPosts) {
      this.$store.dispatch('getAllPosts', {per_page:this.perPage, offset:0})
        .then((result)=>{
          this.$store.dispatch('setAllPost', result);
        })
        .then(()=>{
          // infiniteScrollを有効化
          this.$store.dispatch('initInfiniteScroll', {scrollManager: scrollManager});
        });
    }
    else {
      console.log('allPostData already exsist');
    }
  }
};
</script>

<style lang='scss' module>
@import "~bourbon";
@import "~styles/config";
@import "~styles/mixin";

.page {
  margin: 0 $margin_page $margin_page;
  padding-top: 125px;

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
  margin-top: -60px;
  margin-right: -$margin_post;
  margin-left: -$margin_post;

  @include mq($mq_spLarge) {
    margin-top: -30px;
    margin-right: -$margin_post_sp;
    margin-left: -$margin_post_sp;
  }
}

.post {
  width: (100% / 4);
  height: calc((100vw - (#{$margin_page} - #{$margin_post}) * 2) / 4 - #{$margin_post} * 2);
  margin-top: 60px;
  padding: 0 $margin_post;

  .inner {
    display: block;
    width: 100%;
    height: 100%;
    // background-color: #fff;
  }

  @include mq($mq_spLarge) {
    width: (100% / 2);
    height: calc((100vw - (#{$margin_page_sp} - #{$margin_post_sp}) * 2) / 2 - #{$margin_post_sp} * 2);
    margin-top: 30px;
    padding: 0 $margin_post_sp;
  }

  @include mq($mq_spSmall) {
    width: (100% / 1);
    height: calc((100vw - (#{$margin_page_sp} - #{$margin_post_sp}) * 2) / 1 - #{$margin_post_sp} * 2);
  }
}
</style>
