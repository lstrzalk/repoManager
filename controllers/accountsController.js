'use strict';
const GitlabUser = require('../db/models/gitlabUser');
const BitbucketUser = require('../db/models/bitbucketUser');
const GithubUser = require('../db/models/githubUser');
exports.sendAccounts = (res, id) => {
    let searchQuery = {
        user: id
      };
    let accounts = [];
    GitlabUser.find(searchQuery, function(err, accountgh) {
      if (err) {
        res.send(err);
      } else {
        console.log(accountgh);
        accounts.push({'Gitlab': accountgh});
      }
      GithubUser.find(searchQuery, function(err, accountgl) {
        if (err) {
          res.send(err);
        } else {
          accounts.push({'Github': accountgl});
        }
        BitbucketUser.find(searchQuery, function(err, account) {
          if (err) {
            res.send(err);
          } else {
            accounts.push({'Bitbucket': account});
          }
          res.send(accounts);
        });
      });
    });
  };
