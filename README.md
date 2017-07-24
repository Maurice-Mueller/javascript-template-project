## .editorconfig

EditorConfig is a file format and collection of text editor plugins for maintaining consistent coding styles between different editors and IDEs.

Supported by:
- IntellijIDEA
- WebStorm
- SourceLair
- RubyMine

Plugins for:
- Visual Studio Code
-- https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
- Atom
- ...
- list of plugins: http://editorconfig.org/#download

### Basic content
```
# top-most EditorConfig file
root = true

[*]
end_of_line = lf
insert_final_newline = true
charset = utf-8
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
```

## Package Manager

Popular alternatives: bower, npm, JSPM

- install Node.js (which includes npm)
  Node.js is a set of libraries for JavaScript which allows it to be used outside of the browser. It is primarily focused on creating simple, easy to build network clients and servers.

- add package.json (manifest file for npm); e.g. ```npm init```
  - all binaries of node_modules/.bin are on the path for using inside scripts

- add Security Scanning
  - ```npm install -g nsp```
  - for manually check run ```nsp check```
  - add a script in package.json
    - ```
      {
        ...
        "scripts": {
          ...
          "security-check": "nsp check"
        }
      }
      ```

## Development Web Server

Popular alternatives:
- http-server: easy to use
- live-server: easy to use
- express: more advanced and production ready
- koa, hapi: like express
- budo: comes with browserify
- webpack dev server: comes with webpack
- browsersync: servers everywhere the same page; e.g. input in the desktop browser will be seen on mobile -> nice for cross-plattform testing

### install express
- ```npm install express --save-dev```
- install open ```npm install open --save-dev```
  - what is 'open'?: Open a file or url in the user's preferred application.
