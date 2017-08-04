import * as merge from 'webpack-merge'
import baseConfig from './webpack.base.conf'
import commons from '../commons'

baseConfig.entry = undefined
// baseConfig.plugins = undefined

let global = 'hello'
global = 'hello'

const testConfig = merge(baseConfig, {
  target: 'web',
  devtool: 'inline-source-map',
  entry: {
    test: commons.resolve('config/karma/index.js')
  },
//  resolve: {
//    alias: {
//      '--': commons.resolve('src/main/test')
//    }
//  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [commons.resolve('src/test')],
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }
    ]
  },
  plugins: [
  ],
})

export default testConfig
