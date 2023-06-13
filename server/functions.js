const ObjectId = require('mongodb').ObjectId;
exports.show = (statusCode, data) => {
    return JSON.stringify({"status": statusCode, "data": data});
}
exports.sessionRead = (database, token) => {
    return database.collection("sessions").find({"id": token}).toArray().then((res) => {
        if(res.length == 0) {
            return Promise.reject(this.show(400, "请求的 token 失效"));
        }
        var ret = new Map(res[0].data);
        ret.set("_id", res[0]._id);
        ret.set("id", token);
        return ret;
    }).catch((err) => {
        console.error(err);
        return Promise.reject(show(400, "请求的 token 失效"));
    });
}
exports.sessionWrite = (database, token, key, value) => {
    return database.collection("sessions").find({"id": token}).toArray().then((res) => {
        var target = new Map();
        if(res.length == 0){
            target.set(key, value);
            return database.collection("sessions").insertOne({"id": token, "data": Array.from(target)});
        }
        target = new Map(res[0].data);
        target.set(key, value);
        return database.collection("sessions").updateOne({"id": token}, {$set: {"data": Array.from(target)}});
    }).catch((err) => {
        console.error(err);
        return Promise.reject(this.show(400, "请求的 token 失效"));
    });
}
exports.isLogin = (database, token) => {
    return this.sessionRead(database, token).then((res) => {
        if(res.length == 0 || !res.get("logined")){
            return Promise.reject(show(400, "用户未登录"));
        }
        return database.collection("users").find({"_id": new ObjectId(res.uid)}).toArray().then((res) => {
            if(res.length == 0 || res.get("banned")){
                return Promise.reject(show(400, "用户不存在或已被封禁"));
            }
        });
    });
}
exports.isOperator = (database, token) => {
    return this.sessionRead(database, token).then((res) => {
        if(res.length == 0 || !res.get("operator")){
            return Promise.reject(this.show(400, "用户没有管理员权限"));
        }
    });
}
exports.captchaCheck = (database, token, verify) => {
    return this.sessionRead(database, token).then((err, res) => {
        if(res.length == 0 || res.get("authcode").toLowerCase() != verify.toLowerCase()){
            return Promise.reject(this.show(400, "验证码错误"));
        }
    })
}
const crypto = require('crypto');
exports.sha512 = (t, k) => crypto.createHmac('sha512', k).update(t).digest('base64')