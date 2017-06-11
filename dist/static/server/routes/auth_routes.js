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
      if (err) {
        res.status(422).json({errors: [err]})
      } else {
        req.login(user, err => {
          if (err) {
            console.log('whoops')
            res.json(err)
          } else {
            res.json({ user })
          }
        })
        // let a = passport.authenticate('local')
        // debugger
        // a((req, res, other) => {
        //   console.log(req)
        //   console.log(res)
        //   console.log(other)
      }
    })
  })

authRoutes.get('/logout', (req, res) => {
  req.logout()
  res.json({ user: null })
})

module.exports = authRoutes
