module.exports = function(app) {
    const index = require('../controllers/indexController.js');
    app.get('/', index.render);
}