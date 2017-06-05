import joint from 'jointjs'

export const state = {
  graph: new joint.dia.Graph(),
  getters: {
    graphJSON: ({ graph }) => JSON.parse(graph.toJSON())
  }
}

export const mutations = {}
