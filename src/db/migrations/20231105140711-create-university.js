'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('universities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      name: {
        type: Sequelize.STRING,
      },
      web_page: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      domain: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      state_province: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      country_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'countries',
          },
          key: 'id',
        },
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('universities');
  },
};
