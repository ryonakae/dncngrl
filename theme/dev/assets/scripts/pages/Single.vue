<template>
  <article v-if="hasPost">
    <div v-if="hasMultipleImage" :class="$style.multiImage" class="swiper-container" ref="container">
      <ul class="swiper-wrapper">
        <li :class="$style.image" class="swiper-slide" v-for="image in post.acf.images" :key="image" :style="{backgroundImage:'url('+image.image+')'}"></li>
      </ul>
    </div>

    <div v-else :class="[$style.singleImage, $style.image]" :style="{backgroundImage:'url('+post.acf.images[0].image+')'}"></div>

    <div :class="[$style.text, $style.hidden]" ref="text">
      <h1 :class="$style.title">{{post.title.rendered}}</h1>
      <div :class="$style.content" v-if="hasContent" v-html="post.content.rendered"></div>
      <div :class="$style.info">
        <div :class="$style.date">{{post.date | moment}}</div>
        <ul :class="$style.tags" v-if="hasTags">
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
      swiper: null
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
        this.getTagName(this.post.tags, ()=>{
          console.log('getTagName done');
          this.showText();
        });
      }
      else {
        this.showText();
      }

      // キーボードイベント監視開始
      this.initKeyUp();
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
        followFinger: false
      });
    },

    initKeyUp() {
      $(document).on('keyup.single', (e)=>{
        if (e.keyCode === 27) {
          this.$router.push('/');
          $(document).off('.single');
        }
      });
    },

    getTagName(tags, callback) {
      tags.forEach((tag, index)=>{
        this.$store.dispatch('getTagName', tag)
        .then((result)=>{
          this.tags.push(result);

          // ループの最後
          if (tags.length === index+1) {
            callback();
          }
        });
      });
    },

    showText() {
      $(this.$refs.text).removeClass(this.$style.hidden);
    }
  },

  filters: {
    moment(date) {
      return moment(date).format('YYYY');
    }
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
      .then(()=>{
        this.init();
      });
    }
  }
};
</script>

<style lang='scss' module>
@import "~bourbon";
@import "~styles/config";
@import "~styles/mixin";


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

.multiImage {
  @extend %fixedImage;

  .image {
    @extend %containBg;
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

  &.hidden {
    opacity: 0;
    visibility: hidden;
  }

  @include mq($mq_spLarge) {
    width: 100%;
    bottom: $margin_page_sp - 4px;
    left: 0;
    padding-left: $margin_page_sp;
    padding-right: $margin_page_sp;
  }
}

.title {
  font-size: $fontSize_h1;
}

.content {
  margin-top: 20px;

  @include mq($mq_spLarge) {
    margin-top: 13px;
  }
}

.info {
  pointer-events: auto;
  font-size: $fontSize_small;
  margin-top: 20px;

  @include mq($mq_spLarge) {
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
}

.tag {
  display: inline;

  &:before {
    content: ', ';
  }
  &:first-child:before {
    content: '';
  }
}
</style>
