const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  company: String,
  password: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: Date,
  last_sign_in_at: Date
})

const User = mongoose.model('User', userSchema)

module.exports = User
