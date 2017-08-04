//import commons from '../commons'
//
//declare const require: any
//
//const testsContext = require.context(commons.resolve('src/test'), true, /\.ktest\.ts/)
//testsContext.keys().forEach(testsContext)

Error.stackTraceLimit = Infinity;

// var testContext = require.context('./../../src/test', true, /\.ktest0\.ts/);
var testContext = require.context('./../../src/test', true, /\.test\.js/);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

var modules = requireAll(testContext);

if(!global)
  throw 'testContext: ' + JSON.stringify(testContext)
