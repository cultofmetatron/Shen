
var co = require('co');
var utils = require('./utils');
/*
 * branch(cond*, fail*, pass*);
 * branch takes 3 generators,
 *  if cond is passed fail* and pass* as parameters and 
 *  can choose which direction to go in. it passes the next* to whichever it
 *  goes with
 */

var branch = function(cond, path1, path2) {
  return function *(next) {
    next = (utils.isGenerator(next)) ? next : (function *(nextCo) { yield nextCo; }).call(this);
    yield co(function *() {
      yield cond.call(this, path1.call(this, next), path2.call(this, next));
    });
  };
};

module.exports = branch;







