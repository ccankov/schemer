const express = require('express')
const uuid = require('uuid')

// ------------ Create DB API Endpoints ---------- //
const dbRoutes = express.Router()

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://app:nikitachris@ds123331.mlab.com:23331/schemer'
var bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())        // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
  extended: true
}))

// Get all of a user's databases
dbRoutes.get('/dbs', (req, res) => {
  if (req.user) {
    // passort adds user to request

    MongoClient.connect(url, (err, db) => {
      if (err) {
        console.log(err)
      } else {
        db.collection('dbs')
        .find(db => db.user_id === req.user.id)
        .toArray(function (err, data) {
          if (err) {
            console.log(err)
            return res(err)
          } else {
            console.log(data)
            return res.json(data)
          }
        })
      }
    })
  } else {
    res.json({ dbs: [] })
  }
})

// Add a database
dbRoutes.post('/dbs', (req, res) => {
  if (!req.user) {
    res.status(401).json({ errors: ['Must be logged in'] })
  }

  MongoClient.connect(url, (err, db) => {
    const { _id } = req.user
    let safeString = req.body.graph.replace(/\.port/g, 'U+FF0Eport')
    console.log(safeString)
    let graph = JSON.parse(safeString)
    console.log('---')
    console.log(graph)
    const { dbName, sqlLang, cells } = graph
    const database = {
      dbName,
      sqlLang,
      graph: cells,
      user_id: _id
    }
    if (err) {
      console.log(err)
    } else {
      db.collection('dbs').insert(database)
    }
  })
  res.status(201).json(req.body)
})

// Delete a database
dbRoutes.delete('/dbs/:id',
  (req, res) => {
    if (!req.user) {
      res.status(401).json({ errors: ['Must be logged in'] })
    }

    const { id } = req.params
    const dbIndex = dbData.findIndex(exc => exc.id === id)

    dbData.splice(dbIndex, 1)
    res.sendStatus(204)
  }
)

module.exports = dbRoutes
