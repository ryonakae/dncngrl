<template>
  <header :class="$style.header">
    <h1 :class="$style.logo">
      <router-link :to="'/'">Dancing Girl.</router-link>
    </h1>

    <ul :class="[$style.navi, $style.hidden]" ref="navi">
      <router-link :to="'/about'" tag="li" :class="$style.naviItem">ABOUT</router-link>
    </ul>
  </header>
</template>

<script>
export default {
  mounted() {
    $(this.$refs.navi).removeClass(this.$style.hidden);
  }
};
</script>

<style lang='scss' module>
@import "~bourbon";
@import "~styles/config";
@import "~styles/mixin";
@import "~styles/sprite";

.header {
  @include clearfix;
  position: fixed;
  z-index: 3;
  top: $margin_page;
  left: 0;
  width: 100%;
  padding-left: $margin_page;
  padding-right: $margin_page;
  mix-blend-mode: exclusion;
  pointer-events: none;

  @include mq($mq_spLarge) {
    top: $margin_page_sp;
    padding-left: $margin_page_sp;
    padding-right: $margin_page_sp;
  }
}

.logo {
  float: left;
  pointer-events: auto;

  a {
    display: block;
    @include hide-text;
    @include retina-sprite($logo-group);
  }
}

.navi {
  float: right;
  margin-top: 11px;

  &.hidden {
    opacity: 0;
    visibility: hidden;
  }
}

.naviItem {
  pointer-events: auto;
  display: inline;
  margin-left: 30px;

  &:first-child {
    margin-left: 0;
  }
}
</style>
