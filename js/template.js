var S = require('string');
var swig = require('swig');

// classify func
S.classify = function() {
  return S.camelize(input).capitalize();
};

// setup swig filters.
swig.setFilter('classify', S.classify);

module.exports = function template(file, vars) {
  var tpl = swig.compileFile(__dirname + '/../tmpl/' + file);
  var out = tpl(vars);
  return out
};
