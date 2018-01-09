const express = require('express')
const CommandController = require('../controllers/commandController')
const router = express.Router()

router.post('/', CommandController.broadcast)

module.exports = router
