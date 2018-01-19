import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Style from './style/main.scss'
import * as quark from 'quark-gui'

import Home from './pages/Home.vue'
import Instruments from './pages/Instruments.vue'
import Instrument from './pages/Instrument.vue'
import Effects from './pages/Effects.vue'
import EffectManufacturer from './pages/EffectManufacturer.vue'
import Effect from './pages/Effect.vue'

Vue.use(VueRouter);

const routes = [
	{ path: '/', component: Home },
	{ path: '/instruments', component: Instruments },
	{ path: '/instruments/:instrumentsId', component: Instrument },
	{ path: '/effects', component: Effects },
	{ path: '/effects/:effectManufacturerId', component: EffectManufacturer },
	{ path: '/effects/:effectManufacturerId/:effectId', component: Effect }
];

const router = new VueRouter({
	routes,
	mode: 'history'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

quark.Init.default();
