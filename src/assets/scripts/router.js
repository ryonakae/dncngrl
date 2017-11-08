'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './pages/Index.vue'
import Page from './pages/Page.vue'
import Single from './pages/Single.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/', component: Index},
  {path: '/:slug', component: Page},
  {path: '/post/:id', component: Single}
]

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    return {x: 0, y: 0}
  }
}

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior,
  linkActiveClass: '',
  linkExactActiveClass: ''
})

export default router
