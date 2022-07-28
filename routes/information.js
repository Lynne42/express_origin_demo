const StatusCodes = require("http-status-codes");

const express = require("express");
const router = express.Router();

const informationService = require("../services/information_service");

const { responseJson } = require("../services/response");

// Constants
const { CREATED, OK, INTERNAL_SERVER_ERROR } = StatusCodes.StatusCodes;

// Paths
const p = {
  get: "/",
  add: "/",
};

/**
 * Get all users.
 */
router.get(p.get, async (_, res) => {
  try {
    informationService.getInformation((err, data) => {
      if (err) {
        throw new Error(err);
      }
      return res.status(OK).json(responseJson(0, data, ""));
    });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json(responseJson(100001, null, error.message));
  }
});


/**
 * add one information.
 */
router.post(p.add, (req, res) => {
  try {
    const data = req.body;

    informationService.addInformation(
      data,
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


// Export default
module.exports = router;
