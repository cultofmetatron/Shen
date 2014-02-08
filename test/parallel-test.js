var should  = require('should');
var shen    = require('../index.js');
var co      = require('co');
var Promise = require('bluebird');
var compose = require('koa-compose');
var utils   = require('../lib/utils.js');
var _       = require('underscore');
var request = Promise.promisify(require('request'));


describe('parallel', function() {
  it('should run the two coroutines and return their values upstream', function(done) {
    var genFunc = shen.cascade(function *(next) {
      var vals = yield next;
      return vals;
    },
    shen.parallel(
      function *() {
        return 'one';
      },
      function *() {
        return 'two';
      }));
    
    co(genFunc)(function(err, val) {
      var countOne = _.contains(val, 'one');
      var countTwo = _.contains(val, 'two');
      countOne.should.be.true;
      countTwo.should.be.true;
      done();
    });
  
  });
 
  it('should run two diffrent request tasks in async', function(done) {
    var genFunc = shen.cascade(function *(next) {
      var vals = yield next;
      return vals;
    },
    shen.parallel(
      function *() {
        return yield request('http://www.google.com').then(function() {
          //console.log('wierd', arguments[0][1]);
          return arguments[0][1];
        });
      },
      function *() {
        return 'two';
      }));
    
    co(genFunc)(function(err, val) {
      var countOne = !!val[0].match('google');
      countOne.should.be.true;
      
      var countTwo = val[1] === 'two';
      countTwo.should.be.true;
      done();
    });
  
  });




});


