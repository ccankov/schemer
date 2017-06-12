const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://app:nikitachris@ds123331.mlab.com:23331/schemer'
const bcrypt = require('bcrypt')

const createUser = (username, password, done) => {
  let stop = false
  MongoClient.connect(url,
  (err, db) => {
    if (err) {
      done(err, null)
    } else {
      db.collection('users').find({ username }).toArray((err, data) => {
        if (err) {
          done(err, null)
          stop = true
        }
        if (data.length > 0) {
          done(null, false, { message: 'Username already taken' })
          stop = true
        }
      })
      if (username === '') {
        done(null, false, { message: 'Username cannot be blank' })
        stop = true
      } else if (password.length < 6) {
        done(null, false, { message: 'Password must be at least 6 characters' })
        stop = true
      }
      if (stop) return
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
          done(null, false, { message: 'Username not found' })
        } else {
          const user = data[0]
          bcrypt.compare(password, user.password_digest,
          (err, result) => {
            if (err) {
              done(err, null)
            } else if (!result) {
              done(null, false, {message: 'Invalid password'})
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
