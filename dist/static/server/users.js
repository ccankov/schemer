// const MongoClient = require('mongodb').MongoClient
const appData = require('./fakeDB.json')

// create app data from json to mimic Mongo
const userData = appData.users
// const dbData = appData.dbs

const bcrypt = require('bcrypt')

const user = {
  findById: function (id) {
    const user = userData.find(u => u.id === id)
    return Object.assign({}, user)
  },
  generatePasswordDigest: function (password) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        console.log(err)
        return
      }
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          console.log(err)
          return
        }
        user.passwordDigest = hash
      })

      return true
    })
  },
  validPassword: function (password) {

  }
}



module.exports = user
