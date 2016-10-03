var sequelize = require('../../config/sequelize').sequelize;
var DataTypes = require('sequelize/lib/data-types');
var Sequelize = require('sequelize');

var User = sequelize.define('User', {
  google_name: {
    type: Sequelize.STRING,
   // field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
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
// }, {
//   freezeTableName: true // Model tableName will be the same as the model name
// 
}, {
  freezeTableName: true,
    tableName: 'User',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});
User.sync();

// User.sync({force: true}).then(function () {
//   // Table created
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });

// exports.user = User;
module.exports = User;

// var User = sequelize.define('User', 
// {
//   username: DataTypes.STRING,
//   password: DataTypes.STRING
// })

// User.sync();

// var user = User.create({ username: "admin", password: "bolognese" });
