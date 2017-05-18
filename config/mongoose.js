const mongoose =  require('mongoose');
const config = require('./config');

module.exports = function(){
	mongoose.Promise = global.Promise;
	const db = mongoose.connect(config.db);
	require('../db/models/user');
	// require('../server/models/tagModel');
	// require('../server/models/townModel');

	return db;
}