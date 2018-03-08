const logger = require('log4js').getLogger('application')
const _ = require('lodash')

class Application {
  constructor (namespace) {
    if (!namespace || typeof (namespace) !== 'string') {
      throw new TypeError('namespace requires string')
    }

    this.namespace = namespace
    this.commanders = {}
  }

  command (cmd, Commander) {
    if (!this.commanders.hasOwnProperty(cmd)) {
      const commander = new Commander()
      commander.command = cmd
      commander.nsp = commander.io.of(this.namespace)

      this.commanders[cmd] = commander
    }
  }

  onConnection (socket) {
    logger.info('客户端：' + socket.id + ' 已连接，命名空间' + socket.nsp.name)

    for (const commander in this.commanders) {
      if (this.commanders.hasOwnProperty(commander)) {
        socket.on(commander, (data, ack) => {
          this.commanders[commander].handle(data, socket, ack)
        })
      }
    }

    socket.on('error', (error) => {
      this.onError(error)
    })

    socket.on('subscribe', (data, ack) => {
      if (!_.isObject(data) || !data.hasOwnProperty('command')) {
        return logger.error('The data you subscibe is not Object or don\'t contain command property')
      }
      this.subscribe(data.command, data, socket, ack)
    })

    socket.on('publish', (data, ack) => {
      if (!_.isObject(data) || !data.hasOwnProperty('command')) {
        return logger.error('The data you publish is not Object or don\'t contain command property')
      }
      this.publish(data.command, data, socket, ack)
    })
  }

  onError (error) {
    logger.info(error)
  }

  subscribe (command, data, socket, ack) {
    logger.info('客户端：' + socket.id + ' 订阅命令：' + command)

    if (this.commanders && this.commanders.hasOwnProperty(command) && typeof this.commanders[command].subscribe === 'function') {
      this.commanders[command].subscribe(data, socket, ack)
    }
  }

  publish (command, data, socket, ack) {
    if (socket) {
      logger.info('客户端：' + socket.id + ' 发布命令：' + command)
    } else {
      logger.info('外部发布命令：' + command)
    }

    if (this.commanders && this.commanders.hasOwnProperty(command) && typeof this.commanders[command].publish === 'function') {
      this.commanders[command].publish(data, socket, ack)
    }
  }
}

module.exports = Application
