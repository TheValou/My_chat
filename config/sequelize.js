var Sequelize = require('sequelize');

var DB_USERNAME = 'b5966eb822ba94';
var DB_PASSWORD = '335ed24e';
var DB_HOST = 'eu-cdbr-west-01.cleardb.com';
var DB_DATABASE = 'heroku_edbc5dbc0851b33';


var sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql'
});

exports.sequelize = sequelize;