import express from 'express'
import path from 'path'
import open from 'open'
import webpack from 'webpack'
import config from '../webpack/webpack.config.dev'

const port = 8088
const app = express()
const compiler = webpack(config)

app.use(require('webpack-middleware')(compiler, {noInfo: true, publicPath: config.output.publicPath}))

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

app.get('/test/rest/users', function(request, result){
  result.json([{"id": 1, "name": "Moe Pad", "profession": "developer"},
               {"id": 2, "name": "Allan Karlsson", "profession": "blaster"},
               {"id": 3, "name": "Moby Dick", "profession": "swimmer"},
               {"id": 4, "name": "Andrew Wiggins", "profession": "general"},
             ])
})
