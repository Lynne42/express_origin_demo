const express = require('express');
const Router = express.Router;

const userLoginRouter = require('./login');
const userRouter = require('./users');
const articleRouter = require('./article');
const informationRouter = require('./information');


// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/login', userLoginRouter);
baseRouter.use('/users', userRouter);
baseRouter.use('/articles', articleRouter);
baseRouter.use('/information', informationRouter);

// Export default.
module.exports = baseRouter;
