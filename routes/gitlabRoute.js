'use strict';
const passportGitlab = require('../auth/gitlab');
module.exports = function(app) {
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
