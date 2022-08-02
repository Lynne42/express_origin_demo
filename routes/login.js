const StatusCodes = require("http-status-codes");

const express = require("express");
const router = express.Router();

const userService = require("../services/user_service");

const { responseJson } = require("../services/response");

// Constants
const { CREATED, OK } = StatusCodes.StatusCodes;

// Paths
const p = {
  login: "/",
};

/**
 * add one article.
 */
router.post(p.login, (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("email cannot be null ");
    }
    if (!password) {
      throw new Error("password cannot be null ");
    }

    userService.getByEmail(email, (err, data) => {
      if (err) {
        throw err;
      }
      console.log(data);
      if(data && data[0]) {
        const { email, password: pd } = data[0];
        if(pd === password) {
            return res.status(OK).json(responseJson(0, null, "登录成功"));
        }
        return res.status(OK).json(responseJson(100002, null, "密码错误"));
      } else {
        return res.status(OK).json(responseJson(100001, null, "用户不存在"));
      }
      
    });
  } catch (error) {
    return res.status(OK).json(responseJson(100002, null, error.message));
  }
});

// Export default
module.exports = router;
