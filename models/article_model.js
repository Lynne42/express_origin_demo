const db = require("./mysql");

class Article {
  static all(data, cb) {
    db.query(
      "SELECT * FROM `article` WHERE `userid` = ?",
      [data.userid],
      function (err, results) {
        if (err) {
          cb(err)
        }
        cb(null, results);
      }
    );
  }

  static find(id, cb) {
    db.query(
      "SELECT * FROM `article` WHERE `id` = ?",
      [id],
      function (err, results) {
        if (err) {
          cb(err)
        }
        cb(null, results);
      }
    );
  }

  static add(data, cb) {
    const sql = "INSERT INTO article SET ?";
    db.query(
      sql,
      {
        title: data.title,
        content: data.content,
        userid: data.userid,
      },
      function (err, results) {
        if (err) {
          cb(err)
        }
        cb(null, results);
      }
    );
  }

  static update(data, cb) {
    const sql = "UPDATE article SET title=?,content=? WHERE id = ?";
    db.query(sql, [data.title, data.content, data.id], cb);
  }

  static delete(id, cb) {
    if (!id) {
      throw new Error("please provide an id");
    }
    db.query("DELETE FROM article WHERE id = ?", id, cb);
  }
}

module.exports = db;
module.exports.Article = Article;
