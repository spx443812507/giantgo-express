const SocketFactory = require('../../socket')
const userJoinCommand = require('./userJoin')
const disconnectCommand = require('./disconnect')

const Application = SocketFactory.Application
const webinarApplication = new Application('/webinar')

webinarApplication.command('userJoin', userJoinCommand)
webinarApplication.command('disconnect', disconnectCommand)

module.exports = webinarApplication
