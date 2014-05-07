# transformer-pkg

Tool to automate lots of [transformer](http://github.com/jbenet/transformer) module writing.

## Usage

```
Usage: /usr/local/bin/transformer-pkg <subcommand>

Subcommands:

  init [<kind> <id> <description> <schema>]
  publish

Flags:

  -f --force  Overwrite existing files.
```

## Examples

### transformer-pkg init type

```
> ls
> transformer-pkg init type
Transformer kind: type
Transformer type-id ([a-z0-9-]+): unix-time
Transformer description: Unixtime date, number of seconds since 1970.
> ls
index.js
package.json
> cat package.json    # below
> cat index.js        # below
```

#### type `package.json`

```json
{
  "name": "transformer.unix-time",
  "version": "0.0.1",
  "description": "transformer type: Unixtime date, number of seconds since 1970.",
  "main": "index.js",
  "transformer": "transformer.jsonld",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "transformer",
    "module",
    "transformer-type"
  ],
  "license": "MIT"
}
```

#### type `index.js`

```js
var transformer = require('dat-transformer');

module.exports = new transformer.Type({
  // @context and type filled in automatically.
  'id': 'unix-time',
  'description': 'Unixtime date, number of seconds since 1970.',
  'schema': "string"
});
```

### transformer-pkg init conversion

```
> ls
> transformer-pkg init conversion -f
Transformer kind: conversion
Transformer Convert From type-id ([a-z0-9-]+): unix-time
Transformer Convert To type-id ([a-z0-9-]+): js-date
Transformer conversion-id: unix-time-to-js-date
Transformer description: Converts Unixtime to a JS Date object.
> ls
index.js
package.json
> cat package.json    # below
> cat index.js        # below
```

#### conversion `package.js`

```json
{
  "name": "transformer.unix-time-to-js-date",
  "version": "0.0.1",
  "description": "transformer conversion: Converts Unixtime to a JS Date object.",
  "main": "index.js",
  "transformer": "transformer.jsonld",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "transformer",
    "module",
    "transformer-conversion"
  ],
  "license": "MIT"
}
```

#### conversion `index.js`

```js
var transformer = require('dat-transformer');
var tUnixTime = transformer('unix-time');
var tJsDate = transformer('js-date');
// require any other modules you may need here.

module.exports = new transformer.Conversion(tUnixTime, tJsDate, convert);

function convert(input, callback) {
  // compute the conversion output
  var output = YOUR CODE HERE;

  // if an error ocurrs, send it in the callback
  callback(Error('tUnixTimeToJsDate not implemented'));

  // else, call the callback with result.
  callback(null, output);
}
```
