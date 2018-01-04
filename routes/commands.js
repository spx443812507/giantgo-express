const express = require('express')
const CommandController = require('../controllers/commandController')
const router = express.Router()
const commandController = new CommandController()

/* GET users listing. */
router.post('/', commandController.broadcast)

module.exports = router
