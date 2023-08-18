const { show } = require("../functions");
const { config } = require("../readConfig");
const ObjectId = require('mongodb').ObjectId;

exports.banUser = (database, token, post) => {
    return database.collection("users").updateOne({"uid": post.uid}, {$set: {"banned": true}}).then(() => {
        return show(200, {"msg": "操作成功"});
    });
};

exports.getJudgeList = (database, token, post) => {
    var page = post.page;
    var start = (page - 1) * config.length.post_length;
    return database.collection("reports").find({}).limit(config.length.post_length).skip(start).sort("times").toArray().then((res) => {
        res.forEach(element => {
            element.data = "";
        });
        return show(200, res);
    });
};

exports.log = (database, token, post) => {
    return database.collection("operator_logs").insertOne({
        "judger": post.judger,
        "type": post.type,
        "content": post.content,
        "note": post.note,
        "stamp": (new Date).getTime()
    }).then(() => {
        return show(200, {"msg": "操作成功"});
    });
};

exports.deleteJudge = (database, token, post) => {
    return database.collection("reports").deleteOne({"_id": new ObjectId(post.id)}).then(() => {
        return show(200, {"msg": "操作成功"});
    });
};

exports.setUser = (database, token, post) => {
    var Promises = new Array();
    if(post.ban) Promises.push(database.collection("users").updateOne({"username": post.username}, {$set: {"banned": true}}));
    if(config.operator.super && post.operator) Promises.push(database.collection("users").updateOne({"username": post.username}, {$set: {"operator": true}}));
    if(post.tag) Promises.push(database.collection("users").updateOne({"username": post.username}, {$set: {"tag": post.tag}}));
    return Promise.all(Promises).then(() => {
        return show(200, {"msg": "操作成功"});
    });
};