const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BitbucketUser = new Schema({
    username: String,
    website: String,
    display_name: String,
    account_id: String,
    hooks: String,
    self: String,
    repositories: String,
    html: String,
    followers: String,
    avatar: String,
    following: String,
    snippets: String,
    created_on: String,
    is_staff: Boolean,
    location: String,
    type: String,
    uuid: String,
    access_token: String,
    refresh_token: String,
    user: Schema.Types.ObjectId
});

module.exports = mongoose.model('bitbucketUsers', BitbucketUser);
