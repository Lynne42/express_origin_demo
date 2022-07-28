const express = require('express');
const Router = express.Router;

const userRouter = require('./users');
const articleRouter = require('./article');
const informationRouter = require('./information');


// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/users', userRouter);
baseRouter.use('/article', articleRouter);
baseRouter.use('/information', informationRouter);

// Export default.
module.exports = baseRouter;
