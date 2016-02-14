/* jshint: node */
const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const proxyServer = function(req) {
  if (req.headers.accept) {
    return req.headers.accept.indexOf('application/json') > -1;
  }
};

const assetServer = function(req) {
  return req.url.startsWith('/js/') || req.url.startsWith('/css/');
};

const server = http.createServer(function(req, res) {
  if (proxyServer(req)) {
    console.log('json');
    proxy.web(req, res, {
      target: 'http://localhost:3000'
    });
  }
  else if (assetServer(req)) {
    console.log('assets');
    console.log(req.url);
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  }
  else {
    console.log('index');
    req.url = '/';
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  }

});

console.log('Listening on port 8000');

server.listen(8000);
