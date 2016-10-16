var sequelize = require('../../config/sequelize').sequelize;
var DataTypes = require('sequelize/lib/data-types');
var Sequelize = require('sequelize');

var User = sequelize.define('authentification', {
  id_auth: {
    type: Sequelize.INTEGER,
 },
 Auth_name: {
  type: Sequelize.STRING
}, {
  freezeTableName: true,
  tableName: 'User',
  charset: 'utf8',
  collate: 'utf8_general_ci'
});
User.sync();

User.sync({force: true}).then(function () {
  return User.create({ 
    google_id: profile.id, 
    google_token: token, 
    google_name: profile.displayName, 
    google_email: profile.emails[0].value 
  })
});

module.exports = User;