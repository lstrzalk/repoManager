'use strict';
const passportBitbucket = require('../auth/bitbucket')(null);
let passportBitbucket2 = passportBitbucket;
module.exports = function(app) {
    app.get('/bitbucket/test/:id', function(req, res, next) {
      let id = req.params.id;
      passportBitbucket2 = require('../auth/bitbucket')(id);
      next();
    },
    passportBitbucket2.authenticate('bitbucket'));
    app.get('/auth/bitbucket', passportBitbucket.authenticate('bitbucket'));
    app.get('/auth/bitbucket/callback',
        passportBitbucket.authenticate('bitbucket', {failureRedirect: '/'}),
        function(req, res) {
            // Successful authentication
            res.json(req.user);
          });
  };
