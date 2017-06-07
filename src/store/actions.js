// import * as APIUtil from '../../util/api_util'
import { RECEIVE_GRAPH } from './mutations'

export default {
  fetchGraph ({ commit }) {
    commit(RECEIVE_GRAPH)
  }
}
