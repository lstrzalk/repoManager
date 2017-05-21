'use strict';
const checkGrants = require('../auth/checkGrants');
module.exports = function(app) {
    const index = require('../controllers/indexController.js');
    app.get('/', checkGrants.checkRepos, index.render);
    //TODO ATTENZIONE/WARNING/DELETE IT AFTER DEVELOPMENT
    app.get('/auth', function(req, res) {
        res.redirect('/');
      });
  };
