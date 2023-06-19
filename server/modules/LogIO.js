const { sha512, sessionRead, show, sessionWrite } = require("../functions");
const { config } = require("../readConfig");
const crypto = require('crypto');
const request = require('request');

exports.login = (database, token, post) => {
    return database.collection("users").find({"username": post.username}).toArray().then((res) => {
        if(res.length == 0){
            return show(400, {"msg": "找不到用户", "uid": -1, "operator": false});
        }
        if(res[0].banned){
            return show(400, {"msg": "用户已被封禁", "uid": -1, "operator": false});
        }
        if(sha512(post.password, res[0].salt) != res[0].password){
            return show(400, {"msg": "密码错误", "uid": -1, "operator": false});
        }
        return sessionWrite(database, token, "uid", res[0]._id).then(() => {
            return sessionWrite(database, token, "logined", true).then(() => {
                return sessionWrite(database, token, "operator", res[0].operator).then(() => {
                    return sessionWrite(database, token, "speak", res[0].speak).then(() => {
                        return show(200, {"msg": "操作成功", "uid": res[0]._id, "operator": res[0].operator, "speak": res[0].speak});
                    });
                });
            });
        });
    });
};

exports.register = (database, token, post) => {
    var salt = crypto.randomUUID();
    var password_hash = sha512(post.password, salt);
    var url = config.luogu_proxy + post.link;
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if(error) return reject(error);
            body = body.replace(new RegExp("\r|\n|\t", "g"), "");
            var json = JSON.parse(decodeURIComponent(/decodeURIComponent\("(.*)"\)/.exec(body)[1]));
            var data = json.currentData.paste.data;
            var lguid = json.currentData.paste.user.uid;
            var lgusername = json.currentData.paste.user.name;
            return sessionRead(database, token).then((res) => {
                if(res.get("luogu_key") != data){
                    resolve(show(400, "剪贴板内数据错误，请检查"));
                    return;
                }
                return database.collection("users").insertOne({
                    "username": post.username,
                    "password": password_hash,
                    "salt": salt,
                    "luogu_uid": lguid,
                    "luogu_username": lgusername,
                    "province": "",
                    "school": "",
                    "avatar": "",
                    "tag": "",
                    "homepage": "",
                    "operator": false,
                    "speak": false,
                    "banned": false,
                    "register_time": (new Date).toLocaleString(config.time.lang, { timeZone: config.time.timezone }),
                    "stamp": (new Date).getTime()
                }).then(() => {
                    return database.collection("users").find({"username": post.username}).toArray().then((res) => {
                        return sessionWrite(database, token, "uid", res[0]._id).then(() => {
                            return sessionWrite(database, token, "logined", true).then(() => {
                                return sessionWrite(database, token, "operator", false).then(() => {
                                    return sessionWrite(database, token, "speak", false).then(() => {
                                        resolve(show(200, {"msg": "操作成功", "uid": res[0]._id, "operator": false, "speak": false}));
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};

exports.logout = (database, token, post) => {
    return sessionWrite(database, token, "logined", false).then(() => {
        return show(200, {"msg": "操作成功"});
    });
};