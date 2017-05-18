const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkedAccounts = new Schema({
  githubAccount: Schema.Types.ObjectId,
  bitbucketAccount: Schema.Types.ObjectId,
  gitlabAccount: Schema.Types.ObjectId
});

module.exports = mongoose.model('linkedAccounts', LinkedAccounts);
