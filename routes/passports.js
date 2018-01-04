const express = require('express')
const router = express.Router()
const PassportController = require('../controllers/passportController')
const passportController = new PassportController()

/* GET users listing. */
router.get('/', passportController.signUp)

module.exports = router
