const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const apiRouter = require('./routes/api');
const checkLoginMiddlerware = require('./middleware/checkLogin');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

// 解析body请求体信息
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 解析cookie
app.use(cookieParser());

// 静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 
app.use('/api', checkLoginMiddlerware)

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
