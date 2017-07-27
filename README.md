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

    ```

## Set up dev server
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
