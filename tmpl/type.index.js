var Type = require('transformer-type')

module.exports = new Type({
  // @context and type filled in automatically.
  'id': '{{ id }}',
  'description': '{{ desc }}',
  'schema': {{ schema | json(2) | safe }}
})
