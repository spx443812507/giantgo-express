const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const schema = new mongoose.Schema({
  // 权限名称
  name: {
    type: String,
    required: 'permission_is_exists'
  },
  // 显示名称
  display_name: String,
  // 描述
  description: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'update_at'
  }
})

schema.plugin(mongooseDelete)

const Permission = mongoose.model('Permission', schema)

module.exports = Permission
