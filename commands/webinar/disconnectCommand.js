const SocketFactory = require('../../socket')
const config = require('../../config')
const redis = require('../../db/redis')

class DisconnectCommand extends SocketFactory.Commander {
  constructor () {
    super(config.redis)
  }

  handle (data, socket = undefined) {
    console.log('客户端：' + socket.id + '断开连接')
  }
}

module.exports = new DisconnectCommand()
