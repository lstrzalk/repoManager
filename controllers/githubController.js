'use strict';
const GithubUser = require('../db/models/githubUser');
const requests = require('../config/requests');
const urls = require('../config/urls');

exports.getRepos = (id, res) => {
    let searchQuery = {
        user: id
      };
    GithubUser.findOne(searchQuery, function(err, account) {
      if (err) {
        res.send(err);
      } else if (account) {
        requests
          .makeRequest(account, res, urls.githubRepos, urls.githubRefresh);
      } else {
        res.send({'message': 'user not found'});
      }
    });
  };
