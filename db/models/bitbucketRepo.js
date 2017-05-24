const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BitbucketRepo = new Schema({
    website: String,
    name: String,
    watchers: String,
    branches: String,
    tags: String,
    commits: String,
    http_url_to_repo: String,
    ssh_url_to_repo: String,
    html: String,
    download: String,
    forks: String,
    created_on: String,
    updated_on: String,
    owner: String
});

module.exports = mongoose.model('bitbucketRepo', BitbucketRepo);
