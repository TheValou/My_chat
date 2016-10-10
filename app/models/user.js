var sequelize = require('../../config/sequelize').sequelize;
var DataTypes = require('sequelize/lib/data-types');
var Sequelize = require('sequelize');

var User = sequelize.define('User', {
  google_name: {
    type: Sequelize.STRING
  },
  google_email: {
    type: Sequelize.STRING
  },
  google_token: {
    type: Sequelize.STRING
  },
  google_id: {
    type: Sequelize.STRING
  },
  google_id: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true,
    tableName: 'User',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

User.sync();

module.exports = User;