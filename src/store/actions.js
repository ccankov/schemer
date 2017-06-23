import * as APIUtil from '../util/api_util'
import {
  RECEIVE_GRAPH,
  RECEIVE_USER_GRAPHS,
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
  [LOGIN] ({ commit, dispatch }, { user }) {
    return new Promise((resolve, reject) => {
      APIUtil.login(user)
      .then(
        user => {
          commit(RECEIVE_CURRENT_USER, user)
          dispatch(RECEIVE_USER_GRAPHS)
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
      .then(() => commit(RECEIVE_USER_GRAPHS, []))
  },
  [FETCH_USER] ({ commit }) {
    return APIUtil.fetchUser()
      .then(user => {
        commit(RECEIVE_CURRENT_USER, user)
      })
  },
  [RECEIVE_USER_GRAPHS] ({ commit, state }) {
    return APIUtil.fetchUserGraphs()
      .then(graphs => {
        commit(RECEIVE_USER_GRAPHS, graphs)
      })
  },
  [FETCH_GRAPH] ({ commit, state }, { graphId }) {
    return APIUtil.fetchGraph(graphId).then(
      data => {
        let json = {
          cells: JSON.parse(JSON.stringify(data.graph).replace(/U\+FF0Eport/g, '.port')),
          dbName: data.dbName,
          sqlLang: data.sqlLang
        }
        commit(RECEIVE_GRAPH, { graphJSON: json })
      }
    )
  },
  [UPDATE_GRAPH] ({ commit }, { graphStr }) {
    return APIUtil.updateGraph(graphStr).then(
      graphStr => commit(RECEIVE_GRAPH, { graphJSON: JSON.parse(graphStr) })
    )
  }
}
