const pool = require('../db/mysql')
const redis = require('../db/redis')
const io = require('../db/socketEmitter')

module.exports = function MessageServiceModule () {
  function MessageService () {

  }

  MessageService.prototype.broadcast = function (command, data) {
    let sql = 'SELECT * from listeners where command = :command'
    let params = {command: command}

    return new Promise(function (resolve, reject) {
      pool.query(sql, params, function (err, rows, fields) {
        if (err) {
          reject(err)
        }

        for (let i = 0; i < rows.length; i++) {
          io.to(rows[i].fd).emit(command, data)
          redis.RPUSH('messageLogs:' + rows[i].fd + ':' + command, JSON.stringify(data))
        }

        resolve()
      })
    })
  }

  return MessageService
}
