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
