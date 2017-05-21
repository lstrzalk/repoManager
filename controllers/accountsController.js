'use strict';
const GitlabUser = require('../db/models/gitlabUser');
const BitbucketUser = require('../db/models/bitbucketUser');
const GithubUser = require('../db/models/githubUser');
exports.sendAccounts = (res, id) => {
    let searchQuery = {
        user: id
      };
    let accounts = [];
    GitlabUser.find(searchQuery, function(err, account) {
      if (err) {
        res.send(err);
      } else if (account) {
        accounts.push(account);
      }
      GithubUser.findOne(searchQuery, function(err, account) {
        if (err) {
          res.send(err);
        } else if (account) {
          accounts.push(account);
        }
        BitbucketUser.findOne(searchQuery, function(err, account) {
          if (err) {
            res.send(err);
          } else if (account) {
            accounts.push(account);
          }
          res.send(accounts);
        });
      });
    });
  };
