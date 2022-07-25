const express = require('express');
const Router = express.Router;

const userRouter = require('./users');
const articleRouter = require('./article');


// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/users', userRouter);
baseRouter.use('/article', articleRouter);

// Export default.
module.exports = baseRouter;
