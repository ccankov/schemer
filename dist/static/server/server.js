var express = require('express')
// var path = require('path')
var serveStatic = require('serve-static')
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://app:nikitachris@ds123331.mlab.com:23331/schemer'
var bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())        // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
  extended: true
}))

app.get('/api/users', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) console.log(err)
    db.collection('users').find()
      .toArray((err, data) => {
        if (err) {
          console.log(err)
        } else {
          res.json(data)
        }
      })
  })
})

app.route('/api/dbs')
  .get((req, res) => {
    MongoClient.connect(url, (err, db) => {
      console.log(err)
      let userId = req.query.id || req.params.id
      if (userId) {
        db.collection('dbs').find({ 'user_id': userId }).toArray(function (err, data) {
          if (err) {
            console.log(err)
            return res(err)
          } else {
            console.log(data)
            return res.json(data)
          }
        })
      } else {
        db.collection('dbs').find().toArray(function (err, data) {
          if (err) {
            console.log(err)
            return res(err)
          } else {
            console.log(data)
            return res.json(data)
          }
        })
      }
      // res.redirect('/')
    })
  })
  .post((req, res) => {
    console.log('req received')
    MongoClient.connect(url, (err, db) => {
      if (err) {
        console.log(err)
      } else {
        console.log(req.body) // TODO: actually insert in db
        // db.collection('dbs').insert()
      }
    })
    res.send(req.body)
  }
)

app.use(serveStatic(__dirname))
var port = process.env.PORT || 3000
app.listen(port)
console.log('server started ' + port)
