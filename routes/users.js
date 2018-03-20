const express = require('express')
const router = express.Router()
const UserController = require('../controllers/users')
const userController = new UserController()

router.post('/session', userController.signUp.bind(userController))
router.patch('/session', userController.signIn.bind(userController))
router.put('/:user_id', userController.update.bind(userController))
router.delete('/:user_id', userController.remove.bind(userController))
router.get('/', userController.all.bind(userController))
router.get('/:user_id', userController.get.bind(userController))

module.exports = router
