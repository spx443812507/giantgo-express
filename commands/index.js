const SocketFactory = require('../socket')
const webinarApplication = require('./webinar')

const Application = SocketFactory.Application
const rootApplication = new Application('/')

exports = module.exports = {}
exports[rootApplication.namespace] = rootApplication
exports[webinarApplication.namespace] = webinarApplication
