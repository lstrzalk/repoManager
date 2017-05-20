'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config');

module.exports = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.set('views', './views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(express.static('views'));
    require('./passport')(app);
    require('../routes/indexRoute')(app);
    require('../routes/reposRoute')(app);
    require('../routes/githubRoute')(app);
    require('../routes/gitlabRoute')(app);
    require('../routes/bitbucketRoute')(app);
    app.listen(config.port);
    console.log(`server listening on port ${config.port}`);
    return app;
  };
