<template>
  <div :class="$style.page">
    <ul :class="$style.posts">
      <li :class="$style.post" v-if="hasPosts" v-for="post in posts" :key="post.id" @mouseenter="setCurrentPost(post)" @mouseleave="clearCurrentPost" @touchstart="setCurrentPost(post)" @touchend="clearCurrentPost">
        <NuxtLink :to="'/post/'+post.id" tag="div" :class="$style.inner">
          <index-thumb-component :post="post"></index-thumb-component>
        </NuxtLink>
      </li>
    </ul>

    <index-bg-component></index-bg-component>
  </div>
</template>

<script>
import IndexBgComponent from '../components/IndexBg.vue'
import IndexThumbComponent from '../components/IndexThumb.vue'
import {scrollManager} from '../app'

export default {
  components: {
    IndexBgComponent,
    IndexThumbComponent
  },

  computed: {
    siteUrl () {
      return this.$store.state.siteUrl
    },

    posts () {
      return this.$store.state.allPostData
    },

    hasPosts () {
      return this.posts.length > 0
    },

    perPage () {
      return this.$store.state.perPage
    }
  },

  methods: {
    setCurrentPost (post) {
      if (this.$route.path === '/') {
        this.$store.dispatch('setCurrentPost', post)
      }
    },

    clearCurrentPost () {
      if (this.$route.path === '/') {
        this.$store.dispatch('clearCurrentPost')
      }
    }
  },

  created () {
    // currentPostDataを空にする(bgをリセット)
    this.clearCurrentPost()
  },

  mounted () {
    // ページタイトルを変更
    this.$store.dispatch('changeTitle', '')

    // allPostDataがある(一度indexを表示した時)ときは、通信せずにallPostDataをそのまま使う
    // allPostDataがない時だけgetAllPostsする
    console.log(this.posts.length, this.hasPosts)
    if (!this.hasPosts) {
      this.$store.dispatch('getAllPosts', {per_page: this.perPage, offset: 0})
        .then((result) => {
          this.$store.dispatch('setAllPost', result)
        })
        .then(() => {
          // infiniteScrollを有効化
          this.$store.dispatch('initInfiniteScroll', {
            scrollManager: scrollManager,
            path: '/'
          })
        })
    } else {
      console.log('allPostData already exsist')
    }
  }
}
</script>

<style lang='scss' module>
@import "~bourbon";
@import "~styles/config";
@import "~styles/mixin";

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
  width: (100% / 5);
  height: calc((#{$max_page_width} - (#{$margin_page} - #{$margin_post}) * 2) / 5 - #{$margin_post} * 2 + 60px);
  // margin-top: 60px;
  padding: (60px/2) $margin_post;

  .inner {
    display: block;
    width: 100%;
    height: 100%;
    // background-color: #fff;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    cursor: pointer;
  }

  @include mq($mq_pcXLarge) {
    height: calc((100vw - (#{$margin_page} - #{$margin_post}) * 2) / 5 - #{$margin_post} * 2 + 60px);
  }

  @include mq($mq_pcLarge) {
    width: (100% / 4);
    height: calc((100vw - (#{$margin_page} - #{$margin_post}) * 2) / 4 - #{$margin_post} * 2 + 60px);
  }

  @include mq($mq_tabletLarge) {
    width: (100% / 3);
    height: calc((100vw - (#{$margin_page} - #{$margin_post}) * 2) / 3 - #{$margin_post} * 2 + 60px);
  }

  @include mq($mq_spLarge) {
    width: (100% / 2);
    height: calc((100vw - (#{$margin_page_sp} - #{$margin_post_sp}) * 2) / 2 - #{$margin_post_sp} * 2 + 30px);
    // margin-top: 30px;
    padding: (30px/2) $margin_post_sp;
  }

  @include mq($mq_spSmall) {
    width: (100% / 1);
    height: calc((100vw - (#{$margin_page_sp} - #{$margin_post_sp}) * 2) / 1 - #{$margin_post_sp} * 2 + 30px);
  }
}
</style>
