var transformer = require('dat-transformer');
var {{ var1 }} = transformer('{{ id1 }}');
var {{ var2 }} = transformer('{{ id2 }}');
// require any other modules you may need here.

module.exports = transformer.Conversion({{ var1 }}, {{ var2 }}, convert);

// this is a synchronous conversion.
function convert(input) {
  // compute the conversion output
  var output = YOUR CODE HERE;

  // if an error ocurrs, throw it.
  throw new Error('{{ var0 }} not implemented');

  // else, return the result.
  return output;
}
