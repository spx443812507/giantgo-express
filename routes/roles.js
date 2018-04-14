const express = require('express')
const guard = require('express-jwt-permissions')()
const router = express.Router()
const RoleController = require('../controllers/role')
const roleController = new RoleController()

router.post('/', guard.check(['role:create']), roleController.create.bind(roleController))
router.put('/:role_id', guard.check(['role:update']), roleController.update.bind(roleController))
router.delete('/:role_id', guard.check(['role:delete']), roleController.remove.bind(roleController))
router.get('/', guard.check(['role:retrieve']), roleController.all.bind(roleController))
router.get('/:role_id', guard.check(['role:retrieve']), roleController.get.bind(roleController))

module.exports = router
