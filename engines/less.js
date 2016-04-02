module.exports = function (pxcssfile, reqOpt, param, cb) {
  var less = require("less");
  var helper = require("../lib/util");
  var plugins = require("../lib/less-plugins")(less);
  less.functions.functionRegistry.addMultiple(plugins.functions);

  var xcssfile = pxcssfile.replace(/(\.less)\.css$/, "$1");
  var renderOpt = {
    paths: [],
    compress: false,
    filename: xcssfile
  };

  var lesstext = helper.getUnicode(xcssfile);
  if (lesstext !== null) {
    less.render(lesstext, renderOpt, function (e, result) {
      if (e) {
        console.log(e);
        cb(e, "/* " + xcssfile + " */");
      }
      else {
        cb(e, result.css);
      }
    });
  }
  else {
    lesstext = helper.getUnicode(pxcssfile);
    if (lesstext !== null) {
      cb(null, lesstext);
    }
    else {
      cb({code: "Not Found"}, lesstext, true);
    }
  }
};
