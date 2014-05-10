# transformer-pkg

Tool to automate lots of [transformer](http://github.com/jbenet/transformer) module writing.

[![dat](http://img.shields.io/badge/Development%20sponsored%20by-dat-green.svg?style=flat)](http://dat-data.com)

## Usage

```
Usage: transformer-pkg <subcommand>

Subcommands:

  init [<kind>]  -- generate module files
  src            -- update transformer.jsonld
  test           -- src, then npm test
  publish        -- src, then npm publish

Flags:

  -f --force  Overwrite existing files.
  -h --help   Show these instructions. :)
```

## Examples

### transformer-pkg init type

```
> ls
> transformer-pkg init type
Transformer kind: type
Transformer type-id ([a-z0-9-]+): unix-time
Transformer description: Unixtime date, number of seconds since 1970.
transformer-pkg --> wrote index.js
transformer-pkg --> wrote test.js
transformer-pkg --> wrote README.md
transformer-pkg --> wrote package.json
transformer-pkg --> wrote transformer.jsonld
transformer-pkg --> init done.

Next, you should:

- run `npm install`
- modify index.js, test.js, and README.md as needed
- run `transformer-pkg test` till it works.
- run `transformer-pkg publish` to ship!

transformer-pkg publish will:

1. run `npm init` to prompt for npm package details
2. update `transformer.jsonld` with the latest src
3. run `npm publish`

> ls
README.md
index.js
package.json
test.js
transformer.jsonld
> cat * # below
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
    "test": "node test.js"
  },
  "keywords": [
    "transformer",
    "transformer-type"
  ],
  "license": "MIT",
  "dependencies": {
    "dat-transformer": "~0.1.3"
  }
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

#### type `test.js`

```
#!/usr/bin/env node
var transformer = require('dat-transformer');
var type = require('./');

// run stock type tests
var test = transformer.test.type(type);


// that should be enough, but you can also run your own tests:
/*

test('your test description', function (t) {
  YOUR TEST CODE HERE
  t.end();
});

*/
```

### transformer-pkg init conversion

```
> ls
> transformer-pkg init conversion
Transformer kind: conversion
Transformer Convert From type-id ([a-z0-9-]+): unix-time
Transformer Convert To type-id ([a-z0-9-]+): js-date
transformer-pkg --> Transformer conversion-id: unix-time-to-js-date
Conversion is `async` or `sync`: sync
transformer-pkg --> wrote index.js
transformer-pkg --> wrote test.js
transformer-pkg --> wrote README.md
transformer-pkg --> wrote package.json
transformer-pkg --> wrote transformer.jsonld
transformer-pkg --> init done.

Next, you should:

- run `npm install`
- run `npm install --save transformer.unix-time transformer.js-date`
- modify index.js, test.js, and README.md as needed
- run `transformer-pkg test` till it works.
- run `transformer-pkg publish` to ship!

transformer-pkg publish will:

1. run `npm init` to prompt for npm package details
2. update `transformer.jsonld` with the latest src
3. run `npm publish`

> ls
README.md
index.js
package.json
test.js
transformer.jsonld
> cat * # below
```

#### conversion `package.js`

```json
{
  "name": "transformer.unix-time-to-js-date",
  "version": "0.0.1",
  "description": "transformer conversion: unix-time to js-date",
  "main": "index.js",
  "transformer": "transformer.jsonld",
  "scripts": {
    "test": "node test.js"
  },
  "keywords": [
    "transformer",
    "transformer-conversion"
  ],
  "license": "MIT",
  "dependencies": {
    "dat-transformer": "~0.1.3"
  }
}
```

#### conversion sync `index.js`

```js
var transformer = require('dat-transformer');
var tUnixTime = transformer('unix-time');
var tJsDate = transformer('js-date');
// require any other modules you may need here.

module.exports = transformer.Conversion(tUnixTime, tJsDate, convert);

// this is a synchronous conversion.
function convert(input) {
  // compute the conversion output
  var output = YOUR CODE HERE;

  // if an error ocurrs, throw it.
  throw new Error('tUnixTimeToJsDate not implemented');

  // else, return the result.
  return output;
}
```

#### conversion async `index.js`

```js
var transformer = require('dat-transformer');
var tUnixTime = transformer('unix-time');
var tJsDate = transformer('js-date');
// require any other modules you may need here.

module.exports = transformer.Conversion(tUnixTime, tJsDate, convert, {
  async: true, // explicitly mark this callback as async. important.
});

// this is an asynchronous conversion.
function convert(input, callback) {
  // compute the conversion output
  var output = YOUR CODE HERE;

  // if an error ocurrs, send it in the callback (first arg).
  callback(Error('tUnixTimeToJsDate not implemented'));

  // else, call the callback with result (second arg).
  callback(null, output);
}
```

#### conversion sync `test.js`

```js
#!/usr/bin/env node
var transformer = require('dat-transformer');
var conv = require('./');

// run stock conversion tests, and try expected input/output pairs
var test = transformer.test.conversion(conv, [
  // [input, expectedOutput]
  ADD YOUR TEST PAIRS HERE
])


// that should be enough, but you can also run your own tests:
/*

test('your test description', function (t) {
  YOUR TEST CODE HERE
  // test conversions this way:
  test.converts(t, conv, input, expectedOutput)
  t.end();
});

*/
```
