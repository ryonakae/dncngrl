'use strict';

// import, initialize and export manager
import UtilManager from './manager/UtilManager';
import ResizeManager from './manager/ResizeManager';
import ScrollManager from './manager/ScrollManager';
export const utilManager = new UtilManager();
export const resizeManager = new ResizeManager();
export const scrollManager = new ScrollManager({
  resizeManager: resizeManager,
  utilManager: utilManager,
  nameSpace: 'scrollManager'
});

// import vue library
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// import pages
import App from './App.vue';
import Index from './pages/Index.vue';
import About from './pages/About.vue';
import Single from './pages/Single.vue';

// import vuex store
import store from './store';

// detect routes
const routes = [
  {path:'/', component: Index},
  {path:'/about', component: About},
  {path:'/post/:id', component: Single}
];

// router initialize
const router = new VueRouter({
  app: App,
  mode: 'history',
  saveScrollPosition: false,
  routes: routes
});

// create app
const app = new Vue({
  router: router,
  el: '#app',
  store: store,
  render: (h) => h(App)
});

// Hot Module Replacementに対応させる
if (module.hot) module.hot.accept();
