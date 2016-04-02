module.exports = function (absPath, reqOpt, param, cb) {
  var helper = require("../lib/util");

  var ignoreText = function (content) {
    return !/define\(/.test(content) && !/KISSY\./.test(content);
  };

  var content = typeof absPath == "object" ? absPath.content : helper.getUnicode(absPath);

  if (content === null) {
    cb({code: -1}, content, true);
  }
  else {
    var path    = require("path").relative('/', reqOpt.path);
    var pkgName = param.anonymous ? '' : '"' + helper.filteredUrl(reqOpt.path, param.filter) + '",';

    if (helper.matchPath(path, param.cmd) && ignoreText(content)) {
      cb(null, "define(" + pkgName + "function(require,exports,module){" + content + "\n});");
    }
    else if (helper.matchPath(path, param.kmd) && ignoreText(content)) {
      cb(null, "KISSY.add(" + pkgName + "function(S,require,exports,module){" + content + "\n});");
    }
    else {
      cb(null, content, true);
    }
  }
};
