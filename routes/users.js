const express = require('express')
const guard = require('express-jwt-permissions')()
const router = express.Router()
const UserController = require('../controllers/user')
const userController = new UserController()

router.put('/:user_id', guard.check('user:write'), userController.update.bind(userController))
router.delete('/:user_id', guard.check('user:write'), userController.remove.bind(userController))
router.get('/', guard.check('user:read'), userController.all.bind(userController))
router.get('/:user_id', guard.check('user:read'), userController.get.bind(userController))

module.exports = router
