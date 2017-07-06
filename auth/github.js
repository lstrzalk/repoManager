'use strict';
module.exports = (userId) => {
  const config = require('../config/config');
  const passport = require('passport');
  const GithubStrategy = require('passport-github2').Strategy;
  const User = require('../db/models/user');
  const BitbucketUser = require('../db/models/bitbucketUser');
  const GithubUser = require('../db/models/githubUser');
  const GitlabUser = require('../db/models/gitlabUser');
  const RepoUser = require('../db/models/repoUser');
  const init = require('./init');
  const refreshRepos = require('../db/refreshRepos');
  passport.use(new GithubStrategy({
      clientID: config.githubClienId,
      clientSecret: config.githubClientSecret,
      // callbackURL: 'http://192.168.99.100:3000/auth/github/callback'
      callbackURL: 'http://localhost:3000/auth/github/callback'
  }, function(accessToken, refreshToken, profile, done) {
        if (userId !== -1) {
          User.findById(userId, function(err, user) {
            if (err) {
              console.log(err);
              return done(err);
            } else {
              //TODO Check if user is an idiot and want to add account being already logged to it
              let ghUserData = {
                login: profile._json.login,
                id: profile._json.id,
                avatar_url: profile._json.avatar_url,
                url: profile._json.url,
                html_url: profile._json.html_url,
                followers_url: profile._json.followers_url,
                following_url: profile._json.following_url,
                gists_url:profile._json.gists_url,
                starred_url: profile._json.starred_url,
                subscriptions_url: profile._json.subscriptions_url,
                organizations_url: profile._json.organizations_url,
                repos_url: profile._json.repos_url,
                events_url: profile._json.events_url,
                received_events_url: profile._json.received_events_url,
                type: profile._json.type,
                site_admin: profile._json.site_admin,
                name: profile._json.name,
                company: profile._json.company,
                blog: profile._json.blog,
                location: profile._json.location,
                email: profile._json.email,
                hireable: profile._json.hireable,
                bio: profile._json.bio,
                public_repos: profile._json.public_repos,
                public_gists: profile._json.public_gists,
                followers: profile._json.followers,
                following: profile._json.following,
                created_at: profile._json.created_at,
                updated_at: profile._json.updated_at,
                private_gists: profile._json.private_gists,
                total_private_repos: profile._json.total_private_repos,
                owned_private_repos: profile._json.owned_private_repos,
                disk_usage: profile._json.disk_usage,
                collaborators: profile._json.collaborators,
                two_factor_authentication: profile._json.two_factor_authentication,
                access_token: accessToken,
                refresh_token: refreshToken,
                user: user._id
              };
              let searchQuery = {
                  id: profile._json.id
                };
              GithubUser.findOne(searchQuery, function(err, account) {
                if (err) {
                  console.log(err);
                }
                if (!account) {
                  let ghAccount = new GithubUser(ghUserData);
                  ghAccount.save(function(err, account) {
                    if (err) {
                      console.log(err);
                      return done(err);
                    }else{
                      refreshRepos.getRepos(account.user);
                      return done(null, user);
                    }
                  });
                }else {
                  GithubUser.update({user: account.user, id: {$ne: account.id}}, {
                    ghUserData
                  },{multi: true}, function(err) {
                      if (err) {
                        console.log(err);
                      }
                    });
                  BitbucketUser.update({user: account.user}, {
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
        }else{
          GithubUser.findOne({id:profile._json.id}, function(err, user) {
            if (err) {
              console.log(err);
            } else {
              if(!user){
                let userData = {
                  name: `${profile._json.id}GH`,
                  email: profile._json.email
                };
                const user = new User(userData);
                user.save(function(err) {
                  if (err) {
                    console.log(err);
                    return done(err);
                  }else {
                    let ghUserData = {
                      login: profile._json.login,
                      id: profile._json.id,
                      avatar_url: profile._json.avatar_url,
                      url: profile._json.url,
                      html_url: profile._json.html_url,
                      followers_url: profile._json.followers_url,
                      following_url: profile._json.following_url,
                      gists_url:profile._json.gists_url,
                      starred_url: profile._json.starred_url,
                      subscriptions_url: profile._json.subscriptions_url,
                      organizations_url: profile._json.organizations_url,
                      repos_url: profile._json.repos_url,
                      events_url: profile._json.events_url,
                      received_events_url: profile._json.received_events_url,
                      type: profile._json.type,
                      site_admin: profile._json.site_admin,
                      name: profile._json.name,
                      company: profile._json.company,
                      blog: profile._json.blog,
                      location: profile._json.location,
                      email: profile._json.email,
                      hireable: profile._json.hireable,
                      bio: profile._json.bio,
                      public_repos: profile._json.public_repos,
                      public_gists: profile._json.public_gists,
                      followers: profile._json.followers,
                      following: profile._json.following,
                      created_at: profile._json.created_at,
                      updated_at: profile._json.updated_at,
                      private_gists: profile._json.private_gists,
                      total_private_repos: profile._json.total_private_repos,
                      owned_private_repos: profile._json.owned_private_repos,
                      disk_usage: profile._json.disk_usage,
                      collaborators: profile._json.collaborators,
                      two_factor_authentication: profile._json.two_factor_authentication,
                      access_token: accessToken,
                      refresh_token: refreshToken,
                      user: user._id
                    };
                    new GithubUser(ghUserData).save()
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
              } else {
                User.findOne({_id: user.user})
                  .then((user) => {
                    console.log('success');
                    console.log(user)
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
