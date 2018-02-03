const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  mobile: {
    type: String,
    unique: true
  },
  company: String,
  password: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: Date,
  sign_in_ip: String,
  last_sign_in_at: Date
})

const User = mongoose.model('User', userSchema)

module.exports = User
