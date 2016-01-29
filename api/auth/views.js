/* jshint node: true */
/* jshint esversion: 6 */
'use strict';

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var jwtConfig = require('../config/jwt');
var models = require('../models');


var getUserByEmail = function (email) {
  return models.User.findOne({
    where: {
      email: email
    }
  });
};


var createUserInstance = function (email, password) {
  models.User.create({
    email: email,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  });
};


/** Get the JWT token from the request user */
var token = function (request, reply) {
  getUserByEmail(request.query.email)
    .then(function (result) {
      if (result && bcrypt.compareSync(request.query.password, result.password)) {
        var tokenData = {
          userName: result.email,
          scope: ['all'],
          id: result.id
        };
        reply({
          email: result.email,
          scope: 'all',
          token: jwt.sign(tokenData, jwtConfig.privateKey)
        });
      } else {
        reply({
            password: 'Incorrect'
          })
          .code(400);
      }
    });
};

/** Create a new user */
var createUser = function (request, reply) {
  getUserByEmail(request.payload.email)
    .then(function (result) {
      if (result) {
        reply({
            email: 'Already exists'
          })
          .code(400);
      } else {
        createUserInstance(request.payload.email, request.payload.password)
          .then(function (instance) {
            reply({
                email: instance.email,
                id: instance.id
              })
              .code(201);
          });
      }
    });
};


module.exports = {
  token: token,
  createUser: createUser
};
