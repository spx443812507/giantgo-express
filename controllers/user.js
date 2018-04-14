const UserService = require('../services/user')

class UserController {
  constructor () {
    this.userService = new UserService()
  }

  async signIn (req, res, next) {
    try {
      const username = req.body.username
      const password = req.body.password
      const token = await this.userService.signIn(username, password)
      return res.status(200).json({token})
    } catch (e) {
      next(e)
    }
  }

  async signUp (req, res, next) {
    try {
      const userInfo = req.body
      const token = await this.userService.signUp(userInfo)
      return res.status(201).json({token})
    } catch (e) {
      next(e)
    }
  }

  async update (req, res, next) {
    try {
      const userInfo = req.body
      const userId = req.params.user_id
      const user = await this.userService.update(userId, userInfo)
      return res.status(200).json(user)
    } catch (e) {
      next(e)
    }
  }

  async get (req, res, next) {
    try {
      const user = await this.userService.get(req.params.user_id)
      return res.status(200).json(user)
    } catch (e) {
      next(e)
    }
  }

  all () {}

  remove () {}

  async updateMyInfo (req, res, next) {
    try {
      const userInfo = req.body
      const user = await this.userService.update(req.user.providerId, userInfo)
      return res.status(200).json(user)
    } catch (e) {
      next(e)
    }
  }

  async getMyInfo (req, res, next) {
    try {
      const user = await this.userService.get(req.user.providerId)
      return res.status(200).json(user)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = UserController
