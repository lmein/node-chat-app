require('./config/config.js');

const _ = require('lodash');
const express = require('express');

const path = require('path');
const publicPath = path.join(__dirname, '../public');

var app = express();

const port = process.env.PORT;

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Started on port ${port}.`);
});
