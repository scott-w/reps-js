/* jshint node: true */
/* jshint esversion: 6 */
'use strict';

const jwt = require('./api/auth/jwt');

const Hapi = require('hapi');
var models = require('./api/models');
var jwtConfig = require('./api/config/jwt');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.register(require('hapi-auth-jwt2'), (err) => {
  if (err) {
    console.log(err);
  }

  server.auth.strategy('jwt', 'jwt', {
    key: jwtConfig.privateKey,
    validateFunc: jwt,
    verifyOptions: {
      algorithms: [ 'HS256' ]
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (req, reply) => {
      reply('hello');
    }
  });

  server.route(require('./api/auth/routes'));
  server.route(require('./api/user/routes'));
  server.route(require('./api/workouts/routes'));

});

models.sequelize.sync().then(function() {
  server.start(() => {
      console.log('Server running at:', server.info.uri);
  });
});
