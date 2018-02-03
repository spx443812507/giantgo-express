const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  // 会议名称
  title: {
    type: String,
    required: true
  },
  // 开始时间
  start_at: {
    type: Date,
    validate: {
      validator (v) {
        return v < this.end_at
      },
      message: 'start_before_end'
    },
    default: Date.now
  },
  // 结束时间
  end_at: {
    type: Date,
    validate: {
      validator (v) {
        return v > this.start_at
      },
      message: 'end_after_start'
    }
  },
  // 地址
  address: String,
  // 报名人数
  register_number: Number,
  // 报名关闭时间
  register_closed_at: Date,
  // 是否需要审核
  need_audit: Boolean,
  // 创建时间
  created_at: {
    type: Date,
    default: Date.now
  },
  // 更新时间
  updated_at: Date,
  // 删除时间
  deleted_at: Date
})

const Seminar = mongoose.model('Seminar', schema)

module.exports = Seminar
