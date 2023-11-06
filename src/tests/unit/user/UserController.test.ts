import request from 'supertest'; // "requester"
require('dotenv').config();
import app from '../../../server';
import database from '../../../db';
import User from '../../../models/User';
import * as bcrypt from 'bcrypt';

describe('POST /user test suite', () => {
  beforeAll(async () => {
    await database.authenticate();
  });

  afterAll(async () => {
    await database.close();
  });

  it('should not create a new user when token was not provided', async () => {
    const response = await request(app)
      .post('/api/user')
      .send({
        name: 'User teste',
        email: `${Math.random()}@email.com`,
        password: 'userTestePassword',
      });

    expect(response.statusCode).toEqual(403);
  });

  it('should create a new user with success', async () => {
    let password = '12345678';
    const user = await User.create({
      name: 'teste',
      email: 'testeasfasf@example.com',
      password: bcrypt.hashSync(password, 8),
    });

    const authRes = await request(app).post('/api/login').send({
      email: user.email,
      password: password,
    });

    let acess_token = 'Bearer ' + authRes.body.data.acess_token;

    const response = await request(app)
      .post('/api/user')
      .set('Authorization', acess_token) // Works.
      .send({
        name: 'User teste',
        email: `${Math.random()}@email.com`,
        password: 'userTestePassword',
      });

    expect(response.statusCode).toEqual(201);
  });

  it('should update user with success', async () => {
    let password = '12345678';
    const user = await User.create({
      name: 'teste',
      email: 'testeasfasf@example.com',
      password: bcrypt.hashSync(password, 8),
    });

    const authRes = await request(app).post('/api/login').send({
      email: user.email,
      password: password,
    });

    let acess_token = 'Bearer ' + authRes.body.data.acess_token;

    const response = await request(app)
      .put('/api/user/' + user.id)
      .set('Authorization', acess_token) // Works.
      .send({
        name: 'User novo nome',
        email: `${Math.random()}@email.com`,
        password: 'userTestePassword',
      });

    expect(response.statusCode).toEqual(200);
  });

  it('should delete a user with success', async () => {
    let password = '12345678';
    const user = await User.create({
      name: 'teste',
      email: 'testeasfasf@example.com',
      password: bcrypt.hashSync(password, 8),
    });

    const authRes = await request(app).post('/api/login').send({
      email: user.email,
      password: password,
    });

    let acess_token = 'Bearer ' + authRes.body.data.acess_token;

    const response = await request(app)
      .delete('/api/user/' + user.id)
      .set('Authorization', acess_token) // Works.
      .send();

    expect(response.statusCode).toEqual(200);
  });

  it('should not update a user when token was not provided', async () => {
    const response = await request(app)
      .put('/api/user/1')
      .send({
        name: 'User teste',
        email: `${Math.random()}@email.com`,
        password: 'userTestePassword',
      });

    expect(response.statusCode).toEqual(403);
  });

  it('should not get a user when token was not provided', async () => {
    const response = await request(app).get('/api/user/1').send();

    expect(response.statusCode).toEqual(403);
  });

  it('should not delete a user when token was not provided', async () => {
    const response = await request(app).get('/api/user/1').send();

    expect(response.statusCode).toEqual(403);
  });
});
