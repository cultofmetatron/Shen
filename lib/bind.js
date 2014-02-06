
var co = require('co');
var utils = require('./utils');

var bind = function(genFunc, ctx) {
  return function *() {
    yield genFunc.apply(ctx, arguments);
  };
};

module.exports = bind;

