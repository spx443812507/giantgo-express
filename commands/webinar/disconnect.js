const SocketFactory = require('../../socket')
const config = require('../../config')

class DisconnectCommand extends SocketFactory.Commander {
  constructor () {
    super(config.redis)

    this.debounce = 3000
  }

  handle (data, socket = undefined) {
    console.log('客户端：' + socket.id + '断开连接')
  }
}

module.exports = DisconnectCommand
