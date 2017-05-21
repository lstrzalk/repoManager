'use strict';
const passportGithub = require('../auth/github')(null);
let passportGithub2 = passportGithub;
module.exports = function(app) {
    app.get('/github/test/', function(req, res, next) {
      // let id = req.params.id;
      passportGithub2 = require('../auth/github')(req.user._id);
      next();
    },
    passportGithub2.authenticate('github'));
    app.get('/auth/github',
        passportGithub.authenticate('github', {scope: ['user','repo']}));
    app.get('/auth/github/callback',
        passportGithub.authenticate('github', {failureRedirect: '/auth'}),
        function(req, res) {
            // Successful authenticatio
            res.redirect('/');
          });
  };
