#!/usr/bin/env node
var transformerTest = require('transformer-test')
var type = require('./')

// run stock type tests
var test = transformerTest.type(type)


// that should be enough, but you can also run your own tests:
/*

test('your test description', function (t) {
  YOUR TEST CODE HERE
  t.end()
})

*/
