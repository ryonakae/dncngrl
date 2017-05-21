<template>
  <div>
    <ul :class="$style.images">
      <li :class="$style.image" v-for="image in currentPost.acf.images" :style="{backgroundImage:'url('+image.image+')'}"></li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    currentPost() {
      return this.$store.state.currentPostData;
    }
  },

  mounted() {
    console.log('currentPostData', this.currentPost.hasOwnProperty('id'));

    // currentPostDataがある(indexから遷移した時)
    // 通信せずにcurrentPostDataをそのまま使う
    if (this.currentPost.hasOwnProperty('id')) {
      this.$store.dispatch('changeTitle', this.currentPost.title.rendered);
    }
    // currentPostDataがない場合(url直接叩いたとき)
    // →getPost()実行してcurrentPostDataにデータを入れる
    else {
      this.$store.dispatch('getPost', this.$route.params.slug)
      .then(this.$store.dispatch('changeTitle', this.currentPost.title.rendered));
    }
  }
};
</script>

<style lang='scss' module>
@import "~bourbon";
@import "~styles/config";
@import "~styles/mixin";

.image {
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 50%;
}
</style>
