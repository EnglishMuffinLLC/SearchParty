'use strict'
const express = require('express');
const app = express();
const methodOverride = require('method-override');
// const db = require('./db/backup.cypher');rs

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);
app.use(methodOverride());

require('./routes/routes.js')(app, express);

module.exports = app;
