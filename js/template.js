var S = require('string');
var swig = require('swig');

module.exports = function template(file, vars) {
  var tpl = swig.compileFile(__dirname + '/../tmpl/' + file);
  var out = tpl(vars);
  return out
};
