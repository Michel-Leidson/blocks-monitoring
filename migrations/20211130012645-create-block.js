'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Blocks', {

      height: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      signed_in: {
        type: Sequelize.DATE
      },
      validator_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Blocks');
  }
};