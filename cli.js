#!/usr/bin/env node
var pkg = require('./index');
var argv = require('minimist')(process.argv.slice(2));

function usage() {
  console.log('Usage: ' + process.argv[1] + ' <subcommand>');
  console.log('');
  console.log('Subcommands:');
  console.log('');
  console.log('  init [<kind>]  -- generate module files');
  console.log('  src            -- update transformer.jsonld');
  console.log('  test           -- src, then npm test');
  console.log('  publish        -- src, then npm publish');
  console.log('');
  console.log('Flags:');
  console.log('');
  console.log('  -f --force  Overwrite existing files.');
  console.log('  -h --help   Show these instructions. :)');
  console.log('');
}

if (argv.h || argv.help) {
  usage();
  process.exit(0);
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
