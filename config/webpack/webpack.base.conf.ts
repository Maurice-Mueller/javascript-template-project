import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import commons from '../commons'
import * as Dashboard from 'webpack-dashboard/plugin'

export default {
  entry: {
    app: commons.resolve('src/main/main.ts')
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json', '.d.ts'],
    alias: {
      '@': commons.resolve('src/main')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
       template: 'src/main/index.html',
       inject: true
    }),
    new Dashboard()
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [commons.resolve('src')/*, commons.resolve('config')*/],
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
