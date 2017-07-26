import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  devtool: 'inline-source-map',
  entry: [
    path.resolve(__dirname, '../src/index.ts')
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
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".css"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  }
}
