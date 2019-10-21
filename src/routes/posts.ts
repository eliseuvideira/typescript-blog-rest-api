import express from 'express';

import { createPost } from '../controllers/posts';

import AuthMiddleware from '../middlewares/auth';

const router = express.Router();

router.post('/posts', AuthMiddleware.isAuth, createPost);

export default router;
