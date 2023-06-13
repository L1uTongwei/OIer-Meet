const { execSync } = require("child_process");
const { writeFileSync, readFileSync } = require("fs");
const util = require("util");

var str = util.format(readFileSync(__dirname + "/oiermeet.service").toString(), "node " + __dirname + "/server.js", __dirname);
writeFileSync(__dirname + "/oiermeet.service", str);
execSync("rm /etc/systemd/system/oiermeet.service");
execSync("ln -s -v " + __dirname + "/oiermeet.service /etc/systemd/system/oiermeet.service");
execSync("systemctl daemon-reload");
console.log("Service installed. Please run \"systemctl status oiermeet\" to see.");