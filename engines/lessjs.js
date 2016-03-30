module.exports = function (absPath, reqOpt, param, cb) {
  var lessLayer = require("./less");
  var CleanCSS = require("clean-css");
  var helper = require("../lib/util");

  var toString = function (compiled) {
    var styles = new CleanCSS({compatibility:"ie7"}).minify(compiled).styles;
    styles = styles.replace(/"|\\\d/g, function (all) {
      return '\\' + all;
    });
    return '"' + styles + '"';
  };

  absPath = absPath.replace(/\.js$/, '');

  lessLayer(absPath, reqOpt, param, function (err, compiled, pxcssfile) {
    if (err) {
      cb(err);
    }
    else {
      compiled = "function(_id){" +
        "var ID=_id||'J_dacStyle',dom=document.getElementById(ID);" +
        "var styleNode=document.createTextNode(" + toString(compiled) + ");" +
        "if(dom){" +
        "dom.appendChild(styleNode);" +
        "}else{" +
        "dom=document.createElement('style');" +
        "dom.id=ID;" +
        "dom.appendChild(styleNode);" +
        "document.getElementsByTagName('head')[0].appendChild(dom);" +
        "}}";
      cb(null, helper.wrapper(compiled, reqOpt.path, param), pxcssfile, "application/javascript");
    }
  });
};
