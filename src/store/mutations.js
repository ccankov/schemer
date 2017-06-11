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
    state.currentUser = user
  },
  [RECEIVE_GRAPH] (state, { graphJSON }) {
    state.graphJSON.cells = graphJSON.cells
  },
  [RECEIVE_DBNAME] (state, { dbName }) {
    state.graphJSON.dbName = dbName
  },
  [RECEIVE_LANGUAGE] (state, { sqlLang }) {
    state.graphJSON.sqlLang = sqlLang
  },
  [RECEIVE_ERRORS] (state, { errors }) {
    state.errors = errors
  },
  [CLEAR_ERRORS] (state) {
    state.errors = []
  }
}
