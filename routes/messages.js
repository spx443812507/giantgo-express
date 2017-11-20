const express = require('express')
const router = express.Router()
const messageController = require('../controllers/messageController')

/* GET users listing. */
router.post('/', messageController.broadcast)

module.exports = router
