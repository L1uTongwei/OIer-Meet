const { sessionRead, show } = require("../../functions");
const { config } = require("../../readConfig");
const ObjectId = require('mongodb').ObjectId;

exports.getUser = (database, token, post) => {
    return database.collection("users").find({"_id": new ObjectId(post.uid)}).toArray().then((res) => {
        if(res.length == 0){
            return show(400, {"msg": "找不到用户"});
        }
        res[0].password = res[0].salt = "";
        return show(200, res[0]);
    });
};

exports.getUsername = (database, token, post) => {
    return database.collection("users").find({"username": post.username}).toArray().then((res) => {
        if(res.length == 0){
            return show(400, {"msg": "找不到用户"});
        }
        res[0].password = res[0].salt = "";
        return show(200, res[0]);
    });
};

exports.getLgUsername = (database, token, post) => {
    return database.collection("users").find({"lg_username": post.lg_username}).toArray().then((res) => {
        if(res.length == 0){
            return show(400, {"msg": "找不到用户"});
        }
        res[0].password = res[0].salt = "";
        return show(200, res[0]);
    });
};

exports.getUserList = (database, token, post) => {
    var page = post.page;
    var start = (page - 1) * config.length.userlist_length;
    return database.collection("users").find({}).limit(config.length.userlist_length).skip(start).sort({"stamp": 1}).toArray().then((res) => {
        res.forEach(element => {
            res[0].password = res[0].salt = res[0].homepage = "";
        });
        return show(200, res);
    });
};

exports.userSetting = (database, token, post) => {
    return sessionRead(database, token).then((res) => {
        return database.collection("users").updateOne({"_id": res.get("uid")}, {$set: {
            "province": post.province,
            "school": post.school,
            "avatar": post.avatar,
            "homepage": post.homepage
        }}).then(() => {
            return show(200, {"msg": "操作成功"});
        });
    });
};

exports.search = (database, token, post) => {
    if(post.type == "uid"){
        post.uid = post.content;
        return this.getUser(database, token, post);
    }else if(post.type == "username"){
        post.username = post.content;
        return this.getUsername(database, token, post);
    }else if(post.type == "lgusername"){
        post.lg_username = post.content;
        return this.getLgUsername(database, token, post);
    }else{
        return show(400, {"msg": "类型错误"});
    }
};