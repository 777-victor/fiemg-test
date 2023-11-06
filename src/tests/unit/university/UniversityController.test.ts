import request from 'supertest'; // "requester"
require('dotenv').config();
import app from '../../../server';
import database from '../../../db';
import User from '../../../models/User';
import { generateToken } from '../../../helpers/jwtHelper';

describe('POST /user test suite', () => {
  beforeAll(async () => {
    await database.authenticate();
  });

  afterAll(async () => {
    await database.close();
  });

  it('should not list universities when token was not provided', async () => {
    const response = await request(app).get('/api/university').send();

    expect(response.statusCode).toEqual(403);
  });
});
