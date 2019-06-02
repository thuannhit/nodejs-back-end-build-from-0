var mysql      = require('mysql');
var configDB = require('./database.js');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : configDB.username,
  password : configDB.pw,
  database : configDB.dbname
});
console.log(configDB.username);
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection;
