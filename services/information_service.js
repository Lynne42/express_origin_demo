const Entry = require("../models/information_model");

/**
 * Get all users.
 *
 * @returns
 */
async function getInformation(cb) {
  try {
    const data = await Entry.getRange(0, -1);
    cb(null, data);

  } catch (error) {
    cb(error)
  }
}


/**
 * Delete a user by their id.
 *
 * @param id
 * @returns
 */
async function addInformation(data, cb) {
  try {
    
    const entry = new Entry(data);
    const result = await entry.save();
    cb(null, result)
  } catch (error) {
    cb(error)
  }
}


// Export default
module.exports = {
  getInformation,
  addInformation,
};
