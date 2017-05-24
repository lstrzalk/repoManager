const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GitlabRepo = new Schema({
    id: String,
    description: String,
    default_branch: String,
    tag_list: String,
    public: Boolean,
    archived: Boolean,
    ssh_url_to_repo: String,
    http_url_to_repo: String,
    web_url: String,
    owner: String,
    name: String,
    created_at: String,
    last_activity_at: String
});

module.exports = mongoose.model('gitlabRepo', GitlabRepo);
