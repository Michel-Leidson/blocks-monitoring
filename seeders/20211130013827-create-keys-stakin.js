'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Validators', [{
      id: 1,
      name: 'Stakin',
      key_signer: '5714915F131F2FDA0E5162F7AACAF761064F8370',
      url_get_blocks: 'https://mainnet.crypto.org:26657',
      networks: 'crypto'
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Validators', null, {});
    
  }
};
