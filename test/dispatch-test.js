var should  = require('should');
var fuu     = require('../index.js');
var co      = require('co');
var Promise = require('bluebird');
var _       = require('underscore');
var utils   = require('../lib/utils.js');


describe('Dispatch', function() {

  it('should dispatch to a branch', function(done) {
    
    var genFunc = fuu.dispatch(function *(paths) {
      var foo =  yield paths['fuu'];
      return foo;
    }, {
      fuu: function *() {
        return 'yeaaaa';
      }
    });

    co(genFunc)(function(err, value) {
      value.should.equal('yeaaaa');
      done();
    });


  });


});
