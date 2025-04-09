const asyncRedis = require("async-redis");
const redis_client = asyncRedis.createClient(
);

redis_client.on("error", function (err) {
    console.log(" Redis Error => " + err
    );
});

module.exports = redis_client;


