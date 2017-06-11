const passport = require('./config/passport')
const express = require('express')

// ----------- Create auth routes -----------//
const authRoutes = express.Router()
// like a session controller

authRoutes.post('/login',
  passport.authenticate('local', { // LocalStrategy defined above
    failureRedirect: '/',
    successRedirect: '/dashboard',
    failureFlash: true
  })
)

authRoutes.get('/logout', (req, res) => {
  req.logout()
  res.json({ user: null })
})

module.exports = authRoutes
