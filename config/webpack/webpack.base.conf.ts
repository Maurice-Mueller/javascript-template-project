import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import commons from '../commons'

export default {
  entry: {
    app: commons.resolve('src/main.ts')
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      '@': commons.resolve('src')
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
        include: [commons.resolve('src')],
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        include: [commons.resolve('src')],
        loader: 'vue-loader',
        options: {
          esModule: true
        }
      }
    ]
  }
}
