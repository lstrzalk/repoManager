'use strict';
const GitlabUser = require('../db/models/gitlabUser');
const requests = require('../config/requests');
const urls = require('../config/urls');

// exports.getRepos = (id, res) => {
//     let searchQuery = {
//         user: id
//     };
//     GitlabUser.findOne(searchQuery, function(err, account) {
//       if (err) {
//         console.log(err);
//         res.send({"message" : "DB ERROR"});
//       } else if(account) {
//         request.get('https://gitlab.com/api/v3/projects', {
//            'auth': {
//              'bearer': account.access_token
//            }
//          },  function(error, response, body) {
//             //  if(response && response.statusCode >= 400){
//             if(true){
//                console.log("TOKEN EXPIRED");
//                let data = `{"refresh_token":"${account.refresh_token}","grant_type":"refresh_token"}`;
//                let json_obj = JSON.parse(data);
//                request.post({
//                    headers: {'content-type':'application/json', 'Authorization':'Basic M2NhNDU0M2FjYTczZjIwZmZmMjQwNjEyMWU3YTNhMzUyYmFmYmU3NmE2MWI2ZmRmZGMzYzVlMjUyNGRkYjU1Yjo2Y2ZjNTQ2NDcwNjQyZjk3ODU0ZDZlZDA5ZWFiMTdmMjU2NjE1MzQ0MDE0YzA5ODBmNmEwOTBhYTlhNmJhMDE3'},
//                    url:'https://gitlab.com/oauth/token',
//                    form: json_obj
//                },function(error, response, body){
//                  console.log(response.statusCode);
//                  console.log("AFTER REFRESHIN TOKEN");
//                  if(response && response.statusCode >= 400){
//                    res.send(response);
//                  } else if (response) {
//                   //  console.log(account.refresh_token);
//                   //  console.log(response.body);
//                   //  console.log(response.body.access_token);
//                   //  console.log(response.body.refresh_token);
//                    let parsed_res = JSON.parse(response.body);
//                    account.access_token = parsed_res.access_token;
//                    account.refresh_token = parsed_res.refresh_token;
//                    console.log(parsed_res.access_token);
//                    console.log(parsed_res.refresh_token);
//                    account.save(function(err, user) {
//                      if (err) {
//                        console.log("ZWRACAM Z NULL");
//                        console.log(err);
//                        res.send({"message":"chuj"});
//                      } else {
//                        console.log("ZWRACAM OK");
//                        console.log(user);
//                        request.get('https://gitlab.com/api/v3/projects', {
//                           'auth': {
//                             'bearer': user.access_token
//                           }
//                         },  function(error, response, body) {
//                             console.log(response);
//                             res.send(response);
//                         });
//                      }
//                    });
//                  }
//                });
//              } else if (response) {
//                console.log(response);
//                res.send(response);
//              } else {
//                console.log("ERROR");
//                res.send({"message" : "ERROR"});
//              }
//          });
//       } else {
//         res.send({"message" : "user not found"});
//       }
//     });
// }
//
//
//

exports.getRepos = (id, res) => {
    let searchQuery = {
        user: id
      };
    GitlabUser.findOne(searchQuery, function(err, account) {
      if (err) {
        res.send(err);
      } else if (account) {
        requests
          .makeRequest(account, res, urls.gitlabRepos, urls.gitlabRefresh);
      } else {
        res.send({'message': 'user not found'});
      }
    });
  };

// const makeRequest = (account, res) => {
//   request.get('https://gitlab.com/api/v3/projects', {
//      'auth': {
//        'bearer': account.access_token
//      }
//    },  function(error, response, body) {
//       if(response && response.statusCode >= 400){
//         refreshToken(account, res);
//        } else if (response) {
//          res.send(response);
//        } else {
//          let msg = {"message" : "ERROR"};
//          res.send(msg);
//        }
//    });
// }
// const refreshToken = (account, res) => {
//   let data = `{"refresh_token":"${account.refresh_token}","grant_type":"refresh_token"}`;
//   let json_obj = JSON.parse(data);
//   request.post({
//       headers: {'content-type':'application/json', 'Authorization':'Basic M2NhNDU0M2FjYTczZjIwZmZmMjQwNjEyMWU3YTNhMzUyYmFmYmU3NmE2MWI2ZmRmZGMzYzVlMjUyNGRkYjU1Yjo2Y2ZjNTQ2NDcwNjQyZjk3ODU0ZDZlZDA5ZWFiMTdmMjU2NjE1MzQ0MDE0YzA5ODBmNmEwOTBhYTlhNmJhMDE3'},
//       url:'https://gitlab.com/oauth/token',
//       form: json_obj
//   },function(error, response, body){
//     if(response && response.statusCode >= 400){
//       let msg = {"message" : response.body};
//       res.send(msg);
//     } else if (response) {
//       let parsed_res = JSON.parse(response.body);
//       account.access_token = parsed_res.access_token;
//       account.refresh_token = parsed_res.refresh_token;
//       account.save(function(err, user) {
//         if (err) {
//           console.log(err);
//           let msg = {"message" : err};
//           res.send(msg);
//         } else {
//           // request.get('https://gitlab.com/api/v3/projects', {
//           //    'auth': {
//           //      'bearer': user.access_token
//           //    }
//           //  },  function(error, response, body) {
//           //      console.log(response);
//           //      res.send(response);
//           //  });
//           makeRequest(user, res);
//         }
//       });
//     } else {
//       let msg = {"message" : "ERROR"};
//       res.send(msg);
//     }
//   });
// }
