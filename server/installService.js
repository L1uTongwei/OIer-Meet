const { execSync } = require("child_process");
const { writeFileSync, readFileSync } = require("fs");
const util = require("util");

var str = util.format(readFileSync("./oiermeet.service").toString(), "node " + __dirname + "/server.js", __dirname);
writeFileSync("/etc/systemd/system/oiermeet.service", str);
execSync("systemctl daemon-reload");
console.log("Service installed. Please run \"systemctl status oiermeet\" to see.");