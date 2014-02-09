
var co = require('co');
var utils = require('./utils');

var bind = function(genFunc, ctx) {
  var args = Array.prototype.slice.call(arguments, 2);
  return function *() {
    var args2 = Array.prototype.slice.call(arguments);
    return yield genFunc.apply(ctx, args.concat(args2));
  };
};

module.exports = bind;

