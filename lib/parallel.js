
var co      = require('co');
var utils   = require('./utils');
var _       = require('underscore');
var genBind = require('./bind.js');
var Promise = require('bluebird');

/*
 * takes 
*/
var parallel = function(args) {
  var args = Array.prototype.slice.call(arguments);

  return function *(next) {
    next = (utils.isGenerator(next)) ?
       next :
      (function *(nextCo) { yield nextCo; }).call(this);
    
    var coroutines = _(args).map(function(genFunc) {
      return genFunc.call(this);
    }, this);
    return yield coroutines;
  };
};

module.exports = parallel;


