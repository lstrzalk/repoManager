'use strict';
const request = require('request');
const config = require('./config');
const makeRequest = (account, res, url, refresh) => {
  let completeUrl = {
    url: url,
    headers: {
      'User-Agent': 'repoManager',
      'Authorization': `Bearer ${account.access_token}`
    }
  };
  request.get(completeUrl,  function(error, response) {
      if (response && response.statusCode >= 400) {
        // if(true){
        if (refresh === null) {
          res.send(response.body);
        }else {
          refreshToken(account, res, url, refresh);
        }
      } else if (response) {
        res.send(response);
      } else {
        let msg = {'message': 'ERROR'};
        res.send(msg);
      }
    });
};
const refreshToken = (account, res, url, refresh) => {
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
      let msg = {'message': response.body};
      res.send(msg);
    } else if (response) {
      let parsed_res = JSON.parse(response.body);
      account.access_token = parsed_res.access_token;
      account.refresh_token = parsed_res.refresh_token;
      account.save(function(err, user) {
        if (err) {
          let msg = {'message': err};
          res.send(msg);
        } else {
          // request.get(url, {
          //    'auth': {
          //      'bearer': user.access_token
          //    }
          //  },  function(error, response, body) {
          //      console.log(response);
          //      res.send(response);
          //  });
          makeRequest(user, res, url, refresh);
        }
      });
    } else {
      let msg = {'message': 'ERROR'};
      res.send(msg);
    }
  });
};
exports.makeRequest = makeRequest;
