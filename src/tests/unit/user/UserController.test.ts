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

  // it('should create a new user with success', async () => {
  //   //generateToken()
  //   let user = await User.findOne({ where: { id: 1 } });
  //   if (!user) {
  //     user = await User.create({ id: 1, name: 'teste', password: '12345678' });
  //   }
  //   const token = generateToken(user.id.toString());
  //   const userId = user.id;
  //   request.set('authorization', token);

  //   const response = await request(app)
  //     .post('/api/user')
  //     .send({
  //       name: 'User teste',
  //       email: `${Math.random()}@email.com`,
  //       password: 'userTestePassword',
  //     });
  //   console.log(response);
  //   expect(response.statusCode).toEqual(201);
  //   // expect(response.body).toHaveProperty('id');
  // });

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
});
