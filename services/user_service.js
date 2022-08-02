const { User } = require("../models/user_model");

/**
 * Get all users.
 *
 * @returns
 */
function getUsers(cb) {
  try {
    User.all(cb);
  } catch (error) {
    return error;
  }
}

/**
 * get one user.
 *
 * @param user
 * @returns
 */
function getOne(id, cb) {
  try {
    User.find(id, cb);
  } catch (error) {
    return error;
  }
}

/**
 * get one user by email.
 *
 * @param user
 * @returns
 */
function getByEmail(email, cb) {
  try {
    User.findByEmail(email, cb);
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
    User.add(data, cb);
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
    User.update(data, cb);
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
    User.delete(id, cb);
  } catch (error) {
    return error;
  }
}

// Export default
module.exports = {
  getAll: getUsers,
  getOne,
  addOne,
  update,
  delete: deleteOne,
  getByEmail,
};
