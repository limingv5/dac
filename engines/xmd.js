module.exports = function (absPath, reqOpt, param, cb) {
  var helper = require("../lib/util");

  var ignoreText = function (content) {
    return !/define\(/.test(content) && !/KISSY\./.test(content);
  };

  var content = typeof absPath == "object" ? absPath.content : helper.getUnicode(absPath);

  if (content === null) {
    cb({code: "PASS Engine"});
  }
  else {
    var MIME = "application/javascript";
    var path = require("path").relative('/', reqOpt.path);

    if (helper.matchPath(path, param.cmd) && ignoreText(content)) {
      cb(null, "define(function(require,exports,module){" + content + "\n});", absPath, MIME);
    }
    else if (helper.matchPath(path, param.kmd) && ignoreText(content)) {
      cb(null, "KISSY.add(function(S,require,exports,module){" + content + "\n});", absPath, MIME);
    }
    else {
      cb(null, content, absPath, MIME);
    }
  }
};
