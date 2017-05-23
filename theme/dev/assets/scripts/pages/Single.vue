<template>
  <div v-if="isCurrentPostExist">
    <div v-if="hasMultipleImage" class="swiper-container" :class="$style.swiperContainer">
      <ul class="swiper-wrapper">
        <li :class="$style.image" class="swiper-slide" v-for="image in currentPost.acf.images" :style="{backgroundImage:'url('+image.image+')'}"></li>
      </ul>
    </div>

    <div v-else :class="$style.image" v-for="image in currentPost.acf.images" :style="{backgroundImage:'url('+image.image+')'}"></div>
  </div>
</template>

<script>
export default {
  computed: {
    currentPost() {
      return this.$store.state.currentPostData;
    },

    isCurrentPostExist() {
      let boolean;

      if (this.currentPost.hasOwnProperty('id')) {
        boolean = true;
      }
      else {
        boolean = false;
      }

      return boolean;
    },

    hasMultipleImage() {
      let boolean;

      if (this.currentPost.acf.images.length > 1) {
        boolean = true;
      }
      else {
        boolean = false;
      }

      return boolean;
    }
  },

  methods: {
    init() {
      this.$store.dispatch('changeTitle', this.currentPost.title.rendered);
      if (this.hasMultipleImage) this.initSwiper();
    },

    initSwiper() {
      console.log('swiper initialized');
      new Swiper('.swiper-container', {
        direction: 'vertical',
        speed: 0,
        spaceBetween: 40,
        simulateTouch: false,
        mousewheelControl: true,
        mousewheelReleaseOnEdges: true
      });
    },

    initKeyUp() {
      $(document).on('keyup.single', (e)=>{
        if (e.keyCode === 27) {
          console.log('esc');
          this.$router.push('/');
          this.resetKeyup();
        }
      });
    },

    resetKeyup() {
      $(document).off('.single');
    }
  },

  mounted() {
    // currentPostDataがある(indexから遷移した時)
    // 通信せずにcurrentPostDataをそのまま使う
    if (this.currentPost.hasOwnProperty('id')) {
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

.swiperContainer {
  width: 100vw;
  height: 100vh;
}

.image {
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 50%;
}
</style>
