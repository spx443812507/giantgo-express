module.exports = {
  port: 300,
  socketPath: '/socketio/socket.io',
  mysql: {
    host: 'localhost',
    user: 'root',
    password: 'sino@123',
    database: 'giantgo',
    connectionLimit: 100
  },
  redis: 'redis://user:sino@123@localhost:6379/2',
  mongo: 'mongodb://localhost/giantgo',
  jwtSecret: 'Pass@word1'
}
