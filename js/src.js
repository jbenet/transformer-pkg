var fs = require('fs');
var util = require('./util');

module.exports = function() {
  var mod = transformerModule();
  var json = JSON.stringify(mod.src, undefined, 1) + '\n';
  util.write('transformer.jsonld', json, true);
}

function transformerModule() {

  if (!fs.existsSync('package.json'))
    throw new Error('Must have file: package.json')

  var pkg = util.pkg();
  if (!pkg.transformer)
    throw new Error('transformer package.json must include transformer key.');

  var file = process.cwd() + '/' + pkg.main;
  if (!fs.existsSync(file))
    throw new Error('Must have file: ' + file);

  var mod = require(file);

  // verify module.src.id + package.json.name match.
  if (('transformer.' + mod.src.id) != pkg.name)
    throw new Error('Module name ('+ pkg.name +') does not match '
      + 'transformer id (transformer.'+ mod.src.id +').');

  return mod;
}
