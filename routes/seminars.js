const express = require('express')
const guard = require('express-jwt-permissions')()
const router = express.Router()
const SeminarController = require('../controllers/seminar')
const seminarController = new SeminarController()

router.post('/', guard.check('seminar:write'), seminarController.create.bind(seminarController))
router.put('/:seminar_id', guard.check('seminar:write'), seminarController.update.bind(seminarController))
router.delete('/:seminar_id', guard.check('seminar:delete'), seminarController.remove.bind(seminarController))
router.get('/', seminarController.all.bind(seminarController))
router.get('/:seminar_id', seminarController.get.bind(seminarController))

module.exports = router
