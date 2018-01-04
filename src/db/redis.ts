const redis = require('redis')
const redisConfig = require('../config/config').redis
const client = redis.createClient(redisConfig)

module.exports = client
