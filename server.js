const express = require('./config/express.js');
const mongoose = require('./config/mongoose.js');

mongoose();
const app = express();
module.exports = app;
