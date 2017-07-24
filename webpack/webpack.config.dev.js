import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  devtool: 'inline-source-map',
  entry: [
    path.resolve(__dirname, '../src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, '../src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    //create HTML files
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      differentValues: "this is the value for development"
    })
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.css$/, loaders: ['style-loader','css-loader']}
    ]
  }
}
