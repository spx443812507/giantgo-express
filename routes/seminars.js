const express = require('express')
const router = express.Router()
const SeminarController = require('../controllers/seminars')
const seminarController = new SeminarController()

router.post('/', seminarController.create.bind(seminarController))
router.put('/:seminar_id', seminarController.update.bind(seminarController))
router.delete('/:seminar_id', seminarController.remove.bind(seminarController))
router.get('/', seminarController.all.bind(seminarController))
router.get('/:seminar_id', seminarController.get.bind(seminarController))

module.exports = router
