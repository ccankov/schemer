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
        .find({'user_id': req.user._id})
        .toArray(function (err, data) {
          if (err) {
            console.log(err)
            return res(err)
          } else {
            return res.json(data)
          }
        })
      }
    })
  } else {
    res.json({ dbs: [] })
  }
})

app.route('/api/dbs/:id')
  .get((req, res) => {
    MongoClient.connect(url, (err, db) => {
      if (err) {
        console.log(err)
      } else {
        if (req.params.id) {
          db.collection('dbs').find({ '_id': { '$oid': req.params.graphId } })
          .toArray(function (err, data) {
            if (err) {
              console.log(err)
              return res(err)
            } else {
              return res.json(data)
            }
          })
        } else {
          db.collection('dbs').find().toArray(function (err, data) {
            if (err) {
              console.log(err)
              return res(err)
            } else {
              return res.json(data)
            }
          })
        }
      }
    })
  }
)

// Add a database
dbRoutes.post('/dbs', (req, res) => {
  if (!req.user) {
    res.status(401).json({ errors: ['Must be logged in'] })
  }

  MongoClient.connect(url, (err, db) => {
    const { _id } = req.user
    let safeString = req.body.graph.replace(/\.port/g, 'U+FF0Eport')
    let graph = JSON.parse(safeString)
    const { dbName, sqlLang, cells } = graph
    if (err) {
      console.log(err)
    } else {
      console.log(_id)
      console.log(dbName)
      // db.collection('dbs').find().toArray(function (err, data) {
      //   if (err) {
      //     console.log(err)
      //     return res(err)
      //   } else {
      //     console.log(data)
      //   }
      // })
      db.collection('dbs').update(
        {dbName, user_id: _id},
        { $set:
        {
          dbName,
          sqlLang,
          graph: cells,
          user_id: _id
        }
        },
        {
          upsert: true
        }
      )
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
