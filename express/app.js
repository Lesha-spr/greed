'use strict';

const express = require('express');
const compression = require('compression');
const path = require('path');
const stormpath = require('express-stormpath');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config/');
//const morgan = require('./morgan/morgan.js');
const router = require('./routes/');
const root = require('app-root-path');

// FIXME: uncomment on prod
//import './helpers/mkdirs/mkdirs.js';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(compression());
app.use(favicon(`${root}/public/favicon.png`));
app.use(logger('dev'));
app.use(stormpath.init(app, config.stormpath));
// FIXME: uncomment on prod
//app.use(morgan);
app.use(bodyParser.json());
app.use(express.static(`${root}/public`, {
    maxage: '365 days'
}));

app.use('/', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');

    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;