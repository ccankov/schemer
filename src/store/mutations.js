// import joint from 'jointjs'
import { merge } from 'lodash'

export const state = {
  graphJSON: { cells: [] },
  counter: 0
}

export const getters = {}

export const mutations = {
  updateGraph (state, { graph }) {
    state.graphJSON = merge(state.graphJSON, graph.toJSON())
  },
  incrementCounter (state) {
    state.counter += 1
  }
}
