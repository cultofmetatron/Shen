
var should  = require('should');
var _       = require('underscore');
var fuu     = require('../index.js');
var Promise = require('bluebird');
var co      = require('co');
var utils   = require('../lib/utils.js');

describe('Delay', function() {
  
  it('should delay timeout', function(done) {
    this.timeout(10000);
    var timeStamp = Date.now();
    //defer = Promise.defer();
    var start = Date.now();
    //defer.resolve('resolved');
    var genFunc = function *() {
      var delay = Date.now() - timeStamp;
      return delay;
    };

    co(fuu.delay(genFunc, 3000))(function (err, delay) {
      delay.should.be.greaterThan(2950);
      done();
    });

  });
});


