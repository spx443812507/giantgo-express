const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

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

schema.plugin(mongooseDelete)

const Checkin = mongoose.model('Checkin', schema)

module.exports = Checkin
