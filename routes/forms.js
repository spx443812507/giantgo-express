const express = require('express')
const guard = require('express-jwt-permissions')()
const router = express.Router()
const FormController = require('../controllers/form')
const formController = new FormController()

router.post('/', guard.check(['form:write']), formController.create.bind(formController))
router.put('/:form_id', guard.check(['form:write']), formController.update.bind(formController))
router.delete('/:form_id', guard.check(['form:write']), formController.remove.bind(formController))
router.get('/', formController.all.bind(formController))
router.get('/:form_id', formController.get.bind(formController))

module.exports = router
