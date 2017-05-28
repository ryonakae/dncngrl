<template>
  <article v-if="hasPost" :class="$style.article">
    <div v-if="hasMultipleImage" :class="$style.multiImage" class="swiper-container" ref="container">
      <ul class="swiper-wrapper" @click="backByClick">
        <li :class="$style.image" class="swiper-slide" v-for="image in post.acf.images" :key="image" :style="{backgroundImage:'url('+image.image+')'}"></li>
      </ul>

      <div :class="$style.pagination" class="swiper-pagination" ref="pagination"></div>
    </div>

    <div v-else :class="[$style.singleImage, $style.image]" :style="{backgroundImage:'url('+post.acf.images[0].image+')'}" @click="backByClick"></div>

    <div :class="$style.text">
      <h1 :class="$style.title" v-html="post.title.rendered"></h1>
      <div :class="$style.content" v-if="hasContent" v-html="post.content.rendered"></div>
      <div :class="$style.info">
        <div :class="$style.date">{{post.date | moment}}</div>
        <ul :class="[$style.tags, $style.hidden]" v-if="hasTags" ref="tags">
          <li :class="$style.tag" v-for="tag in tags" :key="tag.id">{{tag.name}}</li>
        </ul>
      </div>
    </div>
  </article>
</template>

<script>
import moment from 'moment';
import {resizeManager} from '../app';

export default {
  data() {
    return {
      tags: [],
      swiper: null,
      fromPath: ''
    };
  },

  computed: {
    post() {
      return this.$store.state.currentPostData;
    },

    hasPost() {
      return Object.keys(this.post).length > 0 ? true : false;
    },

    hasMultipleImage() {
      return this.post.acf.images.length >= 2 ? true : false;
    },

    hasContent() {
      return this.post.content.rendered !== '' ? true : false;
    },

    hasTags() {
      return this.post.tags.length >= 1 ? true : false;
    }
  },

  methods: {
    init() {
      this.$store.dispatch('changeTitle', this.post.title.rendered);

      // 画像が複数枚ある時はSwiperを初期化する
      if (this.hasMultipleImage) {
        this.initSwiper();
        resizeManager.add(this.swiper.update.bind(this));
      }

      // タグがある場合はgetTagName()してからテキストを表示
      if (this.hasTags) {
        this.getTagName(this.post.tags)
          .then(()=>{
            console.log('getTagName done');
            this.showTags();
          });
      }
    },

    initSwiper() {
      console.log('swiper initialized');
      this.swiper = new Swiper(this.$refs.container, {
        direction: 'vertical',
        speed: 0,
        spaceBetween: 40,
        simulateTouch: false,
        mousewheelControl: true,
        touchRatio: 1,
        threshold: 1,
        longSwipesMs: 600,
        followFinger: false,
        pagination: this.$refs.pagination,
        paginationType: 'fraction'
      });
    },

    getTagName(tags) {
      return new Promise((resolve, reject)=>{
        tags.forEach((tagId, index)=>{
          this.$store.dispatch('getTagName', tagId)
          .then((result)=>{
            // 管理画面で追加した順番にタグを配列に追加
            this.tags.splice(index, 0, result);

            // ループの最後
            if (tags.length === index+1) {
              resolve();
            }
          });
        });
      });
    },

    showTags() {
      $(this.$refs.tags).removeClass(this.$style.hidden);
    },

    backByClick() {
      let toPath;

      if (this.fromPath !== '') {
        toPath = this.fromPath;
      }
      else {
        toPath = '/';
      }

      this.$router.push(toPath);
    }
  },

  filters: {
    moment(date) {
      return moment(date).format('YYYY');
    }
  },

  beforeRouteEnter(to, from, next) {
    next((vm)=>{
      vm.fromPath = from.path;
      vm.$store.dispatch('backByEsc', from);
    });
  },

  mounted() {
    // currentPostDataがある(indexから遷移した時)
    // 通信せずにcurrentPostDataをそのまま使う
    if (this.hasPost) {
      this.init();
    }
    // currentPostDataがない場合(url直接叩いたとき)
    // →getPost()実行してcurrentPostDataにデータを入れる
    else {
      this.$store.dispatch('getPost', this.$route.params.id)
      .then((result)=>{
        return this.$store.dispatch('setCurrentPost', result);
      })
      .then(()=>{
        return this.init();
      });
    }
  }
};
</script>

<style lang='scss' module>
@import "~bourbon";
@import "~styles/config";
@import "~styles/mixin";
@import "~styles/extend";


%fixedImage {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

%containBg {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 50%;
}

.article {
  cursor: url("~images/cursor_close.png") 9 9, auto;
  cursor: -webkit-image-set(
    url("~images/cursor_close.png") 1x,
    url("~images/cursor_close-2x.png") 2x
  ) 9 9, auto;
}

.multiImage {
  @extend %fixedImage;

  .image {
    @extend %containBg;
  }

  .pagination {
    position: fixed;
    bottom: $margin_page - 8px;
    right: $margin_page;
    z-index: 2;
    font-size: $fontSize_small;
    mix-blend-mode: exclusion;
    pointer-events: none;

    @include mq($mq_spLarge) {
      bottom: $margin_page_sp - 4px;
      right: $margin_page_sp;
      font-size: $fontSize_small_sp;
    }
  }
}

.singleImage {
  @extend %fixedImage;
  @extend %containBg;
}

.text {
  position: fixed;
  bottom: $margin_page - 8px;
  left: $margin_page;
  z-index: 2;
  width: 50%;
  mix-blend-mode: exclusion;
  pointer-events: none;

  @include mq($mq_spLarge) {
    width: 100%;
    bottom: $margin_page_sp - 4px;
    left: 0;
    padding-left: $margin_page_sp;
    padding-right: $margin_page_sp;
  }
}

.title {
  @extend %title;
}

.content {
  margin-top: 20px;
  @extend %content;

  @include mq($mq_spLarge) {
    margin-top: 13px;
  }
}

.info {
  font-size: $fontSize_small;
  margin-top: 20px;

  @include mq($mq_spLarge) {
    width: 85%;
    margin-top: 13px;
    font-size: $fontSize_small_sp;
  }
}

.date {
  display: inline;
}

.tags {
  display: inline;
  margin-left: 8px;

  &.hidden {
    opacity: 0;
    visibility: hidden;
  }
}

.tag {
  display: inline;

  &:before {
    content: ", ";
  }
  &:first-child:before {
    content: "";
  }
}
</style>
