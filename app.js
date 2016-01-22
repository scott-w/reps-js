/* jshint node: true */
/* jshint esversion: 6 */
'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.start(() => {
    console.log('Server running at:', server.info.uri);
});
