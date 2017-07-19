import path from 'path'

export default {
  devServer: {
    debug: true,
    devtool: 'inline-source-map',
    noInfo: false
  },
  entry: [
    path.resolve(__dirname, '../src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, '../src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}
