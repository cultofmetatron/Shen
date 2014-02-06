
/*
 * cascade ( gen1, gen2...genN)
 * returns Generator such that it takes a yieldable
 * and runs through each generators. essentially cascading flow
*/


var cascade = function(args) {
  args = Array.prototype.slice.call(arguments);
  return function *(next) {
    yield _.reduce(args, function(memo, nextone) {
      var self = this;
      return function *(next){
        yield memo.call(self, nextone.call(self, next));
      };
    }, function *(next) {
      yield next;
    }, this).call(this, next);
  };
};

module.exports = cascade;

