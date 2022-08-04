const createError = require("http-errors");
const express = require("express");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");

const logDirectory = path.join(__dirname, "log");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});

const apiRouter = require("./routes/api");
const checkLoginMiddlerware = require("./middleware/checkLogin");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));

// 解析body请求体信息
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 解析cookie
app.use(cookieParser());

// 静态文件
app.use(express.static(path.join(__dirname, "public")));

// 日志
app.use(
  morgan(
    function (tokens, req, res) {
      return [
        `请求方式：${tokens.method(req, res)},请求链接：${tokens.url(
          req,
          res
        )},请求状态：${tokens.status(req, res)},时间格式：${tokens.date(
          req,
          res,
          "web"
        )},远程地址：${tokens["remote-addr"](req, res)},远程用户：${tokens[
          "remote-user"
        ](req, res)},http版本：${tokens["http-version"](
          req,
          res
        )},请求长度：${tokens.req(
          req,
          res,
          "content-length"
        )},响应时间：${tokens["response-time"](req, res)},浏览器信息：${tokens[
          "user-agent"
        ](req, res)},
    `,
      ];
    },
    { stream: accessLogStream }
  )
);

// 登录态校验
app.use("/api", checkLoginMiddlerware);

// 路由
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
