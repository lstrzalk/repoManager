'use strict';
const RepoUser = require('../db/models/repoUser');
const GithubRepo = require('../db/models/githubRepo');
const GitlabRepo = require('../db/models/gitlabRepo');
const BitbucketRepo = require('../db/models/bitbucketRepo');

exports.getRepos = (id, res) => {
    let searchQuery = {
        user: id
      };
    RepoUser
      .find(searchQuery)
      .populate('repo')
      .exec((err, repos) => {
        if(err){
          res.send(err);
        }else {
          res.json(repos);
        }
      });
  };
  exports.getVCSRepos = (id, type, res) => {
    let searchQuery = {
        user: id,
        type: type
      };
    RepoUser
      .find(searchQuery)
      .populate('repo')
      .exec((err, repos) => {
        if(err){
          res.send(err);
        }else {
          res.json(repos);
        }
      });
  };
