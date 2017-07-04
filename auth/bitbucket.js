'use strict';
module.exports = (id) => {
  const config = require('../config/config');
  const passport = require('passport');
  const BitbucketStrategy = require('passport-bitbucket-oauth2').Strategy;
  const User = require('../db/models/user');
  const BitbucketUser = require('../db/models/bitbucketUser');
  const GithubUser = require('../db/models/githubUser');
  const GitlabUser = require('../db/models/gitlabUser');
  const RepoUser = require('../db/models/repoUser');
  const init = require('./init');
  const refreshRepos = require('../db/refreshRepos');
  passport.use(new BitbucketStrategy({
      clientID: config.bitbucketClienId,
      clientSecret: config.bitbucketClientSecret,
      callbackURL: 'http://192.168.99.100:3000/auth/bitbucket/callback'
    }, function(accessToken, refreshToken, profile, done) {
          if (id !== -1) {
            User.findById(id, function(err, user) {
              if (err) {
                console.log(err);
                return done(err);
              } else {
                //TODO Check if user is an idiot and want to add account being already logged to it
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
                    bbAccount.save(function(err, account) {
                      if (err) {
                        console.log(err);
                        return done(err);
                      }else{
                        refreshRepos.getRepos(account.user);
                        return done(null, user);
                      }
                    });
                  }else {
                    GithubUser.update({user: account.user}, {
                      user: user._id
                    },{multi: true}, function(err) {
                        if (err) {
                          console.log(err);
                        }
                      });
                    BitbucketUser.update({user: account.user, account_id: {$ne: account.account_id}}, {
                      user: user._id
                    },{multi: true}, function(err) {
                        if (err) {
                          console.log(err);
                        }
                      });
                    GitlabUser.update({user: account.user}, {
                      user: user._id
                    },{multi: true}, function(err) {
                        if (err) {
                          console.log(err);
                        }
                      });
                  RepoUser.update({user: account.user}, {
                    user: user._id
                  },{multi: true}, function(err) {
                      if (err) {
                        console.log(err);
                      }
                    });
                    User.find({_id: account.user}).remove().exec();
                    account.user = user._id;
                    account.save()
                      .then(()=>{
                        refreshRepos.getRepos(account.user);
                        return done(null, user);
                    })
                      .catch((err) => {
                        console.log(err);
                        return done(err);
                    });
                  }
                });
              }
            });
          }else {
            BitbucketUser.findOne({account_id:profile._json.account_id}, function(err, user) {
              if (err) {
                console.log(err);
              }else {
                if(!user){
                  let userData = {
                    name: `${profile._json.account_id}BB`
                  };
                  const user = new User(userData);
                  user.save(function(err, user) {
                    if (err) {
                      console.log(err);
                      return done(err);
                    }else {
                      refreshRepos.getRepos(user._id);
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
                      new BitbucketUser(bbUserData).save()
                        .then(() => {
                          refreshRepos.getRepos(user._id);
                          return done(null, user);
                        })
                        .catch((err) => {
                          console.log('error');
                          return done(err);
                        });
                    }
                  });
                }else {
                  console.log(user);
                  User.findOne({_id: user.user})
                    .then((user) => {
                      console.log(user);
                      console.log('success');
                      refreshRepos.getRepos(user._id);
                      return done(null, user);
                    })
                    .catch((err) => {
                      console.log(err);
                      return done(err);
                  });
                }
              }
            });
          }
        }));
  init();
  return passport;
};
