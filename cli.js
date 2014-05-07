#!/usr/bin/env node
var pkg = require('./index');
var argv = require('minimist')(process.argv.slice(2));

function usage() {
  console.log('Usage: ' + process.argv[1] + ' <subcommand>');
  console.log('');
  console.log('Subcommands:');
  console.log('');
  console.log('  init [<kind> <id> <description> <schema>]');
  console.log('  publish');
  console.log('');
  console.log('Flags:');
  console.log('');
  console.log('  -f --force  Overwrite existing files.');
  console.log('');
}

try {
  pkg(argv);
} catch (e) {
  var s = e.toString();
  if (s.match(/unknown command/)) {
    usage();
  } else if (s.match(/-f overwrites/)) {
    console.log(s);
    process.exit(-1);
  } else {
    throw e;
  }
}
