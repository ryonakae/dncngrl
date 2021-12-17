<template>
  <div
    ref="glitch"
    :class="[$style.images, $style.hidden]"
    class="glitch"
    @mouseenter="initGlitch"
    @mouseleave="resetGlitch"
    @touchstart="initGlitch"
    @touchend="resetGlitch"
  >
    <img :src="originalImage" :class="$style.originalImage" />

    <div class="glitch-item red">
      <img :src="thumbnail" :class="$style.image" class="glitch-image" />
    </div>
    <div class="glitch-item green">
      <img :src="thumbnail" :class="$style.image" class="glitch-image" />
    </div>
    <div class="glitch-item blue">
      <img :src="thumbnail" :class="$style.image" class="glitch-image" />
    </div>
  </div>
</template>

<script>
import imagesLoaded from 'imagesloaded'

export default {
  props: ['post'],

  data() {
    return {
      $glitch: null,
      thumbnail: this.post.acf.images[0].image.sizes.thumbnail,
      originalImage: this.post.acf.images[0].image.url
    }
  },

  mounted() {
    this.$glitch = $(this.$refs.glitch)

    imagesLoaded(this.$glitch, instance => {
      this.resizeImage()
      this.$resizeManager.add(this.resizeImage.bind(this))

      this.$glitch.removeClass(this.$style.hidden)
      // this.initGlitch()
      // setTimeout(this.resetGlitch.bind(this), 200)
    })
  },

  methods: {
    initGlitch() {
      const random = Math.random()

      if (random < 0.33) {
        this.$glitch.addClass('pattern-1')
      } else if (random >= 0.33 && random < 0.66) {
        this.$glitch.addClass('pattern-2')
      } else {
        this.$glitch.addClass('pattern-3')
      }
    },

    resetGlitch() {
      this.$glitch
        .removeClass('pattern-1')
        .removeClass('pattern-2')
        .removeClass('pattern-3')
    },

    resizeImage() {
      const $image = $(this.$glitch.find('.glitch-image')[0])
      const aspect = $image.width() / $image.height() // 1以上だと横長

      // 画像が横長の時
      if (aspect >= 1) {
        this.$glitch.find('.glitch-item').css({
          top: '50%',
          marginTop: Math.round(this.$glitch.width() / aspect / -2)
        })
        this.$glitch.find('.glitch-image').css({
          width: Math.round(this.$glitch.width()),
          height: Math.round(this.$glitch.width() / aspect)
        })
      } else {
        // 画像が縦長の時
        this.$glitch.find('.glitch-item').css({
          left: '50%',
          marginLeft: Math.round((this.$glitch.height() * aspect) / -2)
        })
        this.$glitch.find('.glitch-image').css({
          width: Math.round(this.$glitch.height() * aspect),
          height: Math.round(this.$glitch.height())
        })
      }
    }
  }
}
</script>

<style lang="scss" module>
@import 'bourbon';
@import '~/assets/styles/config';
@import '~/assets/styles/mixin';

.images {
  width: 100%;
  height: 100%;

  &.hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
}

.image {
  width: 100%;
  height: auto;
  position: relative;
  pointer-events: none;
}

.originalImage {
  display: none;
  visibility: hidden;
  pointer-events: none;
}
</style>
