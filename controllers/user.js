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
      return res.status(200).json(token)
    } catch (e) {
      next(e)
    }
  }

  async signUp (req, res, next) {
    try {
      const userInfo = req.body
      const token = await this.userService.signUp(userInfo)
      return res.status(201).json(token)
    } catch (e) {
      next(e)
    }
  }

  update () {}

  get () {}

  all () {}

  remove () {}
}

module.exports = UserController
