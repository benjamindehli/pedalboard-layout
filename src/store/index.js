import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import effects from '../data/effects'

Vue.use(Vuex);

const state = {
	instruments: [],
  effects: effects.effects,
  effectManufacturers: effects.effectManufacturers
}

const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})

export default store