const redisConfig = require('../config/config').redis

module.exports = require('socket.io-emitter')(redisConfig)
