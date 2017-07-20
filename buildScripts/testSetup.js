require('babel-register')() //register babel for transpiling before running tests

require.extensions['.css'] = function(){} //disable webpack features, that mocha doesn't understand (i.e. importing css)
