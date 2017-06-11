const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://app:nikitachris@ds123331.mlab.com:23331/schemer'
const bcrypt = require('bcrypt')

const createUser = (username, password, done) => {
  MongoClient.connect(url,
  (err, db) => {
    if (err) {
      done(err, null)
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) done(err, null)
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            done(err, null)
          } else {
            let user = {
              username: username,
              password_digest: hash
            }
            db.collection('users').insert(user)
            done(null, user)
          }
        })
      })
    }
  })
}

const findByUsername = (username, done) => {
  MongoClient.connect(url,
  (err, db) => {
    if (err) {
      done(err, null)
    } else {
      done(null, db.collection('users').findOne({ username }))
    }
  })
}

const validateUser = (username, password, done) => {
  MongoClient.connect(url,
  (err, db) => {
    if (err) {
      done(err, null)
    } else {
      let user = db.collection('users').findOne({ username })
      if (!user) {
        done('invalid username', null)
      } else {
        bcrypt.compare(password, user.password_digest,
        (err, result) => {
          if (err) {
            done(err, null)
          } else if (!result) {
            done('invalid password', null)
          } else {
            done(null, user)
          }
        })
      }
    }
  })
}

module.exports = { createUser, validateUser, findByUsername }
