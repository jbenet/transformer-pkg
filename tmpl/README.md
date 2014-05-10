# transformer.{{ id }}

[Transformer](http://github.com/jbenet/transformer) {{ kind }}: {{ desc }}

This module is a transformer {{ kind }}, published on npm. Read more about transformer at:

- the transformer website: <http://transform.datadex.io>
- the transformer repository: <http://github.com/jbenet/transformer>

## Usage

Use this module through transformer.

{% if id1 %}
### Commandline

```
> echo '<SAMPLE INPUT>' | transform {{ id1 }} {{ id2 }}
<SAMPLE OUTPUT>
```

### Javascript

```js
var transformer = require('dat-transformer');
var {{ var0 }} = transformer('{{ id1 }}', '{{ id2 }}');
{{ var0 }}('<SAMPLE INPUT>'); // <SAMPLE OUTPUT>
```{% endif %}
