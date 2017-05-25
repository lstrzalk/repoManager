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
const GithubRepo = require('../db/models/githubRepo');
const GitlabRepo = require('../db/models/gitlabRepo');
const BitbucketRepo = require('../db/models/bitbucketRepo');
const Repo = require('../db/models/repo');
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
        if(reposURL.includes('github')){
          let githubData = {
                id:repo.id ,
                name:repo.name ,
                owner:repo.owner.login ,
                git_url:repo.git_url ,
                ssh_url:repo.ssh_url ,
                clone_url:repo.clone_url ,
                svn_url:repo.svn_url ,
                language:repo.language ,
                forks:repo.forks ,
                warchers:repo.warchers ,
                pushed_at:repo.pushed_at ,
                created_at:repo.created_at ,
                updated_at:repo.updated_at ,
                default_branch:repo.default_branch
          };
          let options = {
              upsert: true
          };
          GithubRepo.findOneAndUpdate({id:githubData.id}, githubData, options,
            function(err, savedRepo) {
              if (err) {
                console.log('error');
              } else {
                let newRepoId;
                if(savedRepo ===null){
                  let newGithubRepo = new GithubRepo(githubData);
                  newGithubRepo.save(function(err){console.log(err);});
                  newRepoId = newGithubRepo._id;
                } else {
                  newRepoId = savedRepo._id;
                }
                let repoUserData = {
                  user:id,
                  type:'Github',
                  repo:newRepoId
                };
                Repo.update({repo:newRepoId}, repoUserData, options,
                  function(err){
                    console.log(err);
                  });
              }
            });
        }
        else if(reposURL.includes('gitlab')){
          let gitlabData = {
                id: repo.id,
                description: repo.description,
                default_branch: repo.default_branch,
                tag_list: repo.tag_list,
                public: repo.public,
                archived: repo.archived,
                ssh_url_to_repo: repo.ssh_url_to_repo,
                http_url_to_repo: repo.http_url_to_repo,
                web_url: repo.web_url,
                owner: repo.owner.username,
                name: repo.name,
                created_at: repo.created_at,
                last_activity_at:repo.last_activity_at,
                star_count: repo.star_count,
                forks_count: repo.forks_count,
          };
          let options = {
              upsert: true
          };
          
          GitlabRepo.findOneAndUpdate({id:gitlabData.id}, gitlabData, options,
            function(err, savedRepo) {
              if (err) {
                console.log('error');
              } else {
                let newRepoId;
                if(savedRepo ===null){
                  let newGitLabRepo = new GitlabRepo(gitlabData);
                  newGitLabRepo.save(function(err){console.log(err);});
                  newRepoId = newGitLabRepo._id;
                } else {
                  newRepoId = savedRepo._id;
                }
                let repoUserData = {
                  user:id,
                  type:'Gitlab',
                  repo:newRepoId
                };
                Repo.update({repo:newRepoId}, repoUserData, options,
                  function(err){
                    console.log(err);
                  });
              }
            });
        }
        else {
          //parse clone props
          let bitbucketData = {
                uuid:repo.uuid,
                website: repo.website,
                name: repo.name,
                watchers: repo.links.watchers.href,
                branches: repo.links.branches.href,
                tags: repo.links.tags.href,
                commits: repo.links.commits.href,
                html: repo.links.html.href,
                forks: repo.links.forks.href,
                created_on: repo.created_on,
                updated_on: repo.updated_on,
                owner: repo.owner.username
          };
          //console.log(bitbucketData);
          let options = {
              upsert: true
          };
          BitbucketRepo.findOneAndUpdate({uuid:bitbucketData.uuid}, bitbucketData, options,
            function(err, savedRepo) {
              if (err) {
                console.log(err);
              } else {
                console.log(savedRepo);
                let newRepoId;
                if(savedRepo ===null){
                  let newBitbucketRepo = new BitbucketRepo(bitbucketData);
                  newBitbucketRepo.save(function(err){console.log(err);});
                  newRepoId = newBitbucketRepo._id;
                } else {
                  newRepoId = savedRepo._id;
                }
                let repoUserData = {
                  user:id,
                  type:'Bitbucket',
                  repo:newRepoId
                };
                Repo.update({repo:newRepoId}, repoUserData, options,
                  function(err){
                    console.log(err);
                  });
              }
            });
        }
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
