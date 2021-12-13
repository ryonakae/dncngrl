import { defineNuxtConfig } from '@nuxt/bridge'
import * as Sass from 'sass'

// https://dev.to/tbeseda/use-bourbon-sass-in-a-vue-cli-project-1i2d
const bourbon = require('bourbon')
const bourbonPaths = [...bourbon.includePaths]

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  build: {
    loaders: {
      scss: {
        implementation: Sass,
        sassOptions: {
          includePaths: bourbonPaths
        }
      }
    }
  },
  target: 'static',
  typescript: {
    strict: true
  }
})
