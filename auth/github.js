'use strict';
const config = require('../config/config');
const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const User = require('../db/models/user');
const init = require('./init');
const request = require('request');
passport.use(new GithubStrategy({
    clientID: config.githubClienId,
    clientSecret: config.githubClientSecret,
    callbackURL: 'http://localhost:3000/auth/github/callback'
  }, function(accessToken, refreshToken, profile, done) {
        console.log(accessToken);
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
        var reqgit = {
          url: 'https://api.github.com/user/repos',
          headers: {
            'User-Agent': 'repoManager',
            'Authorization': `Bearer ${accessToken}`
          }
        };
        request.get(reqgit,  function(error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
          }
        );
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
