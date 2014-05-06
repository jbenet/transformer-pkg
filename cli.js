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
}

try {
  pkg(argv);
} catch (e) {
  if (e.toString().match(/unknown command/)) {
    usage();
  } else {
    throw e;
  }
}
