# Vue.js with TypeScript

- `npm init` / `npm init -f`
- install vue and typescript stuff
  - `npm install typescript vue vue-loader ts-loader @types/vue vue-template-compiler vue-class-component --save-dev`
- install webpack stuff
  - `npm install webpack html-webpack-plugin webpack-middleware webpack-merge css-loader --save-dev`
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
            exclude: /node_modules|vue\/src/,
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          },
          {
            test: /\.vue$/,
            include: [commons.resolve('src')],
            exclude: /node_modules|vue\/src/,
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
- create `tsconfig.json` in project root
  - ```
    {
        "compileOnSave": false,
        "compilerOptions": {
            "allowSyntheticDefaultImports": true,
            "lib": [
                "dom",
                "es2015",
                "es2016"
            ],
            "jsx": "preserve",
            "target": "es2016",
            "module": "commonjs",
            "moduleResolution": "node",
            "noImplicitAny": false,
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "removeComments": false,
            "preserveConstEnums": true,
            "sourceMap": true,
            "skipLibCheck": true,
            "experimentalDecorators": true
        },
        "exclude": [
          "node_modules"
        ],
        "include": [
            "./src/**/*"
        ]
    }
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
- run `npm run dev`


## Set up vue
- declare `vue` inside `vue-setup.d.ts` inside `src` folder
  - ```
    declare module "*.vue" {
      import Vue from 'vue'
      export default Vue
    }
    ```
- create `App.vue` as the entrance hook for Vue.js
  - ```
    <template>
    <div>
      <h1>My new app: {{message}}</h1>
      <p>prop: {{propMessage}}</p>
    </div>
    </template>

    <script lang='ts'>
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component({
      props: {
        propMessage: String
      }
    })
    export default class App extends Vue {
    message: string = 'Hello!'
    }
    </script>

    <style>
      h1 {
      color: red
      }
    </style>
    ```
- adapt `main.ts` to use the hook of `App.vue`
  - ```
    import Vue from 'vue'
    import App from './App.vue'

    new Vue({
      el: '#app',
      render: h => h(App, {
        props: { propMessage: 'World' }
      })
    })
    ```
- set up the hook inside `index.html`
  - ```
    <body>
      ...
      <div id="app"></div>
    </body>
    ```
