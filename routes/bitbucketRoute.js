'use strict';
const passportBitbucket = require('../auth/bitbucket');
module.exports = function(app) {
    app.get('/auth/bitbucket', passportBitbucket.authenticate('bitbucket'));
    app.get('/auth/bitbucket/callback',
        passportBitbucket.authenticate('bitbucket', {failureRedirect: '/'}),
        function(req, res) {
            // Successful authentication
            res.json(req.user);
          });
  };
