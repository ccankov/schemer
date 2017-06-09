import { RECEIVE_GRAPH, RECEIVE_ERRORS, CLEAR_ERRORS } from './mutation_types'

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
  },
  [RECEIVE_ERRORS] (state, { errors }) {
    state.errors = errors
  },
  [CLEAR_ERRORS] (state) {
    state.errors = []
  }
}
