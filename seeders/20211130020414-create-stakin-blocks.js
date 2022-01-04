'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {


    await queryInterface.bulkInsert('Blocks', [
      {
        height: 10000,
        validator_id: 1,
        signed_in: new Date().toISOString()
      },
      {
        height: 10001,
        validator_id: 1,
        signed_in: new Date().toISOString()
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Blocks', null, {});
  }
};
