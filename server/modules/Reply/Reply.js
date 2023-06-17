const { sessionRead, show } = require("../../functions");
const { config } = require("../../readConfig");
const ObjectId = require('mongodb').ObjectId;

exports.replyPost = (database, token, post) => {
    return sessionRead(database, token).then((res) => {
        return database.collection("users").find({"_id": new ObjectId(res.get("uid"))}).toArray().then((res2) => {
            return database.collection("replies").insertOne({
                "father": new ObjectId(post.father),
                "message": post.message,
                "sender": {
                    "_id": res.get("uid"),
                    "username": res2[0].username,
                    "avatar": res2[0].avatar,
                    "tag": res2[0].tag
                },
                "send_time": (new Date).toLocaleString(config.time.lang, { timeZone: config.time.timezone }),
                "stamp": (new Date).getTime(),
            }).then(() => {
                return show(200, {"msg": "操作成功"});
            });
        });
    });
};

exports.getReplieslist = (database, token, post) => {
    var page = post.page;
    var start = (page - 1) * config.length.post_length;
    return database.collection("replies").find({"father": new ObjectId(post.father)}).limit(config.length.post_length).skip(start).sort({"stamp": 1}).toArray().then((res) => {
        return show(200, res);
    });
};

exports.deleteReplies = (database, token, post) => {
    return sessionRead(database, token).then((res) => {
        return ((this_uid, operator) => {return database.collection("replies").find({"_id": new ObjectId(post.id)}).toArray().then((res) => {
            if(this_uid != res[0].sender && !operator){
                return show(400, {"msg": "用户没有权限删除回复"});
            }
            return database.collection("replies").deleteOne({"_id": new ObjectId(post.id)}).then(() => {
                return show(200, {"msg": "操作成功"});
            });
        });})(res.get("uid"), res.get("operator"));
    });
};