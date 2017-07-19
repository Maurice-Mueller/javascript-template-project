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
