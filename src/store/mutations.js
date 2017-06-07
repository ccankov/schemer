export const state = {
  graphJSON: { cells: [] },
  currentUser: null
}

export const mutations = {
  receiveGraph (state, { graph }) {
    state.graphJSON = graph.toJSON()
  },
  receiveCurrentUser (state, { currentUser }) {
    state.currentUser = currentUser
  },
  removeCurrentUser (state) {
    state.currentUser = null
  }
}
