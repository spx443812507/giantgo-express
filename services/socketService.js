const pool = require('../db/mysql')
const redis = require('../db/redis')
const moment = require('moment')
const async = require('async')

module.exports = function SocketServiceModule () {
  function SocketService () {

  }

  SocketService.prototype.onMessage = function () {

  }

  SocketService.prototype.subscribe = function (socket, data) {
    const room = socket.handshake.query.room
    const namespace = socket.nsp.name
    const command = data.command

    redis.rpush('logs:socket:' + socket.id, JSON.stringify({
      type: 'subscribe',
      namespace: namespace,
      command: command,
      room: room,
      date: moment().format('YYYY-MM-DD HH:mm:ss')
    }))

    return new Promise(function (resolve, reject) {
      let sql = `INSERT INTO subscribes(namespace, command, created_at) SELECT :namespace, :command, :created_at 
      FROM dual WHERE not exists (select * from subscribes where namespace = :namespace AND command = :command)`

      pool.query(sql, {
        namespace: namespace,
        command: command,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss')
      }, function (err, rows, fields) {
        if (err) {
          reject(err)
        }

        socket.join(command)

        resolve()
      })
    })
  }

  SocketService.prototype.disconnect = function (socket, reason) {
    const room = socket.handshake.query.room
    const namespace = socket.nsp.name

    redis.rpush('logs:socket:' + socket.id, JSON.stringify({
      type: 'disconnect',
      namespace: namespace,
      room: room,
      reason: reason,
      date: moment().format('YYYY-MM-DD HH:mm:ss')
    }))
  }

  return SocketService
}
