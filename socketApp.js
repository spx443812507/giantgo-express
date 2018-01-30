const path = require('path')
const config = require('./config')
const SocketFactory = require('./socket')

const socketFactory = new SocketFactory()

socketFactory.set('redisUrl', config.redis)
socketFactory.set('socketPath', config.socketPath)
socketFactory.set('commands', path.join(__dirname, 'commands'))

module.exports = socketFactory
