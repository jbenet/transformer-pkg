var pkg = module.exports = function(argv) {
  var cmd = argv._.shift();
  if (pkg[cmd]) {
    return pkg[cmd](argv);
  }

  throw new Error('transformer-pkg error: unknown command ' + cmd);
};

// load individual commands.
pkg.init = require('./js/init');
pkg.publish = require('./js/publish');
pkg.src = require('./js/src');
pkg.test = require('./js/test');
