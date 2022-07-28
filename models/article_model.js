const sqlite3 = require('sqlite3').verbose();

const path = require('path');
const db_path = path.resolve(__dirname, '../db/article.db');

const db = new sqlite3.Database(db_path);

console.log(122, db_path, db)

// db.serialize(() => {
//     const sql = `CREATE TABLE IF NOT EXISTS ARTICLE`;
//     db.run(sql);

// });

class Article {
    static all(cb) {
        db.all('SELECT * FROM article', cb);
    }

    static find(id, cb) {
        db.get('SELECT * FROM article WHERE id = ?', id, cb);
    }

    static create(data, cb) {
        const sql = 'INSERT INTO article(title, content) VALUES(?, ?)';
        db.run(sql, data.title, data.content, cb)
    }

    static update(data, cb) {
        const sql = 'UPDATE article SET title=$title,content=$content WHERE id = $id';
        db.run(sql, {
            $id: data.id,
            $title: data.title,
            $content: data.content,
        }, cb)
    }

    static delete(id, cb) {
        if(!id) {
            throw new Error('please provide an id');
        
        }
        db.run('DELETE FROM article WHERE id = ?', id, cb)
    }
}

module.exports = db;
module.exports.Article = Article;
