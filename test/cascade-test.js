var should  = require('should');
var fuu     = require('../index.js');
var co      = require('co');
var Promise = require('bluebird');
var compose = require('koa-compose');
var utils   = require('../lib/utils.js');
describe('Cascade', function() {
  
  it('should be a function', function() {
    fuu.cascade.should.be.type('function');
  });

  it('should return a generator', function() {
    var genFunc = fuu.cascade();
    genFunc.constructor.name.should.equal('GeneratorFunction');
  });

  it('should return a generator that returns a value to co', function(done) {
    var list = [];
    var genFunc = fuu.cascade(
      function *() {
        //its right here
        list.push(1);
        list.push(3);
        console.log('here\'s the generator');
        return list;
      });

    co(genFunc)(function(err, value) {
      //list === [1, 2, 3];
      console.log('value', value);
      list.should.have.property('0', 1);
      list.should.have.property('1', 3);
      done();
    });
  });

  it('should yield values downstream and return upsteam', function(done) {
    var list = [];
    var genFunc = fuu.cascade(
      function *(next) {
        //its right here
        list.push(1);
        yield next
        return list;
      },
      function *(next) {
        //its right here
        
        list.push(2);
        return yield next;
      },
      function *() {
        //its right here
        list.push(3);
        return list;
      }
    );

    co(genFunc)(function(err, value) {
      //list === [1, 2, 3];
      console.log('value', value);
      value.should.have.property('0', 1);
      value.should.have.property('1', 2);
      value.should.have.property('2', 3);
      
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

  it('should pass returned values to the next function', function(done) {
    var list = [];
    var genFunc = fuu.cascade(
      function *(next) {
        list.push(1);
        var b = yield next;
        list.push(3);
        return b;
      },
      fuu.cascade(
        function *(next) {
          list.push(2);
          return yield next;
        },
        function *() {
          list.push(7);
          return 'ret';
        }));

    co(genFunc)(function(err, val) {
      list.should.have.property('0', 1);
      list.should.have.property('1', 2);
      list.should.have.property('2', 7);
      list.should.have.property('3', 3);
      val.should.equal('ret');
      done();
    
    });

  });


});

