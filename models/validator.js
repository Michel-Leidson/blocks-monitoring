const Sequelize = require('sequelize');
const database = require('../db');

const Validator = database.define('validator', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  signer_key: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  network: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  missed_blocks: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  security_key: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  url_api: {
    type: Sequelize.STRING,
    defaultValue: null
  }
});

module.exports = Validator;