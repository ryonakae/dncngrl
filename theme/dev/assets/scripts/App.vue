<template>
  <div id="app">
    <header-component></header-component>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderComponent from './components/Header.vue';

export default {
  components: {
    HeaderComponent
  },

  created() {
    this.$store.dispatch('changeTitle', '');
  }
};
</script>

<style lang='scss'>
  @import "~styles/base";
</style>