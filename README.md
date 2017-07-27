# Vue.js with TypeScript

- `npm init` / `npm init -f`
- install vue and typescript stuff
  - `npm install typescript vue vue-loader ts-loader @types/vue --save-dev`
- install webpack stuff
  - `npm install webpack html-webpack-plugin webpack-middleware webpack-merge --save-dev`
- install express and other dev relevant stuff
  - `npm install express path ts-node open --save-dev`
- create `webpack.base.conf.js` in `config/scripts/webpack`
  - ```
    import * as HtmlWebpackPlugin from 'html-webpack-plugin'
    import commons from '../commons'

    export default {
      entry: {
        app: commons.resolve('src/main.ts')
      },
      resolve: {
        extensions: ['.js', '.ts', '.vue', '.json'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
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
    ```
- create `commons.ts` in `config` (for extracting common logic in config files)
  - ```
    import * as path from 'path'

    declare var __dirname

    export function resolve (dir) {
      return path.join(__dirname, '..', dir)
    }

    export default {resolve}
    ```

## Set up dev server
- create `webpack.dev.conf.ts` in `config/webpack`
  - ```
    import * as merge from 'webpack-merge'
    import baseConfig from './webpack.base.conf'
    import commons from '../commons'

    const devConfig = merge(baseConfig, {
      devtool: 'inline-source-map',
      output: {
        path: commons.resolve('src'),
        filename: 'bundle.js'
      }
    })

    console.log('help: ' + devConfig.entry.app)

    export default devConfig
    ```
- create `startDevServer.ts` in `config/scripts`
  - ```
    import * as express from 'express'
    import * as path from 'path'
    import * as open from 'open'
    import * as webpack from 'webpack'
    import config from '../webpack/webpack.base.conf'
    import * as webpackMiddleware from 'webpack-middleware'

    const port = 8088
    const app = express()
    const compiler = webpack(config)

    declare var __dirname

    app.use((webpackMiddleware)(compiler, {noInfo: true, publicPath: '/'}))

    //any call to root (/)
    app.get('/', function(request, result){
      //__dirname holds the directory where the server is run in
      result.sendFile(path.join(__dirname, '../src/index.html'))
    })

    app.listen(port, function(error){
      if(error) {
        console.log(error)
      } else {
        open('http://localhost:' + port)
      }
    })
    ```
- create `src/index.html` and `src/main.ts` with basic html / ts stuff
- create a start script in `package.json`
  - ```
    {
      ...
      "scripts": {
        "dev": "ts-node config/scripts/startDevServer.ts"
      }
    }
    ```
- run `npm start dev`
