'use strict';
const BitbucketUser = require('../db/models/bitbucketUser');
const requests = require('../config/requests');
const urls = require('../config/urls');

exports.getRepos = (id, res) => {
    let searchQuery = {
        user: id
      };
    BitbucketUser.findOne(searchQuery, function(err, account) {
      if (err) {
        res.send(err);
      } else if (account) {
        requests.makeRequest(account, res,
           urls.bitbucketReposOwner, urls.bitbucketRefresh);
      } else {
        res.send({'message': 'user not found'});
      }
    });
  };
