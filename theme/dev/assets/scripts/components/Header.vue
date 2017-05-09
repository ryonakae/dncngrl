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
}

.logo {
  float: left;
  margin-top: 40px;
  margin-left: 40px;

  a {
    display: block;
    @include hide-text;
    @include retina-sprite($logo-group);
  }
}
</style>