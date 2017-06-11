import $ from 'jquery'

export const fetchGraph = (userId) => (
  $.ajax({
    method: 'get',
    url: '/api/dbs',
    data: { user_id: userId },
    dataType: 'json'
  })
)

export const updateGraph = (graphStr) => (
  $.ajax({
    method: 'post',
    url: '/api/dbs',
    data: {graph: graphStr}
  })
)

export const login = ({ username, password }) => (
  $.ajax({
    method: 'post',
    url: '/api/login',
    data: { username, password }
  })
)

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
