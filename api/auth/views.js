/* jshint node: true */
/* jshint esversion: 6 */
'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtConfig = require('../../config/jwt');
const models = require('../../models');


const getUserByEmail = function (email) {
  return models.User.findOne({
    where: {
      email: email
    }
  });
};

const getToken = function(user) {
  const tokenData = {
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    scope: ['all'],
    id: user.id
  };

  return jwt.sign(tokenData, jwtConfig.privateKey);
};

const createUserInstance = function (email, password, first_name, last_name) {
  return models.User.create({
    email: email,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    first_name: first_name,
    last_name: last_name
  });
};


/** Get the JWT token from the request user */
const token = function (request, reply) {
  getUserByEmail(request.query.email).then(function (result) {
    if (result && bcrypt.compareSync(request.query.password, result.password)) {

      reply({
        email: result.email,
        first_name: result.first_name,
        last_name: result.last_name,
        scope: 'all',
        token: getToken(result)
      });
    } else {
      reply({
          password: 'Incorrect'
        }).code(400);
    }
  });
};


/** Create a new user */
const createUser = function (request, reply) {
  getUserByEmail(request.payload.email).then((result) => {
      if (result) {
        reply({
            email: 'Already exists'
          }).code(400);

      } else {
        createUserInstance(
          request.payload.email, request.payload.password,
          request.payload.first_name, request.payload.last_name
        ).then((instance) => {
            reply({
                email: instance.email,
                id: instance.id,
                first_name: instance.first_name,
                last_name: instance.last_name,
                token: getToken(instance)
              }).code(201);
          });
      }
    });
};


module.exports = {
  token: token,
  createUser: createUser
};
