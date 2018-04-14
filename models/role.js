const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const schema = new mongoose.Schema({
  // 角色名称
  name: {
    type: String,
    required: 'role_is_exists'
  },
  // 显示名称
  display_name: String,
  // 描述
  description: String,
  // 包含的权限
  permissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission'
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'update_at'
  }
})

schema.plugin(mongooseDelete)

const Role = mongoose.model('Role', schema)

module.exports = Role
