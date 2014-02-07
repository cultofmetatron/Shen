

var Promise = require('bluebird');
var delay = function(genFunc, timeout) {
  return function *(next) {
    next = (utils.isGenerator(next)) ? next :
      (function *(nextCo) { yield nextCo; }).call(this);
    var timer = Promise.defer();
    setTimeout(function() {
      defer.resolve({});
    }, timeout);
    yield timer;
    yield gen.call(this, next);
  };
};

module.exports = delay;
