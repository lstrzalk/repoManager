'use strict';
module.exports = (id) => {
  console.log(`ID = ${id}`);
  const config = require('../config/config');
  const passport = require('passport');
  const BitbucketStrategy = require('passport-bitbucket-oauth2').Strategy;
  const User = require('../db/models/user');
  const BitbucketUser = require('../db/models/bitbucketUser');
  const GithubUser = require('../db/models/githubUser');
  const GitlabUser = require('../db/models/gitlabUser');
  const init = require('./init');
  // const request = require('request');
  passport.use(new BitbucketStrategy({
      clientID: config.bitbucketClienId,
      clientSecret: config.bitbucketClientSecret,
      callbackURL: 'http://localhost:3000/auth/bitbucket/callback'
    }, function(accessToken, refreshToken, profile, done) {
          // console.log(profile._json);
          // console.log(accessToken);
          // console.log(refreshToken);
          if (id !== null) {
            User.findById(id, function(err, user) {
              if (err) {
                console.log(err);
                return done(err);
              } else {
                let bbUserData = {
                  username: profile._json.username,
                  website: profile._json.website,
                  display_name: profile._json.display_name,
                  account_id: profile._json.account_id,
                  hooks: profile._json.hooks,
                  self: profile._json.self,
                  repositories: profile._json.repositories,
                  html: profile._json.html,
                  followers: profile._json.followers,
                  avatar: profile._json.avatar,
                  following: profile._json.following,
                  snippets: profile._json.snippets,
                  created_on: profile._json.created_on,
                  is_staff: profile._json.is_staff,
                  location: profile._json.location,
                  type: profile._json.type,
                  uuid: profile._json.uuid,
                  access_token: accessToken,
                  refresh_token: refreshToken,
                  user: user._id
                };
                let searchQuery = {
                    account_id: profile._json.account_id
                  };
                BitbucketUser.findOne(searchQuery, function(err, account) {
                  if (err) {
                    console.log(err);
                  }
                  if (!account) {
                    let bbAccount = new BitbucketUser(bbUserData);
                    bbAccount.save(function(err) {
                      if (err) {
                        console.log(err);
                      }
                      // saved!
                    });
                  }else {
                    GithubUser.update({user: account.user}, {
                      user: user._id
                    }, function(err) {
                        if (err) {
                          console.log(err);
                        }
                      });
                    BitbucketUser.update({user: account.user, account_id: {$ne: account.account_id}}, {
                      user: user._id
                    }, function(err) {
                        if (err) {
                          console.log(err);
                        }
                      });
                    GitlabUser.update({user: account.user}, {
                      user: user._id
                    }, function(err) {
                        if (err) {
                          console.log(err);
                        }
                      });
                    User.find({_id: account.user}).remove().exec();
                    console.log(user._id);
                    account.user = user._id;
                    account.save(function(err) {
                      if (err) {
                        console.log('error');
                        console.log(err);
                      }
                    });
                    return done(null, account);
                  }
                });
              }
            });

          }else {
            let userData = {
              name: `${profile._json.account_id}BB`
            };
            const user = new User(userData);
            user.save(function(err) {
              if (err) {
                console.log(err);
              }
              console.log('saved');
            });
            let bbUserData = {
              username: profile._json.username,
              website: profile._json.website,
              display_name: profile._json.display_name,
              account_id: profile._json.account_id,
              hooks: profile._json.hooks,
              self: profile._json.self,
              repositories: profile._json.repositories,
              html: profile._json.html,
              followers: profile._json.followers,
              avatar: profile._json.avatar,
              following: profile._json.following,
              snippets: profile._json.snippets,
              created_on: profile._json.created_on,
              is_staff: profile._json.is_staff,
              location: profile._json.location,
              type: profile._json.type,
              uuid: profile._json.uuid,
              access_token: accessToken,
              refresh_token: refreshToken,
              user: user._id
            };
            console.log(user);
            let searchQuery = {
                account_id: profile._json.account_id
              };

            let options = {
                upsert: true
              };
            BitbucketUser.findOneAndUpdate(searchQuery, bbUserData, options,
              function(err, user) {
                if (err) {
                  console.log('error');
                  return done(err);
                } else {
                  console.log('success');
                  return done(null, user);
                }
              });
          }

          // request.get('https://api.bitbucket.org/2.0/repositories?role=owner', {
          //   'auth': {
          //     'bearer': accessToken
          //   }},  function (error, response, body) {
          //     console.log('error:', error); // Print the error if one occurred
          //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          //     console.log('body:', body); // Print the HTML for the Google homepage.
          //   }
          // );
        }));
  init();
  return passport;
};
