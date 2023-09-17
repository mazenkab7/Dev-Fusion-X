"use strict";

var express = require('express');

var app = express();
app.use(express["static"]('public'));

var bodyParser = require('body-parser');

app.use(express.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
  res.render('index');
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});