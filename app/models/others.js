var sequelize = require('../../config/sequelize').sequelize;
var DataTypes = require('sequelize/lib/data-types');
var Sequelize = require('sequelize');

var User = sequelize.define('authentification', {
  id_auth: {
    type: Sequelize.INTEGER,
   // field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
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
  // Table created
  return User.create({ 
    google_id: profile.id, 
    google_token: token, 
    google_name: profile.displayName, 
    google_email: profile.emails[0].value 
  })
});

// exports.user = User;
module.exports = User;