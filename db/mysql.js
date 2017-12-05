const mysql = require('mysql')
const mysqlConfig = require('../config/config').mysql
const pool = mysql.createPool(mysqlConfig)

pool.on('connection', function (connection) {
  connection.config.queryFormat = function (query, values) {
    if (!values) return query
    return query.replace(/:(\w+)/g, function (txt, key) {
      if (values.hasOwnProperty(key)) {
        return this.escape(values[key])
      }
      return txt
    }.bind(this))
  }
})

module.exports = pool
