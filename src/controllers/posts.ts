import { RequestHandler } from 'express';

import Post from '../models/post';

import HttpError from '../helpers/http-error';

const createPost: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req;
    const { title, content } = req.body;

    if (title == null || content == null) {
      throw new HttpError(400, 'Missing parameters');
    }

    const post = new Post({ title, content, user });
    await post.save();
    res.status(201).send({ title, content, _id: post._id });
  } catch (err) {
    next(err);
  }
};

export { createPost };
