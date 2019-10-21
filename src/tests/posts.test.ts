import { Response } from 'supertest';

import Fixture from './fixture';
import request from './request';

import Post from '../models/post';

describe('posts', () => {
  beforeAll(async () => {
    await Fixture.beforeAll();
  });

  afterAll(async () => {
    await Fixture.afterAll();
  });

  beforeEach(async () => {
    await Post.deleteMany({});
  });

  afterEach(async () => {
    await Post.deleteMany({});
  });

  describe('POST /posts', () => {
    it('should return 401 if invalid credentials', async () => {
      expect.assertions(1);
      const res = await request()
        .post('/posts')
        .send({
          title: 'title',
          content: 'content',
        });
      expect(res.status).toBe(401);
    });

    it('should return 400 if invalid inputs', async () => {
      expect.assertions(2);
      const username = process.env.SUPER_USER_USERNAME!;
      const password = process.env.SUPER_USER_PASSWORD!;
      let res: Response;
      res = await request()
        .post('/signin')
        .send({
          username,
          password,
        });
      expect(res.status).toBe(200);
      const { token } = res.body;
      res = await request()
        .post('/posts')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(400);
    });

    it('should return 201 if valid credentials and input', async () => {
      expect.assertions(4);
      const username = process.env.SUPER_USER_USERNAME!;
      const password = process.env.SUPER_USER_PASSWORD!;
      let res: Response;
      res = await request()
        .post('/signin')
        .send({
          username,
          password,
        });
      expect(res.status).toBe(200);
      const { token } = res.body;
      const post = {
        title: 'title',
        content: 'content',
      };
      res = await request()
        .post('/posts')
        .send(post)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(201);
      const { title, content, _id } = res.body;
      expect({ title, content }).toEqual(post);
      expect(_id).toBeDefined();
    });
  });
});
