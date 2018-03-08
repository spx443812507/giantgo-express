const express = require('express')
const router = express.Router()
const UserController = require('../controllers/users')
const userController = new UserController()

router.post('/session', function (req, res) {
  userController.signUp(req, res)
})
router.patch('/session', function (req, res) {
  userController.signIn(req, res)
})
router.put('/:user_id', function (req, res) {
  userController.update(req, res)
})
router.delete('/:user_id', function (req, res) {
  userController.remove(req, res)
})
router.get('/', function (req, res) {
  userController.all(req, res)
})
router.get('/:user_id', function (req, res) {
  userController.get(req, res)
})

module.exports = router
