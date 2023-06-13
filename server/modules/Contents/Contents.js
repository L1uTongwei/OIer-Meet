const { sessionRead, show } = require("../../functions");
const { config } = require("../../readConfig");
const ObjectId = require('mongodb').ObjectId;

exports.report = (database, token, post) => {
    return database.collection("reports").find({"type": post.type, "bid": post.bid}).toArray().then((res) => {
        if(res.length != 0){
            return sessionRead(database, token).then((resF) => {
                var data = new Map(res[0].data);
                if(data.has(resF.uid)){
                    return show(200, {"msg": "已经举报过了！"});
                }
                data.set(resF.uid, 1);
                return database.collection("reports").updateOne({"type": post.type, "bid": post.bid}, {$set: {
                    "times": res[0].times + 1,
                    "data": Array.from(data)
                }}).then(() => {
                    return show(200, {"msg": "操作成功"});
                });
            });
        }else{
            var data = new Map();
            data.set(resF.uid, 1);
            return database.collection("reports").insertOne({
                "type": post.type,
                "bid": post.bid,
                "note": post.note,
                "times": 1,
                "data": Array.from(data)
            }).then(() => {
                return show(200, {"msg": "操作成功"});
            });
        }
    });
};

exports.sendContents = (database, token, post) => {
    return sessionRead(database, token).then((res) => {
        return database.collection("users").find({"_id": new ObjectId(res.get("uid"))}).toArray().then((res2) => {
            return database.collection("posts").insertOne({
                "topic": post.topic,
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

exports.getContents = (database, token, post) => {
    return database.collection("posts").find({"_id": new ObjectId(post.id)}).toArray().then((res) => {
        return show(200, res);
    });
};

exports.deleteContents = (database, token, post) => {
    return sessionRead(database, token).then((res) => {
        return ((this_uid, operator) => {return database.collection("posts").find({"_id": new ObjectId(post.id)}).toArray().then((res) => {
            if(this_uid != res[0].sender && !operator){
                return show(400, {"msg": "用户没有权限删除帖子"});
            }
            return database.collection("posts").deleteOne({"_id": new ObjectId(post.id)}).then(() => {
                return show(200, {"msg": "操作成功"});
            });
        });})(res.get("uid"), res.get("operator"));
    });
};

exports.getContentslist = (database, token, post) => {
    var page = post.page;
    var start = (page - 1) * config.length.post_length;
    return database.collection("posts").find({}).limit(config.length.post_length).skip(start).sort({"stamp": 1}).toArray().then((res) => {
        return show(200, res);
    });
};

exports.getLoglist = (database, token, post) => {
    var page = post.page;
    var start = (page - 1) * config.length.post_length;
    return database.collection("operator_logs").find({}).limit(config.length.post_length).skip(start).sort({"stamp": 1}).toArray().then((res) => {
        return show(200, res);
    });
};