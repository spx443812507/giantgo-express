const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  // 签到点名称
  title: {
    type: String,
    required: true
  },
  // 员工姓名
  staff_name: String,
  // 结束时间
  staff_mobile: String,
  // 删除时间
  deleted_at: Date,
  seminar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seminar'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'update_at'
  }
})

const Checkin = mongoose.model('Checkin', schema)

module.exports = Checkin
