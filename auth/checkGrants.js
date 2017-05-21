'use strict';

exports.checkRepos = (req, res, next) => {
    if (req.isAuthenticated()){
      return next();
    }else {
      res.redirect('/auth');
  }
};
