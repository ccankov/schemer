import {
  RECEIVE_GRAPH,
  RECEIVE_ERRORS,
  CLEAR_ERRORS,
  RECEIVE_DBNAME,
  RECEIVE_LANGUAGE
} from './mutation_types'

export const state = {
  graphJSON: {
    cells: [],
    dbName: 'LibaryDB',
    sqlLang: 'postgreSQL'
  },
  currentUser: {
    id: 1,
    username: 'brady'
  },
  errors: []
}

export const mutations = {
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
