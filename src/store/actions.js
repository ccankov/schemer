import * as APIUtil from '../util/api_util'
import { RECEIVE_GRAPH, FETCH_GRAPH, UPDATE_GRAPH } from './mutation_types'

export default {
  [FETCH_GRAPH] ({ commit, state }) {
    return APIUtil.fetchGraph(state.currentUser.id).then(
      graph => commit(RECEIVE_GRAPH, graph)
    )
  },
  [UPDATE_GRAPH] ({ commit }, { graph }) {
    return APIUtil.updateGraph(graph.toJSON()).then(
      graph => commit(RECEIVE_GRAPH, graph)
    )
  }
}
