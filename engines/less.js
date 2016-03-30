module.exports = function (pxcssfile, reqOpt, param, cb) {
  var less = require("less");
  var helper = require("../lib/util");
  var plugins = require("../lib/less-plugins")(less);
  less.functions.functionRegistry.addMultiple(plugins.functions);
  
  var MIME = "text/css";

  var xcssfile = pxcssfile.replace(/(\.less)\.css$/, "$1");
  var renderOpt = {
    paths: [],
    compress: false,
    filename: xcssfile
  };

  var lesstext = helper.getUnicode(xcssfile);
  if (lesstext !== null) {
    less.render(lesstext, renderOpt, function (e, result) {
      if (!e) {
        cb(e, result.css, xcssfile, MIME);
      }
      else {
        console.log(e);
        cb(e, "/* " + xcssfile + " */", xcssfile, MIME);
      }
    });
  }
  else {
    lesstext = helper.getUnicode(pxcssfile);
    if (lesstext !== null) {
      cb(false, lesstext, pxcssfile, MIME);
    }
    else {
      cb({code: "Not Found"});
    }
  }
};
