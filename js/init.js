var rw = require('rw');
var S = require('string');
var prompts = require('./prompts');
var template = require('./template');

// classify func
classify = function(input) {
  input = 't ' + input; // to avoid clashes with things like 'String'.
  return S(input).camelize().s;
};

module.exports = function(argv) {

  var args = {
    kind: (argv._[0] || '').toLowerCase(),
    id: (argv._[1] || '').toLowerCase(),
    desc: argv._[2],
    schema: (argv._[3] || 'string').toLowerCase(),
  }

  // fill in missing things with prompts.
  prompts.kind(args);

  if (args.kind == 'type')
    initType(args);
  else if (args.kind == 'conversion')
    initConversion(args);
  else
    throw new Error('cannot init unknown module kind: ' + opts.kind);
}


function initType(vars) {

  prompts.type(vars, 'id', 'type-id');
  prompts.desc(vars);

  write('index.js', template('type.index.js', vars));
  write('package.json', template('package.json', vars));
}

function initConversion(vars) {
  prompts.type(vars, 'id1', 'Convert From type-id');
  prompts.type(vars, 'id2', 'Convert To type-id');

  vars.id = vars.id1 + '-to-' + vars.id2;
  console.log('Transformer conversion-id: ' + vars.id);

  vars.var0 = classify(vars.id);
  vars.var1 = classify(vars.id1);
  vars.var2 = classify(vars.id2);

  prompts.desc(vars);

  write('index.js', template('conversion.index.js', vars));
  write('package.json', template('package.json', vars));
}

function write(filename, contents) {
  rw.writeSync(filename, contents, 'utf-8');
}
