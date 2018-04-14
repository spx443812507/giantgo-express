const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const schema = new mongoose.Schema({
  // 用户名
  name: String,
  // 邮箱
  email: {
    type: String,
    unique: 'email_exists'
  },
  // 手机
  mobile: {
    type: String,
    unique: 'mobile_exists'
  },
  // 公司
  company: String,
  // 密码
  password: String,
  // 是否验证邮箱
  verified_email: Boolean,
  // 是否验证手机
  verified_mobile: Boolean,
  // 登录ip
  sign_in_ip: String,
  // 最后登录时间
  last_sign_in_at: Date
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'update_at'
  }
})

schema.plugin(mongooseDelete)

const User = mongoose.model('User', schema)

module.exports = User
