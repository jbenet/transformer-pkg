var npm = require("npm");
var util = require("./util");
var src = require("./src");

module.exports = function(argv) {

  // redo src.
  src(argv);

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
