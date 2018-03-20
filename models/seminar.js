const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

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
  agendas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agenda'
  }],
  speakers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Speaker'
  }],
  checkins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Checkin'
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'update_at'
  }
})

schema.plugin(mongooseDelete)

const Seminar = mongoose.model('Seminar', schema)

module.exports = Seminar
