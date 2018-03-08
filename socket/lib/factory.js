const io = require('socket.io')
const redis = require('socket.io-redis')
const _ = require('lodash')
const glob = require('glob')
const path = require('path')
const Application = require('./application')
const Commander = require('./commander')

class Factory {
  constructor () {
    // socket.io实例
    this.io = undefined
    this.applications = {}
    // 配置
    this.settings = {
      redisUrl: '',
      socketPath: '/socket.io',
      commands: ''
    }
  }

  adapter (server) {
    this.io = io(server, {
      path: this.settings.socketPath
    })
    // 配置socket.io-redis数据库
    this.io.adapter(redis(this.settings.redisUrl))
    // 根据文件夹目录获取命名空间
    const namespaces = glob.sync('**/', {
      cwd: this.settings.commands
    })

    _.forEach(namespaces, file => {
      const nsp = '/' + path.basename(file)
      const application = new Application(nsp)
      const commands = glob.sync('**/*.js', {
        cwd: path.join(this.settings.commands, nsp)
      })
      // 根据文件注册command
      _.forEach(commands, command => {
        const commandPath = path.join(this.settings.commands, file, command)
        application.command(path.basename(command, '.js'), require(path.resolve(commandPath)))
      })

      this.use(application)
    })

    _.forIn(this.applications, (app, nsp) => {
      this.io.of(nsp).on('connection', function (socket) {
        app.onConnection(socket)
      })
    })
  }

  /**
   * 设置基础配置
   * @param {*} setting
   * @param {*} val
   */
  set (setting, val) {
    if (arguments.length === 1) {
      return this.settings[setting]
    }

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
      this.applications[application.namespace] = application
    }
  }

  /**
   * 根据命名空间获取应用
   * @param {*} nsp 命名空间
   */
  getApplication (nsp) {
    if (nsp && nsp.indexOf('/') !== 0) {
      nsp = '/' + nsp
    }

    if (this.applications.hasOwnProperty(nsp)) {
      return this.applications[nsp]
    }
  }
}

exports = module.exports = Factory
exports.Application = Application
exports.Commander = Commander
