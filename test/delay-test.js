
var should  = require('should');
var _       = require('underscore');
var fuu     = require('../index.js');
var Promise = require('bluebird');
var co      = require('co');
var utils   = require('../lib/utils.js');

describe('Delay', function() {
  
  xit('should delay timeout', function(done) {
    this.timeout(10000);
    var timeStamp = Date.now();
    //defer = Promise.defer();
    var start = Date.now();
    //defer.resolve('resolved');
    var genFunc = fuu.cascade(function *(next) {
      console.log('yiea');
      var delay = Date.now() - timeStamp;
      console.log(delay);
      yield next;
      return delay;
    }, function *() {
      console.log('second function');

    });

    co(fuu.delay(genFunc, 3000))(function (err, delay) {
      console.log('foo');
      console.log('the delay: ', delay);
      delay.should.be.greaterThan(2000);
      done();
    });

  });
});


