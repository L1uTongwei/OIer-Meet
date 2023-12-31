const url = require('url');
const { route } = require('./route');
const { config } = require("./readConfig");
const { readFileSync} = require('fs');
const crypto = require ("crypto");
var querystring = require('querystring');

exports.handler = (database, request, response) => {
    var params = url.parse(request.url, true);
    var path = params.pathname;
    var token = params.query.token;
    var post;
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
    }).on('end', () => {
        if(config.encrypt){
            const privatekey = readFileSync(config.privatekey);
            crypto.publicDecrypt(privatekey, body);
        }
        post = querystring.parse(body);
        route(database, path, token, post).then((result) => {
            if(config.encrypt){
                const publickey = readFileSync(config.publickey);
                result = crypto.publicEncrypt(publickey, Buffer.from(result));
            }
            response.write(result);
            response.end();
        }).catch((err) => { //终极错误处理 - 用来捕获未捕获的异常
            console.error(err);
            response.statusCode = 500;
            response.end("{msg: \"应用程序内部错误：请检查请求是否正常\"}");
        });
    });
};