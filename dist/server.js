var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')
var MongoClient = require('mongodb').MongoClient
// var url = 'mongodb://localhost/userDB'

const app = express()
app.use(serveStatic(__dirname))
var port = process.env.PORT || 5000
app.listen(port)
console.log('server started ' + port)

app.get('/api', (req, res) => {
  res.send('hello world!')
})
