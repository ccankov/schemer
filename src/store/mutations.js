import { RECEIVE_GRAPH } from './mutation_types'

export const state = {
  graphJSON: { cells: [] },
  currentUser: {
    id: 1,
    username: 'brady'
  },
  dbName: 'LibaryDB',
  errors: ['Dont do that']
}

export const mutations = {
  [RECEIVE_GRAPH] (state, { graphJSON }) {
    state.graphJSON = graphJSON
  }
}
