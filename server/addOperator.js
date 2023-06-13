const { config } = require("./readConfig");

if(process.argv.slice().length == 0){
    config.log("用法：node AddOperator.js <用户名>")
    process.exit(0);
}
user = process.argv[2];

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(config.database.url).then((db) => {
    var database = db.db(config.database.db);
    return database.collection("users").updateOne({"username": user}, {$set: {"operator": true}});
}).then(() => {
    process.exit(0);
}).catch((err) => {
    console.error(err);
});