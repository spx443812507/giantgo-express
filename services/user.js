const {createHash} = require('crypto')
const jwt = require('jsonwebtoken')
const config = require('config')
const {ForbiddenError, NotFoundError} = require('../errors')
const User = require('../models/user')

const hash = password => {
  return createHash('sha1').update(password).digest('base64')
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

  async update (userId, userInfo) {
    let user

    try {
      user = await this.get(userId)

      user.name = userInfo.name
      user.email = userInfo.email
      user.mobile = userInfo.mobile
      user.company = userInfo.company

      user = await user.save()
    } catch (e) {
      throw e
    }

    return user
  }

  async get (userId) {
    let user

    try {
      user = await User.findById(userId)
    } catch (e) {
      throw e
    }

    if (!user) {
      throw new NotFoundError('user_not_exists')
    }

    return user
  }

  all () {}

  remove () {}

  async signIn (username, password) {
    let user
    try {
      user = await User.findOne({
        password: hash(password),
        $or: [{
          email: username
        }, {
          mobile: username
        }]
      })
    } catch (e) {
      throw e
    }

    if (user) {
      return jwt.sign({
        providerId: user.id,
        provider: 'giantgo',
        permissions: ['admin']
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
        provider: 'giantgo',
        permission: ['admin']
      }, config.get('jwtSecret'))
    } catch (e) {
      throw e
    }
  }
}

module.exports = UserService
