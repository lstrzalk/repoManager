const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Repo = new Schema({
  user: Schema.Types.ObjectId,
  type: String,
  repo: Schema.Types.ObjectId
});

module.exports = mongoose.model('repos', Repo);
