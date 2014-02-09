var should  = require('should');
var shen     = require('../index.js');
var co      = require('co');
var Promise = require('bluebird');
var compose = require('koa-compose');
var utils   = require('../lib/utils.js');

describe('Oscillator', function() {
  it('should run run the function over and over', function(done) {
    this.timeout(10000)
    var i = 0;
    var test = function() { i++; };

    var genFunc = shen.oscillator(function *() {
      console.log('running');
      test();
    }, 500);

    co(genFunc)();

    setTimeout(function() {
      console.log('this is i: ', i);
      i.should.be.greaterThan(5);
      done();
    }, 6000);


  
  });



});



