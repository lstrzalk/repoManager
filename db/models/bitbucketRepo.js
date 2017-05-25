const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BitbucketRepo = new Schema({
    uuid:String,
    website: String,
    name: String,
    watchers: String,
    branches: String,
    tags: String,
    commits: String,
    html: String,
    forks: String,
    created_on: String,
    updated_on: String,
    owner: String
});

module.exports = mongoose.model('bitbucketRepo', BitbucketRepo);
