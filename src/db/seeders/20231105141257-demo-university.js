'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'universities',
      [
        {
          name: 'Universidade Braz Cubas',
          web_page: 'http://www.brazcubas.br/',
          domain: 'brazcubas.br',
          state_province: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('universities', null, {});
  },
};
