const Redis = require("ioredis");
const redis = new Redis(6379, "127.0.0.1");
// redis.set("mykey", "value");
// redis.get("mykey").then((res) => console.log(res));
redis.keys("*").then((res) => console.log(res));
