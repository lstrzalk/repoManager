'use strict';

const expect  = require('chai').expect;
const request = require('request');

const baseUrl = 'http://localhost:3000/';

const githubUrl = 'http://localhost:3000/auth/github';
const gitlabUrl = 'http://localhost:3000/auth/gitlab';
const bitbucketUrl = 'http://localhost:3000/auth/bitbucket';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../config/express.js');
let should = chai.should();

chai.use(chaiHttp);

describe('Main Page test', () => {
    it('loading main page', () => {
        request.get(baseUrl, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
          });
      });
  });
describe('Github test', () => {
    it('auth res', () => {
        request.get(githubUrl, function(error, response, body) {
            expect(response.statusCode).to.equal(302);
            done();
          });
      });
  });
describe('Gitlab test', () => {
    it('auth res', () => {
        request.get(gitlabUrl, function(error, response, body) {
            expect(response.statusCode).to.equal(302);
            done();
          });
      });
  });
describe('Bitbucket test', () => {
    it('auth res', () => {
        // request.get(bitbucketUrl, function(error, response, body) {
        //     expect(response.statusCode).to.equal(302);
        //     done();
        //   });
        chai.request(server)
            .get(bitbucketUrl)
            .end((err, res) => {
                res.should.have.status(302);
                // res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
              });
      });
  });
