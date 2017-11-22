const pool = require('../db/mysql')
const moment = require('moment')

module.exports = function SocketServiceModule () {
  function SocketService () {

  }

  SocketService.prototype.subscribe = function (fd, command, params) {
    return new Promise(function (resolve, reject) {
      let sql = `INSERT INTO listeners(fd, command, params, created_at) SELECT :fd, :command, :params, :created_at 
      FROM dual WHERE not exists (select * from listeners where fd = :fd AND command = :command)`

      let queryParams = {
        fd: fd,
        command: command,
        params: JSON.stringify(params),
        created_at: moment().format('YYYY-MM-DD HH:mm:ss')
      }

      pool.query(sql, queryParams, function (err, rows, fields) {
        if (err) {
          reject(err)
        }

        resolve()
      })
    })
  }

  SocketService.prototype.unSubscribe = function (fd, reason) {
    return new Promise(function (resolve, reject) {
      const sql = `delete from listeners where fd = :fd`

      let queryParams = {
        fd: fd
      }

      pool.query(sql, queryParams, function (err, rows, fields) {
        if (err) {
          reject(err)
        }

        resolve()
      })
    })
  }

  return SocketService
}
