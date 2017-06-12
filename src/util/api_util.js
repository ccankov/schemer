import $ from 'jquery'

export const fetchGraph = (id) => (
  $.ajax({
    method: 'get',
    url: `/api/dbs/${id}`,
    data: { graphId: id },
    dataType: 'json'
  })
)

export const fetchUserGraphs = () => (
  $.ajax({
    method: 'get',
    url: '/api/dbs'
  })
)

export const updateGraph = (graphStr) => (
  $.ajax({
    method: 'post',
    url: '/api/dbs',
    data: {graph: graphStr}
  })
)

export const login = ({ username, password }) => {
  return $.ajax({
    method: 'post',
    url: '/api/login',
    data: { username, password }
  })
}

export const signup = ({ username, password }) => (
  $.ajax({
    method: 'post',
    url: '/api/signup',
    data: { username, password }
  })
)

export const fetchUser = () => (
  $.ajax({
    method: 'get',
    url: '/api/current_user'
  })
)

export const logout = () => (
  $.ajax({
    method: 'get',
    url: '/api/logout'
  })
)
