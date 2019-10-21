import request from './request';

import Fixture from './fixture';

describe('auth', () => {
  beforeAll(async () => {
    await Fixture.beforeAll();
  });

  afterAll(async () => {
    await Fixture.afterAll();
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
      });
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
      });
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
      });
    expect(res.status).toBe(400);
  });
});
