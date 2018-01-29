const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  // 会议名称
  title: String,
  // 开始时间
  start_at: {
    type: Date,
    default: Date.now
  },
  // 结束时间
  end_at: Date,
  // 地址
  address: String,
  // 报名人数
  register_number: Number,
  // 报名关闭时间
  register_closed_at: Date,
  // 是否需要审核
  need_audit: Boolean,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: Date,
  deleted_at: Date
})

const Seminar = mongoose.model('Seminar', schema)

module.exports = Seminar
