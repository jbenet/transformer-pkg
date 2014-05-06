var transformer = require('transformer');

module.exports = new transformer.Type({
  // @context and type filled in automatically.
  'id': '{{ id }}',
  'description': '{{ desc }}',
  'schema': {{ schema | json(2) | safe }}
});
