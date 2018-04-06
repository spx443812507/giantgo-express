const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const optionSchema = new mongoose.Schema({
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

const fieldSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'textarea', 'switch', 'radio', 'checkbox', 'select', 'multiselect', 'number', 'date', 'datetime', 'file'],
    required: true
  },
  options: [optionSchema]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'update_at'
  }
})

const formSchema = new mongoose.Schema({
  // 表单名称
  title: {
    type: String,
    required: true
  },
  // 描述
  description: String,
  // 属性集合
  fields: [fieldSchema]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'update_at'
  }
})

formSchema.plugin(mongooseDelete)

const Form = mongoose.model('Form', formSchema)

module.exports = Form
