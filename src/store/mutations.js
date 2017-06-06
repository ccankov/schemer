import { merge } from 'lodash'

export const state = {
  graphJSON: { cells: [] },
  counter: 0
}

export const getters = {}

export const mutations = {
  updateGraph (state, { graph }) {
    const graphJSON = merge({}, graph.toJSON())
    state.graphJSON = graphJSON
  },
  incrementCounter (state) {
    state.counter += 1
  }
}
