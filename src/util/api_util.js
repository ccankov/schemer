import $ from 'jquery'

export const fetchGraph = () => (
  $.ajax({
    method: 'get',
    url: '/api/dbs',
    dataType: 'json'
  })
)

export const updateGraph = (graph) => (
  $.ajax({
    method: 'post',
    url: '/url/dbs',
    data: { graph },
    dataType: 'json'
  })
)
