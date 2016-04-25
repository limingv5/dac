module.exports = function (absPath, filteredUrl, reqOpt, param, cb) {
  var lessLayer = require("./less");
  var helper = require("../lib/util");

  absPath = absPath.replace(/\.html$/, '');

  lessLayer(absPath, reqOpt, param, function (err, compiled) {
    if (err) {
      cb(err);
    }
    else {
      compiled = '<dom-module id="' + helper.filteredUrl(filteredUrl, param.filter) + '">' +
        '<template><style>' +
        compiled +
        '</style></template></dom-module>';
      cb(null, compiled);
    }
  });
};
