<template>
  <div :class="$style.bg" :style="{backgroundImage:'url('+bgImage+')'}"></div>
</template>

<script>
  export default {
    computed: {
      currentPost () {
        return this.$store.state.currentPostData
      },

      bgImage () {
        let bgImage

        if (this.currentPost.hasOwnProperty('id')) {
          bgImage = this.currentPost.acf.images[0].image.url
        } else {
          bgImage = ''
        }

        return bgImage
      }
    }
  }
</script>

<style lang='scss' module>
@import "~bourbon";
@import "~styles/config";
@import "~styles/mixin";

.bg {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 50%;
  pointer-events: none;
  opacity: 0.45;
}
</style>
