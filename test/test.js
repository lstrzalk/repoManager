'use strict';

const expect  = require('chai').expect;
const request = require('request');

const baseUrl = 'http://localhost:3000/';

const githubUrl = 'http://localhost:3000/auth/github';
const gitlabUrl = 'http://localhost:3000/auth/gitlab';
const bitbucketUrl = 'http://localhost:3000/auth/bitbucket';

describe('Main Page test', () => {
    it('loading main page', () => {
        request.get(baseUrl, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            // done();
          });
      });
  });
describe('Github test', () => {
    it('auth res', () => {
        request.get(githubUrl, function(error, response, body) {
            expect(response.statusCode).to.equal(302);
            // done();
          });
      });
  });
describe('Gitlab test', () => {
    it('auth res', () => {
        request.get(gitlabUrl, function(error, response, body) {
            expect(response.statusCode).to.equal(302);
            // done();
          });
      });
  });
describe('Bitbucket test', () => {
    it('auth res', () => {
        request.get(bitbucketUrl, function(error, response, body) {
            expect(response.statusCode).to.equal(302);
            // done();
          });
      });
  });
