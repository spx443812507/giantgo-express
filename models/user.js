const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: 'string',
  email: 'string',
  mobile: 'string'
})

const User = mongoose.model('User', userSchema)

module.exports = User
