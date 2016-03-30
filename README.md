# DAC
> Dynamic Assets Compiler

## Usage
```
npm install dac
```

## Invoke
```
var dac = require("dac");

dac.less(realpath, reqOpt, params, callback);
dac.tpl(realpath, reqOpt, params, callback);
```

## Implement

```
module.exports = function (abspath, reqOpt, param, cb) {
  var url = reqOpt.path;
  
  cb(err, "CONTENT", "REALPATH", "MIME");
};
```