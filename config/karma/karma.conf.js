var testConfig = require('../webpack/webpack.test.conf')

module.exports = function(config) {
  config.set({
    basePath: '../..',
    browsers: ['Chrome'],
    exclude: ['node_modules'],
    frameworks: ['mocha', 'karma-typescript'],
    // this is the entry file for all our tests.
  //  files: [{pattern: 'src/test/**/*.ktest.ts', watch: false}],
    files: [{pattern: './config/karma/index.js', watched: false}],
    // we will pass the entry file to webpack for bundling.
    preprocessors: {
        './config/karma/index.js': ['coverage', 'webpack', 'sourcemap'],
        './src/**/*.ts': ['coverage', 'webpack', 'sourcemap']
        //'./src/**/*.ts': ['karma-typescript', 'webpack']
      //  '*.ts': ['webpack']
    },
    // use the webpack config
    webpack: {
      module: testConfig.module,
      resolve: testConfig.resolve
    },
    // avoid walls of useless text
    webpackMiddleware: {
      noInfo: true
    },
    singleRun: true,
    logLevel: 'debug',
    reporters: ['progress'],
    colors: true,
    port: 9090
  })
}
