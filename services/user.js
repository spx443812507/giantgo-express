const {createHash} = require('crypto')
const jwt = require('jsonwebtoken')
const {map, difference} = require('lodash')
const config = require('config')
const {ForbiddenError, NotFoundError} = require('../errors')
const {User, Role} = require('../models')

const hash = password => {
  return createHash('sha1').update(password).digest('base64')
}

// 获取用户角色所有权限并去重
const getPermissions = roles => {
  return difference.apply(this, map(roles, role => map(role.permissions, permission => permission.name))).concat(['user'])
}

class UserService {
  async create (userInfo) {
    try {
      let user = new User(userInfo)
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
      }).populate({
        path: 'roles',
        populate: {
          path: 'permissions',
          select: 'name'
        }
      })
    } catch (e) {
      throw e
    }

    if (user) {
      return jwt.sign({
        providerId: user.id,
        provider: 'giantgo',
        permissions: getPermissions(user.roles)
      }, config.get('jwtSecret'))
    } else {
      throw new ForbiddenError('mismatch_username_or_password')
    }
  }

  async signUp (userInfo) {
    try {
      let user = new User(userInfo)

      user.password = hash(user.password)

      let role = await Role.findOne({
        name: 'admin'
      }).populate({
        path: 'permissions',
        select: 'name'
      })

      if (role) {
        user.roles.push(role)
      }

      user = await user.save()

      return jwt.sign({
        providerId: user.id,
        provider: 'giantgo',
        permissions: getPermissions(user.roles)
      }, config.get('jwtSecret'))
    } catch (e) {
      throw e
    }
  }
}

module.exports = UserService
