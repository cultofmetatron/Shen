var utils = require('./utils');
var _     = require('underscore');

var dispatch = function(dispatcher, table) {
  return function *(next) {
    next = (utils.isGenerator(next)) ? next :
      (function *(nextCo) { return yield nextCo; }).call(this);
    
    var dispatchMap = {};
    _(table).each(function(genFunc, key) {
      dispatchMap[key] = genFunc.call(this, next);
    }, this);

    //mow we yield to create the link
    return yield dispatcher.call(this, dispatchMap);
  };
};

module.exports = dispatch;