- add srcServer.js in buildScripts/
  - ```
    var express = require('express')
    var path = require('path')
    var open = require('open')

    var port = 8088
    var app = express()

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
- run express ```node buildScripts/srcServer.js```

## set-up Sharing Work-in-progress

Popular alternatives:
- localtunnel: easily share work on your local machine
- ngrok: more setup but more security; needs an account on ngrok website
- Surge: only support static files
- now: deployment to the cloud

### local tunnel
- install ```npm install localtunnel --save-dev```
- add a npm script
  - ```
    {
      ...
      "scripts": {
        ...
        "share-by-localtunnel": "npm run lt -port 8088"
      }
    }
    ```
- run localtunnel _after_ running the server: ```npm run share-by-localtunnel```

## advanced scripting (with npm)

- install chalk: ```npm install chalk --save-dev```
  - Terminal string styling done right
- run a script before an other
  - use as a name _pre_[script]: e.g. prestart
- run a script after an other
  - use as a name _post_[script]: e.g. poststart
- run parallel
  - install npm-run-all: ```npm install npm-run-all --save-dev```
  - execute ```npm-run-all --parallel [script] [script] [...]```

## Transpiler

Popular alternatives:
- Babel: latest stable and experimental features of JS, transpiled down to ES5
- Typescript: adds type safety (supports ES6 and ES5) and interfaces
- Elm: transpiles to JS; complete new language (with a lot of benefits)

### Configuration of Babel
- either in .babelrc
  - no dependency to npm
- or in package.json
  - one less file
- presets are available to prevent unneccessary transpilation
  - e.g. babel-preset-es2015-node
  - e.g. babel-preset-latest-minimal

### install via npm
- ```npm install babel-cli babel-core babel-preset-latest babel-register --save-dev```

### .babelrc
- create in the root of the project the file _.babelrc_
- to use the latest features:
  ```
  {
    "presets": ["latest"]
  }
  ```

### in build scripts
- for node support use _babel-node_
  - ```
    {
      ...
      "scripts": {
          ...
          "prestart-dev-server": "babel-node buildScripts/startMessageSrcServer.js"
      },
      ...
    }
    ```

## Bundler
Popular alternatives:
- browserify
  - bundles JS code for browsers
  - many plugins (minification, linting, ...)
- webpack
  - can also bundle CSS, images, ...
  - built-in hot-reloading web server
  - tree shaking
- rollup
  - tree shaking
  - faster production code compared to webpack and browserify
  - good for library development
  - no hot-reloading
- JSPM
  - universal module loader
  - can also load modules during runtime
  - own package manager (i.e. it can use resources from npm, git, ...)
  - uses rollup

### install webpack
```npm install webpack webpack-middleware webpack-dev-server babel-loader --save-dev```
- webpack stuff
- babel-loader: babel-loader for webpack

### Webpack Configuration
- create a new folder ```webpack```
- create a new file ```webpack/webpack.config.dev.js```
  - ```
    import path from 'path'

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
      plugins: [],
      module: {
        loaders: [
          {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
          {test: /\.css$/, loaders: ['style-loader','css-loader']}
        ]
      }
    }
    ```
  - devtool: how to map bundled source back to original one
    - quality vs. speed
    - options
      - DEVELOPMENT
        - eval: Each module is executed with eval() and //@ sourceURL. This is pretty fast. The main disadvantage is that it doesn't display line numbers correctly since it gets mapped to transpiled code instead of the original code.
        - inline-source-map: A SourceMap is added as a DataUrl to the bundle.
        - eval-source-map: Each module is executed with eval() and a SourceMap is added as a DataUrl to the eval(). Initially it is slow, but it provides fast rebuild speed and yields real files. Line numbers are correctly mapped since it gets mapped to the original code.
        - cheap-eval-source-map: Similar to _eval-source-map_, each module is executed with eval(). However, with this option the Source Map is passed as a Data URL to the eval() call. It is "cheap" because it doesn't have column mappings, it only maps line numbers.
        - cheap-module-eval-source-map: Similar to cheap-eval-source-map, however in this case this case loaders are able to process the mapping for better results.
      - PRODUCTION
        - source-map: A full SourceMap is emitted as a separate file. It adds a reference comment to the bundle so development tools know where to find it.
        - hidden-source-map: Same as source-map, but doesn't add a reference comment to the bundle. Useful if you only want SourceMaps to map error stack traces from error reports, but don't want to expose your SourceMap for the browser development tools.
        - cheap-source-map: A SourceMap without column-mappings ignoring loaded Source Maps.
        - cheap-module-source-map: A SourceMap without column-mappings that simplifies loaded Source Maps to a single mapping per line.
        - nosources-source-map: A SourceMap is created without the sourcesContent in it. It can be used to map stack traces on the client without exposing all of the source code.
  - entry point: application entry point
    - _path_ is used to get the full path; it comes with node; \_\_dirname is also part of _path_
  - target: for which platform the package will be bundled for
    - web, node, electron, ...
  - output: the location, where the bundle will be stored
    - *NOTE*: the development build will be served from memory and *no* physical files will be generated
  - plugins: webpack plugins
  - module: configuration which loader will be load what kind of files
    - different loaders are availble for different types: JS, CSS, HTML, ...

### Using bundled file in html
- remember to use the filename specified in _webpack.config.dev.js->output.filename_
  - in the example, this is _bundle.js_
  - ```<script src='bundle.js'></script>```

### Using CSS imports
- ```npm install style-loader css-loader```
- add loaders to webconfig
  - ```
    export default {
        ...
        module: {
          ...,
          {test: /\.css$/, loaders: ['style-loader','css-loader']}
        }
    }
    ```
- now you can import css files
  - e.g. ```import './index.css'```
- this approach will directly bundle the css file into the resulting \*.js file

### Debugging bundled
Sourcemaps maps bundled code back to the original source. They will only be
downloaded if you open the developer tools.
- add ```debugger``` as a breakpoint somewhere in the code
- open dev console in browser and then open your app
- this works in Chrome; Firefox seems not to support this feature


## Linting

Find errors before they find you ;)

Popular alternatives:
- ESLint
  - no built-in typescript support
- TSLint

### install ESLint
- plain JS: ESLint
  - ```npm install eslint --save-dev```
- JS with experimental features: babel-eslint
  - ```npm install babel-eslint --save-dev```
- disable editor plugins (to prevent overriding issues)

### Configuration of ESLint
- either in package.json
  - ```
    {
      ...
      "eslintConfig" : {
        //PUT YOUR CONFIG HERE
      }
    }
    ```
- or in ```.eslintrc.json```
  - other formats are supported as well: .eslintrc.js, .eslintrc.y(a)ml

- choose your rules *or* use presets
  - rules list: http://eslint.org/docs/rules/
  - 0 / "off": rule is turned off
  - 1 / "warn": breaking the rule will cause a warning
  - 2 / "error": breaking the rule will cause an error

- use a plugin for your specific environment
  - e.g. eslint-plugin-node, eslint-plugin-react, ...

- example config
  - ```
    {
      "root": true,
      "extends": [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings"
      ],
      "parserOptions": {
        "ecmaVersion": 7,
        "sourceType": "module"
      },
      "env": {
        "browser": true,
        "node": true
      },
      "rules": {
        "no-console": "warn",
        "no-debugger": "warn"
    }
    ```
    - root: true/false; project root (stop looking for other eslint config files in parent directories)
    - extends: use presets and plugins
    - parserOptions
      - ecmaVersion: what version of JS should be used
      - sourceType: how is the source organized (in this example: standard ES modules)
    - env: what environments should be supported
    - rules: settings of single rules (respectively overriding preset rules)

### Automate file checking

- watch your files with ESLint
  - *either* with eslint-loader
  - *or* with eslint-watch
    - ```npm install eslint-watch --save-dev```
    - new npm script
      - ```"lint": "esw webpack src buildScripts"```
        - esw = eslint-watch  followed by a file/directory list
        - optional: pass the --color parameter at the end for more colors
      - ```"lint:watch": "npm run lint -- --watch"```
        - this will continuously watch your files
        - add this to your start script
          - ```"start": "npm-run-all --parallel security-check start-dev-server lint:watch"```


## Testing

### Testing Framework

Popular alternatives:
- mocha
  - highly configurable
- jasmine
  - built-in assertions
- tape
  - simple
- Jest
  - wrapper around jasmine

### Assertion Framework

Popular alternatives:
- chai
- should.js
- expect

### Helper libraries
- JSDOM
  - simulates browser DOM for testing DOM without a browser
- cheerio
  - query virtual DOM like jQuery

### Test runtime
- browser
  - karma, testem
- headless browser
  - phantomJS
- in-memory DOM
  - JSDOM

### Where to put test files
- centralized (i.e. own folder)
  - less _noise_ inside the src folder
  - convention
- alongside the source file
  - easier import
  - no recreating of folder structure
  - clear visibility (what files have/lack tests)
  - convenient to open

### setup (with mocha)

- install mocha: ```npm install mocha --save-dev```
- install chai (as assertion framework): ```npm install chai --save-dev```
- install JSDOM: ```npm install jsdom --save-dev```
- create a test setup file, that will setup the test environment for mocha
  - in _buildScripts/testSetup.js_
    - ```
      require('babel-register')() //register babel for transpiling before running tests
      require.extensions['.css'] = function(){} //disable webpack features, that mocha doesn't understand (i.e. importing css)
      ```
- create a new npm script for running the tests
  - ```"test": "mocha --reporter progress buildScripts/testSetup.js 'src/**/*.test.js'"```
    - reporter: the style of the test report (here: progress)
    - buildScripts/testSetup.js: the file that will be executed before the tests will be running
    - 'src/\*\*/\*.test.js': expression to determine the location of the test files
    - optional: pass the --color parameter at the end for more colors

- make mocha known to ESLint
  - _.eslintrc.json_
    - ```
      {
        ...
        "env": {
          ...
          "mocha": true
        }
      }
      ```

### writing tests
- create the test file in the same directory as the file to test
- e.g. src/index.test.js
  - ```
    import {expect} from 'chai'

    describe('simple test', () => {
      it('true equals true', () => {
        expect(true).to.equal(true)
      }),
      it('simple math', () => {
        expect(1+2).to.equal(3)
      })
    })
    ```

### writing DOM tests
- ```
  import jsdom from 'jsdom'
  import fs from 'fs' //comes with nodeJS -> FileSystem access
  const { JSDOM } = jsdom; //get the constructor

  describe('DOM index.html', () => {
    it('should display hello', () => {
      const indexFile = fs.readFileSync('./src/index.html', 'utf-8')
      const dom = new JSDOM(indexFile)
      const heading = dom.window.document.getElementsByTagName('h1')[0]
      expect(heading.innerHTML).to.equal('Hello World!')
    })
  })
  ```

### Async tests
- ```
  describe('some async test', () => {
    it('simple test', (done) => { //callback for calling when test is done
      fs.readFile('./src/index.html', 'utf-8', file => { //async file read
        expect(true).to.equal(true)
        done() //tell mocha the test is done
      })
    })
  })
  ```

### Execute tests on saving files
- ```npm install watch-run --save-dev```
- new npm script: ```"test:watch": "watch-run -p 'src/**' npm run test" ```
- expand start script: ```"start": "npm-run-all --parallel security-check start-dev-server lint:watch test:watch"```

Alternative, where only the test files themselves will be watched:
- new npm script: ```"test:watch": "npm run test -- --watch" ```

## Get everything into your CI Server
Popular alternatives:
- Jenkins
- Bamboo
- Travis
- Appveyor

## HTTP Call Frameworks
Popular alternatives:
- for node
  - http
    - built-in; low-level
  - request
    - built-in; more high-level
- for browsers
  - XMLHttpRequest
    - standard; every browser supports this; a lot of plumbing
  - jQuery
    - widespread
  - fetch
    - new standard from WHATWG (https://fetch.spec.whatwg.org/)
    - full support of major browsers
- both node and browser
  - isomorphic-fetch
    - fetch version for running on node as well
  - xhr
    - subset of XMLHttpRequest that runs on node as well
  - SuperAgent
    - full feature set
  - Axios
    - full feature set
    - clean and promise-based API

Recommendation:
- ```request``` or ```fetch``` if the code is running either on node or in the browser
- ```Axios```if the code is running in both the browser and on node
- create a web API layer
  - centralizing response and error handling
  - single point to look at if HTTP calls fail
  - reusing common stuff

### Example for fetch
- ```npm install whatwg-fetch --save```
- add mock server response in ```srcServer.js```
  - ```
    app.get('/test/rest/users', function(request, result){
      result.json([{"id": 1, "name": "Moe Pad", "profession": "developer"},
                   {"id": 2, "name": "Allan Karlsson", "profession": "blaster"},
                   {"id": 3, "name": "Moby Dick", "profession": "swimmer"},
                   {"id": 4, "name": "Andrew Wiggins", "profession": "general"},
                 ])
    })
    ```
- implement the API layer: ```src/api/userApi.js```
  - ```
    import 'whatwg-fetch'

    export function getUsers() {
      return get('test/rest/users')
    }

    function get(url) {
      return fetch(url).then(onSuccess, onError)
    }

    function onSuccess(response) {
      return response.json()
    }

    function onError(error) {
      console.log(error)
    }
    ```
- add the following to your ```index.html```
  - ```
    <table>
      <thead>
        <th>
          ID
        </th>
        <th>
          Name
        </th>
        <th>
          Profession
        </th>
      </thead>
      <tbody id="users">
      </tbody>
    </table>
    ```
- adapt ```index.js```
  - ```
    import { getUsers } from './api/userApi.js'

    getUsers().then(result => {
      let usersBody = ''

      result.forEach(user => {
        usersBody += `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.profession}</td>
          </tr>`
      })

      global.document.getElementById('users').innerHTML = usersBody
    })
    ```

## Mocking HTTP calls
Popular alternatives:
- api-mock
- JSON server
  - works with static JSON files
- JSON Schema faker
  - dynamic data
- custom server
  - like express

### example JSON Server with JSON Schema faker
- helpful websites
  - http://json-schema-faker.js.org/

- data generators bundled with JSON Schema faker
  - faker.js
  - chance.js
  - randexp.js

- ```npm install json-server json-schema-faker faker --save-dev```
- create a schema file; e.g. buildScripts/mock/mockDataSchema.js
  - ```
    export default {
      "type": "object",
      "properties": {
        "users": {
          "type": "array",
          "minItems": 3,
          "maxItems": 5,
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number",
                "unique": true,
                "minimum": 1
              },
              "name": {
                "type": "string",
                "faker": "name.firstName"
              },
              "email": {
                "type": "string",
                "faker": "internet.email"
              }
            },
            required: ['id', 'name', 'email']
          }
        }
      },
      required: ['users']
    }
    ```
- create a script for generating data; e.g. buildScripts/mock/generateMockData.js
  - ```
    import jsf from 'json-schema-faker'
    import schema from './mockDataSchema'
    import fs from 'fs'
    import chalk from 'chalk'

    jsf.extend('faker', function() {
      return require('faker')
    })

    const json = JSON.stringify(jsf(schema))

    fs.writeFile('./src/api/mockSchema.json', json, error => {
      if(error) {
        return console.log(chalk.red(error))
      }
      console.log(chalk.green("Mock data successfully generated."))
    })
    ```
- add to scripts in package.json
  - random data generation
    - ```"generate-mock-data": "babel-node buildScripts/mock/generateMockData"```
  - starting the json server and serving the random data
    - ```"start-mock-api": "json-server --watch src/api/mockSchema.json --port 8090"```
  - start mock api with each application start
    - ```"start": "npm-run-all --parallel security-check start-dev-server lint:watch test:watch start-mock-api"```
  - generating new random data before starting json-server
    - ```"prestart-mock-api": "npm run generate-mock-data"```
- to not use the auto generate routes of json-server follow these steps:
  - create a file containing the routes; e.g. ```buildScripts/mock/jsonServerRoutes.json```
    - ```
      {
        "/test/rest/users": "/users"
      }
      ```
  - adapt the json-server script
    - ```"start-mock-api": "json-server --watch src/api/mockSchema.json --port 8090 --routes buildScripts/mock/jsonServerRoutes.json"```

- automate choose either production URL or mock URL depending on the environment
  - create a new file ```src/api/baseUrl.js```
    - ```
      export default function getBaseUrl() {
        const inDevelopment = window.location.hostname === 'localhost' //running on localhost?
        return inDevelopment? 'http://localhost:8090/' : '/'
      }
      ```
  - adapt ```src/api/userApi.js```
    - ```
      import 'whatwg-fetch'
      import getBaseUrl from './baseUrl'

      const baseUrl = getBaseUrl()

      export function getUsers() {
        return get('test/rest/users')
      }

      function get(url) {
        return fetch(baseUrl + url).then(onSuccess, onError)
      }

      function onSuccess(response) {
        return response.json()
      }

      function onError(error) {
        console.log(error)
      }
      ```

- add a delete request
  - add to ```src/api/userApi.js```
    - ```
      export function deleteUser(id) {
        return del(`test/rest/users/${id}`)
      }

      function del(url) {
        const request = new Request(baseUrl + url, {method: 'DELETE'})
        return fetch(request).then(onSuccess, onError)
      }
      ```
  - adapt ```src/index.js``` to the following
    - ```
      import './index.css'
      import { getUsers } from './api/userApi.js'
      import { deleteUser } from './api/userApi.js'

      debugger
      console.log('This is my index.js file.')
      console.log('API: ' + getUsers)

      getUsers().then(result => {
        let usersBody = ''

        result.forEach(user => {
          usersBody += `<tr>
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td><a href="#" data-id="${user.id}" class="deleteUser">delete</a></td>
            </tr>`
        })

        global.document.getElementById('users').innerHTML = usersBody

        const deleteLinks = global.document.getElementsByClassName('deleteUser')

        Array.from(deleteLinks, link => {
          link.onclick = function(event) {
            const element = event.target
            console.log(`clicked: ${element.attributes['data-id'].value}`)
            event.preventDefault() //prevent changes to the URL
            deleteUser(element.attributes['data-id'].value)
            const row = element.parentNode.parentNode
            row.parentNode.removeChild(row)
          }
        })
      })
      ```
  - if you use custom routes also adapt ```buildScripts/mock/jsonServerRoutes.json```
    - ```
      {
        "/test/rest/users": "/users",
        "/test/rest/users/:id": "/users/:id"
      }
      ```
  - now, json-server will delete the entries if you click on the delete link

## Production build settings
- create a webpack config for the production build
  - copy ```webpack/webpack.config.dev.js``` to ```webpack/webpack.config.prod.js```
    - change source mapping
      - from ```devTool: 'inline-source-map'``` to ```devTool: 'source-map'```
    - change the output path
      - from ```output: { path: path.resolve(__dirname, '../src')}``` to ```output: { path: path.resolve(__dirname, '../dist')}```
    - add a plugin for *minification*
      - ```npm install uglifyjs-webpack-plugin --save-dev```
      - ```import webpack from 'webpack'```
      - ``` plugins: [ new webpack.optimize.UglifyJsPlugin() ]```
    - add a plugin for *removing duplicated packages*
      - ``` plugins: [ new webpack.optimize.DedupePlugin() ]```
- add a file for building the production bundle ```buildScripts/build.js```
  - ```
    /*eslint-disable no-console*/
    import webpack from 'webpack'
    import webpackConfig from '../webpack/webpack.config.prod'
    import chalk from 'chalk'

    process.env.NODE_ENV = 'production'

    webpack(webpackConfig).run((error, stats) => {
      if(error) {
        console.log(chalk.red(error))
        return 1
      }
      console.log(chalk.green('build successful'))
      return 0
    })
    ```
- add npm scripts
  - ```"build": "babel-node buildScripts/build.js"```
  - ```"prebuild": "npm-run-all clean-dist test lint"```
  - ```"clean-dist": "rm -rf ./dist && mkdir dist"```

- handle html
  - *either* copy html files to dist/
  - *or* use dynamic generated html via node Bundler
  - *or* use html-webpack-plugin

### handle HTML with html-webpack-plugin

- ```npm install html-webpack-plugin --save-dev```
- add to ```webpack.config.prod.js``` and to ```webpack.config.dev.js```
  - ```
    import HtmlWebpackPlugin from 'html-webpack-plugin'
    ...
    export default {
      ...
      plugins: [
        //create HTML files
        new HtmlWebpackPlugin({
          template: 'src/index.html',
          inject: true
        })
      ],
      ...
    }
    ```
    - *NOTICE* the _template_ config needs a relativ path starting from the project directory (not relative to the webpack.config file)
- remove script tag in ```index.html```
  - ```<script src="bundle.js"></script>``` remove this line!
  - the plugin will automatically add all needed scripts

### test production bundle locally
- copy ```buildScripts/srcServer.js``` to ```buildScripts/distServer.js```
  - ```npm install compression --save-dev``` for compression
  - adapt to the following (i.e. remove all webpack stuff and add static serving of the bundle)
    - ```
      import express from 'express'
      import path from 'path'
      import open from 'open'
      import compression from 'compression' //gzip

      const port = 8088
      const app = express()

      app.use(compression({threshold : 512})) //enable compression; adapt threshold (in bytes) to your needs
      app.use(express.static('dist'))

      //any call to root (/)
      app.get('/', function(request, result){
        //__dirname holds the directory where the server is run in
        result.sendFile(path.join(__dirname, '../dist/index.html'))
      })

      app.listen(port, function(error){
        if(error) {
          console.log(error)
        } else {
          open('http://localhost:' + port)
        }
      })

      app.get('/test/rest/users', function(request, result){
        result.json([{"id": 1, "name": "Moe Pad", "profession": "developer", "email": "moe@example.com"},
                     {"id": 2, "name": "Allan Karlsson", "profession": "blaster", "email": "allan@example.com"},
                     {"id": 3, "name": "Moby Dick", "profession": "swimmer", "email": "moby@example.com"},
                     {"id": 4, "name": "Andrew Wiggins", "profession": "general", "email": "andrew@example.com"},
                   ])
      })
      ```
  - add a start script to ```package.json```
    - ```"start-dist-server": "babel-node buildScripts/distServer.js"```
    - ```"prestart-dist-server": "npm run build"```
  - adapt ```src/api/baseUrl.js``` to use the real API also locally for the production build
    - ```
      export default function getBaseUrl() {
        return getQueryStringParameterByName('useMockApi') ? 'http://localhost:8090/' : '/'
      }

      function getQueryStringParameterByName(name) {
        var url = window.location.href
        name = name.replace("/[[]]/g", "\\$&")
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
        var results = regex.exec(url)
        if(!results) return null
        if(!results[2]) return ''
        return decodeURIComponent(results[2].replace("/+/g", " "))
      }
      ```
    - now you can call *localhost:8090/* for the production API and *localhost:8090/?useMockApi=true*  for the mock API

### Minification (using html-webpack-plugin)

- add the following to ```webpack.config.prod.js````
  - ```
    {
      ...
      plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true
            },
            inject: true
          })
      ]
    }
    ```

### Bundling

Separate libraries etc. from your code.

- adapt ```webpack.config.prod.js```
  - adapt the entry point section
    - ```
      entry: {
        main: path.resolve(__dirname, '../src/index'),
        vendor: path.resolve(__dirname, '../src/vendor')
      }
      ```
  - adapt the plugins section
    - ```
      plugins: [
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor'
        }),
        ...
      ]
      ```
      - this will actually split the code in different files (instead of creating a vendor.js file and bundle this with the main bundle)
  - adapt the output section
    - ```
      output: {
        path: path.resolve(__dirname, '../src'),
        publicPath: '/',
        filename: '[name].js'
      }
      ```
      - a placeholder (_[name]_) is needed, because webpack needs to generate multiple bundles/chunks (in this example: _main_ and _vendor_)
- add ```vendor.js``` to your src directory and all libraries you depend on
  - ```
    /* eslint-disable no-unused-vars */
    import fetch from 'whatwg-fetch'
    ```
  - if you need more fine granular splitting: use this pattern to add more splitted stuff
