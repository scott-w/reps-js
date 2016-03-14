'use strict';
/* jshint node: true */
/* jshint esversion: 6 */

const Fixtures = require('sequelize-fixtures');

const models = require('../../models');


exports.fixtures = function(fixtures, done) {
  models.sequelize.sync({force: true}).then(() => {
    return Fixtures.loadFile(fixtures, models);
  }).then(() => {
    if (done) {
      done();
    }
  }).catch((err) => {
    console.error('error', err);
    if (done) {
      done()
    }
  });
};


exports.authHeader = 'Bearer ' +
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20' +
  'iLCJzY29wZSI6WyJhbGwiXSwiaWQiOjcsImlhdCI6MTQ1NDc1NTU3MH0.EzQTjkaQ0SfT5_8' +
  'SxuYAW9pVg9ZbWUrMEfOI79T0YZQ';
