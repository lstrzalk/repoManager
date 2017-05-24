'use strict';
module.exports = function(app) {
    const bitbucketController = require('../controllers/bitbucketController.js');
    const githubController = require('../controllers/githubController.js');
    const gitlabController = require('../controllers/gitlabController.js');
    const reposController = require('../controllers/reposController.js');
    const checkGrants = require('../auth/checkGrants');
    app.get('/repos/bitbucket/', checkGrants.checkRepos, function(req, res) {
      bitbucketController.getRepos(req.user._id, res);
    });
    app.get('/repos/github/', checkGrants.checkRepos, function(req, res) {
      githubController.getRepos(req.user._id, res);
    });
    app.get('/repos/gitlab/', checkGrants.checkRepos, function(req, res) {
      gitlabController.getRepos(req.user._id, res);
    });
    app.get('/repos/', checkGrants.checkRepos, function(req) {
      reposController.getRepos(req.user._id);
    });
  };
