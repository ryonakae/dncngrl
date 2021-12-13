import { Util } from '~/plugins/util'

declare module 'vue/types/vue' {
  interface Vue {
    $util: Util
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $util: Util
  }
}
