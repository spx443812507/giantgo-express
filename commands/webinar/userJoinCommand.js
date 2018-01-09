const SocketFactory = require('../../socket')
const config = require('../../config/config')
const redis = require('../../db/redis')

class UserJoinCommand extends SocketFactory.Commander {
  constructor () {
    super(config.redis)
  }

  handle (data, socket) {

  }
}

module.exports = new UserJoinCommand()
