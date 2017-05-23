<template>
  <article v-if="isCurrentPostExist" ref="article">
    <div v-if="hasMultipleImage" :class="$style.multiImage" class="swiper-container">
      <ul class="swiper-wrapper">
        <li :class="$style.image" class="swiper-slide" v-for="image in post.acf.images" :key="image" :style="{backgroundImage:'url('+image.image+')'}"></li>
      </ul>
    </div>

    <div v-else :class="[$style.singleImage, $style.image]" v-for="image in post.acf.images" :style="{backgroundImage:'url('+image.image+')'}"></div>

    <div :class="$style.text">
      <h1 :class="$style.title">{{post.title.rendered}}</h1>
      <div :class="$style.content" v-if="hasContent" v-html="post.content.rendered"></div>
      <div :class="$style.date">{{post.date | moment}}</div>
      <ul :class="$style.tags" v-if="hasTags">
        <li :class="$style.tag" v-for="tag in tags" :key="tag.id">{{tag.name}}</li>
      </ul>
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
      $article: null,
      swiper: null
    };
  },

  computed: {
    post() {
      return this.$store.state.currentPostData;
    },

    isCurrentPostExist() {
      if (this.post.hasOwnProperty('id')) {
        return true;
      }
      else {
        return false;
      }
    },

    hasMultipleImage() {
      if (this.post.acf.images.length >= 2) {
        return true;
      }
      else {
        return false;
      }
    },

    hasContent() {
      if (this.post.content.rendered !== '') {
        return true;
      }
      else {
        return false;
      }
    },

    hasTags() {
      if (this.post.tags.length >= 1) {
        return true;
      }
      else {
        return false;
      }
    }
  },

  methods: {
    init() {
      this.getTagName(this.post.tags);
      this.$store.dispatch('changeTitle', this.post.title.rendered);

      if (this.hasMultipleImage) {
        this.initSwiper();
        resizeManager.add(this.swiper.update.bind(this));
      }
    },

    initSwiper() {
      console.log('swiper initialized');
      this.swiper = null;
      this.swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        speed: 0,
        spaceBetween: 40,
        simulateTouch: false,
        mousewheelControl: true,
        mousewheelReleaseOnEdges: true,
        touchRatio: 1,
        threshold: 0,
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

    getTagName(tags) {
      tags.forEach((tag)=>{
        this.$store.dispatch('getTagNameById', tag)
        .then((result)=>{
          this.tags.push(result);
        });
      });
    }
  },

  filters: {
    moment(date) {
      return moment(date).format('YYYY');
    }
  },

  mounted() {
    this.$article = $(this.$refs.article);

    // currentPostDataがある(indexから遷移した時)
    // 通信せずにcurrentPostDataをそのまま使う
    if (this.post.hasOwnProperty('id')) {
      this.init();
    }
    // currentPostDataがない場合(url直接叩いたとき)
    // →getPost()実行してcurrentPostDataにデータを入れる
    else {
      this.$store.dispatch('getPost', this.$route.params.slug)
      .then(()=>{
        this.init();
      });
    }

    // キーボードイベント監視開始
    this.initKeyUp();
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
}

.title {
  font-size: $fontSize_h1;
}

.content {
  margin-top: 30px;
}

.date {
  font-size: $fontSize_small;
  margin-top: 30px;
}

.tags {
  margin-top: -2px;
  pointer-events: auto;
}

.tag {
  display: inline;
  font-size: $fontSize_small;

  &:before {
    content: ', ';
  }
  &:first-child:before {
    content: '';
  }
}
</style>
