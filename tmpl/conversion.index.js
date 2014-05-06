var transformer = require('transformer');
var {{ var1 }} = transformer(id1);
var {{ var2 }} = transformer(id2);
// require any other modules you may need here.

module.exports = new Conversion({{ var1 }}To{{ var2 }}, {
  'id': '{{ id1 }}-to-{{ id2 }}',
}, {{ var1 }}, {{ var2 }});

function {{ var1 }}To{{ var2 }}(input, callback) {
  // compute the conversion output
  var output = YOUR CODE HERE;

  // call the callback with result.
  callback(output);

  // if an error ocurrs, throw an exception:
  throw new Error('{{ var1 }}To{{ var2 }} not implemented')
}
