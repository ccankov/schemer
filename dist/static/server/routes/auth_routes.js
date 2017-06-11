const passport = require('./config/passport')
const express = require('express')

// ----------- Create auth routes -----------//
const authRoutes = express.Router()
// like a session controller

authRoutes.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    res.json({ user: req.user })
  }
)

authRoutes.get('/logout', (req, res) => {
  req.logout()
  res.json({ user: null })
})

module.exports = authRoutes
