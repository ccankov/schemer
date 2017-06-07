export const state = {
  graphJSON: '',
  counter: 0
}

export const getters = {}

export const mutations = {
  updateGraph (state, { graph }) {
    state.graphJSON = graph.toJSON()
  },
  incrementCounter (state) {
    state.counter += 1
  }
}
