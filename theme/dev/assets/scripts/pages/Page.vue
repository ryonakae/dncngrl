<template>
  <article :class="[$style.page, $style.hidden]" v-if="hasPage" ref="page">
    <h1 :class="$style.title">{{page.title.rendered.toUpperCase()}}</h1>
    <div :class="$style.content" v-html="page.content.rendered"></div>
  </article>
</template>

<script>
export default {
  data() {
    return {
      page: {}
    };
  },

  computed: {
    hasPage() {
      return Object.keys(this.page).length > 0 ? true : false;
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm)=>{
      vm.$store.dispatch('backByEsc', from);
    });
  },

  mounted() {
    this.$store.dispatch('getPage', this.$route.params.slug)
    .then((result)=>{
      this.page = result;
      this.$store.dispatch('changeTitle', result.title.rendered.toUpperCase());
    })
    .then(()=>{
      setTimeout(()=>{
        // コンテンツを表示
        $(this.$refs.page).removeClass(this.$style.hidden);
      }, 10);
    });
  }
};
</script>

<style lang='scss' module>
@import "~bourbon";
@import "~styles/config";
@import "~styles/mixin";
@import "~styles/extend";

.page {
  margin: 0 $margin_page $margin_page;
  padding-top: 185px;

  &.hidden {
    opacity: 0;
    visibility: hidden;
  }

  @include mq($mq_spLarge) {
    margin-right: $margin_page_sp;
    margin-left: $margin_page_sp;
    padding-top: 125px;
  }
}

.title {
  @extend %title;
}

.content {
  margin-top: 30px;
  width: 50%;
  @extend %content;

  @include mq($mq_spLarge) {
    width: 100%;
  }
}
</style>
