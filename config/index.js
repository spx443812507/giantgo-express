const dev = require('./dev.env')
const prod = require('./prod.env')

module.exports = {
  development: dev,
  production: prod
}[process.env.NODE_ENV]
