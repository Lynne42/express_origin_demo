const StatusCodes = require("http-status-codes");

const express = require("express");
const router = express.Router();

const userService = require("../services/user_service");

const { responseJson } = require("../services/response");

// Constants
const { CREATED, OK } = StatusCodes.StatusCodes;

// Paths
const p = {
  getAll: "/",
  getOne: "/:id",
  delete: "/:id",
  add: "/",
  update: "/:id",
};

/**
 * Get all users.
 */
router.get(p.getAll, (req, res) => {
 
  userService.getAll((err, article) => {
    if (err) {
      throw new Error(err);
    }
    return res.status(OK).json(responseJson(0, article, ""));
  });
});

/**
 * Get an article.
 */
router.get(p.getOne, (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("get articles error");
    }
    userService.getOne(Number(id), (err, data) => {
      if (err) {
        throw new Error(err);
      }
      return res.status(OK).json(responseJson(0, data, ""));
    });
  } catch (error) {
    return res.status(OK).json(responseJson(100002, null, error.message));
  }
});

/**
 * add one article.
 */
router.post(p.add, (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email) {
      throw new Error("email cannot be null ");
    }
    if (!name) {
      throw new Error("name cannot be null ");
    }
    if (!password) {
      throw new Error("password cannot be null ");
    }
    userService.addOne(
      {
        email,
        name,
        password,
      },
      (err, data) => {
        if (err) {
          throw new Error(err);
        }
        return res.status(OK).json(responseJson(0, data, "add success"));
      }
    );
  } catch (error) {
    return res.status(OK).json(responseJson(100002, null, error.message));
  }
});

/**
 * update one article.
 */
router.put(p.update, (req, res) => {
  try {
    const { id } = req.params;

    const { name } = req.body;

    if (!name) {
      throw new Error("name cannot be null ");
    }

    userService.update(
      {
        id,
        name,
      },
      (err, data) => {
        if (err) {
          throw new Error(err);
        }
        return res.status(OK).json(responseJson(0, data, "update success"));
      }
    );
  } catch (error) {
    return res.status(OK).json(responseJson(100002, null, error.message));
  }
});

/**
 * Delete one article.
 */
router.delete(p.delete, (req, res) => {
  try {
    const { id } = req.params;
    // Check param
    if (!id) {
      throw new Error("delete error");
    }
    // Fetch data
    userService.delete(Number(id), (err, data) => {
      if (err) {
        throw new Error(err);
      }
      return res.status(OK).json(responseJson(0, {}, "delete success"));
    });
  } catch (error) {
    return res.status(OK).json(responseJson(100003, null, error.message));
  }
});

// Export default
module.exports = router;
