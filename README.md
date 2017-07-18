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
- add a npm script ```
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
