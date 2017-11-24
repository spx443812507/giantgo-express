const redis = require('../db/redis')
const io = require('../db/socketEmitter')

module.exports = function MessageServiceModule () {
  function MessageService () {

  }

  MessageService.prototype.broadcast = function (command, data) {
    return new Promise(function (resolve, reject) {
      try {
        io.to(command).emit(command, data)
        redis.RPUSH('logs:command:' + command, JSON.stringify(data))
        resolve({
          message: 'success'
        })
      } catch (e) {
        reject({
          message: 'fail'
        })
      }
    })
  }

  return MessageService
}
