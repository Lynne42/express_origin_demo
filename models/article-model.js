const sqlite = require('sqlite3');
const sqlite3 = sqlite.verbose();

const db = new sqlite3.Database('article.db');

db.serialize(() => {
    const sql = `CREATE TABLE IF NOT EXISTS ARTICLES`;

    db.run(sql);

});

class Article {
    static all(cb) {
        db.all('SELECT * FROM articles', cb);
    }

    static find(id, cb) {
        db.get('SELECT * FROM articles WHERE id = ?', id, cb);
    }

    static create(data, cb) {
        const sql = 'INSERT INTO articles(title, content) VALUES(?, ?)';
        db.run(sql, data.title, data.content, cb)
    }

    static delete(id, cb) {
        if(!id) {
            return cb(new Error('please provide an id'));

        }
        db.run('DELETE FROM articles WHERE id = ?', id, cb)
    }
}

module.exports = db;
module.exports.Article = Article;
