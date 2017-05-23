<template>
  <header :class="$style.header">
    <h1 :class="$style.logo">
      <router-link :to="'/'">Dancing Girl.</router-link>
    </h1>

    <navi :class="[$style.navi, $style.hidden]" ref="navi">
      <ul>
        <router-link :to="'/about'" tag="li" :class="$style.naviItem">ABOUT</router-link>
        <li :class="$style.naviItem">TAG</li>
      </ul>
    </navi>
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
  top: 40px;
  left: 0;
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  mix-blend-mode: exclusion;
  pointer-events: none;
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
