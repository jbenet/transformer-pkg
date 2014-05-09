var fs = require('fs');
var npm = require("npm");
var util = require("./util");

module.exports = function(argv) {

  var mod = transformerModule();
  writeTransformerSrc(mod);

  util.log('running `npm init`')
  npm.load({}, function (err) {
    if (err) throw err;
    npm.commands.init([], function(err, data) {
      if (err) throw err;

      console.log('\n');
      util.log('running `npm publish`');
      npm.commands.publish([], function(err, data) {
        if (err) throw err;
        util.log('publish done');
      });
    });
  });
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

function writeTransformerSrc(mod) {
  var json = JSON.stringify(mod.src, undefined, 1) + '\n';
  util.write('transformer.jsonld', json, true);
}
