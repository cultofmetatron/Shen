
var co = require('co');

/*
 * branch(cond*, fail*, pass*);
 * branch takes 3 generators,
 *  if cond is passed fail* and pass* as parameters and 
 *  can choose which direction to go in. it passes the next* to whichever it
 *  goes with
 */

var branch = function(cond, pass, fail) {
  return function *(next) {
    yield co(function *() {
      yield cond.call(this, pass.call(this, next), fail.call(this, next));
    });
  };
};








