import commons from '../commons'

declare const require: any

const testsContext = require.context(commons.resolve('src/test'), true, /\.ktest$/)
testsContext.keys().forEach(testsContext)
