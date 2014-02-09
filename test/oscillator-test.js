var should  = require('should');
var shen     = require('../index.js');
var co      = require('co');
var Promise = require('bluebird');
var compose = require('koa-compose');
var utils   = require('../lib/utils.js');

describe('Oscillator', function() {
  it('should run run the function over and over', function(done) {
    this.timeout(10000);
    var i = 0;
    var test = function() { i++; };

    var genFunc = shen.oscillator(function *() {
      test();
    }, 500);

    co(genFunc)();

    setTimeout(function() {
      i.should.be.greaterThan(5);
      done();
    }, 6000);
  });

  xit('should let me stop the oscillation with stopTick()', function(done) {
    this.timeout(10000);
    var i = 0;
    var test = function() { i++; };

    var genFunc = shen.oscillator(function *() {
      test();
    }, 500);

    co(genFunc)();

    setTimeout(function(err, val) {
      i.should.be.greaterThan(5);
      done();
    }, 6000);
  });




});



