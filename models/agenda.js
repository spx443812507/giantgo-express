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

const Agenda = mongoose.model('Agenda', schema)

module.exports = Agenda
