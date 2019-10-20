import request from './request';

describe('app', () => {
  it('should run without errors', async () => {
    expect.assertions(1);
    const res = await request().options('/');
    expect(res.status).toBe(204);
  });

  it('should allow cors', async () => {
    expect.assertions(1);
    const res = await request().options('/');
    expect(res.header['access-control-allow-origin']).toBe('*');
  });
});
