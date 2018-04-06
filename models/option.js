const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const schema = new mongoose.Schema({
  // 表单名称
  attribute: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  label: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'update_at'
  }
})

schema.plugin(mongooseDelete)

const Option = mongoose.model('Option', schema)

module.exports = Option
