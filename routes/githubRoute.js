const passportGithub = require('../auth/github');
module.exports = function(app, passport) {
    app.get('/auth/github', passportGithub.authenticate('github', {scope: ['user','repo']}));
    app.get('/auth/github/callback',
        passportGithub.authenticate('github', {failureRedirect: '/'}),
        function(req, res) {
            // Successful authentication
            res.json(req.user);
    });
}