'use strict';
module.exports = function(app) {
    const reposController = require('../controllers/reposController.js');
    const checkGrants = require('../auth/checkGrants');
    app.get('/repos/bitbucket/', checkGrants.checkRepos, function(req, res) {
      reposController.getVCSRepos(req.user._id, 'Bitbucket', res);
    });
    app.get('/repos/github/', checkGrants.checkRepos, function(req, res) {
      reposController.getVCSRepos(req.user._id, 'Github', res);
    });
    app.get('/repos/gitlab/', checkGrants.checkRepos, function(req, res) {
      reposController.getVCSRepos(req.user._id, 'Gitlab', res);
    });
    app.get('/repos/', checkGrants.checkRepos, function(req, res) {
      reposController.getRepos(req.user._id, res);
    });
  };
