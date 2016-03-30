var fs = require("fs");
var path = require("path");

var dir = fs.readdirSync(__dirname + "/engines");
dir.forEach(function (i) {
  var name = path.basename(i, ".js");
  exports[name] = require("./engines/" + name);
});

exports.iconv = require("iconv-lite");
exports.isUtf8 = require("is-utf8");
exports.juicer = require("juicer");
