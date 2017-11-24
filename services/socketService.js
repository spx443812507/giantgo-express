const pool = require('../db/mysql')
const moment = require('moment')
const async = require('async')
const _ = require('lodash')

module.exports = function SocketServiceModule () {
  function SocketService () {

  }

  SocketService.prototype.subscribe = function (socket, command) {
    return new Promise(function (resolve, reject) {
      let sql = `INSERT INTO listeners(sid, command, created_at) SELECT :sid, :command, :created_at 
      FROM dual WHERE not exists (select * from listeners where sid = :sid AND command = :command)`

      pool.query(sql, {
        sid: socket.id,
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

  SocketService.prototype.unSubscribe = function (socket, reason) {
    return new Promise(function (resolve, reject) {
      async.series([
        function (callback) {
          pool.query(`select * from listeners where sid = :sid`, {
            sid: socket.id
          }, function (err, rows, fields) {
            if (err) {
              callback(err)
            }

            _.forEach(rows, function (row) {
              socket.leave(row.command, function (err) {
                console.log(err ? err : row.sid + '已退出')
              })
            })

            callback(null)
          })
        },
        function (callback) {
          pool.query(`update listeners set deleted_at = :deleted_at where sid = :sid`, {
            sid: socket.id,
            deleted_at: moment().format('YYYY-MM-DD HH:mm:ss')
          }, function (err, rows, fields) {
            if (err) {
              callback(err)
            }

            callback(null)
          })
        }
      ], function (err, results) {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  return SocketService
}
