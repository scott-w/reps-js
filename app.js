/* jshint node: true */
const jwt = require('./api/auth/jwt');

const Hapi = require('hapi');
var models = require('./models');
var jwtConfig = require('./config/jwt');

const server = new Hapi.Server();
server.connection({
  routes: {
    cors: true
  },
  port: process.env.PORT || 3000
});

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


module.exports = server;
