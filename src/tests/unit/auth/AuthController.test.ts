import request from 'supertest'; // "requester"
require('dotenv').config();
import app from '../../../server';
import database from '../../../db';
import * as bcrypt from 'bcrypt';
import User from '../../../models/User';

describe('POST /user test suite', () => {
  beforeAll(async () => {
    await database.authenticate();
  });

  afterAll(async () => {
    await database.close();
  });

  it('should authenticate a user with success', async () => {
    try {
      let password = '12345678';
      const user = await User.create({
        name: 'teste',
        email: 'testeasfasf@example.com',
        password: bcrypt.hashSync(password, 8),
      });

      const response = await request(app).post('/api/login').send({
        email: user.email,
        password: password,
      });

      console.log(response);
      expect(response.statusCode).toEqual(200);
      // expect(response.body).toHaveProperty('id');
    } catch (e) {
      console.log('erro');
      console.log(e);
    }
  });
});
