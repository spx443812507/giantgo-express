const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/giantgo')

module.exports = mongoose
