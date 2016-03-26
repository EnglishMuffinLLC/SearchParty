'use strict'
const app = require('./server/server.js');
const config = require('./server/config/config.js');
const httpPort = config.HTTPPORT || 8000;
const httpsPort = config.HTTPSPORT || 8001;
const https = require('https');
const http = require('http');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('server.crt')
};

// Create an HTTP service.
http.createServer(app).listen(httpPort, () => console.log(`express HTTP server listening on port ${httpPort}`));
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(httpsPort, () => console.log(`express HTTPS server listening on port ${httpsPort}`) );