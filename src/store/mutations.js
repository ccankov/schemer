import { RECEIVE_GRAPH } from './mutation_types'

export const state = {
  graphJSON: { cells: [] },
  currentUser: null
}

export const mutations = {
  [RECEIVE_GRAPH] (state, { graph }) {
    state.graphJSON = graph.toJSON()
  }
}
