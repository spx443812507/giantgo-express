const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  // 用户名
  name: String,
  // 邮箱
  email: {
    type: String,
    unique: true
  },
  // 手机
  mobile: {
    type: String,
    unique: true
  },
  // 密码
  password: String,
  // 是否验证邮箱
  verified_email: Boolean,
  // 是否验证手机
  verified_mobile: Boolean,
  // 公司
  company: String,
  // 登录ip
  sign_in_ip: String,
  // 最后登录时间
  last_sign_in_at: Date,
  // 删除时间
  deleted_at: Date
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'update_at'
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
