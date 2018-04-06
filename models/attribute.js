const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const schema = new mongoose.Schema({
  entity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entity'
  },
  // 属性代码
  attribute_code: {
    type: String,
    required: true
  },
  // 描述
  description: {
    type: String
  },
  // 展示类型
  frontend_input: {
    type: String,
    enum: ['text', 'textarea', 'switch', 'radio', 'checkbox', 'select', 'multiselect', 'number', 'date', 'datetime', 'file'],
    required: true
  },
  // 选项集合
  options: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Option'
  }],
  // 是否唯一
  is_unique: {
    type: Boolean
  },
  // 是否集合
  is_collection: {
    type: Boolean
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'update_at'
  }
})

schema.plugin(mongooseDelete)

const Attribute = mongoose.model('Attribute', schema)

module.exports = Attribute
