const io = require('socket.io')
const redis = require('socket.io-redis')
const _ = require('lodash')
const Application = require('./application')
const Commander = require('./commander')

class Factory {
  constructor () {
    // socket.io实例
    this.io = undefined
    this.applications = []
    // 配置
    this.settings = {
      redisUrl: '',
      socketPath: '/socket.io'
    }
  }

  adapter (server) {
    this.io = io(server, {
      path: this.settings.socketPath
    })
    // 配置socket.io-redis数据库
    this.io.adapter(redis(this.settings.redisUrl))

    _.forEach(this.applications, app => {
      this.io.of(app.namespace).on('connection', function (socket) {
        app.onConnection(socket)
      })
    })
  }

  set (setting, val) {
    if (arguments.length === 1) {
      return this.settings[setting]
    }

    // set value
    this.settings[setting] = val

    return this
  }

  /**
   * 注册命名空间
   * @param application   命名空间应用
   */
  use (application) {
    if (!(application instanceof Application)) {
      throw new Error('application must extends socket.Application')
    }

    if (!this.applications.hasOwnProperty(application.namespace)) {
      this.applications.push(application)
    }
  }
}

exports = module.exports = Factory
exports.Application = Application
exports.Commander = Commander
