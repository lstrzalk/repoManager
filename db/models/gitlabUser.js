const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GitlabUser = new Schema({
  name: String,
  username: String,
  id: String,
  state: String,
  avatar_url: String,
  web_url: String,
  created_at: String,
  bio: String,
  location: String,
  skype: String,
  linkedin: String,
  twitter: String,
  website_url: String,
  organization: String,
  last_sign_in_at: String,
  confirmed_at: String,
  last_activity_on: String,
  email: String,
  projects_limit: 100000,
  current_sign_in_at: String,
  identities: Array,
  can_create_group: Boolean,
  can_create_project: Boolean,
  two_factor_enabled: Boolean,
  external: Boolean 
});

module.exports = mongoose.model('gitlabUsers', GitlabUser);
