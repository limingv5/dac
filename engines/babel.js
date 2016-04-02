module.exports = function (absPath, reqOpt, param, cb) {
  var helper = require("../lib/util");

  var content = typeof absPath == "object" ? absPath.content : helper.getUnicode(absPath);

  if (content === null) {
    cb({code: -1}, content, true);
  }
  else if (helper.matchPath(require("path").relative('/', reqOpt.path), param.target)) {
    var babel  = require("babel-core");
    var es2015 = require("babel-preset-es2015");
    var stage3 = require("babel-preset-stage-3");
    var BABEL_DEFAULT_OPTIONS = {
      presets: [es2015, stage3],
      sourceMaps: false,
      retainLines: true
    };
    var babelOptions = helper.extend(BABEL_DEFAULT_OPTIONS, param.options);
    cb(null, babel.transform(content, babelOptions).code);
  }
  else {
    cb(null, content, true);
  }
};
