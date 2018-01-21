import Home from './pages/Home.vue'
import Instruments from './pages/Instruments.vue'
import Instrument from './pages/Instrument.vue'
import Effects from './pages/Effects.vue'
import EffectManufacturer from './pages/EffectManufacturer.vue'
import Effect from './pages/Effect.vue'

const routes = [
	{ path: '/', component: Home },
	{ path: '/instruments', component: Instruments },
	{ path: '/instruments/:instrumentsId', component: Instrument },
	{ path: '/effects', component: Effects },
	{ path: '/effects/:effectManufacturerId', component: EffectManufacturer },
	{ path: '/effects/:effectManufacturerId/:effectId', component: Effect }
];

export default routes;