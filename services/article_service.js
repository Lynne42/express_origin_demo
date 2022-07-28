const { Article } = require("../models/article_model");

/**
 * Get all users.
 *
 * @returns
 */
function getArticles(cb) {
  try {
    Article.all(cb);
  } catch (error) {
    return error;
  }
}

/**
 * Add one user.
 *
 * @param user
 * @returns
 */
function getOne(id, cb) {
  try {
    Article.find(id, cb);
  } catch (error) {
    return error;
  }
}

/**
 * Delete a user by their id.
 *
 * @param id
 * @returns
 */
function addOne(data, cb) {
  try {
    Article.create(data, cb);
  } catch (error) {
    return error;
  }
}

/**
 * Delete a user by their id.
 *
 * @param id
 * @returns
 */
function update(data, cb) {
  try {
    Article.update(data, cb);
  } catch (error) {
    return error;
  }
}

/**
 * Delete a user by their id.
 *
 * @param id
 * @returns
 */
function deleteOne(id, cb) {
  try {
    Article.delete(id, cb);
  } catch (error) {
    return error;
  }
}

// Export default
module.exports = {
  getAll: getArticles,
  getOne,
  addOne,
  update,
  delete: deleteOne,
};
