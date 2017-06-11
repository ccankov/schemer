import { RECEIVE_GRAPH, RECEIVE_CURRENT_USER } from './mutation_types'

export const state = {
  graphJSON: { cells: [] },
  currentUser: null,
  dbName: 'LibaryDB'
}

export const mutations = {
  [RECEIVE_CURRENT_USER] (state, { user }) {
    state.currentUser = user
  },
  [RECEIVE_GRAPH] (state, { graphJSON }) {
    state.graphJSON = graphJSON
  }
}
