/*
    OIer-Meet Offical Server Code
    Copyright (C) 2023 OIer-Meet Dev Team

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

var http = require("http");
const { config } = require("./readConfig");
const { handler } = require("./handler");

var MongoClient = require('mongodb').MongoClient;
var port = process.env.PORT || config.server.port;
if(process.env["database_url"]) config.database.url = process.env["database_url"];
if(process.env["database_db"]) config.database.db = process.env["database_db"];
if(process.env["luogu_proxy"]) config.luogu_proxy = process.env["luogu_proxy"];
MongoClient.connect(config.database.url).then((db) => {
    var database = db.db(config.database.db);
    var server = http.createServer();
    server.on("listening", () => {
        console.log("OIer-Meet Server is starting at port " + port);
    });
    server.on("request", (request, response) => {
        var ip = request.socket.remoteAddress;
        var ipStr = request.headers['X-Real-IP'] || request.headers['x-forwarded-for'];
        if (ipStr){
            var ipArray = ipStr.split(",");
            if (ipArray || ipArray.length > 0) { //如果获取到的为ip数组
                ip = ipArray[0];
            }
        }
        console.log(ip, request.url);
        response.writeHead(200, {
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": 
                "Cookie,Accept,Origin,Keep-Alive,User-Agent,X-Mx-ReqToken,X-Data-Type,X-Requested-With,If-Modified-Since,Cache-Control," + 
                "Content-Type,Range,token,user-uuid,x-auth-token,access-control-allow-origin,nonce,authorization"
        });
        handler(database, request, response); //异步任务
    });
    server.listen(port);
});