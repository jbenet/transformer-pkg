var npm = require('npm');
var util = require("./util");
var prompts = require('./prompts');
var template = require('./template');

module.exports = function(argv) {
  // ensure can write files.
  ['package.json', 'index.js'].forEach(util.assertCanWriteFile);

  var vars = {
    kind: (argv._[0] || '').toLowerCase(),
    id: (argv._[1] || '').toLowerCase(),
    desc: argv._[2],
    schema: (argv._[3] || 'string').toLowerCase(),
  }

  // fill in missing things with prompts.
  prompts.kind(vars);

  if (vars.kind == 'type')
    initType(vars);
  else if (vars.kind == 'conversion')
    initConversion(vars);
  else
    throw new Error('cannot init unknown module kind: ' + vars.kind);

  // write standard files
  util.write('README.md', template('README.md', vars));
  util.write('package.json', template('package.json', vars));
  util.write('transformer.jsonld', template('transformer.jsonld', vars));

  // run npm install
  util.log('init done.');
  console.log(postInitDirections);
}


function initType(vars) {
  prompts.type(vars, 'id', 'type-id');
  prompts.desc(vars);

  util.write('index.js', template('type.index.js', vars));
}

function initConversion(vars) {
  prompts.type(vars, 'id1', 'Convert From type-id');
  prompts.type(vars, 'id2', 'Convert To type-id');

  vars.id = vars.id1 + '-to-' + vars.id2;
  util.log('Transformer conversion-id: ' + vars.id);

  vars.var0 = util.classify(vars.id);
  vars.var1 = util.classify(vars.id1);
  vars.var2 = util.classify(vars.id2);

  // has default desc. no need to prompt.
  // prompts.desc(vars);
  vars.desc = vars.id1 +' to '+ vars.id2;

  prompts.async(vars);

  var f = 'conversion.' + vars.async + '.index.js';
  util.write('index.js', template(f, vars));
}

var postInitDirections = '\n\
Next, you should:\n\
\n\
- run `npm install`\n\
- modify index.js, README.md as needed\n\
- run `npm test`\n\
- run `transformer-pkg publish` to ship! \n\
\n\
transformer-pkg publish will:\n\
\n\
1. run `npm init` to prompt for npm package details\n\
2. update `transformer.jsonld` with the latest src\n\
3. run `npm publish`\n\
'
