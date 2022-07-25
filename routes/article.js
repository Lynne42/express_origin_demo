const StatusCodes = require('http-status-codes');

const express = require('express');
const Router = express.Router();

const articleService = require('../services/article-service');


// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
const p = {
    getAll: '/articles',
    getOne: '/article/:id',
    delete: '/delete/:id',
};



/**
 * Get all users.
 */
router.get(p.getAll, async (_, res) => {
    const articles = await articleService.getAll();
    return res.status(OK).json({articles});
});

/**
 * Get an article.
 */
 router.get(p.getAll, async (req, res) => {
    const { id } = req.params;
    // Check param
    if (!id) {
        throw new Error('get articles error');
    }
    const articles = await articleService.getOne(Number(id));
    return res.status(OK).json({articles});
});

/**
 * Delete one user.
 */
router.delete(p.delete, async (req, res) => {
    const { id } = req.params;
    // Check param
    if (!id) {
        throw new Error('delete error');
    }
    // Fetch data
    await articleService.delete(Number(id));
    return res.status(OK).end();
});


// Export default
module.exports = router;
