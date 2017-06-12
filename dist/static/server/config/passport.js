const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/users')

// const appData = require('../fakeDB.json')

// // create app data from json to mimic Mongo
// const userData = appData.users
//
// // would typically go in a model
// function getUser (username) {
//   const user = userData.find(u => u.username === username)
//   return Object.assign({}, user)
// }

// configure passport
passport.use(new LocalStrategy(User.validateUser))
  // (username, password, done) => {
  //   const user = getUser(username)
  //
  //   if (!user || user.password !== password) {
  //     return done(null, false, { message: 'Username and password combination invalid' })
  //   }
  //
  //   delete user.password
  //   return done(null, user)
  // }
// ))

passport.serializeUser((user, done) => {
  done(null, user.username)
})

passport.deserializeUser((username, done) => {
  User.findByUsername(username, (err, user) => {
    done(err, user)
  })
})

module.exports = passport
