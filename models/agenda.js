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

const Agenda = mongoose.model('Agenda', schema)

module.exports = Agenda
