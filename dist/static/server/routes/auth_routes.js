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
    User.createUser(req.body.username, req.body.password,
    (err, user) => {
      console.log(err)
      console.log(user)
      if (err) {
        res.status(422).json({errors: [err]})
      } else {
        passport.authenticate('local')(req, res => {
          res.json({ user })
        })
      }
    })
  })

authRoutes.get('/logout', (req, res) => {
  req.logout()
  res.json({ user: null })
})

module.exports = authRoutes
