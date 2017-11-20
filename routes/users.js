let express = require('express')
let router = express.Router()
let mysql = require('mysql')

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sino@123',
  database: 'giantgo'
})

connection.config.queryFormat = function (query, values) {
  if (!values) return query
  return query.replace(/\:(\w+)/g, function (txt, key) {
    if (values.hasOwnProperty(key)) {
      return this.escape(values[key])
    }
    return txt
  }.bind(this))
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  connection.query('SELECT * from listeners where command = :command', {command: 'edm.task.getList111'}, function (err, rows, fields) {
    if (err) throw err

    let result = ''

    for (let i = 0; i < rows.length; i++) {
      result += rows[0].command
    }
    res.json(result)
  })
})

module.exports = router
