import * as APIUtil from '../util/api_util'
import { RECEIVE_GRAPH, FETCH_GRAPH, UPDATE_GRAPH } from './mutation_types'

export default {
  [FETCH_GRAPH] ({ commit }) {
    return APIUtil.fetchGraph().then(
      graph => commit(RECEIVE_GRAPH, graph)
    )
  },
  [UPDATE_GRAPH] ({ commit }, graph) {
    return APIUtil.updateGraph(graph).then(
      graph => commit(RECEIVE_GRAPH, graph)
    )
  }
}
