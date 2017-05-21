'use strict';
const GitlabUser = require('../db/models/gitlabUser');
const requests = require('../config/requests');
const urls = require('../config/urls');
exports.getRepos = (id, res) => {
    let searchQuery = {
        user: id
      };
    GitlabUser.findOne(searchQuery, function(err, account) {
      if (err) {
        res.send(err);
      } else if (account) {
        requests
          .makeRequest(account, res, urls.gitlabRepos, urls.gitlabRefresh);
      } else {
        res.send({'message': 'user not found'});
      }
    });
  };
