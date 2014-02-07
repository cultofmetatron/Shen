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
    var genFunc = fuu.branch(
      function *(path1) {
        var val = yield path1;
        return val;
      }, function *(next) {
        val = yield defer.promise;
        return val;
      }, function *() {
        //this never runs
      });
    co(genFunc)(function(err, val) {
      val.should.equal('resolved');
      done();
    });
    //resolve the promise asyncronously
    setTimeout(function() {
      defer.resolve('resolved');
    }, 0);
  });

  it('should work nested in cascade', function(done) {
    var genFunc = fuu.cascade(function *(next) {
        return yield next;
      },
      fuu.branch(
        function *(path1, path2) {
          return yield path2;
        },
        fuu.cascade(
          function *(next) {
            return yield next;
          },
          function *() {
            return 'returned path 1';
          }),
        function *(next) {
          //doesn't get run
          return yield next;
        }),
      function *() {
        return 'returned path 2';
      });

      co(genFunc)(function(err, value) {
        value.should.equal('returned path 2');
        done();
      });
  
  });

});
