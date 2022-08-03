const StatusCodes = require("http-status-codes");

const { FORBIDDEN, OK } = StatusCodes.StatusCodes;

const userService = require('../services/user_service');

const { responseJson } = require("../services/response");


function checkLoginMiddlerware(req, res, next) {
    const {email} = req.cookies || {};
    if(!email) {
        return res.status(FORBIDDEN).json(responseJson(100002, null, '请登录'));
    }

    userService.getByEmail(email, (err, data) => {
      if (err) {
        return res.status(FORBIDDEN).json(responseJson(100002, null, '请先登录'));
      }
      next()
    });
}

module.exports = checkLoginMiddlerware;