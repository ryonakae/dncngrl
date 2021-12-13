<template>
  <div id="app">
    <HeaderComponent />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import HeaderComponent from './components/Header.vue'
import { defineComponent } from '#app'

export default defineComponent({
  name: 'DefaultLayout',

  components: {
    HeaderComponent
  }
})
</script>

<style lang="scss">
@import 'assets/styles/_base';
</style>
