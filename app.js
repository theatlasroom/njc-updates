var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var weeks = require('./routes/weeks');
var prototypes = require('./routes/prototypes');
var todos = require('./routes/todos');
var documentation = require('./routes/documentation');
var docs = require('./routes/docs');
var report_app = require('./reports/app');
var proxy = require('./routes/proxy');

var app = express();
app.locals.pretty = true;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set the static asset path
app.use('/static', express.static('public'));

app.use('/', routes);
app.use('/users', users);
app.use('/weeks', weeks);
// app.use('/todos', todos); // removed - now all on asana
app.use('/prototype-list', prototypes);
app.use('/documentation', documentation);
app.use('/docs', docs);
app.use('/reports', report_app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
