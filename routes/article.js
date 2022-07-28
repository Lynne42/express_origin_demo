const StatusCodes = require("http-status-codes");

const express = require("express");
const router = express.Router();

const articleService = require("../services/article_service");

const { responseJson } = require("../services/response");

// Constants
const { CREATED, OK, INTERNAL_SERVER_ERROR } = StatusCodes.StatusCodes;

// Paths
const p = {
  getAll: "/all",
  getOne: "/:id",
  delete: "/:id",
  add: "/",
  update: "/:id",
};

/**
 * Get all users.
 */
router.get(p.getAll, async (_, res) => {
  try {
    articleService.getAll((err, article) => {
      if (err) {
        throw new Error(err);
      }
      return res.status(OK).json(responseJson(0, article, ""));
    });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json(responseJson(100001, null, error.message));
  }
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
    articleService.getOne(Number(id), (err, data) => {
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
    const { title, content } = req.body;

    if (!title) {
      throw new Error("title cannot be null ");
    }
    if (!content) {
      throw new Error("content cannot be null ");
    }
    articleService.addOne(
      {
        title,
        content,
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

    const { title, content } = req.body;

    if (!id) {
      throw new Error("id cannot be null ");
    }

    if (!title) {
      throw new Error("title cannot be null ");
    }

    if (!content) {
      throw new Error("content cannot be null ");
    }

    articleService.update(
      {
        id,
        title,
        content,
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
    console.log(222, id);
    // Check param
    if (!id) {
      throw new Error("delete error");
    }
    // Fetch data
    articleService.delete(Number(id), (err, data) => {
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
