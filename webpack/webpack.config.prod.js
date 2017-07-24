import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackMd5Hash from 'webpack-md5-hash'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, '../src/index'),
    vendor: path.resolve(__dirname, '../src/vendor')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    //generate a separate css file for bundling css
    new ExtractTextPlugin('[name].[contenthash].css'),
    new WebpackMd5Hash(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    //remove duplicated packages
    new webpack.optimize.DedupePlugin(),
    //Minification
    new webpack.optimize.UglifyJsPlugin(),
    //create HTML files
    new HtmlWebpackPlugin({
      template: 'src/index.html',
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
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
