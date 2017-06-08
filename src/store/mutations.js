import { RECEIVE_GRAPH } from './mutation_types'

export const state = {
  graphJSON: { cells: [] },
  currentUser: {
    id: 1,
    username: 'brady'
  },
  dbName: 'LibaryDB'
}

export const mutations = {
  [RECEIVE_GRAPH] (state, { graph }) {
    if (typeof graph === 'string') {
      state.graphJSON = JSON.parse(graph)
    } else {
      state.graphJSON = graph.toJSON()
    }
  }
}
