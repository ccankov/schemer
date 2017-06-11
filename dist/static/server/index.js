const express = require('express')
const bodyParser = require('body-parser')
const serveStatic = require('serve-static')
const passport = require('./config/passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const config = require('config/main')
const authRoutes = require('routes/auth_routes')

// create new server
const server = express()

// configure server
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(session({
  secret: process.env.SESSION_SECRET || config.secret,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: process.env.MONGO_URL || 'mongodb://localhost/schemer'
  })
}))
server.use(express.static('public'))
server.use(passport.initialize())
server.use(passport.session())
server.use('/auth', authRoutes)
server.use(serveStatic(__dirname))

// Start the server
server.listen(config.port, () => {
  console.log(`The API is listening on port ${config.port}`)
})
