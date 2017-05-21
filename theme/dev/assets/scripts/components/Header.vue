<template>
  <header :class="$style.header">
    <h1 :class="$style.logo">
      <router-link :to="'/'">Dancing Girl.</router-link>
    </h1>
  </header>
</template>

<script>
export default {
};
</script>

<style lang='scss' module>
@import "bourbon";
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
}

.logo {
  float: left;

  a {
    display: block;
    @include hide-text;
    @include retina-sprite($logo-group);
  }
}
</style>
