import request from 'supertest';

import app from './tests/setupTests.js';

describe('GET /ping', () => {
  it('should return a 200 and a message', async () => {
    const response = await request(app).get('/ping');

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({ message: 'Pong!' });
  });
});
