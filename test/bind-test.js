var should  = require('should');
var shen     = require('../index.js');
var co      = require('co');
var Promise = require('bluebird');

describe('Branch', function() {
  it('should bind the context', function(done) {
    co(shen.bind({ "foo":"bar" }, function *() {
      return this;
    }))(function(err, val) {
      val.foo.should.equal("bar");
      done();
    });
  
  
  
  })

});
