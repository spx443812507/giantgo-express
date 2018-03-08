const redis = require('redis')
const config = require('config')
const client = redis.createClient(config.get('redis'))

module.exports = client
