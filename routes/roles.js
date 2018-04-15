const express = require('express')
const guard = require('express-jwt-permissions')()
const router = express.Router()
const RoleController = require('../controllers/role')
const roleController = new RoleController()

router.post('/', guard.check(['role:write']), roleController.create.bind(roleController))
router.put('/:role_id', guard.check(['role:write']), roleController.update.bind(roleController))
router.delete('/:role_id', guard.check(['role:write']), roleController.remove.bind(roleController))
router.get('/', guard.check(['role:read']), roleController.all.bind(roleController))
router.get('/:role_id', guard.check(['role:read']), roleController.get.bind(roleController))

module.exports = router
