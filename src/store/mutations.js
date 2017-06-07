export const RECEIVE_GRAPH = 'RECEIVE_GRAPH'

export const state = {
  graphJSON: { cells: [] },
  currentUser: null
}

export const mutations = {
  [RECEIVE_GRAPH] (state, { graph }) {
    state.graphJSON = graph.toJSON()
  }
}
