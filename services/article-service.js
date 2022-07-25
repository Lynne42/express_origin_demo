const { getAll, getArticle, deleteArticle } = require('../repos/article-repo');

/**
 * Get all users.
 * 
 * @returns 
 */
function getArticles() {
    try {
        const result = getAll()
    } catch (error) {
        return error
    }
}


/**
 * Add one user.
 * 
 * @param user 
 * @returns 
 */
function getOne(id) {
    try {
        const result = getArticle(id);
    } catch (error) {
        return error
    }
}

/**
 * Delete a user by their id.
 * 
 * @param id 
 * @returns 
 */
async function deleteOne(id) {
    try {
        const result = deleteArticle(id);
    } catch (error) {
        return error
    }
}


// Export default
module.exports = {
    getAll: getArticles,
    getOne,
    delete: deleteOne,
};
