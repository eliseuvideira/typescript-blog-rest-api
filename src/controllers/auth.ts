import { RequestHandler } from 'express';

import HttpError from '../helpers/http-error';
import TokenHelper from '../helpers/token';

import User from '../models/user';

const signin: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      throw new HttpError(400, 'Invalid username or password');
    }

    const isEqual = await user.verifyPassword(password);

    if (!isEqual) {
      throw new HttpError(400, 'Invalid username or password');
    }

    const token = TokenHelper.createToken({ username });

    res.status(200).json({
      username,
      token,
    });
  } catch (err) {
    next(err);
  }
};

export { signin };
