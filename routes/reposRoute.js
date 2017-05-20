'use strict';
module.exports = function(app) {
    const bitbucketController = require('../controllers/bitbucketController.js');
    const githubController = require('../controllers/githubController.js');
    const gitlabController = require('../controllers/gitlabController.js');
    app.get('/repos/bitbucket/:id', function(req, res) {
      bitbucketController.getRepos(req.params.id, res);
    });
    app.get('/repos/github/:id', function(req, res) {
      githubController.getRepos(req.params.id, res);
    });
    app.get('/repos/gitlab/:id', function(req, res) {
      gitlabController.getRepos(req.params.id, res);
    });
  };
