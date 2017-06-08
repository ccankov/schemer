import $ from 'jquery'

export const fetchGraph = (userId) => (
  $.ajax({
    method: 'get',
    url: '/api/dbs',
    data: { user_id: userId },
    dataType: 'json'
  })
)

export const updateGraph = (graphJSON) => (
  $.ajax({
    method: 'post',
    url: '/api/dbs',
    data: {graph: JSON.stringify(graphJSON)}
  })
)
