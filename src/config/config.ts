const config: any = {
  port: 300,
  socketPath: '/socketio/socket.io'
};
export default config;

const port: number = 300;
export let socketPath: string = '/socketio/socket.io';
export let mysql: any = {
  host: 'localhost',
  user: 'root',
  password: 'sino@123',
  database: 'giantgo',
  connectionLimit: 100
};
export let redis: string = 'redis://user:sino@123@localhost:6379/2';
export let mongo: string = 'mongodb://localhost/giantgo';
export let jwtSecret: string = 'Pass@word1';
