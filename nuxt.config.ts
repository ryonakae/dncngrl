import { defineNuxtConfig } from 'nuxt3'
import * as Sass from 'sass'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  build: {
    loaders: {
      scss: {
        implementation: Sass
      }
    }
  }
})
