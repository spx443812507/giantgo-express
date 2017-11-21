const express = require('express')
const router = express.Router()
const {broadcast} = require('../controllers/messageController')

/* GET users listing. */
router.post('/', broadcast)

module.exports = router
