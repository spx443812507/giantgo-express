const config = require('./config/config')
const SocketFactory = require('./socket')
const applications = require('./commands')

const socketFactory = new SocketFactory(config.redis, config.socketPath)

socketFactory.set('redisUrl', config.redis)
socketFactory.set('socketPath', config.socketPath)

for (const application in applications) {
  if (applications.hasOwnProperty(application)) {
    socketFactory.use(applications[application])
  }
}

module.exports = socketFactory
