
module.exports.isGenerator = function(obj) {
  return obj && 'function' == typeof obj.next && 'function' == typeof obj.throw;
};

module.exports.isGeneratorFunction = function(obj) {
  return obj && obj.constructor && 'GeneratorFunction' == obj.constructor.name;
};

