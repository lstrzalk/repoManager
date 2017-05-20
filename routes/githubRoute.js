'use strict';
const passportGithub = require('../auth/github')(null);
let passportGithub2 = passportGithub;
module.exports = function(app) {
    app.get('/github/test/:id', function(req, res, next) {
      let id = req.params.id;
      passportGithub2 = require('../auth/github')(id);
      next();
    },
    passportGithub2.authenticate('github'));
    app.get('/auth/github',
        passportGithub.authenticate('github', {scope: ['user','repo']}));
    app.get('/auth/github/callback',
        passportGithub.authenticate('github', {failureRedirect: '/'}),
        function(req, res) {
            // Successful authenticatio
            res.json(req.user);
          });
  };
