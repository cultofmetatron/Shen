var should  = require('should');
var fuu     = require('../index.js');
var co      = require('co');
var Promise = require('bluebird');

describe('Branch', function() {
  
  it('should be a function', function() {
    fuu.branch.should.be.type('function');
  });

  it('should return a generator', function() {
    var genFunc = fuu.branch();
    genFunc.constructor.name.should.equal('GeneratorFunction');
  });

  it('should yield to the second argument', function(done) {
    var stub;
    var genFunc = fuu.branch(
      function *(path1, path2) {
        yield path1;
        stub.should.equal(5);
      },
      function *(next) {
        stub = 5;
      },
      function *() {
        stub = 6;
      });
    co(genFunc)(done);
  });

  it('should yield to the third argument', function(done) {
    var stub;
    var genFunc = fuu.branch(
      function *(path1, path2) {
        yield path2;
        stub.should.equal(6);
      },
      function *(next) {
        stub = 5;
      },
      function *() {
        stub = 6;
      });
    co(genFunc)(done);
  });

   it('should resolve promises in sync', function(done) {
    var defer = Promise.defer();
    var val;
    var genFunc = fuu.cascade(
      function *(path1) {
        yield path1;
        val.should.equal('resolved');
        
      }, function *(next) {
        val = yield defer.promise;
      }, function *() {
      
      });
    co(genFunc)(done);
    //resolve the promise asyncronously
    setTimeout(function() {
      defer.resolve('resolved');
    }, 500);
  });





});
