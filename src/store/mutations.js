import { RECEIVE_GRAPH } from './mutation_types'

export const state = {
  graphJSON: { cells: [] },
  currentUser: {
    id: 1,
    username: 'brady'
  },
  dbName: 'LibaryDB',
  errors: ['Learn some SQL']
}

export const mutations = {
  [RECEIVE_GRAPH] (state, { graphJSON }) {
    state.graphJSON = graphJSON
  }
}
