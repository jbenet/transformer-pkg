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
