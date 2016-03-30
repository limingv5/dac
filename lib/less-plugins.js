var functions = {};
exports = module.exports = function (less) {
  var LessNode = less.tree.Node;
  /**
   * 随机产出单位浮点
   * @param  {Number} min   最小限制
   * @param  {Number} max   最大限制
   * @param  {Number} fixed 截取浮点长度
   * @param  {String} unit  单位
   * @return {String}       单位浮点
   */
  functions.random = function(min, max, fixed, unit) {
    var v = new LessNode;
    switch (arguments.length) {
      case 0:
      {
        v.value = (Math.random()*100) | 0;
        break;
      }
      case 1:
      {
        var a = min.value;
        var u = '';
        if (typeof a === 'string') {
          u = a;
          a = 1;
        }
        v.value = (Math.random() * a / 100).toFixed(0) + u;
        break
      }
      case 2:
      {
        var i = min.value;
        var a = max.value;
        var f = 0;
        var u = '';
        // 2,px;
        if (typeof a === 'string') {
          u = a;
          a = i;
          i = 0;
          // 2,".2"; max 2, fixed 2, no unit.
          if (u[0] === '.' && !Number.isNaN(+u.slice(1))) {
            f = +u.slice(1);
            u = '';
          }
        }
        v.value = ((Math.random() * (a - i + 1) + i)/100).toFixed(f) + u;
        break
      }
      case 3:
      {
        var i = min.value;
        var a = max.value;
        var f = fixed.value;
        var u = '';
        // 0, 1,'px';
        if (typeof f === 'string') {
          if (f[0] === '.') {
            f = +f.slice(1);
          } else {
            u = f;
            f = 0;
            // 2, '.2', 'px'
            if (typeof a === 'string') {
              f = a;
              a = i;
              i = 0;
            }
          }
        }
        v.value = ((Math.random() * (a - i + 1) + i)/100).toFixed(f) + u;
        break;
      }
      default:
      {
        var i = min.value;
        var a = max.value;
        var f = fixed.value;
        var u = unit.value;
        v.value = ((Math.random() * (a - i + 1) + i)/100).toFixed(f) + u;
        break;
      }
    }
    return v;
  }
  return less;
};

Object.defineProperty(exports, 'functions', {
  get: function () {
    return Object.create(functions)
  }
});
// exports.plugins = {};