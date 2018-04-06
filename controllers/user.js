const UserService = require('../services/user')

class UserController {
  constructor () {
    this.userService = new UserService()
  }

  signIn (req, res, next) {
    const username = req.body.username
    const password = req.body.password

    this.userService.signIn(username, password).then(token => {
      res.status(200).json({
        token
      })
    }).catch(error => {
      next(error)
    })
  }
  signUp (req, res, next) {
    const userInfo = req.body
    this.userService.signUp(userInfo).then(token => {
      res.status(201).json({
        token
      })
    }).catch(error => {
      next(error)
    })
  }
  update () {}
  get () {}
  all () {}
  remove () {}
}

module.exports = UserController
