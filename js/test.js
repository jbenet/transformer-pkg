var src = require('./src');
var util = require('./util');
var spawn = require('child_process').spawn;

module.exports = function(argv) {
  // need to run src first for test.
  src(argv);
  util.log('running node test');
  spawn('node', ['test'], { stdio: 'inherit' });
}