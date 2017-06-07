import { RECEIVE_GRAPH } from './mutation_types'

export const state = {
  graphJSON: { cells: [] },
  currentUser: {
    id: 1,
    username: 'brady'
  }
}

export const mutations = {
  [RECEIVE_GRAPH] (state, { graph }) {
    if (graph.cells) {
      state.graphJSON = graph
    } else {
      state.graphJSON = graph.toJSON()
    }
  }
}
