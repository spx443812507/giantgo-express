const express = require('express')
const router = express.Router()
const CommandController = require('../controllers/commandController')()
const commandController = new CommandController()

/* GET users listing. */
router.post('/', commandController.broadcast)
router.get('/', commandController.getCommandList)

module.exports = router
