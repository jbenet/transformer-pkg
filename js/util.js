var S = require('string');
var rw = require('rw');
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

var c = module.exports = {};

// force flag.
c.forceFlag = argv.f || argv.force;

c.pkg = function(filename) {
  return JSON.parse(rw.readSync(filename || 'package.json'), 'utf-8');
}

c.log = function(s) {
  console.log('transformer-pkg --> ' + s);
}

c.write = function(filename, contents, overwrite) {
  if (!overwrite)
    c.assertCanWriteFile(filename)
  rw.writeSync(filename, contents, 'utf-8');
  c.log('wrote ' + filename);
}

c.assertCanWriteFile = function(filename) {
  if (fs.existsSync(filename) && !c.forceFlag) {
    throw new Error('transformer-pkg: ' + filename + ' exists. -f overwrites.');
  }
}

// classify func
c.classify = function(input) {
  input = 't ' + input; // to avoid clashes with things like 'String'.
  return S(input).camelize().s;
};

