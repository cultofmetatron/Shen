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
  var args = Array.prototype.slice.call(arguments);
  //if (args.length === 1) {
  //  return args[0];
  //};
  return function *(next) {
    next = (utils.isGenerator(next)) ?
       next :
      (function *(nextCo) { yield nextCo; }).call(this);
    //pass along the function generated to co so that we have explicit yields
    return yield _.reduce(args,
      function(memo, nextone, index) {
        var self = this; //so we can establish a bind
        return function *(next){
          var args2 = Array.prototype.slice.call(arguments);
          //console.log(index, ' nextone---------\n', nextone);
          //console.log(nextone.toString());
          var nextr = nextone.call(self, next);
          //console.log('nextr', nextr.toString());
          return yield memo.call(self, nextr);
        };
      }, function *(next) {
        return yield next;
      }, this).call(this, next);
  };
};

module.exports = cascade;

