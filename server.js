const express = require("./config/express.js");
const mongoose = require("./config/mongoose.js");

const db = mongoose();
const app = express();
module.exports = app;