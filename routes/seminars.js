const express = require('express')
const router = express.Router()
const SeminarController = require('../controllers/seminars')
const seminarController = new SeminarController()

router.post('/', function (req, res) {
  seminarController.create(req, res)
})
router.put('/:seminar_id', function (req, res) {
  seminarController.update(req, res)
})
router.delete('/:seminar_id', function (req, res) {
  seminarController.remove(req, res)
})
router.get('/', function (req, res) {
  seminarController.all(req, res)
})
router.get('/:seminar_id', function (req, res) {
  seminarController.get(req, res)
})

module.exports = router
