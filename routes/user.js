const express = require('express')
const guard = require('express-jwt-permissions')()
const router = express.Router()
const UserController = require('../controllers/user')
const userController = new UserController()

router.post('/', userController.signUp.bind(userController))
router.patch('/', userController.signIn.bind(userController))
router.put('/', guard.check('admin'), userController.updateMyInfo.bind(userController))
router.get('/', guard.check('admin'), userController.getMyInfo.bind(userController))

module.exports = router
