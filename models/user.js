const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: 'string',
  size: 'string'
})

const User = mongoose.model('User', userSchema)

module.exports = User
