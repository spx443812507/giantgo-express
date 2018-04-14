const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const jwt = require('express-jwt')
const log4js = require('log4js')
const i18n = require('i18n')
const logger = log4js.getLogger('app')
const config = require('config')
const app = express()

log4js.configure({
  appenders: {
    console: {
      type: 'console'
    }
  },
  categories: {
    default: {
      appenders: ['console'],
      level: config.get('log.log4jsLevel')
    }
  },
  pm2: true,
  pm2InstanceVar: 'NODE_APP_INSTANCE',
  replaceConsole: true
})

mongoose.Promise = global.Promise
mongoose.connect(config.get('mongo'))
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', function () {
  logger.info('MongoDB连接成功！')
})
require('./plugins')(mongoose)

i18n.configure({
  // setup some locales - other locales default to en silently
  locales: ['en', 'zh'],

  // sets a custom cookie name to parse locale settings from
  cookie: 'locales',

  // where to store json files - defaults to './locales'
  directory: path.join(__dirname, 'locales'),

  // you may alter a site wide default locale
  defaultLocale: 'zh'
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(i18n.init)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS')
  if (req.method === 'OPTIONS') {
    res.status(200).send()
  } else {
    next()
  }
})

app.use(jwt({
  secret: config.get('jwtSecret'),
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1]
    } else if (req.query && req.query.token) {
      return req.query.token
    }
    return null
  }
}))

require('./routes')(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {

  if (err && err.code) {
    err.desc = i18n.__(err.code)
  }

  if (err.name === 'ValidationError') {
    err.desc = i18n.__('validation_error')
  }

  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500).json(err)
})

module.exports = app
