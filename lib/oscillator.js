var co             = require('co');
var utils          = require('./utils');
var _              = require('underscore');
var genBind        = require('./bind.js');
var Promise        = require('bluebird');
var EventEmitter   = require('events').EventEmitter;

var Stream = function(gen, interval, ctx, options) {
  EventEmitter.call(this);
  options = options || {};
  this.ctx = ctx;
  this._timeout = null;
};


Stream.prototype = Object.create(EventEmitter.prototype);
Stream.prototype.startTick = function() {
  var self = this;
  if (_.isNull(this._timeout)) {
    this._timeout = setInterval(_bind(function() {
      return co(gen).call(ctx, _.bind(function (err, val) {
        self.emit('updated', val);
      }, self));
    }, this), interval);
  };
  return this;
};
Stream.prototype.stopTick = function() {
  if (!_.isNull(this._timeout)) {
    clearInterval(this._timeout);
    this._timeout = null;
  }
  return this;
};



var oscillator = function(gen, interval) {
  return function *(next) {
    next = (utils.isGenerator(next)) ?
       next :
      (function *(nextCo) { yield nextCo; }).call(this);
    var updater = new EventEmitter();
    setInterval(_.bind(function() {
      co(gen).call(this, function(err, val) {
        updater.emit('update', [err, val]);
      });
    }, this), interval);
    return emitter;
  };
};


