import * as redis from 'redis';
import * as config from '../config/config';
import { RedisClient } from 'redis';

const client: RedisClient = redis.createClient(config.redis);

export default client;
