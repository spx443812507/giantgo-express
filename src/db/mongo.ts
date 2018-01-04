import * as mongoose from 'mongoose';
import * as config from '../config/config';

const promise = mongoose.createConnection(config.mongo, {
  useMongoClient: true
});
promise.then(db => {
  console.log('MongoDB连接成功！！');
}, (err) => {
  console.error.bind(console, '连接错误：' + err);
});
