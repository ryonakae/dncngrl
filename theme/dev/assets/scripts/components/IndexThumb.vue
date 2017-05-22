<template>
  <div :class="[$style.images, $style.hidden]" class="glitch" @mouseover="initGlitch" @mouseleave="resetGlitch" ref="images">
    <div :class="[$style.image, $style.blue]" class="item blue">
      <img :src="post.acf.images[0].image" class="image" ref="image">
    </div>
    <div :class="[$style.image, $style.green]" class="item green">
      <img :src="post.acf.images[0].image" class="image">
    </div>
    <div :class="[$style.image, $style.red]" class="item red">
      <img :src="post.acf.images[0].image" class="image">
    </div>
  </div>
</template>

<script>
import {resizeManager} from '../app';

export default {
  props: ['post'],

  methods: {
    initGlitch() {
      const random = Math.random(0, 1);
      const $images = $(this.$refs.images);

      if (random < 0.33) {
        $images.addClass('glitchType-a');
      }
      else if (random >= 0.33 && random < 0.66) {
        $images.addClass('glitchType-b');
      }
      else {
        $images.addClass('glitchType-c');
      }
    },

    resetGlitch() {
      $(this.$refs.images)
        .removeClass('glitchType-a')
        .removeClass('glitchType-b')
        .removeClass('glitchType-c');
    },

    resizeImage() {
      const $images = $(this.$refs.images);
      const $image = $(this.$refs.image);
      const aspect = $image.width() / $image.height(); // 1以上だと横長

      // 画像が横長の時
      if (aspect >= 1) {
        $images.find('img').css({
          width: $images.width(),
          height: $images.width() / aspect
        });

        $images.find('.item').css({
          top: '50%',
          marginTop: $images.width() / aspect / -2
        });
      }
      // 画像が縦長の時
      else {
        $images.find('img').css({
          width: $images.height() * aspect,
          height: $images.height()
        });

        $images.find('.item').css({
          left: '50%',
          marginLeft: $images.height() * aspect / -2
        });
      }
    }
  },

  mounted() {
    $(this.$refs.images).imagesLoaded(()=>{
      $(this.$refs.images).removeClass(this.$style.hidden);
      this.resizeImage();

      resizeManager.add(this.resizeImage.bind(this));
    });
  }
};
</script>

<style lang='scss' module>
@import "~bourbon";
@import "~styles/config";
@import "~styles/mixin";

.images {
  width: 100%;
  height: 100%;
  position: relative;

  &.hidden {
    opacity: 0;
    visibility: hidden;
  }
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  // width: 100%;
  // height: 100%;
  mix-blend-mode: difference;

  &.blue {
    background-color: rgb(0,0,255);
  }
  &.green {
    background-color: rgb(0,255,0);
  }
  &.red {
    background-color: rgb(255,0,0);
  }

  img {
    width: 100%;
    height: auto;
    vertical-align: top;
    mix-blend-mode: multiply;
    position: relative;
  }
}
</style>
