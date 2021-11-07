import app from 'app';
import request from 'supertest';

jest.mock('../../../database/numbers.json', () => [1, 2, 3, 4]);

describe('Endpoint GET Numbers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be possible to get numbers', async () => {
    const response = await request(app).get('/api/numbers');

    expect(response.body.numbers).toStrictEqual([1, 2, 3, 4]);
    expect(response.status).toBe(200);
  });

  it('should be possible to get numbers of a page', async () => {
    const response = await request(app).get('/api/numbers?limit=1&page=2');

    expect(response.body.numbers).toStrictEqual([2]);
    expect(response.status).toBe(200);
  });

  it('should return page 1 if page is not sent', async () => {
    const response = await request(app).get('/api/numbers?limit=2');

    expect(response.body.numbers).toStrictEqual([1, 2]);
    expect(response.status).toBe(200);
  });
});
