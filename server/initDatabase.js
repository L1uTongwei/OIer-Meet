const { config } = require("./readConfig");

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(config.database.url).then((db) => {
    var database = db.db(config.database.db);
    return Promise.all([
        database.createCollection("sessions").finally(() => {
            console.log("Processing: Sessions");
            return database.collection("sessions").createIndex({"id": 1}, {unique: true, expireAfterSeconds: 7 * 24 * 60 * 60});
        }), //Sessions
        database.createCollection("users").finally(() => {
            console.log("Processing: Users");
            return Promise.all([
                database.collection("users").createIndex({"username": 1}, {unique: true}),
                database.collection("users").createIndex({"luogu_username": 1}, {unique: true}),
                database.collection("users").createIndex({"stamp": 1})
            ]);
        }), //用户集合
        database.createCollection("posts").finally(() => {
            console.log("Processing: Posts");
            return database.collection("posts").createIndex({"stamp": 1});
        }), //内容集合
        database.createCollection("replies").finally(() => {
            console.log("Processing: Replies");
            return Promise.all([
                database.collection("replies").createIndex({"father": 1}),
                database.collection("replies").createIndex({"stamp": 1})
            ]);
        }), //回复集合
        database.createCollection("repliesons").finally(() => {
            console.log("Processing: Repliesons");
            return Promise.all([
                database.collection("repliesons").createIndex({"father": 1}),
                database.collection("repliesons").createIndex({"stamp": 1})
            ]);
        }), //二层回复集合
        database.createCollection("operator_logs").finally(() => {
            console.log("Processing: Operator Logs");
            return database.collection("operator_logs").createIndex({"stamp": 1});
        }), //操作日志集合
        database.createCollection("reports").finally(() => {
            console.log("Processing: Reports");
            return Promise.all([
                database.collection("reports").createIndex({"type": 1, "bid": 1}, {unique: true}),
                database.collection("reports").createIndex({"stamp": 1})
            ]);
        }) //举报集合
    ]);
}).then(() => {
    process.exit(0);
}).catch((err) => {
    console.error(err);
    process.exit(0);
});