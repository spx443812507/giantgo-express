const redis = require('../db/redis')
const pool = require('../db/mysql')
const _ = require('lodash')
const io = require('../socket').io

module.exports = function CommandServiceModule () {
  function CommandService () {

  }

  CommandService.prototype.broadcast = function (command, data, namespace, room) {
    return new Promise(function (resolve, reject) {
      let sql = 'SELECT * FROM subscribes WHERE command = :command'
      let params = {
        command: command
      }

      if (namespace) {
        sql += ' AND namespace = :namespace'
        params.namespace = namespace
      }

      if (room) {
        sql += ' AND room = :room'
        params.room = room
      }

      pool.query(sql, params, function (err, rows, fields) {
        if (err) {
          reject(err)
        }

        _.forEach(rows, function (row) {
          io.of(row.namespace).to(row.room || row.command).emit(command, data)
          redis.RPUSH('logs:command:' + command, JSON.stringify(data))
        })

        resolve()
      })
    })
  }

  return CommandService
}
