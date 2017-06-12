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

authRoutes.get('/loginfail', function (req, res) {
  console.log('hmm')
  res.status(403).json({message: 'BAD BAD BAD'})
})

authRoutes.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err || !user) {
      return res.status(403).json({ message: 'Invalid username/password' })
    }
    res.json(user)
  })(req, res, next)
})

authRoutes.post('/signup',
  (req, res, next) => {
    User.createUser(req.body.username, req.body.password,
    (err, user, info) => {
      if (err) {
        res.status(422).json({ errors: [err] })
      } else if (!user) {
        res.status(422).json({ message: info.message })
      } else {
        req.login(user, err => {
          if (err) {
            res.status()
          } else {
            res.json({ user })
          }
        })
      }
    })
  })

authRoutes.get('/logout', (req, res) => {
  req.logout()
  res.json({ user: null })
})

module.exports = authRoutes
