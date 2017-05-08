'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// import pages
import App from './App.vue';
import Index from './pages/Index.vue';
import About from './pages/About.vue';

// detect routes
const routes = [
  {path:'/', component: Index},
  {path:'/about', component: About}
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
  render: (h) => h(App)
});

// mount app
// app.$mount('#app');