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
      // console.log(username)
      db.collection('users').find({ username }).toArray((err, data) => {
        if (err || !data[0]) {
          done('username not found', null)
        } else {
          done(null, data[0])
        }
      })
    }
  })
}

const validateUser = (username, password, done) => {
  MongoClient.connect(url,
  (err, db) => {
    if (err) {
      done(err, null)
    } else {
      db.collection('users').find({ username }).toArray((err, data) => {
        if (err || !data[0]) {
          done('invalid username', null)
        } else {
          const user = data[0]
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
      })
    }
  })
}

module.exports = { createUser, validateUser, findByUsername }
