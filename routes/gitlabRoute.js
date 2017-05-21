'use strict';
const passportGitlab = require('../auth/gitlab')(null);
let passportGitlab2 = passportGitlab;
module.exports = function(app) {
  app.get('/gitlab/test', function(req, res, next) {
    // let id = req.params.id;
    passportGitlab2 = require('../auth/gitlab')(req.user._id);
    next();
  },
  passportGitlab2.authenticate('gitlab', {
    scope: ['api']
  }));
  app.get('/auth/gitlab', passportGitlab.authenticate('gitlab', {
    scope: ['api']
  }));
  app.get('/auth/gitlab/callback',
    passportGitlab.authenticate('gitlab', {
      failureRedirect: '/'
    }),
    function(req, res) {
      // Successful authentication
      res.json(req.user);
    });
};
