const express = require('express')
const guard = require('express-jwt-permissions')()
const router = express.Router()
const FormController = require('../controllers/form')
const formController = new FormController()

router.post('/', guard.check([['admin'], ['form:create']]), formController.create.bind(formController))
router.put('/:form_id', formController.update.bind(formController))
router.delete('/:form_id', formController.remove.bind(formController))
router.get('/', formController.all.bind(formController))
router.get('/:form_id', formController.get.bind(formController))

module.exports = router
