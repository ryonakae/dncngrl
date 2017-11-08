'use strict'

import Util from './manager/Util'
import ResizeManager from './manager/ResizeManager'
import ScrollManager from './manager/ScrollManager'

import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'

const util = new Util()
const resizeManager = new ResizeManager()
const scrollManager = new ScrollManager({
  resizeManager: resizeManager,
  util: util,
  nameSpace: 'scrollManager'
})

export {util, resizeManager, scrollManager}

const app = new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})

// Hot Module Replacement
if (module.hot) module.hot.accept()
