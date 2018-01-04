const jwt = require('jsonwebtoken')
const config = require('../config/config')
const User = require('../models/user')

class PassportController {
  signUp () {
    User.create({
      name: 'spx',
      email: 'spx123456@foxmail.com',
      mobile: '15930181489'
    }, (err, user) => {
      if (err) {
        throw 'lala'
      }

      jwt.sign(user, config.jwtSecret)
    })
  }
}

module.exports = PassportController
