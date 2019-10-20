import request from './request';

import Database from '../utils/database';

describe('auth', () => {
  beforeAll(async () => {
    const uri = process.env.MONGODB_URI! + '-test';
    await Database.connect(uri);
    await Database.initialize();
  });

  afterAll(async () => {
    await Database.disconnect();
  });

  it('should sign in superuser', async () => {
    expect.assertions(3);
    const username = process.env.SUPER_USER_USERNAME!;
    const password = process.env.SUPER_USER_PASSWORD!;
    const res = await request()
      .post('/signin')
      .send({
        username,
        password,
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    const { token, username: recievedUsername } = res.body;
    expect(token).toBeDefined();
    expect(recievedUsername).toBe(username);
  });

  it('should return 400 if invalid user', async () => {
    expect.assertions(1);
    const username = process.env.SUPER_USER_USERNAME! + '-invalid';
    const password = process.env.SUPER_USER_PASSWORD!;
    const res = await request()
      .post('/signin')
      .send({
        username,
        password,
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    expect(res.status).toBe(400);
  });

  it('should return 400 if invalid password', async () => {
    expect.assertions(1);
    const username = process.env.SUPER_USER_USERNAME!;
    const password = process.env.SUPER_USER_PASSWORD! + '-invalid';
    const res = await request()
      .post('/signin')
      .send({
        username,
        password,
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    expect(res.status).toBe(400);
  });
});
