var transformer = require('dat-transformer');
var {{ var1 }} = transformer('{{ id1 }}');
var {{ var2 }} = transformer('{{ id2 }}');
// require any other modules you may need here.

module.exports = new Conversion({{ var0 }}, {
  'id': '{{ id }}',
}, {{ var1 }}, {{ var2 }});

function {{ var0 }}(input, callback) {
  // compute the conversion output
  var output = YOUR CODE HERE;

  // call the callback with result.
  callback(output);

  // if an error ocurrs, throw an exception:
  throw new Error('{{ var0 }} not implemented')
}
