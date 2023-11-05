'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'countries',
      [
        {
          name: 'Brazil',
          alpha_two_code: 'BR',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'universities',
      [
        {
          name: 'Universidade Braz Cubas',
          web_page: 'http://www.brazcubas.br/',
          domain: 'brazcubas.br',
          state_province: null,
          country_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('countries', null, {});
    await queryInterface.bulkDelete('universities', null, {});
  },
};
