'use strict';
/* jshint node: true */
/* jshint esversion: 6 */

const Fixtures = require('sequelize-fixtures');

const models = require('../models');


exports.fixtures = function(fixtures, done) {
  const options = {cascade: true};

  models.sequelize.sync({force: true}).then(() => {
    Fixtures.loadFile(fixtures, models).then(() => {
      if (done) {
        done();
      }
    }).catch((err) => {
      console.error('loadFileErr', err);
    });
  }).catch((err) => {
    console.error('syncErr', err);
  });
};


exports.authHeader = 'Bearer ' +
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20' +
  'iLCJzY29wZSI6WyJhbGwiXSwiaWQiOjcsImlhdCI6MTQ1NDc1NTU3MH0.EzQTjkaQ0SfT5_8' +
  'SxuYAW9pVg9ZbWUrMEfOI79T0YZQ';
