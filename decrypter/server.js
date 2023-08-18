//请确保该程序在本地执行，以免信息泄露
//并且确保本地没有类病毒程序偷窃内存
const { config } = require("./readConfig");
const { readFileSync } = require('fs');
const crypto = require ("crypto");
const publickey = readFileSync(config.publickey);
const privatekey = readFileSync(config.privatekey);
var http = require("http");
const {PromiseSocket} = require("promise-socket");

var handler = (database, request, response) => {
    var body = "";
    request.on("error", (err) => { //底层错误处理 - 请求出错
        console.error(err);
        response.statusCode = 500;
        response.end("{msg: \"应用程序内部错误：请检查请求是否正常\"}");
    });
    response.on("error", (err) => { //底层错误处理 - 响应出错
        console.error(err);
        response.statusCode = 500;
        response.end("{msg: \"应用程序内部错误：请检查请求是否正常\"}");
    });
    request.on("data", (chunk) => {
        body += chunk;
    }).on('end', async () => {
        const socket = new PromiseSocket();
        body = crypto.publicEncrypt(publickey, Buffer.from(body));
        await socket.connect({host:config.source.ip, port:config.source.port});
        await socket.write(Buffer.from(body));
        var result = await socket.readAll();
        await socket.end();
        result = crypto.publicDecrypt(privatekey, result);
        response.write(result);
        response.end();
    });
};
var server = http.createServer();
server.on("listening", () => {
    console.log("OIer-Meet Decrypter Server is starting at port " + config.server.port);
});
server.on("request", (request, response) => {
    handler(request, response);
});
server.listen(config.server.port);