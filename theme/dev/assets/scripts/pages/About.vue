<template>
  <div class="page">
    <h2 class="title">{{pageTitle}}</h2>
    <p>あばうと</p>
    <router-link :to="'/'">Index</router-link>
  </div>
</template>

<script>
export default {
  computed: {
    pageTitle() {
      return this.$store.state.pageTitle;
    }
  },

  mounted() {
    this.$store.dispatch('changeTitle', 'ABOUT');
  }
};
</script>

<style lang='scss' scoped>
@import "bourbon";
@import "~styles/config";
@import "~styles/mixin";

.title {
  font-size: 3.2rem;
  transition: all $duration_quick ease;
}
</style>