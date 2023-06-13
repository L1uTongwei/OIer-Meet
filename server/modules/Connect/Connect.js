const { randomUUID } = require("crypto");
const { sessionWrite, show } = require("../../functions");
const captcha = require("svg-captcha");

exports.generateKey = (database, token, post) => {
    var key = randomUUID();
    if(!token || token == "null") token = randomUUID();
    return sessionWrite(database, token, "luogu_key", key).then(() => {
        return show(200, {"key": key, "token": token});
    });
};

exports.intro = (database, token, post) => {
    return `
欢迎来到 OIer-Meet 官方服务器！

这里主要负责用户反馈服务器 bug 与测试等。

如果你想要让自己的服务器出现在社区服务器列表里，请联系服务器维护人员（QQ：1347277058）`;
};

exports.captcha = (database, token, post) => {
    const cap = captcha.create({
        size: 4,
        ignoreChars: "0o1ilInN",
        noise: 3,
        width: 120,
        height: 36,
        background: "#fff",
    });
    return sessionWrite(database, token, "authcode", cap.text).then(() => {
        return cap.data;
    });
};