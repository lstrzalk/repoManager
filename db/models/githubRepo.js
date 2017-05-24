const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GithubRepo = new Schema({
    id: String,
    name: String,
    owner: String,
    git_url: String,
    ssh_url: String,
    clone_url: String,
    svn_url: String,
    language: String,
    forks: String,
    warchers: String,
    pushed_at: String,
    created_at: String,
    updated_at: String,
    default_branch: String
});

module.exports = mongoose.model('githubRepo', GithubRepo);
