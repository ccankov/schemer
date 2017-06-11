const express = require('express')
const appData = require('./fakeDB.json')

// create app data from json to mimic Mongo
const dbData = appData.dbs

// ------------ Create API routes ---------- //
const apiRoutes = express.Router()
// like user and exclamations controllers

apiRoutes.get('/me', (req, res) => {
  res.json({ user: req.user })
})

// Get all of a user's databases
apiRoutes.get('/dbs', (req, res) => {
  const dbs = dbData

  res.json({ dbs })
})

// Add a database
apiRoutes.post('/dbs', (req, res) => {
  const { id } = req.user
  const { text } = req.body
  const db = {
    id: uuid.v4(),
    text,
    user_id: id
  }

  dbData.push(db)

  res.status(201).json({ db })
})

// Delete a database
apiRoutes.delete('/dbs/:id',
  (req, res) => {
    const { id } = req.params
    const dbIndex = dbData.findIndex(exc => exc.id === id)

    dbData.splice(dbIndex, 1)

    res.sendStatus(204)
  }
)
