/*
 * cascade ( gen1, gen2...genN)
 * returns Generator such that it takes a yieldable
 * and runs through each generators. essentially cascading flow
 *
 * works with both co and koa().use();
*/
var co      = require('co');
var utils   = require('./utils');
var _       = require('underscore');
var genBind = require('./bind.js');
var Promise = require('bluebird');

var cascade =  function(args) {
  args = Array.prototype.slice.call(arguments);
  return function *(next) {
    next = (utils.isGenerator(next)) ?
       next :
      (function *(nextCo) { yield nextCo; }).call(this);
    //pass along the function generated to co so that we have explicit yields
    return yield _.reduce(args, function(memo, nextone, index) {
      var self = this; //so we can establish a bind
      return function *(next){
        var nextr = nextone.call(self, next);
        return yield memo.call(self, nextr);
      };
      }, function *(next) {
        return yield next;
      }, this).call(this, next);
  };
};

module.exports = cascade;

