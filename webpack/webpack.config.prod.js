import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, '../src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    //remove duplicated packages
    new webpack.optimize.DedupePlugin(),
    //Minification
    new webpack.optimize.UglifyJsPlugin(),
    //create HTML files
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    })
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.css$/, loaders: ['style-loader','css-loader']}
    ]
  }
}
