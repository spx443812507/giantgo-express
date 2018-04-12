const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const config = require('config')
const {ForbiddenError} = require('../errors')
const User = require('../models/user')

const hash = password => {
  return crypto.createHash('sha1').update(password).digest('base64')
}

class UserService {
  async create (userInfo) {
    try {
      const user = new User(userInfo)
      user.password = hash(user.password)
      return await user.save()
    } catch (e) {
      throw e
    }
  }

  update (userId, userInfo) {

  }

  get () {}

  all () {}

  remove () {}

  async signIn (username, password) {
    let user
    try {
      user = await User.findOne({
        password: hash(password),
        $or: [{
          email: username,
          mobile: username
        }]
      })
    } catch (e) {
      throw e
    }

    if (user) {
      return jwt.sign({
        providerId: user.id,
        provider: 'giantgo'
      }, config.get('jwtSecret'))
    } else {
      throw new ForbiddenError('mismatch_username_or_password')
    }
  }

  async signUp (userInfo) {
    try {
      const user = await this.create(userInfo)

      return jwt.sign({
        providerId: user.id,
        provider: 'giantgo'
      }, config.get('jwtSecret'))
    } catch (e) {
      throw e
    }
  }
}

module.exports = UserService
