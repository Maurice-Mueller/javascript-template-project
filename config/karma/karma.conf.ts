import testConfig from '../webpack/webpack.test.conf'

export default function(config: any) {
  config.set({
    basePath: '../..',
    browsers: ['Firefox'],
    exclude: ['node_modules'],
    frameworks: ['mocha', 'chai', 'karma-typescript'],
    // this is the entry file for all our tests.
  //  files: [{pattern: 'src/test/**/*.ktest.ts', watch: false}],
    files: [{pattern: 'config/karma/index.ts', watch: false}],
    // we will pass the entry file to webpack for bundling.
    preprocessors: {
        'index.ts': ['webpack']
      //  '*.ts': ['webpack']
    },
    // use the webpack config
    webpack: testConfig,
    // avoid walls of useless text
    webpackMiddleware: {
      noInfo: true
    },
    singleRun: true,
    client: {
      captureConsole: true,
      mocha: {
        bail: true
      }
    },
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-webpack',
      'karma-typescript',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ],
    logLevel: 'debug',
    reporters: ['progress'],
    colors: true,
    port: 9090
  })
}
