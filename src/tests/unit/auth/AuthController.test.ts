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

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('acess_token');
  });

  it('should not authenticate a user with success', async () => {
    const user = await User.create({
      name: 'teste',
      email: 'testeasfasf@example.com',
      password: bcrypt.hashSync('12345678', 8),
    });

    const response = await request(app).post('/api/login').send({
      email: user.email,
      password: '3435345435435',
    });

    expect(response.statusCode).toEqual(400);
  });
});
