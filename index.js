console.log("test");
var express = require('express');
const Sequelize = require('sequelize');
var app = express();
var port = process.env.PORT || 8080;
var passport = require('passport');

var morgan = require('morgan');
var bodyParser = require('body-parser');
const users = require('./routes/api/users');
const webhook = require('./routes/api/webhooks');


require('./config/passport')(passport); // 

// app.use(morgan('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Open a connection
// const sequelize = new Sequelize(configDB.dbname, configDB.username, configDB.pw, {
//     dialect: 'mysql',
// })
console.log ('open connections')

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);

app.use('/api/webhooks', webhooks);

app.listen(port);
console.log(port);