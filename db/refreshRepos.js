'use strict';
const GithubUser = require('./models/githubUser');
const GitlabUser = require('./models/gitlabUser');
const BitbucketUser = require('./models/bitbucketUser');
const Repo = require('./models/repo');
const RepoUser = require('./models/repoUser');
const urls = require('../config/urls');
const config = require('../config/config');

const request = require('request');

exports.getRepos = (id) => {
  console.log('REPOS CONTROLLER');
  console.log(`ID: ${id}`);
  let searchQuery = {
      user: id
    };
  GithubUser.find(searchQuery, function(err, accounts) {
    if (err) {
      console.log(err);
    } else if (accounts) {
      for (let account of accounts) {
        refreshRepos(account, id, urls.githubRepos, urls.githubRefresh);
      }
    } else {
      console.log('error');
    }
  });
  GitlabUser.find(searchQuery, function(err, accounts) {
    if (err) {
      console.log(err);
    } else if (accounts) {
      for (let account of accounts) {
        refreshRepos(account, id, urls.gitlabRepos, urls.gitlabRefresh);
      }
    } else {
      console.log('error');
    }
  });
  BitbucketUser.find(searchQuery, function(err, accounts) {
    if (err) {
      console.log(err);
    } else if (accounts) {
      for (let account of accounts) {
        refreshRepos(account, id, urls.bitbucketReposOwner, urls.bitbucketRefresh);
      }
    } else {
      console.log('error');
    }
  });
};
const refreshRepos = (account, id, reposURL, refreshURL) => {
  let completeUrl = {
    url: reposURL,
    headers: {
      'User-Agent': 'repoManager',
      'Authorization': `Bearer ${account.access_token}`
    }
  };
  request.get(completeUrl,  function(error, response, body) {
    if (response && response.statusCode >= 400) {
      if (refreshURL === null) {
        console.log(response.statusCode);
      }else {
        console.log('Token Expired');
        refreshToken(account, id, reposURL, refreshURL);
      }
    } else if (response) {
      //TODO Update DB and add to list
      let repos;
      if (reposURL.includes('bitbucket')) {
        repos = JSON.parse(body).values;
      } else {
        repos = JSON.parse(body);
      }
      for (let repo of repos) {
        let data;
        if (reposURL.includes('github')) {
          data = githubMapper(repo);
        } else if (reposURL.includes('gitlab')) {
          data = gitlabMapper(repo);
        } else {
          data = bitbucketMapper(repo);
        }
        Repo.findOne({id: data.id})
          .then((foundRepo) => {
            if (!foundRepo) {
              new Repo(data).save()
                .then((savedRepo) => {
                    let repoUserData = {
                      user: id,
                      type: savedRepo.type,
                      repo: savedRepo._id
                    };
                    new RepoUser(repoUserData).save()
                      .catch((err) => {console.log(err);});
                  })
                .catch((err) => {console.log(err);});
            }else {
              foundRepo.id = data.id;
              foundRepo.name = data.name;
              foundRepo.description = data.description;
              foundRepo.ssh = data.ssh;
              foundRepo.clone = data.clone;
              foundRepo.html = data.html;
              foundRepo.created_at = data.created_at;
              foundRepo.updated_at = data.updated_at;
              foundRepo.private = data.private;
              foundRepo.owner = data.owner;
              foundRepo.save()
                .catch((err) => {console.log(err);});
            }
          })
          .catch((err) => {console.log(err);});
      }
    } else {
      console.log('Unknown Error');
    }
  });
};
const refreshToken = (account, id, url, refresh) => {
  let data = `{"refresh_token":"${account.refresh_token}","grant_type":"refresh_token"}`;
  let json_obj = JSON.parse(data);
  let auth = '';
  if (url.includes('gitlab')) {
    auth = `'Basic ${new Buffer(`${config.gitlabClientId}:${config.gitlabClientSecret}`).toString('base64')}'`;
  }else {
    auth = `Basic ${new Buffer(`${config.bitbucketClienId}:${config.bitbucketClientSecret}`).toString('base64')}`;
  }
  request.post({
      headers: {'content-type': 'application/json', 'Authorization': auth},
      url: refresh,
      form: json_obj
    }, function(error, response) {
    if (response && response.statusCode >= 400) {
      console.log(JSON.parse(response.body));
    } else if (response) {
      let parsed_res = JSON.parse(response.body);
      account.access_token = parsed_res.access_token;
      account.refresh_token = parsed_res.refresh_token;
      account.save(function(err) {
        if (err) {
          console.log(err);
        } else {
          refreshRepos(account, id, url, refresh);
        }
      });
    } else {
      console.log('error');
    }
  });
};
const githubMapper = (githubRepo) => {
  return {
    id: githubRepo.id,
    name: githubRepo.name,
    type: 'Github',
    description: githubRepo.description,
    ssh: githubRepo.ssh_url,
    clone: githubRepo.clone_url,
    html: githubRepo.svn_url,
    created_at: githubRepo.created_at,
    updated_at: githubRepo.updated_at,
    owner: githubRepo.owner.login,
    private: githubRepo.private
  };
};
const gitlabMapper = (gitlabRepo) => {
  return {
    id: gitlabRepo.id,
    name: gitlabRepo.name,
    type: 'Gitlab',
    description: gitlabRepo.description,
    ssh: gitlabRepo.ssh_url_to_repo,
    clone: gitlabRepo.http_url_to_repo,
    html: gitlabRepo.web_url,
    created_at: gitlabRepo.created_at,
    updated_at: gitlabRepo.last_activity_at,
    owner: gitlabRepo.owner.username,
    private: gitlabRepo.public
  };
};
const bitbucketMapper = (bitbucketRepo) => {
  return {
    id: bitbucketRepo.uuid,
    name: bitbucketRepo.name,
    type: 'Bitbucket',
    description: bitbucketRepo.description,
    ssh: bitbucketRepo.links.clone[0].href,
    clone: bitbucketRepo.links.clone[1].href,
    html: bitbucketRepo.links.html.href,
    created_at: bitbucketRepo.created_on,
    updated_at: bitbucketRepo.updated_on,
    owner: bitbucketRepo.owner.username,
    private: bitbucketRepo.is_private
  };
};
