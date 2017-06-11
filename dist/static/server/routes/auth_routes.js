const passport = require('../config/passport')
const express = require('express')
const User = require('../models/users')

// ----------- Create auth routes -----------//
const authRoutes = express.Router()
// like a session controller
authRoutes.get('/current_user',
  (req, res) => {
    res.json({ user: req.user })
  }
)

authRoutes.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    res.json({ user: req.user })
  }
)

authRoutes.post('/signup',
  (req, res) => {
    user =

    passport.authenticate('local')(req, res => {
      res.json({ user })
    })
  }
)

authRoutes.get('/logout', (req, res) => {
  req.logout()
  res.json({ user: null })
})

module.exports = authRoutes
