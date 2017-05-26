'use strict';
const passportBitbucket = require('../auth/bitbucket')(-1);
let passportBitbucket2 = passportBitbucket;
module.exports = function(app) {
    app.get('/bitbucket/test', function(req, res, next) {
      // let id = req.params.id;
      passportBitbucket2 = require('../auth/bitbucket')(req.user._id);
      next();
    },
    passportBitbucket2.authenticate('bitbucket'));
    app.get('/auth/bitbucket', passportBitbucket.authenticate('bitbucket'));
    app.get('/auth/bitbucket/callback',
        passportBitbucket.authenticate('bitbucket', {failureRedirect: '/auth'}),
        function(req, res) {
            // Successful authentication
            res.redirect('/');
          });
  };
