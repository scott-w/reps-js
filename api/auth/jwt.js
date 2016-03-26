'use strict';
/* jshint node: true */
/* jshint esversion: 6 */
const models = require('../../models');
const jwt = require('jsonwebtoken');

const jwtConfig = require('../../config/jwt');


exports.getToken = function(user) {
  const tokenData = {
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    scope: ['all'],
    id: user.id
  };

  return jwt.sign(tokenData, jwtConfig.privateKey, {expiresIn: '30d'});
};


exports.verify = function(decoded, request, callback) {
  models.User.findOne({
    attributes: [
      'email', 'id', 'first_name', 'last_name', 'createdAt', 'updatedAt'
    ],
    where: {
      email: decoded.email
    }
  }).then(function(result) {
    if (result) {
      return callback(null, true, result.dataValues);
    }
    else {
      return callback(null, false);
    }
  });
};
