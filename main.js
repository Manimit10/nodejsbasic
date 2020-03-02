const http = require('http');
require('dotenv').config();

const app = require('./app');

const port = process.env.PORT || 3000;

http.createServer(app.handleRequest).listen(port);
