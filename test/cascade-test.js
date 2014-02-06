var should  = require('should');
var fuu     = require('../index.js');
var co      = require('co');
var Promise = require('bluebird');

describe('Cascade', function() {
  
  it('should be a function', function() {
    fuu.cascade.should.be.type('function');
  });

  it('should return a generator', function() {
    var genFunc = fuu.cascade();
    genFunc.constructor.name.should.equal('GeneratorFunction');
  });

  it('should yield downstream and return upstream', function(done) {
    var list = [];
    var genFunc = fuu.cascade(
      function *(next) {
        list.push(1);
        yield next;
        list.push(3);
      },
      function *() {
        list.push(2);
      });

    co(genFunc)(function() {
      //list === [1, 2, 3];
      list.should.have.property('0', 1);
      list.should.have.property('1', 2);
      list.should.have.property('2', 3);
      done();
    });
  });

  it('should resolve promises in sync', function(done) {
    var defer = Promise.defer();
    var genFunc = fuu.cascade(
      function *(next) {
        var val = yield defer.promise;
        val.should.equal('resolved');
      });
    co(genFunc)(done);
    //resolve the promise asyncronously
    setTimeout(function() {
      defer.resolve('resolved');
    }, 500);
  });


});

