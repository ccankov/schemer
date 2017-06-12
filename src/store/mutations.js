import {
  RECEIVE_GRAPH,
  RECEIVE_ERRORS,
  CLEAR_ERRORS,
  RECEIVE_DBNAME,
  RECEIVE_LANGUAGE,
  RECEIVE_CURRENT_USER
} from './mutation_types'

export const state = {
  graphJSON: {
    cells: [],
    dbName: 'LibaryDB',
    sqlLang: 'postgreSQL'
  },
  currentUser: null,
  errors: [],
  dbName: 'LibaryDB'
}

export const mutations = {
  [RECEIVE_CURRENT_USER] (state, { user }) {
    console.log(user)
    if (user && user._id) {
      state.currentUser = user
    } else {
      state.currentUser = null
    }
    state.errors = []
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
    state.errors = Object.assign([], [err.responseJSON.message])
  },
  [CLEAR_ERRORS] (state) {
    state.errors = []
  }
}
