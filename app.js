
var express = require('express');
var app = express();
var cors = require('cors');

// ADD THESE TWO LINES

app.use(cors());

var CarUsersController = require('./carusers/CarUsersController');
app.use('/carusers', CarUsersController);


module.exports = app;
