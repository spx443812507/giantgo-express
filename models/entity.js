const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const schema = new mongoose.Schema({
  // 实体名称
  entity_name: {
    type: String,
    required: true
  },
  // 实体代码
  entity_code: {
    type: String,
    required: true
  },
  // 描述
  description: String,
  // 属性集合
  attributes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attribute'
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'update_at'
  }
})

schema.plugin(mongooseDelete)

const Entity = mongoose.model('Entity', schema)

module.exports = Entity
