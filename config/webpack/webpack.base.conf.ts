import * as path from 'path'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'

declare var __dirname

function resolve (dir) {
  return path.join(__dirname, '../..', dir)
}

export default {
  entry: {
    app: resolve('src/index')
  },
  devtool: 'inline-source-map',
  output: {
    path: resolve('src'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
       template: 'src/index.html',
       inject: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: true
        }
      }
    ]
  }
}
