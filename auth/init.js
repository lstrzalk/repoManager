'use strict';
const passport = require('passport');
const User = require('../db/models/user');

module.exports = function() {

  passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

};
