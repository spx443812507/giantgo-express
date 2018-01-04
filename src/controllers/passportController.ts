import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import User from '../models/user';

export default class PassportController {
  signUp() {
    User.create({
      name: 'spx',
      email: 'spx123456@foxmail.com',
      mobile: '15930181489'
    }, (err: any, user: any) => {
      if (err) {
        throw 'lala';
      }

      jwt.sign(user, config.jwtSecret);
    });
  }
}
