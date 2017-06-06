import Vue from 'vue'
import Vuex from 'vuex'

import { state, mutations } from './mutations'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  mutations,
  strict: debug
})
