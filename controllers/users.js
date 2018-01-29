const UserService = require('../services/user')

class UserController {
  constructor () {
    this.userService = new UserService()
  }

  signIn (req, res) {
    const username = req.body.username
    const password = req.body.password

    this.userService.signIn(username, password).then(token => {
      res.status(201).json({
        token
      })
    }).catch(err => {
      res.status(400).json({
        msg: err
      })
    })
  }
  signUp (req, res) {
    const userInfo = req.body
    this.userService.signUp(userInfo).then(token => {
      res.status(201).json({
        token
      })
    }).catch(err => {
      res.status(400).json({
        msg: err
      })
    })
  }
  update () {}
  get () {}
  all () {}
  remove () {}
}

module.exports = UserController
