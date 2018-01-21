import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Style from './style/main.scss'
import * as quark from 'quark-gui'

import routes from './routes'
import store from './store'

Vue.use(VueRouter);

const router = new VueRouter({
	routes,
	mode: 'history'
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

quark.Init.default();
