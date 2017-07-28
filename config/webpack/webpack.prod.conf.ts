import * as merge from 'webpack-merge'
import baseConfig from './webpack.base.conf'
import commons from '../commons'
import * as webpack from 'webpack'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as UglifyJS from 'uglifyjs-webpack-plugin'

const devConfig = merge(baseConfig, {
  devtool: 'source-map',
  output: {
    path: commons.resolve('dist'),
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    //running vue.js in production mode
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    //generate a separate css file for bundling css
    new ExtractTextPlugin('[name].[contenthash].css'),
    new UglifyJS({
      sourceMap: true
    }),
    new HtmlWebpackPlugin({
      template: 'src/main/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  }
})

//enable CSS extracting from vue single files
//i.e. set extractCSS to true in vue loader of base config
devConfig.module.rules[1].options.extractCSS = true

export default devConfig
