/* jshint node: true */
/* jshint esversion: 6 */
'use strict';

const bcrypt = require('bcrypt');
const models = require('../../models');

const jwt = require('./jwt');
const forms = require('./forms');


const getUserByEmail = function (email) {
  return models.User.findOne({
    where: {
      email: email
    }
  });
};


/** Get the JWT token from the request user */
const token = function (request, reply) {
  getUserByEmail(request.query.email).then(function (result) {
    if (result) {
      const user = result.dataValues;
      bcrypt.compare(request.query.password, user.password, (err, match) => {
        if (match) {
          return reply({
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            scope: 'all',
            token: jwt.getToken(result)
          });
        }

        return reply({
          password: 'Incorrect'
        }).code(400);
      });
    }
    else {
      return reply({
        password: 'Incorrect'
      }).code(400);
    }
  });
};


/** Create a new user */
const createUser = function (request, reply) {
  const createErrors = forms.createUserError(request.payload);

  if (createErrors) {
    return reply(createErrors).code(400);
  }
  getUserByEmail(request.payload.email).then((result) => {
    if (result) {
      return reply({
          email: 'Already exists'
        }).code(400);

    }
    else {
      const email = request.payload.email;
      const password = request.payload.password;
      const first_name = request.payload.first_name;
      const last_name = request.payload.last_name;

      bcrypt.hash(password, bcrypt.genSaltSync(10), (err, hash) => {
        if (err) {
          return reply({
            error: 'An error occurred with your password'
          }).code(400);
        }
        models.User.create({
          email: email,
          password: hash,
          first_name: first_name,
          last_name: last_name
        }).then((instance) => {
          reply({
            email: instance.email,
            id: instance.id,
            first_name: instance.first_name,
            last_name: instance.last_name,
            token: jwt.getToken(instance)
          }).code(201);
        }).catch(err => {
          console.error(err);
          reply({error: 'An error occurred'}).code(500);
        });
      });
    }
  });
};


module.exports = {
  token: token,
  createUser: createUser
};
