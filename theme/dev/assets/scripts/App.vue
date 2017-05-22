<template>
  <div id="app">
    <header-component></header-component>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderComponent from './components/Header.vue';

// import, initialize and export manager
import {utilManager} from './app';
import {resizeManager} from './app';
import {scrollManager} from './app';

export default {
  components: {
    HeaderComponent
  },

  methods: {
    init() {
      // ページタイトルを変更
      this.$store.dispatch('changeTitle', '');

      // デバイスによってbodyにaddClass
      if (utilManager.getDevice() === 'pc') {
        $('body').addClass('is-pc');
      }
      else if (utilManager.getDevice() === 'tablet') {
        $('body').addClass('is-tablet');
      }
      else if (utilManager.getDevice() === 'mobile') {
        $('body').addClass('is-mobile');
      }
    }
  },

  created() {
    this.init();
  }
};
</script>

<style lang='scss'>
@import "~styles/base";
</style>
