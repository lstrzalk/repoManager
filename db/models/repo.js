const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Repo = new Schema({
  id:String,
  name: String,
  type: String,
  description: String,
  ssh: String,
  http: String,
  html: String,
  created_at: String,
  updated_at: String,
  owner: String,
  private: Boolean
});

module.exports = mongoose.model('Repo', Repo);
