/* jshint node: true */
const jwt = require('./api/auth/jwt');

const Hapi = require('hapi');
const models = require('./models');
const jwtConfig = require('./config/jwt');
const rollbarConfig = require('./config/rollbar');

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
    validateFunc: jwt.verify,
    verifyOptions: {
      algorithms: [ 'HS256' ]
    }
  });

  server.route(require('./api/auth/routes'));
  server.route(require('./api/user/routes'));
  server.route(require('./api/workouts/routes'));

});


server.register(require('inert'), (err) => {
  if (err) {
    console.log(err);
  }

  server.route({
    method: 'GET',
    path: '/',
    handler: {
      file: __dirname + '/assets/index.html'
    }
  });
  server.route({
    method: 'GET',
    path: '/{dir}/{filename}',
    handler: {
      file: function(request) {
        return `${__dirname}/assets/${request.params.dir}/${request.params.filename}`;
      }
    }
  });
  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
      file: __dirname + '/assets/index.html'
    }
  });
});


if (rollbarConfig.useRollbar) {
  server.register({
    register: require('icecreambar'),
    options: {
      'accessToken': rollbarConfig.rollbarKey
    }
  }, function (err) {

    if (err) {
      throw err;
    }
    var rollbar = server.plugins.icecreambar.default;

    rollbar.handleUncaughtExceptions(rollbarConfig.rollbarKey, {
      exitOnUncaughtException: true
    });
  });
}


models.sequelize.sync().then(function() {
  server.start(() => {
      console.log('Server running at:', server.info.uri);
  });
});


module.exports = server;
