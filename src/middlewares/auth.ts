import { RequestHandler } from 'express';

import HttpError from '../helpers/http-error';
import TokenHelper from '../helpers/token';
import User from '../models/user';

abstract class AuthMiddleware {
  public static isAuth: RequestHandler = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization!;

      if (!authorization || !authorization.startsWith('Bearer ')) {
        throw new HttpError(401, 'Invalid token');
      }

      const token = authorization.substr(7);
      const decrypted: any = TokenHelper.verifyToken(token);

      if (!decrypted || !decrypted.username) {
        throw new HttpError(401, 'Invalid token');
      }

      const username: string = decrypted.username;

      const user = await User.findOne({ username });

      if (!user) {
        throw new HttpError(401, 'Invalid credentials');
      }

      req.user = user;

      next();
    } catch (err) {
      next(err);
    }
  };
}

export default AuthMiddleware;
