const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/user')

const hash = password => {
  return crypto.createHash('sha1').update(password).digest('base64')
}

class UserService {
  create (userInfo) {
    return new Promise((resolve, reject) => {
      const user = new User(userInfo)

      user.password = hash(user.password)

      user.save((err, user) => {
        if (err) {
          reject(err)
        }

        resolve(user)
      })
    })
  }
  update (userId, userInfo) {

  }
  get () {}
  all () {}
  remove () {}
  signIn (username, password) {
    return new Promise((resolve, reject) => {
      User.findOne({
        password: hash(password)
      }, (err, user) => {
        if (err) {
          reject(err)
        }

        const token = jwt.sign({
          user_id: user._id
        }, config.jwtSecret)

        resolve(token)
      })
    })
  }
  signUp (userInfo) {
    return new Promise((resolve, reject) => {
      this.create(userInfo).then(user => {
        const token = jwt.sign({
          user_id: user._id
        }, config.jwtSecret)

        resolve(token)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

module.exports = UserService
