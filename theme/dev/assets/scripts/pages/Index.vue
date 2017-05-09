<template>
  <div class="page">
    <h2 :class="$style.title">{{pageTitle}}</h2>
    <p>親譲りの無鉄砲で小供の時から損ばかりしている。</p>
    <p>小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。新築の二階から首を出していたら、同級生の一人が冗談に、いくら威張っても、そこから飛び降りる事は出来まい。</p>
    <p>「弱虫やーい。」と囃したからである。小使に負ぶさって帰って来た時、おやじが大きな眼をして二階ぐらいから飛び降りて腰を抜かす奴があるかと云ったから、この次は抜かさずに飛んで見せますと答えた。（青空文庫より）</p>
    <router-link :to="'/about'">About</router-link>
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
    this.$store.dispatch('changeTitle', '');
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