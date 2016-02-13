/* jshint: node */
const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const proxyServer = function(req) {
  if (req.headers.accept) {
    return req.headers.accept.indexOf('application/json') > -1;
  }
};

const server = http.createServer(function(req, res) {
  console.log(req.headers);
  console.log(req.url);
  if (proxyServer(req)) {
    console.log('json');
    proxy.web(req, res, {
      target: 'http://localhost:3000'
    });
  }
  else {
    console.log('assets');
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  }

});

console.log('Listening on port 8000');

server.listen(8000);
