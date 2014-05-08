var transformer = require('dat-transformer');
var {{ var1 }} = transformer('{{ id1 }}');
var {{ var2 }} = transformer('{{ id2 }}');
// require any other modules you may need here.

module.exports = transformer.Conversion({{ var1 }}, {{ var2 }}, convert, {
  async: true, // explicitly mark this callback as async. important.
});

// this is an asynchronous conversion.
function convert(input, callback) {
  // compute the conversion output
  var output = YOUR CODE HERE;

  // if an error ocurrs, send it in the callback (first arg).
  callback(Error('{{ var0 }} not implemented'));

  // else, call the callback with result (second arg).
  callback(null, output);
}
