'use strict';
const session = require('express-session');
module.exports = (app) => {
    const passport = require('passport');

    app.use(session({
        secret: 'Sojuz Sowietskich Socjalisticzeskich Riespublik',
        resave: false,
        saveUninitialized: true,
        // cookie: {secure: true}
      }));
    app.use(passport.initialize());
    app.use(passport.session());

    return app;

  };
