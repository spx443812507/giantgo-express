const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  // 演讲嘉宾姓名
  name: {
    type: String,
    required: true
  },
  avatar: String,
  company: String,
  position: String,
  profile: String,
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

const Speaker = mongoose.model('Speaker', schema)

module.exports = Speaker
