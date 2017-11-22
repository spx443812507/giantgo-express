const express = require('express')
const router = express.Router()
const MessageController = require('../controllers/messageController')()
const messageController = new MessageController()

/* GET users listing. */
router.post('/', messageController.broadcast)

module.exports = router
