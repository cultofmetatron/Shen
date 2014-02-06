var co    = require('co');
var utils = require('./utils');

var dispatch = function(dispatcher, map) {
  return function *(next) {
    next = (utils.isGenerator(next)) ? next : (function *(nextCo) { yield nextCo; }).call(this);
    yield co(function *() {
      yield dispatcher.call(this, _(map).map(function(genFunc) {
        return genFunc.call(this, next);
      }), this);
    });
  };
};


