const Redis = require("ioredis");

const redis = new Redis({
  port: 10494,
  host: "redis-10494.c252.ap-southeast-1-1.ec2.cloud.redislabs.com",
  username: "default",
  password: "Sgop6DHjdNPiFrBQHbVEUBYU43a8lx0C",
});
module.exports = redis