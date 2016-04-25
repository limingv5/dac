module.exports = function (htmljsfile, filteredUrl, reqOpt, param, cb) {
  var swig = require("swig");
  var helper = require("../lib/util");

  var htmlfile = htmljsfile.replace(/(\.swig)\.js$/, "$1");
  var tpl = helper.getUnicode(htmlfile);
  if (tpl !== null) {
    var result = swig.precompile(tpl).tpl.toString().replace("anonymous", '');

    cb(false, (param.compatible ? "return " : "module.exports=") + result);
  }
  else {
    tpl = helper.getUnicode(htmljsfile);
    if (tpl !== null) {
      cb(false, tpl);
    }
    else {
      cb({code: "Not Found"});
    }
  }
};
