import * as merge from 'webpack-merge'
//import baseConfig from './webpack.base.conf'
import baseConfig from './webpack.base.conf'
import commons from '../commons'
import * as nodeExternals from 'webpack-node-externals'
import * as webpack from 'webpack'

//baseConfig.entry = undefined
//baseConfig.plugins = undefined

const devConfig = merge(baseConfig, {
  target: 'web',
  devtool: 'inline-source-map',
//  resolve: {
//    alias: {
//      '--': commons.resolve('src/main/test')
//    }
//  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"test"'
      }
    })
  ],
  externals: [nodeExternals()],
  output: {
    path: commons.resolve('src/main'),
    filename: 'bundle.js'
  }
})

export default devConfig
