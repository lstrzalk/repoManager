'use strict';
const config = require('../config/config');
const passport = require('passport');
const BitbucketStrategy = require('passport-bitbucket-oauth2').Strategy;
const User = require('../db/models/user');
const init = require('./init');
passport.use(new BitbucketStrategy({
    clientID: config.bitbucketClienId,
    clientSecret: config.bitbucketClientSecret,
    callbackURL: 'http://localhost:3000/auth/bitbucket/callback'
  }, function(accessToken, refreshToken, profile, done) {
        console.log(profile._json);
        //https://api.bitbucket.org/2.0/repositories/lukstr
        let searchQuery = {
            name: profile.displayName
          };

        let updates = {
            name: profile.displayName,
            someID: profile.id
          };

        let options = {
            upsert: true
          };
        User.findOneAndUpdate(searchQuery, updates, options,
          function(err, user) {
            if (err) {
              console.log('error');
              return done(err);
            } else {
              console.log('success');
              return done(null, user);
            }
          });
      }));
init();
module.exports = passport;
