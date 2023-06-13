const { readFileSync } = require('fs');
exports.config = JSON.parse(readFileSync("./config.json").toString());
exports.modules = JSON.parse(readFileSync("modules/modules.json").toString());