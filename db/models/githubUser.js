const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GithubUser = new Schema({
  login: String,
  id: String,
  avatar_url: String,
  url: String,
  html_url: String,
  followers_url: String,
  following_url: String,
  gists_url:String,
  starred_url: String,
  subscriptions_url: String,
  organizations_url: String,
  repos_url: String,
  events_url: String,
  received_events_url: String,
  type: String,
  site_admin: Boolean,
  name: String,
  company: String,
  blog: String,
  location: String,
  email: String,
  hireable: Boolean,
  bio: String,
  public_repos: Number,
  public_gists: Number,
  followers: Number,
  following: Number,
  created_at: String,
  updated_at: String,
  private_gists: Number,
  total_private_repos: Number,
  owned_private_repos: Number,
  disk_usage: Number,
  collaborators: Number,
  two_factor_authentication: Boolean,
});

module.exports = mongoose.model('githubUsers', GithubUser);
