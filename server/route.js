const { show, isLogin, isOperator, captchaCheck } = require("./functions");
const { modules } = require("./readConfig");

Connect = require("./modules/Connect/Connect");
LogIO = require("./modules/LogIO/LogIO");
Users = require("./modules/Users/Users");
Operator = require("./modules/Operator/Operator");
Post = require("./modules/Post/Post");
Reply = require("./modules/Reply/Reply");
Reply2 = require("./modules/Reply2/Reply2");

exports.route = (database, url, token, post) => {
    if(modules[url] == undefined) return Promise.resolve(show(404, {"msg": "找不到请求的接口"}));
    modules[url].post.forEach(element => {
        if(post[element] == undefined){
            return Promise.resolve(show(400, {"msg": "请求的 POST 字段不全"}));
        }
    });
    var Promises = new Array(); 
    if(modules[url].captcha_required) Promises.push(captchaCheck(database, token, post.verify));
    if(modules[url].login_required) Promises.push(isLogin(database, token));
    if(modules[url].operator_required) Promises.push(isOperator(database, token));
    return Promise.all(Promises).catch((msg) => {
        return Promise.resolve(msg);
    }).then(() => {
        return eval(modules[url].code);
    });
}