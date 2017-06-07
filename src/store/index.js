import Vue from 'vue'
import Vuex from 'vuex'

import { state, mutations } from './mutations'
import actions from './actions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  strict: debug
})
