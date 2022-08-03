const db = require("./mysql");
const bcrypt = require("bcrypt");
const { bcryptSaltRounds } = require("../constants/index");

class User {
  static all(cb) {
    db.query("SELECT * FROM `user`", function (err, results) {
      if (err) {
        cb(err);
      }
      cb(null, results);
    });
  }

  static find(id, cb) {
    db.query(
      "SELECT * FROM `user` WHERE `id` = ?",
      [id],
      function (err, results) {
        if (err) {
          cb(err);
        }
        cb(null, results);
      }
    );
  }

  static findByEmail(email, cb) {
    db.query(
      "SELECT * FROM `user` WHERE `email` = ?",
      [email],
      function (err, results) {
        if (err) {
          cb(err);
        }
        cb(null, results);
      }
    );
  }

  static add(data, cb) {
    const sql = "INSERT INTO user SET ?";

    bcrypt.genSalt(bcryptSaltRounds, function (err, salt) {
      bcrypt.hash(data.password, salt, function (err, hash) {
        db.query(
          sql,
          {
            email: data.email,
            name: data.name,
            password: hash,
          },
          function (err, results) {
            if (err) {
              cb(err);
            }
            cb(null, results);
          }
        );
      });
    });
  }

  static update(data, cb) {
    const sql = "UPDATE user SET name=? WHERE id = ?";
    db.query(sql, [data.name, data.id], cb);
  }

  static delete(id, cb) {
    if (!id) {
      throw new Error("please provide an id");
    }
    db.query("DELETE FROM user WHERE id = ?", id, cb);
  }
}

module.exports = db;
module.exports.User = User;
