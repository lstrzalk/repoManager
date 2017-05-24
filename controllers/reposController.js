// TODO Update db every sign in
// TODO Update db every sign in
// TODO Update db every sign in
// TODO Update db every sign in
// TODO Update db every sign in
// TODO Update db every sign in
'use strict';
const GithubUser = require('../db/models/githubUser');
const GitlabUser = require('../db/models/gitlabUser');
const BitbucketUser = require('../db/models/bitbucketUser');
//TODO const GithubRepo = require('../db/models/githubRepo');
//TODO const GitlabRepo = require('../db/models/gitlabRepo');
//TODO const BitbucketRepo = require('../db/models/bitbucketRepo');
const urls = require('../config/urls');
const request = require('request');
const config = require('../config/config');

exports.getRepos = (id) => {
  let searchQuery = {
      user: id
    };
  let reposList = [];
  GithubUser.find(searchQuery, function(err, accounts) {
    if (err) {
      // TODO
    } else if (accounts) {
      for (let account of accounts) {
        refreshRepos(account, id, reposList, urls.githubRepos, urls.githubRefresh);
      }
    } else {
      // TODO
    }
  });
  GitlabUser.find(searchQuery, function(err, accounts) {
    if (err) {
      // TODO
    } else if (accounts) {
      for (let account of accounts) {
        refreshRepos(account, id, reposList, urls.gitlabRepos, urls.gitlabRefresh);
      }
    } else {
      // TODO
    }
  });
  BitbucketUser.find(searchQuery, function(err, accounts) {
    if (err) {
      // TODO
    } else if (accounts) {
      for (let account of accounts) {
        refreshRepos(account, id, reposList, urls.bitbucketReposOwner, urls.bitbucketRefresh);
      }
    } else {
      // res.send({'message': 'user not found'});
    }
  });
};
const refreshRepos = (account, id, reposList, reposURL, refreshURL) => {
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
        refreshToken(account, id, reposList, reposURL, refreshURL);
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
        console.log(repo);
        // reposList.push(repo);
        // if(reposList.includes("bitbucket")){
        //
        // }else if(reposList.includes("github")){
        //
        // }else {
        //
        // }
      }
    } else {
      console.log('Unknown Error');
    }
  });
};
const refreshToken = (account, id, reposList, url, refresh) => {
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
      //TODO
    } else if (response) {
      let parsed_res = JSON.parse(response.body);
      account.access_token = parsed_res.access_token;
      account.refresh_token = parsed_res.refresh_token;
      account.save(function(err) {
        if (err) {
          //TODO
        } else {
          // request.get(url, {
          //    'auth': {
          //      'bearer': user.access_token
          //    }
          //  },  function(error, response, body) {
          //      console.log(body);
          //      res.send(body);
          //  });
          refreshRepos(account, id, reposList, url, refresh);
        }
      });
    } else {
      //TODO
    }
  });
};
