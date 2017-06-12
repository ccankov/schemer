import * as APIUtil from '../util/api_util'
import {
  RECEIVE_GRAPH,
  FETCH_GRAPH,
  UPDATE_GRAPH,
  LOGIN,
  LOGOUT,
  SIGNUP,
  FETCH_USER,
  RECEIVE_CURRENT_USER,
  RECEIVE_ERRORS
} from './mutation_types'

export default {
  [SIGNUP] ({ commit }, { user }) {
    return APIUtil.signup(user)
      .then(
        user => commit(RECEIVE_CURRENT_USER, user),
        err => commit(RECEIVE_ERRORS, err)
      )
  },
  [LOGIN] ({ commit }, { user }) {
    return APIUtil.login(user)
      .then(
        user => commit(RECEIVE_CURRENT_USER, user),
        err => commit(RECEIVE_ERRORS, err.responseJSON)
      )
  },
  [LOGOUT] ({ commit }) {
    return APIUtil.logout()
      .then(() => commit(RECEIVE_CURRENT_USER, { user: null }))
  },
  [FETCH_USER] ({ commit }) {
    return APIUtil.fetchUser()
      .then(user => commit(RECEIVE_CURRENT_USER, user))
  },
  [FETCH_GRAPH] ({ commit, state }) {
    return APIUtil.fetchGraph(state.currentUser.id).then(
      graphStr => commit(RECEIVE_GRAPH, { graphJSON: JSON.parse(graphStr) })
    )
  },
  [UPDATE_GRAPH] ({ commit }, { graphStr }) {
    return APIUtil.updateGraph(graphStr).then(
      graphStr => commit(RECEIVE_GRAPH, { graphJSON: JSON.parse(graphStr) })
    )
  }
}
