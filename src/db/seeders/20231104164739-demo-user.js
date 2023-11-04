'use strict';
import bcrypt from 'bcrypt';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const bcryptPassword = bcrypt.hashSync('123456789', 8);

    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Victor',
          email: 'victor@example.com',
          password: bcryptPassword,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'User 2',
          email: 'user2@example.com',
          password: bcryptPassword,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'User 3',
          email: 'foo@example.com',
          password: bcryptPassword,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
