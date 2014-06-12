#!/usr/bin/env node
var transformerTest = require('transformer-test')
var conv = require('./')

// run stock conversion tests, and try expected input/output pairs
var test = transformerTest.conversion(conv, [
  // [input, expectedOutput]
  ADD YOUR TEST PAIRS HERE
])


// that should be enough, but you can also run your own tests:
/*

test('your test description', function (t) {
  YOUR TEST CODE HERE
  // test conversions this way:
  test.converts(t, conv, input, expectedOutput)
  t.end()
})

*/
