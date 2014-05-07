var prompt = require('sync-prompt').prompt;
var p = module.exports = {};

p.kind = function kind(args) {
  // prompt for kind
  if (args.kind != 'type' && args.kind != 'conversion') {
    while (args.kind != 'type' && args.kind != 'conversion') {
      var input = prompt('Transformer kind (Type or Conversion): ').toLowerCase();
      if (input[0] == 't')
        args.kind = 'type';
      else if (input[0] == 'c')
        args.kind = 'conversion';
    }
  } else {
    console.log('Transformer kind: ' + args.kind)
  }
}

p.type = function type(args, name, line) {
  // prompt for id
  if (!args[name]) {
    while (!args[name]) {
      var pat = '[a-z0-9-]+';
      var input = prompt('Transformer '+ line +' ('+ pat +'): ').toLowerCase();
      if (input.match(RegExp('^'+pat+'$')))
        args[name] = input;
    }
  } else {
    console.log('Transformer '+ line +': ' + args[name]);
  }
}

p.desc = function (args) {
  // prompt for desc
  if (!args.desc) {
    while (!args.desc) {
      args.desc = prompt('Transformer description: ');
    }
  } else {
    console.log('Transformer description: ' + args.id)
  }

  return args;
}
