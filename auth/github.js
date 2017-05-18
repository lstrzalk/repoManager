"use strict";
const urls = require('../config/urls');
const config = require('../config/config');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../db/models/user');
const init = require('./init');
passport.use(new GitHubStrategy({
    clientID: config.gitHubClienId,
    clientSecret: config.gitHubClientSecret,
    callbackURL: urls.githubAuth
}, function(accessToken, refreshToken, profile, done){
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
        User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
            if(err) {
                console.log("error")
                return done(err);
            } else {
                console.log("success")
                return done(null, user);
            }
        });
    }));
init();
module.exports = passport;
