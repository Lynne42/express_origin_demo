const redis = require("redis");
const client = redis.createClient({
  url: `redis://101.43.129.224:6379`,
  password: "ql123456",
});

client.connect();
//   host: "101.43.129.224",
//   port: 6379,

client.on("connect", function () {
  console.log("Redis client connected");
});

client.on("error", (err) => {
  console.log("连接redis失败");
  client.end(true);
  client.quit();
});

class Entry {
  static async getRange(from, to, cb) {
    try {
      const data = await client.lRange("entries", from, to);
      return data;
    } catch (error) {
      return error;
    }
  }

  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
  }

  async save(cb) {
    const entryJson = JSON.stringify(this);
    try {
      const count = await client.lPush("entries", entryJson);
      return {
        count,
        entryJson,
      };
    } catch (error) {
      return error;
    }
  }
}

module.exports = Entry;
