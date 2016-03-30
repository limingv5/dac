module.exports = function (htmljsfile, reqOpt, param, cb) {
  var helper = require("../lib/util");
  var juicer = require("juicer");
  var pathLib = require("path");

  var MIME = "application/javascript";

  var htmlfile = htmljsfile.replace(/(\.html)\.js$|(\.tpl)\.js$/, "$1$2");
  var tpl = helper.getUnicode(htmlfile);
  if (tpl !== null) {
    tpl = tpl.replace(/<!--\s{0,}#def([\s\S]*?)-->/gi, '');
    tpl = tpl.replace(/<!--\s{0,}#eachInclude[^\->]*?file\s{0,}=\s{0,}(["'])\s{0,}([^"']*?)\s{0,}\1\s{1,}(.+)\s{1,}as\s{1,}(.+)[^>]*?-->/gi, function (i, m1, m2, m3, m4) {
      var tempPath = pathLib.join(htmljsfile.replace(reqOpt.path, ''), m2);
      return "{@each " + m3 + " as " + m4 + "}" + (helper.getUnicode(tempPath) || '') + "{@/each}";
    });

    var _method = [
      "_method=_method||{};",
      "_method.__throw=function(e){throw(e)};"
    ];
    tpl = tpl.replace(/\{@helper\s{1,}([^\}]*?)\}([\s\S]*?)\{@\/helper\}/igm, function (all, funcname, func) {
      _method.push("_method." + funcname + '=' + func.replace(/^\s{0,}\n{1,}\s{0,}|\s{0,}\n{1,}\s{0,}$/g, '') + ';');
      return '';
    });

    var compiled = juicer(tpl)._render.toString().replace(/^function anonymous[^{]*?{\n?([\s\S]*?)\n?}$/img, function ($, fn_body) {
      fn_body = fn_body.replace(/(['"])use strict\1;?\n?/g, '');

      var escapehtml = [], flag = false;
      if (/__escapehtml\.escaping|__escapehtml\.escapehash|__escapehtml\.escapereplace/.test(fn_body)) {
        escapehtml.push(
          "escapehash:" + JSON.stringify({
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2f;'
          }),
          "escapereplace:function(k){return _method.__escapehtml.escapehash[k]}",
          "escaping:function(s){return typeof(s)!='string'?s:s.replace(/[&<>\"]/img,this.escapereplace)}"
        );
        flag = true;
      }
      if (/__escapehtml\.detection/.test(fn_body)) {
        escapehtml.push("detection:function(d){return typeof(d)=='undefined'?'':d}");
        flag = true;
      }

      return "function(_,_method){" +
        _method.join('') +
        (flag ? ("_method.__escapehtml={" + escapehtml.join(',') + "};") : '') +
        fn_body + "};";
    });

    cb(false, helper.wrapper(compiled, reqOpt.path, param), htmlfile, MIME);
  }
  else {
    tpl = helper.getUnicode(htmljsfile);
    if (tpl !== null) {
      cb(false, tpl, htmljsfile, MIME);
    }
    else {
      cb({code: "Not Found"});
    }
  }
};
