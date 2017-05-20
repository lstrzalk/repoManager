'use strict';
module.exports = (userId) => {
  const config = require('../config/config');
  const passport = require('passport');
  const GitlabStrategy = require('passport-gitlab2').Strategy;
  const User = require('../db/models/user');
  const BitbucketUser = require('../db/models/bitbucketUser');
  const GithubUser = require('../db/models/githubUser');
  const GitlabUser = require('../db/models/gitlabUser');
  const init = require('./init');
  passport.use(new GitlabStrategy({
        clientID: config.gitlabClientId,
        clientSecret: config.gitlabClientSecret,
        callbackURL: 'http://localhost:3000/auth/gitlab/callback'
  }, function(accessToken, refreshToken, profile, done) {
        if (userId !== null) {
          User.findById(userId, function(err, user) {
            if (err) {
              console.log(err);
              return done(err);
            } else {
              //TODO Check if user is an idiot and want to add account being already logged to it
              let glUserData = {
                name: profile._json.name,
                username: profile._json.username,
                id: profile._json.id,
                state: profile._json.state,
                avatar_url: profile._json.avatar_url,
                web_url: profile._json.web_url,
                created_at: profile._json.created_at,
                bio: profile._json.bio,
                location: profile._json.location,
                skype: profile._json.skype,
                linkedin: profile._json.linkedin,
                twitter: profile._json.twitter,
                website_url: profile._json.website_url,
                organization: profile._json.organization,
                last_sign_in_at: profile._json.last_sign_in_at,
                confirmed_at: profile._json.confirmed_at,
                last_activity_on: profile._json.last_activity_on,
                email: profile._json.email,
                projects_limit: profile._json.projects_limit,
                current_sign_in_at: profile._json.current_sign_in_at,
                identities: profile._json.identities,
                can_create_group: profile._json.can_create_group,
                can_create_project: profile._json.can_create_project,
                two_factor_enabled: profile._json.two_factor_enabled,
                external: profile._json.external,
                access_token: accessToken,
                refresh_token: refreshToken,
                user: user._id
              };
              let searchQuery = {
                  id: profile._json.id
                };
              GitlabUser.findOne(searchQuery, function(err, account) {
                if (err) {
                  console.log(err);
                }
                if (!account) {
                  let glAccount = new GitlabUser(glUserData);
                  glAccount.save(function(err) {
                    if (err) {
                      console.log(err);
                      return done(err);
                    }else{
                      return done(null, user);
                    }
                  });
                }else {
                  GitlabUser.update({user: account.user, id: {$ne: account.id}}, {
                    user: user._id
                  }, function(err) {
                      if (err) {
                        console.log(err);
                      }
                    });
                  BitbucketUser.update({user: account.user}, {
                    user: user._id
                  }, function(err) {
                      if (err) {
                        console.log(err);
                      }
                    });
                  GithubUser.update({user: account.user}, {
                    user: user._id
                  }, function(err) {
                      if (err) {
                        console.log(err);
                      }
                    });
                  User.find({_id: account.user._id}).remove().exec();
                  account.user = user._id;
                  account.save(function(err) {
                    if (err) {
                      console.log('error');
                      console.log(err);
                    }
                  });
                  return done(null, user);
                }
              });
            }
          });
        }else{
          GitlabUser.findOne({id:profile._json.id}, function(err, user) {
            if (err) {
              console.log(err);
            } else {
              if(!user){
                let userData = {
                  name: `${profile._json.id}GL`,
                  email: profile._json.email
                };
                const user = new User(userData);
                user.save(function(err, user) {
                  if (err) {
                    console.log(err);
                    return done(err);
                  }else {
                    let glUserData = {
                      name: profile._json.name,
                      username: profile._json.username,
                      id: profile._json.id,
                      state: profile._json.state,
                      avatar_url: profile._json.avatar_url,
                      web_url: profile._json.web_url,
                      created_at: profile._json.created_at,
                      bio: profile._json.bio,
                      location: profile._json.location,
                      skype: profile._json.skype,
                      linkedin: profile._json.linkedin,
                      twitter: profile._json.twitter,
                      website_url: profile._json.website_url,
                      organization: profile._json.organization,
                      last_sign_in_at: profile._json.last_sign_in_at,
                      confirmed_at: profile._json.confirmed_at,
                      last_activity_on: profile._json.last_activity_on,
                      email: profile._json.email,
                      projects_limit: profile._json.projects_limit,
                      current_sign_in_at: profile._json.current_sign_in_at,
                      identities: profile._json.identities,
                      can_create_group: profile._json.can_create_group,
                      can_create_project: profile._json.can_create_project,
                      two_factor_enabled: profile._json.two_factor_enabled,
                      external: profile._json.external,
                      access_token: accessToken,
                      refresh_token: refreshToken,
                      user: user._id
                    };
                    console.log(user._id);
                    let searchQuery = {
                        id: profile._json.id
                      };

                    let options = {
                        upsert: true
                      };
                    GitlabUser.findOneAndUpdate(searchQuery, glUserData, options,
                      function(err) {
                        if (err) {
                          console.log('error');
                          return done(err);
                        } else {
                          console.log('success');
                          return done(null, user);
                        }
                      });
                  }
                });
              } else{
                User.findOne({_id: user.user}, function(err, user){
                  if (err) {
                    console.log('error');
                    return done(err);
                  } else {
                    console.log('success');
                    return done(null, user);
                  }
                });
              }
            }
          });
        }
  }));


  init();
  return passport;
};
