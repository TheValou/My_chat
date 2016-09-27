var Sequelize = require('sequelize');

var sequelize = new Sequelize('Chat', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

exports.sequelize = sequelize;