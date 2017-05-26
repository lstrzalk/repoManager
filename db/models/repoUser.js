const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RepoUser = new Schema({
  user: Schema.Types.ObjectId,
  type: String,
  repo: {type:Schema.Types.ObjectId,ref:'Repo'}
});

module.exports = mongoose.model('RepoUser', RepoUser);
