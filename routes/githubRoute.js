'use strict';
const passportGithub = require('../auth/github');
module.exports = function(app) {
    app.get('/auth/github',
        passportGithub.authenticate('github', {scope: ['user','repo']}));
    app.get('/auth/github/callback',
        passportGithub.authenticate('github', {failureRedirect: '/'}),
        function(req, res) {
            // Successful authenticatio
            res.json(req.user);
          });
  };
