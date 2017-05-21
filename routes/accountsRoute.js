'use strict';
let passportGithub = require('../auth/github')(null);
let passportGitlab = require('../auth/gitlab')(null);
let passportBitbucket = require('../auth/bitbucket')(null);
let accountsController = require('../controllers/accountsController');
const checkGrants = require('../auth/checkGrants');
module.exports = function(app) {
  app.get('/accounts/github/',
          checkGrants.checkRepos,
          function(req, res, next) {
    passportGithub = require('../auth/github')(req.user._id);
    next();
  }, passportGithub.authenticate('github'));
  app.get('/accounts/gitlab/',
          checkGrants.checkRepos,
          function(req, res, next) {
    passportGitlab = require('../auth/gitlab')(req.user._id);
    next();
  }, passportGitlab.authenticate('gitlab'));
  app.get('/accounts/bitbucket/',
          checkGrants.checkRepos,
          function(req, res, next) {
    passportBitbucket = require('../auth/bitbucket')(req.user._id);
    next();
  }, passportBitbucket.authenticate('bitbucket'));
  app.get('/accounts', checkGrants.checkRepos,
          function(req, res) {
            accountsController.sendAccounts(res, req.user._id);
          });
};
