<template>
  <div :class="$style.images" class="glitch" @mouseover="setCurrentPost(post)" @mouseleave="clearCurrentPost()">
    <div :class="[$style.image, $style.blue]" class="item blue">
      <img :src="post.acf.images[0].image" class="image">
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
export default {
  props: ['post'],

  methods: {
    setCurrentPost(post) {
      return this.$store.dispatch('setCurrentPost', post);
    },

    clearCurrentPost() {
      return this.$store.dispatch('setCurrentPost', {});
    }
  },
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
  }
}
</style>
