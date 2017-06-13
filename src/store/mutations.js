import {
  RECEIVE_GRAPH,
  RECEIVE_ERRORS,
  CLEAR_ERRORS,
  RECEIVE_DBNAME,
  RECEIVE_LANGUAGE,
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_GRAPHS,
  TOGGLE_NEW_DB
} from './mutation_types'

export const state = {
  graphJSON: {
    cells: [],
    dbName: 'New Database',
    sqlLang: 'postgreSQL'
  },
  userGraphs: [],
  currentUser: null,
  newDb: false,
  errors: []
}

export const mutations = {
  [TOGGLE_NEW_DB] (state) {
    state.newDb = !state.newDb
  },
  [RECEIVE_CURRENT_USER] (state, { user }) {
    if (user && user._id) {
      state.currentUser = user
    } else {
      state.currentUser = null
    }
    state.errors = []
  },
  [RECEIVE_USER_GRAPHS] (state, graphs) {
    state.userGraphs = graphs
  },
  [RECEIVE_GRAPH] (state, { graphJSON }) {
    state.graphJSON.cells = graphJSON.cells
    state.errors = []
  },
  [RECEIVE_DBNAME] (state, { dbName }) {
    state.graphJSON.dbName = dbName
    state.errors = []
  },
  [RECEIVE_LANGUAGE] (state, { sqlLang }) {
    state.graphJSON.sqlLang = sqlLang
    state.errors = []
  },
  [RECEIVE_ERRORS] (state, err) {
    let error = (err.responseJSON.message
      ? err.responseJSON.message
      : err)
    state.errors = Object.assign([], [error])
  },
  [CLEAR_ERRORS] (state) {
    state.errors = []
  }
}
