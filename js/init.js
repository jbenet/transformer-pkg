var rw = require('rw');
var prompt = require('sync-prompt').prompt;
var template = require('./template');

module.exports = function(argv) {

  var opts = {
    kind: (argv._[0] || '').toLowerCase(),
    id: (argv._[1] || '').toLowerCase(),
    desc: argv._[2],
    schema: (argv._[3] || 'string').toLowerCase(),
  }

  // fill in missing things with prompts.
  opts = promptOptions(opts);
  if (opts.kind == 'type')
    initType(opts);
  else if (opts.kind == 'conversion')
    initConversion(opts);
  else
    throw new Error('cannot init unknown module kind: ' + opts.kind);
}


function promptOptions(opts) {
  // prompt for kind
  if (opts.kind != 'type' && opts.kind != 'conversion') {
    while (opts.kind != 'type' && opts.kind != 'conversion') {
      var input = prompt('Module kind (Type or Conversion): ').toLowerCase();
      if (input[0] == 't')
        opts.kind = 'type';
      else if (input[0] == 'c')
        opts.kind = 'conversion';
    }
  } else {
    console.log('Module kind: ' + opts.kind)
  }


  // prompt for id
  if (!opts.id) {
    while (!opts.id) {
      var pat = '[a-z0-9-]+';
      var input = prompt('Module id (' + pat + '): ').toLowerCase();
      if (input.match(RegExp('^'+pat+'$')))
        opts.id = input;
    }
  } else {
    console.log('Module id: ' + opts.id);
  }

  // prompt for desc
  if (!opts.desc) {
    while (!opts.desc) {
      opts.desc = prompt('Module description: ');
    }
  } else {
    console.log('Module description: ' + opts.id)
  }

  return opts;
}


function initType(vars) {
  write('index.js', template('type.index.js', vars));
  write('package.json', template('package.json', vars));
}

function initConversion(opts) {
  write('index.js', template('conversion.index.js', vars));
  write('package.json', template('package.json', vars));
}

function write(filename, contents) {
  rw.writeSync(filename, contents, 'utf-8');
}
