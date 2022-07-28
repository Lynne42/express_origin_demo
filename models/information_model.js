const redis = require('redis');
const db = redis.createClient();

class Entry {

    static getRange(from, to, cb) {
        db.lrange('entries', from, to, (err, items) => {
            if(err) return cb(err);

            let entries = [];
            items.forEach(item => {
                entries.push(JSON.parse(item));
            })
            cb(null, entries)
        })
    }

    constructor(obj) {
        
        for(let key in obj) {
            this[key] = obj[key];
        }
        console.log(this)
    }

    save(cb) {
        
        const entryJson = JSON.stringify(this);
        
        db.lpush('entries', entryJson, (err) => {
            console.log(111)
            if(err) {
                return cb(err)
            }
            console.log(entryJson)
            cb(entryJson)
        })
    }
}


module.exports = Entry;