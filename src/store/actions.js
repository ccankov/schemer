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
    return new Promise((resolve, reject) => {
      APIUtil.signup(user)
      .then(
        user => {
          console.log(user)
          commit(RECEIVE_CURRENT_USER, user)
          resolve(user)
        },
        err => {
          commit(RECEIVE_ERRORS, err)
          reject(err)
        }
      )
    })
  },
  [LOGIN] ({ commit }, { user }) {
    return new Promise((resolve, reject) => {
      APIUtil.login(user)
      .then(
        user => {
          console.log(user)
          commit(RECEIVE_CURRENT_USER, user)
          resolve(user)
        },
        err => {
          commit(RECEIVE_ERRORS, err)
          reject(err)
        }
      )
    })
  },
  [LOGOUT] ({ commit }) {
    return APIUtil.logout()
      .then(() => commit(RECEIVE_CURRENT_USER, { user: null }))
  },
  [FETCH_USER] ({ commit }) {
    console.log('happening')
    return APIUtil.fetchUser()
      .then(user => {
        console.log(user)
        commit(RECEIVE_CURRENT_USER, user)
      })
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
