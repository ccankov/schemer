const express = require('express')
const uuid = require('uuid')
const appData = require('./fakeDB.json')

// create app data from json to mimic Mongo
const dbData = appData.dbs

// ------------ Create DB API Endpoints ---------- //
const dbRoutes = express.Router()

// Get all of a user's databases
dbRoutes.get('/dbs', (req, res) => {
  if (req.user) {
    // passort adds user to request
    const dbs = dbData
      .find(db => db.user_id === req.user.id)
      .map(db => delete db.graphJSON) // ?
    res.json({ dbs })
  } else {
    res.json({ dbs: [] })
  }
})

// Add a database
dbRoutes.post('/dbs', (req, res) => {
  if (!req.user) {
    res.status(401).json({ errors: ['Must be logged in'] })
  }

  const { id } = req.user
  const { name, graphJSON } = req.body
  const db = {
    id: uuid.v4(),
    name,
    graphJSON,
    user_id: id
  }
  dbData.push(db)

  res.status(201).json({ db })
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
