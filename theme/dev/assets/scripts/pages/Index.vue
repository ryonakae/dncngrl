<template>
  <div class="page">
    <h2 :class="$style.title">{{pageTitle}}</h2>
    <div>{{postData}}</div>
    <router-link :to="'/about'">About</router-link>
  </div>
</template>

<script>
export default {
  computed: {
    pageTitle() {
      return this.$store.state.pageTitle;
    },
    postData() {
      return this.$store.state.postData;
    }
  },

  mounted() {
    this.$store.dispatch('changeTitle', '');
    this.$store.dispatch('getPosts');
    console.log(this.postData);
  }
};
</script>

<style lang='scss' module>
@import "bourbon";
@import "~styles/config";
@import "~styles/mixin";

.title {
  font-size: 3.2rem;
  transition: all $duration_quick ease;
}
</style>