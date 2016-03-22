import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from './morgan/morgan.js';
import router from './routes/';
import {path as root} from 'app-root-path';

// FIXME: uncomment on prod
//import './helpers/mkdirs/mkdirs.js';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(`${root}/public/favicon.png`));
app.use(logger('dev'));
// FIXME: uncomment on prod
//app.use(morgan);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(`${root}/public`));

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