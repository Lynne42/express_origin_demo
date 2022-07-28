const Entry = require("../models/information_model");

/**
 * Get all users.
 *
 * @returns
 */
function getInformation(cb) {
  try {
    Entry.getRange(0, -1, cb);
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
function addInformation(data, cb) {
  try {
    console.log(data)
    const entry = new Entry(data);
    entry.save(cb);

  } catch (error) {
    return error;
  }
}


// Export default
module.exports = {
  getInformation,
  addInformation,
};
